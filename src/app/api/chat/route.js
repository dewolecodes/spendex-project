// app/api/chat/route.js
import { NextResponse } from "next/server";

const FINANCE_RAG_URL =
  process.env.FINANCE_RAG_URL || "https://finance-app-b6vl.onrender.com";
const CHAT_ENDPOINT = `${FINANCE_RAG_URL}/chat`;

// small helper for timeout
const fetchWithTimeout = async (url, opts = {}, ms = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, session_id: incomingSessionId } = body || {};

  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  try {
    const upstreamResp = await fetchWithTimeout(
      CHAT_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          // only include session_id if we have one (upstream docs create new when absent)
          ...(incomingSessionId ? { session_id: incomingSessionId } : {}),
        }),
      },
      12000 // 12s timeout
    );

    if (!upstreamResp.ok) {
      const text = await upstreamResp.text().catch(() => "");
      // Log the upstream endpoint for easier debugging in dev
      if (process.env.NODE_ENV !== "production") {
        console.error("Upstream chat error:", CHAT_ENDPOINT, upstreamResp.status, text);
      } else {
        console.error("Upstream chat error:", upstreamResp.status);
      }
      // Return upstream status and a helpful message to the client for better UX
      const fallback = `Sorry — the finance assistant is temporarily unavailable. Based on your message: "${message.slice(
        0,
        120
      )}..." try clarifying your income and main eSpendexs and I can help.`;
      const payload = { answer: fallback, upstream_status: upstreamResp.status };
      if (process.env.NODE_ENV !== "production") payload.upstream_error = text || undefined;
      return NextResponse.json(payload, { status: 502 });
    }

    const json = await upstreamResp.json().catch((e) => {
      if (process.env.NODE_ENV !== "production") console.error('Failed parsing upstream JSON:', e);
      return {};
    });
    // upstream docs: { session_id: "...", response: "Hello..." }
    const upstreamSessionId = json.session_id || incomingSessionId || null;
    const upstreamResponseText = (json.response || json.answer || "").trim();

    const answer =
      upstreamResponseText ||
      `I couldn't generate a reply just now. Try rephrasing or ask: "Help me set up my profile."`;

    // Return a stable shape expected by your frontend: { answer, session_id }
    return NextResponse.json({ answer, session_id: upstreamSessionId });
  } catch (err) {
    // Distinguish abort errors (timeouts) from other network errors
    const isAbort = err && (err.name === 'AbortError' || err.message?.toLowerCase?.().includes('aborted'));
  if (process.env.NODE_ENV !== "production") console.error("Error proxying to Finance RAG:", CHAT_ENDPOINT, err);
  else console.error("Error proxying to Finance RAG:", err?.message || err);
    const fallback = isAbort
      ? `The request timed out while contacting the assistant. Please try again.`
      : `An error occurred contacting the assistant. As a tip: check your network and try again.`;
    const payload = { answer: fallback };
    if (process.env.NODE_ENV !== "production") {
      payload.error = err?.message;
      payload.debug = { FINANCE_RAG_URL: FINANCE_RAG_URL, CHAT_ENDPOINT };
    }
    return NextResponse.json(payload, { status: 500 });
  }
}

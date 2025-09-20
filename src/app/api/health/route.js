import { NextResponse } from "next/server";

const FINANCE_RAG_URL =
  process.env.FINANCE_RAG_URL || "https://finance-app-b6vl.onrender.com";
const CHAT_ENDPOINT = `${FINANCE_RAG_URL}/chat`;

// small helper for timeout
const fetchWithTimeout = async (url, opts = {}, ms = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

export async function GET() {
  try {
    const resp = await fetchWithTimeout(
      CHAT_ENDPOINT,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "health-check" }),
      },
      5000
    );

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      const payload = { ok: false, status: resp.status };
      if (process.env.NODE_ENV !== "production") payload.error = text;
      return NextResponse.json(payload, { status: 502 });
    }

    const json = await resp.json().catch(() => ({}));
    return NextResponse.json({ ok: true, upstream: json });
  } catch (err) {
    const isAbort = err && (err.name === "AbortError" || err.message?.toLowerCase?.().includes("aborted"));
    const payload = { ok: false, error: isAbort ? "timeout" : err?.message };
    if (process.env.NODE_ENV !== "production") payload.debug = { CHAT_ENDPOINT };
    return NextResponse.json(payload, { status: 502 });
  }
}

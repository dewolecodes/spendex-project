import { NextResponse } from "next/server";

const FINANCE_RAG_URL =
  process.env.FINANCE_RAG_URL || "https://finance-app-b6vl.onrender.com";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { session_id } = body || {};
  if (!session_id) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const resp = await fetch(`${FINANCE_RAG_URL}/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id }),
    });

    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      console.error("Upstream reset error:", resp.status, txt);
      return NextResponse.json({ error: "Failed to reset" }, { status: 502 });
    }
    const json = await resp.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("Reset proxy error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// app/api/profile/[session_id]/route.js
import { NextResponse } from "next/server";

const FINANCE_RAG_URL =
  process.env.FINANCE_RAG_URL || "https://finance-app-b6vl.onrender.com";

export async function GET(request, { params }) {
  const { session_id } = params;
  if (!session_id) {
    return NextResponse.json({ error: "session_id required" }, { status: 400 });
  }

  try {
    const resp = await fetch(
      `${FINANCE_RAG_URL}/profile/${encodeURIComponent(session_id)}`
    );
    if (!resp.ok) {
      const t = await resp.text().catch(() => "");
      console.error("Upstream profile error:", resp.status, t);
      return NextResponse.json(
        { error: "Could not fetch profile" },
        { status: 502 }
      );
    }
    const json = await resp.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("Profile proxy error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

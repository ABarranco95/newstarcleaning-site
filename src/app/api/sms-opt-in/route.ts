import { NextRequest, NextResponse } from "next/server";
import { normalizeOptionalString, submitLeadToApex } from "@/lib/apexCrm";
import { buildSmsOptInForward } from "@/lib/smsOptInContract";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;

    if (normalizeOptionalString(body.company)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    const built = buildSmsOptInForward(body);
    if (!built.ok) {
      return NextResponse.json({ error: built.error }, { status: 400 });
    }

    // Fail closed: the page only shows "opted in" when Apex accepted the
    // structured consent payload.
    return submitLeadToApex(built.payload, req.headers);
  } catch (error) {
    console.error("SMS opt-in lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

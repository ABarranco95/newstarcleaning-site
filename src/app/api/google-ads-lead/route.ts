import { NextRequest, NextResponse } from "next/server";
import { normalizeOptionalString, submitLeadToApex } from "@/lib/apexCrm";
import { buildPaidLeadForward, normalizePaidLeadSubmission } from "@/lib/paidLeadContract";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { name, phone, city } = normalizePaidLeadSubmission(body);

    if (normalizeOptionalString(body.company)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    if (!name || !phone || !city) {
      return NextResponse.json({ error: "Name, phone, and city or ZIP are required" }, { status: 400 });
    }

    return submitLeadToApex(buildPaidLeadForward(body), req.headers);
  } catch (error) {
    console.error("Google Ads lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

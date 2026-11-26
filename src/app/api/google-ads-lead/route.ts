import { NextRequest, NextResponse } from "next/server";
import { normalizeOptionalString, submitLeadToApex } from "@/lib/apexCrm";
import { buildPaidLeadForward, normalizePaidLeadSubmission } from "@/lib/paidLeadContract";
import { specificDeadlineError } from "@/lib/assistedIntakeValidation";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { name, phone, city } = normalizePaidLeadSubmission(body);

    if (normalizeOptionalString(body.quoteWebsiteUrl)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    if (!name || !phone || !city) {
      return NextResponse.json({ error: "Name, phone, and city or ZIP are required" }, { status: 400 });
    }

    const deadlineError = specificDeadlineError(body);
    if (deadlineError) {
      return NextResponse.json({ error: deadlineError }, { status: 400 });
    }

    const forwardedHeaders = new Headers(req.headers);
    const clientIp =
      req.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() || req.headers.get("x-real-ip")?.trim();
    if (clientIp && !forwardedHeaders.has("x-nsc-client-ip")) {
      forwardedHeaders.set("x-nsc-client-ip", clientIp);
    }

    const forwardPayload = {
      ...buildPaidLeadForward(body),
      ...(typeof body.hasPets === "boolean" ? { hasPets: body.hasPets } : {}),
    };

    return submitLeadToApex(forwardPayload, forwardedHeaders);
  } catch (error) {
    console.error("Google Ads lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

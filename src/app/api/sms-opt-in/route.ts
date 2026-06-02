import { NextRequest, NextResponse } from "next/server";
import {
  appendDetails,
  normalizeOptionalString,
  submitLeadToApex,
} from "@/lib/apexCrm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, email, smsConsent, page, submittedAt } = body;

    if (!firstName || !phone || !smsConsent) {
      return NextResponse.json(
        { error: "First name, phone, and SMS consent are required" },
        { status: 400 }
      );
    }

    return submitLeadToApex(
      {
        firstName,
        lastName: normalizeOptionalString(lastName),
        phone,
        email: normalizeOptionalString(email),
        service: "SMS Opt-In",
        source: "sms_opt_in",
        page: normalizeOptionalString(page) || "/sms-opt-in",
        message: appendDetails([
          ["SMS consent", smsConsent ? "Granted" : ""],
          ["Page", page],
          ["Submitted at", submittedAt],
        ]),
      },
      req.headers
    );
  } catch (error) {
    console.error("SMS opt-in lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

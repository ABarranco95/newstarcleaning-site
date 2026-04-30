import { NextRequest, NextResponse } from "next/server";
import {
  appendDetails,
  normalizeOptionalString,
  splitFullName,
  submitLeadToApex,
} from "@/lib/apexCrm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      service,
      homesize,
      date,
      referral,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      page,
      submittedAt,
    } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const { firstName, lastName } = splitFullName(name);
    const message = appendDetails([
      ["Home size", homesize],
      ["Preferred date", date],
      ["Referral", referral],
      ["UTM source", utm_source],
      ["UTM medium", utm_medium],
      ["UTM campaign", utm_campaign],
      ["UTM content", utm_content],
      ["Page", page],
      ["Submitted at", submittedAt],
    ]);

    return submitLeadToApex(
      {
        firstName,
        lastName,
        phone,
        email: normalizeOptionalString(email),
        service: normalizeOptionalString(service),
        message,
        source: "google_ads",
        page: normalizeOptionalString(page) || "/google-ads",
      },
      req.headers
    );
  } catch (error) {
    console.error("Google Ads lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

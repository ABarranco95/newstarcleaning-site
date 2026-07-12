import { NextRequest, NextResponse } from "next/server";
import {
  appendDetails,
  normalizeOptionalString,
  splitFullName,
  submitLeadToApex,
} from "@/lib/apexCrm";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const name = normalizeOptionalString(body.name);
    const phone = normalizeOptionalString(body.phone);

    if (normalizeOptionalString(body.company)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const homeSize = normalizeOptionalString(body.homeSize) || normalizeOptionalString(body.homesize) || normalizeOptionalString(body.sqft);
    const preferredDate = normalizeOptionalString(body.date) || normalizeOptionalString(body.timeline);
    const firstLandingPage = normalizeOptionalString(body.firstLandingPage);
    const firstReferrer = normalizeOptionalString(body.firstReferrer);
    const landingService = normalizeOptionalString(body.landingService);
    const landingCity = normalizeOptionalString(body.landingCity);
    const { firstName, lastName } = splitFullName(name);
    const message = appendDetails(
      [
        ["Home size", homeSize],
        ["Bedrooms", body.bedrooms],
        ["Bathrooms", body.bathrooms],
        ["Timeline", body.timeline],
        ["Frequency", body.frequency],
        ["Condition", body.condition],
        ["Contact preference", body.contactPreference],
        ["Preferred contact time", body.preferredTime],
        ["Booking intent", body.bookingIntent],
        ["Referral", body.referral],
        ["First landing page", firstLandingPage],
        ["First referrer", firstReferrer],
        ["Landing service", landingService],
        ["Landing city", landingCity],
        ["Attribution captured at", body.capturedAt],
        ["UTM source", body.utm_source],
        ["UTM medium", body.utm_medium],
        ["UTM campaign", body.utm_campaign],
        ["UTM content", body.utm_content],
        ["UTM term", body.utm_term],
        ["GCLID", body.gclid],
        ["GBRAID", body.gbraid],
        ["WBRAID", body.wbraid],
        ["Page", body.page],
        ["Submitted at", body.submittedAt],
      ],
      normalizeOptionalString(body.message),
    );

    return submitLeadToApex(
      {
        firstName,
        lastName,
        phone,
        email: normalizeOptionalString(body.email),
        city: normalizeOptionalString(body.city),
        service: normalizeOptionalString(body.service),
        message,
        source: "google_ads",
        page: normalizeOptionalString(body.page) || "/google-ads",
        homeSize,
        preferredDate,
        firstLandingPage,
        firstReferrer,
        landingService,
        landingCity,
        capturedAt: normalizeOptionalString(body.capturedAt),
        utm_source: normalizeOptionalString(body.utm_source),
        utm_medium: normalizeOptionalString(body.utm_medium),
        utm_campaign: normalizeOptionalString(body.utm_campaign),
        utm_content: normalizeOptionalString(body.utm_content),
        utm_term: normalizeOptionalString(body.utm_term),
        gclid: normalizeOptionalString(body.gclid),
        gbraid: normalizeOptionalString(body.gbraid),
        wbraid: normalizeOptionalString(body.wbraid),
        bookingIntent: normalizeOptionalString(body.bookingIntent) || "paid-search-quote-request",
        smsConsent: normalizeOptionalString(body.smsConsent) || "service_related_quote_follow_up",
        consentText: normalizeOptionalString(body.consentText),
        websiteApiVersion: "2026-07-11-paid-search-v1",
      },
      req.headers,
    );
  } catch (error) {
    console.error("Google Ads lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

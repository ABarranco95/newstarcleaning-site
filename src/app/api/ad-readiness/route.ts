import { NextRequest, NextResponse } from "next/server";

const canonicalOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_PUBLIC_SITE_URL ||
  "https://newstarcleaning.com"
).replace(/\/$/, "");

function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim());
}

function envTrue(name: string) {
  return process.env[name]?.trim().toLowerCase() === "true";
}

function getRequestOrigin(req: NextRequest) {
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  return host ? `${proto}://${host}` : "";
}

export async function GET(req: NextRequest) {
  const requestOrigin = getRequestOrigin(req).replace(/\/$/, "");
  const analytics = {
    gtm: hasEnv("NEXT_PUBLIC_GTM_ID"),
    ga4: hasEnv("NEXT_PUBLIC_GA_ID"),
    googleAdsConversionId: hasEnv("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID"),
    googleAdsLeadConversionLabel: hasEnv("NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL"),
    googleAdsPhoneConversionLabel: hasEnv("NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL"),
    gtmGoogleAdsFormConfigured: envTrue("NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED"),
    gtmGoogleAdsPhoneConfigured: envTrue("NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED"),
    metaPixel: hasEnv("NEXT_PUBLIC_META_PIXEL_ID"),
    clarity: hasEnv("NEXT_PUBLIC_CLARITY_ID"),
  };
  const googleAdsFormConversionReady = analytics.gtm
    ? analytics.gtmGoogleAdsFormConfigured
    : analytics.googleAdsConversionId && analytics.googleAdsLeadConversionLabel;
  const googleAdsPhoneConversionReady = analytics.gtm
    ? analytics.gtmGoogleAdsPhoneConfigured
    : analytics.googleAdsConversionId && analytics.googleAdsPhoneConversionLabel;
  const googleAdsWebsiteCallTrackingMode = analytics.gtm
    ? (analytics.gtmGoogleAdsPhoneConfigured ? "gtm" : "not-configured")
    : (googleAdsPhoneConversionReady ? "direct-phone-snippet" : "not-configured");
  const googleAdsWebsiteConversionReady =
    googleAdsFormConversionReady && googleAdsPhoneConversionReady;
  const conversionTrackingReady = googleAdsWebsiteConversionReady;
  const leadRouting = {
    apexLeadUrlConfigured: hasEnv("APEX_LEAD_URL"),
    apexLeadSecretConfigured: hasEnv("APEX_LEAD_INTAKE_SECRET"),
    directBookingConfigured: hasEnv("NEXT_PUBLIC_DIRECT_BOOKING_URL") || hasEnv("NEXT_PUBLIC_BOOKINGKOALA_URL"),
  };
  const domain = {
    canonicalOrigin,
    requestOrigin,
    servingCanonicalOrigin: !requestOrigin || requestOrigin === canonicalOrigin,
  };

  const nextActions: string[] = [];
  if (!googleAdsFormConversionReady) {
    nextActions.push(
      analytics.gtm
        ? "Publish the GTM Google Ads form-conversion tag and set NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED=true."
        : "Set the Google Ads conversion ID and form conversion label."
    );
  }
  if (!googleAdsPhoneConversionReady) {
    nextActions.push(
      analytics.gtm
        ? "Publish the GTM Calls from Website Conversion tag and set NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED=true."
        : "Set NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL for the direct Google forwarding-number snippet."
    );
  }
  if (!analytics.metaPixel) nextActions.push("Set NEXT_PUBLIC_META_PIXEL_ID before Meta ads.");
  if (!analytics.clarity) nextActions.push("Set NEXT_PUBLIC_CLARITY_ID before heatmap/session QA.");
  if (!leadRouting.apexLeadUrlConfigured) nextActions.push("Set APEX_LEAD_URL to the Apex public lead endpoint.");
  if (!leadRouting.apexLeadSecretConfigured) nextActions.push("Set APEX_LEAD_INTAKE_SECRET to match Apex LEAD_INTAKE_SHARED_SECRET.");
  if (!leadRouting.directBookingConfigured) nextActions.push("Set NEXT_PUBLIC_DIRECT_BOOKING_URL for self-booking.");
  if (!domain.servingCanonicalOrigin) nextActions.push("Serve paid traffic on the canonical newstarcleaning.com origin.");

  return NextResponse.json(
    {
      checkedAt: new Date().toISOString(),
      readyForPaidTraffic:
        conversionTrackingReady &&
        leadRouting.apexLeadUrlConfigured &&
        leadRouting.apexLeadSecretConfigured &&
        leadRouting.directBookingConfigured &&
        domain.servingCanonicalOrigin,
      analytics,
      googleAdsFormConversionReady,
      googleAdsPhoneConversionReady,
      googleAdsWebsiteCallTrackingMode,
      googleAdsWebsiteConversionReady,
      conversionTrackingReady,
      leadRouting,
      domain,
      nextActions,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

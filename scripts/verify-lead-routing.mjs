import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function includes(path, expected, message) {
  assert(read(path).includes(expected), message);
}

includes("src/app/api/lead/route.ts", "APEX_LEAD_INTAKE_SECRET", "organic lead proxy must use Apex shared-secret env");
includes("src/app/api/lead/route.ts", "headers.Authorization", "organic lead proxy must send bearer authorization when configured");
includes("src/app/api/lead/route.ts", "websiteApiVersion", "organic lead proxy must stamp payload version");
includes("src/app/api/lead/route.ts", "text(body.company)", "organic lead proxy must include a honeypot guard");
includes("src/lib/apexCrm.ts", "APEX_LEAD_URL", "shared Apex helper must use public lead URL");
includes("src/lib/apexCrm.ts", "headers.Authorization", "shared Apex helper must send bearer authorization when configured");
includes("src/lib/apexCrm.ts", "headers: baseForwardedHeaders(sourceHeaders)", "fallback webhook must not receive the Apex authorization secret");
includes("src/components/QuickQuoteForm.tsx", "bookingIntent", "quote form must capture booking intent");
includes("src/components/QuickQuoteForm.tsx", "contactPreference", "quote form must capture contact preference");
includes("src/components/QuickQuoteForm.tsx", "smsConsent", "quote form must preserve SMS consent context");
includes("src/components/QuickQuoteForm.tsx", "quote-company", "quote form must include honeypot field");
includes("src/components/ContactForm.tsx", "new URLSearchParams(window.location.search)", "contact form must capture tracking params");
includes("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "gclid", "Google Ads form must capture gclid");
includes("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "gbraid", "Google Ads form must capture gbraid");
includes("src/app/book-now/page.tsx", "NEXT_PUBLIC_DIRECT_BOOKING_URL", "book-now page must support direct booking CTA URL");
includes("src/components/AnalyticsTags.tsx", "NEXT_PUBLIC_GTM_ID", "analytics tags must support GTM");
includes("src/components/AnalyticsTags.tsx", "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID", "analytics tags must support Google Ads conversion config");
includes("src/lib/conversionTracking.ts", "lead_submit", "conversion tracker must push a GTM lead_submit event");
includes("src/lib/conversionTracking.ts", "generate_lead", "conversion tracker must emit GA4 generate_lead");
includes("src/lib/conversionTracking.ts", "NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL", "conversion tracker must support Google Ads lead conversion label");
includes("src/components/QuickQuoteForm.tsx", "trackLeadConversion", "quote form must track successful lead conversions");
includes("src/components/ContactForm.tsx", "trackLeadConversion", "contact form must track successful lead conversions");
includes("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "trackLeadConversion", "Google Ads form must track successful lead conversions");
includes("src/app/api/ad-readiness/route.ts", "readyForPaidTraffic", "site must expose safe ad readiness status");
includes("src/app/api/ad-readiness/route.ts", "APEX_LEAD_INTAKE_SECRET", "site ad readiness must confirm Apex lead secret is configured");
includes("next.config.ts", "X-Frame-Options", "site must send basic security headers");
includes("next.config.ts", "Referrer-Policy", "site must send referrer policy");

console.log("Lead routing verifier passed");

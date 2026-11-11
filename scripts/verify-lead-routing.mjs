import { existsSync, readFileSync } from "node:fs";
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
includes("src/app/api/lead/route.ts", "text(body.quoteWebsiteUrl)", "organic lead proxy must include the renamed honeypot guard");
includes("src/lib/apexCrm.ts", "APEX_LEAD_URL", "shared Apex helper must use public lead URL");
includes("src/lib/apexCrm.ts", "headers.Authorization", "shared Apex helper must send bearer authorization when configured");
assert(!read("src/lib/apexCrm.ts").includes("GHL"), "retired GHL lead routing must not remain executable");
assert(!read("src/app/api/lead/route.ts").includes("apexData"), "organic lead failures must not parse, log, or echo upstream PII");
includes("src/components/PriceLeadForm.tsx", "bookingIntent", "quote form must capture booking intent");
includes("src/components/PriceLeadForm.tsx", "contactPreference", "quote form must capture contact preference");
includes("src/components/PriceLeadForm.tsx", "smsConsent", "quote form must preserve SMS consent context");
includes("src/components/PriceLeadForm.tsx", "homeSize: leadHomeSize", "quote form must forward the canonical paid size bands to Apex on every page");
includes("src/components/PriceLeadForm.tsx", "Home size selected: ${sizeLabel} sq ft.", "exact size selection must survive coarser lead bands in the existing notes");
includes("src/components/PriceLeadForm.tsx", "quote-website-url", "quote form must include the renamed honeypot field");
assert(!existsSync(join(root, "src/components/ContactForm.tsx")), "legacy ContactForm is deleted; the price-first form is the only payload shape");
includes("src/components/PriceLeadForm.tsx", "gclid", "shared quote form must capture gclid for paid traffic");
includes("src/components/PriceLeadForm.tsx", "gbraid", "shared quote form must capture gbraid for paid traffic");
includes("src/components/PriceLeadForm.tsx", "wbraid", "shared quote form must capture wbraid for paid traffic");
includes("src/components/PriceLeadForm.tsx", 'paidSearch ? "/api/google-ads-lead" : "/api/lead"', "paid quote form must use the paid lead route");
includes("src/components/PriceLeadForm.tsx", "mergeAttributionForSubmission", "shared quote form must merge first-touch attribution at submission time");
includes("src/lib/paidLeadContract.ts", "firstLandingPage", "paid lead forward must preserve first landing page");
includes("src/lib/paidLeadContract.ts", "firstReferrer", "paid lead forward must preserve first referrer");
assert(!read("src/app/api/google-ads-lead/route.ts").includes("allowFallback"), "paid lead routing must have no executable fallback path");
includes("src/components/PriceLeadForm.tsx", "paidSearch && !apexAccepted", "paid form must not show success unless Apex accepted the lead");
assert(!read("src/lib/apexCrm.ts").includes("data: apexData"), "Apex upstream responses must not be echoed or logged because they may contain PII");
includes("src/lib/apexCrm.ts", "landingService", "Apex helper must preserve paid landing service");
includes("src/lib/apexCrm.ts", "landingCity", "Apex helper must preserve paid landing city");
includes("src/lib/bookingPortal.ts", "NEXT_PUBLIC_DIRECT_BOOKING_URL", "booking resolver must support the direct booking CTA URL");
assert(!read("src/lib/bookingPortal.ts").includes("NEXT_PUBLIC_BOOKINGKOALA_URL"), "legacy booking config must not restore a public CTA");
assert(!read("src/lib/bookingPortal.ts").includes("APEX_CRM_BASE_URL"), "public booking must never derive its URL from a server integration setting");
includes("src/app/book-now/page.tsx", "resolveDirectBookingUrl", "book-now page must use the shared explicit booking resolver");
includes("src/components/AnalyticsTags.tsx", "NEXT_PUBLIC_GTM_ID", "analytics tags must support GTM");
includes("src/components/AnalyticsTags.tsx", "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID", "analytics tags must support Google Ads conversion config");
includes("src/lib/conversionTracking.ts", "lead_submit_accepted", "conversion tracker must push an accepted-lead funnel event");
includes("src/lib/conversionTracking.ts", "generate_lead", "conversion tracker must emit GA4 generate_lead only for accepted leads");
includes("src/lib/conversionTracking.ts", "NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL", "conversion tracker must support Google Ads lead conversion label");
includes("src/components/PriceLeadForm.tsx", "trackLeadConversion", "quote form must track successful lead conversions");
includes("src/components/PriceLeadForm.tsx", "trackLeadConversion", "shared quote form must track contact and paid lead conversions");
includes("src/components/PriceLeadForm.tsx", "trackLeadConversion", "shared quote form must track successful paid lead conversions");
includes("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "QuickQuoteForm", "Google Ads landing page must use the shared quote form");
includes("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "source=\"google-ads\"", "Google Ads landing page must tag leads as google-ads");
includes("src/app/api/ad-readiness/route.ts", "readyForPaidTraffic", "site must expose safe ad readiness status");
includes("src/app/api/ad-readiness/route.ts", "APEX_LEAD_INTAKE_SECRET", "site ad readiness must confirm Apex lead secret is configured");
includes("src/app/api/ad-readiness/route.ts", "NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL", "site ad readiness must report phone conversion configuration separately");
includes("next.config.ts", "X-Frame-Options", "site must send basic security headers");
includes("next.config.ts", "Referrer-Policy", "site must send referrer policy");

console.log("Lead routing verifier passed");

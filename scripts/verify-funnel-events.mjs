import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const passes = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!existsSync(absolutePath)) {
    failures.push(`${relativePath} exists`);
    return "";
  }
  return readFileSync(absolutePath, "utf8");
}

function assert(condition, message) {
  (condition ? passes : failures).push(message);
}

const tracking = read("src/lib/conversionTracking.ts");
const paidPage = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");
const form = read("src/components/QuickQuoteForm.tsx");
const callTracker = read("src/components/WebsiteCallTracker.tsx");
const layout = read("src/app/layout.tsx");
const readiness = read("src/app/api/ad-readiness/route.ts");

for (const event of [
  "paid_landing_view",
  "quote_cta_click",
  "quote_form_start",
  "quote_details_open",
  "quote_submit_attempt",
  "quote_validation_error",
  "lead_submit_accepted",
  "website_phone_click",
]) {
  assert(tracking.includes(event), `typed funnel contract includes ${event}`);
}

assert(tracking.includes("FunnelEventName") && tracking.includes("FunnelEventPayload"), "funnel event contract is typed");
assert(tracking.includes("window.dataLayer.push"), "every funnel event is pushed to dataLayer");
assert(tracking.includes("NEXT_PUBLIC_GTM_ID") && tracking.includes("!googleTagManagerConfigured"), "direct gtag is suppressed when GTM is configured");
assert(tracking.includes("NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL"), "form conversion has separate Ads label support");
assert(tracking.includes("NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED") && tracking.includes("NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED"), "GTM readiness requires explicit published-tag markers");
assert(
  form.includes("quote_form_start") &&
    form.includes("quote_details_open") &&
    form.includes("quote_submit_attempt") &&
    form.includes("quote_validation_error"),
  "quote form instruments start, optional-detail, submit-attempt, and validation events",
);
assert(form.includes("trackLeadConversion"), "quote form instruments Apex-accepted leads");
assert(form.includes('data-clarity-mask="true"'), "quote form explicitly masks customer fields for replay tools");
assert(form.includes("metadata?.apex?.success === true"), "paid conversion requires explicit Apex acceptance metadata");
assert(paidPage.includes("paid_landing_view") && paidPage.includes("quote_cta_click"), "paid page instruments landing and CTA events");
assert(paidPage.includes("BeforeAfterGallery") && paidPage.includes("Real New Star work"), "paid page renders the three-pair real-work gallery");
assert(callTracker.includes('a[href^="tel:"]') && callTracker.includes("trackWebsitePhoneClick"), "website phone tracker diagnoses all tel-link clicks");
assert(callTracker.includes("phone_conversion_number") && callTracker.includes("phone_conversion_callback"), "direct website-call path installs Google's forwarding-number phone snippet");
assert(callTracker.includes('window.gtag("config"') && callTracker.includes("updateWebsitePhoneLinks"), "phone snippet updates displayed and clickable forwarding numbers");
assert(callTracker.includes("googleTagManagerConfigured") && callTracker.includes("NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL"), "direct phone snippet is disabled when GTM owns Google tags");
assert(layout.includes("WebsiteCallTracker"), "website phone tracker is mounted globally");
assert(readiness.includes("NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED") && readiness.includes("googleAdsWebsiteCallTrackingMode"), "ad readiness distinguishes verified GTM and direct phone-snippet modes");
assert(readiness.includes("googleAdsFormConversionReady") && readiness.includes("googleAdsPhoneConversionReady"), "readiness distinguishes form and phone conversion configuration");
assert(!tracking.includes("qualified_call"), "phone clicks are not mislabeled as qualified calls");
assert(!callTracker.includes('window.gtag("event", "conversion"'), "diagnostic phone clicks never fire an Ads conversion directly");

if (failures.length) {
  console.error("Funnel event verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Funnel event checks passed:");
for (const pass of passes) console.log(`- ${pass}`);

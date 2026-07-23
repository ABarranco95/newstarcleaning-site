import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const passes = [];

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function assert(condition, message) {
  if (condition) {
    passes.push(message);
  } else {
    failures.push(message);
  }
}

const layout = read("src/app/layout.tsx");
const footer = read("src/components/Footer.tsx");
const home = read("src/app/page.tsx");
const quickQuoteForm = read("src/components/QuickQuoteForm.tsx");
const contactForm = read("src/components/ContactForm.tsx");
const quotePathPanel = read("src/components/QuotePathPanel.tsx");
const bookNow = read("src/app/book-now/page.tsx");
const contact = read("src/app/contact/page.tsx");
const googleAds = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");

for (const file of [
  "src/app/page.tsx",
  "src/app/book-now/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/google-ads/GoogleAdsLandingPageClient.tsx",
  "src/app/sms-opt-in/page.tsx",
  "src/app/[serviceCity]/page.tsx",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/QuickQuoteForm.tsx",
  "src/components/QuotePathPanel.tsx",
  "src/components/ServiceAreaPage.tsx",
  "src/components/ServiceDetailPage.tsx",
]) {
  const contents = read(file);
  assert(
    !/href="tel:[^"]*\*/.test(contents) && !contents.includes("****2822"),
    `${file} does not contain redacted or malformed phone hrefs`,
  );
}

assert(
  !layout.includes("MobileCTABar") &&
    !existsSync(path.join(root, "src/components/MobileCTABar.tsx")),
  "global sticky mobile CTA is removed",
);

assert(
  !footer.includes("ContactForm") &&
    footer.includes("Ready for a cleaning quote?") &&
    footer.includes("Tell us about the home.") &&
    footer.includes('href="/book-now"'),
  "footer uses a CTA instead of a site-wide form",
);

assert(
  !home.includes("ContactForm") &&
    !home.includes("QuickQuoteForm") &&
    home.includes("House cleaning in Fresno, Clovis &amp; Madera") &&
    home.includes("Request a quote"),
  "homepage uses quote-first CTA instead of embedded form",
);

for (const file of [
  "src/components/ServiceDetailPage.tsx",
  "src/components/ServiceAreaPage.tsx",
  "src/app/services/page.tsx",
  "src/app/service-areas/page.tsx",
  "src/app/[serviceCity]/page.tsx",
]) {
  const contents = read(file);
  assert(
    contents.includes("QuotePathPanel") &&
      !contents.includes("QuickQuoteForm") &&
      !contents.includes("ContactForm"),
    `${file} uses quote path panel instead of embedded forms`,
  );
}

assert(
  quotePathPanel.includes("No long form") &&
    quotePathPanel.includes("Request pricing") &&
    quotePathPanel.includes("Call or text"),
  "quote path panel presents a low-friction CTA",
);

assert(
  quickQuoteForm.includes("normalizeServiceParam") &&
    quickQuoteForm.includes("normalizeFrequencyParam") &&
    quickQuoteForm.includes('params.get("city")') &&
    quickQuoteForm.includes('params.get("service")') &&
    quickQuoteForm.includes('params.get("frequency")') &&
    quickQuoteForm.includes('homeSize: formData.sqft'),
  "quote form supports city, service, and recurring-frequency prefill and forwards the home-size signal",
);

assert(
  quickQuoteForm.includes('id="quote-city"') &&
    quickQuoteForm.includes('id="quote-service"') &&
    quickQuoteForm.includes('id="quote-timeline"') &&
    quickQuoteForm.includes('id="quote-sqft"') &&
    quickQuoteForm.includes('service-related calls/texts'),
  "quote form captures the lean required routing fields with visible SMS consent",
);

assert(
  googleAds.includes('source="google-ads"') &&
    googleAds.includes("QuickQuoteForm") &&
    googleAds.includes('type PaidIntent = "house" | "move" | "deep" | "recurring"') &&
    googleAds.includes('return "house";'),
  "Google Ads landing page uses the shared quote form with paid-source attribution",
);

assert(
  !googleAds.includes("<main") &&
    !googleAds.includes("</main>") &&
    !googleAds.includes("<header") &&
    !googleAds.includes("</header>"),
  "Google Ads landing page does not duplicate the global header or nest a second main landmark",
);

assert(
  quickQuoteForm.includes("showPaidDetails") &&
    quickQuoteForm.includes("Add home details (optional)") &&
    quickQuoteForm.includes("How much cleaning does the home need?") &&
    quickQuoteForm.includes("Get my quote") &&
    quickQuoteForm.includes('data-clarity-mask="true"') &&
    quickQuoteForm.includes("paidSearch={paidSearch}") &&
    quickQuoteForm.includes("paidCityPrefilled") &&
    quickQuoteForm.includes("paidServicePrefilled") &&
    quickQuoteForm.includes("isPaidHouseRequest"),
  "paid quote form captures the core lead first and moves qualification details behind progressive disclosure",
);
assert(
  !quickQuoteForm.includes("Prefer to talk? Call") &&
    quickQuoteForm.includes("renderExtendedDetails(true)"),
  "paid quote card removes the competing call box and suppresses low-value extended fields",
);

assert(
  contactForm.includes("QuickQuoteForm") && !contactForm.includes('fetch("/api/lead"'),
  "legacy ContactForm delegates to the shared quote form instead of maintaining a second payload shape",
);

assert(
  !bookNow.includes("extended") && !contact.includes("extended"),
  "book-now and contact forms avoid the extended multi-field form by default",
);

assert(
  bookNow.split("</section>")[0]?.includes("QuickQuoteForm"),
  "book-now keeps the quote form in the hero before the first section ends",
);

if (failures.length) {
  console.error("Lead UX verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Lead UX checks passed:");
for (const pass of passes) console.log(`- ${pass}`);

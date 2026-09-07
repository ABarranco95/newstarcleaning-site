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
const footer = read("src/components/Footer.tsx") + read("src/components/HomeFooter.tsx");
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
    footer.includes("Tell us about") &&
    footer.includes("<HomeQuoteLink") && footer.includes("siteQuoteHref(pathname"),
  "footer uses a CTA instead of a site-wide form",
);

assert(
  !home.includes("ContactForm") &&
    !home.includes("QuickQuoteForm") &&
    home.includes("<HomeQuoteLink") &&
    home.includes('href="/book-now"') &&
    home.includes("Request a quote"),
  "homepage uses quote-first CTA instead of embedded form",
);

// Service and area templates embed the compact prefilled form directly:
// a high-intent CTA must never route through an explanation panel first.
for (const file of [
  "src/components/ServiceDetailPage.tsx",
  "src/components/ServiceAreaPage.tsx",
]) {
  const contents = read(file);
  assert(
    contents.includes("QuickQuoteForm") &&
      contents.includes("compact") &&
      !contents.includes("QuotePathPanel"),
    `${file} embeds the direct compact quote form with no panel detour`,
  );
}

// Hub and thin service/city pages stay CTA-first without embedded long forms.
for (const file of [
  "src/app/services/page.tsx",
  "src/app/service-areas/page.tsx",
  "src/app/[serviceCity]/page.tsx",
]) {
  const contents = read(file);
  assert(
    contents.includes("/book-now") &&
      (contents.includes('href="/book-now"') || contents.includes("href={quoteHref}")) &&
      !contents.includes("QuotePathPanel") &&
      !contents.includes("QuickQuoteForm") &&
      !contents.includes("ContactForm"),
    `${file} links directly to the quote page without explanation panels or embedded forms`,
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
    quickQuoteForm.includes('id="quote-bedrooms"') &&
    quickQuoteForm.includes('id="quote-bathrooms"') &&
    quickQuoteForm.includes('id="quote-condition"') &&
    quickQuoteForm.includes("renderBedBathFields") &&
    quickQuoteForm.includes("renderConditionField") &&
    quickQuoteForm.includes("buildQuoteSmsConsent") && quickQuoteForm.includes("QUOTE_SMS_DISCLOSURE"),
  "quote form captures routing fields plus bedrooms, bathrooms, and condition so first-touch is not a cold call",
);

assert(
  googleAds.includes('source="google-ads"') &&
    googleAds.includes("QuickQuoteForm") &&
    googleAds.includes('type PaidIntent = "house" | "move" | "deep" | "recurring" | "postConstruction"') &&
    googleAds.includes('return "house";'),
  "Google Ads landing page uses the shared quote form with paid-source attribution",
);

assert(
  !googleAds.includes("<main") &&
    !googleAds.includes("</main>") &&
    read("src/components/Header.tsx").includes('pathname.startsWith("/google-ads")') &&
    read("src/components/Header.tsx").includes("return null"),
  "Google Ads landing page does not duplicate the global header or nest a second main landmark",
);

assert(
  quickQuoteForm.includes("showPaidDetails") &&
    quickQuoteForm.includes("Add home details (optional)") &&
    quickQuoteForm.includes("home like right now") &&
    quickQuoteForm.includes("Get my price") &&
    quickQuoteForm.includes('data-clarity-mask="true"') &&
    quickQuoteForm.includes("paidSearch={paidSearch}") &&
    quickQuoteForm.includes("landingCity?: string;") &&
    quickQuoteForm.includes("{paidSearch ? renderCityField() : null}") &&
    !quickQuoteForm.includes('<input type="hidden" name="city"') &&
    quickQuoteForm.includes("paidServicePrefilled") &&
    quickQuoteForm.includes("isPaidHouseRequest"),
  "paid quote form requires location, bedrooms, bathrooms, and condition; optional extras stay behind progressive disclosure",
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

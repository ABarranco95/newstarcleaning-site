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

assert(
  !layout.includes("MobileCTABar") &&
    !existsSync(path.join(root, "src/components/MobileCTABar.tsx")),
  "global sticky mobile CTA is removed",
);

assert(
  !footer.includes("ContactForm") &&
    footer.includes("Need pricing or route availability?") &&
    footer.includes('href="/book-now"'),
  "footer uses a CTA instead of a site-wide form",
);

assert(
  !home.includes("ContactForm") &&
    home.includes("Get pricing without a long form") &&
    home.includes("Request clear pricing before anything is booked"),
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
    quickQuoteForm.includes('params.get("city")') &&
    quickQuoteForm.includes('params.get("service")') &&
    quickQuoteForm.includes('homeSize: formData.sqft'),
  "quote form supports prefill and forwards the home-size signal",
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
  googleAds.includes('source="google-ads"') && googleAds.includes("QuickQuoteForm"),
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
    quickQuoteForm.includes("Add optional details for a tighter quote") &&
    quickQuoteForm.includes("paidCityPrefilled") &&
    quickQuoteForm.includes("paidServicePrefilled"),
  "paid quote form captures the core lead first and moves qualification details behind progressive disclosure",
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

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
const priceForm = read("src/components/PriceLeadForm.tsx");
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
    !existsSync(path.join(root, "src/components/MobileCTABar.tsx")) &&
    layout.includes("<MobileContactActions") &&
    read("src/components/MobileContactActions.tsx").includes('pathname.startsWith("/google-ads")') &&
    read("src/components/MobileContactActions.tsx").includes('hidden={editing || quoteInView === pathname}') &&
    read("src/components/MobileContactActions.tsx").includes('observer.observe(quote)') &&
    read("src/components/MobileContactActions.tsx").includes('data-phone-location="mobile_contact"'),
  "mobile contact actions replace the retired bar, stay out of paid pages and hide during editing or while the quote form is visible",
);

assert(
  !footer.includes("ContactForm") &&
    !footer.includes("home-footer-cta") &&
    footer.includes("<HomeQuoteLink") && footer.includes("siteQuoteHref(pathname"),
  "footer keeps contextual quote access without a repeating CTA band or site-wide form",
);

assert(
  !home.includes("ContactForm") &&
    home.includes("<QuickQuoteForm") &&
    home.includes('source="organic_home_hero"') &&
    home.includes("compact") &&
    home.includes("<HomeQuoteLink") &&
    home.includes('href="/book-now"') &&
    home.includes("Get a quote"),
  "homepage keeps the stepped quote form and contextual quote access alongside the booking-first hero",
);

assert(
  priceForm.includes("noValidate") &&
    priceForm.includes('data-quote-step="2"') &&
    priceForm.includes("firstInvalidControl(formElement)") &&
    priceForm.includes("nq-field-error"),
  "the price-first form validates its visible contact step with native constraints and shows the first invalid message in place",
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
  // The indexed San Jose service pages are full pages, not thin combos: they may
  // embed only the compact South Bay form the area template already requires.
  const forms = contents.match(/<QuickQuoteForm\b[^>]*\/>/g) || [];
  const southBayCompactOnly = file === "src/app/[serviceCity]/page.tsx" && forms.length > 0 &&
    forms.every((tag) => tag.includes("compact") && tag.includes('pageMarket="southbay"'));
  assert(
    contents.includes("/book-now") &&
      (contents.includes('href="/book-now"') || contents.includes("href={quoteHref}")) &&
      !contents.includes("QuotePathPanel") &&
      (!contents.includes("QuickQuoteForm") || southBayCompactOnly) &&
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
    priceForm.includes("normalizeFrequencyParam") &&
    priceForm.includes('params.get("service")') &&
    priceForm.includes('params.get("frequency")') &&
    priceForm.includes("homeSize: leadHomeSize"),
  "the form supports service and recurring-frequency prefill, and forwards the home-size signal",
);

assert(
  priceForm.includes('name="name"') &&
    priceForm.includes('name="phone"') &&
    priceForm.includes('name="zip"') &&
    priceForm.includes('name="service"') &&
    priceForm.includes('name="bedrooms"') &&
    priceForm.includes('name="bathrooms"') &&
    priceForm.includes('name="sqft"') &&
    priceForm.includes("bedroomsOptions.map") && priceForm.includes("bathroomsOptions.map") &&
    priceForm.includes("PAID_HOME_SIZES.map") &&
    priceForm.includes('name="timeline"') &&
    priceForm.includes('name="condition"') &&
    priceForm.includes('name="frequency"') &&
    priceForm.includes("buildQuoteSmsConsent") && priceForm.includes("QUOTE_SMS_DISCLOSURE"),
  "the form captures the contact, ZIP and optional-variable fields so first-touch is not a cold call",
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
  priceForm.includes("showDetails") &&
    priceForm.includes("Add details (optional)") &&
    priceForm.includes("home like right now") &&
    priceForm.includes('data-clarity-mask="true"') &&
    priceForm.includes("landingCity?: string;") &&
    priceForm.includes("marketForCity(defaultCity) === ready.market ? defaultCity : postal") &&
    !priceForm.includes('<input type="hidden" name="city"') &&
    priceForm.includes("pinnedService"),
  "the form keeps optional extras behind one disclosure and never hides a campaign-prefilled customer city",
);
assert(
  !priceForm.includes("Prefer to talk? Call") &&
    priceForm.includes("quote_details_open"),
  "the card removes the competing call box and measures an explicit optional-details open",
);

assert(
  !existsSync(path.join(root, "src/components/ContactForm.tsx")),
  "legacy ContactForm is deleted instead of maintaining a second payload shape",
);

assert(
  !bookNow.includes("extended") && !contact.includes("extended"),
  "book-now and contact forms avoid the extended multi-field form by default",
);

assert(
  bookNow.split("</section>")[0]?.includes("PricePicker") && bookNow.includes("QuickQuoteForm"),
  "book-now keeps the price-first form in the hero and the page placement below it",
);

if (failures.length) {
  console.error("Lead UX verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Lead UX checks passed:");
for (const pass of passes) console.log(`- ${pass}`);

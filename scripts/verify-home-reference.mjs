import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const read = (path) => readFileSync(path, "utf8");
function load(path, imports = {}) {
  const exports = {};
  const output = ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(output, { exports, URLSearchParams, require: (name) => {
    if (name in imports) return imports[name];
    assert(["react", "react/jsx-runtime", "next/image", "next/link"].includes(name), `unexpected dependency ${name}`);
    return require(name);
  } }, { filename: path });
  return exports;
}
const context = load("src/lib/homeQuoteContext.ts");
const siteContext = load("src/lib/siteQuoteContext.ts", { "@/lib/homeQuoteContext": context });
const cases = [
  { search: "", selected: "standard-cleaning" },
  { search: "service=deep-cleaning&city=Clovis&utm_source=original", selected: "deep-cleaning" },
  { search: "nsc_service=move-out-cleaning&nsc_city=Madera&nsc_frequency=monthly&utm_source=original", selected: "move-out-cleaning" },
  { search: "service=Standard+recurring+cleaning&city=Fresno", selected: "standard-cleaning" },
];
for (const item of cases) {
  const imports = { "next/navigation": { usePathname: () => "/", useSearchParams: () => new URLSearchParams(item.search) }, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext };
  const Services = load("src/components/HomeServices.tsx", imports).default;
  const html = renderToStaticMarkup(createElement(Services));
  assert(html.includes(`data-selected-service="${item.selected}"`));
  assert.equal((html.match(/type="radio"/g) || []).length, 3);
  for (const floor of ["$165", "$235", "$325"]) assert(html.includes(floor));
  assert(html.includes('aria-controls="home-service-scope"') && html.includes('aria-live="polite"'));
  const links = [...html.matchAll(/<a[^>]*href="([^"]+)"/g)].map((m) => new URL(m[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com"));
  assert.equal(links.length, 2);
  const expected = context.homeQuoteParams(item.search);
  for (const link of links) {
    assert.equal(link.searchParams.get("service"), item.selected);
    for (const key of ["city", "frequency", "utm_source"]) assert.equal(link.searchParams.get(key), expected.get(key));
  }
  assert.equal(links[0].pathname, "/book-now");
  assert.equal(links[1].hash, "#whats-included");
  const QuoteLink = load("src/components/HomeQuoteLink.tsx", imports).default;
  const quoteHtml = renderToStaticMarkup(createElement(QuoteLink, { className: "test" }, "Request a quote"));
  const quote = new URL(quoteHtml.match(/href="([^"]+)"/)[1].replaceAll("&amp;", "&"), "https://newstarcleaning.com");
  for (const key of ["service", "city", "frequency", "utm_source"]) assert.equal(quote.searchParams.get(key), expected.get(key));
}
for (const service of ["post-construction", "Office / commercial cleaning"]) {
  const imports = { "next/navigation": { usePathname: () => "/", useSearchParams: () => new URLSearchParams({ service, city: "Clovis" }) }, "@/lib/homeQuoteContext": context, "@/lib/siteQuoteContext": siteContext };
  const QuoteLink = load("src/components/HomeQuoteLink.tsx", imports).default;
  assert(renderToStaticMarkup(createElement(QuoteLink, { className: "test" }, "Quote")).includes("/commercial-quote?"));
  const BookingLink = load("src/components/HomeBookingContextLink.tsx", { ...imports, "@/components/BookingPortalLink": () => createElement("a", null, "unsafe") }).default;
  assert.equal(renderToStaticMarkup(createElement(BookingLink, { baseUrl: "https://example.com/book", onDark: false, placement: "hero" })), "");
}
for (const name of ["cleaning-regular", "cleaning-deep", "cleaning-empty-home"]) {
  const file = `public/illustrations/${name}.svg`;
  assert(existsSync(file));
  const svg = read(file);
  assert(svg.includes('viewBox="0 0 360 260"') && svg.includes("<title>"));
  assert(!/<(?:script|foreignObject|image|filter)|onload=|https?:\/\//.test(svg.replace('xmlns="http://www.w3.org/2000/svg"', "")));
}
const home = read("src/app/page.tsx");
assert(home.includes("<GoogleRating") && home.includes("<HomeServices") && home.includes("fill preload"));
assert(!/blur-3xl|line-clamp|RealWorkGallery|QuotePathPanel|BeforeAfterCarousel|shadow-soft|shadow-elev/.test(home));
assert(home.includes("Madera appointments depend on route availability"));
assert(home.includes("Empty cabinet, drawer, and closet interiors are included"));
assert(home.includes("are optional") && home.includes("guarantee a deposit return"));
for (const path of ["src/app/page.tsx", "src/components/HomeHeader.tsx", "src/components/HomeFooter.tsx"]) assert(read(path).includes("<HomeQuoteLink"), `${path} preserves known quote context`);
const services = read("src/components/HomeServices.tsx");
assert(services.includes("window.history.replaceState") && services.includes('next.delete("nsc_service")'), "selection updates all quote/booking links without stale alias intent");
const booking = read("src/components/HomeBookingContextLink.tsx");
for (const key of ["service", "city", "frequency"]) assert(booking.includes(`${key}={query.get("${key}")`));
console.log(`Homepage-reference checks passed: ${cases.length} rendered selection/quote contexts, preserved floors and scope, three safe custom SVGs, contextual header/hero/footer and gated booking integration. Visual quality remains a separate review.`);

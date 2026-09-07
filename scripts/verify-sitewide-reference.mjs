import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import sharp from "sharp";

const read = file => readFileSync(file, "utf8");
function load(file, imports = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, {
    exports, URLSearchParams,
    require: name => { assert(name in imports, `unexpected dependency ${name}`); return imports[name]; },
  });
  return exports;
}
const home = load("src/lib/homeQuoteContext.ts");
const { siteQuoteParams, siteQuoteHref } = load("src/lib/siteQuoteContext.ts", { "@/lib/homeQuoteContext": home });
const cities = { fresno: "Fresno", clovis: "Clovis", madera: "Madera", "tower-district": "Tower District", "fig-garden": "Fig Garden", "woodward-park": "Woodward Park" };
const services = ["standard-cleaning", "deep-cleaning", "move-out-cleaning"];
let cases = 0;
for (const [slug, city] of Object.entries(cities)) {
  const incoming = "nsc_service=deep-cleaning&nsc_city=Other&utm_source=original&gclid=preserved&nsc_frequency=monthly";
  const area = siteQuoteParams(`/cleaning-services-${slug}`, incoming);
  assert.equal(area.get("city"), city);assert.equal(area.get("service"), "deep-cleaning");assert.equal(area.get("frequency"), "monthly");cases++;
  for (const service of services) {
    const query = siteQuoteParams(`/${service}-${slug}`, incoming);
    assert.equal(query.get("service"), service);assert.equal(query.get("city"), city);
    assert.equal(query.get("utm_source"), "original");assert.equal(query.get("gclid"), "preserved");
    assert(!query.has("nsc_service") && !query.has("nsc_city"));cases++;
  }
}
for (const service of services) {
  const result = new URL(siteQuoteHref(`/services/${service}`, "service=wrong&city=Clovis&utm_source=original"), "https://newstarcleaning.com");
  assert.equal(result.pathname, "/book-now");assert.equal(result.searchParams.get("service"), service);assert.equal(result.searchParams.get("city"), "Clovis");cases++;
}
for (const path of ["/services/commercial-cleaning", "/services/post-construction-cleaning", "/commercial-quote"]) {
  const href = new URL(siteQuoteHref(path, "city=Clovis&service=deep-cleaning&utm_source=original"), "https://newstarcleaning.com");
  assert.equal(href.pathname, "/commercial-quote");assert(home.isBusinessCleaning(href.searchParams.get("service")));
  assert.equal(href.searchParams.get("city"), "Clovis");cases++;
}
for (const query of ["service=post-construction", "nsc_service=commercial"]) {
  assert(siteQuoteHref("/", query).startsWith("/commercial-quote?"));cases++;
}
for (const component of ["Header", "Footer"]) {
  const source = read(`src/components/${component}.tsx`);
  assert(source.includes('pathname.startsWith("/google-ads")') && source.includes("return null"));
  assert(source.includes(`<Home${component}`));
}
const routes = ["about", "book-now", "contact", "commercial-quote", "services", "service-areas", "blog", "blog/[slug]", "checklist", "privacy", "terms", "sms-opt-in", "[serviceCity]"];
for (const path of routes) {
  const source = read(`src/app/${path}/page.tsx`);
  assert(source.includes('className="site-reference"'), `${path}: active reference layout`);
  assert(!/blur-3xl|line-clamp|shadow-elev|shadow-soft/.test(source), `${path}: no old decorative/text-hiding stack`);
}
assert(read("src/app/layout.tsx").includes('import "./site-reference.css"'));
const quote = read("src/app/book-now/page.tsx");
assert(!quote.includes("By submitting this form, you consent to receive"));
assert(quote.includes("<QuickQuoteForm") && quote.includes("organic_quote_page"));
for (const name of ["double-vanity-detail-new-star"]) {
  const path = `public/photos/real-work/${name}.webp`;
  assert(existsSync(path));
  const meta = await sharp(path).metadata();
  assert.equal(meta.format, "webp");assert(meta.width <= 1600);
  assert(!meta.exif && !meta.xmp && !meta.iptc, `${name}: no EXIF/GPS/private metadata`);
}
console.log(`Site-wide checks passed: ${cases} route/context cases; ${routes.length} route families; shared paid shell boundary; optional-consent wording; optimized metadata-free photographs.`);

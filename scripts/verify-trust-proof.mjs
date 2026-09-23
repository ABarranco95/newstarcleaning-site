import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Review-proof contract: the rating, count and every quote on the site must
// trace to the live Google Business Profile read recorded in src/lib.
const require = createRequire(import.meta.url);
const read = (file) => readFileSync(file, "utf8");
function load(file, imports = {}) {
  const output = ts.transpileModule(read(file), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, {
    exports,
    require: (name) => {
      if (name in imports) return imports[name];
      assert.equal(name, "react/jsx-runtime", `review proof must not load a widget or SDK (${name})`);
      return require(name);
    },
  }, { filename: file });
  return exports;
}

const ratingModule = load("src/lib/googleRating.ts");
const { googleRating } = ratingModule;
const { business } = load("src/lib/business.ts");
assert.equal(googleRating.sourceUrl, business.googleMapsUrl, "rating links to the business's own Google profile");
assert.equal(googleRating.scale, "5");
assert(Number(googleRating.score) > 0 && Number(googleRating.score) <= 5);
assert(Number.isInteger(googleRating.reviewCount) && googleRating.reviewCount > 0, "count is a recorded integer");
assert.match(googleRating.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
assert.equal(googleRating.checkedLabel, new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${googleRating.checkedOn}T00:00:00Z`)), "visible and machine-readable dates agree");

const reviewsModule = load("src/lib/googleReviews.ts");
const { googleReviews, reviewsFor } = reviewsModule;
assert(googleReviews.length >= 3, "at least three verbatim reviews are available");
assert.equal(new Set(googleReviews.map((review) => review.id)).size, googleReviews.length, "review ids are unique");
for (const review of googleReviews) {
  assert.equal(review.rating, 5);
  assert(review.text.length > 20 && review.author.trim(), `${review.id}: full text and author recorded`);
  assert(review.excerpt.length > 0, `${review.id}: has an excerpt`);
  for (const part of review.excerpt) assert(review.text.includes(part), `${review.id}: excerpt is verbatim ("${part.slice(0, 40)}")`);
  assert(!/\b(?:[A-Z][a-z]+\s)[A-Z][a-z]{2,}\b/.test(review.author) || review.author.endsWith("."), `${review.id}: surname shortened`);
}
for (const topic of ["home", "standard", "deep", "move"]) assert.equal(reviewsFor(topic, 3).length, 3);

const { default: StarRowModule } = { default: load("src/components/Icon.tsx", { react: {} }) };
const { default: GoogleRating } = load("src/components/GoogleRating.tsx", {
  "@/lib/googleRating": ratingModule,
  "@/components/Icon": StarRowModule,
});
for (const props of [{}, { onDark: true }, { prominent: true }, { onDark: true, prominent: true }]) {
  const html = renderToStaticMarkup(createElement(GoogleRating, props));
  assert(html.includes(`href="${business.googleMapsUrl}"`));
  assert(html.includes('rel="noopener noreferrer"') && html.includes('target="_blank"'));
  const visible = html.replace(/<[^>]*>/g, "");
  assert(visible.includes(googleRating.score) && visible.includes(`${googleRating.reviewCount} Google reviews`), "visible score and count match the recorded read");
  if (props.prominent) assert(html.includes(`dateTime="${googleRating.checkedOn}"`) && visible.includes(googleRating.checkedLabel), "prominent badge shows the read date");
  assert(!/award|certified|top-rated|#1|best in/i.test(visible), "no unofficial issuer claims");
}

// No review count anywhere may exceed the recorded count, and nothing may add
// review markup that implies a first-party rating Google does not display.
function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(tsx?|mdx?|json)$/.test(entry.name) ? [full] : [];
  });
}
const countClaim = /(\d[\d,]*)\s*\+?\s*(?:five-star\s+|5-star\s+|google\s+|customer\s+|verified\s+|happy\s+)*reviews?\b/gi;
for (const file of sourceFiles("src")) {
  const source = read(file);
  for (const match of source.matchAll(countClaim)) {
    assert(Number(match[1].replace(/,/g, "")) <= googleRating.reviewCount, `${file}: "${match[0]}" exceeds the recorded Google count`);
  }
  assert(!/aggregateRating|reviewCount"\s*:/.test(source), `${file}: no self-served review schema`);
}

const home = read("src/app/page.tsx");
assert(home.includes("fill preload"), "the first-screen photo must be discoverable early");
for (const photo of ["before1", "after1"]) assert.equal(home.split(`src="/photos/${photo}.jpg"`).length - 1, 1, "show the actual before/after pair once");
assert(home.includes("<ReviewCards") && home.includes("<TrustStrip") && home.includes("<GoogleRating"), "homepage shows verified proof");
assert(!home.includes("line-clamp") && !home.includes("RealWorkGallery"), "reduce text and gallery repetition rather than hiding it");
const homeServices = read("src/components/HomeServices.tsx");
assert(home.includes("<HomeServices"), "homepage renders its service choices");
for (const floor of ["$165", "$235", "$325"]) assert(homeServices.includes(floor));
const paid = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");
assert(paid.includes("<GoogleRating") && paid.includes("<ReviewCards") && !paid.includes("5.0★ Google rating"));
assert(!paid.includes("usually the same day") && !paid.includes("rushing a free re-clean"));
const terms = read("src/app/terms/page.tsx");
assert(terms.includes("contact us within 24 hours") && terms.includes("make-it-right"), "the 24-hour make-it-right promise is backed by the published terms");
console.log(`Trust proof checks passed: ${googleReviews.length} verbatim reviews, ${googleRating.score} from ${googleRating.reviewCount} (read ${googleRating.checkedOn}), four rendered badge variants, no inflated counts or self-served rating schema, 24-hour promise backed by terms.`);

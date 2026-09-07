import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
function load(file, imports = {}) {
  const source = readFileSync(file, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, {
    exports,
    require: (name) => {
      if (name in imports) return imports[name];
      assert.equal(name, "react/jsx-runtime", "review proof must not load a widget or SDK");
      return require(name);
    },
  }, { filename: file });
  return exports;
}
const data = load("src/lib/googleRating.ts");
const { googleRating } = data;
const { business } = load("src/lib/business.ts");
assert.equal(googleRating.sourceUrl, business.googleMapsUrl);
assert(Number(googleRating.score) > 0 && Number(googleRating.score) <= Number(googleRating.scale));
assert.equal(googleRating.scale, "5");
assert.match(googleRating.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
assert(!Number.isNaN(Date.parse(googleRating.checkedOn)));
assert.equal(googleRating.checkedLabel, new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${googleRating.checkedOn}T00:00:00Z`)), "visible and machine-readable verification dates agree");
assert(!("reviewCount" in googleRating), "the first-party read did not expose a review count");
const { default: GoogleRating } = load("src/components/GoogleRating.tsx", { "@/lib/googleRating": data });
for (const props of [{}, { onDark: true }, { prominent: true }, { onDark: true, prominent: true }]) {
  const html = renderToStaticMarkup(createElement(GoogleRating, props));
  assert(html.includes('href="https://www.google.com/maps?cid=12575787905603463321"'));
  assert(html.includes(`dateTime="${googleRating.checkedOn}"`));
  assert(html.includes("As of ") && html.includes("Rated on Google"));
  const visibleText = html.replace(/<[^>]*>/g, "");
  assert(visibleText.includes(`${googleRating.score}/${googleRating.scale}`), "visible rating matches the verified value");
  assert(visibleText.includes(googleRating.checkedLabel), "visible date is present in every variant");
  assert(html.includes('rel="noopener noreferrer"'));
  assert(!/★|★★★★★|<img|<svg|<script|<iframe|award|certified|top-rated/i.test(html), "numeric dated proof is not an unofficial issuer badge");
}
const home = readFileSync("src/app/page.tsx", "utf8");
assert(home.includes("fill preload"), "the first-screen photo must be discoverable early");
for (const photo of ["before1", "after1"]) assert.equal(home.split(`src="/photos/${photo}.jpg"`).length - 1, 1, "show the actual before/after pair once");
assert(!home.includes("line-clamp") && !home.includes("RealWorkGallery"), "reduce text and gallery repetition rather than hiding it");
const homeServices = readFileSync("src/components/HomeServices.tsx", "utf8");
assert(home.includes("<HomeServices"), "homepage renders its service choices");
for (const floor of ["$165", "$235", "$325"]) assert(homeServices.includes(floor));
const paid = readFileSync("src/app/google-ads/GoogleAdsLandingPageClient.tsx", "utf8");
assert(paid.includes("<GoogleRating") && !paid.includes("5.0★ Google rating"));
assert(!paid.includes("usually the same day") && !paid.includes("rushing a free re-clean"));
console.log("Trust and copy checks passed: four rendered rating variants, dated matching source, no invented count/award/widget, photo-led home, floors and paid wording.");

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Review-proof contract: the rating and every quote must trace to the
// recorded Google Business Profile read. Public proof has no counts or links.
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
const { googleRating, homesServedLine } = ratingModule;
const { business } = load("src/lib/business.ts");
assert.equal(googleRating.scale, "5");
assert(Number(googleRating.score) > 0 && Number(googleRating.score) <= 5);
assert.match(googleRating.checkedOn, /^\d{4}-\d{2}-\d{2}$/);
assert.equal(new Date(`${googleRating.checkedOn}T00:00:00Z`).toISOString().slice(0, 10), googleRating.checkedOn, "recorded read date is valid");
assert.equal(googleRating.checkedLabel, new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
}).format(new Date(`${googleRating.checkedOn}T00:00:00Z`)), "recorded date label and machine-readable date agree");
const ratingRead = read("src/lib/googleRating.ts").match(/^\/\/ First-party Google Maps read of the New Star Business Profile on (\d{4}-\d{2}-\d{2}):\r?\n\/\/ ([\d.]+) average\./m);
assert(ratingRead, "rating retains its recorded read provenance");
assert.equal(ratingRead[1], googleRating.checkedOn, "rating read date matches recorded metadata");
assert.equal(ratingRead[2], googleRating.score, "rating score matches the recorded read");
assert(typeof homesServedLine === "string" && homesServedLine.trim(), "homes served copy is recorded");

const reviewsModule = load("src/lib/googleReviews.ts");
const { googleReviews, reviewsFor } = reviewsModule;
const profileRead = read("src/lib/googleReviews.ts").match(/^\/\/ \((https:\/\/www\.google\.com\/maps\?cid=\d+)\), read (\d{4}-\d{2}-\d{2})\.$/m);
assert(profileRead, "reviews retain their recorded profile provenance");
assert.equal(profileRead[1], business.googleMapsUrl, "recorded reviews come from the business's own Google profile");
assert.equal(profileRead[2], googleRating.checkedOn, "reviews and rating share the recorded read date");
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

const countClaim = /(\d[\d,]*)\s*\+?\s*(?:five-star\s+|5-star\s+|google\s+|customer\s+|verified\s+|happy\s+)*reviews?\b/gi;
function assertReviewPresentation(html, label) {
  assert(!/<a\b/i.test(html), `${label}: review proof has no public links`);
  for (const match of html.matchAll(countClaim)) assert.fail(`${label}: "${match[0]}" is a public numerical review-count claim`);
}
const { default: StarRowModule } = { default: load("src/components/Icon.tsx", { react: {} }) };
const { default: GoogleRating } = load("src/components/GoogleRating.tsx", {
  "@/lib/googleRating": ratingModule,
  "@/components/Icon": StarRowModule,
});
for (const props of [{}, { onDark: true }, { prominent: true }, { onDark: true, prominent: true }]) {
  const html = renderToStaticMarkup(createElement(GoogleRating, props));
  assertReviewPresentation(html, "GoogleRating");
  const visible = html.replace(/<[^>]*>/g, "");
  assert(visible.includes(`${googleRating.score} on Google`), "visible score and Google attribution match the recorded read");
  assert.equal(visible.includes(homesServedLine), Boolean(props.prominent), "only prominent badges show the recorded homes served line");
  assert(!/award|certified|top-rated|#1|best in/i.test(visible), "no unofficial issuer claims");
}

const { default: ReviewCards } = load("src/components/ReviewCards.tsx", {
  "@/lib/googleReviews": reviewsModule,
  "@/components/Icon": StarRowModule,
});
for (const props of [{}, { reviews: googleReviews }, ...["home", "standard", "deep", "move"].map((topic) => ({ topic }))]) {
  const html = renderToStaticMarkup(createElement(ReviewCards, props));
  const list = props.reviews ?? reviewsFor(props.topic ?? "home", 3);
  assertReviewPresentation(html, "ReviewCards");
  assert.equal((html.match(/data-review-id=/g) ?? []).length, list.length, "renders the selected recorded reviews");
  for (const review of list) {
    assert(html.includes(`data-review-id="${review.id}"`), `${review.id}: recorded id is rendered`);
    const quote = renderToStaticMarkup(createElement("p", null, `“${review.excerpt.join(" … ")}”`));
    assert(html.includes(`<blockquote>${quote}</blockquote>`), `${review.id}: rendered quote preserves verbatim excerpt segments and omissions`);
    const author = renderToStaticMarkup(createElement("strong", null, review.author));
    assert(html.includes(author), `${review.id}: recorded author is rendered`);
  }
}

// Reject numerical public review counts, and nothing may add review markup
// that implies a first-party rating Google does not display. Ordinary Maps
// navigation elsewhere is not a review CTA; link checks stay on proof surfaces.
function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(tsx?|mdx?|json)$/.test(entry.name) ? [full] : [];
  });
}
for (const file of sourceFiles("src")) {
  const source = read(file);
  for (const match of source.matchAll(countClaim)) {
    assert.fail(`${file}: "${match[0]}" is a public numerical review-count claim`);
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
assert(!homeServices.includes("{choice.price}") && !homeServices.includes("{selected.price}"), "home services render no prices");
const paid = read("src/app/google-ads/GoogleAdsLandingPageClient.tsx");
assert(paid.includes("<GoogleRating") && paid.includes("<ReviewCards") && !paid.includes("5.0★ Google rating"));
assert(!paid.includes("usually the same day") && !paid.includes("rushing a free re-clean"));
const terms = read("src/app/terms/page.tsx").replace(/\s+/g, " ");
assert(terms.includes("If something included in the agreed cleaning scope was missed, contact us within 24 hours of the completed service and we will come back and fix it at no charge.") && terms.includes("Requests for work outside the confirmed scope are not included."), "the scoped 24-hour free-return promise is backed by the published terms");
console.log(`Trust proof checks passed: ${googleReviews.length} recorded verbatim reviews, ${googleRating.score} on Google (recorded read ${googleRating.checkedOn}), four rendered badge variants and ReviewCards without review links or public counts, prominent homes served line, no self-served rating schema, 24-hour promise backed by terms.`);

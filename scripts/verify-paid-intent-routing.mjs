import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const root = process.cwd();
const paidPage = readFileSync(path.join(root, "src/app/google-ads/GoogleAdsLandingPageClient.tsx"), "utf8");
const houseBlock = paidPage.slice(paidPage.indexOf("  house: {"), paidPage.indexOf("  move: {"));
const failures = [];
const passes = [];

function assert(condition, message) {
  (condition ? passes : failures).push(message);
}

assert(paidPage.includes('type PaidIntent = "house" | "move" | "deep" | "recurring" | "postConstruction"'), "paid intent contract includes generic house separately from recurring");
for (const intent of ["house", "recurring", "deep", "move", "postConstruction", "commercial"]) {
  assert(paidPage.includes(`${intent}: {`), `paid page defines ${intent} configuration`);
}
assert(paidPage.includes('return "house";'), "missing or unknown paid service falls back to generic house intent");
assert(!paidPage.includes('return "move";\n}'), "missing or unknown service never defaults to move intent");
assert(paidPage.includes('normalizedService.includes("recurring")'), "recurring intent requires an explicit recurring signal");
assert(!paidPage.includes('normalizedService.includes("standard") return "recurring"'), "generic standard/house intent is not silently routed to recurring");
assert(paidPage.includes('serviceDefault: "Not sure yet"'), "generic house form state remains neutral");
assert(
  paidPage.includes("Professional house cleaning for") &&
    !paidPage.includes("without the guesswork"),
  "generic house headline uses direct professional local-service language",
);
assert(
  paidPage.includes("3 bed / 2 bath · about 1,600 sq ft") &&
    paidPage.includes("Standard $225 · Deep about $360 when maintained, often $475+ with heavier buildup"),
  "generic house hero distinguishes maintained and detail-intensive Deep pricing",
);
for (const expectedPrice of ["$225", "$360", "$475+"]) {
  assert(paidPage.includes(expectedPrice), `generic house pricing guide includes ${expectedPrice}`);
}
assert(
  paidPage.includes("Final price depends on the home’s condition and requested work") &&
    paidPage.includes("A $360 Deep assumes a maintained home") &&
    paidPage.includes("often starts around $475"),
  "generic house price context states the condition assumption and heavier-clean range",
);
for (const rejectedPrice of ["$165", "$195", "$300"]) {
  assert(!houseBlock.includes(rejectedPrice), `generic house price lane omits floor-price anchor: ${rejectedPrice}`);
}
for (const rejectedFrequencyPhrase of ["weekly", "every other week", "every-other-week", "monthly"]) {
  assert(!houseBlock.toLowerCase().includes(rejectedFrequencyPhrase), `generic house price lane avoids recurring-rate framing: ${rejectedFrequencyPhrase}`);
}
for (const rejectedPhrase of ["normal-condition", "1/1", "without the guesswork"]) {
  assert(!houseBlock.toLowerCase().includes(rejectedPhrase), `generic house copy rejects operator jargon: ${rejectedPhrase}`);
}
assert(paidPage.includes("Reliable recurring house cleaning for"), "recurring headline remains distinct and professional");
assert(
  paidPage.includes('"near-me": "Fresno-area"') &&
    paidPage.includes('(value || "near-me")') &&
    paidPage.includes(': "near-me";'),
  "missing or unknown city uses the factual Fresno-area label instead of silently claiming Fresno",
);
assert(paidPage.includes('serviceDefault: "Deep cleaning"'), "deep intent form state matches its scope");
assert(
  paidPage.includes("About $360 when maintained · often $475+ with heavier buildup"),
  "deep intent exposes condition-accurate representative pricing",
);
assert(paidPage.includes('serviceDefault: "Move-in / move-out cleaning"'), "move intent form state matches its scope");
assert(
  paidPage.includes("empty cabinet, drawer, and closet interiors") &&
    paidPage.includes("Inside the oven and refrigerator") &&
    paidPage.includes("From $325 · empty cabinet & closet interiors included") &&
    !paidPage.includes("appliance & cabinet interiors are add-ons"),
  "move intent agrees with the current floor and included empty-cabinet scope",
);
assert(
  paidPage.includes('serviceDefault: "Post-construction cleaning"') &&
    paidPage.includes("not demo waste") &&
    paidPage.includes("a return visit is quoted separately"),
  "post-construction intent states hauling exclusion and return-visit pricing honestly",
);
assert(
  paidPage.includes("shower-detail-before.webp") &&
    paidPage.includes("vent-detail-before.webp") &&
    paidPage.includes("oven-interior-before.webp") &&
    paidPage.includes("tub-surround-before.webp") &&
    paidPage.includes("refrigerator-full-before.webp") &&
    paidPage.includes("refrigerator-detail-before.webp") &&
    paidPage.includes("Six real before-and-after results") &&
    paidPage.includes("BeforeAfterGallery"),
  "residential paid intents retain six real before-and-after proof pairs",
);
for (const removedBloat of ["PricingGuide", "SectionCard", "scopeBullets", "addonBullets", "boundaryBullets", "heroBullets"]) {
  assert(!paidPage.includes(removedBloat), `paid page removes obsolete text-wall structure: ${removedBloat}`);
}

// Execute the real page and resolver with inert form/tracking boundaries.
// No browser, build, lead submission, or external API is used by this matrix.
const require = createRequire(import.meta.url);
const jsx = require("react/jsx-runtime");
let params = new URLSearchParams();
const boundary = (name) => (props) => jsx.jsx("test-boundary", { ...props, "data-boundary": name });
const compiled = ts.transpileModule(`${paidPage}\nexports.routingTest = { detectIntent, INTENT_CONFIG };`, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  reportDiagnostics: true,
});
assert(!(compiled.diagnostics || []).some((item) => item.category === ts.DiagnosticCategory.Error), "paid page transpiles without syntax errors");
const runtimeModule = { exports: {} };
vm.runInNewContext(compiled.outputText, {
  exports: runtimeModule.exports,
  module: runtimeModule,
  require: (name) => {
    if (name === "react/jsx-runtime") return jsx;
    if (name === "react") return {
      useMemo: (fn) => fn(), useRef: (current) => ({ current }), useEffect: () => {},
      // Exercise the sticky CTA visible branch as well as the regular render.
      useState: (initial) => [initial === false ? true : initial, () => {}],
    };
    if (name === "next/navigation") return { useSearchParams: () => params };
    if (name === "next/image") return boundary("Image");
    if (name.startsWith("@/components/")) return boundary(name.split("/").at(-1));
    if (name === "@/lib/attribution") return { captureFirstPaidTouch: () => {} };
    if (name === "@/lib/conversionTracking") return { trackFunnelEvent: () => {} };
    throw new Error(`Unexpected paid dependency: ${name}`);
  },
});
const { detectIntent, INTENT_CONFIG } = runtimeModule.exports.routingTest;
const render = (service, frequency = "") => {
  params = new URLSearchParams({ service: service || "", frequency, city: "clovis", gclid: "regression-only" });
  const nodes = [];
  const text = [];
  function visit(node) {
    if (node == null || typeof node === "boolean") return;
    if (Array.isArray(node)) return node.forEach(visit);
    if (typeof node !== "object") { text.push(String(node)); return; }
    if (typeof node.type === "function") return visit(node.type(node.props));
    nodes.push(node);
    visit(node.props?.children);
  }
  visit(runtimeModule.exports.default({ directBookingUrl: "https://booking.example.test/" }));
  return { nodes, text: text.join(" "), forms: nodes.filter((node) => /QuoteForm$/.test(node.props?.["data-boundary"] || "")) };
};
const commercialAliases = ["Office / commercial cleaning", "commercial-cleaning", "commercial", "office", "commercial cleaning", "office-cleaning", "  OFFICE CLEANING  ", "recurring office cleaning", "commercial deep cleaning"];
for (const alias of commercialAliases) {
  for (const frequency of ["", "recurring", "weekly", "biweekly", "bi-weekly", "monthly"]) {
    const result = render(alias, frequency);
    const form = result.forms[0];
    const label = `${alias} / ${frequency || "no frequency"}`;
    assert(detectIntent(alias, frequency) === "commercial", `${label}: commercial outranks residential frequency/deep signals`);
    assert(result.forms.length === 1 && form?.props["data-boundary"] === "CommercialQuoteForm" && form.props.source === "google-ads" && form.props.defaultService === "Office / commercial cleaning" && !form.props.directBookingUrl, `${label}: paid proposal form with known service and no booking URL`);
    assert(!result.nodes.some((node) => node.props?.["data-boundary"] === "BookingPortalLink" || /\/photos\/|\/illustrations\//.test(node.props?.src || "") || /book-now|booking\.example/.test(node.props?.href || "")), `${label}: zero residential imagery or self-book exits`);
    assert(result.text.includes("Commercial cleaning proposals for Clovis workplaces.") && result.text.includes("Review your written proposal") && !/\$\d|clean home|homes\.|You choose the date|Get my quote|Before you book|Pick a date|book online|floors\./i.test(result.text), `${label}: proposal-only headline, process, closing and sticky copy`);
  }
}
assert(INTENT_CONFIG.commercial.proofOrder.length === 0 && !INTENT_CONFIG.commercial.priceContext, "commercial config carries no residential photo mapping or price anchor");
for (const [service, frequency, expected] of [[null, "", "house"], ["unknown", "", "house"], ["standard-cleaning", "", "house"], ["standard-cleaning", "weekly", "recurring"], ["recurring-cleaning", "", "recurring"], ["deep-cleaning", "monthly", "deep"], ["move-out-cleaning", "weekly", "move"]]) {
  const result = render(service, frequency);
  const form = result.forms[0];
  assert(detectIntent(service, frequency) === expected && form?.props["data-boundary"] === "QuickQuoteForm" && form.props.source === "google-ads" && form.props.paidSearch === true && form.props.extended === true && form.props.defaultService === INTENT_CONFIG[expected].serviceDefault && form.props.landingCity === "Clovis" && form.props.directBookingUrl === "https://booking.example.test/", `${service || "missing"} / ${frequency}: preserves residential intent and paid form props`);
  assert(result.nodes.filter((node) => node.props?.["data-boundary"] === "BookingPortalLink").length === 2 && result.nodes.filter((node) => /\/photos\/real-work\/paid\//.test(node.props?.src || "")).length === 12, `${service || "missing"} / ${frequency}: preserves both booking exits and all six proof pairs`);
}
const project = render("post-construction-cleaning", "weekly");
assert(detectIntent("post-construction-cleaning", "weekly") === "postConstruction" && project.forms[0]?.props["data-boundary"] === "QuickQuoteForm" && project.forms[0].props.defaultService === "Post-construction cleaning" && project.forms[0].props.directBookingUrl === null && !project.nodes.some((node) => node.props?.["data-boundary"] === "BookingPortalLink" || /\/photos\/|\/illustrations\//.test(node.props?.src || "")), "post-construction retains its existing conditional form and no residential booking/proof");
for (const intent of Object.keys(INTENT_CONFIG)) assert(INTENT_CONFIG[intent].faqs.length === 2, `${intent}: exactly two scoped FAQs`);
assert(paidPage.includes("captureFirstPaidTouch({") && paidPage.includes("if (!hasTrackedLandingView.current)") && paidPage.includes('trackFunnelEvent("paid_landing_view"') && paidPage.includes('trackFunnelEvent("quote_cta_click"'), "first-touch and once-only paid attribution guards remain intact");

if (failures.length) {
  console.error("Paid intent routing verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Paid intent routing checks passed:");
for (const pass of passes) console.log(`- ${pass}`);

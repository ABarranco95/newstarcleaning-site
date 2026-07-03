"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import QuickQuoteForm from "@/components/QuickQuoteForm";

type PaidIntent = "move" | "deep" | "recurring";

type CityKey =
  | "fresno"
  | "clovis"
  | "madera"
  | "woodward-park"
  | "fig-garden"
  | "tower-district"
  | "near-me";

type PaidIntentConfig = {
  eyebrow: string;
  h1: (city: string) => string;
  subhead: string;
  serviceDefault: string;
  formTitle: string;
  formSubtitle: string;
  heroBullets: string[];
  scopeTitle: string;
  scopeIntro: string;
  scopeBullets: string[];
  addonTitle: string;
  addonBullets: string[];
  boundaryTitle: string;
  boundaryBullets: string[];
  proofTitle: string;
  proofCopy: string;
  faqs: Array<{ question: string; answer: string }>;
};

const CITY_LABELS: Record<CityKey, string> = {
  fresno: "Fresno",
  clovis: "Clovis",
  madera: "Madera",
  "woodward-park": "Woodward Park",
  "fig-garden": "Fig Garden",
  "tower-district": "Tower District",
  "near-me": "your area",
};

const INTENT_CONFIG: Record<PaidIntent, PaidIntentConfig> = {
  move: {
    eyebrow: "Move-in / move-out cleaning · deposit-ready turnover work",
    h1: (city) => `Move-Out Cleaning in ${city} for a cleaner handoff`,
    subhead:
      "Get a clear quote fast for empty homes, rentals, and move deadlines — with scope, timing, and add-ons confirmed before the job is accepted.",
    serviceDefault: "Move-in / move-out cleaning",
    formTitle: "Request move-out cleaning pricing",
    formSubtitle:
      "Send the home size, move timing, and condition once. We price the scope before anything is booked.",
    heroBullets: [
      "Empty-home turnover cleaning",
      "Baseboards, bathrooms, kitchen, fixtures, and floors",
      "Add-ons confirmed upfront",
      "Standard-condition assumptions stated clearly",
    ],
    scopeTitle: "Built for empty-home turnover cleaning",
    scopeIntro:
      "Move-out cleaning needs tighter scope control than a regular maintenance clean. The job is priced around what is empty, reachable, and confirmed before booking.",
    scopeBullets: [
      "Kitchen counters, sink, exterior cabinets, and exterior appliances",
      "Bathrooms, fixtures, mirrors, tubs, and showers in normal condition",
      "Bedrooms, closets, and common areas when empty and reachable",
      "Baseboards, trim, doors, frames, reachable vents, and fixtures",
      "Floors vacuumed and mopped after the agreed detail work is complete",
    ],
    addonTitle: "Add-ons we define before quoting",
    addonBullets: [
      "Inside oven",
      "Inside refrigerator",
      "Inside cabinets and drawers",
      "Interior windows and tracks",
      "Blinds",
      "Heavy pet hair or heavy buildup",
    ],
    boundaryTitle: "Scope-first turnover cleaning",
    boundaryBullets: [
      "No same-day promise from an ad click",
      "No vague quote that changes after the cleaner arrives",
      "No laundry, dishes, packing, unpacking, or organizing",
      "Heavy-duty conditions are priced separately before the job is accepted",
    ],
    proofTitle: "Move work is won on scope, not slogans",
    proofCopy:
      "The right move-out clean protects the customer, the cleaner, and the schedule. We ask the pricing questions upfront so the job is not underbid or rushed.",
    faqs: [
      {
        question: "Can you clean before my move deadline?",
        answer:
          "Usually, if the schedule is planned. Send the date, home size, and whether the home is empty so we can confirm real availability instead of making a same-day promise we cannot protect.",
      },
      {
        question: "Are oven, fridge, cabinets, and windows included?",
        answer:
          "They can be included when confirmed in the quote. We define appliance interiors, cabinet interiors, windows, tracks, blinds, and heavy buildup before booking so there are no surprises.",
      },
      {
        question: "What if the home is heavier than standard condition?",
        answer:
          "We price heavy buildup, pet hair, grease, neglected bathrooms, or unusual conditions separately before the job is accepted. That keeps the quote fair and the cleaner prepared.",
      },
    ],
  },
  deep: {
    eyebrow: "Deep cleaning · detailed home reset",
    h1: (city) => `Deep Cleaning in ${city} for a real home reset`,
    subhead:
      "Request clear pricing for kitchens, bathrooms, baseboards, reachable fixtures, trim, vents, and floors — without a vague lowball quote.",
    serviceDefault: "Deep cleaning",
    formTitle: "Request deep cleaning pricing",
    formSubtitle:
      "Tell us the size, condition, and priority areas so we can price the reset correctly before booking.",
    heroBullets: [
      "Detailed reset cleaning",
      "Condition checked before quote",
      "Clear add-on boundaries",
      "Premium local cleaning team",
    ],
    scopeTitle: "For homes past maintenance-cleaning condition",
    scopeIntro:
      "Deep cleaning is for detail work and buildup that a regular visit is not designed to handle. We price it around condition, size, and the areas that matter most.",
    scopeBullets: [
      "Kitchen surfaces, exterior appliances, sink, backsplash, and cabinet fronts",
      "Bathroom fixtures, toilets, tubs, showers, mirrors, and detail edges",
      "Baseboards, trim, doors, switch plates, and reachable vents",
      "Reachable light fixtures, ceiling fans, detail corners, and high-touch areas",
      "Floors vacuumed and mopped after detailed surface cleaning is complete",
    ],
    addonTitle: "Possible add-ons if the home needs them",
    addonBullets: [
      "Inside oven",
      "Inside refrigerator",
      "Interior windows and tracks",
      "Blinds",
      "Heavy pet hair",
      "Heavy grease, soap scum, or neglected buildup",
    ],
    boundaryTitle: "Clear expectations before the job",
    boundaryBullets: [
      "No open-ended “clean everything” quote",
      "No laundry, dishes, organizing, or bed making",
      "No unsafe climbing or unreachable fixtures",
      "Heavy-duty work is quoted separately before scheduling",
    ],
    proofTitle: "A deep clean should be priced like real work",
    proofCopy:
      "The goal is a serious reset, not a rushed checklist. We confirm condition first so the cleaner has enough time and the customer knows what is included.",
    faqs: [
      {
        question: "How is deep cleaning different from standard recurring cleaning?",
        answer:
          "Deep cleaning targets buildup, detail edges, baseboards, trim, reachable fixtures, bathrooms, and kitchen detail. Standard recurring cleaning is maintenance for homes already kept in normal condition.",
      },
      {
        question: "Can I choose priority areas?",
        answer:
          "Yes. Tell us the rooms or issues that matter most. We use that to confirm scope and avoid underpricing the job.",
      },
      {
        question: "What if the home has heavy buildup or pet hair?",
        answer:
          "That can still be handled, but it has to be priced as heavy-duty work before booking. We do not hide that until arrival.",
      },
    ],
  },
  recurring: {
    eyebrow: "Recurring cleaning · weekly, biweekly, or monthly",
    h1: (city) => `Recurring House Cleaning in ${city} for a home that stays maintained`,
    subhead:
      "Weekly, biweekly, and monthly cleaning for homeowners who want a reliable local cleaning company and a consistent maintenance scope.",
    serviceDefault: "Standard recurring cleaning",
    formTitle: "Request recurring cleaning pricing",
    formSubtitle:
      "Share the home size, frequency, and current condition so we can recommend the right first clean and maintenance schedule.",
    heroBullets: [
      "Weekly, biweekly, and monthly options",
      "Maintenance cleaning for homes in normal condition",
      "First clean may need deep-clean pricing if condition requires it",
      "No long-term contract",
    ],
    scopeTitle: "Built for consistent home maintenance",
    scopeIntro:
      "Recurring cleaning works when the starting condition and ongoing scope are clear. If the first visit needs a reset, we say that before setting a maintenance schedule.",
    scopeBullets: [
      "Kitchen counters, sink, exterior appliance surfaces, and visible surfaces",
      "Bathrooms, mirrors, fixtures, toilets, tubs, and showers in normal condition",
      "Dusting of reachable surfaces, high-touch areas, and common rooms",
      "Floors vacuumed and mopped as part of the recurring maintenance scope",
      "Frequency matched to home size, traffic, pets, and upkeep expectations",
    ],
    addonTitle: "Recurring scope can be adjusted",
    addonBullets: [
      "Weekly cleaning",
      "Biweekly cleaning",
      "Monthly cleaning",
      "First-visit deep reset",
      "Priority room rotation",
      "Add-ons quoted separately when needed",
    ],
    boundaryTitle: "Who this is not for",
    boundaryBullets: [
      "Built around scheduled weekly, biweekly, or monthly maintenance",
      "Same-day emergency service is not promised from an ad click",
      "Not for laundry, dishes, organizing, or household chores",
      "Not for heavy buildup at maintenance-cleaning pricing",
    ],
    proofTitle: "Recurring clients need reliability and scope control",
    proofCopy:
      "The first clean sets the relationship. We confirm frequency, size, condition, and priorities before recommending recurring service.",
    faqs: [
      {
        question: "Do I need a deep clean before recurring service?",
        answer:
          "Sometimes. If the home needs a reset before maintenance cleaning makes sense, we will say that before booking the recurring schedule.",
      },
      {
        question: "Can I do biweekly instead of weekly?",
        answer:
          "Yes. Weekly, biweekly, and monthly can all work depending on home size, pets, traffic, and expectations.",
      },
      {
        question: "Is there a long-term contract?",
        answer:
          "No long-term contract. The priority is clear scope, reliable scheduling, and a home that stays consistently maintained.",
      },
    ],
  },
};

function normalizeCity(value: string | null): { key: CityKey; label: string; formValue: string } {
  const normalized = (value || "fresno").trim().toLowerCase().replace(/_/g, "-");
  const key = Object.prototype.hasOwnProperty.call(CITY_LABELS, normalized)
    ? (normalized as CityKey)
    : "fresno";
  const label = CITY_LABELS[key];
  return {
    key,
    label,
    formValue: key === "near-me" ? "" : label,
  };
}

function detectIntent(service: string | null, frequency: string | null): PaidIntent {
  const normalizedService = (service || "").trim().toLowerCase();
  const normalizedFrequency = (frequency || "").trim().toLowerCase();

  if (normalizedService.includes("deep")) return "deep";
  if (normalizedService.includes("move")) return "move";
  if (normalizedFrequency.includes("recurring") || normalizedService.includes("standard")) return "recurring";
  return "move";
}

function TrustBar({ city }: { city: string }) {
  const items = [`${city} + nearby routes`, "Clear pricing first", "Scope confirmed upfront", "Call or quote form"];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white/90">
          {item}
        </div>
      ))}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
      <h2 className="font-display text-2xl leading-tight text-primary md:text-3xl">{title}</h2>
      <div className="mt-5 text-sm leading-7 text-ink-soft md:text-base">{children}</div>
    </section>
  );
}

function FAQAccordion({ faqs }: { faqs: PaidIntentConfig["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary transition hover:bg-slate-50 md:text-base"
          >
            <span>{faq.question}</span>
            <span className="text-xl text-accent">{openIndex === index ? "−" : "+"}</span>
          </button>
          <div className={openIndex === index ? "px-5 pb-5 text-sm leading-7 text-ink-soft" : "hidden"}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-[0_-12px_30px_rgba(14,22,38,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href="tel:+15597852822" className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-center text-sm font-bold text-primary">
          Call
        </a>
        <a href="#booking-form" className="flex-1 rounded-full bg-accent px-4 py-3 text-center text-sm font-bold text-white">
          Request pricing
        </a>
      </div>
    </div>
  );
}

export default function GoogleAdsLandingPageClient() {
  const searchParams = useSearchParams();
  const city = useMemo(() => normalizeCity(searchParams.get("city")), [searchParams]);
  const intentKey = useMemo(
    () => detectIntent(searchParams.get("service"), searchParams.get("frequency")),
    [searchParams]
  );
  const intent = INTENT_CONFIG[intentKey];

  return (
    <div className="bg-slate-50 pb-24 text-ink md:pb-0">
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
          <div className="flex flex-col justify-center text-white">
            <div className="mb-5 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              {intent.eyebrow}
            </div>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.03] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4.6rem]">
              {intent.h1(city.label)}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              {intent.subhead}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#booking-form" className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-bold text-white transition hover:bg-accent-hover">
                Get pricing & availability
              </a>
              <a href="tel:+15597852822" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/14">
                Call (559) 785-2822
              </a>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {intent.heroBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/8 p-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="text-sm font-semibold leading-6 text-white/90">{bullet}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <TrustBar city={city.label} />
            </div>
          </div>

          <div id="booking-form" className="self-start">
            <QuickQuoteForm
              source="google-ads"
              title={intent.formTitle}
              subtitle={intent.formSubtitle}
              defaultCity={city.formValue}
              defaultService={intent.serviceDefault}
              extended
              paidSearch
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:px-8 lg:py-14">
        <SectionCard title={intent.scopeTitle}>
          <p>{intent.scopeIntro}</p>
          <ul className="mt-5 grid gap-3">
            {intent.scopeBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title={intent.addonTitle}>
          <ul className="grid gap-3">
            {intent.addonBullets.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-primary">
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-14">
        <SectionCard title={intent.boundaryTitle}>
          <ul className="grid gap-3">
            {intent.boundaryBullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <section className="rounded-[2rem] border border-primary/15 bg-primary p-6 text-white md:p-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">Why this is priced carefully</div>
          <h2 className="mt-4 font-display text-2xl leading-tight md:text-3xl">{intent.proofTitle}</h2>
          <p className="mt-5 text-sm leading-7 text-white/82 md:text-base">{intent.proofCopy}</p>
          <div className="mt-6 grid gap-3 text-sm font-semibold text-white/90 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4">Fresno, Clovis, Madera</div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4">Quote before booking</div>
          </div>
        </section>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <div className="eyebrow eyebrow-dot justify-center">Paid-search questions</div>
          <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">Before you request pricing</h2>
        </div>
        <FAQAccordion faqs={intent.faqs} />
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-primary md:text-4xl">Ready for clear pricing?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
          Send the details once. We confirm the scope, timing, and price before the job is accepted.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#booking-form" className="rounded-full bg-accent px-6 py-4 text-sm font-bold text-white transition hover:bg-accent-hover">
            Request pricing
          </a>
          <a href="tel:+15597852822" className="rounded-full border border-slate-200 px-6 py-4 text-sm font-bold text-primary transition hover:border-accent hover:text-accent">
            Call (559) 785-2822
          </a>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}

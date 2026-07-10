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
    eyebrow: "Move-in / move-out cleaning · empty-home service",
    h1: (city) => `Move-Out Cleaning in ${city} for a cleaner handoff`,
    subhead:
      "Request pricing for an empty home, rental turnover, or move deadline. We confirm the home details, included work, and current appointment options before booking.",
    serviceDefault: "Move-in / move-out cleaning",
    formTitle: "Request move-out cleaning pricing",
    formSubtitle:
      "Send home size and move timing first. Add condition or appliance details below if you want a tighter quote.",
    heroBullets: [
      "Empty-home room cleaning",
      "Kitchen, bathrooms, baseboards, and floors",
      "Empty appliances, cabinets, drawers, and closets",
      "Condition and optional details confirmed before booking",
    ],
    scopeTitle: "Detailed cleaning for an empty home",
    scopeIntro:
      "Move-out cleaning is quoted from the home size, condition, access, deadline, and requested extras. The home should be empty or mostly empty before the appointment.",
    scopeBullets: [
      "Kitchen counters, sink, backsplash, cabinet fronts, and accessible surfaces",
      "Inside an empty oven, refrigerator, microwave, cabinets, and drawers",
      "Bathrooms, fixtures, mirrors, tubs, and showers in standard condition",
      "Empty bedrooms, closets, living areas, baseboards, trim, and doors",
      "Floors vacuumed and mopped after the detailed surface work",
    ],
    addonTitle: "Optional details priced separately",
    addonBullets: [
      "Interior window glass",
      "Garage sweeping",
      "Patio or balcony sweeping",
      "Extra blind detail",
      "Heavy pet hair or heavy buildup",
    ],
    boundaryTitle: "Before the appointment",
    boundaryBullets: [
      "The requested date is confirmed after route availability is checked",
      "Laundry, dishes, packing, unpacking, and organizing are not included",
      "Heavy-duty conditions require additional time and pricing",
      "Exterior windows, tracks, screens, and ladder work are not included",
    ],
    proofTitle: "A quote built around the actual home",
    proofCopy:
      "Home size, condition, access, deadline, and requested extras all affect the time required. Sharing those details early produces a more accurate price and appointment window.",
    faqs: [
      {
        question: "Can you clean before my move deadline?",
        answer:
          "Send the preferred date, home size, address, and whether the home will be empty. We will check the route and confirm the available options before booking.",
      },
      {
        question: "Are oven, fridge, cabinets, and windows included?",
        answer:
          "Move-in/move-out cleaning includes the inside of an empty oven, refrigerator, microwave, and empty cabinets and drawers when accessible. Interior window glass is optional. Tracks, screens, exterior windows, and ladder work are not included.",
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
    h1: (city) => `Deep Cleaning in ${city} for a detailed home reset`,
    subhead:
      "Request pricing for detailed cleaning of accessible kitchens, bathrooms, baseboards, fixtures, trim, vents, floors, and reachable buildup areas.",
    serviceDefault: "Deep cleaning",
    formTitle: "Request deep cleaning pricing",
    formSubtitle:
      "Send the size and timing first. Add condition or priority areas below if you want a tighter quote.",
    heroBullets: [
      "Detailed reset cleaning",
      "Condition checked before quote",
      "Optional details priced separately",
      "Local residential cleaning service",
    ],
    scopeTitle: "Detailed cleaning beyond routine maintenance",
    scopeIntro:
      "Deep cleaning is intended for a first visit, seasonal reset, or visible buildup on reachable surfaces. We quote it from the home size, condition, and requested priorities.",
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
      "Inside empty cabinets or pantry shelves",
      "Interior window glass",
      "Heavy pet hair",
      "Heavy grease, soap scum, or neglected buildup",
    ],
    boundaryTitle: "Before the appointment",
    boundaryBullets: [
      "Laundry, dishes, organizing, and bed making are not included",
      "Cleaners do not perform unsafe climbing or unreachable detail work",
      "Heavy-duty buildup requires additional time and pricing",
      "Appliance, cabinet, and window interiors are included only when quoted",
    ],
    proofTitle: "Detailed work needs the right amount of time",
    proofCopy:
      "We ask about the home condition and priority areas before confirming the price so the appointment is planned around the requested work.",
    faqs: [
      {
        question: "How is deep cleaning different from standard recurring cleaning?",
        answer:
          "Deep cleaning targets buildup, detail edges, baseboards, trim, reachable fixtures, bathrooms, and kitchen detail. Standard recurring cleaning is maintenance for homes already kept in normal condition.",
      },
      {
        question: "Can I choose priority areas?",
        answer:
          "Yes. Tell us which rooms or surfaces matter most so they can be reflected in the confirmed quote.",
      },
      {
        question: "What if the home has heavy buildup or pet hair?",
        answer:
          "Heavy buildup, pet hair, grease, or neglected areas may require additional time and pricing. Share the condition before booking so the quote can account for it.",
      },
    ],
  },
  recurring: {
    eyebrow: "Recurring cleaning · weekly, biweekly, or monthly",
    h1: (city) => `Recurring House Cleaning in ${city}`,
    subhead:
      "Weekly, bi-weekly, and monthly cleaning for maintained homes. We confirm the frequency, included work, price, and available schedule before service begins.",
    serviceDefault: "Standard recurring cleaning",
    formTitle: "Request recurring cleaning pricing",
    formSubtitle:
      "Share home size and timing first. Add frequency or condition details below if you want a tighter quote.",
    heroBullets: [
      "Weekly, biweekly, and monthly options",
      "Maintenance cleaning for homes in normal condition",
      "First clean may need deep-clean pricing if condition requires it",
      "Frequency and included work confirmed before booking",
    ],
    scopeTitle: "Routine cleaning for a maintained home",
    scopeIntro:
      "Recurring service is quoted from the starting condition, home size, household traffic, pets, requested priorities, and preferred frequency.",
    scopeBullets: [
      "Kitchen counters, sink, exterior appliance surfaces, and visible surfaces",
      "Bathrooms, mirrors, fixtures, toilets, tubs, and showers in normal condition",
      "Dusting of reachable surfaces, high-touch areas, and common rooms",
      "Floors vacuumed and mopped as part of the recurring maintenance scope",
      "Frequency matched to home size, traffic, pets, and upkeep expectations",
    ],
    addonTitle: "Options discussed before booking",
    addonBullets: [
      "Weekly cleaning",
      "Biweekly cleaning",
      "Monthly cleaning",
      "First-visit deep reset",
      "Priority room rotation",
      "Add-ons quoted separately when needed",
    ],
    boundaryTitle: "Before recurring service begins",
    boundaryBullets: [
      "The starting condition determines whether maintenance cleaning is the right first service",
      "Weekly, bi-weekly, and monthly availability depends on the local route",
      "Laundry, dishes, organizing, and household chores are not included",
      "Heavy buildup requires deep-clean or heavy-duty pricing",
    ],
    proofTitle: "A cleaning plan matched to the home",
    proofCopy:
      "Home size, household traffic, pets, starting condition, and preferred frequency all affect the recommended service and price.",
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
        question: "How is recurring frequency confirmed?",
        answer:
          "We review the home size, starting condition, household traffic, pets, preferred timing, and route availability before recommending weekly, bi-weekly, or monthly service.",
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
  const items = [`${city} + approved nearby routes`, "Quote before booking", "Included work confirmed", "Call or request online"];
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
    <section className="rounded-[2rem] border border-line bg-white p-6 md:p-8">
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
        <div key={faq.question} className="overflow-hidden rounded-2xl border border-line bg-white">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary transition hover:bg-cream-2 md:text-base"
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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-4 shadow-[0_-12px_30px_rgba(14,22,38,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href={"tel:+1" + "559" + "785" + "2822"} className="flex-1 rounded-xl border border-line px-4 py-3 text-center text-sm font-bold text-primary">
          Call
        </a>
        <a href="#booking-form" className="flex-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white">
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
    <div className="bg-cream-2 pb-24 text-ink md:pb-0">
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
              <a href="#booking-form" className="btn btn-accent !text-sm">
                Get pricing & availability
              </a>
              <a href="tel:+15597852822" className="btn btn-ghost-dark !text-sm">
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
              <li key={item} className="rounded-2xl border border-line bg-cream-2 px-4 py-3 font-semibold text-primary">
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

      <section className="border-t border-line bg-white px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-primary md:text-4xl">Ready for clear pricing?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
          Send the details once. We confirm the scope, timing, and price before the job is accepted.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#booking-form" className="btn btn-accent !text-sm">
            Request pricing
          </a>
          <a href="tel:+15597852822" className="btn btn-outline !text-sm">
            Call (559) 785-2822
          </a>
        </div>
      </section>

      <StickyMobileCTA />
    </div>
  );
}

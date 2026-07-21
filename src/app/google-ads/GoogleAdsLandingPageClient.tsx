"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import { captureFirstPaidTouch } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/conversionTracking";

type PaidIntent = "house" | "move" | "deep" | "recurring";

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
  pricingGuide?: {
    eyebrow: string;
    intro: string;
    examples: Array<{
      home: string;
      size: string;
      prices: Array<{ label: string; price: string }>;
    }>;
    footnote: string;
  };
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
  house: {
    eyebrow: "One-time house cleaning",
    h1: (city) => `House cleaning in ${city}, done with care.`,
    subhead:
      "For a 3-bedroom, 2-bath home around 1,600 sq ft, Standard Cleaning is $225 and Deep Cleaning is $360. We confirm the right service and full price before booking.",
    serviceDefault: "Not sure yet",
    formTitle: "Tell us about your home",
    formSubtitle:
      "Start with the size and timing. We'll send pricing and available days.",
    heroBullets: [
      "Standard and Deep prices shown side by side",
      "Home size and starting condition shape the quote",
      "Included work and full price confirmed first",
      "Fresno, Clovis, and Madera",
    ],
    pricingGuide: {
      eyebrow: "Standard or Deep?",
      intro:
        "These one-time examples show how the same home prices differently based on the cleaning it needs.",
      examples: [
        {
          home: "3 bedrooms, 2 bathrooms",
          size: "Around 1,600 sq ft",
          prices: [
            { label: "Standard", price: "$225" },
            { label: "Deep", price: "$360" },
          ],
        },
        {
          home: "4 bedrooms, 3 bathrooms",
          size: "Around 2,100 sq ft",
          prices: [
            { label: "Standard", price: "$300" },
            { label: "Deep", price: "$475" },
          ],
        },
      ],
      footnote:
        "Standard Cleaning is for routine upkeep. Deep Cleaning is for a first visit or visible buildup. Larger homes, heavier conditions, pet hair, and selected extras cost more.",
    },
    scopeTitle: "What kind of cleaning does your home need?",
    scopeIntro:
      "Some homes need a regular clean. Others need more time and detail on the first visit. Tell us what you're dealing with and we'll quote the right cleaning.",
    scopeBullets: [
      "Regular house cleaning for kitchens, bathrooms, dusting, and floors",
      "Deeper cleaning when there is buildup or more detail to cover",
      "Move-in or move-out cleaning for empty homes",
      "Optional extras added only when you ask for them",
    ],
    addonTitle: "What changes the price",
    addonBullets: [
      "Home size and number of bathrooms",
      "How much cleaning the home needs",
      "Pets or heavy pet hair",
      "Oven, refrigerator, windows, or other extras",
      "How soon you need the cleaning",
    ],
    boundaryTitle: "Good to know before booking",
    boundaryBullets: [
      "We'll confirm what is included and the full price first",
      "Available days depend on your area and requested date",
      "Laundry, dishes, and organizing are not included",
      "Heavy buildup or extra-detail work may cost more",
    ],
    proofTitle: "A clear quote for your home",
    proofCopy:
      "A few details about the home help us allow enough time and give you the full price before you book.",
    faqs: [
      {
        question: "Which cleaning price applies to my home?",
        answer:
          "Standard Cleaning is for routine upkeep. Deep Cleaning is for a first visit, visible buildup, or more detail. Tell us about the home and we'll confirm which service fits before you book.",
      },
      {
        question: "What kind of cleaning should I request?",
        answer:
          "If the home just needs regular kitchen, bathroom, dusting, and floor cleaning, start with house cleaning. If there's buildup or more detail to cover, tell us and we'll quote a deeper clean.",
      },
      {
        question: "Can I request a one-time cleaning?",
        answer:
          "Yes. The prices shown here are one-time cleaning examples. Tell us what the home needs and we'll confirm the service, included work, and full price before booking.",
      },
      {
        question: "What should I include in my request?",
        answer:
          "Tell us the home size, number of bedrooms and bathrooms, city, timing, pets, and anything that needs extra attention.",
      },
    ],
  },
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
  if (
    normalizedService.includes("recurring") ||
    ["recurring", "weekly", "biweekly", "bi-weekly", "monthly"].includes(normalizedFrequency)
  ) {
    return "recurring";
  }
  return "house";
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

function PricingGuide({ guide }: { guide: NonNullable<PaidIntentConfig["pricingGuide"]> }) {
  return (
    <section
      className="mt-7 min-w-0 rounded-3xl border border-white/15 bg-white/[0.07] p-5"
      aria-labelledby="paid-house-pricing-title"
    >
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">
        {guide.eyebrow}
      </div>
      <p id="paid-house-pricing-title" className="mt-3 max-w-2xl text-sm leading-6 text-white/82">
        {guide.intro}
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {guide.examples.map((example) => (
          <div
            key={`${example.home}-${example.size}`}
            className="min-w-0 rounded-2xl border border-white/12 bg-primary-light/40 p-4"
          >
            <div className="min-w-0">
              <span className="block break-words text-xs font-semibold leading-5 text-white/88 sm:text-sm">{example.home}</span>
              <span className="mt-0.5 block text-xs leading-5 text-white/62">{example.size}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {example.prices.map((option) => (
                <div key={option.label} className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-white/58">
                    {option.label}
                  </span>
                  <span className="mt-1 block font-display text-xl text-white">{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-white/68">{guide.footnote}</p>
    </section>
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

function StickyMobileCTA({ onQuoteClick }: { onQuoteClick: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-4 shadow-[0_-12px_30px_rgba(14,22,38,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href={"tel:+1" + "559" + "785" + "2822"} className="flex-1 rounded-xl border border-line px-4 py-3 text-center text-sm font-bold text-primary">
          Call
        </a>
        <a href="#booking-form" onClick={onQuoteClick} className="flex-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white">
          Get my price
        </a>
      </div>
    </div>
  );
}

export default function GoogleAdsLandingPageClient() {
  const searchParams = useSearchParams();
  const hasTrackedLandingView = useRef(false);
  const city = useMemo(() => normalizeCity(searchParams.get("city")), [searchParams]);
  const intentKey = useMemo(
    () => detectIntent(searchParams.get("service"), searchParams.get("frequency")),
    [searchParams]
  );
  const intent = INTENT_CONFIG[intentKey];

  useEffect(() => {
    captureFirstPaidTouch({
      landingService: searchParams.get("service") || intentKey,
      landingCity: searchParams.get("city") || city.label,
    });

    if (!hasTrackedLandingView.current) {
      hasTrackedLandingView.current = true;
      trackFunnelEvent("paid_landing_view", {
        source: "google-ads",
        service: intent.serviceDefault,
        city: city.formValue || city.label,
        page: "/google-ads",
        intent: intentKey,
      });
    }
  }, [city.formValue, city.label, intent.serviceDefault, intentKey, searchParams]);

  const trackQuoteCta = (ctaLocation: string) => {
    trackFunnelEvent("quote_cta_click", {
      source: "google-ads",
      service: intent.serviceDefault,
      city: city.formValue || city.label,
      page: "/google-ads",
      intent: intentKey,
      ctaLocation,
    });
  };

  return (
    <div className="bg-cream-2 pb-24 text-ink md:pb-0">
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="mx-auto grid min-w-0 max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-14">
          <div className="flex min-w-0 flex-col justify-center text-white">
            <div className="mb-5 inline-flex max-w-full self-start whitespace-normal rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              {intent.eyebrow}
            </div>
            <h1 className="max-w-3xl break-words font-display text-3xl leading-[1.03] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4.6rem]">
              {intent.h1(city.label)}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              {intent.subhead}
            </p>
            {intent.pricingGuide ? <PricingGuide guide={intent.pricingGuide} /> : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#booking-form" onClick={() => trackQuoteCta("hero")} className="btn btn-accent !text-sm">
                Get my cleaning price
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

          <div id="booking-form" className="min-w-0 self-start">
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
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">How we price your cleaning</div>
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
          <div className="eyebrow eyebrow-dot justify-center">Questions before booking</div>
          <h2 className="mt-3 font-display text-3xl text-primary md:text-4xl">A few things homeowners ask us</h2>
        </div>
        <FAQAccordion faqs={intent.faqs} />
      </section>

      <section className="border-t border-line bg-white px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-primary md:text-4xl">Ready to get a price for your home?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">
          Tell us about the home and when you need it cleaned. We&apos;ll send pricing and available days.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#booking-form" onClick={() => trackQuoteCta("closing_section")} className="btn btn-accent !text-sm">
            Get my cleaning price
          </a>
          <a href="tel:+15597852822" className="btn btn-outline !text-sm">
            Call (559) 785-2822
          </a>
        </div>
      </section>

      <StickyMobileCTA onQuoteClick={() => trackQuoteCta("sticky_mobile")} />
    </div>
  );
}

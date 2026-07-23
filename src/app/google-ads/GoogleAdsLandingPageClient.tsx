"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

type ProofPairKey = "shower" | "tub" | "oven" | "refrigerator" | "refrigeratorDetail" | "vent";

type ProofPair = {
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

type PaidIntentConfig = {
  eyebrow: string;
  h1: (city: string) => string;
  subhead: string;
  serviceDefault: string;
  formTitle: string;
  priceContext?: {
    label: string;
    value: string;
    note: string;
  };
  proofOrder: ProofPairKey[];
  faqs: Array<{ question: string; answer: string }>;
};

const CITY_LABELS: Record<CityKey, string> = {
  fresno: "Fresno",
  clovis: "Clovis",
  madera: "Madera",
  "woodward-park": "Woodward Park",
  "fig-garden": "Fig Garden",
  "tower-district": "Tower District",
  "near-me": "Fresno-area",
};

const PROOF_PAIRS: Record<ProofPairKey, ProofPair> = {
  shower: {
    title: "Shower wall and caddy detail",
    before: {
      src: "/photos/real-work/paid/shower-detail-before.webp",
      alt: "Shower wall and caddies with visible residue before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/shower-detail-after.webp",
      alt: "The same shower wall and caddies after New Star Cleaning detail work",
    },
  },
  tub: {
    title: "Bathtub and tile surround",
    before: {
      src: "/photos/real-work/paid/tub-surround-before.webp",
      alt: "Bathtub and tile surround with visible soil before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/tub-surround-after.webp",
      alt: "The same bathtub and tile surround after New Star Cleaning detail work",
    },
  },
  oven: {
    title: "Oven interior",
    before: {
      src: "/photos/real-work/paid/oven-interior-before.webp",
      alt: "Oven interior with visible grease and buildup before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/oven-interior-after.webp",
      alt: "The same oven interior after New Star Cleaning detail work",
    },
  },
  refrigerator: {
    title: "Full refrigerator interior",
    before: {
      src: "/photos/real-work/paid/refrigerator-full-before.webp",
      alt: "Empty refrigerator interior with visible residue before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/refrigerator-full-after.webp",
      alt: "The same refrigerator interior after New Star Cleaning detail work",
    },
  },
  refrigeratorDetail: {
    title: "Refrigerator interior detail",
    before: {
      src: "/photos/real-work/paid/refrigerator-detail-before.webp",
      alt: "Refrigerator interior surface with visible debris before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/refrigerator-detail-after.webp",
      alt: "The same refrigerator interior surface after New Star Cleaning detail work",
    },
  },
  vent: {
    title: "Reachable return vent detail",
    before: {
      src: "/photos/real-work/paid/vent-detail-before.webp",
      alt: "Reachable return vent with visible dust before cleaning",
    },
    after: {
      src: "/photos/real-work/paid/vent-detail-after.webp",
      alt: "The same reachable return vent after New Star Cleaning detail work",
    },
  },
};

const INTENT_CONFIG: Record<PaidIntent, PaidIntentConfig> = {
  house: {
    eyebrow: "Professional house cleaning",
    h1: (city) => `Professional house cleaning for ${city} homes.`,
    subhead: "Share the size, current condition, and timing. We’ll confirm the right service level, total price, and available dates.",
    serviceDefault: "Not sure yet",
    formTitle: "Request a cleaning quote",
    priceContext: {
      label: "3 bed / 2 bath · about 1,600 sq ft",
      value: "Standard $225 · Deep about $360 when maintained, often $475+ with heavier buildup",
      note: "Representative example. Final price depends on the home’s condition and requested work.",
    },
    proofOrder: ["tub", "shower", "refrigeratorDetail", "oven", "refrigerator", "vent"],
    faqs: [
      {
        question: "How should I read the example prices?",
        answer: "For a typical 3-bedroom, 2-bath home around 1,600 square feet, Standard is about $225. A $360 Deep assumes a maintained home; heavier or more detail-intensive Deep cleaning often starts around $475. We confirm the actual condition, scope, and total before booking.",
      },
      {
        question: "Should I request Standard or Deep?",
        answer: "Standard fits regular kitchen, bathroom, dusting, and floor cleaning. If there is buildup or the home needs more detailed work, tell us so we can quote enough time instead of forcing the job into a lighter service.",
      },
    ],
  },
  move: {
    eyebrow: "Move-in / move-out cleaning",
    h1: (city) => `Move-out cleaning for ${city} homes, with scope and pricing confirmed upfront.`,
    subhead: "Share the size, condition, deadline, and any appliance or cabinet work. We’ll confirm the complete scope and price before booking.",
    serviceDefault: "Move-in / move-out cleaning",
    formTitle: "Request move-out pricing",
    proofOrder: ["refrigerator", "refrigeratorDetail", "oven", "tub", "shower", "vent"],
    faqs: [
      {
        question: "Are oven, fridge, cabinets, or windows included?",
        answer: "List the details you need. Your quote will state exactly what is included and any separate pricing before booking.",
      },
      {
        question: "What if the home has heavy buildup?",
        answer: "Tell us before booking. Heavy grease, pet hair, or neglected areas may need additional time and pricing so the cleaner arrives prepared.",
      },
    ],
  },
  deep: {
    eyebrow: "Detailed deep cleaning",
    h1: (city) => `Deep cleaning for ${city} homes that need more than routine upkeep.`,
    subhead: "A maintained home and a home with heavier buildup need different amounts of time. Tell us the condition and priorities so we can price the right amount of work.",
    serviceDefault: "Deep cleaning",
    formTitle: "Request deep-cleaning pricing",
    priceContext: {
      label: "3 bed / 2 bath · about 1,600 sq ft",
      value: "About $360 when maintained · often $475+ with heavier buildup",
      note: "We confirm the home’s condition, requested work, and total before booking.",
    },
    proofOrder: ["tub", "shower", "refrigeratorDetail", "oven", "refrigerator", "vent"],
    faqs: [
      {
        question: "Why can one Deep clean cost more than another?",
        answer: "A maintained home and a home with heavier buildup do not require the same labor. Size, bathrooms, condition, pet hair, and detail priorities determine how much time the cleaner needs.",
      },
      {
        question: "Can I choose priority areas?",
        answer: "Yes. Add the rooms or surfaces that matter most and we’ll reflect them in the confirmed quote.",
      },
    ],
  },
  recurring: {
    eyebrow: "Weekly · biweekly · monthly",
    h1: (city) => `Reliable recurring house cleaning for ${city} homes.`,
    subhead: "Share the size and preferred frequency. We’ll confirm whether the first visit needs extra reset time and quote the ongoing service clearly.",
    serviceDefault: "Standard recurring cleaning",
    formTitle: "Request recurring pricing",
    proofOrder: ["shower", "tub", "refrigeratorDetail", "oven", "refrigerator", "vent"],
    faqs: [
      {
        question: "Do I need a Deep clean first?",
        answer: "Not always. If the home needs a reset before regular maintenance makes sense, we’ll explain the first-visit scope and price before booking.",
      },
      {
        question: "Can I choose biweekly instead of weekly?",
        answer: "Yes. Weekly, biweekly, and monthly options depend on the home, expectations, and local route availability.",
      },
    ],
  },
};

function normalizeCity(value: string | null): { key: CityKey; label: string; formValue: string } {
  const normalized = (value || "near-me").trim().toLowerCase().replace(/_/g, "-");
  const key = Object.prototype.hasOwnProperty.call(CITY_LABELS, normalized)
    ? (normalized as CityKey)
    : "near-me";
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

function PaidBrand() {
  return (
    <div className="flex items-center gap-2.5" aria-label="New Star Cleaning">
      <Image
        src="/brand/star-ink-mono.png"
        alt=""
        width={28}
        height={27}
        sizes="28px"
        className="h-7 w-auto brightness-0 invert"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-extrabold tracking-tight text-white sm:text-base">
          New Star Cleaning
        </span>
        <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
          Fresno · Clovis · Madera
        </span>
      </span>
    </div>
  );
}

function TrustLine() {
  const items = ["Insured local company", "Cleaning homes since 2020", "Price before booking"];

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/82" aria-label="New Star Cleaning trust signals">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-black text-white" aria-hidden="true">
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceContext({ context }: { context: NonNullable<PaidIntentConfig["priceContext"]> }) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-white/58">{context.label}</span>
      <strong className="mt-1 block text-base font-bold text-white">{context.value}</strong>
      <span className="mt-1 block text-xs leading-5 text-white/62">{context.note}</span>
    </div>
  );
}

function BeforeAfterGallery({ order }: { order: ProofPairKey[] }) {
  const pairs = order.map((key) => ({ key, ...PROOF_PAIRS[key] }));

  return (
    <section className="border-b border-slate-200 bg-white" aria-labelledby="paid-proof-title">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Real New Star work</div>
            <h2 id="paid-proof-title" className="mt-2 font-display text-3xl leading-tight text-primary sm:text-4xl">
              Six real before-and-after results.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-ink-soft">Photographed from New Star jobs. No stock photography.</p>
        </div>

        <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {pairs.map((pair) => (
            <article key={pair.key} className="min-w-[84%] snap-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:min-w-[62%] md:min-w-0">
              <div className="grid grid-cols-2 gap-px bg-slate-200">
                {(["before", "after"] as const).map((stage) => {
                  const image = pair[stage];
                  return (
                    <figure key={stage} className="relative aspect-[4/5] bg-slate-100">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 767px) 50vw, 190px"
                        className="object-cover"
                      />
                      <figcaption className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white ${stage === "before" ? "bg-primary" : "bg-accent"}`}>
                        {stage}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
              <h3 className="px-4 py-3 text-sm font-bold text-primary">{pair.title}</h3>
            </article>
          ))}
        </div>
        <p className="mt-2 text-xs font-semibold text-ink-soft md:hidden">Swipe to see all six results →</p>
      </div>
    </section>
  );
}

function ProcessStrip() {
  const steps = [
    ["1", "Share size & timing"],
    ["2", "We confirm scope & price"],
    ["3", "You choose the date"],
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50" aria-label="How the quote works">
      <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-slate-200 px-4 sm:px-6 lg:px-8">
        {steps.map(([number, label]) => (
          <div key={number} className="flex flex-col items-center gap-2 px-2 py-5 text-center sm:flex-row sm:justify-center sm:px-5 sm:text-left">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-white">{number}</span>
            <span className="text-sm font-bold text-primary">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQAccordion({ faqs }: { faqs: PaidIntentConfig["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="overflow-hidden rounded-2xl border border-line bg-white">
          <button
            id={`paid-faq-trigger-${index}`}
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-primary transition hover:bg-slate-50 md:text-base"
            aria-expanded={openIndex === index}
            aria-controls={`paid-faq-panel-${index}`}
          >
            <span>{faq.question}</span>
            <span className="text-xl text-accent" aria-hidden="true">{openIndex === index ? "−" : "+"}</span>
          </button>
          <div
            id={`paid-faq-panel-${index}`}
            role="region"
            aria-labelledby={`paid-faq-trigger-${index}`}
            className={openIndex === index ? "px-5 pb-5 text-sm leading-6 text-ink-soft" : "hidden"}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function StickyMobileCTA({ onQuoteClick }: { onQuoteClick: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-4 shadow-[0_-12px_30px_rgba(14,22,38,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href={"tel:+1" + "559" + "785" + "2822"} className="flex-1 rounded-xl border border-line px-4 py-3 text-center text-sm font-bold text-primary">
          Call
        </a>
        <a href="#booking-form" onClick={onQuoteClick} className="flex-1 rounded-xl bg-accent px-4 py-3 text-center text-sm font-bold text-white">
          Request quote
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
    <div className="bg-white pb-24 text-ink md:pb-0">
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="flex items-center justify-between gap-4">
            <PaidBrand />
            <a
              href={"tel:+1" + "559" + "785" + "2822"}
              className="rounded-xl border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
            >
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">Call (559) 785-2822</span>
            </a>
          </div>

          <div className="mt-7 grid min-w-0 gap-7 lg:grid-cols-[0.94fr_1.06fr] lg:gap-x-12 lg:gap-y-7">
            <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-center">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">{intent.eyebrow}</div>
              <h1 className="mt-3 max-w-2xl break-words font-display text-[2.45rem] leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.6rem]">
                {intent.h1(city.label)}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
                {intent.subhead}
              </p>
            </div>

            <div id="booking-form" className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <QuickQuoteForm
                source="google-ads"
                title={intent.formTitle}
                subtitle=""
                defaultCity={city.formValue}
                defaultService={intent.serviceDefault}
                extended
                paidSearch
              />
            </div>

            <div className="space-y-5 lg:col-start-1 lg:row-start-2">
              {intent.priceContext ? <PriceContext context={intent.priceContext} /> : null}
              <TrustLine />
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterGallery order={intent.proofOrder} />
      <ProcessStrip />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:px-8 lg:py-14">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Two quick answers</div>
            <h2 className="mt-2 font-display text-3xl leading-tight text-primary sm:text-4xl">Questions before you request a quote.</h2>
            <div className="mt-6">
              <FAQAccordion faqs={intent.faqs} />
            </div>
          </div>

          <div className="rounded-3xl bg-primary p-6 text-white sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-accent-light">Ready when you are</div>
            <h2 className="mt-3 font-display text-3xl leading-tight">Get a price for your home.</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Share the basics and we’ll call or text with pricing and available dates.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href="#booking-form" onClick={() => trackQuoteCta("closing_section")} className="btn btn-accent !px-4 !text-sm">
                Get my quote
              </a>
              <a href={"tel:+1" + "559" + "785" + "2822"} className="btn btn-ghost-dark !px-4 !text-sm">
                Call us
              </a>
            </div>
          </div>
        </div>
      </section>

      <StickyMobileCTA onQuoteClick={() => trackQuoteCta("sticky_mobile")} />
    </div>
  );
}

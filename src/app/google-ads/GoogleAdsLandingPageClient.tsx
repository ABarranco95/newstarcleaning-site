"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import GoogleRating from "@/components/GoogleRating";
import BookingPortalLink from "@/components/BookingPortalLink";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import { captureFirstPaidTouch } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/conversionTracking";
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos } from "@/lib/realWorkPhotos";

const PAID_HERO_PHOTOS = {
  deep: bathroomResultPhotos.find((photo) => photo.src.endsWith("/glass-shower-freestanding-tub-new-star.webp")),
  move: emptyHomeResultPhotos.find((photo) => photo.src.endsWith("/dining-kitchen-turnover-new-star.webp")),
  house: homeResultPhotos.find((photo) => photo.src.endsWith("/kitchen-island-clean-new-star.webp")),
};

type PaidIntent = "house" | "move" | "deep" | "recurring" | "postConstruction" | "commercial";

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
    subhead: "We’ll take care of the kitchen, bathrooms, dusting, and floors. Tell us about your home and when you’d like us to come.",
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
    h1: (city) => `Move-out cleaning for ${city} homes.`,
    subhead: "Moving out? We clean the empty home, including inside the cabinets and closets. Tell us your move date.",
    serviceDefault: "Move-in / move-out cleaning",
    formTitle: "Request move-out pricing",
    priceContext: {
      label: "Move-out cleaning · empty home",
      value: "From $325 · empty cabinet & closet interiors included",
      note: "Starting price. Your home's size, condition, and add-ons determine the confirmed total.",
    },
    proofOrder: ["refrigerator", "refrigeratorDetail", "oven", "tub", "shower", "vent"],
    faqs: [
      {
        question: "Are oven, fridge, cabinets, or windows included?",
        answer: "Move-out cleaning covers the empty home: kitchen, bathrooms, floors, baseboards, and empty cabinet, drawer, and closet interiors. Inside the oven and refrigerator, plus reachable interior window glass and tracks, are optional add-ons. Your quote lists the full scope before booking.",
      },
      {
        question: "What if the home has heavy buildup?",
        answer: "Tell us before booking. Heavy grease, pet hair, or neglected areas may need additional time and pricing so the cleaner arrives prepared.",
      },
    ],
  },
  deep: {
    eyebrow: "Detailed deep cleaning",
    h1: (city) => `Deep cleaning for ${city} homes.`,
    subhead: "For the buildup and detail work a regular clean doesn’t cover. Tell us which rooms need the most attention.",
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
  commercial: {
    eyebrow: "Office & commercial cleaning",
    h1: (city) => `Commercial cleaning proposals for ${city} workplaces.`,
    subhead: "Tell us about your workplace and when cleaning would fit around your team. We’ll review the space before we quote.",
    serviceDefault: "Office / commercial cleaning",
    formTitle: "Request a walkthrough",
    proofOrder: [],
    faqs: [
      {
        question: "How is commercial cleaning priced?",
        answer: "We review the facility size, required areas, frequency, and access before preparing a written proposal. The proposal defines the task list, exclusions, price, and start conditions.",
      },
      {
        question: "Can you work around our business hours?",
        answer: "Share your occupied hours, security requirements, and preferred service window. We confirm access and capacity before proposing a schedule.",
      },
    ],
  },
  postConstruction: {
    eyebrow: "Post-construction cleaning",
    h1: (city) => `Post-construction cleaning for ${city} projects.`,
    subhead: "Once the trades are finished, we handle the dust and detail work. Tell us about the site and when it needs to be ready.",
    serviceDefault: "Post-construction cleaning",
    formTitle: "Request a final-clean proposal",
    proofOrder: [],
    faqs: [
      {
        question: "Is debris hauling included?",
        answer: "No. Lumber, drywall, packaging, and bulk waste need to be out before we clean. We handle the dust and detail work on the finished surfaces, not demo waste.",
      },
      {
        question: "When should the final clean happen?",
        answer: "After dusty trades are finished, utilities are on, and debris is removed. If more trade work leaves new dust after cleaning, a return visit is quoted separately.",
      },
    ],
  },
  recurring: {
    eyebrow: "Weekly · biweekly · monthly",
    h1: (city) => `Reliable recurring house cleaning for ${city} homes.`,
    subhead: "We’ll keep up with the kitchen, bathrooms, dusting, and floors. Choose weekly, every other week, or monthly cleaning.",
    serviceDefault: "Standard recurring cleaning",
    formTitle: "Request recurring pricing",
    proofOrder: ["shower", "tub", "refrigeratorDetail", "oven", "refrigerator", "vent"],
    faqs: [
      {
        question: "Do I need a Deep clean first?",
        answer: "Not always. If the home needs extra attention before regular cleaning, we’ll explain the first-visit scope and price before booking.",
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

  if (normalizedService.includes("post")) return "postConstruction";
  if (normalizedService.includes("commercial") || normalizedService.includes("office")) return "commercial";
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
    <div aria-label="New Star Cleaning">
      <Image
        src="/brand/nsc-lockup-horizontal-reverse.svg"
        alt="New Star Cleaning"
        width={640}
        height={150}
        className="paid-wordmark"
        priority
      />
    </div>
  );
}

function TrustLine({ commercial = false }: { commercial?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-soft">
      <GoogleRating />
      <span className="text-xs">{commercial ? "Locally owned · Written proposal before scheduling" : "Locally owned · Price before booking"}</span>
    </div>
  );
}

function PriceContext({ context }: { context: NonNullable<PaidIntentConfig["priceContext"]> }) {
  return (
    <div className="border-t border-line pt-4">
      <span className="block text-xs text-ink-soft">{context.label}</span>
      <strong className="mt-2 block text-base font-semibold leading-6 text-primary">{context.value}</strong>
      <span className="mt-2 block text-xs leading-5 text-ink-soft">{context.note}</span>
    </div>
  );
}

function BeforeAfterGallery({ order }: { order: ProofPairKey[] }) {
  const pairs = order.map((key) => ({ key, ...PROOF_PAIRS[key] }));
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    gallery.scrollBy({ left: direction * gallery.clientWidth * 0.86, behavior: "auto" });
  };

  return (
    <section className="border-b border-line bg-white" aria-labelledby="paid-proof-title">
      <div className="site-section">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs text-ink-soft">Real New Star work</div>
            <h2 id="paid-proof-title" className="mt-2 text-primary">
              Six real before-and-after results.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-ink-soft">Photographed from New Star jobs. No stock photography.</p>
        </div>

        <div
          id="paid-proof-gallery"
          ref={galleryRef}
          role="region"
          aria-label="Six New Star before-and-after cleaning results"
          aria-describedby="paid-proof-guidance paid-proof-caption"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              scrollGallery(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
          className="paid-proof-gallery mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:overflow-visible md:pb-0"
        >
          {pairs.map((pair) => (
            <article key={pair.key} className="min-w-[84%] snap-center sm:min-w-[62%] md:min-w-0">
              <div className="grid grid-cols-2 gap-2">
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
                      <figcaption className="absolute bottom-0 inset-x-0 bg-white px-2 py-2 text-xs text-primary">
                        {stage}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
              <h3 className="pt-3 text-sm font-medium text-primary">{pair.title}</h3>
            </article>
          ))}
        </div>
        <div className="paid-proof-controls md:hidden">
          <p id="paid-proof-guidance" className="text-xs text-ink-soft">Swipe to see all six results, or use the arrow keys.</p>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous cleaning result" aria-controls="paid-proof-gallery" onClick={() => scrollGallery(-1)}>←</button>
            <button type="button" aria-label="Next cleaning result" aria-controls="paid-proof-gallery" onClick={() => scrollGallery(1)}>→</button>
          </div>
        </div>
        <p id="paid-proof-caption" className="mt-4 max-w-3xl text-xs leading-5 text-ink-soft">Cleaning doesn’t remove every stain or sign of wear. Oven and fridge interiors are optional extras.</p>
      </div>
    </section>
  );
}


const REVIEW_TOPIC: Record<PaidIntent, "home" | "standard" | "deep" | "move"> = {
  house: "home",
  move: "move",
  deep: "deep",
  recurring: "standard",
  postConstruction: "home",
  commercial: "home",
};

const HOME_POINTS = [
  "Price confirmed before anything is booked",
  "We bring the supplies and equipment",
  "Missed something? Tell us within 24 hours and we’ll make it right",
];

const BUSINESS_POINTS = [
  "Walkthrough or photo review before we quote",
  "Written scope and price before work starts",
  "Locally owned and based in Fresno",
];

// Verbatim Google reviews (src/lib/googleReviews.ts), led by the ones about
// the service this ad promised.
function ReviewStrip({ intent }: { intent: PaidIntent }) {
  return (
    <section className="border-b border-line bg-surface" aria-labelledby="paid-reviews-title">
      <div className="site-section">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="paid-reviews-title" className="text-primary">What customers say on Google.</h2>
          <GoogleRating prominent />
        </div>
        <div className="mt-8">
          <ReviewCards topic={REVIEW_TOPIC[intent]} />
        </div>
      </div>
    </section>
  );
}

function ProcessStrip({ commercial = false }: { commercial?: boolean }) {
  const steps = commercial ? [
    ["1", "Share the property details"],
    ["2", "Walkthrough & scope review"],
    ["3", "Review your written proposal"],
  ] : [
    ["1", "Share size & timing"],
    ["2", "We confirm scope & price"],
    ["3", "You choose the date"],
  ];

  return (
    <section className="border-b border-line bg-white" aria-label="How the quote works">
      <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-line px-4 sm:px-6 lg:px-8">
        {steps.map(([number, label]) => (
          <div key={number} className="flex flex-col items-center gap-2 px-2 py-5 text-center sm:flex-row sm:justify-center sm:px-5 sm:text-left">
            <span className="text-xs tabular-nums text-ink-soft">{number}</span>
            <span className="text-sm font-medium text-primary">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQAccordion({ faqs }: { faqs: PaidIntentConfig["faqs"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="border-b border-line bg-white">
          <button
            id={`paid-faq-trigger-${index}`}
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-primary transition hover:text-primary-light md:text-base"
            aria-expanded={openIndex === index}
            aria-controls={`paid-faq-panel-${index}`}
          >
            <span>{faq.question}</span>
            <span className="text-xl text-primary" aria-hidden="true">{openIndex === index ? "−" : "+"}</span>
          </button>
          <div
            id={`paid-faq-panel-${index}`}
            role="region"
            aria-labelledby={`paid-faq-trigger-${index}`}
            className={openIndex === index ? "pb-5 pr-5 text-sm leading-6 text-ink-soft" : "hidden"}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function StickyMobileCTA({ onQuoteClick, commercial = false }: { onQuoteClick: () => void; commercial?: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("booking-form");
    if (!form) return;

    const viewport = window.visualViewport;
    const updateVisibility = () => {
      const editing = document.activeElement?.matches("input, textarea, select, [contenteditable='true']");
      const keyboardOpen = viewport ? window.innerHeight - viewport.height > 150 : false;
      setVisible(form.getBoundingClientRect().bottom <= 0 && !editing && !keyboardOpen);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    viewport?.addEventListener("resize", updateVisibility);
    viewport?.addEventListener("scroll", updateVisibility);
    document.addEventListener("focusin", updateVisibility);
    document.addEventListener("focusout", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
      viewport?.removeEventListener("resize", updateVisibility);
      viewport?.removeEventListener("scroll", updateVisibility);
      document.removeEventListener("focusin", updateVisibility);
      document.removeEventListener("focusout", updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="paid-sticky-cta fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a href={"tel:+1" + "559" + "785" + "2822"} className="home-text-link flex-1 justify-center">
          Call
        </a>
        <a href="#booking-form" onClick={onQuoteClick} className="home-button flex-1">
          {commercial ? "Request a proposal" : "Get my quote"}
        </a>
      </div>
    </div>
  );
}

export default function GoogleAdsLandingPageClient({
  directBookingUrl = null,
}: {
  directBookingUrl?: string | null;
}) {
  const searchParams = useSearchParams();
  const hasTrackedLandingView = useRef(false);
  const city = useMemo(() => normalizeCity(searchParams.get("city")), [searchParams]);
  const intentKey = useMemo(
    () => detectIntent(searchParams.get("service"), searchParams.get("frequency")),
    [searchParams]
  );
  const intent = INTENT_CONFIG[intentKey];
  const isProjectRequest = intentKey === "postConstruction";
  const isCommercialRequest = intentKey === "commercial";
  const isBusinessRequest = isProjectRequest || isCommercialRequest;
  const residentialBookingUrl = isBusinessRequest ? null : directBookingUrl;
  const requestedFrequency = searchParams.get("frequency")?.trim().toLowerCase().replace(/^bi-weekly$/, "biweekly");
  const bookingFrequency = intentKey === "recurring" && (requestedFrequency === "weekly" || requestedFrequency === "biweekly" || requestedFrequency === "monthly") ? requestedFrequency : undefined;
  const heroPhoto = isBusinessRequest ? null : intentKey === "deep" ? PAID_HERO_PHOTOS.deep : intentKey === "move" ? PAID_HERO_PHOTOS.move : PAID_HERO_PHOTOS.house;

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
    <div className="site-reference paid-reference bg-white pb-24 text-ink md:pb-0">
      <header className="bg-primary text-white">
        <div className="home-wrap flex h-16 items-center justify-between gap-4">
          <PaidBrand />
          <a
            href={"tel:+1" + "559" + "785" + "2822"}
            className="home-header-quote"
          >
            <Icon name="phone" />
            <span className="sm:hidden">Call us</span>
            <span className="hidden sm:inline">Call (559) 785-2822</span>
          </a>
        </div>
      </header>

      <section className="border-b border-line bg-white" aria-labelledby="paid-title">
        <div className="home-wrap py-5 sm:py-8 lg:py-10">
          <div className="paid-hero-grid">
            <div className="paid-hero-story">
            <div className="paid-hero-copy min-w-0">
              <p className="text-xs text-ink-soft">{intent.eyebrow}</p>
              <h1 id="paid-title" className="mt-2 max-w-2xl break-words text-[2rem] leading-[1.09] text-primary sm:text-5xl lg:text-[3.25rem]">
                {intent.h1(city.label)}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-ink-soft sm:text-base">
                {intent.subhead}
              </p>
              <ul className="site-form-points paid-hero-points">
                {(isBusinessRequest ? BUSINESS_POINTS : HOME_POINTS).map((point) => (
                  <li key={point}><Icon name="check" />{point}</li>
                ))}
              </ul>
              <div className="mt-3">
                <TrustLine commercial={isBusinessRequest} />
              </div>
            </div>

            {!isBusinessRequest ? (
              <div className="paid-hero-media">
                {heroPhoto ? (
                  <figure className="paid-job-photo">
                    <div className="paid-job-photo-frame">
                      <Image src={heroPhoto.src} alt={heroPhoto.alt} fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption>New Star work · {heroPhoto.caption}</figcaption>
                  </figure>
                ) : null}
                {intent.priceContext ? <PriceContext context={intent.priceContext} /> : null}
              </div>
            ) : null}
            </div>

            <div id="booking-form" className="paid-hero-form site-form-panel min-w-0 scroll-mt-4">
              {isCommercialRequest ? (
                <CommercialQuoteForm
                  source="google-ads"
                  defaultService={intent.serviceDefault}
                  title={intent.formTitle}
                  subtitle="Share your facility details. We confirm scope and availability before proposing work."
                />
              ) : (
                <QuickQuoteForm
                  source="google-ads"
                  title={intent.formTitle}
                  subtitle={isProjectRequest ? "Share the project details. Angel will confirm scope, timing, and whether a walkthrough is needed." : "We’ll follow up with your price and available dates."}
                  landingCity={city.formValue || city.label}
                  defaultService={intent.serviceDefault}
                  directBookingUrl={residentialBookingUrl}
                  extended
                  paidSearch
                />
              )}
              {residentialBookingUrl ? (
                <p className="mt-1 text-center text-xs text-ink-soft">
                  <BookingPortalLink
                    baseUrl={residentialBookingUrl}
                    sourcePage="/google-ads"
                    ctaLocation="paid_under_form"
                    service={intent.serviceDefault}
                    city={city.formValue || undefined}
                    frequency={bookingFrequency}
                    label="Book online with New Star"
                    showIcon={false}
                    className="home-text-link"
                  />
                </p>
              ) : null}
            </div>

          </div>
        </div>
      </section>

      {!isBusinessRequest ? <TrustStrip links={false} /> : null}
      <ReviewStrip intent={intentKey} />
      {!isBusinessRequest ? <BeforeAfterGallery order={intent.proofOrder} /> : null}
      <ProcessStrip commercial={isBusinessRequest} />

      <section className="bg-white">
        <div className="site-section grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-primary">{isBusinessRequest ? "Before we propose the work." : "Before you book."}</h2>
            <div className="mt-6">
              <FAQAccordion faqs={intent.faqs} />
            </div>
          </div>

          <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-primary">{isCommercialRequest ? "Let’s scope your facility." : isProjectRequest ? "Let’s scope your project." : "Tell us about your home."}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft">
              {isCommercialRequest ? "Share your facility details and preferred service window. We’ll confirm scope, access, and capacity before sending a written proposal." : isProjectRequest ? "Send the site details and handoff date. We’ll confirm scope, access, and capacity before proposing the work." : "Share the basics. We’ll confirm your price and available dates before you book."}
            </p>
            <div className="site-actions">
              <a href="#booking-form" onClick={() => trackQuoteCta("closing_section")} className="home-button">
                {isBusinessRequest ? "Request a proposal" : "Get my quote"}
                <span aria-hidden="true">↗</span>
              </a>
              <a href={"tel:+1" + "559" + "785" + "2822"} className="home-text-link">
                Call us
              </a>
            </div>
            {residentialBookingUrl ? (
              <p className="mt-2 text-xs text-ink-soft">
                <BookingPortalLink
                  baseUrl={residentialBookingUrl}
                  sourcePage="/google-ads"
                  ctaLocation="paid_closing"
                  service={intent.serviceDefault}
                  city={city.formValue || undefined}
                  frequency={bookingFrequency}
                  label="Book online with New Star"
                  showIcon={false}
                  className="home-text-link"
                />
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <StickyMobileCTA commercial={isBusinessRequest} onQuoteClick={() => trackQuoteCta("sticky_mobile")} />
    </div>
  );
}

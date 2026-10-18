"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import GoogleRating from "@/components/GoogleRating";
import BookingPortalLink from "@/components/BookingPortalLink";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import { captureFirstPaidTouch } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/conversionTracking";
import { reviewsFor } from "@/lib/googleReviews";
import { bathroomResultPhotos, emptyHomeResultPhotos, homeResultPhotos } from "@/lib/realWorkPhotos";
import { usePaidDropOffTracking } from "./usePaidDropOffTracking";

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
  /** Interior-appliance work is an optional add-on; tag it at its caption. */
  optionalAddOn?: boolean;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

type PaidIntentConfig = {
  eyebrow: string;
  h1: (city: string) => string;
  subhead: string;
  serviceDefault: string;
  formTitle: string;
  priceLine?: string;

  /** Included scope and optional add-ons, from the service scope contracts. */
  scope?: {
    included: string;
    addOns: string;
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
    optionalAddOn: true,
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
    optionalAddOn: true,
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
    optionalAddOn: true,
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
    h1: () => "House Cleaning in Fresno & Clovis",
    subhead: "Kitchen, bathrooms, dusting and floors, once or on a schedule.",
    serviceDefault: "Not sure yet",
    formTitle: "Get a quote",
    priceLine: "House cleaning from $165, depending on size and buildup. Total confirmed before you book.",

    proofOrder: ["tub", "shower", "refrigeratorDetail", "oven", "refrigerator", "vent"],
    faqs: [
      {
        question: "One-time or recurring?",
        answer: "Either. Book a single clean, or set up weekly, every-other-week or monthly visits. Tell us what you have in mind and we’ll send your price before anything is booked.",
      },
      {
        question: "Standard or deep clean?",
        answer: "Standard covers the kitchen, bathrooms, dusting and floors. If there’s buildup or it’s been a while, tell us and we’ll quote enough time for a deep clean. Your price depends on size, condition and how often we come, and we confirm it before booking.",
      },
    ],
  },
  move: {
    eyebrow: "Move-in / move-out cleaning",
    h1: () => "Move-Out & Move-In Cleaning in Fresno & Clovis",
    subhead: "Empty cabinet, drawer and closet interiors included.",
    serviceDefault: "Move-in / move-out cleaning",
    formTitle: "Get a quote",
    priceLine: "Move-in/out cleaning from $325, depending on size and buildup. Total confirmed before you book.",
    scope: {
      included: "Kitchen, bathrooms, floors and baseboards, plus empty cabinet, drawer and closet interiors.",
      addOns: "Inside the oven and refrigerator, interior window glass, and reachable window tracks.",
    },
    proofOrder: ["tub", "shower", "vent", "refrigerator", "refrigeratorDetail", "oven"],
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
    h1: () => "Deep House Cleaning in Fresno & Clovis",
    subhead: "Baseboards, fixtures and the buildup a regular clean skips.",
    serviceDefault: "Deep cleaning",
    formTitle: "Get a quote",
    priceLine: "Deep cleaning from $235, depending on size and buildup. Total confirmed before you book.",

    scope: {
      included: "Kitchen, bathrooms, dusting and floors, plus baseboards, fixtures and reachable detail areas, with extra time for buildup.",
      addOns: "Inside the oven and fridge, cabinet interiors, and interior windows.",
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
    formTitle: "Get a quote",
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

function TrustLine({ commercial = false, onDark = false }: { commercial?: boolean; onDark?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${onDark ? "text-white/85" : "text-ink-soft"}`}>
      <GoogleRating />
      <span className="text-xs">{commercial ? "Locally owned · Written proposal before scheduling" : "Hundreds of local homes cleaned since 2020"}</span>
    </div>
  );
}

function ScopeNote({ scope }: { scope: NonNullable<PaidIntentConfig["scope"]> }) {
  return (
    <dl className="paid-scope mt-6 grid gap-3 text-sm leading-6">
      <div>
        <dt className="inline font-medium text-primary">Included: </dt>
        <dd className="inline text-ink-soft">{scope.included}</dd>
      </div>
      <div>
        <dt className="inline font-medium text-primary">Optional add-ons: </dt>
        <dd className="inline text-ink-soft">{scope.addOns}</dd>
      </div>
    </dl>
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
              <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-3 text-sm font-medium text-primary">
                {pair.title}
                {pair.optionalAddOn ? (
                  <span className="border border-line px-1.5 py-0.5 text-xs font-normal text-ink-soft">Optional add-on</span>
                ) : null}
              </h3>
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

const DECISION_REVIEW_ID: Partial<Record<PaidIntent, string>> = {
  deep: "daniel",
  move: "daviana-j",
  house: "merle-f",
};

const HOME_POINTS = [
  "One flat price for your home, confirmed before you book",
  "We bring every supply and tool, nothing for you to buy or prep",
  "Missed something? Tell us within 24 hours and we’ll come back and fix it at no charge",
];

const BUSINESS_POINTS = [
  "Walkthrough or photo review before we quote",
  "Written scope and price before work starts",
  "Locally owned and based in Fresno",
];

// Verbatim Google reviews (src/lib/googleReviews.ts), led by the ones about
// the service this ad promised.
function ReviewStrip({ intent, excludeReviewId }: { intent: PaidIntent; excludeReviewId?: string }) {
  return (
    <section className="border-b border-line bg-surface" aria-labelledby="paid-reviews-title">
      <div className="site-section">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="paid-reviews-title" className="text-primary">What customers say on Google.</h2>
          <GoogleRating prominent />
        </div>
        <div className="mt-8">
          <ReviewCards showRating={false} reviews={reviewsFor(REVIEW_TOPIC[intent]).filter((review) => review.id !== excludeReviewId)} />
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

function StickyMobileCTA({ onQuoteClick, onCallClick, commercial = false }: { onQuoteClick: () => void; onCallClick: () => void; commercial?: boolean }) {
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
        <a href={"tel:+1" + "559" + "785" + "2822"} onClick={onCallClick} className="home-text-link flex-1 justify-center">
          Call
        </a>
        <a href={"sms:+1" + "559" + "785" + "2822"} data-phone-location="paid_mobile_text" className="home-text-link flex-1 justify-center">Text</a>
        <a href="#booking-form" onClick={onQuoteClick} className="home-button flex-1">
          {commercial ? "Request a proposal" : "Get a quote"}
        </a>
      </div>
    </div>
  );
}

export default function GoogleAdsLandingPageClient({
  directBookingUrl = null,
  service = null,
  city: cityParam = null,
  frequency = null,
}: {
  directBookingUrl?: string | null;
  service?: string | null;
  city?: string | null;
  frequency?: string | null;
}) {
  const hasTrackedLandingView = useRef(false);
  const city = useMemo(() => normalizeCity(cityParam), [cityParam]);
  const intentKey = useMemo(
    () => detectIntent(service, frequency),
    [service, frequency]
  );
  const intent = INTENT_CONFIG[intentKey];
  const decisionReview = reviewsFor(REVIEW_TOPIC[intentKey]).find((review) => review.id === DECISION_REVIEW_ID[intentKey]);
  const isProjectRequest = intentKey === "postConstruction";
  const isCommercialRequest = intentKey === "commercial";
  const isBusinessRequest = isProjectRequest || isCommercialRequest;
  const compactResidentialHero = intentKey === "deep" || intentKey === "move" || intentKey === "house";
  const residentialBookingUrl = isBusinessRequest ? null : directBookingUrl;
  const requestedFrequency = frequency?.trim().toLowerCase().replace(/^bi-weekly$/, "biweekly");
  const bookingFrequency = intentKey === "recurring" && (requestedFrequency === "weekly" || requestedFrequency === "biweekly" || requestedFrequency === "monthly") ? requestedFrequency : undefined;
  const heroPhoto = isBusinessRequest ? null : intentKey === "deep" ? PAID_HERO_PHOTOS.deep : intentKey === "move" ? PAID_HERO_PHOTOS.move : PAID_HERO_PHOTOS.house;

  useEffect(() => {
    captureFirstPaidTouch({
      landingService: service || intentKey,
      landingCity: cityParam || city.label,
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
  }, [city.formValue, city.label, intent.serviceDefault, intentKey, service, cityParam]);

  usePaidDropOffTracking({ service: intent.serviceDefault, city: city.formValue || city.label, intent: intentKey });

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

  const trackStickyCta = (ctaLocation: string, quote = true) => {
    trackFunnelEvent("sticky_cta_click", {
      source: "google-ads",
      service: intent.serviceDefault,
      city: city.formValue || city.label,
      page: "/google-ads",
      intent: intentKey,
      ctaLocation,
    });
    if (quote) trackQuoteCta(ctaLocation);
  };

  return (
    <div className={compactResidentialHero ? "site-reference paid-reference paid-flow bg-white pb-[calc(80px+env(safe-area-inset-bottom,0px))] text-ink md:pb-0" : "site-reference paid-reference bg-white pb-24 text-ink md:pb-0"}>
      <header className="bg-primary text-white">
        <div className="home-wrap flex h-16 items-center justify-between gap-4">
          <PaidBrand />
          <a
            href={"tel:+1" + "559" + "785" + "2822"}
            className="home-header-quote"
          >
            <Icon name="phone" />
            <span>(559) 785-2822</span>
          </a>
        </div>
      </header>

      <section className="paid-hero-dark" data-compact-hero={compactResidentialHero || undefined} aria-labelledby="paid-title">
        <div className={compactResidentialHero ? "home-wrap py-4 md:py-12 lg:py-16" : "home-wrap py-5 sm:py-8 lg:py-10"}>
          <div className="paid-hero-grid">
            <div className="paid-hero-story">
            <div className="paid-hero-copy min-w-0">
              <p className={compactResidentialHero ? "hidden text-xs text-ink-soft md:block" : "text-xs text-ink-soft"}>{intent.eyebrow}</p>
              <h1 id="paid-title" className={compactResidentialHero ? "max-w-2xl break-words text-[2rem] leading-[1.15] text-primary md:mt-3 md:text-5xl lg:text-[3.25rem]" : "mt-2 max-w-2xl break-words text-[2rem] leading-[1.09] text-primary sm:text-5xl lg:text-[3.25rem]"}>
                {intent.h1(city.label)}
              </h1>
              <p className={compactResidentialHero ? "mt-2 max-w-xl text-base leading-6 text-ink-soft md:mt-4 md:leading-7" : "mt-4 max-w-xl text-base leading-7 text-ink-soft"}>
                {intent.subhead}
              </p>
              {intent.scope && !compactResidentialHero ? <ScopeNote scope={intent.scope} /> : null}
              <ul className={compactResidentialHero ? "hidden" : "site-form-points paid-hero-points"}>
                {(isBusinessRequest ? BUSINESS_POINTS : HOME_POINTS).map((point) => (
                  <li key={point}><Icon name="check" />{point}</li>
                ))}
              </ul>
              <div className={compactResidentialHero ? "mt-3 hidden md:block" : "mt-3"}>
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
                  subtitle={isProjectRequest ? "Share the project details. Angel will confirm scope, timing, and whether a walkthrough is needed." : intent.priceLine || "We’ll follow up with your price and available dates."}
                  landingCity={city.formValue || city.label}
                  defaultService={intent.serviceDefault}
                  directBookingUrl={residentialBookingUrl}
                  extended
                  paidSearch
                  compact={Boolean(intent.priceLine)}
                  paidFlow={compactResidentialHero}
                  stickyPaidCta={compactResidentialHero}
                  onStickyPaidClick={() => trackStickyCta("sticky_paid")}
                  submitLabel={compactResidentialHero ? intentKey === "move" ? "Text me my price + move-out dates" : "Text me my price + open dates" : undefined}

                  submitAlternative={intent.priceLine ? (
                    <a
                      href={"tel:+1" + "559" + "785" + "2822"}
                      data-phone-location="paid_quote_submit"
                      className="mt-1 flex min-h-11 items-center justify-center text-center text-sm text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Prefer to call? (559) 785-2822
                    </a>
                  ) : null}
                  decisionProof={decisionReview ? (
                    <figure className="paid-decision-proof mt-6 border-t border-line pt-6" data-review-id={decisionReview.id}>
                      <blockquote className="text-sm leading-5 text-ink">
                        <p>&ldquo;{decisionReview.excerpt.join(" … ")}&rdquo;</p>
                      </blockquote>
                      <figcaption className="mt-2 text-xs leading-5 text-ink-soft">
                        Google review · {decisionReview.author} · {decisionReview.label}
                      </figcaption>
                    </figure>
                  ) : null}

                />
              )}
              <p className="mt-4 text-center text-sm">
                <a href={"sms:+1" + "559" + "785" + "2822"} data-phone-location="paid_under_form" className="home-text-link min-h-11">Prefer to text? Text us</a>
              </p>

            </div>


          </div>
        </div>
      </section>

      {!isBusinessRequest ? <TrustStrip links={false} /> : null}
      <ReviewStrip intent={intentKey} excludeReviewId={decisionReview?.id} />
      {!isBusinessRequest ? <BeforeAfterGallery order={intent.proofOrder} /> : null}
      <ProcessStrip commercial={isBusinessRequest} />

      <section className="bg-white">
        <div className="site-section grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-primary">{isBusinessRequest ? "Before we propose the work." : "Before you book."}</h2>
            {compactResidentialHero && intent.scope ? <ScopeNote scope={intent.scope} /> : null}
            <div className="mt-6">
              <FAQAccordion faqs={intent.faqs} />
            </div>
          </div>

          <div id="paid-footer" className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h2 className="text-primary">{isCommercialRequest ? "Let’s scope your facility." : isProjectRequest ? "Let’s scope your project." : "Tell us about your home."}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-ink-soft">
              {isCommercialRequest ? "Share your facility details and preferred service window. We’ll confirm scope, access, and capacity before sending a written proposal." : isProjectRequest ? "Send the site details and handoff date. We’ll confirm scope, access, and capacity before proposing the work." : "Share the basics. We’ll confirm your price and available dates before you book."}
            </p>
            <div className="site-actions">
              <a href="#booking-form" onClick={() => trackQuoteCta("closing_section")} className="home-button">
                {isBusinessRequest ? "Request a proposal" : "Get a quote"}
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
                  label="Choose a date online"
                  showIcon={false}
                  className="home-text-link"
                />
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {!compactResidentialHero ? <StickyMobileCTA commercial={isBusinessRequest} onQuoteClick={() => trackStickyCta("sticky_mobile")} onCallClick={() => trackStickyCta("sticky_mobile_call", false)} /> : null}
    </div>
  );
}

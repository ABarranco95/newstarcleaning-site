import Image from "next/image";
import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import Link from "next/link";
import { Suspense } from "react";
import MarketAreas from "@/components/MarketAreas";
import FaqList from "@/components/FaqList";
import GoogleRating from "@/components/GoogleRating";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import HowItWorks from "@/components/HowItWorks";
import Icon from "@/components/Icon";
import { MarketCallOrText } from "@/components/MarketPhone";
import ProofRow from "@/components/ProofRow";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import ReviewCards from "@/components/ReviewCards";
import TrustStrip from "@/components/TrustStrip";
import FresnoInstantPriceCalculator from "@/components/FresnoInstantPriceCalculator";
import FresnoBeforeAfterSlider from "@/components/FresnoBeforeAfterSlider";
import { bathroomResultPhotos, homeResultPhotos } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import "./fresno-flagship.css";

const directBookingUrl = resolveDirectBookingUrl();

export const metadata: Metadata = {
  title: { absolute: "Fresno, Clovis & Madera House Cleaning | New Star Cleaning" },
  description: "House cleaning in Fresno, Clovis and Madera. Standard, deep and move-out cleaning. See your flat-rate price upfront before you book.",
  alternates: { canonical: "/" },
  ...socialMetadata({
    title: "Fresno, Clovis & Madera House Cleaning | New Star Cleaning",
    description: "House cleaning in Fresno, Clovis and Madera. Standard, deep and move-out cleaning. See your flat-rate price upfront before you book.",
    url: "https://newstarcleaning.com",
  }),
};

const faqs = [
  { question: "How do I get a price?", answer: "Tap your cleaning type, bedrooms, bathrooms, and home size in the calculator above for an instant Fresno & Clovis estimate, or enter your ZIP when booking online. You always see your confirmed total before you book." },
  { question: "What's included in move-out vs regular cleaning?", answer: "Every visit follows our room-by-room checklist. Empty cabinet, drawer, and closet interiors are included in move-in / move-out cleaning. Oven and refrigerator interiors, interior window glass, and carpet shampooing are optional add-ons. We do not haul trash, repair damage, or guarantee a deposit return." },
  { question: "What isn't included?", answer: "Laundry, dishes, organizing, bed making, moving heavy furniture, exterior windows, pressure washing, biohazard, and repairs aren't included." },
  { question: "Do I need to supply anything?", answer: "No. We bring our own cleaning supplies." },
  { question: "When am I charged?", answer: "Nothing is charged when you book. Within 24 hours before the cleaning we place a hold for the visit total, and it becomes the charge after the cleaning is finished." },
  { question: "What if something was missed?", answer: "Tell us within 24 hours and we come back and make it right at no charge, as long as it was part of the agreed scope." },
  { question: "Can I cancel or pause recurring cleaning?", answer: "Yes. Cancellation is free until 24 hours before your arrival window (inside 24 hours, 50% of that visit is charged). Recurring service has no contract: pause or stop with 24 hours' notice." },
];

const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);
const hero = bathroomResultPhotos[0];
const heroKitchen = homeResultPhotos[0];

export default function Home() {
  return (
    <div className="home-reference">
      <section className="fresno-hero" aria-labelledby="home-title">
        <div className="fresno-container fresno-hero-grid">
          <div className="fresno-hero-copy min-w-0">
            <p className="fresno-eyebrow">Fresno, Clovis &amp; Madera</p>

            <h1 id="home-title">House cleaning in Fresno &amp; Clovis, priced upfront.</h1>

            <ProofRow tone="light" />

            <p className="fresno-hero-lead">
              Recurring upkeep, deep cleans, and empty-home move-outs across Fresno, Clovis, and
              Madera with supplies and liability insurance included.
            </p>
          </div>

          <div className="fresno-hero-calc min-w-0">
            <Suspense fallback={<div className="fresno-calc-skeleton">Loading instant estimate...</div>}>
              <FresnoInstantPriceCalculator
                directBookingUrl={directBookingUrl}
                source="home_hero_calc"
              />
            </Suspense>
          </div>

          <div className="fresno-hero-showcase min-w-0">
            <div className="fresno-hero-photos">
              <figure className="hx-photo" data-work-photo="hero">
                <div className="hx-photo-frame">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill preload fetchPriority="high"
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                </div>
                <figcaption>{hero.caption} · New Star work</figcaption>
              </figure>

              <figure className="fresno-hero-secondary">
                <div className="fresno-hero-secondary-frame">
                  <Image
                    src={heroKitchen.src}
                    alt={heroKitchen.alt}
                    fill
                    sizes="(min-width: 1024px) 560px, 50vw"
                  />
                </div>
                <figcaption>{heroKitchen.caption} · New Star work</figcaption>
              </figure>
            </div>

            <div className="fresno-hero-bar">
              <div className="fresno-hero-contact">
                <a
                  href={business.phoneHref}
                  className="fresno-hero-phone"
                  data-phone-location="home_hero"
                >
                  <Icon name="phone" />
                  <span>{business.phoneDisplay}</span>
                </a>
                <span className="fresno-hero-hours">Mon-Fri 8-6 · Sat 8-5</span>
              </div>

              <Link href="/checklist" className="home-text-link">
                45-point checklist <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="fresno-band" aria-labelledby="home-results-title">
        <div className="fresno-container">
          <div className="fresno-section-head">
            <div>
              <p className="fresno-kicker">Real Unedited Work</p>
              <h2 id="home-results-title" className="fresno-h2">
                Slide to inspect our before &amp; after work.
              </h2>
              <p className="fresno-sublead">
                Drag the divider or tap any surface below. Every photo comes from a real New Star
                appointment.
              </p>
            </div>
            <Link href="/our-work" className="home-text-link">
              See all of our work <span aria-hidden="true">→</span>
            </Link>
          </div>

          <FresnoBeforeAfterSlider
            leadBeforeImage={
              <Image
                src="/photos/before1.jpg"
                alt="Shower before a New Star deep cleaning"
                fill
                sizes="(min-width: 1024px) 720px, 94vw"
              />
            }
            leadAfterImage={
              <Image
                src="/photos/after1.jpg"
                alt="The same shower after a New Star deep cleaning"
                fill
                sizes="(min-width: 1024px) 720px, 94vw"
              />
            }
          />
        </div>
      </section>

      <section id="services" className="fresno-band fresno-band-soft" aria-labelledby="home-services-title">
        <div className="fresno-container">
          <div className="fresno-section-head">
            <div>
              <p className="fresno-kicker">Services &amp; Checklists</p>
              <h2 id="home-services-title" className="fresno-h2">
                Three ways we clean.
              </h2>
            </div>
            <Link href="/checklist" className="home-text-link">
              Compare 45-point checklist <span aria-hidden="true">→</span>
            </Link>
          </div>

          <Suspense fallback={null}>
            <HomeServices photos={{ "deep-cleaning": bathroomResultPhotos[1] }}>
              <p className="home-service-notes">
                Empty cabinet, drawer, and closet interiors are included in move-in / move-out
                cleaning. Oven and fridge interiors, interior window glass, carpet shampooing, and
                cabinet interiors on standard or deep cleans are optional add-ons. We do not
                guarantee a deposit return.
              </p>
            </HomeServices>
          </Suspense>

          <div className="home-commercial-band">
            <div>
              <h3>Offices, commercial spaces &amp; post-construction cleanups</h3>
              <p>
                Need recurring janitorial work or a final clean after a remodel or build? We walk
                the space first and put the scope, schedule, and price in writing.
              </p>
            </div>
            <div className="home-commercial-actions">
              <Link href="/services/commercial-cleaning" className="home-text-link">
                Office &amp; commercial <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services/post-construction-cleaning" className="home-text-link">
                Post-construction <span aria-hidden="true">→</span>
              </Link>
              <Link href="/commercial-quote" className="home-service-book">
                Request a walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="reviews" className="ns-section" aria-labelledby="home-reviews-title">
        <div className="ns-section-head">
          <h2 id="home-reviews-title" className="ns-h2">
            What customers say.
          </h2>
          <GoogleRating prominent />
        </div>
        <ReviewCards reviews={reviews} lead />
      </section>

      <HowItWorks />

      <MarketAreas home />

      <section className="site-muted" aria-labelledby="home-faq-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <h2 id="home-faq-title" className="ns-h2">
              Before the visit.
            </h2>
            <Link href="/checklist" className="home-text-link">
              See the full checklist <span aria-hidden="true">→</span>
            </Link>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section aria-labelledby="home-quote-title">
        <div className="site-section site-quote-layout">
          <div className="site-copy">
            <p className="ns-kicker">Your price</p>
            <h2 id="home-quote-title" className="ns-h2">
              Prefer we text your quote and open dates?
            </h2>
            <p className="ns-lead">
              Put in your ZIP and home details. Send it over and we&apos;ll confirm the exact
              number and the days we have open. If the house needs more than a standard visit,
              we&apos;ll say so up front.
            </p>
            <p className="site-note">
              <MarketCallOrText prefix="Or " location="home_quote" />. Mon-Fri 8-6, Sat 8-5.
            </p>
            <Suspense
              fallback={
                <Link href="/book-now" className="home-text-link">
                  Get a quote →
                </Link>
              }
            >
              <HomeQuoteLink className="home-text-link">
                Get a quote <span aria-hidden="true">→</span>
              </HomeQuoteLink>
            </Suspense>
          </div>
          <QuickQuoteForm
            title="Get a quote"
            subtitle="Start with the cleaning you need."
            source="organic_home_hero"
            directBookingUrl={directBookingUrl}
            compact
          />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />
    </div>
  );
}

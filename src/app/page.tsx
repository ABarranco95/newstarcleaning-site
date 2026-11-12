import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import BeforeAfterPairs from "@/components/BeforeAfterPairs";
import MarketAreas from "@/components/MarketAreas";
import FaqList from "@/components/FaqList";
import GoogleRating from "@/components/GoogleRating";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import HowItWorks from "@/components/HowItWorks";
import { MarketCallOrText } from "@/components/MarketPhone";

import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import ReviewCards from "@/components/ReviewCards";
import TrustStrip from "@/components/TrustStrip";
import { bathroomResultPhotos, ovenInteriorPair, refrigeratorFullPair, showerDetailPair, tubSurroundPair, ventDetailPair } from "@/lib/realWorkPhotos";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();

export const metadata: Metadata = {
  title: { absolute: "House Cleaning | New Star Cleaning" },
  description: "Standard, deep and move-out house cleaning. Enter your ZIP to see your price before you book.",
  alternates: { canonical: "/" },
  openGraph: { title: "House Cleaning | New Star Cleaning", description: "Standard, deep and move-out house cleaning. Enter your ZIP to see your price before you book.", url: "https://newstarcleaning.com" },
  twitter: { title: "House Cleaning | New Star Cleaning", description: "Standard, deep and move-out house cleaning. Enter your ZIP to see your price before you book." },
};

const faqs = [
  { question: "How do I get a price?", answer: "Pick the cleaning, your bedrooms, bathrooms and home size above. The price comes from our booking system, and you see your exact price before you confirm." },
  { question: "What's included?", answer: "Every visit follows our checklist, so you know what gets cleaned before we arrive. See the full checklist." },
  { question: "What isn't included?", answer: "Laundry, dishes, organizing, moving furniture, carpet shampooing, exterior windows, pressure washing, biohazard and repairs, unless we confirm them in writing first." },
  { question: "Do I need to supply anything?", answer: "No. We bring our own cleaning supplies." },
  { question: "When am I charged?", answer: "Nothing is charged when you book. Within 24 hours before the cleaning we place a hold for the visit total, and it becomes the charge after the cleaning is finished." },
  { question: "What if something was missed?", answer: "Tell us within 24 hours and we come back and make it right at no charge, as long as it was part of the agreed scope." },
  { question: "Can I cancel?", answer: "Yes. It's free until 24 hours before your arrival window. Inside 24 hours, 50% of that visit is charged." },
  { question: "Is there a contract?", answer: "No. Recurring is month to month. Pause or stop with 24 hours' notice before your next visit." },
];
const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);
const hero = bathroomResultPhotos[0];


export default function Home() {
  return (
    <div className="home-reference">
      <section className="hx ns-on-dark" aria-labelledby="home-title">
        <div className="hx-inner">
          <div className="hx-copy"><h1 id="home-title">House cleaning. See your price before you book.</h1><ProofRow market="southbay" tone="dark" /><p className="hx-intro">Standard, deep and move-out cleaning. Put in your ZIP and see your price.</p></div>
          <div className="hx-action"><PricePicker id="price" source="organic_home_price" leadSource="organic_home_hero" quoteHref="#quote" /></div>
          <figure className="hx-photo" data-work-photo="hero"><div className="hx-photo-frame"><Image src={hero.src} alt={hero.alt} fill preload fetchPriority="high" sizes="(min-width: 1024px) 560px, 100vw" /></div><figcaption>Glass shower and freestanding tub · New Star job</figcaption></figure>
        </div>
      </section>

      <section id="results" className="home-band" aria-labelledby="home-results-title"><div className="ns-section">
        <div className="ns-section-head"><h2 id="home-results-title" className="ns-h2">Before and after, from real New Star jobs.</h2></div>
        <BeforeAfterPairs pairs={[tubSurroundPair, showerDetailPair, ventDetailPair, refrigeratorFullPair, ovenInteriorPair]} market="southbay">
          <article className="home-ba-pair"><div className="home-ba-pair-images"><div className="home-comparison-image"><Image src="/photos/before1.jpg" alt="Shower before a New Star deep cleaning" fill sizes="(min-width: 1024px) 200px, 45vw" /><span className="home-ba-tag">Before</span></div><div className="home-comparison-image"><Image src="/photos/after1.jpg" alt="The same shower after a New Star deep cleaning" fill sizes="(min-width: 1024px) 200px, 45vw" /><span className="home-ba-tag">After</span></div></div><div className="home-ba-pair-label"><h3>Shower stall</h3></div></article>
        </BeforeAfterPairs>
        <div className="home-section-more"><Link href="/our-work" className="home-text-link">See all of our work <span aria-hidden="true">→</span></Link></div>
      </div></section>

      <section id="services" className="ns-section" aria-labelledby="home-services-title">
        <div className="ns-section-head"><h2 id="home-services-title" className="ns-h2">Three ways we clean.</h2><Link href="/checklist" className="home-text-link">See the full checklist <span aria-hidden="true">→</span></Link></div>
        <Suspense fallback={null}><HomeServices photos={{ "deep-cleaning": bathroomResultPhotos[1] }}>
          <p className="home-service-notes">Empty cabinet, drawer, and closet interiors are included in move-in / move-out cleaning. Oven and fridge interiors, interior window glass, and cabinet interiors on standard or deep cleans are optional add-ons. We do not guarantee a deposit return.</p>
        </HomeServices></Suspense>
      </section>

      <TrustStrip />

      <section id="reviews" className="ns-section" aria-labelledby="home-reviews-title">
        <div className="ns-section-head"><h2 id="home-reviews-title" className="ns-h2">What customers say.</h2><GoogleRating prominent market="southbay" /></div>
        <ReviewCards reviews={reviews} market="southbay" lead />
      </section>

      <HowItWorks />

      <MarketAreas home />

      <section className="site-muted" aria-labelledby="home-faq-title"><div className="ns-section home-faq"><div><h2 id="home-faq-title" className="ns-h2">Before the visit.</h2><Link href="/checklist" className="home-text-link">See the full checklist <span aria-hidden="true">→</span></Link></div><FaqList faqs={faqs} /></div></section>

      <section aria-labelledby="home-quote-title"><div className="site-section site-quote-layout">
        <div className="site-copy"><p className="ns-kicker">Your price</p><h2 id="home-quote-title" className="ns-h2">See your price. We&apos;ll text you the rest.</h2><p className="ns-lead">Put in your ZIP and the price shows here. Send it to yourself and we&apos;ll confirm the exact number and the days we have open. If the house needs more than a standard visit, we&apos;ll say so up front.</p><p className="site-note"><MarketCallOrText prefix="Or " location="home_quote" />. Mon–Fri 8–6, Sat 8–5.</p><Suspense fallback={<Link href="/book-now" className="home-text-link">Get a quote →</Link>}><HomeQuoteLink className="home-text-link">Get a quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense></div>
        <QuickQuoteForm title="Get a quote" subtitle="Start with the cleaning you need." source="organic_home_hero" directBookingUrl={directBookingUrl} compact />
      </div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} />
    </div>
  );
}
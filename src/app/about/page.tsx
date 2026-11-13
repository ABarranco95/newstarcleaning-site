import type { Metadata } from "next";
import Link from "next/link";
import MarketAreas, { MarketAboutIntro } from "@/components/MarketAreas";
import HomeBookingLink from "@/components/HomeBookingLink";
import MarketPhone from "@/components/MarketPhone";
import PhotoStrip from "@/components/PhotoStrip";
import ProofRow from "@/components/ProofRow";
import SiteHero from "@/components/SiteHero";

import HomeQuoteLink from "@/components/HomeQuoteLink";
import TrustStrip from "@/components/TrustStrip";

import { Suspense } from "react";
import { homeResultPhotos, bathroomResultPhotos, kitchenSurfacesPhoto } from "@/lib/realWorkPhotos";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "New Star Cleaning is owned and run by Angel Barranco and has cleaned homes since 2020. Serving Fresno, Clovis and Madera.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About New Star Cleaning",
    description:
      "New Star Cleaning is owned and run by Angel Barranco and has cleaned homes since 2020. Serving Fresno, Clovis and Madera.",
    url: "https://newstarcleaning.com/about",
  },
};

const steps = [
  {
    title: "A checklist for every visit.",
    note: "Room by room, so you know what's included before we arrive.",
  },
  {
    title: "Our own supplies.",
    note: "We bring the cleaning supplies. You don't need to buy anything.",
  },
  {
    title: "24 hours to tell us.",
    note: "If something in the agreed scope was missed, we come back at no charge.",
  },
  {
    title: "No contract.",
    note: "You pay cleaning to cleaning, and nothing is charged when you book.",
  },
];

export default function AboutPage() {
  return (
    <div className="site-reference">
      <SiteHero eyebrow="About New Star" title="Owned and run by Angel Barranco." description={<MarketAboutIntro />} photo={bathroomResultPhotos[0]} proof={<ProofRow tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><HomeBookingLink onDark /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div>
        <MarketPhone className="site-hero-phone mt-4" location="about_hero" />
      </SiteHero>
      <section className="site-section site-split">
        <div><p className="ns-kicker">From Angel</p><h2 className="mt-3">Here&apos;s how I run it.</h2></div>
        <div className="site-area-prose"><p>When you book, tell us about the part of the house that bothers you most. A shower with buildup takes more time than a kitchen that just needs keeping up, and the price accounts for that.</p><p>Every visit follows our checklist, and we bring our own supplies. If something in the agreed scope gets missed, tell us within 24 hours and we come back and fix it at no charge.</p><p className="font-semibold">Angel Barranco, owner</p></div>
      </section>
      <TrustStrip />
      <section className="site-section">
        <div className="ns-section-head"><div><p className="ns-kicker">How it works</p><h2>How the work gets done.</h2></div></div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <article key={step.title} className="border-t border-line pt-6"><h3>{step.title}</h3><p className="mt-4 leading-relaxed">{step.note}</p>{index === 0 ? <Link href="/checklist" className="home-text-link mt-4">See the checklist →</Link> : null}</article>)}</div>
      </section>
      <section className="site-muted"><div className="ns-section"><div className="ns-section-head"><div><p className="ns-kicker">Our work</p><h2 className="ns-h2">Rooms we&apos;ve cleaned.</h2></div><Link href="/our-work" className="home-text-link">See all of our work →</Link></div><PhotoStrip photos={[homeResultPhotos[0], homeResultPhotos[2], bathroomResultPhotos[1], kitchenSurfacesPhoto].map((photo) => ({ ...photo, caption: `${photo.caption} · New Star job` }))} /></div></section>
      <MarketAreas />
      <section className="site-muted"><div className="site-section site-split"><h2>See your price.</h2><div><p className="site-intro">Pick the cleaning and your home size, then book a time online.</p><div className="site-actions"><HomeBookingLink placement="footer" /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div></div></div></section>
    </div>
  );
}

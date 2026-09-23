import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHero from "@/components/SiteHero";
import GoogleRating from "@/components/GoogleRating";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import { Suspense } from "react";
import { homeResultPhotos, bathroomResultPhotos, emptyHomeResultPhotos } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";
import "@/components/service-editorial.css";

export const metadata: Metadata = {
  title: "About Our Fresno Cleaning Company",
  description:
    "New Star Cleaning is a locally owned residential cleaning company serving Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About New Star Cleaning | Fresno House Cleaning",
    description:
      "Locally owned residential cleaning for Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
    url: "https://newstarcleaning.com/about",
  },
};

const facts: { term: string; detail: string }[] = [
  { term: "Company", detail: `${business.legalName} — locally owned house cleaning` },
  { term: "Owner", detail: "Angel Barranco" },
  { term: "Based in", detail: "Fresno, California" },
  { term: "Cleaning since", detail: "2020" },
  { term: "Core service area", detail: "Fresno and Clovis" },
  { term: "Also served", detail: "Madera and close-in Fresno neighborhoods, route-dependent" },
  { term: "Phone", detail: "(559) 785-2822" },
];

const heroPoints = [
  "Owned and run by Angel Barranco",
  "Cleaning homes in the Fresno area since 2020",
  "Price confirmed before anything is booked",
];

const steps = [
  {
    title: "Tell us about the home",
    note: "Share the rooms, condition, pets, and how you'd like us to get in. Your notes go to the cleaner, so priorities are known before arrival.",
  },
  {
    title: "We confirm the quote",
    note: "We confirm price, included work, and the date before anything is booked. Cleaners bring supplies and equipment. Appliance interiors and interior windows are optional additions, priced ahead of time.",
  },
  {
    title: "The visit",
    note: "The cleaner works the agreed scope room by room — kitchens, bathrooms, living areas, floors — and does a final pass before leaving.",
  },
  {
    title: "Afterwards",
    note: "If something in the agreed scope was missed, tell us within 24 hours and we'll make it right. For repeat visits, ask about what the schedule allows.",
  },
];

export default function AboutPage() {
  return (
    <div className="site-reference">
      <SiteHero tone="dark" eyebrow="About New Star" title="Locally owned. Fresno based." description="We clean homes in Fresno and Clovis, from regular visits to deep cleans and move-outs. Madera appointments depend on the route and date." photo={homeResultPhotos[0]} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <ul className="site-hero-points">
          {heroPoints.map((point) => <li key={point}><Icon name="check" />{point}</li>)}
        </ul>
        <div className="site-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Get a free quote <span aria-hidden="true">→</span></Link>}><HomeQuoteLink className="home-button">Get a free quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense><a href={business.phoneHref} className="home-text-link" data-phone-location="about_hero"><Icon name="phone" /> {business.phoneDisplay}</a></div>
        <div className="site-proof-row"><GoogleRating /></div>
      </SiteHero>

      <TrustStrip />

      <section className="site-section site-split">
        <div>
          <p className="ns-kicker">The company</p>
          <h2 className="mt-3">Who you’re hiring.</h2>
          <p className="site-intro">New Star Cleaning is a locally owned residential cleaning company run from Fresno, serving Fresno and Clovis as core routes, with Madera appointments confirmed by address and date. Homes are our core work — recurring visits, deep cleans, and empty-home move-outs.</p>
          <div className="service-editorial mt-6">
            <dl className="se-about-facts">
              {facts.map((fact) => (
                <div key={fact.term}><dt>{fact.term}</dt><dd>{fact.detail}</dd></div>
              ))}
            </dl>
          </div>
        </div>
        <div>
          <p className="ns-kicker">How it works</p>
          <h2 className="mt-3">Working with us.</h2>
          <div className="service-editorial mt-6">
            <div className="se-steps">
              {steps.map((step) => (
                <div key={step.title} className="se-step">
                  <h3>{step.title}</h3>
                  <p>{step.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-muted" aria-labelledby="about-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="about-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent /></div>
          <ReviewCards topic="home" />
        </div>
      </section>

      <section className="site-section">
        <div className="home-section-heading"><div><p className="ns-kicker">Our work</p><h2 className="mt-3">Work from our routes.</h2></div><Link href="/our-work" className="home-text-link">See more of our work <span aria-hidden="true">→</span></Link></div>
        <div className="service-editorial mt-8">
          <div className="se-about-photos">
            <figure>
              <Image src={homeResultPhotos[1].src} alt={homeResultPhotos[1].alt} fill sizes="(min-width: 1024px) 400px, 45vw" />
              <figcaption>{homeResultPhotos[1].caption} · New Star work</figcaption>
            </figure>
            <figure>
              <Image src={bathroomResultPhotos[1].src} alt={bathroomResultPhotos[1].alt} fill sizes="(min-width: 1024px) 400px, 45vw" />
              <figcaption>{bathroomResultPhotos[1].caption} · New Star work</figcaption>
            </figure>
            <figure>
              <Image src={emptyHomeResultPhotos[0].src} alt={emptyHomeResultPhotos[0].alt} fill sizes="(min-width: 1024px) 400px, 45vw" />
              <figcaption>{emptyHomeResultPhotos[0].caption} · New Star work</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="site-section site-split site-rule"><h2>Homes are our core work.</h2><div><p className="site-intro">We also clean offices, small commercial spaces, and completed construction projects by proposal.</p><div className="site-links"><Link href="/services/commercial-cleaning">Office &amp; commercial</Link><Link href="/services/post-construction-cleaning">Post-construction</Link><Link href="/service-areas">Local service areas</Link><Link href="/contact">Contact us</Link></div></div></section>
    </div>
  );
}

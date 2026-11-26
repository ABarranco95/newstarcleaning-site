import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import Link from "next/link";
import { Suspense } from "react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import HomeBookingLink from "@/components/HomeBookingLink";
import MapEmbed from "@/components/MapEmbed";
import ProofRow from "@/components/ProofRow";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import MarketPhone from "@/components/MarketPhone";
import MarketAreas, { ServiceAreasSchema } from "@/components/MarketAreas";
import { bathroomResultPhotos } from "@/lib/realWorkPhotos";

const siteUrl = "https://newstarcleaning.com";
export const metadata: Metadata = {
  title: "House Cleaning Service Areas",
  description: "House cleaning in Fresno, Clovis and Madera, including Fresno neighborhood guides. Check your price online.",
  alternates: { canonical: "/service-areas" },
  ...socialMetadata({ title: "House Cleaning Service Areas | New Star Cleaning", description: "House cleaning in Fresno, Clovis and Madera, including Fresno neighborhood guides. Check your price online.", url: `${siteUrl}/service-areas` }),
};

export default function ServiceAreasPage() {
  return <div className="site-reference">
    <SiteHero eyebrow="Service areas" title="Find your cleaning area." description="Pick your city for the local details and your price. Service depends on the address, and we confirm it before you book." photo={bathroomResultPhotos[1]} proof={<ProofRow tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
      <div className="site-actions"><HomeBookingLink onDark /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote</HomeQuoteLink></Suspense></div><div className="site-actions"><a href="#cities" className="home-text-link">Find your area ↓</a><MarketPhone className="site-hero-phone" location="areas_hero" /></div>
    </SiteHero>
    <MarketAreas directory />
    <section className="site-muted" aria-labelledby="service-areas-map-title">
      <div className="site-section">
        <div className="ns-section-head">
          <div>
            <p className="ns-kicker">Coverage map</p>
            <h2 id="service-areas-map-title" className="ns-h2">Serving Fresno, Clovis &amp; Madera.</h2>
          </div>
        </div>
        <MapEmbed showAreasLink={false} />
      </div>
    </section>
    <section><div className="site-section site-split"><div><p className="ns-kicker">Not sure?</p><h2 className="mt-3">Not sure about your address?</h2></div><div><p className="site-intro">Text us the address and the date you want, and we&apos;ll tell you if we cover it before you book.</p><div className="site-actions"><MarketPhone text label="Text us" className="home-button" /><Suspense fallback={<Link href="/book-now" className="home-text-link">Get a quote →</Link>}><HomeQuoteLink className="home-text-link">Get a quote →</HomeQuoteLink></Suspense></div></div></div></section>
    <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Service Areas", url: `${siteUrl}/service-areas` }]} />
    <ServiceAreasSchema />
  </div>;
}


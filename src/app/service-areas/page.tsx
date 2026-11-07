import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import CityLinks from "@/components/CityLinks";
import HomeBookingLink from "@/components/HomeBookingLink";
import ProofRow from "@/components/ProofRow";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";

import { Suspense } from "react";
import { serviceAreas } from "@/lib/serviceAreas";
import { bathroomResultPhotos } from "@/lib/realWorkPhotos";

import MarketPhone from "@/components/MarketPhone";

import { sanJoseNeighborhoods } from "@/lib/sanJoseNeighborhoods";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning in San Jose, South Bay & Fresno",
  description: "Find house cleaning in San Jose, Cupertino, Santa Clara, Sunnyvale, Campbell, Saratoga, and Los Gatos. Also serving Fresno, Clovis, and Madera.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "San Jose, South Bay & Fresno Service Areas | New Star Cleaning",
    description: "House cleaning across the South Bay, with continued service in Fresno, Clovis, and Madera.",
    url: `${siteUrl}/service-areas`,
  },
};

const cityRoutes = serviceAreas.filter((area) => ["fresno", "clovis", "madera"].includes(area.slug));

const fresnoNeighborhoods = serviceAreas.filter((area) => ["tower-district", "fig-garden", "woodward-park"].includes(area.slug));

export default function ServiceAreasPage() {
  return (
    <div className="site-reference">
      <SiteHero eyebrow="Service areas" title="San Jose & the South Bay. Also serving the Central Valley." description="Pick your city for the local details and your price. Service depends on the address, and we confirm it before you book." photo={bathroomResultPhotos[1]} proof={<ProofRow market="southbay" tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><HomeBookingLink onDark /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div><div className="site-actions"><a href="#cities" className="home-text-link">Find your area ↓</a><MarketPhone className="site-hero-phone" location="areas_hero" /></div>
      </SiteHero>
      <section id="cities" className="ns-section scroll-mt-24" aria-labelledby="areas-southbay-title"><div className="ns-section-head"><div><p className="ns-kicker">South Bay</p><h2 id="areas-southbay-title" className="ns-h2">Cities we serve around San Jose.</h2></div></div><CityLinks /><h3 className="mt-8">San Jose neighborhood guides</h3><div className="site-links">{sanJoseNeighborhoods.map((neighborhood) => <Link key={neighborhood.slug} href={`/cleaning-services-san-jose/${neighborhood.slug}`}>House cleaning in {neighborhood.name}</Link>)}</div><p className="site-note">Service depends on the address. We confirm it before you book.</p></section>
      <section className="site-muted"><div className="ns-section" aria-labelledby="areas-cities-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Also serving</p><h2 id="areas-cities-title" className="ns-h2">Fresno, Clovis &amp; Madera.</h2></div></div>
        <nav aria-label="Fresno neighborhoods and Central Valley cities" className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">{[...cityRoutes, ...fresnoNeighborhoods].map((area) => <Link key={area.slug} href={`/cleaning-services-${area.slug}`} className="home-text-link min-h-12 border-b border-line py-3">House cleaning in {area.name}{area.areaType === "city" ? ", CA" : ""}</Link>)}</nav><p className="site-note">Madera dates depend on route availability.</p>
      </div></section>
      <section>
        <div className="site-section site-split">
          <div><p className="ns-kicker">Not sure?</p><h2 className="mt-3">Not sure about your address?</h2></div>
          <div>
            <p className="site-intro">Text us the address and the date you want, and we&apos;ll tell you if it&apos;s on our route before you book.</p>
            <div className="site-actions"><MarketPhone text label="Text us" className="home-button" /><Suspense fallback={<Link href="/book-now" className="home-text-link">Check availability →</Link>}><HomeQuoteLink className="home-text-link">Check availability →</HomeQuoteLink></Suspense></div>
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: "Service Areas", url: `${siteUrl}/service-areas` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning service areas",
        itemListElement: serviceAreas.map((area, index) => ({
          "@type": "ListItem", position: index + 1, name: `${area.name}, CA`, url: `${siteUrl}/cleaning-services-${area.slug}`,
        })),
      }) }} />
    </div>
  );
}

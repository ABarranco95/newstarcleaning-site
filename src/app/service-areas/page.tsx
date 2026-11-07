import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GoogleRating from "@/components/GoogleRating";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import { Suspense } from "react";
import { serviceAreas } from "@/lib/serviceAreas";
import { emptyHomeResultPhotos } from "@/lib/realWorkPhotos";

import MarketPhone from "@/components/MarketPhone";
import { markets } from "@/lib/markets";
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
const southBayRoutes = serviceAreas.filter((area) => area.market === "southbay");
const fresnoNeighborhoods = serviceAreas.filter((area) => ["tower-district", "fig-garden", "woodward-park"].includes(area.slug));

export default function ServiceAreasPage() {
  return (
    <div className="site-reference">
      <SiteHero tone="dark" eyebrow="Service areas" title="San Jose & the South Bay. Also serving the Central Valley." description="Find the cleaning scope for your city, then share your ZIP and preferred date. We confirm the property, price, and available window before booking." photo={emptyHomeResultPhotos[4]} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><a href="#cities" className="home-button">Find your area <span aria-hidden="true">↓</span></a><Suspense fallback={<Link href="/book-now" className="home-text-link">Get a quote</Link>}><HomeQuoteLink className="home-text-link">Get a quote</HomeQuoteLink></Suspense></div>
        <div className="site-hero-meta"><GoogleRating /><MarketPhone market="southbay" className="site-hero-phone" location="areas_hero"><Icon name="phone" /> </MarketPhone></div>
      </SiteHero>

      <TrustStrip market="southbay" />

      <section id="cities" className="ns-section scroll-mt-24" aria-labelledby="areas-southbay-title"><div className="ns-section-head"><div><p className="ns-kicker">South Bay</p><h2 id="areas-southbay-title" className="ns-h2">Cities we serve around San Jose.</h2><p className="ns-lead">Local home details, complete scope, and market-specific pricing.</p></div></div><div className="site-directory site-directory-cards">{southBayRoutes.map((area) => <article key={area.slug}><p className="site-card-meta">{area.areaType}</p><h3><Link href={`/cleaning-services-${area.slug}`}>{area.name}, CA →</Link></h3><p>{area.description}</p></article>)}</div><p className="site-note mt-6">We also review requests in {markets.southbay.cities.filter((city) => !southBayRoutes.some((area) => area.name === city)).join(", ")}. Enter the ZIP to confirm the exact service area.</p></section>

      <section className="ns-section site-rule" aria-labelledby="areas-sj-neighborhoods-title"><p className="ns-kicker">San Jose neighborhoods</p><h2 id="areas-sj-neighborhoods-title" className="ns-h2">A closer look at your home.</h2><div className="site-directory site-directory-cards mt-8">{sanJoseNeighborhoods.map((neighborhood) => <article key={neighborhood.slug}><p className="site-card-meta">{neighborhood.zipLabels.join(" · ")}</p><h3><Link href={`/cleaning-services-san-jose/${neighborhood.slug}`}>{neighborhood.name} →</Link></h3><p>{neighborhood.description}</p></article>)}</div></section>

      <section className="ns-section scroll-mt-24" aria-labelledby="areas-cities-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Also serving</p><h2 id="areas-cities-title" className="ns-h2">Fresno, Clovis &amp; Madera.</h2></div></div>
        <div className="site-directory site-directory-cards">
          {cityRoutes.map((area) => (
            <article key={area.slug}>
              <span className="site-card-icon"><Icon name="pin" /></span>
              <p className="site-card-meta">{area.county}</p>
              <h3><Link href={`/cleaning-services-${area.slug}`}>{area.name}, CA <span aria-hidden="true">→</span></Link></h3>
              <p>{area.localProof}</p>

            </article>
          ))}
        </div>
      </section>

      <section className="site-muted" aria-labelledby="areas-neighborhoods-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Neighborhoods</p><h2 id="areas-neighborhoods-title" className="ns-h2">Fresno neighborhoods.</h2><p className="ns-lead">From Tower District to Woodward Park. If you don&apos;t see your neighborhood, ask us.</p></div></div>
          <div className="site-directory site-directory-cards">
            {fresnoNeighborhoods.map((area) => (
              <article key={area.slug}>
                <span className="site-card-icon"><Icon name="home" /></span>
                <h3><Link href={`/cleaning-services-${area.slug}`}>{area.name} <span aria-hidden="true">→</span></Link></h3>
                <p>{area.localProof}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-section" aria-labelledby="areas-reviews-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="areas-reviews-title" className="ns-h2">What customers say.</h2><p className="ns-lead">These reviews are from our Central Valley customers. San Jose is our newest area.</p></div><GoogleRating prominent market="southbay" /></div>
        <ReviewCards topic="home" />
      </section>

      <section className="site-muted">
        <div className="site-section site-split">
          <h2>Unsure about your address?</h2>
          <div>
            <p className="site-intro">Tell us where you are and when you need the cleaning. We&apos;ll let you know if we can get to you before you book.</p>
            <div className="site-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Check availability</Link>}><HomeQuoteLink className="home-button">Check availability <span aria-hidden="true">→</span></HomeQuoteLink></Suspense><Link href="/services" className="home-text-link">Compare cleaning services</Link></div>
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

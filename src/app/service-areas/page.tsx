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
import { business } from "@/lib/business";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "Cleaning Service Areas near Fresno",
  description: "See New Star Cleaning service areas across Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Cleaning Service Areas near Fresno | New Star Cleaning",
    description: "Local house cleaning routes for Fresno, Clovis, Madera, and nearby Fresno neighborhoods.",
    url: `${siteUrl}/service-areas`,
  },
};

const cityRoutes = serviceAreas.filter((area) => ["fresno", "clovis", "madera"].includes(area.slug));
const fresnoNeighborhoods = serviceAreas.filter((area) => ["tower-district", "fig-garden", "woodward-park"].includes(area.slug));

export default function ServiceAreasPage() {
  return (
    <div className="site-reference">
      <SiteHero tone="dark" eyebrow="Service area" title="House cleaning across Fresno, Clovis & Madera." description="Fresno and Clovis are our core routes. Madera appointments depend on your address and available dates." photo={emptyHomeResultPhotos[4]} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><a href="#cities" className="home-button">Find your area <span aria-hidden="true">↓</span></a><Suspense fallback={<Link href="/book-now" className="home-text-link">Get a free quote</Link>}><HomeQuoteLink className="home-text-link">Get a free quote</HomeQuoteLink></Suspense></div>
        <div className="site-hero-meta"><GoogleRating /><a href={business.phoneHref} className="site-hero-phone" data-phone-location="areas_hero"><Icon name="phone" /> {business.phoneDisplay}</a></div>
      </SiteHero>

      <TrustStrip />

      <section id="cities" className="ns-section scroll-mt-24" aria-labelledby="areas-cities-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Cities</p><h2 id="areas-cities-title" className="ns-h2">Cities we serve.</h2></div></div>
        <div className="site-directory site-directory-cards">
          {cityRoutes.map((area) => (
            <article key={area.slug}>
              <span className="site-card-icon"><Icon name="pin" /></span>
              <p className="site-card-meta">{area.county}</p>
              <h3><Link href={`/cleaning-services-${area.slug}`}>{area.name}, CA <span aria-hidden="true">→</span></Link></h3>
              <p>{area.localProof}</p>
              {area.slug === "madera" && <p>Availability depends on route capacity, the exact address, and your requested date.</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="site-muted" aria-labelledby="areas-neighborhoods-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Neighborhoods</p><h2 id="areas-neighborhoods-title" className="ns-h2">Fresno neighborhoods.</h2><p className="ns-lead">Home types, access, and scheduling details for your neighborhood.</p></div></div>
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
        <div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="areas-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent /></div>
        <ReviewCards topic="home" />
      </section>

      <section className="site-muted">
        <div className="site-section site-split">
          <h2>Unsure about your address?</h2>
          <div>
            <p className="site-intro">Send the address and preferred date. We’ll confirm coverage before booking.</p>
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

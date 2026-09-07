import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GoogleRating from "@/components/GoogleRating";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import { serviceAreas } from "@/lib/serviceAreas";
import { homeResultPhotos } from "@/lib/realWorkPhotos";

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
      <SiteHero title="Close to home." eyebrow="House cleaning around Fresno" description="Fresno and Clovis are our core routes. Madera appointments depend on your address and available dates." photo={homeResultPhotos[3]} breadcrumbs={[{label: "Home", href: "/"}]}>
        <div className="site-actions"><a href="#cities" className="home-button">Find your area ↗</a><Suspense fallback={<Link href="/book-now" className="home-text-link">Request a quote</Link>}><HomeQuoteLink className="home-text-link">Request a quote</HomeQuoteLink></Suspense></div><div className="site-proof-row"><GoogleRating /></div>
      </SiteHero>
      <section id="cities" className="site-section site-rule"><h2>Cities we serve.</h2><div className="site-directory">{cityRoutes.map((area) => <article key={area.slug}><span className="site-eyebrow">{area.county}</span><h3><Link href={`/cleaning-services-${area.slug}`}>{area.name}, CA ↗</Link></h3><p>{area.localProof}</p>{area.slug === "madera" && <p>Availability depends on route capacity, the exact address, and your requested date.</p>}</article>)}</div></section>
      <section className="site-muted"><div className="site-section site-split"><div><h2>Fresno neighborhoods.</h2><p className="site-intro">Home types, access, and scheduling details for your neighborhood.</p></div><div>{fresnoNeighborhoods.map((area) => <article key={area.slug} className="border-t border-line py-5"><h3><Link href={`/cleaning-services-${area.slug}`}>{area.name} ↗</Link></h3><p className="site-intro">{area.localProof}</p></article>)}</div></div></section>
      <section className="site-section site-split"><h2>Unsure about your address?</h2><div><p className="site-intro">Send the address and preferred date. We’ll confirm coverage before booking.</p><div className="site-links"><Suspense fallback={<Link href="/book-now">Check availability ↗</Link>}><HomeQuoteLink className="home-text-link">Check availability ↗</HomeQuoteLink></Suspense><Link href="/services">Compare cleaning services</Link></div></div></section>
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

import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Suspense } from "react";
import SiteHero from "@/components/SiteHero";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import GoogleRating from "@/components/GoogleRating";
import { homeResultPhotos } from "@/lib/realWorkPhotos";
import { serviceAreas } from "@/lib/serviceAreas";
import { services } from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "Cleaning Services in Fresno & Clovis",
  description:
    "Compare residential, post-construction, office, and commercial cleaning services for Fresno, Clovis, Madera, and close-in Fresno routes.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cleaning Services in Fresno & Clovis | New Star Cleaning",
    description:
      "Compare local house cleaning services, what is included, and where New Star Cleaning serves across Fresno, Clovis, and Madera.",
    url: `${siteUrl}/services`,
  },
};

const serviceLinks = {
  "standard-cleaning": "/services/standard-cleaning",
  "deep-cleaning": "/services/deep-cleaning",
  "move-out-cleaning": "/services/move-out-cleaning",
} as const;

const projectServices = [
  {
    name: "Post-construction cleaning",
    href: "/services/post-construction-cleaning",
    description:
      "Final cleaning after a build or renovation. We quote the work and any return visits separately.",
    fit: "Builders, remodelers, owners, and project teams",
  },
  {
    name: "Office & commercial cleaning",
    href: "/services/commercial-cleaning",
    description:
      "Cleaning for offices and small commercial spaces, with a written task list and schedule.",
    fit: "Offices, property managers, and commercial facilities",
  },
];

const serviceSchemaItems = [
  ...services.map((service) => ({ name: service.name, href: serviceLinks[service.slug] })),
  ...projectServices.map((service) => ({ name: service.name, href: service.href })),
];

const primaryAreas = serviceAreas.filter((area) =>
  ["fresno", "clovis", "madera"].includes(area.slug),
);

export default function ServicesPage() {
  return (
    <div className="site-reference">
      <SiteHero title="Cleaning for your home." description="Regular visits, a deeper clean, or an empty home before a move. Fresno and Clovis, with Madera dates subject to route availability." photo={homeResultPhotos[1]} breadcrumbs={[{label: "Home", href: "/"}]}>
        <div className="site-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Request a quote ↗</Link>}><HomeQuoteLink className="home-button">Request a quote ↗</HomeQuoteLink></Suspense><a href="#compare" className="home-text-link">Compare services</a></div>
        <div className="site-proof-row"><GoogleRating /></div>
      </SiteHero>
      <section id="compare" className="site-section site-rule">
        <div className="home-section-heading"><h2>Which cleaning do you need?</h2><Link href="/checklist" className="home-text-link">Full checklists ↗</Link></div>
        <Suspense fallback={<p>Standard, deep, and move-in / move-out cleaning.</p>}><HomeServices /></Suspense>
        <div className="home-service-notes"><p>Oven and fridge interiors, interior window glass, and reachable window tracks are optional. Cabinet interiors are optional for standard and deep cleaning.</p><p>Price depends on size, condition, frequency, and requested work. Laundry, dishes, bed making, organizing, and packing are not included.</p></div>
      </section>
      <section className="site-muted"><div className="site-section site-split"><div><h2>Workplaces &amp; projects.</h2><p className="site-intro">A walkthrough or photo review, followed by a written proposal.</p></div><div className="site-disclosures">{projectServices.map((service) => <article className="py-5 border-b border-line" key={service.href}><h3><Link href={service.href}>{service.name} ↗</Link></h3><p className="site-intro">{service.description}</p></article>)}</div></div></section>
      <section className="site-section site-split"><h2>Near you.</h2><div><p className="site-intro">Fresno and Clovis are our core areas. Madera appointments depend on your address, date, and route capacity.</p><div className="site-links">{primaryAreas.map((area) => <Link key={area.slug} href={`/cleaning-services-${area.slug}`}>{area.name}</Link>)}<Link href="/service-areas">All service areas ↗</Link></div></div></section>
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Services", url: `${siteUrl}/services` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning services",
        itemListElement: serviceSchemaItems.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${siteUrl}${service.href}` })),
      }) }} />
    </div>
  );
}

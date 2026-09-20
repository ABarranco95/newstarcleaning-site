import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Suspense } from "react";
import SiteHero from "@/components/SiteHero";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import ServiceContextLink from "@/components/ServiceContextLink";
import GoogleRating from "@/components/GoogleRating";
import { homeResultPhotos, bathroomResultPhotos, emptyHomeResultPhotos } from "@/lib/realWorkPhotos";
import { serviceAreas } from "@/lib/serviceAreas";
import { services } from "@/lib/services";
import "@/components/service-editorial.css";

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
      <section className="site-section site-rule">
        <div className="home-section-heading"><h2>Three ways to use us.</h2><Link href="/checklist" className="home-text-link">Full checklists ↗</Link></div>
        <div className="service-editorial">
          <div className="se-guide">
            <article className="se-guide-card">
              <div className="se-guide-photo"><Image src={homeResultPhotos[1].src} alt={homeResultPhotos[1].alt} fill sizes="(min-width: 1024px) 400px, 90vw" /></div>
              <div className="se-guide-body">
                <h3>Standard · from $165</h3>
                <p>An already-maintained home on a weekly, bi-weekly, or monthly schedule. Kitchens, bathrooms, dusting, floors.</p>
                <p>Pick standard when the home is picked up and you want it kept consistently clean. Heavy buildup means starting with a deep clean.</p>
                <div className="se-guide-links">
                  <Suspense fallback={<><Link href="/services/standard-cleaning?service=standard-cleaning" data-service-guide-link="standard-cleaning" data-service-guide-action="details">Standard details ↗</Link><Link href="/services/standard-cleaning?service=standard-cleaning#quote" data-service-guide-link="standard-cleaning" data-service-guide-action="quote">Quote ↗</Link></>}>
                    <ServiceContextLink service="standard-cleaning">Standard details ↗</ServiceContextLink>
                    <ServiceContextLink service="standard-cleaning" quote>Quote ↗</ServiceContextLink>
                  </Suspense>
                </div>
              </div>
            </article>
            <article className="se-guide-card">
              <div className="se-guide-photo"><Image src={bathroomResultPhotos[2].src} alt={bathroomResultPhotos[2].alt} fill sizes="(min-width: 1024px) 400px, 90vw" /></div>
              <div className="se-guide-body">
                <h3>Deep · from $235</h3>
                <p>The standard work plus real time on buildup, baseboards, fixtures, and reachable detail areas.</p>
                <p>Pick deep for a first visit, a seasonal reset, or visible buildup. Oven, fridge, cabinet interiors, and interior windows stay optional add-ons.</p>
                <div className="se-guide-links">
                  <Suspense fallback={<><Link href="/services/deep-cleaning?service=deep-cleaning" data-service-guide-link="deep-cleaning" data-service-guide-action="details">Deep details ↗</Link><Link href="/services/deep-cleaning?service=deep-cleaning#quote" data-service-guide-link="deep-cleaning" data-service-guide-action="quote">Quote ↗</Link></>}>
                    <ServiceContextLink service="deep-cleaning">Deep details ↗</ServiceContextLink>
                    <ServiceContextLink service="deep-cleaning" quote>Quote ↗</ServiceContextLink>
                  </Suspense>
                </div>
              </div>
            </article>
            <article className="se-guide-card">
              <div className="se-guide-photo"><Image src={emptyHomeResultPhotos[1].src} alt={emptyHomeResultPhotos[1].alt} fill sizes="(min-width: 1024px) 400px, 90vw" /></div>
              <div className="se-guide-body">
                <h3>Move-out · from $325</h3>
                <p>The empty-home service: deep-cleaning work plus empty cabinet, drawer, and closet interiors included.</p>
                <p>Pick move-out when the home is empty or nearly empty. Inside oven and fridge, interior glass, and tracks are optional add-ons; deposit outcomes are never guaranteed.</p>
                <div className="se-guide-links">
                  <Suspense fallback={<><Link href="/services/move-out-cleaning?service=move-out-cleaning" data-service-guide-link="move-out-cleaning" data-service-guide-action="details">Move-out details ↗</Link><Link href="/services/move-out-cleaning?service=move-out-cleaning#quote" data-service-guide-link="move-out-cleaning" data-service-guide-action="quote">Quote ↗</Link></>}>
                    <ServiceContextLink service="move-out-cleaning">Move-out details ↗</ServiceContextLink>
                    <ServiceContextLink service="move-out-cleaning" quote>Quote ↗</ServiceContextLink>
                  </Suspense>
                </div>
              </div>
            </article>
          </div>
        </div>
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

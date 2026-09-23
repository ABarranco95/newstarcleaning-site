import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Suspense } from "react";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import ServiceContextLink from "@/components/ServiceContextLink";
import GoogleRating from "@/components/GoogleRating";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon, { type IconName } from "@/components/Icon";
import { homeResultPhotos, bathroomResultPhotos, emptyHomeResultPhotos } from "@/lib/realWorkPhotos";
import { serviceAreas } from "@/lib/serviceAreas";
import { services } from "@/lib/services";
import { business } from "@/lib/business";
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

const guides = [
  {
    slug: "standard-cleaning",
    short: "Standard",
    name: "Standard cleaning",
    price: "$165",
    photo: homeResultPhotos[1],
    fit: "An already-maintained home on a weekly, bi-weekly, or monthly schedule. Kitchens, bathrooms, dusting, floors.",
    pick: "Pick standard when the home is picked up and you want it kept consistently clean. Heavy buildup means starting with a deep clean.",
  },
  {
    slug: "deep-cleaning",
    short: "Deep",
    name: "Deep cleaning",
    price: "$235",
    photo: bathroomResultPhotos[1],
    fit: "The standard work plus real time on buildup, baseboards, fixtures, and reachable detail areas.",
    pick: "Pick deep for a first visit, a seasonal reset, or visible buildup. Oven, fridge, cabinet interiors, and interior windows stay optional add-ons.",
  },
  {
    slug: "move-out-cleaning",
    short: "Move-out",
    name: "Move-in / move-out",
    price: "$325",
    photo: emptyHomeResultPhotos[1],
    fit: "The empty-home service: deep-cleaning work plus empty cabinet, drawer, and closet interiors included.",
    pick: "Pick move-out when the home is empty or nearly empty. Inside oven and fridge, interior glass, and tracks are optional add-ons; deposit outcomes are never guaranteed.",
  },
] as const;

const projectServices: { name: string; short: string; href: string; description: string; fit: string; icon: IconName }[] = [
  {
    name: "Post-construction cleaning",
    short: "post-construction",
    href: "/services/post-construction-cleaning",
    description:
      "Final cleaning after a build or renovation. We quote the work and any return visits separately.",
    fit: "Builders, remodelers, owners, and project teams",
    icon: "calendar",
  },
  {
    name: "Office & commercial cleaning",
    short: "commercial",
    href: "/services/commercial-cleaning",
    description:
      "Cleaning for offices and small commercial spaces, with a written task list and schedule.",
    fit: "Offices, property managers, and commercial facilities",
    icon: "clipboard",
  },
];

const serviceSchemaItems = [
  ...services.map((service) => ({ name: service.name, href: serviceLinks[service.slug] })),
  ...projectServices.map((service) => ({ name: service.name, href: service.href })),
];

const primaryAreas = serviceAreas.filter((area) =>
  ["fresno", "clovis", "madera"].includes(area.slug),
);

const heroPoints = [
  "Standard from $165 · deep from $235 · move-out from $325",
  "Price confirmed before anything is booked",
  "Supplies and equipment brought in",
];

export default function ServicesPage() {
  return (
    <div className="site-reference">
      <SiteHero tone="dark" eyebrow="Services" title="House cleaning services in Fresno & Clovis." description="Regular visits, a deeper clean, or an empty home before a move. Madera dates depend on route availability." photo={homeResultPhotos[1]} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <ul className="site-hero-points">
          {heroPoints.map((point) => <li key={point}><Icon name="check" />{point}</li>)}
        </ul>
        <div className="site-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Get a free quote <span aria-hidden="true">→</span></Link>}><HomeQuoteLink className="home-button">Get a free quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense><a href="#compare" className="home-text-link">Compare services</a></div>
        <div className="site-hero-meta"><GoogleRating /><a href={business.phoneHref} className="site-hero-phone" data-phone-location="services_hero"><Icon name="phone" /> {business.phoneDisplay}</a></div>
      </SiteHero>

      <TrustStrip />

      <section id="compare" className="ns-section scroll-mt-24" aria-labelledby="services-compare-title">
        <div className="ns-section-head">
          <div><p className="ns-kicker">Compare</p><h2 id="services-compare-title" className="ns-h2">Which cleaning do you need?</h2></div>
          <Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">→</span></Link>
        </div>
        <div className="service-editorial">
          <div className="se-guide">
            {guides.map((guide) => (
              <article key={guide.slug} className="se-guide-card">
                <div className="se-guide-photo"><Image src={guide.photo.src} alt={guide.photo.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 33vw, 90vw" /></div>
                <div className="se-guide-body">
                  <p className="se-guide-price">From <strong>{guide.price}</strong></p>
                  <h3>{guide.name}</h3>
                  <p>{guide.fit}</p>
                  <p>{guide.pick}</p>
                  <div className="se-guide-links">
                    <Suspense fallback={<><Link href={`/services/${guide.slug}?service=${guide.slug}`} data-service-guide-link={guide.slug} data-service-guide-action="details">{guide.short} details</Link><Link href={`/services/${guide.slug}?service=${guide.slug}#quote`} data-service-guide-link={guide.slug} data-service-guide-action="quote">Get a quote</Link></>}>
                      <ServiceContextLink service={guide.slug}>{guide.short} details</ServiceContextLink>
                      <ServiceContextLink service={guide.slug} quote>Get a quote</ServiceContextLink>
                    </Suspense>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="home-service-notes">Oven and fridge interiors, interior window glass, and reachable window tracks are optional. Cabinet interiors are optional for standard and deep cleaning. Price depends on size, condition, frequency, and requested work. Laundry, dishes, bed making, organizing, and packing are not included.</p>
      </section>

      <section className="site-muted" aria-labelledby="services-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="services-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent /></div>
          <ReviewCards topic="home" />
        </div>
      </section>

      <section className="ns-section" aria-labelledby="services-business-title">
        <div className="ns-section-head"><div><p className="ns-kicker">For businesses</p><h2 id="services-business-title" className="ns-h2">Workplaces &amp; projects.</h2><p className="ns-lead">A walkthrough or photo review, followed by a written proposal.</p></div></div>
        <div className="site-directory site-directory-cards site-directory-two">
          {projectServices.map((service) => (
            <article key={service.href}>
              <span className="site-card-icon"><Icon name={service.icon} /></span>
              <h3><Link href={service.href}>{service.name}</Link></h3>
              <p>{service.description}</p>
              <p className="site-card-meta">{service.fit}</p>
              <Link href={service.href} className="home-text-link">See {service.short} details <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-muted" aria-labelledby="services-areas-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Service area</p><h2 id="services-areas-title" className="ns-h2">Near you.</h2><p className="ns-lead">Fresno and Clovis are our core areas. Madera appointments depend on your address, date, and route capacity.</p></div><Link href="/service-areas" className="home-text-link">All service areas <span aria-hidden="true">→</span></Link></div>
          <div className="home-local-cards home-local-cards-row">
            {primaryAreas.map((area) => <Link key={area.slug} href={`/cleaning-services-${area.slug}`} className="home-local-card"><Icon name="pin" /><span><strong>{area.name}</strong><span>{area.county}</span></span></Link>)}
          </div>
        </div>
      </section>

      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Services", url: `${siteUrl}/services` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning services",
        itemListElement: serviceSchemaItems.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${siteUrl}${service.href}` })),
      }) }} />
    </div>
  );
}

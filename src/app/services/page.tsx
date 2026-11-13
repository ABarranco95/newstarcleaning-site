import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { Suspense } from "react";
import SiteHero from "@/components/SiteHero";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import ServiceContextLink from "@/components/ServiceContextLink";
import GoogleRating from "@/components/GoogleRating";
import HomeBookingLink from "@/components/HomeBookingLink";
import HowItWorks from "@/components/HowItWorks";
import MarketPhone from "@/components/MarketPhone";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import Icon, { type IconName } from "@/components/Icon";
import { homeResultPhotos, cleanBathroomPhoto, emptyHomeResultPhotos } from "@/lib/realWorkPhotos";
import { googleReviews } from "@/lib/googleReviews";
import { serviceAreas } from "@/lib/serviceAreas";
import { services } from "@/lib/services";

import "@/components/service-editorial.css";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno, Clovis & Madera",
  description:
    "Compare residential, post-construction, office, and commercial cleaning services for Fresno, Clovis and Madera.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "House Cleaning Services in Fresno, Clovis & Madera | New Star Cleaning",
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
    photo: homeResultPhotos[2],
    fit: "Keep up with the rooms you use every day. We clean the kitchen and bathrooms, dust accessible surfaces, and vacuum or mop the floors.",
    pick: "For an already-maintained home, once or on a weekly, bi-weekly, or monthly schedule. If there's heavy buildup, start with a deep clean.",
  },
  {
    slug: "deep-cleaning",
    short: "Deep",
    name: "Deep cleaning",
    photo: cleanBathroomPhoto,
    fit: "The kitchen, bathrooms and floors, with more time for shower buildup, baseboards, door frames and reachable fixtures.",
    pick: "Choose this when a regular clean won't be enough. Oven, fridge, cabinet interiors, and interior windows stay optional add-ons.",
  },
  {
    slug: "move-out-cleaning",
    short: "Move-out",
    name: "Move-in / move-out",
    photo: emptyHomeResultPhotos[5],
    fit: "An empty home cleaned for the move. Kitchens, bathrooms, floors and deep-cleaning details, including inside empty cabinets, drawers and closets.",
    pick: "For moving out or moving in. Inside oven and fridge, interior glass, and tracks are optional add-ons. We can't promise a deposit return.",
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

const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);

export default function ServicesPage() {
  return (
    <div className="site-reference">
      <SiteHero eyebrow="Services" title="House cleaning services in Fresno, Clovis & Madera." description="Here's what each cleaning covers. Not sure which one fits? Text us and we'll help you pick." photo={homeResultPhotos[0]} proof={<ProofRow tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><HomeBookingLink onDark /><Suspense fallback={<Link href="/book-now" className="home-button-secondary">Get a quote by text</Link>}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div><div className="site-actions"><a href="#compare" className="home-text-link">Compare services ↓</a><MarketPhone className="site-hero-phone" location="services_hero" /></div>
      </SiteHero>

      <section id="compare" className="ns-section scroll-mt-24" aria-labelledby="services-compare-title">
        <div className="ns-section-head">
          <div><p className="ns-kicker">Compare</p><h2 id="services-compare-title" className="ns-h2">Which cleaning do you need?</h2></div>
          <Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">→</span></Link>
        </div>
        <div className="service-editorial [&_.se-guide]:gap-6 [&_.se-guide-body_p]:text-base">
          <div className="se-guide">
            {guides.map((guide) => (
              <article key={guide.slug} className="se-guide-card">
                <figure><div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]"><Image src={guide.photo.src} alt={guide.photo.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw" className="object-cover" /></div><figcaption className="mt-2 text-[13px] text-mute">{guide.photo.caption} · New Star job</figcaption></figure>
                <div className="se-guide-body">
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

      <section className="site-muted"><div className="ns-section" aria-labelledby="services-business-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Fresno-area businesses</p><h2 id="services-business-title" className="ns-h2">Workplaces &amp; projects.</h2><p className="ns-lead">A walkthrough or photo review, followed by a written proposal.</p></div></div>
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
      </div></section>
      <div className="bg-white [&_.site-muted]:bg-white"><HowItWorks priceHref="/book-now#price" /></div>
      <section className="site-muted" aria-labelledby="services-reviews-title"><div className="ns-section"><div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="services-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent /></div><ReviewCards reviews={reviews} lead /></div></section>
      <section aria-labelledby="services-areas-title">
        <div className="ns-section">
          <div className="ns-section-head"><div><p className="ns-kicker">Service area</p><h2 id="services-areas-title" className="ns-h2">Near you.</h2><p className="ns-lead">We&apos;re based in Fresno and clean in Clovis too. For Madera, send your address and preferred date so we can check the schedule.</p></div><Link href="/service-areas" className="home-text-link">All service areas <span aria-hidden="true">→</span></Link></div>
          <div className="grid gap-6 sm:grid-cols-3">
            {primaryAreas.map((area) => <Link key={area.slug} href={`/cleaning-services-${area.slug}`} className="flex min-h-20 flex-col justify-center gap-2 border-t border-line py-4 text-primary"><strong className="text-xl">{area.name} →</strong><span className="text-sm text-mute">{area.county}</span></Link>)}
          </div>
        </div>
      </section>

      <section className="site-muted"><div className="site-section site-split"><h2>See your price.</h2><div><p className="site-intro">Pick the cleaning and your home size, then book a time online.</p><div className="site-actions"><HomeBookingLink placement="footer" /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div></div></div></section>
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "Services", url: `${siteUrl}/services` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning services",
        itemListElement: serviceSchemaItems.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: `${siteUrl}${service.href}` })),
      }) }} />
    </div>
  );
}

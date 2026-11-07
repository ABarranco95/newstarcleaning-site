import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHero from "@/components/SiteHero";
import Image from "next/image";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import { business } from "@/lib/business";
import { servicePresentation } from "@/lib/servicePresentation";
import ServiceProof from "@/components/ServiceProof";
import "@/components/service-editorial.css";
import { serviceAreas } from "@/lib/serviceAreas";
import { services, getFullIncludedList, type ServiceDefinition } from "@/lib/services";
import { sanJoseServiceContent } from "@/lib/southBayServiceAreas";
import MarketPriceExample from "@/components/MarketPriceExample";
import MarketPhone from "@/components/MarketPhone";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import TrustStrip from "@/components/TrustStrip";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const COMBO_CITY_SLUGS = [
  "fresno",
  "clovis",
  "madera",
  "tower-district",
  "fig-garden",
  "woodward-park",
  "san-jose",
] as const;

interface RouteParams {
  params: Promise<{ serviceCity: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { serviceCity: string }[] = [];
  for (const service of services) {
    for (const city of COMBO_CITY_SLUGS) {
      params.push({ serviceCity: `${service.slug}-${city}` });
    }
  }
  return params;
}

interface ParsedSlug {
  service: ServiceDefinition;
  citySlug: string;
  cityName: string;
}

function parseSlug(slug: string): ParsedSlug | null {
  for (const service of services) {
    const prefix = `${service.slug}-`;
    if (!slug.startsWith(prefix)) continue;
    const citySlug = slug.slice(prefix.length);
    if (!(COMBO_CITY_SLUGS as readonly string[]).includes(citySlug)) {
      continue;
    }
    const area = serviceAreas.find((a) => a.slug === citySlug);
    const cityName =
      area?.name ??
      citySlug
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
    return { service, citySlug, cityName };
  }
  return null;
}

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning"
    ? "Standard recurring cleaning"
    : service.shortName;
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { serviceCity } = await params;
  const parsed = parseSlug(serviceCity);
  if (!parsed) return {};

  const { service, cityName, citySlug } = parsed;
  const local = citySlug === "san-jose" ? sanJoseServiceContent[service.slug] : null;
  const title = local?.title || `${service.shortName} in ${cityName}, CA`;
  const description = local?.description || `Professional ${service.shortName.toLowerCase()} in ${cityName}, CA. Review included work, optional additions, and request pricing online.`;

  return {
    title,
    description,
    robots: { index: citySlug === "san-jose", follow: true },
    alternates: { canonical: `/${serviceCity}` },
    openGraph: {
      title,
      description,
      url: `https://newstarcleaning.com/${serviceCity}`,
    },
    ...(local ? { twitter: { title, description } } : {}),
  };
}

export default async function ServiceCityPage({ params }: RouteParams) {
  const { serviceCity } = await params;
  const parsed = parseSlug(serviceCity);
  if (!parsed) notFound();
  const { service, citySlug, cityName } = parsed;
  const area = serviceAreas.find((item) => item.slug === citySlug);
  const market = area?.market || "fresno";
  const local = citySlug === "san-jose" ? sanJoseServiceContent[service.slug] : null;
  const directBookingUrl = resolveDirectBookingUrl();
  const presentation = servicePresentation[service.slug];
  const quoteHref = `/book-now?${new URLSearchParams({ service: quoteFormService(service), city: cityName })}`;

  const drawing = service.slug === "standard-cleaning" ? "regular" : service.slug === "deep-cleaning" ? "deep" : "empty-home";
  return (
    <div className="site-reference">
      <SiteHero title={local?.h1 || `${service.shortName} in ${cityName}, CA`} description={local?.intro || presentation.summary} photo={presentation.photo} tone="dark" breadcrumbs={[{label: "Home", href: "/"}, {label: local ? "San Jose cleaning" : service.shortName, href: local ? "/cleaning-services-san-jose" : `/services/${service.slug}?city=${encodeURIComponent(cityName)}`}]}>
        <p className="site-price">{local ? "See your price before you book." : "Price confirmed before anything is booked."}</p>
        <div className="site-actions">{local && directBookingUrl ? <Suspense fallback={null}><BookingPortalLink baseUrl={directBookingUrl} market="southbay" service={quoteFormService(service)} city="San Jose" sourcePage={`/${serviceCity}`} ctaLocation="service_city_hero" label="See your price and book" showIcon={false} className="home-button" /></Suspense> : <Suspense fallback={<Link href={quoteHref} className="home-button">Get a quote ↗</Link>}><HomeQuoteLink className="home-button">Get a quote ↗</HomeQuoteLink></Suspense>}{local ? <a href="#quote" className="home-text-link">Rather get a quote by text?</a> : <a href={business.phoneHref} className="home-text-link">Call us</a>}</div><div className="site-proof-row"><GoogleRating /></div>{local ? <MarketPhone market={market} className="home-text-link" /> : null}
      </SiteHero>
      {local ? <section className="site-section site-split site-rule"><div className="site-copy"><h2>{local.localHeading}</h2><div className="space-y-5">{local.local.split("\n\n").map((paragraph) => <p key={paragraph} className="site-intro">{paragraph}</p>)}</div><p className="site-note">Tell us within 24 hours if something on your checklist was missed and we come back at no charge.</p><nav className="site-links" aria-label="San Jose cleaning services">{services.filter((item) => item.slug !== service.slug).map((item) => <Link key={item.slug} href={`/${item.slug}-san-jose`} className="home-text-link">{item.shortName} in San Jose →</Link>)}</nav></div><MarketPriceExample market="southbay" service={quoteFormService(service)} /></section> : null}
      <section className="site-section site-rule"><div className="home-section-heading"><h2>Our {service.shortName.toLowerCase()} work.</h2><Link href="/our-work" className="home-text-link">More of our work ↗</Link></div>{local ? <p className="site-note">Photos are from New Star jobs in the Central Valley.</p> : null}<div className="service-editorial"><ServiceProof service={service} /></div></section>
      <section id="whats-included" className="site-section site-split site-rule"><div><h2>What’s included.</h2><p className="site-intro">{presentation.boundary}</p><p className="site-note">Your quote depends on size, condition, and requested work. Laundry, dishes, bed making, organizing, packing, and personal household tasks are not included.</p><div className="site-scope-visual"><Image src={`/illustrations/cleaning-${drawing}.svg`} alt="" width={360} height={260} /></div></div><div className="site-disclosures">
        {getFullIncludedList(service.slug).map((group) => <details key={group.title} open={local ? true : undefined}><summary>{group.title}</summary><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></details>)}
        <details><summary>Available add-ons</summary><dl>{service.availableAddOns.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl></details>
        <details><summary>Not included</summary><ul>{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></details>
      </div></section>
      {area && <section className="site-muted"><div className="site-section site-split"><h2>Planning a visit in {cityName}.</h2><div><p className="site-intro">{area.bookingNote}</p><p className="site-note">Areas include {area.neighborhoods.slice(0,3).join(", ")}. Ask us about your address.</p><div className="site-links"><Link href={`/services/${service.slug}?city=${encodeURIComponent(cityName)}`}>Full service details</Link><Link href={`/cleaning-services-${citySlug}?service=${service.slug}`}>All {cityName} services</Link><Link href="/checklist">Service checklist</Link></div><Suspense fallback={<Link href={quoteHref} className="home-text-link">Request your {cityName} quote ↗</Link>}><HomeQuoteLink className="home-text-link">Request your {cityName} quote ↗</HomeQuoteLink></Suspense></div></div></section>}
      {local ? <>
        <section className="site-section site-split site-rule"><h2>Before your San Jose clean.</h2><div className="site-disclosures">{local.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
        <section className="site-muted"><div className="site-section site-quote-layout"><div className="site-copy"><h2>Tell us about your San Jose home.</h2><p className="site-intro">{local.quoteIntro}</p></div><QuickQuoteForm defaultCity="San Jose" landingCity="San Jose" defaultService={quoteFormService(service)} pageMarket="southbay" source={`organic_${service.slug}_san-jose`} directBookingUrl={directBookingUrl} compact /></div></section>
        <TrustStrip market="southbay" />
        <BreadcrumbSchema items={[{ name: "Home", url: business.siteUrl }, { name: "San Jose house cleaning", url: `${business.siteUrl}/cleaning-services-san-jose` }, { name: local.h1, url: `${business.siteUrl}/${serviceCity}` }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: local.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />
      </> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: `${service.name} in ${cityName}, CA`,
        serviceType: service.schemaServiceType, description: `${service.description} Available across ${cityName}, CA.`,
        provider: local ? { "@id": "https://newstarcleaning.com/#localbusiness-southbay" } : { "@type": "LocalBusiness", name: "New Star Cleaning", address: { "@type": "PostalAddress", addressLocality: "Fresno", addressRegion: "CA", addressCountry: "US" } },
        areaServed: { "@type": "City", name: cityName, addressRegion: "CA" },
      }) }} />
    </div>
  );
}

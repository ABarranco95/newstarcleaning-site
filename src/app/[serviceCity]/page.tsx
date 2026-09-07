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
import { serviceAreas } from "@/lib/serviceAreas";
import { services, getFullIncludedList, type ServiceDefinition } from "@/lib/services";

const COMBO_CITY_SLUGS = [
  "fresno",
  "clovis",
  "madera",
  "tower-district",
  "fig-garden",
  "woodward-park",
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

  const { service, cityName } = parsed;
  const title = `${service.shortName} in ${cityName}, CA`;
  const description = `Professional ${service.shortName.toLowerCase()} in ${cityName}, CA. Review included work, optional additions, and request pricing online.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${serviceCity}` },
    openGraph: {
      title,
      description,
      url: `https://newstarcleaning.com/${serviceCity}`,
    },
  };
}

export default async function ServiceCityPage({ params }: RouteParams) {
  const { serviceCity } = await params;
  const parsed = parseSlug(serviceCity);
  if (!parsed) notFound();
  const { service, citySlug, cityName } = parsed;
  const area = serviceAreas.find((item) => item.slug === citySlug);
  const presentation = servicePresentation[service.slug];
  const quoteHref = `/book-now?${new URLSearchParams({ service: quoteFormService(service), city: cityName })}`;

  const drawing = service.slug === "standard-cleaning" ? "regular" : service.slug === "deep-cleaning" ? "deep" : "empty-home";
  return (
    <div className="site-reference">
      <SiteHero title={`${service.shortName} in ${cityName}, CA`} description={presentation.summary} photo={presentation.photo} breadcrumbs={[{label: "Home", href: "/"}, {label: service.shortName, href: `/services/${service.slug}?city=${encodeURIComponent(cityName)}`}]}>
        <p className="site-price">From <strong>{presentation.startingPrice}</strong> · Final price confirmed before booking.</p>
        <div className="site-actions"><Suspense fallback={<Link href={quoteHref} className="home-button">Request a quote ↗</Link>}><HomeQuoteLink className="home-button">Request a quote ↗</HomeQuoteLink></Suspense><a href={business.phoneHref} className="home-text-link">Call us</a></div><div className="site-proof-row"><GoogleRating /></div>
      </SiteHero>
      <section id="whats-included" className="site-section site-split site-rule"><div><h2>What’s included.</h2><p className="site-intro">{presentation.boundary}</p><p className="site-note">Your quote depends on size, condition, and requested work. Laundry, dishes, bed making, organizing, packing, and personal household tasks are not included.</p><div className="site-scope-visual"><Image src={`/illustrations/cleaning-${drawing}.svg`} alt="" width={360} height={260} /></div></div><div className="site-disclosures">
        {getFullIncludedList(service.slug).map((group) => <details key={group.title}><summary>{group.title}</summary><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></details>)}
        <details><summary>Available add-ons</summary><dl>{service.availableAddOns.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl></details>
        <details><summary>Not included</summary><ul>{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></details>
      </div></section>
      {area && <section className="site-muted"><div className="site-section site-split"><h2>Planning a visit in {cityName}.</h2><div><p className="site-intro">{area.bookingNote}</p><p className="site-note">Areas include {area.neighborhoods.slice(0,3).join(", ")}. Ask us about your address.</p><div className="site-links"><Link href={`/services/${service.slug}?city=${encodeURIComponent(cityName)}`}>Full service details</Link><Link href={`/cleaning-services-${citySlug}?service=${service.slug}`}>All {cityName} services</Link><Link href="/checklist">Service checklist</Link></div><Suspense fallback={<Link href={quoteHref} className="home-text-link">Request your {cityName} quote ↗</Link>}><HomeQuoteLink className="home-text-link">Request your {cityName} quote ↗</HomeQuoteLink></Suspense></div></div></section>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: `${service.name} in ${cityName}, CA`,
        serviceType: service.schemaServiceType, description: `${service.description} Available across ${cityName}, CA.`,
        provider: { "@type": "LocalBusiness", name: "New Star Cleaning", address: { "@type": "PostalAddress", addressLocality: "Fresno", addressRegion: "CA", addressCountry: "US" } },
        areaServed: { "@type": "City", name: cityName, addressRegion: "CA" },
      }) }} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHero from "@/components/SiteHero";
import HowItWorks from "@/components/HowItWorks";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import { googleReviews } from "@/lib/googleReviews";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import { servicePresentation } from "@/lib/servicePresentation";
import ServiceProof from "@/components/ServiceProof";

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
    : service.slug === "deep-cleaning" ? "Deep cleaning" : "Move-in / move-out cleaning";
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

  const isStandard = service.slug === "standard-cleaning";
  const isMove = service.slug === "move-out-cleaning";
  const reviewIds = isStandard ? ["daumdatta", "daisy-m", "nicholas-m"] : isMove ? ["merle-f", "daumdatta", "joel-s"] : ["daumdatta", "joel-s", "merle-f"];
  const reviews = reviewIds.map((id) => googleReviews.find((review) => review.id === id)!);
  return (
    <div className="site-reference">
      <SiteHero title={`${service.shortName} in ${cityName}, CA`} description={presentation.summary} photo={presentation.photo} proof={<ProofRow tone="dark" />} breadcrumbs={[{label: "Home", href: "/"}, {label: service.shortName, href: `/services/${service.slug}?city=${encodeURIComponent(cityName)}`}]}>
        <PricePicker id="price" service={quoteFormService(service)} source={`organic_${service.slug}_${citySlug}_price`} leadSource={`organic_${service.slug}_${citySlug}`} defaultCity={cityName} quoteHref={quoteHref} />
      </SiteHero>
      <section id="whats-included" className="site-section scroll-mt-24" aria-labelledby="combo-included-title">
        <div className="ns-section-head"><div><p className="ns-kicker">What&apos;s included</p><h2 id="combo-included-title">What’s included.</h2></div></div>
        <p className="site-intro">{presentation.boundary}</p><p className="site-note">Your quote depends on size, condition, and requested work. Laundry, dishes, bed making, organizing, packing, and personal household tasks are not included.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div><h3>Included, room by room:</h3><div className="mt-6 grid gap-6 sm:grid-cols-2">{getFullIncludedList(service.slug).map((group) => <div key={group.title} className="rounded-[var(--radius-card)] border border-line p-6 last:sm:col-span-2"><h4 className="text-lg font-bold text-primary">{group.title}</h4><ul className="site-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div>
          <div className="space-y-8"><section><h3>Available add-ons</h3><dl className="mt-4 space-y-4">{service.availableAddOns.map((item) => <div key={item.title}><dt className="font-semibold">{item.title}</dt><dd className="mt-2 leading-relaxed">{item.description}</dd></div>)}</dl></section><section className="rounded-[var(--radius-card)] bg-cream-2 p-6"><h3>Not included</h3><ul className="site-list">{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></section><Link href="/checklist" className="home-text-link">See the full checklist →</Link></div>
        </div>
      </section>
      <section className="site-muted"><div className="site-section"><div className="ns-section-head"><div><p className="ns-kicker">{isStandard ? "Our work" : "Real jobs"}</p><h2>Our {service.shortName.toLowerCase()} work.</h2></div><Link href="/our-work" className="home-text-link">More of our work ↗</Link></div><ServiceProof service={service} />{isMove ? <p className="site-note">Inside the fridge and oven are add-ons. Pick them when you book and they&apos;re in your price.</p> : null}</div></section><div className="bg-white [&_.site-muted]:bg-white"><HowItWorks /></div>
      <section className="site-muted"><div className="ns-section"><div className="ns-section-head"><h2 className="ns-h2">What customers say.</h2><GoogleRating prominent /></div><ReviewCards reviews={reviews} lead /></div></section>
      {area ? <section className="site-section site-split"><h2>Planning a visit in {cityName}.</h2><div><p className="site-intro">{area.bookingNote}</p><p className="site-note">Areas include {area.neighborhoods.slice(0,3).join(", ")}. Ask us about your address.</p><div className="site-links"><Link href={`/services/${service.slug}?city=${encodeURIComponent(cityName)}`}>Full service details</Link><Link href={`/cleaning-services-${citySlug}?service=${service.slug}`}>All {cityName} services</Link><Link href="/checklist">Service checklist</Link></div><Suspense fallback={<Link href={quoteHref} className="home-text-link">Request your {cityName} quote ↗</Link>}><HomeQuoteLink className="home-text-link">Request your {cityName} quote ↗</HomeQuoteLink></Suspense></div></section> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: `${service.name} in ${cityName}, CA`,
        serviceType: service.schemaServiceType, description: `${service.description} Available across ${cityName}, CA.`,
        provider: { "@id": "https://newstarcleaning.com/#localbusiness" },
        areaServed: { "@type": "City", name: cityName, addressRegion: "CA" },
      }) }} />
    </div>
  );
}

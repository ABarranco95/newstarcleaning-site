import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHero from "@/components/SiteHero";
import CityLinks from "@/components/CityLinks";
import FaqList from "@/components/FaqList";
import HowItWorks from "@/components/HowItWorks";
import LocalNotes from "@/components/LocalNotes";
import PriceCtaBand from "@/components/PriceCtaBand";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import TrustStrip from "@/components/TrustStrip";
import { googleReviews } from "@/lib/googleReviews";
import { bathroomResultPhotos, pickUnusedPhoto } from "@/lib/realWorkPhotos";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import GoogleRating from "@/components/GoogleRating";
import { business } from "@/lib/business";
import { servicePresentation } from "@/lib/servicePresentation";
import ServiceProof from "@/components/ServiceProof";

import { serviceAreas } from "@/lib/serviceAreas";
import { services, getFullIncludedList, type ServiceDefinition } from "@/lib/services";
import { sanJoseServiceContent } from "@/lib/southBayServiceAreas";

import { MarketCallOrText } from "@/components/MarketPhone";
import QuickQuoteForm from "@/components/QuickQuoteForm";

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
    : service.slug === "deep-cleaning" ? "Deep cleaning" : "Move-in / move-out cleaning";
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

  const isStandard = service.slug === "standard-cleaning";
  const isMove = service.slug === "move-out-cleaning";
  const proofTitle = isStandard ? "Rooms we've cleaned." : isMove ? "Move-out add-ons, before and after." : "Deep cleaning, before and after.";
  const reviewIds = isStandard ? ["daumdatta", "daisy-m", "nicholas-m"] : isMove ? ["merle-f", "daumdatta", "joel-s"] : ["daumdatta", "joel-s", "merle-f"];
  const reviews = reviewIds.map((id) => googleReviews.find((review) => review.id === id)!);
  const related = services.filter((item) => item.slug !== service.slug);
  const crossLinkName = isStandard ? "Regular house cleaning" : isMove ? "Move-out cleaning" : "Deep cleaning";
  const bandPhoto = pickUnusedPhoto([bathroomResultPhotos[0], bathroomResultPhotos[1]], [presentation.photo, ...(isStandard ? presentation.proofPhotos : [])]);
  return (
    <div className="site-reference">
      <SiteHero title={local?.h1 || `${service.shortName} in ${cityName}, CA`} description={local?.intro || presentation.summary} photo={presentation.photo} market={market} proof={<ProofRow market={market} tone="dark" />} breadcrumbs={[{label: "Home", href: "/"}, {label: local ? "San Jose cleaning" : service.shortName, href: local ? "/cleaning-services-san-jose" : `/services/${service.slug}?city=${encodeURIComponent(cityName)}`}]}>
        <PricePicker id="price" service={quoteFormService(service)} source={`organic_${service.slug}_${citySlug}_price`} leadSource={`organic_${service.slug}_${citySlug}`} defaultCity={cityName} market={market} quoteHref={local ? "#quote" : quoteHref} />
      </SiteHero>
      {local ? <>
        <section className="site-muted"><div className="site-section"><div className="ns-section-head"><h2>{proofTitle}</h2></div><ServiceProof service={service} market={market} /></div></section>
        <section id="whats-included" className="site-section scroll-mt-24" aria-labelledby="combo-included-title">
          <div className="ns-section-head"><h2 id="combo-included-title">{local.localHeading}</h2></div><p className="site-intro">{local.lead}</p>
          <div className="site-room-grid">{getFullIncludedList(service.slug).map((group) => <div key={group.title} className="site-room-card"><h3>{group.title}</h3><ul className="site-list">{group.items.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>{group.items.length > 5 ? <div className="site-disclosures"><details><summary>Show {group.items.length - 5} more</summary><ul>{group.items.slice(5).map((item) => <li key={item}>{item}</li>)}</ul></details></div> : null}</div>)}</div>
          <div className="site-scope-disclosures"><div className="site-disclosures"><details><summary>Add-ons you can pick when you book</summary><dl>{service.availableAddOns.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl></details></div><div className="site-disclosures"><details><summary>Not included</summary><ul>{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></details></div></div>
          <Link href="/checklist" className="home-text-link mt-4">See the full checklist →</Link>
        </section>
        <TrustStrip market={market} />
      </> : <section id="whats-included" className="site-section scroll-mt-24" aria-labelledby="combo-included-title">
        <div className="ns-section-head"><div><p className="ns-kicker">What&apos;s included</p><h2 id="combo-included-title">What’s included.</h2></div></div>
        <p className="site-intro">{presentation.boundary}</p><p className="site-note">Your quote depends on size, condition, and requested work. Laundry, dishes, bed making, organizing, packing, and personal household tasks are not included.</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          <div><h3>Included, room by room:</h3><div className="mt-6 grid gap-6 sm:grid-cols-2">{getFullIncludedList(service.slug).map((group) => <div key={group.title} className="rounded-[var(--radius-card)] border border-line p-6 last:sm:col-span-2"><h4 className="text-lg font-bold text-primary">{group.title}</h4><ul className="site-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div></div>
          <div className="space-y-8"><section><h3>Available add-ons</h3><dl className="mt-4 space-y-4">{service.availableAddOns.map((item) => <div key={item.title}><dt className="font-semibold">{item.title}</dt><dd className="mt-2 leading-relaxed">{item.description}</dd></div>)}</dl></section><section className="rounded-[var(--radius-card)] bg-cream-2 p-6"><h3>Not included</h3><ul className="site-list">{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></section><Link href="/checklist" className="home-text-link">See the full checklist →</Link></div>
        </div>
      </section>}
      {!local ? <><section className="site-muted"><div className="site-section"><div className="ns-section-head"><div><p className="ns-kicker">{isStandard ? "Our work" : "Real jobs"}</p><h2>Our {service.shortName.toLowerCase()} work.</h2></div><Link href="/our-work" className="home-text-link">More of our work ↗</Link></div><ServiceProof service={service} market={market} />{isMove ? <p className="site-note">Inside the fridge and oven are add-ons. Pick them when you book and they&apos;re in your price.</p> : null}</div></section><div className="bg-white [&_.site-muted]:bg-white"><HowItWorks /></div></> : null}
      <section className={local ? undefined : "site-muted"}><div className="ns-section"><div className="ns-section-head"><h2 className="ns-h2">What customers say.</h2><GoogleRating prominent market={market} /></div><ReviewCards reviews={reviews} market={market} lead /></div></section>
      {local ? <><HowItWorks market={market} actions={false} /><PriceCtaBand photo={bandPhoto} line="Pick the cleaning and put in your ZIP. You'll see your price before anything is booked." market={market} phoneLocation="service_city_price_band" /></> : null}
      {area && !local ? <section className="site-section site-split"><h2>Planning a visit in {cityName}.</h2><div><p className="site-intro">{area.bookingNote}</p><p className="site-note">Areas include {area.neighborhoods.slice(0,3).join(", ")}. Ask us about your address.</p><div className="site-links"><Link href={`/services/${service.slug}?city=${encodeURIComponent(cityName)}`}>Full service details</Link><Link href={`/cleaning-services-${citySlug}?service=${service.slug}`}>All {cityName} services</Link><Link href="/checklist">Service checklist</Link></div><Suspense fallback={<Link href={quoteHref} className="home-text-link">Request your {cityName} quote ↗</Link>}><HomeQuoteLink className="home-text-link">Request your {cityName} quote ↗</HomeQuoteLink></Suspense></div></section> : null}
      {local ? <>
        <section className="site-section site-split"><h2>Before your San Jose clean.</h2><div><FaqList faqs={local.faqs} /><LocalNotes title={`More about ${crossLinkName.toLowerCase()} in San Jose.`} notes={[{ summary: `${crossLinkName} for San Jose homes`, children: local.local.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>) }]} /></div></section>
        <section className="site-muted"><div className="site-section"><div className="ns-section-head"><h2>Other cleanings in San Jose.</h2></div><nav className="site-links" aria-label="Related cleaning services">{related.map((item) => <Link key={item.slug} href={`/${item.slug}-san-jose`} className="home-text-link">{item.slug === "standard-cleaning" ? "Regular house cleaning" : item.slug === "deep-cleaning" ? "Deep cleaning" : "Move-out cleaning"} in San Jose →</Link>)}<Link href="/cleaning-services-san-jose" className="home-text-link">All cleaning in San Jose →</Link></nav><div className="mt-8"><CityLinks omit="san-jose" /></div></div></section>
        <section><div className="site-section site-quote-layout"><div className="site-copy"><p className="ns-kicker">Your price</p><h2>See your price. We&apos;ll text you the rest.</h2><p className="site-intro">Put in your ZIP and the price shows here. Send it to yourself and we&apos;ll confirm the exact number and the days we have open. If the house needs more than a standard visit, we&apos;ll say so up front.</p><p className="site-note"><MarketCallOrText prefix="Or " market={market} location="service_city_quote" />. Mon–Fri 8–6, Sat 8–5.</p></div><QuickQuoteForm defaultCity="San Jose" landingCity="San Jose" defaultService={quoteFormService(service)} pageMarket="southbay" source={`organic_${service.slug}_san-jose`} directBookingUrl={directBookingUrl} compact /></div></section>
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

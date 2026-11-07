import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BookingPortalLink from "@/components/BookingPortalLink";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GoogleRating from "@/components/GoogleRating";
import MarketPhone from "@/components/MarketPhone";
import MarketPriceExample from "@/components/MarketPriceExample";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import SiteHero from "@/components/SiteHero";
import TrustStrip from "@/components/TrustStrip";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { homeResultPhotos } from "@/lib/realWorkPhotos";
import { sanJoseNeighborhoods } from "@/lib/sanJoseNeighborhoods";

interface RouteProps {
  params: Promise<{ neighborhood: string }>;
}

const siteUrl = "https://newstarcleaning.com";
export const dynamicParams = false;

export function generateStaticParams() {
  return sanJoseNeighborhoods.map(({ slug }) => ({ neighborhood: slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { neighborhood: slug } = await params;
  const neighborhood = sanJoseNeighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) return {};
  const path = `/cleaning-services-san-jose/${slug}`;
  return {
    title: neighborhood.title,
    description: neighborhood.description,
    alternates: { canonical: path },
    openGraph: { title: `${neighborhood.title} | New Star Cleaning`, description: neighborhood.description, url: `${siteUrl}${path}` },
    twitter: { title: `${neighborhood.title} | New Star Cleaning`, description: neighborhood.description },
  };
}

export default async function SanJoseNeighborhoodPage({ params }: RouteProps) {
  const { neighborhood: slug } = await params;
  const neighborhood = sanJoseNeighborhoods.find((item) => item.slug === slug);
  if (!neighborhood) notFound();
  const path = `/cleaning-services-san-jose/${slug}`;
  const directBookingUrl = resolveDirectBookingUrl();

  return (
    <div className="site-reference">
      <SiteHero title={`House cleaning in ${neighborhood.name}.`} eyebrow={`San Jose · ${neighborhood.zipLabels.join(" · ")}`} description={neighborhood.description} photo={homeResultPhotos[0]} breadcrumbs={[{ label: "Home", href: "/" }, { label: "San Jose cleaning", href: "/cleaning-services-san-jose" }]}>
        <p className="site-price">See your price before you book. No walkthrough needed.</p>
        <div className="site-booking-actions">
          {directBookingUrl ? <Suspense fallback={null}><BookingPortalLink baseUrl={directBookingUrl} market="southbay" city="San Jose" sourcePage={path} ctaLocation="neighborhood_hero" label="See your price and book" showIcon={false} className="home-button" /></Suspense> : <a href="#quote" className="home-button">Get a quote</a>}
          <a href="#quote" className="home-text-link">Rather get a quote by text?</a>
        </div>
        <MarketPhone market="southbay" className="home-text-link" location="neighborhood_hero" />
        <p className="site-note">Photos from New Star jobs in the Central Valley.</p>
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="neighborhood-home-title">
        <div className="site-copy"><p className="ns-kicker">Your home</p><h2 id="neighborhood-home-title">Cleaning {neighborhood.slug === "almaden-valley" ? "an" : "a"} {neighborhood.name} home.</h2></div>
        <div className="space-y-5">{neighborhood.intro.map((paragraph) => <p key={paragraph} className="site-intro">{paragraph}</p>)}</div>
      </section>

      <section className="site-section site-split site-rule" aria-labelledby="neighborhood-price-title">
        <div className="site-copy"><p className="ns-kicker">Pricing</p><h2 id="neighborhood-price-title">What a 3 bed, 2 bath costs.</h2><p className="site-intro">The example is a 3 bed, 2 bath, 1,430 sq ft home in normal condition, one visit, no add-ons. Put in your ZIP and your home&apos;s details for your own price.</p><p className="site-note">Tell us within 24 hours if something on your checklist was missed and we come back at no charge.</p></div>
        <MarketPriceExample market="southbay" />
      </section>

      <section className="site-section site-rule" aria-labelledby="neighborhood-services-title">
        <p className="ns-kicker">Services</p><h2 id="neighborhood-services-title">Pick the cleaning that fits.</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">{neighborhood.serviceNotes.map((service) => <article key={service.slug} className="min-w-0 border-t border-line pt-5"><h3 className="text-xl font-semibold text-primary">{service.title}</h3><p className="mt-4 text-base leading-7 text-ink-soft">{service.body}</p><Link href={`/${service.slug}-san-jose#whats-included`} className="home-text-link mt-4">Full room-by-room scope →</Link></article>)}</div>
      </section>

      <section className="site-muted" aria-labelledby="neighborhood-plan-title"><div className="site-section site-split"><div className="site-copy"><p className="ns-kicker">Before the visit</p><h2 id="neighborhood-plan-title">A little planning helps.</h2></div><dl className="space-y-7">{neighborhood.planning.map((item) => <div key={item.title}><dt className="text-lg font-semibold text-primary">{item.title}</dt><dd className="mt-2 text-base leading-7 text-ink-soft">{item.body}</dd></div>)}</dl></div></section>

      <section className="site-section site-split site-rule" aria-labelledby="neighborhood-faq-title"><div className="site-copy"><h2 id="neighborhood-faq-title">Before your {neighborhood.name} clean.</h2><div className="site-proof-row"><GoogleRating /></div><p className="site-note">Our Google reviews are from Central Valley customers. San Jose is our newest area.</p></div><div className="site-disclosures">{neighborhood.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>

      <section className="site-muted"><div className="site-section site-quote-layout"><div className="site-copy"><p className="ns-kicker">A quote from us</p><h2>Tell us about your {neighborhood.name} home.</h2><p className="site-intro">Put in the property&apos;s ZIP, home size and the date you want. We&apos;ll text or call with your price and open dates.</p><p className="site-note">Insured, and we bring the supplies.</p></div><QuickQuoteForm defaultCity="San Jose" landingCity="San Jose" pageMarket="southbay" source={`organic_san-jose_${slug}`} title={`Get your ${neighborhood.name} price`} directBookingUrl={directBookingUrl} compact /></div></section>

      <nav className="site-section site-links" aria-label="More San Jose cleaning areas"><Link href="/cleaning-services-san-jose" className="home-text-link">All San Jose cleaning →</Link>{sanJoseNeighborhoods.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/cleaning-services-san-jose/${item.slug}`} className="home-text-link">{item.name} →</Link>)}<Link href="/service-areas" className="home-text-link">South Bay cities →</Link></nav>
      <TrustStrip market="southbay" />
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "San Jose house cleaning", url: `${siteUrl}/cleaning-services-san-jose` }, { name: neighborhood.name, url: `${siteUrl}${path}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}${path}#service`, url: `${siteUrl}${path}`, name: `House cleaning in ${neighborhood.name}, San Jose`, description: neighborhood.description, provider: { "@id": `${siteUrl}/#localbusiness-southbay` }, areaServed: { "@type": "Place", name: `${neighborhood.name}, San Jose`, containedInPlace: { "@type": "City", name: "San Jose", addressRegion: "CA" } } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: neighborhood.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />
    </div>
  );
}

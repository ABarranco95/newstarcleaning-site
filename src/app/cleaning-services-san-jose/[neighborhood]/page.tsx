import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GoogleRating from "@/components/GoogleRating";
import MarketPhone from "@/components/MarketPhone";
import FaqList from "@/components/FaqList";
import PhotoStrip from "@/components/PhotoStrip";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import WorkPhoto from "@/components/WorkPhoto";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import SiteHero from "@/components/SiteHero";

import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { bathroomResultPhotos, cleanBathroomPhoto, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, vanityDetailPhoto } from "@/lib/realWorkPhotos";
import { googleReviews } from "@/lib/googleReviews";
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
  const heroPhoto = slug === "cambrian" ? kitchenSurfacesPhoto : slug === "almaden-valley" ? bathroomResultPhotos[1] : homeResultPhotos[2];
  const servicePhotos = [homeResultPhotos[0], cleanBathroomPhoto, emptyHomeResultPhotos[5]];
  const used = [heroPhoto.src, ...servicePhotos.map((photo) => photo.src)];
  const rooms = [homeResultPhotos[0], homeResultPhotos[2], bathroomResultPhotos[1], kitchenSurfacesPhoto, cleanBathroomPhoto, bathroomResultPhotos[0], vanityDetailPhoto].filter((photo) => !used.includes(photo.src)).slice(0, 4);
  const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);
  const h1 = slug === "west-san-jose" ? "House cleaning in West San Jose." : `House cleaning in ${neighborhood.name}, San Jose.`;

  return (
    <div className="site-reference">
      <SiteHero title={h1} eyebrow={`San Jose · ${neighborhood.zipLabels.join(" · ")}`} description={neighborhood.description} photo={heroPhoto} market="southbay" proof={<ProofRow market="southbay" tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }, { label: "San Jose cleaning", href: "/cleaning-services-san-jose" }]}>
        <PricePicker id="price" source={`organic_${slug}_price`} market="southbay" quoteHref="#quote" />
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="neighborhood-home-title">
        <div className="site-copy"><p className="ns-kicker">Your home</p><h2 id="neighborhood-home-title">Cleaning {neighborhood.slug === "almaden-valley" ? "an" : "a"} {neighborhood.name} home.</h2></div>
        <div className="space-y-6">{neighborhood.intro.map((paragraph) => <p key={paragraph} className="leading-relaxed">{paragraph}</p>)}<h3>A little planning helps.</h3><dl className="space-y-6">{neighborhood.planning.map((item) => <div key={item.title}><dt className="text-lg font-bold text-primary">{item.title}</dt><dd className="mt-3 leading-relaxed">{item.body}</dd></div>)}</dl></div>
      </section>

      <section className="site-muted"><div className="site-section" aria-labelledby="neighborhood-services-title">
        <p className="ns-kicker">Services</p><h2 id="neighborhood-services-title">Pick the cleaning that fits.</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">{neighborhood.serviceNotes.map((service, index) => <article key={service.slug} className="flex min-w-0 flex-col rounded-[var(--radius-card)] border border-line bg-white p-6"><WorkPhoto photo={servicePhotos[index]} variant="choice" /><h3 className="mt-6">{service.title}</h3><p className="mt-4 leading-relaxed">{service.body}</p><Link href={`/${service.slug}-san-jose#whats-included`} className="home-text-link mt-auto pt-4">Full room-by-room scope →</Link></article>)}</div><p className="ns-photo-provenance">Photos from New Star jobs in the Central Valley.</p>
      </div></section>
      <section className="ns-section"><div className="ns-section-head"><h2 className="ns-h2">Rooms we&apos;ve cleaned.</h2></div><PhotoStrip photos={rooms} market="southbay" /></section>
      <section className="site-muted"><div className="ns-section"><div className="ns-section-head"><h2 className="ns-h2">What customers say.</h2><GoogleRating prominent market="southbay" /></div><ReviewCards reviews={reviews} market="southbay" lead /></div></section>
      <section className="site-section site-split" aria-labelledby="neighborhood-faq-title"><h2 id="neighborhood-faq-title">Before your {neighborhood.name} clean.</h2><FaqList faqs={neighborhood.faqs} /></section>
      <section className="site-muted"><div className="site-section"><p className="ns-kicker">San Jose</p><h2 className="mt-3">More of San Jose.</h2><nav className="site-links" aria-label="More San Jose cleaning areas"><Link href="/cleaning-services-san-jose">House cleaning in San Jose, CA</Link>{sanJoseNeighborhoods.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/cleaning-services-san-jose/${item.slug}`}>House cleaning in {item.name}</Link>)}<Link href="/service-areas">South Bay cities →</Link></nav></div></section>
      <section><div className="site-section site-quote-layout"><div className="site-copy"><p className="ns-kicker">Quote by text</p><h2>Rather get a quote by text?</h2><p className="site-intro">Send the basics and we&apos;ll text you a price. If the house needs more than a standard visit, we&apos;ll say so up front.</p><p className="site-note">Or call or text <MarketPhone market="southbay" location="neighborhood_quote" />. Mon–Fri 8–6, Sat 8–5.</p></div><QuickQuoteForm defaultCity="San Jose" landingCity="San Jose" pageMarket="southbay" source={`organic_san-jose_${slug}`} title={`Get your ${neighborhood.name} price`} directBookingUrl={directBookingUrl} compact /></div></section>
      <BreadcrumbSchema items={[{ name: "Home", url: siteUrl }, { name: "San Jose house cleaning", url: `${siteUrl}/cleaning-services-san-jose` }, { name: neighborhood.name, url: `${siteUrl}${path}` }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "@id": `${siteUrl}${path}#service`, url: `${siteUrl}${path}`, name: `House cleaning in ${neighborhood.name}, San Jose`, description: neighborhood.description, provider: { "@id": `${siteUrl}/#localbusiness-southbay` }, areaServed: { "@type": "Place", name: `${neighborhood.name}, San Jose`, containedInPlace: { "@type": "City", name: "San Jose", addressRegion: "CA" } } }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: neighborhood.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }) }} />
    </div>
  );
}

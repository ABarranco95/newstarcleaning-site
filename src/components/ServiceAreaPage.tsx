import Link from "next/link";
import { Suspense } from "react";
import BeforeAfterPairs from "@/components/BeforeAfterPairs";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import CityLinks from "@/components/CityLinks";
import FaqList from "@/components/FaqList";
import GoogleRating from "@/components/GoogleRating";
import HomeServices from "@/components/HomeServices";
import HowItWorks from "@/components/HowItWorks";
import MarketPhone from "@/components/MarketPhone";
import PhotoStrip from "@/components/PhotoStrip";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import ReviewCards from "@/components/ReviewCards";
import SiteHero from "@/components/SiteHero";
import TrustStrip from "@/components/TrustStrip";
import type { ServiceArea } from "@/lib/serviceAreas";
import { bathroomResultPhotos, cleanBathroomPhoto, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, vanityDetailPhoto, refrigeratorFullPair, tubSurroundPair, ventDetailPair, type RealWorkPhoto } from "@/lib/realWorkPhotos";
import { googleReviews } from "@/lib/googleReviews";
import { sanJoseNeighborhoods } from "@/lib/sanJoseNeighborhoods";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const siteUrl = "https://newstarcleaning.com";
const areaHeroPhotos: Record<string, RealWorkPhoto> = {
  fresno: homeResultPhotos[0],
  clovis: bathroomResultPhotos[1],
  madera: cleanBathroomPhoto,
  "tower-district": homeResultPhotos[2],
  "fig-garden": kitchenSurfacesPhoto,
  "woodward-park": bathroomResultPhotos[0],
  "san-jose": homeResultPhotos[0],
  cupertino: homeResultPhotos[2],
  "santa-clara": bathroomResultPhotos[1],
  sunnyvale: kitchenSurfacesPhoto,
  campbell: cleanBathroomPhoto,
  saratoga: bathroomResultPhotos[0],
  "los-gatos": homeResultPhotos[0],
};
const roomCandidates = [homeResultPhotos[0], homeResultPhotos[2], bathroomResultPhotos[1], kitchenSurfacesPhoto, cleanBathroomPhoto, bathroomResultPhotos[0], vanityDetailPhoto];
const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const directBookingUrl = resolveDirectBookingUrl();
  const isSouthBay = area.market === "southbay";
  const isHub = area.slug === "san-jose";
  const heroPhoto = areaHeroPhotos[area.slug] ?? homeResultPhotos[0];
  const usedPhotos = [heroPhoto.src, heroPhoto.src === homeResultPhotos[0].src ? homeResultPhotos[2].src : homeResultPhotos[0].src, heroPhoto.src === cleanBathroomPhoto.src ? bathroomResultPhotos[1].src : cleanBathroomPhoto.src, emptyHomeResultPhotos[5].src];
  const rooms = roomCandidates.filter((photo) => !usedPhotos.includes(photo.src)).slice(0, 4);
  const areaFaqs = area.faqs || [
    { question: `Do you provide house cleaning in ${area.name}, CA?`, answer: `Yes. New Star Cleaning serves ${area.name}, CA with standard recurring cleaning, deep cleaning, and move-in/move-out cleaning. ${area.localProof}` },
    { question: `Which ${area.name} neighborhoods do you serve?`, answer: `We serve ${area.neighborhoods.slice(0, 4).join(", ")} and nearby parts of ${area.county}. If your exact neighborhood is not listed, request a quote and we will confirm route availability.` },
    { question: `What cleaning services are available in ${area.name}?`, answer: `${area.name} clients can request recurring standard cleaning, one-time deep cleaning, and move-in/move-out cleaning. Common local requests include ${area.commonJobs.slice(0, 2).join(" and ")}.` },
    { question: `How quickly can I book a cleaner in ${area.name}?`, answer: area.bookingNote },
  ];

  return (
    <div className="site-reference">
      <SiteHero title={`House cleaning in ${area.name}, CA.`} description={area.description} photo={heroPhoto} market={area.market} proof={<ProofRow market={area.market} tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }]}>
        <PricePicker id="price" source={`organic_${area.slug}_price`} market={area.market} quoteHref="#quote" />
      </SiteHero>

      <section className="ns-section" aria-labelledby="area-results-title"><div className="ns-section-head"><div><p className="ns-kicker">Real jobs</p><h2 id="area-results-title" className="ns-h2">Before and after, from real New Star jobs.</h2></div><Link href="/our-work" className="home-text-link">See all of our work <span aria-hidden="true">→</span></Link></div><BeforeAfterPairs pairs={[ventDetailPair, tubSurroundPair, refrigeratorFullPair]} market={area.market} /></section>

      <TrustStrip market={area.market} />

      <section className="site-section" aria-labelledby="area-services-title">
        <div className="ns-section-head"><div><p className="ns-kicker">Services</p><h2 id="area-services-title" className="ns-h2">Which cleaning do you need?</h2></div><Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">→</span></Link></div>
        <Suspense fallback={null}><HomeServices defaultCity={area.name} market={area.market} excludePhoto={heroPhoto.src} /></Suspense>
        <p className="home-service-notes">Oven and fridge interiors, interior window glass, and cabinet interiors on standard or deep cleans are optional add-ons. Move-in / move-out includes empty cabinet, drawer, and closet interiors.</p>
        {area.serviceDetails && !isHub ? <div className="site-service-details">
          <section id="deep-cleaning" aria-labelledby="area-deep-title"><h3 id="area-deep-title">Deep cleaning in {area.name}</h3><p>{area.serviceDetails.deep}</p><Link href={isSouthBay ? "/deep-cleaning-san-jose" : "/services/deep-cleaning"} className="home-text-link">See the full deep-cleaning scope <span aria-hidden="true">→</span></Link></section>
          <section id="move-out-cleaning" aria-labelledby="area-move-title"><h3 id="area-move-title">Move-out and move-in cleaning in {area.name}</h3><p>{area.serviceDetails.move}</p><Link href={isSouthBay ? "/move-out-cleaning-san-jose" : "/services/move-out-cleaning"} className="home-text-link">See the full move-in/move-out scope <span aria-hidden="true">→</span></Link></section>
        </div> : null}
      </section>

      <section aria-labelledby="area-local-title"><div className="site-section">
        <div className="ns-section-head"><div><p className="ns-kicker">{area.name} homes</p><h2 id="area-local-title" className="ns-h2">{isSouthBay ? `What we plan for in ${area.name}.` : `Cleaning for ${area.name} homes.`}</h2></div></div>
        <div className="site-area-prose">{isSouthBay ? area.localContent.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{area.localContent}</p>}</div>
        {!isSouthBay ? <><h3 className="mt-8">{area.name} neighborhoods we serve</h3><div className="site-area-chips">{area.neighborhoods.map((neighborhood) => <span key={neighborhood}>{neighborhood}</span>)}</div><p className="site-note">When the address fits the route. If your exact area is not shown, send the address and we will confirm coverage before quoting.</p></> : null}
        {area.neighborhoodNotes ? <dl className="site-area-notes">{area.neighborhoodNotes.map((note) => <div key={note.title}><dt>{note.title}</dt><dd>{note.body}</dd></div>)}</dl> : null}
        {isSouthBay ? <p className="site-note">Don&apos;t see your neighborhood? Put in your ZIP when you check your price.</p> : null}
        {isHub ? <div className="site-area-guides"><h3>Neighborhood guides</h3><nav className="site-links" aria-label="San Jose neighborhood cleaning guides">{sanJoseNeighborhoods.map((neighborhood) => <Link key={neighborhood.slug} href={`/cleaning-services-san-jose/${neighborhood.slug}`} className="home-text-link">House cleaning in {neighborhood.name} →</Link>)}</nav></div> : null}
        {!isSouthBay ? <div className="site-area-groups">
          <div><h3>Homes we clean in {area.name}</h3><ul>{area.homeProfiles.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Common local requests</h3><ul>{area.commonJobs.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div><h3>Office or building-project cleaning</h3><p>Offices, small commercial spaces, and construction or renovation final cleans in {area.name} are scoped from a walkthrough or photo review before any proposal.</p><div className="site-links"><Link href="/services/commercial-cleaning" className="home-text-link">Office &amp; commercial cleaning <span aria-hidden="true">↗</span></Link><Link href="/services/post-construction-cleaning" className="home-text-link">Post-construction cleaning <span aria-hidden="true">↗</span></Link></div></div>
        </div> : null}
      </div></section>

      {isSouthBay ? <HowItWorks /> : null}

      <section aria-labelledby="area-reviews-title"><div className="ns-section"><div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="area-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent market={area.market} /></div><ReviewCards topic="home" reviews={reviews} market={area.market} lead /></div></section>

      <section className="site-muted" aria-labelledby="area-rooms-title"><div className="ns-section"><div className="ns-section-head"><div><p className="ns-kicker">Our work</p><h2 id="area-rooms-title" className="ns-h2">Rooms we&apos;ve cleaned.</h2></div><Link href="/our-work" className="home-text-link">More of our work <span aria-hidden="true">→</span></Link></div><PhotoStrip photos={rooms} market={area.market} /></div></section>

      <section className="ns-section" aria-labelledby="area-nearby-title"><div className="ns-section-head"><div><p className="ns-kicker">Nearby</p><h2 id="area-nearby-title" className="ns-h2">{isSouthBay ? "More of the South Bay." : "Nearby service areas"}</h2></div></div>{isSouthBay ? <CityLinks omit={area.slug} /> : <div className="site-links">{area.nearbyAreas.map((nearby) => <Link key={nearby} href={`/cleaning-services-${serviceAreaSlug(nearby)}`} className="home-text-link">House cleaning in {nearby}</Link>)}</div>}</section>

      <section className="site-muted"><div className="site-section site-split"><div className="site-copy"><p className="ns-kicker">Questions</p><h2>Questions about cleaning in {area.name}.</h2></div><FaqList faqs={areaFaqs} /></div></section>

      <section><div className="site-section site-quote-layout">
        <div className="site-copy">{isSouthBay ? <><p className="ns-kicker">Quote by text</p><h2>Rather get a quote by text?</h2><p className="site-intro">Send the basics and we&apos;ll text you a price. If the house needs more than a standard visit, we&apos;ll say so up front.</p><ul className="site-list"><li>One-time or recurring: weekly, every other week or monthly.</li><li>Nothing is charged when you book.</li></ul><p className="site-note">Or call or text <MarketPhone market={area.market} location="area_quote" />. Mon–Fri 8–6, Sat 8–5.</p></> : <><p className="ns-kicker">A quote from us</p><h2>Tell us about your {area.name} home.</h2><p className="site-intro">{area.bookingNote}</p><p className="site-note">Insured, with cleaning supplies included.</p><MarketPhone market={area.market} className="home-text-link" /></>}</div>
        <QuickQuoteForm title={`Get your ${area.name} price`} subtitle="Start with the cleaning you need." source={`organic_${area.slug}_service_area`} defaultCity={area.name} landingCity={area.name} pageMarket={area.market} directBookingUrl={directBookingUrl} compact />
      </div></section>

      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: "Service Areas", url: `${siteUrl}/service-areas` },
        { name: `${area.name} Cleaning Services`, url: `${siteUrl}/cleaning-services-${area.slug}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        "@id": `${siteUrl}/cleaning-services-${area.slug}#service`,
        url: `${siteUrl}/cleaning-services-${area.slug}`,
        name: `House Cleaning Service in ${area.name}, CA`, description: area.description,
        provider: { "@id": isSouthBay ? `${siteUrl}/#localbusiness-southbay` : "https://newstarcleaning.com/#localbusiness" },
        areaServed: { "@type": "City", name: area.name, addressRegion: "CA" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Cleaning Services", itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Recurring Cleaning", url: `${siteUrl}${isSouthBay ? "/standard-cleaning-san-jose" : "/services/standard-cleaning"}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning", url: `${siteUrl}${isSouthBay ? "/deep-cleaning-san-jose" : "/services/deep-cleaning"}` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In/Move-Out Cleaning", url: `${siteUrl}${isSouthBay ? "/move-out-cleaning-san-jose" : "/services/move-out-cleaning"}` } },
        ] },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: areaFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
    </div>
  );
}

function serviceAreaSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import BeforeAfterPairs from "@/components/BeforeAfterPairs";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FaqList from "@/components/FaqList";
import GoogleRating from "@/components/GoogleRating";
import HomeServices from "@/components/HomeServices";
import LocalNotes from "@/components/LocalNotes";
import { MarketCallOrText } from "@/components/MarketPhone";
import PriceCtaBand from "@/components/PriceCtaBand";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import ReviewCards from "@/components/ReviewCards";
import SiteHero from "@/components/SiteHero";
import TrustStrip from "@/components/TrustStrip";
import WorkPhoto from "@/components/WorkPhoto";
import type { ServiceArea } from "@/lib/serviceAreas";
import { bathroomResultPhotos, cleanBathroomPhoto, emptyHomeResultPhotos, homeResultPhotos, kitchenSurfacesPhoto, vanityDetailPhoto, legacyShowerPair, ovenInteriorPair, refrigeratorFullPair, showerDetailPair, tubSurroundPair, ventDetailPair, pickUnusedPhoto, type RealWorkPhoto } from "@/lib/realWorkPhotos";
import { googleReviews } from "@/lib/googleReviews";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const siteUrl = "https://newstarcleaning.com";
const areaHeroPhotos: Record<string, RealWorkPhoto> = {
  fresno: homeResultPhotos[0],
  clovis: bathroomResultPhotos[1],
  madera: cleanBathroomPhoto,
  "tower-district": homeResultPhotos[2],
  "fig-garden": kitchenSurfacesPhoto,
  "woodward-park": bathroomResultPhotos[0],
};
const proofPairs = [tubSurroundPair, showerDetailPair, ventDetailPair, refrigeratorFullPair, ovenInteriorPair, legacyShowerPair];
const reviews = ["merle-f", "daumdatta", "joel-s"].map((id) => googleReviews.find((review) => review.id === id)!);

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const directBookingUrl = resolveDirectBookingUrl();
  const heroPhoto = areaHeroPhotos[area.slug] ?? homeResultPhotos[0];
  const usedPhotos = [heroPhoto, ...(area.planCards?.map((card) => card.photo) ?? [])];
  const bandPhoto = pickUnusedPhoto([bathroomResultPhotos[0], bathroomResultPhotos[1], homeResultPhotos[0], homeResultPhotos[2]], usedPhotos);
  const servicePhotos = {
    "standard-cleaning": pickUnusedPhoto([homeResultPhotos[0], homeResultPhotos[2], homeResultPhotos[1]], [...usedPhotos, bandPhoto]),
    "deep-cleaning": pickUnusedPhoto([cleanBathroomPhoto, bathroomResultPhotos[1], vanityDetailPhoto], [...usedPhotos, bandPhoto]),
    "move-out-cleaning": emptyHomeResultPhotos[1],
  };
  const planPhoto = area.planCards ? null : pickUnusedPhoto([bathroomResultPhotos[1], vanityDetailPhoto, homeResultPhotos[1], homeResultPhotos[2]], [...usedPhotos, bandPhoto, ...Object.values(servicePhotos)]);
  const areaFaqs = area.faqs || [
    { question: `Do you provide house cleaning in ${area.name}, CA?`, answer: `Yes. New Star Cleaning serves ${area.name}, CA with standard recurring cleaning, deep cleaning, and move-in/move-out cleaning. ${area.localProof}` },
    { question: `Which ${area.name} neighborhoods do you serve?`, answer: `We serve ${area.neighborhoods.slice(0, 4).join(", ")} and nearby parts of ${area.county}. If your exact neighborhood is not listed, request a quote and we will confirm route availability.` },
    { question: `What cleaning services are available in ${area.name}?`, answer: `${area.name} clients can request recurring standard cleaning, one-time deep cleaning, and move-in/move-out cleaning. Common local requests include ${area.commonJobs.slice(0, 2).join(" and ")}.` },
    { question: `How quickly can I book a cleaner in ${area.name}?`, answer: area.bookingNote },
  ];

  return (
    <div className="site-reference">
      <SiteHero title={`House cleaning in ${area.name}, CA.`} description={area.description} photo={heroPhoto} proof={<ProofRow tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }]}>
        <PricePicker id="price" source={`organic_${area.slug}_price`} leadSource={`organic_${area.slug}_service_area`} defaultCity={area.name} quoteHref="#quote" />
      </SiteHero>

      <section aria-labelledby="area-reviews-title"><div className="ns-section"><div className="ns-section-head"><h2 id="area-reviews-title" className="ns-h2">What customers say.</h2><GoogleRating prominent /></div><ReviewCards topic="home" reviews={reviews} lead /></div></section>

      <section className="site-muted" aria-labelledby="area-results-title"><div className="ns-section"><div className="ns-section-head"><h2 id="area-results-title" className="ns-h2">Before and after, from real New Star jobs.</h2></div><BeforeAfterPairs pairs={proofPairs} /><div className="home-section-more"><Link href="/our-work" className="home-text-link">See all of our work <span aria-hidden="true">→</span></Link></div></div></section>

      <section className="site-section" aria-labelledby="area-services-title">
        <div className="ns-section-head"><h2 id="area-services-title" className="ns-h2">Which cleaning do you need?</h2><Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">→</span></Link></div>
        <Suspense fallback={null}><HomeServices defaultCity={area.name} photos={servicePhotos}>
          <p className="home-service-notes">Oven and fridge interiors, interior window glass, and cabinet interiors on standard or deep cleans are optional add-ons. Move-in / move-out includes empty cabinet, drawer, and closet interiors.</p>
        </HomeServices></Suspense>

      </section>

      <TrustStrip />

      <section className="site-muted" aria-labelledby="area-local-title"><div className="site-section">
        {area.planCards ? <><div className="ns-section-head"><h2 id="area-local-title" className="ns-h2">{`Cleaning for ${area.name} homes.`}</h2></div><div className="site-plan-cards">{area.planCards.map((card) => <article className="site-plan-card" key={card.title}><div className="site-plan-frame" data-work-photo="detail"><Image src={card.photo.src} alt={card.photo.alt} fill sizes="(min-width: 1024px) 400px, 40vw" /></div><div><h3>{card.title}</h3><p>{card.body}</p></div></article>)}</div></> : planPhoto ? <div className="site-local-plan"><div><h2 id="area-local-title" className="ns-h2">{`Cleaning for ${area.name} homes.`}</h2><p>{area.localProof}</p></div><WorkPhoto photo={planPhoto} caption={`${planPhoto.caption} · New Star job`} /></div> : null}
      </div></section>



      <PriceCtaBand photo={bandPhoto} line={area.bookingNote} phoneLocation="area_price_band" />

      <section className="ns-section" aria-labelledby="area-nearby-title"><div className="ns-section-head"><h2 id="area-nearby-title" className="ns-h2">Nearby service areas</h2></div><div className="site-links">{area.nearbyAreas.map((nearby) => <Link key={nearby} href={`/cleaning-services-${serviceAreaSlug(nearby)}`} className="home-text-link">House cleaning in {nearby}</Link>)}</div></section>

      <section className="site-muted"><div className="site-section site-split"><div className="site-copy"><p className="ns-kicker">Questions</p><h2>Questions about cleaning in {area.name}.</h2></div><div><FaqList faqs={areaFaqs} /><LocalNotes title={`More about cleaning in ${area.name}.`} notes={[
        { summary: `How we price a ${area.name} home`, children: <p>{area.localContent}</p> },
        { summary: `${area.name} neighborhoods`, children: <><p>{area.neighborhoods.join(", ")}</p>{area.neighborhoodNotes ? <dl>{area.neighborhoodNotes.map((note) => <div key={note.title}><dt>{note.title}</dt><dd>{note.body}</dd></div>)}</dl> : null}<p>When the address fits the route. If your exact area is not shown, send the address and we will confirm coverage before quoting.</p></> },
        ...(area.serviceDetails?.standard ? [{ id: "standard-cleaning", summary: `Regular cleaning in ${area.name}`, children: <p>{area.serviceDetails.standard}</p> }] : []),
        ...(area.serviceDetails ? [
          { id: "deep-cleaning", summary: `Deep cleaning in ${area.name}`, children: <><p>{area.serviceDetails.deep}</p><Link href="/services/deep-cleaning" className="home-text-link">See the full deep-cleaning scope →</Link></> },
          { id: "move-out-cleaning", summary: `Move-out cleaning in ${area.name}`, children: <><p>{area.serviceDetails.move}</p><Link href="/services/move-out-cleaning" className="home-text-link">See the full move-in/move-out scope →</Link></> },
        ] : []),
        { summary: "Homes we clean and the jobs we see most", children: <><h4>Homes we clean in {area.name}</h4><ul>{area.homeProfiles.map((item) => <li key={item}>{item}</li>)}</ul><h4 className="mt-4">Common local requests</h4><ul>{area.commonJobs.map((item) => <li key={item}>{item}</li>)}</ul><h4 className="mt-4">Office or building-project cleaning</h4><p>Offices, small commercial spaces, and construction or renovation final cleans in {area.name} are scoped from a walkthrough or photo review before any proposal.</p><div className="site-links"><Link href="/services/commercial-cleaning" className="home-text-link">Office &amp; commercial cleaning ↗</Link><Link href="/services/post-construction-cleaning" className="home-text-link">Post-construction cleaning ↗</Link></div></> },
      ]} /></div></div></section>

      <section><div className="site-section site-quote-layout">
        <div className="site-copy"><p className="ns-kicker">Your price</p><h2>{`See your ${area.name} price.`}</h2><p className="site-intro">Put in your ZIP and the price shows here. Send it to yourself and we&apos;ll confirm the exact number and the days we have open. If the house needs more than a standard visit, we&apos;ll say so up front.</p><p className="site-note">{area.bookingNote}</p><p className="site-note"><MarketCallOrText prefix="Or " location="area_quote" />. Mon–Fri 8–6, Sat 8–5.</p></div>
        <QuickQuoteForm title={`Get your ${area.name} price`} subtitle="Start with the cleaning you need." source={`organic_${area.slug}_service_area`} defaultCity={area.name} landingCity={area.name} directBookingUrl={directBookingUrl} compact />
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
        provider: { "@id": `${siteUrl}/#localbusiness` },
        areaServed: { "@type": "City", name: area.name, addressRegion: "CA" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Cleaning Services", itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Recurring Cleaning", url: `${siteUrl}/services/standard-cleaning` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning", url: `${siteUrl}/services/deep-cleaning` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In/Move-Out Cleaning", url: `${siteUrl}/services/move-out-cleaning` } },
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

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import GoogleRating from "@/components/GoogleRating";
import SiteHero from "@/components/SiteHero";
import HomeServices from "@/components/HomeServices";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import type { ServiceArea } from "@/lib/serviceAreas";
import { homeResultPhotos, bathroomResultPhotos, emptyHomeResultPhotos, kitchenSurfacesPhoto, type RealWorkPhoto } from "@/lib/realWorkPhotos";
import MarketPhone from "@/components/MarketPhone";
import MarketPriceExample from "@/components/MarketPriceExample";
import { markets } from "@/lib/markets";
import { sanJoseNeighborhoods } from "@/lib/sanJoseNeighborhoods";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

import "./service-editorial.css";

const siteUrl = "https://newstarcleaning.com";

function serviceAreaSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Honest, varied hero photo per area — real New Star work, no city/job claims.
const areaHeroPhotos: Record<string, RealWorkPhoto> = {
  fresno: homeResultPhotos[1],
  clovis: kitchenSurfacesPhoto,
  madera: bathroomResultPhotos[1],
  "tower-district": bathroomResultPhotos[2],
  "fig-garden": homeResultPhotos[0],
  "woodward-park": emptyHomeResultPhotos[4],
  "san-jose": homeResultPhotos[0],
  cupertino: kitchenSurfacesPhoto,
  "santa-clara": bathroomResultPhotos[0],
  sunnyvale: homeResultPhotos[0],
  campbell: kitchenSurfacesPhoto,
  saratoga: bathroomResultPhotos[0],
  "los-gatos": kitchenSurfacesPhoto,
};


export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const directBookingUrl = resolveDirectBookingUrl();
  const market = markets[area.market];
  const isSouthBay = area.market === "southbay";
  const heroPhoto = areaHeroPhotos[area.slug] ?? homeResultPhotos[1];
  const areaFaqs = area.faqs || [
    {
      question: `Do you provide house cleaning in ${area.name}, CA?`,
      answer: `Yes. New Star Cleaning serves ${area.name}, CA with standard recurring cleaning, deep cleaning, and move-in/move-out cleaning. ${area.localProof}`,
    },
    {
      question: `Which ${area.name} neighborhoods do you serve?`,
      answer: `We serve ${area.neighborhoods.slice(0, 4).join(", ")} and nearby parts of ${area.county}. If your exact neighborhood is not listed, request a quote and we will confirm route availability.`,
    },
    {
      question: `What cleaning services are available in ${area.name}?`,
      answer: `${area.name} clients can request recurring standard cleaning, one-time deep cleaning, and move-in/move-out cleaning. Common local requests include ${area.commonJobs.slice(0, 2).join(" and ")}.`,
    },
    { question: `How quickly can I book a cleaner in ${area.name}?`, answer: area.bookingNote },
  ];

  return (
    <div className="site-reference">
      <SiteHero
        title={`House cleaning in ${area.name}, CA.`}
        description={area.description}

        photo={heroPhoto}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }]}
      >
        <p className="site-price">{isSouthBay ? "See your price before you book. No walkthrough needed." : "Your home. Your scope. A confirmed price."}</p>
        <div className="site-booking-actions">
          {directBookingUrl ? <Suspense fallback={null}><BookingPortalLink baseUrl={directBookingUrl} market={area.market} city={area.name} sourcePage={`/cleaning-services-${area.slug}`} ctaLocation="area_hero" label="See your price and book" showIcon={false} className="home-button" /></Suspense> : <a href="#quote" className="home-button">Get a quote</a>}
          <a href="#quote" className="home-text-link">Rather get a quote by text?</a>
        </div>
        <div className="site-hero-meta">
          <MarketPhone market={area.market} className="site-hero-phone" location="area_hero"><Icon name="phone" /> </MarketPhone>
          <span className="site-hero-hours">Mon–Fri 8–6 · Sat 8–5</span>
        </div>
      </SiteHero>
      <section className="site-section site-local-intro" aria-label={`About cleaning in ${area.name}`}>{isSouthBay ? <div className="space-y-5">{area.localContent.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : <p>{area.localContent}</p>}</section>
      <section className="site-section site-split site-rule" aria-label={`Pricing in ${area.name}`}><div className="site-copy"><h2>What will your cleaning cost?</h2><p className="site-intro">{isSouthBay ? "The example below is a 3 bed, 2 bath, 1,430 sq ft home in normal condition. Put in your ZIP and your home’s details for your own price." : "Start with a real calculator example, then enter your ZIP. Home size, condition, frequency, and extras determine your own quote."}</p>{isSouthBay ? <p className="site-note">Tell us within 24 hours if something on your checklist was missed and we come back at no charge.</p> : null}</div><MarketPriceExample market={area.market} /></section>

      <section className="site-section">
        <div className="home-section-heading">
          <div>
            <p className="ns-kicker">Services</p>
            <h2 className="ns-h2">Which cleaning do you need?</h2>
          </div>
          <Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">→</span></Link>
        </div>
        <div className="mt-8"><Suspense fallback={null}><HomeServices defaultCity={area.name} market={area.market} /></Suspense></div>
        <p className="home-service-notes">Oven and fridge interiors, interior window glass, and cabinet interiors on standard or deep cleans are optional add-ons. Move-in / move-out includes empty cabinet, drawer, and closet interiors.</p>
        {area.serviceDetails && (
          <div className="site-split mt-8">
            <section id="deep-cleaning" className="site-copy scroll-mt-24" aria-labelledby="area-deep-title">
              <h2 id="area-deep-title">Deep cleaning in {area.name}</h2>
              <p className="site-intro">{area.serviceDetails.deep}</p>
              <Link href={isSouthBay ? "/deep-cleaning-san-jose" : "/services/deep-cleaning"} className="home-text-link">See the full deep-cleaning scope <span aria-hidden="true">→</span></Link>
            </section>
            <section id="move-out-cleaning" className="site-copy scroll-mt-24" aria-labelledby="area-move-title">
              <h2 id="area-move-title">Move-out and move-in cleaning in {area.name}</h2>
              <p className="site-intro">{area.serviceDetails.move}</p>
              <Link href={isSouthBay ? "/move-out-cleaning-san-jose" : "/services/move-out-cleaning"} className="home-text-link">See the full move-in/move-out scope <span aria-hidden="true">→</span></Link>
            </section>
          </div>
        )}
      </section>

      <section className="site-muted" aria-labelledby="area-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Reviews</p>
              <h2 id="area-reviews-title" className="ns-h2">What customers say.</h2>
              {isSouthBay ? <p className="ns-lead">These reviews are from our Central Valley customers. San Jose is our newest area.</p> : null}
            </div>
            <GoogleRating prominent market={area.market} />
          </div>
          <ReviewCards topic="home" />
        </div>
      </section>

      <section className="site-section">
        <div className="home-section-heading">
          <h2>{isSouthBay ? "A closer look at New Star cleaning." : `Cleaning for ${area.name} homes.`}</h2>
          <Link href="/our-work" className="home-text-link">More of our work <span aria-hidden="true">→</span></Link>
        </div>
        <div className="service-editorial">

          <div className="site-links">
            <MarketPhone market={area.market} className="home-text-link" />
          </div>
          <div className="se-results mt-6">
            <figure>
              <Image src={homeResultPhotos[0].src} alt={homeResultPhotos[0].alt} fill sizes="(min-width: 1024px) 600px, 90vw" />
              <figcaption>{homeResultPhotos[0].caption} · New Star work</figcaption>
            </figure>
            <figure>
              <Image src={bathroomResultPhotos[0].src} alt={bathroomResultPhotos[0].alt} fill sizes="(min-width: 1024px) 600px, 90vw" />
              <figcaption>{bathroomResultPhotos[0].caption} · New Star work</figcaption>
            </figure>
          </div>
          {isSouthBay ? <p className="se-note mt-4">Photos from New Star jobs in the Central Valley.</p> : null}
          <div className="se-local mt-9">
            <div className={`se-local-block${area.neighborhoodNotes ? " lg:col-span-2" : ""}`}>
              <h3>{area.name} neighborhoods we serve</h3>
              <div className="se-chips">
                {area.neighborhoods.map((neighborhood) => <span key={neighborhood} className="se-chip">{neighborhood}</span>)}
              </div>
              <p className="se-note">{isSouthBay ? "Don’t see your neighborhood? Put in your ZIP when you check your price." : "When the address fits the route. If your exact area is not shown, send the address and we will confirm coverage before quoting."}</p>
              {area.neighborhoodNotes ? <dl className="mt-6 grid gap-6 md:grid-cols-2">{area.neighborhoodNotes.map((note) => <div key={note.title}><dt className="text-base font-semibold text-primary">{note.title}</dt><dd className="mt-2 text-sm leading-6 text-ink-soft">{note.body}</dd></div>)}</dl> : null}
              {area.slug === "san-jose" ? <nav className="site-links mt-6" aria-label="San Jose neighborhood cleaning guides">{sanJoseNeighborhoods.map((neighborhood) => <Link key={neighborhood.slug} href={`/cleaning-services-san-jose/${neighborhood.slug}`} className="home-text-link">Cleaning in {neighborhood.name} →</Link>)}</nav> : null}
            </div>
            <div className="se-local-block">
              <h3>Homes we clean in {area.name}</h3>
              <ul>{area.homeProfiles.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="se-local-block">
              <h3>{isSouthBay ? `Cleanings we do in ${area.name}` : "Common local requests"}</h3>
              <ul>{area.commonJobs.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            {!isSouthBay && <div className="se-local-block">
              <h3>Office or building-project cleaning</h3>
              <p className="se-note">Offices, small commercial spaces, and construction or renovation final cleans in {area.name} are scoped from a walkthrough or photo review before any proposal.</p>
              <div className="site-links">
                <Link href="/services/commercial-cleaning" className="home-text-link">Office &amp; commercial cleaning <span aria-hidden="true">↗</span></Link>
                <Link href="/services/post-construction-cleaning" className="home-text-link">Post-construction cleaning <span aria-hidden="true">↗</span></Link>
              </div>
            </div>}
          </div>
          <div className="se-local-block">
            <h3>Nearby service areas</h3>
            <div className="site-links">{area.nearbyAreas.map((nearby) => <Link key={nearby} href={`/cleaning-services-${serviceAreaSlug(nearby)}`} className="home-text-link">House cleaning in {nearby}</Link>)}</div>
            {isSouthBay && area.slug !== "san-jose" ? <Link href={market.hub} className="home-text-link">San Jose &amp; South Bay service hub →</Link> : null}
          </div>
        </div>
      </section>

      <section className="site-section site-split site-rule">
        <div className="site-copy"><h2>Questions about cleaning in {area.name}.</h2></div>
        <div className="site-disclosures">
          {areaFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true">+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="site-muted">
        <div className="site-section site-quote-layout">
          <div className="site-copy"><p className="ns-kicker">A quote from us</p><h2>Tell us about your {area.name} home.</h2><p className="site-intro">{area.bookingNote}</p><p className="site-note">Insured, with cleaning supplies included.</p></div>
          <QuickQuoteForm title={`Get your ${area.name} price`} subtitle="Start with the cleaning you need." source={`organic_${area.slug}_service_area`} defaultCity={area.name} landingCity={area.name} pageMarket={area.market} directBookingUrl={directBookingUrl} compact />
        </div>
      </section>
      <TrustStrip market={area.market} />

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

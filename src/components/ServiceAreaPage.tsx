import Link from "next/link";
import { Suspense } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import GoogleRating from "@/components/GoogleRating";
import SiteHero from "@/components/SiteHero";
import HomeServices from "@/components/HomeServices";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import type { ServiceArea } from "@/lib/serviceAreas";
import { homeResultPhotos } from "@/lib/realWorkPhotos";
import { business } from "@/lib/business";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const siteUrl = "https://newstarcleaning.com";

function serviceAreaSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  const directBookingUrl = resolveDirectBookingUrl();
  const localPanels = [
    { title: `Homes we clean in ${area.name}`, items: area.homeProfiles },
    { title: "Common local requests", items: area.commonJobs },
  ];
  const areaFaqs = [
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
        eyebrow={`${area.county} · ${area.areaType}`}
        photo={homeResultPhotos[1]}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service areas", href: "/service-areas" }]}
      >
        <div className="site-actions">
          <a href="#quote" className="home-button">Get a {area.name} quote <span aria-hidden="true">↗</span></a>
          <a href={business.phoneHref} className="home-text-link">Call us</a>
        </div>
      </SiteHero>

      <div className="home-wrap">
        <div className="home-proof-line site-proof-row">
          <p className="site-note">Fresno-based. Photographs from New Star appointments.</p>
          <GoogleRating />
        </div>
      </div>

      <section className="site-section site-split">
        <div className="site-copy">
          <h2>Check availability in {area.name}.</h2>
          <p className="site-intro">{area.bookingNote}</p>
          <p className="site-note">Tell us about your home, the service you need, and your preferred date. Your quote reflects the size, condition, visit frequency, and optional work.</p>
        </div>
        <div className="min-w-0">
          <QuickQuoteForm
            title={`Request your ${area.name} quote`}
            subtitle="Share the basics. We confirm availability and the price before anything is booked."
            source={`organic_${area.slug}_service_area`}
            defaultCity={area.name}
            landingCity={area.name}
            compact
          />
          {directBookingUrl ? (
            <Suspense fallback={null}>
              <BookingPortalLink
                baseUrl={directBookingUrl}
                city={area.name}
                sourcePage={`/cleaning-services-${area.slug}`}
                label="Ready to self-schedule? Book online"
                showIcon={false}
                className="home-text-link"
              />
            </Suspense>
          ) : null}
        </div>
      </section>

      <section className="site-section site-rule">
        <div className="home-section-heading">
          <h2>Which cleaning<br />do you need?</h2>
          <Link href="/checklist" className="home-text-link">Full checklists <span aria-hidden="true">↗</span></Link>
        </div>
        <Suspense fallback={null}><HomeServices defaultCity={area.name} /></Suspense>
        <div className="home-service-notes">
          <p>Oven and fridge interiors, interior window glass, and reachable window tracks are optional add-ons. Cabinet interiors are optional for standard and deep cleaning.</p>
          <p>Move-in / move-out includes empty cabinet, drawer, and closet interiors. Deposit returns are not guaranteed. Cleaners bring supplies and equipment; final scope and price are confirmed before booking.</p>
        </div>
      </section>

      <section className="site-muted">
        <div className="site-section site-split">
          <div className="site-copy">
            <h2>Cleaning for {area.name} homes.</h2>
            <p className="site-intro">{area.localContent}</p>
            <p className="site-note">{area.localProof}</p>
            <p className="site-note">New Star Cleaning LLC · Fresno-based house cleaning.</p>
            <div className="site-links">
              <a href={business.phoneHref} className="home-text-link">Call (559) 785-2822</a>
              <Link href="https://www.google.com/maps?cid=12575787905603463321" target="_blank" rel="noopener noreferrer" className="home-text-link">Google profile <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="site-disclosures">
            <details>
              <summary>{area.name} neighborhoods we serve<span aria-hidden="true">+</span></summary>
              <p>We serve these neighborhoods when the address fits the route. If your exact area is not shown, send the address and we will confirm coverage before quoting.</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{area.neighborhoods.map((neighborhood) => <li key={neighborhood}>{neighborhood}</li>)}</ul>
            </details>
            {localPanels.map((panel) => (
              <details key={panel.title}>
                <summary>{panel.title}<span aria-hidden="true">+</span></summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{panel.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            ))}
            <details>
              <summary>Office or building-project cleaning<span aria-hidden="true">+</span></summary>
              <p>Offices, small commercial spaces, and construction or renovation final cleans in {area.name} are scoped from a walkthrough or photo review before any proposal. Scope and capacity are confirmed first.</p>
              <div className="site-links">
                <Link href="/services/commercial-cleaning" className="home-text-link">Office &amp; commercial cleaning <span aria-hidden="true">↗</span></Link>
                <Link href="/services/post-construction-cleaning" className="home-text-link">Post-construction cleaning <span aria-hidden="true">↗</span></Link>
              </div>
            </details>
            <details>
              <summary>Nearby service areas<span aria-hidden="true">+</span></summary>
              <div className="site-links">{area.nearbyAreas.map((nearby) => <Link key={nearby} href={`/cleaning-services-${serviceAreaSlug(nearby)}`} className="home-text-link">House cleaning in {nearby}</Link>)}</div>
            </details>
          </div>
        </div>
      </section>

      <section className="site-section site-split">
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

      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: "Service Areas", url: `${siteUrl}/service-areas` },
        { name: `${area.name} Cleaning Services`, url: `${siteUrl}/cleaning-services-${area.slug}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: `House Cleaning Service in ${area.name}, CA`, description: area.description,
        provider: { "@id": "https://newstarcleaning.com/#localbusiness" },
        areaServed: { "@type": "City", name: area.name, addressRegion: "CA" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Cleaning Services", itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Standard Recurring Cleaning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Deep Cleaning" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Move-In/Move-Out Cleaning" } },
        ] },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: areaFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
    </div>
  );
}

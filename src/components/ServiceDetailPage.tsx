
import Link from "next/link";
import { Suspense } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import SiteHero from "@/components/SiteHero";
import GoogleRating from "@/components/GoogleRating";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceProof from "@/components/ServiceProof";
import HowItWorks from "@/components/HowItWorks";
import MarketPhone from "@/components/MarketPhone";
import PricePicker from "@/components/PricePicker";
import ProofRow from "@/components/ProofRow";
import ReviewCards from "@/components/ReviewCards";
import WorkPhoto from "@/components/WorkPhoto";
import { bathroomResultPhotos, homeResultPhotos } from "@/lib/realWorkPhotos";

import type { ServiceDefinition } from "@/lib/services";
import { clientPrepChecklist, getFullIncludedList } from "@/lib/services";
import { business, businessAreaServed } from "@/lib/business";
import { servicePresentation } from "@/lib/servicePresentation";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";


import "./service-editorial.css";

const siteUrl = "https://newstarcleaning.com";



const heroDescriptions = {
  "standard-cleaning": "Kitchen, bathrooms, dusting and floors. One visit, or weekly, every other week or monthly.",
  "deep-cleaning": "Everything in a standard clean, plus extra time on shower buildup, baseboards, door frames and reachable fixtures.",
  "move-out-cleaning": "The empty home, including the inside of every cleared cabinet, drawer and closet.",
};

const reviewTopics = {
  "standard-cleaning": "standard",
  "deep-cleaning": "deep",
  "move-out-cleaning": "move",
} as const;

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning" ? "Standard recurring cleaning" : service.slug === "deep-cleaning" ? "Deep cleaning" : "Move-in / move-out cleaning";
}

const cadenceRows = [
  {
    term: "Weekly",
    note: "More frequent help for busy households, pets, and heavily used kitchens and bathrooms.",
  },
  {
    term: "Bi-weekly",
    note: "A regular visit every other week, with light upkeep between appointments.",
  },
  {
    term: "Monthly",
    note: "Works for quieter homes or lighter use between visits. We tell you honestly if a home needs more than a monthly visit.",
  },
];

const deepTargets = [
  "More time for buildup on showers, tubs, and reachable tile",
  "Baseboards, door frames, switch plates, and vent covers wiped",
  "Ceiling fan blades and light fixtures detailed within normal reach",
  "Extra attention to floor edges and corners",
];

const handoffRows = [
  {
    term: "Included",
    tagClass: "se-tag-included",
    note: "Empty cabinet, drawer, and closet interiors are wiped out. The kitchen, bathrooms, floors and deep-cleaning details are included too.",
  },
  {
    term: "Add-on",
    tagClass: "se-tag-addon",
    note: "Inside the oven, inside the refrigerator, interior window glass, and reachable tracks. Requested and priced before the visit.",
  },
];

export default function ServiceDetailPage({ service, h1, intro }: {
  service: ServiceDefinition;
  h1: string;
  intro?: string;
}) {
  const fullIncluded = getFullIncludedList(service.slug);
  const presentation = servicePresentation[service.slug];
  const isMoveOut = service.slug === "move-out-cleaning";
  const isStandard = service.slug === "standard-cleaning";
  const isDeep = service.slug === "deep-cleaning";
  const directBookingUrl = resolveDirectBookingUrl();
  const contextPhoto = isStandard ? homeResultPhotos[1] : isDeep ? bathroomResultPhotos[1] : homeResultPhotos[0];

  return (
    <div className="site-reference">
      <SiteHero
        title={h1}
        description={heroDescriptions[service.slug]}
        photo={presentation.photo}
        proof={<ProofRow market="fresno" tone="dark" />}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      >
        <PricePicker id="price" source={`organic_${service.slug}_service_price`} service={quoteFormService(service)} quoteHref="#quote" />
      </SiteHero>

      <div className="service-editorial [&_.se-kicker]:text-[13px] [&_.se-kicker]:font-bold [&_.se-kicker]:uppercase [&_.se-kicker]:tracking-[.08em] [&_.se-kicker]:text-primary-light [&_.se-cadence-note]:text-base [&_.se-cadence-term]:text-base [&_.se-handoff_.se-tag]:text-[13px]">
        <section className="site-section">
          <div className="site-split">
            <div className="se-fit-copy">
              <p className="se-kicker">Is this the right clean for your home?</p>
              {isMoveOut ? (
                <>
                  <section>
                    <h2>Move-out cleaning before your walkthrough</h2>
                    <p className="se-lead">Tell us when the home will be empty and when the walkthrough is scheduled. Empty cabinet, drawer and closet interiors are included. The landlord or property manager decides deposit deductions; cleaning does not repair damage.</p>
                  </section>
                  <section className="mt-6">
                    <h2>Move-in cleaning before furniture arrives</h2>
                    <p className="se-lead">Schedule cleaning after the previous occupants and belongings are out, and before your furniture and boxes arrive. Share your access arrangements and move date so we can confirm timing.</p>
                  </section>
                </>
              ) : (
                <>
                  <h2>{isStandard ? "For homes we keep clean." : "Deep cleaning for buildup a regular visit misses"}</h2>
                  <p className="se-lead">{presentation.summary}</p>
                </>
              )}
              {isStandard && (
                <>
                  <div className="se-cadence">
                    {cadenceRows.map((row) => (
                      <div key={row.term} className="se-cadence-row">
                        <span className="se-cadence-term">{row.term}</span>
                        <span className="se-cadence-note">{row.note}</span>
                      </div>
                    ))}
                  </div>
                  <p className="se-note">If a first visit needs a deeper reset, we say so before you commit to a schedule.</p>
                </>
              )}
              {isDeep && (
                <>
                  <p className="se-lead">We provide deep cleaning in Fresno and Clovis. Madera visits depend on the address and route availability. Tell us about the rooms and buildup that need the most attention.</p>
                  <ul className="home-scope-includes mt-6">
                    {deepTargets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </>
              )}
              {isMoveOut && (
                <>
                  <div className="se-handoff">
                    {handoffRows.map((row) => (
                      <div key={row.term} className="se-handoff-row">
                        <span className={`se-tag ${row.tagClass}`}>{row.term}</span>
                        <span className="se-cadence-note">{row.note}</span>
                      </div>
                    ))}
                  </div>
                  <p className="se-note">All interiors must be emptied before the visit. We do not haul items, pack, or move furniture.</p>
                </>
              )}
            </div>
            <WorkPhoto photo={contextPhoto} />
          </div>
        </section>
      </div>

      <section id="whats-included" className="site-muted scroll-mt-24">
        <div className="site-section">
          <div className="site-copy">
            <h2>{service.name}: room by room.</h2>
            <p className="site-intro">{service.description}</p>
            <p className="site-note">Please clear the surfaces you want cleaned. Laundry, dishes, organizing, bed making, packing, and personal item handling aren&apos;t included.</p>
            <Link href="/checklist" className="home-text-link">Compare full checklists <span aria-hidden="true">→</span></Link>
          </div>
          <div className="service-editorial">
            <div className="se-scope-grid">
              {fullIncluded.map((group) => (
                <div key={group.title} className="se-room rounded-[var(--radius-card)] border border-line bg-white p-6">
                  <h3>{group.title}</h3>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="site-split mt-10">
            <div className="site-copy">
              <h2>Need something extra?</h2>

              <p className="site-note">{presentation.boundary}</p>
              <p className="site-note">Tell us what you want added. We&apos;ll include it in your quote so you know the full price before you book.</p>
            </div>
            <div className="site-disclosures">
              <details>
                <summary>Available add-ons<span aria-hidden="true">+</span></summary>
                <dl className="mt-4 space-y-4 text-sm leading-6">
                  {service.availableAddOns.map((addOn) => (
                    <div key={addOn.title}><dt className="font-semibold">{addOn.title}</dt><dd className="text-ink-soft">{addOn.description}</dd></div>
                  ))}
                </dl>
              </details>
              <details>
                <summary>Not included<span aria-hidden="true">+</span></summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{service.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
              <details>
                <summary>Is this the right cleaning for my home?<span aria-hidden="true">+</span></summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{service.bestFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
              <details>
                <summary>Before your appointment<span aria-hidden="true">+</span></summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{service.scopeNotes.map((note) => <li key={note}>{note}</li>)}</ul>
                <h3 className="mt-5 text-base font-semibold">Prepare your home</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">{clientPrepChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
                {service.processSteps && service.processSteps.length > 0 && (
                  <ol className="mt-5 space-y-4 text-sm leading-6">
                    {service.processSteps.map((step) => <li key={step.title}><h3 className="font-semibold">{step.title}</h3><p>{step.description}</p></li>)}
                  </ol>
                )}
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section"><div className="ns-section-head"><div><p className="ns-kicker">{isStandard ? "Our work" : "Real jobs"}</p><h2>{isStandard ? "Rooms we've cleaned." : isMoveOut ? "Move-out add-ons, before and after." : "Deep cleaning, before and after."}</h2></div></div><ServiceProof service={service} /></section>
      <HowItWorks />
      <section aria-labelledby="service-reviews-title"><div className="ns-section"><div className="ns-section-head"><div><p className="ns-kicker">Reviews</p><h2 id="service-reviews-title" className="ns-h2">What customers say.</h2></div><GoogleRating prominent /></div><ReviewCards topic={reviewTopics[service.slug]} lead /></div></section>
      <section className="site-muted"><div className="site-section site-split">
        <div className="site-copy">
          <h2>Good to know before you book.</h2>
          {service.localNotes && <p className="site-intro">{service.localNotes}</p>}
          <p className="site-note">{intro ?? service.tagline}</p>
          <div className="site-links">
            {["Fresno", "Clovis", "Madera"].map((city) => (
              <Link key={city} href={`/cleaning-services-${city.toLowerCase()}${isDeep ? "#deep-cleaning" : isMoveOut ? "#move-out-cleaning" : ""}`} className="home-text-link">
                {isDeep ? `Deep cleaning in ${city}` : isMoveOut ? `Move-in and move-out cleaning in ${city}` : city}
              </Link>
            ))}
          </div>
          <Link href={service.slug === "deep-cleaning" ? "/services/standard-cleaning" : "/services/deep-cleaning"} className="home-text-link">Compare {service.slug === "deep-cleaning" ? "standard" : "deep"} cleaning <span aria-hidden="true">→</span></Link>
          {isMoveOut && <Link href="/blog/move-out-cleaning-checklist-before-inspection" className="home-text-link">Fresno rental turnover guide <span aria-hidden="true">↗</span></Link>}
          {directBookingUrl ? <div className="site-actions"><Suspense fallback={null}><BookingPortalLink baseUrl={directBookingUrl} service={quoteFormService(service)} sourcePage={`/services/${service.slug}`} ctaLocation="service_details" label="Book online" showIcon={false} className="home-button" /></Suspense></div> : null}
        </div>
        <div>
          {service.faqs && service.faqs.length > 0 && (
            <div className="site-disclosures">
              {service.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          )}
          <Link href="/contact" className="home-text-link">Still have questions? Contact us <span aria-hidden="true">→</span></Link>
        </div>
      </div></section>

      <section>
        <div className="site-section site-quote-layout">
          <div className="site-copy"><p className="ns-kicker">A quote from us</p><h2>Want us to review your home first?</h2><p className="site-intro">Tell us what needs attention. We&apos;ll confirm the work and your price by text or phone.</p><p className="site-note">Insured, with cleaning supplies included.</p><MarketPhone location="service_quote" className="home-text-link mt-4" /></div>
          <QuickQuoteForm title={`Price your ${service.shortName.toLowerCase()}`} subtitle="Your service is selected. Start with your city and timing." source={`organic_${service.slug}_service`} defaultService={quoteFormService(service)} compact />
        </div>
      </section>


      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: "Services", url: `${siteUrl}/services` },
        { name: service.name, url: `${siteUrl}/services/${service.slug}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${siteUrl}/services/${service.slug}#service`,
        url: `${siteUrl}/services/${service.slug}`,
        name: isMoveOut ? "Move-In and Move-Out Cleaning" : service.name,
        serviceType: service.schemaServiceType,
        description: service.description,
        provider: { "@id": `${business.siteUrl}/#localbusiness` },
        areaServed: businessAreaServed,
      }) }} />
      {service.faqs && service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question", name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }) }} />
      )}
    </div>
  );
}

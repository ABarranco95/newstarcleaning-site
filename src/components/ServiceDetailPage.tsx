import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import SiteHero from "@/components/SiteHero";
import GoogleRating from "@/components/GoogleRating";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceProof from "@/components/ServiceProof";
import TrustStrip from "@/components/TrustStrip";
import ReviewCards from "@/components/ReviewCards";
import Icon from "@/components/Icon";
import type { ServiceDefinition } from "@/lib/services";
import { clientPrepChecklist, getFullIncludedList } from "@/lib/services";
import { business, businessAreaServed } from "@/lib/business";
import { servicePresentation } from "@/lib/servicePresentation";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

import "./service-editorial.css";

const siteUrl = "https://newstarcleaning.com";
const illustrations = {
  "standard-cleaning": "cleaning-regular",
  "deep-cleaning": "cleaning-deep",
  "move-out-cleaning": "cleaning-empty-home",
};

const heroPoints = {
  "standard-cleaning": ["Kitchens, bathrooms, dusting, and floors every visit", "Weekly, biweekly, or monthly", "Price confirmed before anything is booked"],
  "deep-cleaning": ["Extra time for baseboards, fixtures, and buildup", "Supplies and equipment brought in", "Price confirmed before anything is booked"],
  "move-out-cleaning": ["Empty cabinet, drawer, and closet interiors included", "Oven and fridge interiors available as add-ons", "Price confirmed before anything is booked"],
};

const reviewTopics = {
  "standard-cleaning": "standard",
  "deep-cleaning": "deep",
  "move-out-cleaning": "move",
} as const;

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning" ? "Standard recurring cleaning" : service.shortName;
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
    note: "Empty cabinet, drawer, and closet interiors — wiped, not upcharged. Plus the full deep-cleaning scope across the empty home.",
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

  return (
    <div className="site-reference">
      <SiteHero
        title={h1}
        description={presentation.summary}
        eyebrow={service.shortName}
        photo={presentation.photo}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        aside={
          <>
            <QuickQuoteForm
              title={`Price your ${service.shortName.toLowerCase()}`}
              subtitle="Three quick steps. We confirm the price and included work before anything is booked."
              source={`organic_${service.slug}_service`}
              defaultService={quoteFormService(service)}
              compact
            />
            {directBookingUrl ? (
              <Suspense fallback={null}>
                <BookingPortalLink
                  baseUrl={directBookingUrl}
                  service={quoteFormService(service)}
                  sourcePage={`/services/${service.slug}`}
                  label="Ready to self-schedule? Book online"
                  showIcon={false}
                  className="home-text-link"
                />
              </Suspense>
            ) : null}
          </>
        }
      >
        <p className="site-price">From <strong>{presentation.startingPrice}</strong></p>
        <ul className="site-hero-points">
          {heroPoints[service.slug].map((point) => <li key={point}><Icon name="check" />{point}</li>)}
        </ul>
        <div className="site-hero-meta">
          <GoogleRating onDark />
          <a href={business.phoneHref} className="site-hero-phone" data-phone-location="service_hero"><Icon name="phone" /> {business.phoneDisplay}</a>
        </div>
      </SiteHero>

      <TrustStrip />

      <div className="service-editorial">
        <section className="se-section">
          <div className="se-fit">
            <div className="se-fit-copy">
              <p className="se-kicker">Is this the right clean for your home?</p>
              <h2>{isStandard ? "For homes we keep clean." : isDeep ? "When it needs more than a touch-up." : "For the day the home changes hands."}</h2>
              <p className="se-lead">{presentation.lead}</p>
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
                <ul className="home-scope-includes mt-6">
                  {deepTargets.map((item) => <li key={item}>{item}</li>)}
                </ul>
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
            <ServiceProof service={service} />
          </div>
        </section>
      </div>

      <section className="site-muted" aria-labelledby="service-reviews-title">
        <div className="ns-section">
          <div className="ns-section-head">
            <div>
              <p className="ns-kicker">Reviews</p>
              <h2 id="service-reviews-title" className="ns-h2">What customers say.</h2>
            </div>
            <GoogleRating prominent />
          </div>
          <ReviewCards topic={reviewTopics[service.slug]} />
        </div>
      </section>

      <section id="whats-included" className="scroll-mt-24">
        <div className="site-section">
          <div className="site-copy">
            <h2>{service.name}: room by room.</h2>
            <p className="site-intro">{service.description}</p>
            <p className="site-note"><strong>Cleaning service, not household task service.</strong> Laundry, dishes, organizing, bed making, packing, and personal item handling are outside our service scope.</p>
            <Link href="/checklist" className="home-text-link">Compare full checklists <span aria-hidden="true">→</span></Link>
          </div>
          <div className="service-editorial">
            <div className="se-scope-grid">
              {fullIncluded.map((group) => (
                <div key={group.title} className="se-room">
                  <h3>{group.title}</h3>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="site-split mt-10">
            <div className="site-copy">
              <h2>Add-ons, limits, and prep.</h2>
              <div className="site-scope-visual"><Image src={`/illustrations/${illustrations[service.slug]}.svg`} alt="" width={360} height={260} /></div>
              <p className="site-note">{presentation.boundary}</p>
              <p className="site-note">Your total depends on home size, condition, frequency, and optional work. We confirm price, scope, and availability before you book.</p>
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

      <section className="site-section site-split site-rule">
        <div className="site-copy">
          <h2>Good to know before you book.</h2>
          {service.localNotes && <p className="site-intro">{service.localNotes}</p>}
          <p className="site-note">{intro ?? service.tagline}</p>
          <div className="site-links">
            <Link href="/cleaning-services-fresno" className="home-text-link">Fresno</Link>
            <Link href="/cleaning-services-clovis" className="home-text-link">Clovis</Link>
            <Link href="/cleaning-services-madera" className="home-text-link">Madera</Link>
          </div>
          <Link href={service.slug === "deep-cleaning" ? "/services/standard-cleaning" : "/services/deep-cleaning"} className="home-text-link">Compare {service.slug === "deep-cleaning" ? "standard" : "deep"} cleaning <span aria-hidden="true">→</span></Link>
          {isMoveOut && <Link href="/blog/move-out-cleaning-checklist-before-inspection" className="home-text-link">Fresno rental turnover guide <span aria-hidden="true">↗</span></Link>}
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
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: siteUrl },
        { name: "Services", url: `${siteUrl}/services` },
        { name: service.name, url: `${siteUrl}/services/${service.slug}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
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

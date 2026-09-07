import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import BookingPortalLink from "@/components/BookingPortalLink";
import SiteHero from "@/components/SiteHero";
import GoogleRating from "@/components/GoogleRating";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import BeforeAfterCarousel, { type BeforeAfterItem } from "@/components/BeforeAfterCarousel";
import type { ServiceDefinition } from "@/lib/services";
import { clientPrepChecklist, getFullIncludedList } from "@/lib/services";
import { business, businessAreaServed } from "@/lib/business";
import { ovenBuildupPair, vanityDetailPhoto, emptyHomeResultPhotos } from "@/lib/realWorkPhotos";
import { servicePresentation } from "@/lib/servicePresentation";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const siteUrl = "https://newstarcleaning.com";
const illustrations = {
  "standard-cleaning": "cleaning-regular",
  "deep-cleaning": "cleaning-deep",
  "move-out-cleaning": "cleaning-empty-home",
};
const deepDetailPairs: BeforeAfterItem[] = [{
  before: { src: "/photos/real-work/paid/tub-surround-before.webp", alt: "Bathtub and tile surround before a New Star deep cleaning" },
  after: { src: "/photos/real-work/paid/tub-surround-after.webp", alt: "The same bathtub and tile surround after a New Star deep cleaning" },
  label: "Tub and surround detail from a real deep-cleaning appointment.",
}];
const moveOutDetailPairs: BeforeAfterItem[] = [{
  before: { src: ovenBuildupPair.before.src, alt: ovenBuildupPair.before.alt },
  after: { src: ovenBuildupPair.after.src, alt: ovenBuildupPair.after.alt },
  label: ovenBuildupPair.label,
}];

function quoteFormService(service: ServiceDefinition) {
  return service.slug === "standard-cleaning" ? "Standard recurring cleaning" : service.shortName;
}

export default function ServiceDetailPage({ service, h1, intro }: {
  service: ServiceDefinition;
  h1: string;
  intro?: string;
}) {
  const fullIncluded = getFullIncludedList(service.slug);
  const presentation = servicePresentation[service.slug];
  const isMoveOut = service.slug === "move-out-cleaning";
  const detailPairs = service.slug === "deep-cleaning" ? deepDetailPairs : isMoveOut ? moveOutDetailPairs : [];
  const directBookingUrl = resolveDirectBookingUrl();
  const supportingPhoto = service.slug === "deep-cleaning" ? vanityDetailPhoto : isMoveOut ? emptyHomeResultPhotos[6] : null;

  return (
    <div className="site-reference">
      <SiteHero
        title={h1}
        description={presentation.summary}
        eyebrow={service.shortName}
        photo={presentation.photo}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      >
        <p className="site-price">From <strong>{presentation.startingPrice}</strong></p>
        <div className="site-actions">
          <a href="#quote" className="home-button">Request a quote <span aria-hidden="true">↗</span></a>
          <a href={business.phoneHref} className="home-text-link">Call us</a>
        </div>
        <a href="#whats-included" className="home-text-link">What&apos;s included <span aria-hidden="true">→</span></a>
      </SiteHero>

      <div className="home-wrap">
        <div className="home-proof-line site-proof-row">
          <p className="site-note">Locally owned. Photographs from our work.</p>
          <GoogleRating />
        </div>
      </div>

      <section className="site-section site-split">
        <div className="site-copy">
          <h2>Price your {service.shortName.toLowerCase()}.</h2>
          <p className="site-intro">{intro ?? service.tagline}</p>
          <p className="site-note">{presentation.boundary}</p>
          <p className="site-note">Your total depends on home size, condition, frequency, and optional work. Add-ons must be requested before the appointment. We confirm price, scope, and availability before you book.</p>
        </div>
        <div className="min-w-0">
          <QuickQuoteForm
            title={`Price ${service.shortName.toLowerCase()}`}
            subtitle="Share the basics. We confirm the price and included work before anything is booked."
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
        </div>
      </section>

      <section id="whats-included" className="site-muted scroll-mt-24">
        <div className="site-section site-split">
          <div className="site-copy">
            <h2>{service.name}: room by room.</h2>
            <p className="site-intro">{service.description}</p>
            <div className="site-scope-media"><div className="site-scope-visual"><Image src={`/illustrations/${illustrations[service.slug]}.svg`} alt="" width={360} height={260} /></div>{supportingPhoto ? <figure className="site-support-photo"><Image src={supportingPhoto.src} alt={supportingPhoto.alt} width={360} height={480} sizes="(min-width: 1024px) 220px, 50vw" /><figcaption>{supportingPhoto.caption} · New Star work</figcaption></figure> : null}</div>
            <p className="site-note">{service.slug === "standard-cleaning" ? "Open any room for its complete checklist." : "The full checklist includes the work carried over from the other cleaning levels."}</p>
            <p className="site-note"><strong>Cleaning service, not household task service.</strong> Laundry, dishes, organizing, bed making, packing, and personal item handling are outside our service scope.</p>
            <Link href="/checklist" className="home-text-link">Compare full checklists <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="site-disclosures">
            {fullIncluded.map((group) => (
              <details key={group.title}>
                <summary>{group.title}<span aria-hidden="true">+</span></summary>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-soft">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </details>
            ))}
            <details>
              <summary>Available add-ons<span aria-hidden="true">+</span></summary>
              <p>Optional detail items are priced separately and need enough time on the schedule. They are not included unless your quote says so.</p>
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
            {detailPairs.length > 0 && (
              <details>
                <summary>{isMoveOut ? "See optional inside-oven detail" : "See a real tub before and after"}<span aria-hidden="true">+</span></summary>
                <p>{isMoveOut ? "Inside-oven cleaning is priced separately, not included in the base move-out service. Request it before the visit." : "Tub and surround detail from a real deep-cleaning appointment."}</p>
                <div className="mx-auto mt-4 w-full max-w-sm"><BeforeAfterCarousel items={detailPairs} /></div>
                <p>Results vary with surface condition, buildup, and access. Aged surfaces can retain wear and staining.</p>
              </details>
            )}
          </div>
        </div>
      </section>

      <section className="site-section site-split">
        <div className="site-copy">
          <h2>Good to know before you book.</h2>
          {service.localNotes && <p className="site-intro">{service.localNotes}</p>}
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

import type { Metadata } from "next";
import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { business, businessAreaServed } from "@/lib/business";

export const metadata: Metadata = {
  title: "Office & Commercial Cleaning in Fresno, CA",
  description:
    "Office and commercial cleaning in Fresno, Clovis & Madera. Restrooms, breakrooms, shared spaces and floors. Request a walkthrough and written quote.",
  alternates: { canonical: "/services/commercial-cleaning" },
  openGraph: {
    title: "Office & Commercial Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Walkthrough-based office cleaning proposals for Fresno, Clovis, Madera, and close-in Fresno routes.",
    url: "https://newstarcleaning.com/services/commercial-cleaning",
  },
};

const scopes = [
  {
    title: "Offices and common areas",
    description:
      "Reception areas, conference rooms, cleared desks, touchpoints, interior entry glass, and trash. We work around the areas your team uses and keep private work materials undisturbed.",
  },
  {
    title: "Restrooms and breakrooms",
    description:
      "Toilets, sinks, counters, tables, appliance exteriors, touchpoints, trash, and floors. Frequency is planned around daily use and the needs of the space.",
  },
  {
    title: "Recurring floor care",
    description:
      "Vacuuming, sweeping, and mopping suited to your floor surfaces. Carpet extraction, stripping, waxing, refinishing, and restoration are not part of routine cleaning.",
  },
];

const process = [
  {
    title: "Facility intake",
    description:
      "Share the address, square footage, business type, occupied hours, requested frequency, security requirements, and known problem areas.",
  },
  {
    title: "Walkthrough",
    description:
      "We review restrooms, breakrooms, offices, common areas, floors, trash volume, access, storage, and service-window constraints.",
  },
  {
    title: "Written proposal",
    description:
      "The proposal defines the task list, frequency, exclusions, supplies or consumables responsibility, price, and start conditions.",
  },
  {
    title: "Start with one cleaning",
    description:
      "We can discuss a paid first cleaning before you agree to a recurring schedule.",
  },
];

const faqs = [
  {
    question: "Which commercial properties do you clean?",
    answer:
      "We evaluate offices, professional suites, retail spaces, small commercial facilities, property-management spaces, and similar workplaces within the approved route area. Medical, dental, and other specialized facilities are welcome to reach out: the walkthrough is where we confirm what the space needs and whether we are the right fit. Industrial, food-production, and hazardous environments may need work outside our scope, and we will say so directly.",
  },
  {
    question: "Do you provide nightly janitorial service?",
    answer:
      "Tell us how often you need service and when the building is accessible. We review the facility and confirm the available schedule before you agree to ongoing cleaning.",
  },
  {
    question: "Are paper products and restroom consumables included?",
    answer:
      "Not automatically. The written proposal states whether the customer supplies consumables or asks New Star to price replenishment separately.",
  },
  {
    question: "Can you work after business hours?",
    answer:
      "Ask about the hours you need. We review available coverage, building access, keys, and alarm instructions before confirming an after-hours schedule.",
  },
  {
    question: "Can we start with one paid cleaning?",
    answer:
      "Yes. We can quote a paid first cleaning before you decide on ongoing visits.",
  },
];

const boundaries = [
  "Medical waste, biohazards, sharps, mold remediation, industrial contamination, and regulated cleanup are not standard commercial scope.",
  "Carpet extraction, stripping and waxing, floor refinishing, exterior high glass, pressure washing, and restoration are not included in routine cleaning.",
  "Customer-supplied consumables, alarm procedures, keys, storage, and access permissions must be settled before service begins.",
  "Recurring cleaning follows the task list and visit schedule in your proposal. Additional work is quoted separately.",
];

const quoteService = "Office / commercial cleaning";
const source = "organic_commercial_cleaning_service";
const pagePath = "/services/commercial-cleaning";
const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&source=${source}`;

export default function CommercialCleaningPage() {
  return (
    <div className="site-reference">
      <SiteHero
        eyebrow="Office and facility cleaning"
        title="Office and commercial cleaning in Fresno, CA"
        description="A clean workplace. A clear task list. One-time or recurring cleaning for offices, professional suites, retail spaces, and property-managed shared areas."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      >
        <div className="site-actions">
          <a href="#quote" className="home-button">Request a walkthrough <span aria-hidden="true">↗</span></a>
          <a href={business.phoneHref} className="home-text-link">Call {business.phoneDisplay}</a>
        </div>
        <p className="site-note">Fresno &amp; Clovis. Madera appointments depend on route availability.</p>
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="commercial-request-title">
        <div className="site-copy">
          <h2 id="commercial-request-title">Tell us about<br />your workplace.</h2>
          <p className="site-intro">We review the space, access, frequency, and service window before confirming the work. Your proposal puts the task list, schedule, and price in writing.</p>
          <p className="site-note">You can start with one paid cleaning before agreeing to recurring visits.</p>
          <div className="site-links"><Link href={quoteHref}>Open the standalone request ↗</Link></div>
        </div>
        <div id="quote" className="site-form-panel">
          <CommercialQuoteForm defaultService={quoteService} source={source} title="Request a walkthrough" subtitle="Share your facility details. We confirm scope and availability before proposing work." />
        </div>
      </section>

      <section id="whats-included" className="site-section site-split site-rule" aria-labelledby="commercial-scope-title">
        <div className="site-copy">
          <h2 id="commercial-scope-title">The everyday cleaning<br />your workplace needs.</h2>
          <p className="site-intro">Start with the spaces that matter most to your staff and visitors. During the walkthrough, we agree on the areas to clean, how often, and the best time to work.</p>
        </div>
        <div className="site-disclosures">
          {scopes.map((scope) => <details key={scope.title}><summary>{scope.title}</summary><p>{scope.description}</p></details>)}
          <details><summary>Service limits and site preparation</summary><ul>{boundaries.map((item) => <li key={item}>{item}</li>)}</ul></details>
          <details><summary>From walkthrough to start date</summary><dl>{process.map((step) => <div key={step.title}><dt>{step.title}</dt><dd>{step.description}</dd></div>)}</dl></details>
        </div>
      </section>

      <section className="site-section site-split site-rule" aria-labelledby="commercial-faq-title">
        <div>
          <h2 id="commercial-faq-title">Before the walkthrough.</h2>
          <div className="site-links"><Link href="/services/post-construction-cleaning">Finishing a build or renovation? ↗</Link></div>
        </div>
        <div className="site-disclosures">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: business.siteUrl },
        { name: "Services", url: `${business.siteUrl}/services` },
        { name: "Office & Commercial Cleaning", url: `${business.siteUrl}${pagePath}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "Office & Commercial Cleaning",
        serviceType: "Commercial cleaning and office cleaning", url: `${business.siteUrl}${pagePath}`,
        provider: { "@id": `${business.siteUrl}/#localbusiness` }, areaServed: businessAreaServed,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
    </div>
  );
}

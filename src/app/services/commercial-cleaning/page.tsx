import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import ProofRow from "@/components/ProofRow";
import MarketPhone from "@/components/MarketPhone";
import Icon from "@/components/Icon";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { business, businessAreaServed } from "@/lib/business";

const pageDescription =
  "Office and commercial cleaning in Fresno, Clovis, and Madera for professional offices, clinics, behavioral-health and recovery residences, retail, and shared spaces. General liability insured.";

export const metadata: Metadata = {
  title: "Office & Commercial Cleaning in Fresno & Clovis",
  description: pageDescription,
  alternates: { canonical: "/services/commercial-cleaning" },
  ...socialMetadata({
    title: "Office & Commercial Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Walkthrough-based office, clinic, and commercial cleaning proposals for Fresno, Clovis, and Madera. We carry general liability insurance.",
    url: "https://newstarcleaning.com/services/commercial-cleaning",
  }),
};

const scopes = [
  {
    title: "Offices and common areas",
    description:
      "Reception areas, conference rooms, cleared desks, high-touch doors and switches, interior entry glass, and trash removal. Private work materials stay undisturbed.",
  },
  {
    title: "Restrooms and breakrooms",
    description:
      "Toilets, sinks, counters, mirrors, breakroom tables, appliance exteriors, touchpoints, trash liners, and floors — scheduled around your daily staff and visitor traffic.",
  },
  {
    title: "Recurring floor care",
    description:
      "Consistent vacuuming, sweeping, and damp mopping suited to tile, LVP, hardwood, and office carpet. Carpet shampooing can be scoped as an add-on; stripping, waxing, and restoration are separate trades.",
  },
];

const industries = [
  {
    title: "Offices & professional suites",
    description:
      "Law, accounting, real estate, insurance, and small business offices needing reliable after-hours or weekly upkeep.",
  },
  {
    title: "Medical, dental & recovery facilities",
    description:
      "Outpatient clinics, therapy practices, behavioral-health offices, and recovery residences needing thorough cleaning of lobbies, offices, restrooms, kitchens, and common rooms (excluding regulated medical waste).",
  },
  {
    title: "Retail & customer-facing spaces",
    description:
      "Showrooms, salons, studios, and neighborhood storefronts where entry glass, restrooms, and clean floors shape first impressions.",
  },
  {
    title: "Property management & multi-unit common areas",
    description:
      "Leasing offices, clubhouses, hallways, laundry rooms, and unit turnovers across Fresno, Clovis, and Madera.",
  },
];

const process = [
  {
    title: "1. Quick facility intake",
    description:
      "Share your address, approximate square footage, facility type, preferred schedule, and priority areas.",
  },
  {
    title: "2. On-site walkthrough or photo review",
    description:
      "We walk the restrooms, breakrooms, offices, common areas, and floors with you and note keys, alarms, and access windows.",
  },
  {
    title: "3. Clear written proposal",
    description:
      "You receive a written task list, visit frequency, consumables responsibility, exclusions, and transparent pricing before anything starts.",
  },
  {
    title: "4. Start with one paid clean",
    description:
      "Test our crew on a single paid visit before committing to a weekly, multi-day, or monthly recurring schedule.",
  },
];

const faqs = [
  {
    question: "Which commercial properties do you clean in Fresno and Clovis?",
    answer:
      "We clean offices, professional suites, retail spaces, property-management common areas, and residential-style commercial facilities across Fresno, Clovis, and Madera. Medical, dental, behavioral-health, and recovery residences are welcome to reach out — during the walkthrough we confirm the exact task list and verify we are the right fit. Industrial, food-production, and biohazard environments require specialty vendors.",
  },
  {
    question: "Are you insured for commercial buildings?",
    answer:
      "Yes. We carry general liability insurance for our cleaning operations. Let us know during the walkthrough if your building manager or lease requires documentation before start.",
  },
  {
    question: "Do you provide nightly or after-hours janitorial service?",
    answer:
      "Tell us how often you need service and when your building is accessible. We review your schedule, keys, and alarm procedures during the walkthrough and confirm an after-hours or daytime window in writing.",
  },
  {
    question: "Are paper products and restroom consumables included?",
    answer:
      "Not automatically. Most clients supply their own paper goods and soap, and our crew restocks from your supply closet. If you want New Star to handle replenishment, we can price that in the proposal.",
  },
  {
    question: "Can we start with one paid cleaning before a recurring schedule?",
    answer:
      "Yes. Many offices and facility directors start with one paid initial cleaning to inspect our work before setting up recurring weekly or multi-day visits.",
  },
];

const boundaries = [
  "Regulated medical waste, biohazards, sharps, mold remediation, and industrial contamination are outside our commercial scope.",
  "Floor stripping and waxing, refinishing, exterior high glass, pressure washing, and restoration work are not part of routine janitorial cleaning.",
  "Supplies, consumables, keys, alarm codes, and after-hours building access are confirmed in writing before service begins.",
  "Recurring visits follow the agreed written task list. One-off add-ons such as carpet shampooing or interior glass are quoted separately.",
];

const heroPoints = [
  "We carry general liability insurance",
  "Walkthrough or photo review before we quote",
  "Written task list, schedule, and price — no surprises",
  "Start with one paid cleaning before any recurring plan",
];

const quoteService = "Office / commercial cleaning";
const source = "organic_commercial_cleaning_service";
const pagePath = "/services/commercial-cleaning";
const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&source=${source}`;

export default function CommercialCleaningPage() {
  return (
    <div className="site-reference">
      <SiteHero
        eyebrow="Office & facility cleaning"
        title="Office & commercial cleaning in Fresno & Clovis."
        description="Consistent, walkthrough-scoped cleaning for Fresno, Clovis, and Madera offices, clinics, behavioral-health and recovery residences, retail spaces, and shared facilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        tone="dark"
        proof={<ProofRow tone="dark" />}
        aside={
          <div className="rounded-[var(--radius-card)] border border-on-dark-line bg-white/5 p-6 text-on-dark">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">Commercial walkthrough summary</p>
            <h2 className="mt-2 text-xl font-bold text-white">Built around your facility and schedule.</h2>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed text-on-dark-soft">
              <div>
                <dt className="font-semibold text-white">Service area</dt>
                <dd>Fresno, Clovis, Madera, and North Fresno business corridors.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Insurance</dt>
                <dd>We carry general liability insurance for every visit.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Scheduling</dt>
                <dd>Daytime, after-hours, weekly, multi-day, or one-time trial cleans.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Pricing</dt>
                <dd>Walkthrough or photo review followed by a clear written proposal.</dd>
              </div>
            </dl>
          </div>
        }
      >
        <ul className="site-hero-points [&_li]:text-on-dark-soft [&_.ns-icon]:text-gold">
          {heroPoints.map((point) => <li key={point}><Icon name="check" />{point}</li>)}
        </ul>
        <div className="site-actions">
          <a href="#quote" className="home-button">Request a walkthrough <span aria-hidden="true">→</span></a>
          <MarketPhone className="site-hero-phone" location="commercial_service_hero">Call </MarketPhone>
        </div>
        <p className="site-note text-on-dark-mute">Serving Fresno, Clovis &amp; Madera.</p>
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="commercial-request-title">
        <div className="site-copy">
          <h2 id="commercial-request-title">Tell us about<br />your workplace.</h2>
          <p className="site-intro">We review your space, access, frequency, and priority areas before sending a written proposal. We carry general liability insurance and bring our own cleaning supplies.</p>
          <p className="site-note">Start with one paid cleaning to verify our work before agreeing to recurring visits.</p>
          <div className="site-links">
            <Link href={quoteHref}>Open the standalone request ↗</Link>
          </div>
        </div>
        <div id="quote" className="site-form-panel">
          <CommercialQuoteForm defaultService={quoteService} source={source} title="Request a walkthrough" subtitle="Share your facility details. We confirm scope and schedule before proposing work." />
        </div>
      </section>

      <section id="whats-included" className="site-muted" aria-labelledby="commercial-scope-title">
        <div className="site-section">
          <div className="site-copy">
            <p className="ns-kicker">What&apos;s covered</p>
            <h2 id="commercial-scope-title" className="mt-2">The everyday cleaning your workplace needs.</h2>
            <p className="site-intro">During the walkthrough, we build a clear room-by-room task list around your staff, clients, and operating hours.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {scopes.map((scope) => (
              <article key={scope.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h3>{scope.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{scope.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 site-disclosures">
            <details>
              <summary>Service limits and site preparation</summary>
              <ul>{boundaries.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          </div>
        </div>
      </section>

      <section className="site-section" aria-labelledby="commercial-industries-title">
        <div className="site-copy">
          <p className="ns-kicker">Industries &amp; facilities</p>
          <h2 id="commercial-industries-title" className="mt-2">Industries &amp; facilities we clean.</h2>
          <p className="site-intro">Locally owned in Fresno and responsive when your facility needs change. We work directly with office managers, clinic directors, and property managers.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {industries.map((item) => (
            <article key={item.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h3>{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-muted" aria-labelledby="commercial-process-title">
        <div className="site-section">
          <div className="site-copy">
            <p className="ns-kicker">How it works</p>
            <h2 id="commercial-process-title" className="mt-2">From walkthrough to start date.</h2>
          </div>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <li key={step.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-section site-split site-rule" aria-labelledby="commercial-faq-title">
        <div>
          <h2 id="commercial-faq-title">Before the walkthrough.</h2>
          <p className="site-note">We serve workplaces across our core Central Valley footprint:</p>
          <div className="site-links">
            <Link href="/cleaning-services-fresno">Cleaning services in Fresno</Link>
            <Link href="/cleaning-services-clovis">Cleaning services in Clovis</Link>
            <Link href="/cleaning-services-madera">Cleaning services in Madera</Link>
          </div>
          <div className="site-links">
            <Link href="/services/post-construction-cleaning">Finishing a build or renovation? ↗</Link>
          </div>
        </div>
        <div className="site-disclosures">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: business.siteUrl },
        { name: "Services", url: `${business.siteUrl}/services` },
        { name: "Office & Commercial Cleaning", url: `${business.siteUrl}${pagePath}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${business.siteUrl}${pagePath}#service`,
        name: "Office & Commercial Cleaning",
        serviceType: "Commercial cleaning and office cleaning",
        description: pageDescription,
        url: `${business.siteUrl}${pagePath}`,
        provider: { "@id": `${business.siteUrl}/#localbusiness` },
        areaServed: businessAreaServed,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
    </div>
  );
}

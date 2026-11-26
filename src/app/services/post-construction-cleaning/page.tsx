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
  "Post-construction and remodel final cleaning in Fresno, Clovis, and Madera for builders, general contractors, remodelers, and property owners. General liability insured.";

export const metadata: Metadata = {
  title: "Post-Construction & Remodel Cleaning in Fresno & Clovis",
  description: pageDescription,
  alternates: { canonical: "/services/post-construction-cleaning" },
  ...socialMetadata({
    title: "Post-Construction & Remodel Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Scoped final interior cleaning, detail cleaning, and punch-return support for Fresno, Clovis, and Madera construction and renovation projects.",
    url: "https://newstarcleaning.com/services/post-construction-cleaning",
  }),
};

const scopes = [
  {
    title: "Final interior clean",
    description:
      "Once dusty trades wrap up, we remove fine construction dust across accessible horizontal surfaces, kitchens, bathrooms, fixtures, trim, doors, baseboards, and finished floors.",
  },
  {
    title: "Turnover & presentation detail",
    description:
      "Empty cabinet and drawer interiors, appliance surfaces, closet shelving, reachable interior glass, manufacturer stickers, and light adhesive residue scoped cleanly into your written proposal.",
  },
  {
    title: "Punch-return visit",
    description:
      "Need a second pass after final trade touch-ups or client walkthroughs? We can price a targeted punch-return visit once trade traffic is complete.",
  },
];

const projectTypes = [
  {
    title: "New custom & production homes",
    description:
      "Pre-closing final cleans across Fresno, Clovis, and Madera residential builds so buyers walk into a clean, dust-free home.",
  },
  {
    title: "Kitchen, bath & full-home remodels",
    description:
      "Detailed dust removal for remodelers and homeowners wrapping up cabinetry, tile, flooring, or paint upgrades.",
  },
  {
    title: "Commercial tenant improvements & offices",
    description:
      "Final interior handoff cleans for offices, clinics, and retail buildouts ahead of furniture delivery and opening day.",
  },
  {
    title: "Property-management renovations & turns",
    description:
      "Post-rehab cleaning for renovated rentals, duplexes, and multi-unit properties ready for leasing photos and move-in.",
  },
];

const process = [
  {
    title: "1. Project intake",
    description:
      "Share the job address, square footage, build stage, required handoff date, site contact, and a few current photos or plans.",
  },
  {
    title: "2. Walkthrough & scope",
    description:
      "We separate final clean, interior glass/sticker detail, and any return visits so the proposal matches the actual site condition.",
  },
  {
    title: "3. Written proposal",
    description:
      "You get included rooms, exclusions, utility/access assumptions, price, and handoff timing in writing before we put a crew on the calendar.",
  },
  {
    title: "4. Handoff check",
    description:
      "Completed work is checked against the written scope. New dust created by later trade work can be handled as a separate return visit.",
  },
];

const faqs = [
  {
    question: "Do you provide post-construction cleaning for new homes and remodels in Fresno and Clovis?",
    answer:
      "Yes. We clean newly built homes, kitchen and whole-home remodels, and commercial tenant improvements across Fresno, Clovis, and Madera. We review the site or photos first so your proposal matches the condition and handoff deadline.",
  },
  {
    question: "Are you insured to work on active builder or contractor job sites?",
    answer:
      "Yes. We carry general liability insurance. Share any site-entry or vendor documentation requirements during intake so we have everything ready before start.",
  },
  {
    question: "Is construction debris hauling included?",
    answer:
      "No. Contractors should clear lumber, drywall scraps, packaging, sharp debris, and bulk waste before final cleaning begins so our crew can focus on fine dust and finish surfaces.",
  },
  {
    question: "Can final window cleaning be included?",
    answer:
      "Reachable interior glass, sills, and accessible tracks can be scoped into your proposal. Exterior elevations, lifts, roof access, high ladder work, and damaged glass are separate specialty services.",
  },
  {
    question: "When should the final clean be scheduled?",
    answer:
      "Schedule final cleaning after dusty trades and major touch-ups are substantially complete, utilities (water and power) are on, surfaces are cured, and bulk debris is cleared.",
  },
  {
    question: "Can we start with one paid project?",
    answer:
      "Yes. Many builders and remodelers start with one home, unit, or remodel phase to test our crew before using us on ongoing projects.",
  },
];

const boundaries = [
  "No hazardous dust, lead, asbestos, mold remediation, biohazards, active demolition, or unsafe unfinished areas.",
  "Bulk construction debris, sharp materials, paint disposal, and hauling remain the contractor’s responsibility.",
  "Exterior elevations, lifts, roof access, high glass, pressure washing, floor refinishing, and restoration are not part of final interior cleaning.",
  "The site needs working utilities, safe access, cured surfaces, and major dusty trades substantially complete before final cleaning.",
];

const heroPoints = [
  "We carry general liability insurance",
  "Walkthrough or photo review before we quote",
  "Scope, handoff deadline, and price in writing",
  "Start with one home, unit, or project phase",
];

const quoteService = "Post-construction cleaning";
const source = "organic_post_construction_service";
const pagePath = "/services/post-construction-cleaning";
const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&source=${source}`;

export default function PostConstructionCleaningPage() {
  return (
    <div className="site-reference">
      <SiteHero
        eyebrow="Fresno & Clovis project cleaning"
        title="Post-construction cleaning in Fresno & Clovis."
        description="Final interior cleaning for new homes, remodels, and commercial tenant improvements across Fresno, Clovis, and Madera — scoped in writing around your handoff date."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
        tone="dark"
        proof={<ProofRow tone="dark" />}
        aside={
          <div className="rounded-[var(--radius-card)] border border-on-dark-line bg-white/5 p-6 text-on-dark">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-gold">Handoff summary</p>
            <h2 className="mt-2 text-xl font-bold text-white">Clean, dust-free handoffs on deadline.</h2>
            <dl className="mt-4 space-y-3 text-sm leading-relaxed text-on-dark-soft">
              <div>
                <dt className="font-semibold text-white">Service area</dt>
                <dd>Fresno, Clovis, Madera, and North Fresno job sites.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Insurance</dt>
                <dd>We carry general liability insurance.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Scope options</dt>
                <dd>Final interior clean, turnover detail, and punch-return visits.</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Proposals</dt>
                <dd>Site walkthrough or photo review with clear written pricing.</dd>
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
          <MarketPhone className="site-hero-phone" location="construction_service_hero">Call </MarketPhone>
        </div>
        <p className="site-note text-on-dark-mute">Serving Fresno, Clovis &amp; Madera.</p>
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="construction-request-title">
        <div className="site-copy">
          <h2 id="construction-request-title">What is the<br />handoff date?</h2>
          <p className="site-intro">For builders, general contractors, remodelers, and property owners preparing for occupancy. We carry general liability insurance, bring our own supplies, and confirm scope and timing in writing.</p>
          <p className="site-note">Start with one paid home, unit, renovation, or project phase. Interior glass detail and return visits are scoped clearly upfront.</p>
          <div className="site-links"><Link href={quoteHref}>Open the standalone request ↗</Link></div>
        </div>
        <div id="quote" className="site-form-panel">
          <CommercialQuoteForm defaultService={quoteService} source={source} title="Request a project walkthrough" subtitle="Share the site details and required handoff date. We confirm scope and schedule before proposing work." />
        </div>
      </section>

      <section id="whats-included" className="site-muted" aria-labelledby="construction-scope-title">
        <div className="site-section">
          <div className="site-copy">
            <p className="ns-kicker">What&apos;s covered</p>
            <h2 id="construction-scope-title" className="mt-2">Final cleaning, ready for handoff.</h2>
            <p className="site-intro">Once dusty trades are finished and bulk debris is cleared, we focus on settled dust, fixtures, cabinetry, bathrooms, and finished floors.</p>
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

      <section className="site-section" aria-labelledby="construction-projects-title">
        <div className="site-copy">
          <p className="ns-kicker">Projects &amp; properties</p>
          <h2 id="construction-projects-title" className="mt-2">Industries &amp; projects we clean.</h2>
          <p className="site-intro">From single-home remodels in Fig Garden and Clovis to commercial tenant improvements across Fresno, we match crew size to your walkthrough date.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {projectTypes.map((item) => (
            <article key={item.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h3>{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-muted" aria-labelledby="construction-process-title">
        <div className="site-section">
          <div className="site-copy">
            <p className="ns-kicker">How it works</p>
            <h2 id="construction-process-title" className="mt-2">From project intake to handoff.</h2>
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

      <section className="site-section site-split site-rule" aria-labelledby="construction-faq-title">
        <div>
          <h2 id="construction-faq-title">Before the final clean.</h2>
          <p className="site-note">We support job sites across our core service footprint:</p>
          <div className="site-links">
            <Link href="/cleaning-services-fresno">Cleaning services in Fresno</Link>
            <Link href="/cleaning-services-clovis">Cleaning services in Clovis</Link>
            <Link href="/cleaning-services-madera">Cleaning services in Madera</Link>
          </div>
          <div className="site-links">
            <Link href="/services/commercial-cleaning">Need ongoing workplace cleaning? ↗</Link>
          </div>
        </div>
        <div className="site-disclosures">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: business.siteUrl },
        { name: "Services", url: `${business.siteUrl}/services` },
        { name: "Post-Construction Cleaning", url: `${business.siteUrl}${pagePath}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${business.siteUrl}${pagePath}#service`,
        name: "Post-Construction Cleaning",
        serviceType: "Post-construction cleaning",
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

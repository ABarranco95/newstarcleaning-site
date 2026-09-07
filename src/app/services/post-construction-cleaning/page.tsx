import type { Metadata } from "next";
import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { business, businessAreaServed } from "@/lib/business";

export const metadata: Metadata = {
  title: "Post-Construction Cleaning in Fresno, CA",
  description:
    "Post-construction final cleaning for Fresno-area builders, remodelers, property owners, and project teams. Request a scoped walkthrough and written proposal.",
  alternates: { canonical: "/services/post-construction-cleaning" },
  openGraph: {
    title: "Post-Construction Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Scoped final cleaning, detail cleaning, and punch-return support for Fresno-area construction and renovation projects.",
    url: "https://newstarcleaning.com/services/post-construction-cleaning",
  },
};

const scopes = [
  {
    title: "Final interior clean",
    description:
      "Dust and debris remaining after trades are substantially complete are addressed across accessible horizontal surfaces, kitchens, bathrooms, fixtures, trim, doors, and finished floors.",
  },
  {
    title: "Turnover detail",
    description:
      "Cabinet interiors, appliance surfaces, closet shelving, reachable glass, labels, light adhesive residue, and presentation details are included only when written into the approved scope.",
  },
  {
    title: "Punch-return visit",
    description:
      "A separate return can be priced after final trade corrections or inspections. The proposal defines which areas are being revisited and what new construction dust is included.",
  },
];

const process = [
  {
    title: "Project intake",
    description:
      "Share the address, square footage, construction stage, required handoff date, access rules, site contact, and current photos or plans.",
  },
  {
    title: "Walkthrough and scope",
    description:
      "We separate rough, final, glass/detail, and return work so the proposal reflects the actual condition and deadline.",
  },
  {
    title: "Written proposal",
    description:
      "The proposal lists included areas, exclusions, access assumptions, price, and timing before a crew is scheduled.",
  },
  {
    title: "Handoff check",
    description:
      "Completed work is checked against the written scope. Newly created dust or trade work after cleaning is handled as a separate return scope.",
  },
];

const faqs = [
  {
    question: "Do you provide post-construction cleaning for new homes and remodels?",
    answer:
      "Yes, when the project, condition, access, deadline, and crew capacity fit. We review the site before confirming a final-clean or renovation-cleaning proposal.",
  },
  {
    question: "Is construction debris hauling included?",
    answer:
      "No. Contractors should remove lumber, drywall, packaging, sharp debris, hazardous material, and bulk waste before the cleaning phase unless a separate disposal scope is expressly approved.",
  },
  {
    question: "Can final window cleaning be included?",
    answer:
      "Reachable interior glass and selected accessible window detail can be scoped. Exterior elevations, lifts, roof access, high ladder work, damaged glass, and specialized restoration are not automatically included.",
  },
  {
    question: "When should the final clean be scheduled?",
    answer:
      "After dusty trades and major corrections are substantially complete, utilities are working, surfaces are cured, debris is removed, and controlled access is available. Continued trade traffic can create a separate punch-return need.",
  },
  {
    question: "Can we start with one paid project?",
    answer:
      "Yes. We can quote one home, unit, renovation, or part of a project before discussing ongoing work.",
  },
];

const boundaries = [
  "No hazardous dust, lead, asbestos, mold remediation, biohazards, active demolition, or unsafe unfinished areas.",
  "Bulk construction debris, sharp materials, paint disposal, and hauling remain the contractor’s responsibility unless separately approved.",
  "Exterior elevations, lifts, roof access, high glass, pressure washing, floor refinishing, and restoration are not part of final interior cleaning.",
  "The site needs working utilities, safe access, cured surfaces, and major dusty trades substantially complete before final cleaning.",
];

const quoteService = "Post-construction cleaning";
const source = "organic_post_construction_service";
const pagePath = "/services/post-construction-cleaning";
const quoteHref = `/commercial-quote?service=${encodeURIComponent(quoteService)}&source=${source}`;

export default function PostConstructionCleaningPage() {
  return (
    <div className="site-reference">
      <SiteHero
        eyebrow="Fresno-area project cleaning"
        title="Post-construction cleaning in Fresno, CA"
        description="The build is nearly finished. Get the space ready for handoff with final interior cleaning for new homes, remodels, and tenant improvements. Scope and deadline confirmed before scheduling."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]}
      >
        <div className="site-actions">
          <a href="#quote" className="home-button">Request a walkthrough <span aria-hidden="true">↗</span></a>
          <a href={business.phoneHref} className="home-text-link">Call {business.phoneDisplay}</a>
        </div>
        <p className="site-note">Fresno &amp; Clovis. Madera appointments depend on route availability.</p>
      </SiteHero>

      <section className="site-section site-split site-rule" aria-labelledby="construction-request-title">
        <div className="site-copy">
          <h2 id="construction-request-title">What is the<br />handoff date?</h2>
          <p className="site-intro">For builders, remodelers, property owners, and project teams preparing for occupancy. Tell us the construction stage, site condition, and deadline. We review the project before confirming a crew.</p>
          <p className="site-note">Start with one paid home, unit, renovation, or part of a project. Glass detail and return visits are scoped separately.</p>
          <div className="site-links"><Link href={quoteHref}>Open the standalone request ↗</Link></div>
        </div>
        <div id="quote" className="site-form-panel">
          <CommercialQuoteForm defaultService={quoteService} source={source} title="Request a project walkthrough" subtitle="Share the site details and required handoff date. We confirm scope and capacity before proposing work." />
        </div>
      </section>

      <section id="whats-included" className="site-section site-split site-rule" aria-labelledby="construction-scope-title">
        <div className="site-copy">
          <h2 id="construction-scope-title">Final cleaning.<br />Ready for handoff.</h2>
          <p className="site-intro">Once dusty trades are finished and bulk debris is removed, we focus on settled dust, fixtures, cabinetry, bathrooms, and finished floors. Your written proposal defines the included areas and return work.</p>
        </div>
        <div className="site-disclosures">
          {scopes.map((scope) => <details key={scope.title}><summary>{scope.title}</summary><p>{scope.description}</p></details>)}
          <details><summary>Service limits and site preparation</summary><ul>{boundaries.map((item) => <li key={item}>{item}</li>)}</ul></details>
          <details><summary>From project intake to handoff</summary><dl>{process.map((step) => <div key={step.title}><dt>{step.title}</dt><dd>{step.description}</dd></div>)}</dl></details>
        </div>
      </section>

      <section className="site-section site-split site-rule" aria-labelledby="construction-faq-title">
        <div>
          <h2 id="construction-faq-title">Before the final clean.</h2>
          <div className="site-links"><Link href="/services/commercial-cleaning">Need ongoing workplace cleaning? ↗</Link></div>
        </div>
        <div className="site-disclosures">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <BreadcrumbSchema items={[
        { name: "Home", url: business.siteUrl },
        { name: "Services", url: `${business.siteUrl}/services` },
        { name: "Post-Construction Cleaning", url: `${business.siteUrl}${pagePath}` },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service", name: "Post-Construction Cleaning",
        serviceType: "Post-construction cleaning", url: `${business.siteUrl}${pagePath}`,
        provider: { "@id": `${business.siteUrl}/#localbusiness` }, areaServed: businessAreaServed,
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      }) }} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import HomeServices from "@/components/HomeServices";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import {
  clientPrepChecklist,
  getFullIncludedList,
  serviceLimitations,
  services,
} from "@/lib/services";

const siteUrl = "https://newstarcleaning.com";

export const metadata: Metadata = {
  title: "House Cleaning Service Checklist",
  description:
    "See New Star Cleaning's standard, deep, and move-out cleaning scope, available add-ons, exclusions, and client prep checklist.",
  alternates: {
    canonical: "/checklist",
  },
  openGraph: {
    title:
      "Service Checklist: Included, Add-Ons, Not Included | New Star Cleaning",
    description:
      "Clear room-by-room cleaning scope for Fresno, Clovis, and Madera homes, including what is not part of our cleaning service.",
    url: `${siteUrl}/checklist`,
  },
};

const serviceLinks = {
  "standard-cleaning": "/services/standard-cleaning",
  "deep-cleaning": "/services/deep-cleaning",
  "move-out-cleaning": "/services/move-out-cleaning",
} as const;

const faqs = [
  {
    question: "Do you do laundry, dishes, organizing, or bed making?",
    answer:
      "No. New Star Cleaning is a cleaning service, not a household task service. We do not wash dishes, load dishwashers, do laundry, fold clothes, change linens, make beds, organize belongings, pack, or unpack.",
  },
  {
    question: "Are add-ons included automatically?",
    answer:
      "No. Add-ons are only included when they are requested before the appointment and listed in the confirmed quote. This protects the time window, price, and cleaner workload.",
  },
  {
    question: "Which detail items are optional?",
    answer:
      "The inside of the oven and refrigerator, plus interior window glass and tracks, are optional add-ons. Cabinet and drawer interiors are optional for standard and deep cleaning, but included when empty on move-in/move-out cleaning. The inside of an empty microwave is included when accessible. Move-outs can also add garage or patio sweeping, extra blind detail, and heavy-buildup time. Whatever you select is written into the quote, so the appointment has the hours to cover it.",
  },
  {
    question: "Does deep cleaning include every add-on?",
    answer:
      "No. Deep cleaning includes more detail than standard cleaning, such as baseboards, reachable vents, trim, fixtures, and buildup areas. The inside of the oven and refrigerator, cabinet interiors, and interior window glass are add-ons unless the quote specifically includes them.",
  },
  {
    question: "Does move-out cleaning guarantee a deposit return?",
    answer:
      "No. We clean against a clear move-out scope, but a landlord or property manager controls deposit decisions. Damage, repairs, paint, carpet condition, lease rules, and wear are outside our control.",
  },
  {
    question: "What should I do before the cleaner arrives?",
    answer:
      "Please pick up loose items, clothing, toys, paperwork, dishes, valuables, and personal belongings so surfaces are accessible. For move-out cleaning, empty appliances, cabinets, drawers, closets, and rooms before the visit.",
  },
  {
    question: "What if the home has heavy buildup?",
    answer:
      "Heavy buildup can require deep cleaning, extra time, or a custom quote. Some stains, hard-water damage, mold, paint, grease damage, or worn surfaces may not fully come clean with normal cleaning.",
  },
];

const comparisonRows = [
  { label: "Kitchen surfaces, sink, stovetop", standard: true, deep: true, moveOut: true },
  { label: "Bathrooms (toilet, tub, shower, vanity)", standard: true, deep: true, moveOut: true },
  { label: "Floors vacuumed and mopped", standard: true, deep: true, moveOut: true },
  { label: "Dusting of accessible surfaces", standard: true, deep: true, moveOut: true },
  { label: "Light fixtures & ceiling fans dusted", standard: true, deep: true, moveOut: true },
  { label: "Trash emptied", standard: true, deep: true, moveOut: true },
  { label: "Baseboards wiped", standard: false, deep: true, moveOut: true },
  { label: "Vent covers, switch plates, trim wiped", standard: false, deep: true, moveOut: true },
  { label: "Door frames & fronts detailed", standard: false, deep: true, moveOut: true },
  { label: "Reachable grout & buildup detail", standard: false, deep: true, moveOut: true },
  { label: "Under furniture vacuumed", standard: false, deep: true, moveOut: true },
  { label: "Floor edges & corners detailed", standard: false, deep: true, moveOut: true },
  { label: "Inside microwave (when empty)", standard: true, deep: true, moveOut: true },
  { label: "Blinds dusted", standard: false, deep: false, moveOut: true },
  { label: "Closet shelves & rods wiped", standard: false, deep: false, moveOut: true },
  { label: "Empty cabinet & drawer interiors", standard: false, deep: false, moveOut: true },
  { label: "Dishwasher interior checked", standard: false, deep: false, moveOut: true },
  { label: "Range hood cleaned", standard: true, deep: true, moveOut: true },
  { label: "Range hood filter degreased", standard: false, deep: false, moveOut: true },
];

export default function ChecklistPage() {
  return (
    <div className="site-reference">
      <header className="site-document"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link></nav><p className="home-kicker">Service checklist</p><h1>Included. Optional. Not part of the job.</h1><p className="site-intro">Compare the three services, then open the room-by-room list. We confirm the work and price before your appointment.</p><div className="site-actions"><a href="#services" className="home-button">See the full checklists ↓</a><Suspense fallback={<Link href="/book-now" className="home-text-link">Request a quote</Link>}><HomeQuoteLink className="home-text-link">Request a quote</HomeQuoteLink></Suspense></div></header>
      <section className="site-section" aria-label="Compare cleaning services"><Suspense fallback={<div className="site-section"><Link href="/services" className="home-text-link">Compare cleaning services ↗</Link></div>}><HomeServices /></Suspense></section>
      <section id="services" className="site-section site-rule"><div className="site-split"><h2>The full scope.</h2><p className="site-intro">Oven and refrigerator interiors, interior window glass, and tracks are optional. Empty cabinet, drawer, and closet interiors are included in move-out cleaning.</p></div><div className="site-disclosures">
        <details><summary>Compare all three services</summary><div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Service comparison table"><table className="site-comparison"><caption>Included in the base cleaning scope</caption><thead><tr><th scope="col">Work</th><th scope="col">Standard</th><th scope="col">Deep</th><th scope="col">Move-out</th></tr></thead><tbody>{comparisonRows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.standard ? "Included" : "—"}</td><td>{row.deep ? "Included" : "—"}</td><td>{row.moveOut ? "Included" : "—"}</td></tr>)}</tbody></table></div></details>
        {services.map(service => <details key={service.slug}><summary>{service.name}</summary><p>{service.description}</p><ul className="site-list">{service.scopeNotes.map(note => <li key={note}>{note}</li>)}</ul>{getFullIncludedList(service.slug).map(group => <div key={group.title}><h3>{group.title}</h3><ul className="site-list">{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}<h3>Optional additions</h3>{service.availableAddOns.map(addOn => <p key={addOn.title}><strong>{addOn.title}.</strong> {addOn.description}</p>)}<Link href={serviceLinks[service.slug]} className="home-text-link">{service.shortName} details ↗</Link></details>)}
        <details><summary>Not included</summary><p>We clean accessible rooms, surfaces, fixtures, and floors. Laundry, dishes, bed making, organizing, packing, moving furniture, and restoration are not part of our work.</p><ul className="site-list">{serviceLimitations.map(item => <li key={item}>{item}</li>)}</ul></details>
        <details><summary>Before the cleaner arrives</summary><ul className="site-list">{clientPrepChecklist.map(item => <li key={item}>{item}</li>)}</ul></details>
      </div></section>
      <section className="site-section site-split site-rule"><h2>Scope questions.</h2><div className="site-disclosures">{faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Service Checklist", url: `${siteUrl}/checklist` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import HomeBookingLink from "@/components/HomeBookingLink";
import ProofRow from "@/components/ProofRow";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import SiteHero from "@/components/SiteHero";

import { Suspense } from "react";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { kitchenSurfacesPhoto } from "@/lib/realWorkPhotos";
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
      "Room-by-room scope for standard, deep and move-out cleaning, the add-ons, and what isn't part of the job.",
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
      <SiteHero eyebrow="Service checklist" title="Included. Optional. Not part of the job." description="What each cleaning includes, what costs extra and what we don't do. It's the list we clean from." photo={kitchenSurfacesPhoto} proof={<ProofRow tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="site-actions"><HomeBookingLink onDark /><Suspense fallback={null}><HomeQuoteLink className="home-button-secondary">Get a quote by text</HomeQuoteLink></Suspense></div><a href="#services" className="home-text-link mt-4">Jump to the lists ↓</a>
      </SiteHero>
      <section id="services" className="site-section scroll-mt-24"><div className="ns-section-head"><div><p className="ns-kicker">Included</p><h2>What&apos;s included, room by room.</h2><p className="site-intro">Standard keeps a home up. Deep adds the detail work. Move-out adds the inside of every empty cabinet, drawer and closet.</p></div></div><div className="site-disclosures">
        {services.map((service, index) => <details key={service.slug} open={index === 0}><summary><h3>{service.name}</h3></summary><p>{service.description}</p><ul className="site-list">{service.scopeNotes.map((note) => <li key={note}>{note}</li>)}</ul><div className="my-8 grid gap-6 sm:grid-cols-2">{getFullIncludedList(service.slug).map((group) => <div key={group.title} className="rounded-[var(--radius-card)] border border-line p-6 last:sm:col-span-2"><h4 className="text-lg font-bold text-primary">{group.title}</h4><ul className="site-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div><Link href={serviceLinks[service.slug]} className="home-text-link">{service.shortName} details ↗</Link></details>)}
      </div></section>
      <section className="site-muted"><div className="site-section"><div className="ns-section-head"><div><p className="ns-kicker">Optional</p><h2>Add-ons, priced before the visit.</h2><p className="site-intro">An add-on is part of your cleaning only when you pick it before the appointment and it&apos;s in your confirmed price.</p></div></div><div className="grid gap-8 lg:grid-cols-3">{services.map((service) => <article key={service.slug}><h3>{service.name}</h3><dl className="mt-6 space-y-6">{service.availableAddOns.map((addOn) => <div key={addOn.title}><dt className="font-semibold">{addOn.title}</dt><dd className="mt-2 leading-relaxed">{addOn.description}</dd></div>)}</dl></article>)}</div></div></section>
      <section className="site-section site-split"><div><p className="ns-kicker">Not included</p><h2 className="mt-3">Not part of the job.</h2><p className="site-intro">We clean rooms, surfaces, fixtures and floors. Laundry, dishes, bed making, organizing, packing, moving furniture, and restoration aren&apos;t part of it.</p></div><div className="site-disclosures"><details open><summary>Not included</summary><ul className="site-list">{serviceLimitations.map((item) => <li key={item}>{item}</li>)}</ul></details></div></section>
      <section className="site-muted"><div className="site-section"><div className="ns-section-head"><div><p className="ns-kicker">Compare</p><h2>Standard, deep and move-out, side by side.</h2></div></div><div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white" tabIndex={0} role="region" aria-label="Service comparison table"><table className="site-comparison"><caption>Included in the base cleaning scope</caption><thead><tr><th scope="col">Work</th><th scope="col">Standard</th><th scope="col">Deep</th><th scope="col">Move-out</th></tr></thead><tbody>{comparisonRows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.standard ? "Included" : "—"}</td><td>{row.deep ? "Included" : "—"}</td><td>{row.moveOut ? "Included" : "—"}</td></tr>)}</tbody></table></div></div></section>
      <section className="site-section site-split"><h2>Before we arrive.</h2><ul className="site-list">{clientPrepChecklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section className="site-muted"><div className="site-section site-split"><h2>Know what you need?</h2><Link href="/book-now" className="home-button justify-self-start">See your price →</Link></div></section>
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

import type { Metadata } from "next";
import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Request Commercial Cleaning Pricing",
  description:
    "Request a walkthrough for Fresno-area office, commercial, or post-construction cleaning.",
  alternates: { canonical: "/commercial-quote" },
  robots: { index: false, follow: true },
};

export default function CommercialQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-20 lg:pt-14">
          <div className="max-w-2xl lg:pt-4">
            <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="px-1.5">/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span className="px-1.5">/</span>
              <span className="font-semibold text-white">Commercial request</span>
            </nav>
            <span className="eyebrow eyebrow-dot text-accent-light">Walkthrough request</span>
            <h1 className="mt-4 text-4xl text-white lg:text-[3.4rem]">Tell us about the property or project.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              Share the location, service type, approximate square footage, required areas, timing, and best contact. We will confirm whether it fits current route and crew capacity before proposing work.
            </p>
            <div className="mt-7">
              <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
            </div>
          </div>
          <div id="quote-form" className="relative scroll-mt-24">
            <QuickQuoteForm
              title="Request a walkthrough"
              subtitle="Start with the site, service, timing, and contact details. We will ask only the follow-up questions needed to assess the opportunity."
              source="organic_commercial_quote_page"
              compact
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["1", "Site details", "Address, approximate square footage, business or project type, and deadline."],
            ["2", "Scope review", "A walkthrough or photo review determines the real task list, access, and exclusions."],
            ["3", "Written proposal", "Pricing, frequency, timing, and included work are confirmed before a start date."],
          ].map(([number, title, body]) => (
            <div key={number} className="border-l-2 border-primary pl-5">
              <span className="text-sm font-extrabold text-accent">0{number}</span>
              <h2 className="mt-2 text-xl text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import CommercialQuoteForm from "@/components/CommercialQuoteForm";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Request Commercial Cleaning Pricing",
  description:
    "Request a walkthrough for Fresno-area office, commercial, or post-construction cleaning.",
  alternates: { canonical: "/commercial-quote" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Request Commercial Cleaning Pricing | New Star Cleaning",
    description:
      "Walkthrough-based proposals for Fresno-area office, commercial, and post-construction cleaning.",
    url: "https://newstarcleaning.com/commercial-quote",
  },
};

export default function CommercialQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-14">
          <div className="max-w-2xl lg:pt-4">
            <nav className="mb-6 hidden text-sm text-white/70 lg:block" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="px-1.5">/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span className="px-1.5">/</span>
              <span className="font-semibold text-white">Commercial request</span>
            </nav>
            <span className="eyebrow text-accent-light">Fresno / Clovis / Madera</span>
            <h1 className="mt-3 text-3xl text-white lg:text-[3.4rem]">Let’s price your cleaning.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/80 lg:text-lg">
              Tell us about your workplace or project. We’ll arrange a walkthrough or photo review, then send a written proposal.
            </p>
            <div className="mt-7 hidden lg:block">
              <a href={business.phoneHref} className="btn btn-ghost-dark">Call {business.phoneDisplay}</a>
            </div>
          </div>
          <div id="quote-form" className="relative scroll-mt-24">
            <CommercialQuoteForm
              title="Property & contact details"
              subtitle="No payment or booking with this request."
              source="organic_commercial_quote_page"
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

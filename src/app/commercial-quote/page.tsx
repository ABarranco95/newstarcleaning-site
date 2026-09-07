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
    <div className="site-reference">
      <section className="site-form-layout"><div className="site-form-heading"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/services">Services</Link></nav><h1>Let’s price the work.</h1><p>Tell us about your workplace or project. We’ll arrange a walkthrough or photo review, then send a written proposal.</p><div className="site-links"><a href={business.phoneHref}>Call {business.phoneDisplay}</a></div></div><div id="quote-form" className="site-form-panel"><CommercialQuoteForm title="Property & contact details" subtitle="No payment or booking with this request." source="organic_commercial_quote_page" /></div></section>
      <section className="site-section site-split site-rule"><h2>Before a start date.</h2><p className="site-intro">We confirm the task list, access, exclusions, price, and schedule in writing. Fresno and Clovis are our core areas; Madera depends on route capacity.</p></section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import MarketPhone from "@/components/MarketPhone";
import ProofRow from "@/components/ProofRow";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import SiteHero from "@/components/SiteHero";
import { business, businessAreaServed } from "@/lib/business";
import { homeResultPhotos } from "@/lib/realWorkPhotos";

const description = "Call, text or email Angel, the owner. Mon–Fri 8–6, Sat 8–5. House cleaning in San Jose and the South Bay, plus Fresno, Clovis and Madera.";
export const metadata: Metadata = {
  title: "Contact Us", description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact New Star Cleaning", description, url: "https://newstarcleaning.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="site-reference">
      <SiteHero title="Call, text or email." description="Have a question before you book? Call or text us about your home. You can also email me directly. I'm Angel, the owner." photo={homeResultPhotos[0]} proof={<ProofRow market="southbay" tone="dark" />} breadcrumbs={[{ label: "Home", href: "/" }]}>
        <div className="grid divide-y divide-on-dark-line text-lg font-semibold">
          <MarketPhone className="flex min-h-14 items-center gap-2 text-white" location="contact_hero">Call </MarketPhone>
          <MarketPhone text className="flex min-h-14 items-center gap-2 text-white" location="contact_hero_text">Text </MarketPhone>
          <a href="mailto:angel@newstarcleaning.com" className="flex min-h-14 flex-wrap items-center gap-x-3 gap-y-1 py-4 text-white"><span>Email Angel</span><span className="break-all text-[15px] font-normal text-on-dark-soft">angel@newstarcleaning.com</span></a>
          <p className="py-4 text-sm font-medium leading-relaxed text-on-dark-soft">Mon–Fri 8 AM–6 PM · Sat 8 AM–5 PM · Sun closed</p>
        </div>
      </SiteHero>
      <section className="site-muted"><div className="site-section site-quote-layout"><div><p className="ns-kicker">Your price</p><h2 className="mt-3">Tell us about your home.</h2><p className="site-intro">Put in your ZIP and the price shows here. This form doesn&apos;t book an appointment.</p></div><QuickQuoteForm title="Tell us about your home" subtitle="We'll help with the cleaning and the price. This form doesn't book an appointment." source="contact_page" compact /></div></section>
      <section className="site-section site-split"><div><p className="ns-kicker">Areas</p><h2 className="mt-3">Where we clean.</h2></div><div><p className="site-intro">Serving San Jose and the South Bay, and Fresno, Clovis and Madera. Madera dates depend on route availability.</p><Link href="/service-areas" className="home-text-link mt-4">Check your area →</Link><div className="site-disclosures mt-8"><details><summary>Office or construction cleaning in the Fresno area?</summary><p>We look at the property and the task list, then send a written proposal.</p><Link href="/commercial-quote" className="home-text-link">Request a walkthrough →</Link></details></div></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ContactPage", url: "https://newstarcleaning.com/contact", name: "Contact New Star Cleaning",
        mainEntity: { "@type": "LocalBusiness", name: "New Star Cleaning", areaServed: businessAreaServed, address: { "@type": "PostalAddress", ...business.address } },
      }) }} />
    </div>
  );
}

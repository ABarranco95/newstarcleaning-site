import type { Metadata } from "next";
import Link from "next/link";
import SiteHero from "@/components/SiteHero";
import GoogleRating from "@/components/GoogleRating";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { Suspense } from "react";
import { homeResultPhotos } from "@/lib/realWorkPhotos";

export const metadata: Metadata = {
  title: "About Our Fresno Cleaning Company",
  description:
    "New Star Cleaning is a locally owned residential cleaning company serving Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About New Star Cleaning | Fresno House Cleaning",
    description:
      "Locally owned residential cleaning for Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
    url: "https://newstarcleaning.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="site-reference">
      <SiteHero title="Locally owned. Fresno based." description="We clean homes in Fresno and Clovis, from regular visits to deep cleans and move-outs. Madera appointments depend on the route and date." photo={homeResultPhotos[0]} breadcrumbs={[{label:"Home",href:"/"}]}>
        <div className="site-actions"><Suspense fallback={<Link href="/book-now" className="home-button">Request a quote ↗</Link>}><HomeQuoteLink className="home-button">Request a quote ↗</HomeQuoteLink></Suspense><Link href="/contact" className="home-text-link">Contact us</Link></div><div className="site-proof-row"><GoogleRating /></div>
      </SiteHero>
      <section className="site-section site-split site-rule"><h2>Before and after your visit.</h2><div className="site-disclosures"><details><summary>Your priorities</summary><p>Tell us which rooms need attention and how to get in. We pass those notes to your cleaner.</p></details><details><summary>The quote</summary><p>We confirm the price, included work, and date before booking. Supplies and equipment come with the cleaner. Appliance interiors and interior windows are optional additions.</p></details><details><summary>Repeat visits</summary><p>Ask about the same cleaner for repeat visits. We’ll confirm what the schedule allows.</p></details><details><summary>After your cleaning</summary><p>If something included was missed, contact us within 24 hours so we can review it.</p></details></div></section>
      <section className="site-section site-split site-rule"><h2>Homes are our core work.</h2><div><p className="site-intro">We also clean offices, small commercial spaces, and completed construction projects by proposal.</p><div className="site-links"><Link href="/services/commercial-cleaning">Office &amp; commercial ↗</Link><Link href="/services/post-construction-cleaning">Post-construction ↗</Link><Link href="/service-areas">Local service areas ↗</Link></div></div></section>
    </div>
  );
}

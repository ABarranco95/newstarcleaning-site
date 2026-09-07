import type { Metadata } from "next";
import Link from "next/link";
import GoogleRating from "@/components/GoogleRating";
import { business } from "@/lib/business";
import QuickQuoteForm from "@/components/QuickQuoteForm";

export const metadata: Metadata = {
  title: "Contact Fresno House Cleaners",
  description:
    "Contact New Star Cleaning in Fresno, CA. Call, text, or request pricing and availability online. Serving Fresno, Clovis, Madera and nearby Fresno neighborhoods.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Fresno House Cleaners | New Star Cleaning",
    description:
      "Reach New Star Cleaning. Serving Fresno, Clovis, Madera and nearby Fresno neighborhoods.",
    url: "https://newstarcleaning.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="site-reference">
      <section className="site-form-layout"><div className="site-form-heading"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link></nav><h1>Talk to New Star.</h1><p>Call, text, or send your cleaning details. We’ll help with the service, price, and available dates.</p><div className="site-links"><a href={business.phoneHref} data-phone-location="contact_hero">Call {business.phoneDisplay}</a><a href={business.phoneHref.replace("tel:", "sms:")}>Text us</a><a href="mailto:support@newstarcleaning.com">Email us</a></div><div className="site-proof-row"><GoogleRating /></div></div><div className="site-form-panel"><QuickQuoteForm title="Get in touch" subtitle="Share the basics so we can review your request." source="contact_page" compact /></div></section>
      <section className="site-section site-split site-rule"><h2>Local, and easy to reach.</h2><div><p className="site-intro">Based in Fresno. Serving Fresno, Clovis, Tower District, Fig Garden, and Woodward Park. Madera dates depend on route availability.</p><div className="site-links"><Link href="/service-areas">Check your area ↗</Link><a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer">Our Google profile ↗</a></div><div className="site-disclosures"><details><summary>Office hours</summary><p>Monday–Friday: 8 AM–6 PM. Saturday: 8 AM–5 PM. Sunday: closed.</p></details><details><summary>Commercial or construction work?</summary><p>We review the property and task list before providing a written proposal.</p><Link href="/commercial-quote" className="home-text-link">Request a walkthrough ↗</Link></details></div></div></section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            url: "https://newstarcleaning.com/contact",
            name: "Contact New Star Cleaning",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "New Star Cleaning",
              areaServed: ["Fresno", "Clovis", "Madera", "Tower District", "Fig Garden", "Woodward Park"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "132 W Nees Ave Unit 106",
                addressLocality: "Fresno",
                addressRegion: "CA",
                postalCode: "93711",
                addressCountry: "US",
              },
            },
          }),
        }}
      />
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { siteQuoteHref } from "@/lib/siteQuoteContext";
import Image from "next/image";
import Link from "next/link";
import HomeBookingLink from "@/components/HomeBookingLink";
import HomeQuoteLink from "@/components/HomeQuoteLink";

import { Suspense } from "react";
import { business } from "@/lib/business";

const groups = [
  { label: "Home cleaning", links: [["Standard cleaning", "/services/standard-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Move-in / move-out", "/services/move-out-cleaning"], ["All services", "/services"], ["Service checklist", "/checklist"], ["Our work", "/our-work"]] },
  { label: "Businesses", links: [["Commercial cleaning", "/services/commercial-cleaning"], ["Post-construction", "/services/post-construction-cleaning"], ["Request a walkthrough", "/commercial-quote"]] },
  { label: "Local areas", links: [["Fresno", "/cleaning-services-fresno"], ["Clovis", "/cleaning-services-clovis"], ["Madera", "/cleaning-services-madera"], ["Tower District", "/cleaning-services-tower-district"], ["Fig Garden", "/cleaning-services-fig-garden"], ["Woodward Park", "/cleaning-services-woodward-park"], ["All service areas", "/service-areas"]] },
  { label: "New Star", links: [["About", "/about"], ["Contact", "/contact"], ["Cleaning tips", "/blog"]] },
] as const;

export default function HomeFooter() {
  const pathname = usePathname();

  const quoteHref = siteQuoteHref(pathname, "");
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">

        <div className="home-footer-navigation">
          <div className="home-footer-brand">
            <Image src="/brand/nsc-lockup-horizontal-reverse.svg" alt="New Star Cleaning" width={640} height={150} />
            <p>{business.serviceAreaDescription}</p>
            <address>
              <a href={business.phoneHref} data-phone-location="footer_address">{business.phoneDisplay}</a><br />
              Mon–Fri 8 AM–6 PM · Sat 8 AM–5 PM
            </address>
            <div className="home-footer-contact"><a href={business.phoneHref.replace("tel:", "sms:")}>Text us</a><HomeBookingLink placement="footer" onDark /><Suspense fallback={<Link href={quoteHref}>Get a quote</Link>}><HomeQuoteLink className="home-text-link home-text-link-light">Get a quote</HomeQuoteLink></Suspense></div>
          </div>
          <nav className="home-footer-nav" aria-label="Footer navigation">
            {groups.map((group) => (
              <div key={group.label} className="home-footer-column">
                <p className="home-footer-column-label">{group.label}</p>
                <ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
              </div>
            ))}
          </nav>
          <nav className="home-footer-nav-mobile" aria-label="Footer navigation">
            {groups.map((group) => <details key={group.label} className="home-footer-group"><summary>{group.label}<span aria-hidden="true">+</span></summary><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></details>)}
          </nav>
        </div>
        <div className="home-footer-legal"><span>© New Star Cleaning LLC · Madera appointments depend on route availability.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </div>
    </footer>
  );
}

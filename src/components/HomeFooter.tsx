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
  { label: "Cleaning", links: [["Standard cleaning", "/services/standard-cleaning"], ["Deep cleaning", "/services/deep-cleaning"], ["Move-in / move-out", "/services/move-out-cleaning"], ["Commercial", "/services/commercial-cleaning"], ["Post-construction", "/services/post-construction-cleaning"], ["All services", "/services"], ["Service checklist", "/checklist"]] },
  { label: "Local areas", links: [["Fresno", "/cleaning-services-fresno"], ["Clovis", "/cleaning-services-clovis"], ["Madera", "/cleaning-services-madera"], ["Tower District", "/cleaning-services-tower-district"], ["Fig Garden", "/cleaning-services-fig-garden"], ["Woodward Park", "/cleaning-services-woodward-park"], ["All service areas", "/service-areas"]] },
  { label: "New Star", links: [["About", "/about"], ["Contact", "/contact"], ["Cleaning tips", "/blog"], ["Reviews on Google", business.googleMapsUrl]] },
] as const;

export default function HomeFooter() {
  const pathname = usePathname();
  const commercial = pathname.includes("commercial") || pathname.includes("post-construction");
  const quoteHref = siteQuoteHref(pathname, "");
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="home-footer-cta">
          <h2>Tell us about<br />{commercial ? "your space." : "your home."}</h2>
          <div><p>{commercial ? "We’ll review the work and prepare a proposal." : "We’ll confirm the price and available times."}</p><Suspense fallback={<Link href={quoteHref} className="home-button home-button-light">Request a quote <span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-button home-button-light">Request a quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense><div className="home-footer-contact"><a href={business.phoneHref} data-phone-location="footer">Call {business.phoneDisplay}</a><a href={business.phoneHref.replace("tel:", "sms:")}>Text us</a></div><HomeBookingLink placement="footer" /></div>
        </div>
        <div className="home-footer-navigation">
          <div className="home-footer-brand"><Image src="/brand/nsc-lockup-horizontal-reverse.svg" alt="New Star Cleaning" width={640} height={150} /><p>Locally owned in Fresno.</p><p>Madera: route-dependent.</p></div>
          <nav aria-label="Footer navigation">{groups.map((group) => <details key={group.label} className="home-footer-group"><summary>{group.label}<span aria-hidden="true">+</span></summary><ul>{group.links.map(([label,href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></details>)}</nav>
        </div>
        <div className="home-footer-legal"><span>© New Star Cleaning LLC</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </div>
    </footer>
  );
}

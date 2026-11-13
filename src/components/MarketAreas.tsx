import Link from "next/link";
import { business } from "@/lib/business";
import { citySlug } from "@/lib/markets";
import { serviceAreas } from "@/lib/serviceAreas";

export function ServiceAreasSchema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning service areas",
    itemListElement: serviceAreas.map((area, index) => ({ "@type": "ListItem", position: index + 1, name: `${area.name}, CA`, url: `${business.siteUrl}/cleaning-services-${area.slug}` })),
  }) }} />;
}

export function MarketAboutIntro() {
  return <>We&apos;ve cleaned homes since 2020, starting in the Fresno area. {business.serviceAreaDescription}. If something we agreed to clean gets missed, I want to hear about it.</>;
}

export function MarketCoverage({ booking = false }: { booking?: boolean }) {
  return <>{business.serviceAreaDescription}. {booking ? "Enter your ZIP to check your price." : "Service depends on the address, and we confirm it before you book."}</>;
}

export function MarketBusinessNote() {
  return <div className="site-disclosures mt-8"><details><summary>Office or construction cleaning in the Fresno area?</summary><p>We look at the property and the task list, then send a written proposal.</p><Link href="/commercial-quote" className="home-text-link">Request a walkthrough →</Link></details></div>;
}

export default function MarketAreas({ home = false, directory = false }: { home?: boolean; directory?: boolean }) {
  const headingId = home ? "home-local-title" : "market-areas-title";
  return (
    <section id={home ? "areas" : directory ? "cities" : undefined} className="ns-section scroll-mt-24" aria-labelledby={headingId}>
      <div className="ns-section-head"><div><h2 id={headingId} className="ns-h2">{business.serviceAreaName}.</h2><p className="ns-lead"><MarketCoverage /></p></div></div>
      <div className="mb-8">
        <nav className="ns-city-links" aria-label={`${business.serviceAreaName} cleaning areas`}>
          {business.cities.map((city) => <Link key={city} href={`/cleaning-services-${citySlug(city)}`}>House cleaning in {city}, CA<span aria-hidden="true">↗</span></Link>)}
          {directory ? ["Tower District", "Fig Garden", "Woodward Park"].map((city) => <Link key={city} href={`/cleaning-services-${citySlug(city)}`}>House cleaning in {city}<span aria-hidden="true">↗</span></Link>) : null}
        </nav>
      </div>
      {!directory ? <Link href="/service-areas" className="home-text-link">Service areas →</Link> : null}
      <MarketBusinessNote />
    </section>
  );
}

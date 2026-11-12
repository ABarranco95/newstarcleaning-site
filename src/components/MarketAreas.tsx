"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useMarket } from "@/components/MarketProvider";
import { citySlug, markets } from "@/lib/markets";
import { sanJoseNeighborhoods } from "@/lib/sanJoseNeighborhoods";
import { serviceAreas } from "@/lib/serviceAreas";

const subscribe = () => () => {};
const hydrated = () => true;
const server = () => false;

export function ServiceAreasSchema() {
  const market = useMarket();
  const ready = useSyncExternalStore(subscribe, hydrated, server);
  const areas = serviceAreas.filter((area) => market.id ? area.market === market.id : ready);
  if (!areas.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "ItemList", name: "New Star Cleaning service areas",
    itemListElement: areas.map((area, index) => ({ "@type": "ListItem", position: index + 1, name: `${area.name}, CA`, url: `https://newstarcleaning.com/cleaning-services-${area.slug}` })),
  }) }} />;
}

export function MarketAboutIntro() {
  const market = useMarket();
  return <>We&apos;ve cleaned homes since 2020{market.id === "fresno" ? ", starting in the Fresno area" : ""}. {market.id ? `${market.chip}. ` : ""}If something we agreed to clean gets missed, I want to hear about it.</>;
}

export function MarketCoverage({ booking = false }: { booking?: boolean }) {
  const market = useMarket();
  return <>{market.id ? `${market.chip}. ` : ""}{booking ? "Your ZIP sets the market and the price." : "Service depends on the address, and we confirm it before you book."}{market.id === "fresno" ? " Madera appointments depend on route availability." : ""}</>;
}

export function MarketBusinessNote() {
  const market = useMarket();
  if (market.id !== "fresno") return null;
  return <div className="site-disclosures mt-8"><details><summary>Office or construction cleaning in the Fresno area?</summary><p>We look at the property and the task list, then send a written proposal.</p><Link href="/commercial-quote" className="home-text-link">Request a walkthrough →</Link></details></div>;
}

export default function MarketAreas({ home = false, directory = false }: { home?: boolean; directory?: boolean }) {
  const market = useMarket();
  const ready = useSyncExternalStore(subscribe, hydrated, server);
  const shown = market.id ? [markets[market.id]] : directory && ready ? [markets.southbay, markets.fresno] : [];
  const headingId = home ? "home-local-title" : "market-areas-title";
  return (
    <section id={home ? "areas" : directory ? "cities" : undefined} className="ns-section scroll-mt-24" aria-labelledby={headingId}>
      <div className="ns-section-head"><div><h2 id={headingId} className="ns-h2">{market.id ? `${market.name}.` : "Where we clean."}</h2><p className="ns-lead"><MarketCoverage /></p></div></div>
      {shown.map((region) => <div key={region.id} className="mb-8">
        {shown.length > 1 ? <h3 className="mb-4">{region.name}</h3> : null}
        <nav className="ns-city-links" aria-label={`${region.name} cleaning areas`}>
          {region.cities.filter((city) => region.id === "fresno" || ["San Jose", "Santa Clara", "Sunnyvale", "Cupertino", "Campbell", "Saratoga", "Los Gatos"].includes(city)).map((city) => <Link key={city} href={`/cleaning-services-${citySlug(city)}`}>House cleaning in {city}, CA<span aria-hidden="true">↗</span></Link>)}
          {directory && region.id === "fresno" ? ["Tower District", "Fig Garden", "Woodward Park"].map((city) => <Link key={city} href={`/cleaning-services-${citySlug(city)}`}>House cleaning in {city}<span aria-hidden="true">↗</span></Link>) : null}
        </nav>
        {directory && region.id === "southbay" ? <><h3 className="mt-8">San Jose neighborhood guides</h3><nav className="site-links" aria-label="San Jose neighborhood cleaning guides">{sanJoseNeighborhoods.map((neighborhood) => <Link key={neighborhood.slug} href={`/cleaning-services-san-jose/${neighborhood.slug}`}>House cleaning in {neighborhood.name}</Link>)}</nav></> : null}
      </div>)}
      {!directory ? <Link href="/service-areas" className="home-text-link">Service areas →</Link> : null}
      <MarketBusinessNote />
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import BookingPortalLink from "@/components/BookingPortalLink";
import { bookingServiceName, homeQuoteParams } from "@/lib/homeQuoteContext";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { useMarket } from "@/components/MarketProvider";
import { marketForCity, type MarketId } from "@/lib/markets";


const directBookingUrl = resolveDirectBookingUrl();
const choices = [
  { slug: "standard-cleaning", label: "Standard cleaning", fit: "Regular upkeep weekly, every other week or monthly.", includes: ["Counters and backsplashes wiped where cleared", "Stovetop, knobs, and range hood cleaned", "Microwave interior wiped if empty and accessible"], photo: "kitchen-island-clean-new-star.webp", alt: "Kitchen island, cooktop and pendant lights" },
  { slug: "deep-cleaning", label: "Deep cleaning", fit: "A first visit or a reset when buildup has set in.", includes: ["Counters, sink, backsplash, and stovetop scrubbed", "Range hood, exterior appliances, and dishwasher exterior cleaned", "Microwave interior wiped if empty and accessible"], photo: "clean-bathroom-new-star.webp", alt: "Bathroom with marble shower and freestanding tub" },
  { slug: "move-out-cleaning", label: "Move-in / move-out", fit: "Empty-home cleaning before the keys change hands.", includes: ["Counters, sink, backsplash, stovetop, range hood, and filter detailed", "Oven and refrigerator interiors available as add-ons; empty microwave interior cleaned when accessible", "Exterior appliances and dishwasher interior and filter cleaned where accessible"], photo: "dining-kitchen-turnover-new-star.webp", alt: "Empty dining room and kitchen during a move-out cleaning" },
] as const;
type ServiceSlug = (typeof choices)[number]["slug"];

// `photos` lets a page swap a card photo so no frame shows twice on it.
export default function HomeServices({ defaultCity, market, photos, children }: { defaultCity?: string; market?: MarketId; photos?: Partial<Record<ServiceSlug, { src: string; alt: string }>>; children?: ReactNode }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const config = useMarket(market || marketForCity(defaultCity));
  const linkMarket = config.id;
  return (
    <div className="home-service-rows">
      {choices.map((choice) => {
        const query = homeQuoteParams(searchParams.toString());
        query.set("service", choice.slug);
        query.delete("market"); query.delete("nsc_market");
        if (config.id) query.set("market", config.id);
        query.delete("nsc_service");
        if (defaultCity) { query.set("city", defaultCity); query.delete("nsc_city"); }
        const photo = photos?.[choice.slug] ?? { src: `/photos/real-work/${choice.photo}`, alt: choice.alt };
        return (
          <article key={choice.slug} className="home-service-row" data-service={choice.slug}>
            <div className="home-service-photo" data-work-photo="service"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 120px" /></div>
            <div className="home-service-content"><h3>{choice.label}</h3><p>{choice.fit}</p>
            <p className="home-service-start">Priced for your ZIP and home.</p></div>
            <div className="home-service-row-actions">
              {directBookingUrl ? <BookingPortalLink baseUrl={directBookingUrl} market={config.id} service={bookingServiceName(choice.slug)} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation="service_row" label={`Book ${choice.slug === "move-out-cleaning" ? "move-in / out" : choice.slug.split("-")[0]}`} showIcon={false} className="home-service-book" /> : <Link href={`/book-now?${query.toString()}`} className="home-service-book">Get a quote</Link>}
              <Link href={linkMarket === "southbay" ? `/${choice.slug}-san-jose#whats-included` : `/services/${choice.slug}?${query.toString()}#whats-included`} className="home-text-link">What&apos;s included <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        );
      })}
      <div className="site-disclosures home-service-compare">
        <details>
          <summary>How the three differ</summary>
          <div>
            <p>The kitchen is the easiest place to see it.</p>
            <div className="home-service-compare-grid">
              {choices.map((choice) => <div key={choice.slug}><h4>{choice.label}</h4><ul>{choice.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
            </div>
            {children}
          </div>
        </details>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { bookingServiceName, homeQuoteParams } from "@/lib/homeQuoteContext";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { useMarket } from "@/components/MarketProvider";
import { marketForCity, type MarketId } from "@/lib/markets";

const directBookingUrl = resolveDirectBookingUrl();
const choices = [
  { slug: "standard-cleaning", label: "Standard cleaning", fit: "For a home that’s already maintained.", includes: ["Kitchen counters, sink and stovetop", "Bathrooms, mirrors and fixtures", "Dusting and floors in every room"] },
  { slug: "deep-cleaning", label: "Deep cleaning", fit: "More time for buildup and reachable details.", includes: ["Everything in a standard visit", "Baseboards, trim and door frames", "Reachable fans, vents and floor edges"] },
  { slug: "move-out-cleaning", label: "Move-in / move-out", fit: "For an empty home before or after a move.", includes: ["The full deep-cleaning scope", "Empty cabinet, drawer and closet interiors", "Kitchen, bathrooms and floors"] },
] as const;

export default function HomeServices({ defaultCity, market }: { defaultCity?: string; market?: MarketId }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const config = useMarket(market || marketForCity(defaultCity));
  const linkMarket = market || marketForCity(defaultCity) || (pathname === "/" ? "southbay" : "fresno");
  return (
    <div className="home-service-rows">
      {choices.map((choice) => {
        const query = homeQuoteParams(searchParams.toString());
        query.set("service", choice.slug);
        query.set("market", config.id);
        query.delete("nsc_service");
        if (defaultCity) { query.set("city", defaultCity); query.delete("nsc_city"); }
        return (
          <article key={choice.slug} className="home-service-row" data-service={choice.slug}>
            <div><h3>{choice.label}</h3><p>{choice.fit}</p><p className="home-service-start">Priced for your ZIP and home.</p></div>
            <ul>{choice.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="home-service-row-actions">
              {directBookingUrl ? <BookingPortalLink baseUrl={directBookingUrl} market={config.id} service={bookingServiceName(choice.slug)} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation="service_row" label={`Book ${choice.slug === "move-out-cleaning" ? "move-in / out" : choice.slug.split("-")[0]}`} showIcon={false} className="home-service-book" /> : <Link href={`/book-now?${query.toString()}`} className="home-service-book">Get a quote</Link>}
              <Link href={linkMarket === "southbay" ? `/${choice.slug}-san-jose#whats-included` : `/services/${choice.slug}?${query.toString()}#whats-included`} className="home-text-link">What&apos;s included <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
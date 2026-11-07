"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { bookingServiceName, homeQuoteParams } from "@/lib/homeQuoteContext";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { useMarket } from "@/components/MarketProvider";
import { marketForCity, type MarketId } from "@/lib/markets";

const directBookingUrl = resolveDirectBookingUrl();
const choices = [
  { slug: "standard-cleaning", label: "Standard cleaning", fit: "Regular upkeep weekly, every other week or monthly.", includes: ["Counters and backsplashes wiped where cleared", "Stovetop, knobs, and range hood cleaned", "Microwave interior wiped if empty and accessible"], photo: "kitchen-island-clean-new-star.webp", fallback: "bedroom-clean-new-star.webp", alt: "Kitchen island, cooktop and pendant lights" },
  { slug: "deep-cleaning", label: "Deep cleaning", fit: "A first visit or a reset when buildup has set in.", includes: ["Counters, sink, backsplash, and stovetop scrubbed", "Range hood, exterior appliances, and dishwasher exterior cleaned", "Microwave interior wiped if empty and accessible"], photo: "clean-bathroom-new-star.webp", fallback: "primary-bathroom-clean-new-star.webp", alt: "Bathroom with marble shower and freestanding tub" },
  { slug: "move-out-cleaning", label: "Move-in / move-out", fit: "Empty-home cleaning before keys change hands. It doesn't decide a deposit or an inspection.", includes: ["Counters, sink, backsplash, stovetop, range hood, and filter detailed", "Oven and refrigerator interiors available as add-ons; empty microwave interior cleaned when accessible", "Exterior appliances and dishwasher interior and filter cleaned where accessible"], photo: "clean-empty-closet-new-star.webp", fallback: "clean-empty-closet-new-star.webp", alt: "Empty walk-in closet with shelving and hanging rods" },
] as const;

export default function HomeServices({ defaultCity, market, excludePhoto }: { defaultCity?: string; market?: MarketId; excludePhoto?: string }) {
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
        const photo = `/photos/real-work/${excludePhoto?.endsWith(choice.photo) ? choice.fallback : choice.photo}`;
        const alt = photo.includes("bedroom-") ? "Bedroom with a bed and wood-look floors" : photo.includes("primary-bathroom-") ? "Primary bathroom with double vanity and freestanding tub" : choice.alt;
        return (
          <article key={choice.slug} className="home-service-row" data-service={choice.slug}>
            <div className="home-service-photo" data-work-photo="service"><Image src={photo} alt={alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw" /></div>
            <div className="home-service-content"><h3>{choice.label}</h3><p>{choice.fit}</p>
            <ul>{choice.includes.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="home-service-start">Priced for your ZIP and home.</p>
            <div className="home-service-row-actions">
              {directBookingUrl ? <BookingPortalLink baseUrl={directBookingUrl} market={config.id} service={bookingServiceName(choice.slug)} city={query.get("city") || undefined} frequency={query.get("frequency") || undefined} sourcePage={pathname} ctaLocation="service_row" label={`Book ${choice.slug === "move-out-cleaning" ? "move-in / out" : choice.slug.split("-")[0]}`} showIcon={false} className="home-service-book" /> : <Link href={`/book-now?${query.toString()}`} className="home-service-book">Get a quote</Link>}
              <Link href={linkMarket === "southbay" ? `/${choice.slug}-san-jose#whats-included` : `/services/${choice.slug}?${query.toString()}#whats-included`} className="home-text-link">What&apos;s included <span aria-hidden="true">→</span></Link>
            </div></div>
          </article>
        );
      })}
      {linkMarket === "southbay" ? <p className="ns-photo-provenance">Photos from New Star jobs in the Central Valley.</p> : null}
    </div>
  );
}
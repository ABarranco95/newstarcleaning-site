import type { Metadata } from "next";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { isMarket, marketForCity, markets, citySlug } from "@/lib/markets";
import "./paid-reference.css";

const directBookingUrl = resolveDirectBookingUrl();

type PaidPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined): string | null {
  return (Array.isArray(value) ? value[0] : value) ?? null;
}

export async function generateMetadata({ searchParams }: PaidPageProps): Promise<Metadata> {
  const params = await searchParams;
  const service = (firstParam(params.service) || "").trim().toLowerCase();
  const requestedMarket = firstParam(params.market);
  const market = marketForCity(firstParam(params.city)) || (isMarket(requestedMarket) ? requestedMarket : "fresno");
  const region = market === "southbay" ? markets.southbay.cities.find((city) => citySlug(city) === citySlug(firstParam(params.city) || "")) || "San Jose & the South Bay" : "Fresno & Clovis";
  const title = service.includes("post") || service.includes("commercial") || service.includes("office")
    ? "Cleaning Quote Request | New Star Cleaning"
    : service.includes("deep")
      ? `Deep Cleaning in ${region} | New Star Cleaning`
      : service.includes("move")
        ? `Move-Out & Move-In Cleaning in ${region} | New Star Cleaning`
        : `House Cleaning in ${region} | New Star Cleaning`;

  return {
    title: { absolute: title },
    description: `See a price for your ZIP and home size, then review available dates. ${markets[market].cities.slice(0, 4).join(", ")}.`,
    alternates: { canonical: null },
    robots: { index: false, follow: false },
    other: { robots: "noindex, nofollow" },
  };
}

export default async function GoogleAdsLandingPage({ searchParams }: PaidPageProps) {
  const params = await searchParams;
  const requestedMarket = firstParam(params.market);
  const city = firstParam(params.city);
  const market = marketForCity(city) || (isMarket(requestedMarket) ? requestedMarket : "fresno");
  return (
    <div data-paid-layout-version="photo-led-v5-continuity">
      <GoogleAdsLandingPageClient
        directBookingUrl={directBookingUrl}
        service={firstParam(params.service)}
        city={market === "southbay" && !marketForCity(city) ? "san-jose" : city}
        pageMarket={market}
        frequency={firstParam(params.frequency)}
      />
    </div>
  );
}

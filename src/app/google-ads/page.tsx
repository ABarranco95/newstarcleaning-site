import type { Metadata } from "next";
import { cookies } from "next/headers";
import SchemaMarkup from "@/components/SchemaMarkup";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { isMarket, MARKET_COOKIE, marketForPaidParams, markets, citySlug } from "@/lib/markets";
import "./paid-reference.css";

const directBookingUrl = resolveDirectBookingUrl();

type PaidPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstParam(value: string | string[] | undefined): string | null {
  return (Array.isArray(value) ? value[0] : value) ?? null;
}

async function paidMarket(params: Record<string, string | string[] | undefined>) {
  const search = new URLSearchParams();
  for (const key of ["city", "market", "nsc_city", "nsc_market"]) { const value = firstParam(params[key]); if (value) search.set(key, value); }
  const saved = (await cookies()).get(MARKET_COOKIE)?.value;
  return marketForPaidParams(search) || (isMarket(saved) ? saved : undefined);
}

export async function generateMetadata({ searchParams }: PaidPageProps): Promise<Metadata> {
  const params = await searchParams;
  const service = (firstParam(params.service) || "").trim().toLowerCase();
  const market = await paidMarket(params);
  const region = market === "southbay" ? markets.southbay.cities.find((city) => citySlug(city) === citySlug(firstParam(params.city) || "")) || "San Jose & the South Bay" : market === "fresno" ? "Fresno & Clovis" : "your area";
  const title = service.includes("post") || service.includes("commercial") || service.includes("office")
    ? "Cleaning Quote Request | New Star Cleaning"
    : service.includes("deep")
      ? `Deep Cleaning in ${region} | New Star Cleaning`
      : service.includes("move")
        ? `Move-Out & Move-In Cleaning in ${region} | New Star Cleaning`
        : `House Cleaning in ${region} | New Star Cleaning`;

  const description = `See a price for your ZIP and home size, then review available dates.${market ? ` ${markets[market].cities.slice(0, 4).join(", ")}.` : ""}`;
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description },
    twitter: { title, description },
    alternates: { canonical: null },
    robots: { index: false, follow: false },
    other: { robots: "noindex, nofollow" },
  };
}

export default async function GoogleAdsLandingPage({ searchParams }: PaidPageProps) {
  const params = await searchParams;
  const city = firstParam(params.city);
  const market = await paidMarket(params);
  return (
    <div data-paid-layout-version="photo-led-v5-continuity">
      <SchemaMarkup market={market} paid />
      <GoogleAdsLandingPageClient
        directBookingUrl={directBookingUrl}
        service={firstParam(params.service)}
        city={market === "southbay" && !city ? "san-jose" : city}
        pageMarket={market}
        frequency={firstParam(params.frequency)}
      />
    </div>
  );
}

import type { Metadata } from "next";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
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
  const title = service.includes("post") || service.includes("commercial") || service.includes("office")
    ? "Cleaning Quote Request | New Star Cleaning"
    : service.includes("deep")
      ? "Deep Cleaning in Fresno & Clovis | New Star Cleaning"
      : service.includes("move")
        ? "Move-Out & Move-In Cleaning in Fresno & Clovis | New Star Cleaning"
        : "House Cleaning in Fresno & Clovis | New Star Cleaning";

  return {
    title: { absolute: title },
    description: "See your price for your home size, then book online. Fresno, Clovis and Madera.",
    alternates: { canonical: null },
    robots: { index: false, follow: false },
    other: { robots: "noindex, nofollow" },
  };
}

export default async function GoogleAdsLandingPage({ searchParams }: PaidPageProps) {
  const params = await searchParams;
  return (
    <div data-paid-layout-version="photo-led-v5-continuity">
      <GoogleAdsLandingPageClient
        directBookingUrl={directBookingUrl}
        service={firstParam(params.service)}
        city={firstParam(params.city)}
        frequency={firstParam(params.frequency)}
      />
    </div>
  );
}

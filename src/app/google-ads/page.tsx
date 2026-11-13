import type { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { business } from "@/lib/business";
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
  const region = business.serviceAreaName;
  const title = service.includes("post") || service.includes("commercial") || service.includes("office")
    ? "Cleaning Quote Request | New Star Cleaning"
    : service.includes("deep")
      ? `Deep Cleaning in ${region} | New Star Cleaning`
      : service.includes("move")
        ? `Move-Out & Move-In Cleaning in ${region} | New Star Cleaning`
        : `House Cleaning in ${region} | New Star Cleaning`;

  const description = "See your house-cleaning price for Fresno, Clovis and Madera, then review available dates.";
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
  return (
    <div data-paid-layout-version="photo-led-v5-continuity">
      <SchemaMarkup paid />
      <GoogleAdsLandingPageClient
        directBookingUrl={directBookingUrl}
        service={firstParam(params.service)}
        city={firstParam(params.city)}
        frequency={firstParam(params.frequency)}
      />
    </div>
  );
}

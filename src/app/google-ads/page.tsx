import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
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

const PAID_CITY_LABELS: Record<string, string> = {
  fresno: "Fresno",
  clovis: "Clovis",
  madera: "Madera",
  "north-fresno": "North Fresno",
  "woodward-park": "Woodward Park",
  "fig-garden": "Fig Garden",
  "tower-district": "Tower District",
};

function resolveCityTitleLabel(value: string | null): string {
  const key = (value || "").trim().toLowerCase().replace(/[ _]+/g, "-");
  return PAID_CITY_LABELS[key] || business.serviceAreaName;
}

export async function generateMetadata({ searchParams }: PaidPageProps): Promise<Metadata> {
  const params = await searchParams;
  const service = (firstParam(params.service) || "").trim().toLowerCase();
  const frequency = (firstParam(params.frequency) || "").trim().toLowerCase();
  const region = resolveCityTitleLabel(firstParam(params.city));
  const isRecurring =
    service.includes("recurring") ||
    ["recurring", "weekly", "biweekly", "bi-weekly", "monthly"].includes(frequency);
  const title = service.includes("post")
    ? `Post-Construction Cleaning in ${region} | New Star Cleaning`
    : service.includes("commercial") || service.includes("office")
      ? `Commercial & Office Cleaning in ${region} | New Star Cleaning`
      : service.includes("deep")
        ? `Deep Cleaning in ${region} | New Star Cleaning`
        : service.includes("move")
          ? `Move-Out & Move-In Cleaning in ${region} | New Star Cleaning`
          : isRecurring
            ? `Recurring House Cleaning in ${region} | New Star Cleaning`
            : `House Cleaning in ${region} | New Star Cleaning`;

  const description = `See your cleaning price or request a quote in ${region}. Locally owned, insured, and confirmed before you book.`;
  return {
    title: { absolute: title },
    description,
    ...socialMetadata({ title, description }),
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

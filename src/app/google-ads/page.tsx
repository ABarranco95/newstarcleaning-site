import type { Metadata } from "next";
import { Suspense } from "react";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import "./paid-reference.css";

const directBookingUrl = resolveDirectBookingUrl();

export const metadata: Metadata = {
  title: "House Cleaning Pricing Request",
  description:
    "Request pricing for move-out, deep, or recurring house cleaning in Fresno, Clovis, and Madera.",
  robots: {
    index: false,
    follow: false,
  },
  other: {
    robots: "noindex, nofollow",
  },
};

export default function GoogleAdsLandingPage() {
  return (
    <div data-paid-layout-version="photo-led-v5-continuity">
      <Suspense fallback={null}>
        <GoogleAdsLandingPageClient directBookingUrl={directBookingUrl} />
      </Suspense>
    </div>
  );
}

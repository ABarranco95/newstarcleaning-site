import type { Metadata } from "next";
import { Suspense } from "react";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";

export const metadata: Metadata = {
  title: "House Cleaning Pricing Request",
  description:
    "Request clear pricing for move-out, deep, or recurring house cleaning in Fresno, Clovis, and Madera. Scope confirmed before booking.",
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
    <Suspense fallback={null}>
      <GoogleAdsLandingPageClient />
    </Suspense>
  );
}

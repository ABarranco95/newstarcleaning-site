import type { Metadata } from "next";
import GoogleAdsLandingPageClient from "./GoogleAdsLandingPageClient";

export const metadata: Metadata = {
  title: "Professional House Cleaning Fresno | New Star Cleaning | 5.0★ Rated",
  description: "Professional house cleaning in Fresno. 5.0★ Google rating, background-checked cleaners, 100% satisfaction guarantee. Book online in 60 seconds!",
  robots: {
    index: false,
    follow: false,
  },
  other: {
    robots: "noindex, nofollow",
  },
};

export default function GoogleAdsLandingPage() {
  return <GoogleAdsLandingPageClient />;
}

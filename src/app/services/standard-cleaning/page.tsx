import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("standard-cleaning")!;

export const metadata: Metadata = {
  title: "Standard House Cleaning in Fresno, CA",
  description:
    "Standard weekly, bi-weekly, and monthly house cleaning for maintained Fresno, Clovis, and Madera homes. Review the included rooms and request a confirmed quote.",
  alternates: {
    canonical: "/services/standard-cleaning",
  },
  openGraph: {
    title: "Standard House Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Weekly, bi-weekly, and monthly standard house cleaning for maintained Fresno-area homes.",
    url: "https://newstarcleaning.com/services/standard-cleaning",
  },
};

export default function StandardCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Standard House Cleaning in Fresno, CA"
    />
  );
}

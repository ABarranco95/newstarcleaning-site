import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("standard-cleaning")!;

export const metadata: Metadata = {
  title:
    "Standard House Cleaning in Fresno, CA | Recurring Professional Cleaning",
  description:
    "Weekly, bi-weekly, or monthly cleaning for maintained Fresno homes. Review included rooms, optional additions, and current availability.",
  alternates: {
    canonical: "/services/standard-cleaning",
  },
  openGraph: {
    title:
      "Standard House Cleaning in Fresno, CA | Recurring Professional Cleaning | New Star Cleaning",
    description:
      "Weekly, bi-weekly, or monthly house cleaning for maintained Fresno homes.",
    url: "https://newstarcleaning.com/services/standard-cleaning",
  },
};

export default function StandardCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Professional Standard Cleaning Services in Fresno, CA"
    />
  );
}

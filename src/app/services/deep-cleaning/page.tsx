import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("deep-cleaning")!;

export const metadata: Metadata = {
  title: "Deep House Cleaning in Fresno, CA | One-Time Deep Clean",
  description:
    "Thorough deep cleaning for Fresno homes. Oven, baseboards, inside appliances, ceiling fans, and more. Request a fast quote online.",
  alternates: {
    canonical: "/services/deep-cleaning",
  },
  openGraph: {
    title:
      "Deep House Cleaning in Fresno, CA | One-Time Deep Clean | New Star Cleaning",
    description:
      "Top-to-bottom deep cleaning for Fresno homes. Background-checked, insured cleaners.",
    url: "https://newstarcleaning.com/services/deep-cleaning",
  },
};

export default function DeepCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Deep Cleaning Services in Fresno, CA — Top-to-Bottom Detail"
    />
  );
}

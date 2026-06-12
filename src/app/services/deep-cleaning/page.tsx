import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("deep-cleaning")!;

export const metadata: Metadata = {
  title: "Deep House Cleaning in Fresno, CA | One-Time Deep Clean",
  description:
    "Detailed deep cleaning for Fresno homes: baseboards, reachable vents, fixtures, floors, bathrooms, and buildup areas. Optional add-ons quoted separately.",
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
      h1="Deep Cleaning Services in Fresno, CA"
    />
  );
}

import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("deep-cleaning")!;

export const metadata: Metadata = {
  title: "Deep Cleaning in Fresno & Clovis",
  description:
    "Deep cleaning for Fresno and Clovis homes: kitchens, bathrooms, floors, baseboards, vents and fixtures. See included work and request your quote.",
  alternates: {
    canonical: "/services/deep-cleaning",
  },
  openGraph: {
    title:
      "Deep Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Deep cleaning for Fresno and Clovis homes, including kitchens, bathrooms, floors, baseboards, reachable vents and fixtures. Optional add-ons quoted separately.",
    url: "https://newstarcleaning.com/services/deep-cleaning",
  },
};

export default function DeepCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Deep Cleaning in Fresno & Clovis"
    />
  );
}

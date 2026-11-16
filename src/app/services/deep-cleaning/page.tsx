import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("deep-cleaning")!;

export const metadata: Metadata = {
  title: "Deep House Cleaning in Fresno, Clovis & Madera",
  description:
    "Deep cleaning for Fresno, Clovis and Madera homes: kitchens, bathrooms, floors, baseboards, vents and fixtures. See included work and request your quote.",
  alternates: {
    canonical: "/services/deep-cleaning",
  },
  ...socialMetadata({
    title:
      "Deep House Cleaning in Fresno, Clovis & Madera | New Star Cleaning",
    description:
      "Deep cleaning for Fresno, Clovis and Madera homes, including kitchens, bathrooms, floors, baseboards, reachable vents and fixtures. Optional add-ons quoted separately.",
    url: "https://newstarcleaning.com/services/deep-cleaning",
  }),
};

export default function DeepCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Deep house cleaning in Fresno, Clovis & Madera."
    />
  );
}

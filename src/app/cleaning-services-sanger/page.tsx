import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "sanger")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Sanger, CA",
  description:
    "Professional house cleaning in Sanger, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Sanger, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Sanger, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-sanger",
  },
};

export default function SangerPage() {
  return <ServiceAreaPage area={area} />;
}

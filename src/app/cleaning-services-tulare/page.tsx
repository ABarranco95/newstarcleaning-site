import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "tulare")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Tulare, CA",
  description:
    "Professional house cleaning in Tulare, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Tulare, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Tulare, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-tulare",
  },
};

export default function TularePage() {
  return <ServiceAreaPage area={area} />;
}

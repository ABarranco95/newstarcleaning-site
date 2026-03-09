import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "hanford")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Hanford, CA",
  description:
    "Professional house cleaning in Hanford, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Hanford, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Hanford, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-hanford",
  },
};

export default function HanfordPage() {
  return <ServiceAreaPage area={area} />;
}

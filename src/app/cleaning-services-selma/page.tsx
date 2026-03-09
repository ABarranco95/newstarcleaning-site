import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "selma")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Selma, CA",
  description:
    "Professional house cleaning in Selma, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Selma, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Selma, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-selma",
  },
};

export default function SelmaPage() {
  return <ServiceAreaPage area={area} />;
}

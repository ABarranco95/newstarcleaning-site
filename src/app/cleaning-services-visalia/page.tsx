import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "visalia")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Visalia, CA",
  description:
    "Professional house cleaning in Visalia, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Visalia, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Visalia, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-visalia",
  },
};

export default function VisaliaPage() {
  return <ServiceAreaPage area={area} />;
}

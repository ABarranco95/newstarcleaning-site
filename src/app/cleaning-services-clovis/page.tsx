import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "clovis")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Clovis, CA",
  description:
    "Professional house cleaning in Clovis, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Clovis, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Clovis, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-clovis",
  },
};

export default function ClovisPage() {
  return <ServiceAreaPage area={area} />;
}

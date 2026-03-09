import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "madera")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Madera, CA",
  description:
    "Professional house cleaning in Madera, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Madera, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Madera, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-madera",
  },
};

export default function MaderaPage() {
  return <ServiceAreaPage area={area} />;
}

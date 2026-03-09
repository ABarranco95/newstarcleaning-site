import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "kingsburg")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Kingsburg, CA",
  description:
    "Professional house cleaning in Kingsburg, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Kingsburg, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Kingsburg, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-kingsburg",
  },
};

export default function KingsburgPage() {
  return <ServiceAreaPage area={area} />;
}

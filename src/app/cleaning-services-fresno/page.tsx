import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fresno")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno, CA",
  description:
    "Professional house cleaning in Fresno, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Fresno, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Fresno, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-fresno",
  },
};

export default function FresnoPage() {
  return <ServiceAreaPage area={area} />;
}

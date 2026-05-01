import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "tower-district")!;

export const metadata: Metadata = {
  title: "House Cleaning in Fresno's Tower District",
  description:
    "Detail-oriented house cleaning for Tower District homes. Standard recurring, deep, and move-out cleaning from vetted, insured cleaners. Book in 60 seconds.",
  alternates: {
    canonical: "/cleaning-services-tower-district",
  },
  openGraph: {
    title: "House Cleaning in Fresno's Tower District | New Star Cleaning",
    description:
      "Vintage-friendly house cleaning in Fresno's Tower District. Background-checked, insured cleaners. Book online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-tower-district",
  },
};

export default function TowerDistrictPage() {
  return <ServiceAreaPage area={area} />;
}

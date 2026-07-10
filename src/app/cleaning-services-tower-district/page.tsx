import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "tower-district")!;

export const metadata: Metadata = {
  title: "House Cleaning in Fresno's Tower District",
  description:
    "Recurring, deep, and move-in/move-out house cleaning for Tower District homes, apartments, and duplexes. Request pricing online.",
  alternates: {
    canonical: "/cleaning-services-tower-district",
  },
  openGraph: {
    title: "House Cleaning in Fresno's Tower District | New Star Cleaning",
    description:
      "House cleaning for Fresno's Tower District, including recurring care, deep cleaning, and empty-home moves.",
    url: "https://newstarcleaning.com/cleaning-services-tower-district",
  },
};

export default function TowerDistrictPage() {
  return <ServiceAreaPage area={area} />;
}

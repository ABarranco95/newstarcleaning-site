import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "madera")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Madera, CA",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Madera, CA when the address fits an available route. Request pricing online.",
  alternates: {
    canonical: "/cleaning-services-madera",
  },
  openGraph: {
    title: "House Cleaning Services in Madera, CA | New Star Cleaning",
    description:
      "Madera house cleaning for recurring care, detailed resets, and empty-home moves. Route availability is confirmed before booking.",
    url: "https://newstarcleaning.com/cleaning-services-madera",
  },
};

export default function MaderaPage() {
  return <ServiceAreaPage area={area} />;
}

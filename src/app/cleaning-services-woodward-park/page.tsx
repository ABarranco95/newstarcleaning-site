import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "woodward-park")!;

export const metadata: Metadata = {
  title: "House Cleaning in Woodward Park, Fresno",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Woodward Park and nearby north Fresno routes. Request pricing online.",
  alternates: {
    canonical: "/cleaning-services-woodward-park",
  },
  openGraph: {
    title: "House Cleaning in Woodward Park, Fresno | New Star Cleaning",
    description:
      "House cleaning for Woodward Park and nearby approved north Fresno routes. Request pricing and current availability.",
    url: "https://newstarcleaning.com/cleaning-services-woodward-park",
  },
};

export default function WoodwardParkPage() {
  return <ServiceAreaPage area={area} />;
}

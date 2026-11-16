import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "north-fresno")!;

export const metadata: Metadata = {
  title: "House Cleaning in North Fresno, CA",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in North Fresno, including Woodward Park, Fig Garden, Bullard and Copper River. Request pricing online.",
  alternates: {
    canonical: "/cleaning-services-north-fresno",
  },
  ...socialMetadata({
    title: "House Cleaning in North Fresno, CA | New Star Cleaning",
    description:
      "House cleaning in North Fresno, including Woodward Park, Fig Garden, Bullard and Copper River. Request pricing and current availability.",
    url: "https://newstarcleaning.com/cleaning-services-north-fresno",
  }),
};

export default function NorthFresnoPage() {
  return <ServiceAreaPage area={area} />;
}

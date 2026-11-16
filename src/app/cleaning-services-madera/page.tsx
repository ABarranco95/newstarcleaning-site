import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "madera")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Madera, CA",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Madera, CA. Request pricing online.",
  alternates: {
    canonical: "/cleaning-services-madera",
  },
  ...socialMetadata({
    title: "House Cleaning Services in Madera, CA | New Star Cleaning",
    description:
      "Madera house cleaning for recurring care, detailed resets, and empty-home moves. Request pricing online.",
    url: "https://newstarcleaning.com/cleaning-services-madera",
  }),
};

export default function MaderaPage() {
  return <ServiceAreaPage area={area} />;
}

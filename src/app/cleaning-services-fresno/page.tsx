import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fresno")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno, CA",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Fresno, CA. Review services, included work, and request current availability.",
  alternates: {
    canonical: "/cleaning-services-fresno",
  },
  openGraph: {
    title: "House Cleaning Services in Fresno, CA | New Star Cleaning",
    description:
      "Fresno house cleaning for recurring care, detailed resets, and empty-home moves. Request pricing and current availability.",
    url: "https://newstarcleaning.com/cleaning-services-fresno",
  },
};

export default function FresnoPage() {
  return <ServiceAreaPage area={area} />;
}

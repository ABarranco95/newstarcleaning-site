import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "clovis")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Clovis, CA",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Clovis, CA. Review services, included work, and request current availability.",
  alternates: {
    canonical: "/cleaning-services-clovis",
  },
  openGraph: {
    title: "House Cleaning Services in Clovis, CA | New Star Cleaning",
    description:
      "Clovis house cleaning for recurring care, detailed resets, and empty-home moves. Request pricing and current availability.",
    url: "https://newstarcleaning.com/cleaning-services-clovis",
  },
};

export default function ClovisPage() {
  return <ServiceAreaPage area={area} />;
}

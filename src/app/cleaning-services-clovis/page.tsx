import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "clovis")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Clovis, CA",
  description:
    "Professional house cleaning in Clovis, CA and nearby Fresno-area homes. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-clovis",
  },
  openGraph: {
    title: "House Cleaning Services in Clovis, CA | New Star Cleaning",
    description:
      "Local Fresno-area house cleaning in Clovis, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-clovis",
  },
};

export default function ClovisPage() {
  return <ServiceAreaPage area={area} />;
}

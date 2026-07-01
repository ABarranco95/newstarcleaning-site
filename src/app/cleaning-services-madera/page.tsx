import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "madera")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Madera, CA",
  description:
    "Professional house cleaning in Madera, CA and nearby Fresno-area homes. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-madera",
  },
  openGraph: {
    title: "House Cleaning Services in Madera, CA | New Star Cleaning",
    description:
      "Local Fresno-area house cleaning in Madera, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-madera",
  },
};

export default function MaderaPage() {
  return <ServiceAreaPage area={area} />;
}

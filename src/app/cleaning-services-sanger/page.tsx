import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "sanger")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Sanger, CA",
  description:
    "Professional house cleaning in Sanger, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-sanger",
  },
  openGraph: {
    title: "House Cleaning Services in Sanger, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Sanger, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-sanger",
  },
};

export default function SangerPage() {
  return <ServiceAreaPage area={area} />;
}

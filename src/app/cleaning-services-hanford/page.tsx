import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "hanford")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Hanford, CA",
  description:
    "Professional house cleaning in Hanford, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-hanford",
  },
  openGraph: {
    title: "House Cleaning Services in Hanford, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Hanford, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-hanford",
  },
};

export default function HanfordPage() {
  return <ServiceAreaPage area={area} />;
}

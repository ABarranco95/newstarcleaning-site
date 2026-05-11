import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "visalia")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Visalia, CA",
  description:
    "Professional house cleaning in Visalia, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-visalia",
  },
  openGraph: {
    title: "House Cleaning Services in Visalia, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Visalia, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-visalia",
  },
};

export default function VisaliaPage() {
  return <ServiceAreaPage area={area} />;
}

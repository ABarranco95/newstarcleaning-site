import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "tulare")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Tulare, CA",
  description:
    "Professional house cleaning in Tulare, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-tulare",
  },
  openGraph: {
    title: "House Cleaning Services in Tulare, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Tulare, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-tulare",
  },
};

export default function TularePage() {
  return <ServiceAreaPage area={area} />;
}

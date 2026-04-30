import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "selma")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Selma, CA",
  description:
    "Professional house cleaning in Selma, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-selma",
  },
  openGraph: {
    title: "House Cleaning Services in Selma, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Selma, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-selma",
  },
};

export default function SelmaPage() {
  return <ServiceAreaPage area={area} />;
}

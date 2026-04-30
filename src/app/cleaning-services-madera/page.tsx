import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "madera")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Madera, CA",
  description:
    "Professional house cleaning in Madera, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-madera",
  },
  openGraph: {
    title: "House Cleaning Services in Madera, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Madera, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-madera",
  },
};

export default function MaderaPage() {
  return <ServiceAreaPage area={area} />;
}

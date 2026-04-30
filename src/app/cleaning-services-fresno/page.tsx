import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fresno")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno, CA",
  description:
    "Professional house cleaning in Fresno, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-fresno",
  },
  openGraph: {
    title: "House Cleaning Services in Fresno, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Fresno, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-fresno",
  },
};

export default function FresnoPage() {
  return <ServiceAreaPage area={area} />;
}

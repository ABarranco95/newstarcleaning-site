import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "kingsburg")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Kingsburg, CA",
  description:
    "Professional house cleaning in Kingsburg, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-kingsburg",
  },
  openGraph: {
    title: "House Cleaning Services in Kingsburg, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Kingsburg, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-kingsburg",
  },
};

export default function KingsburgPage() {
  return <ServiceAreaPage area={area} />;
}

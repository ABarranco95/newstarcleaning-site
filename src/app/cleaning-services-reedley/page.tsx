import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "reedley")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Reedley, CA",
  description:
    "Professional house cleaning in Reedley, CA and the Central Valley. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners.",
  alternates: {
    canonical: "/cleaning-services-reedley",
  },
  openGraph: {
    title: "House Cleaning Services in Reedley, CA | New Star Cleaning",
    description:
      "Local Central Valley house cleaning in Reedley, CA. Request a fast quote from vetted, insured cleaners.",
    url: "https://newstarcleaning.com/cleaning-services-reedley",
  },
};

export default function ReedleyPage() {
  return <ServiceAreaPage area={area} />;
}

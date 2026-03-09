import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "reedley")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Reedley, CA",
  description:
    "Professional house cleaning in Reedley, CA. Standard recurring, deep cleaning, and move-in/move-out services. Vetted, insured cleaners. Book online in 60 seconds.",
  openGraph: {
    title: "House Cleaning Services in Reedley, CA | New Star Cleaning",
    description:
      "Professional house cleaning in Reedley, CA. Book online in 60 seconds. Satisfaction guaranteed.",
    url: "https://newstarcleaning.com/cleaning-services-reedley",
  },
};

export default function ReedleyPage() {
  return <ServiceAreaPage area={area} />;
}

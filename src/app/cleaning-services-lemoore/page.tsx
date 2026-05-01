import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "lemoore")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Lemoore, CA",
  description:
    "Professional house cleaning in Lemoore, CA. Standard recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners. Same-week availability.",
  alternates: {
    canonical: "/cleaning-services-lemoore",
  },
  openGraph: {
    title: "House Cleaning Services in Lemoore, CA | New Star Cleaning",
    description:
      "Local Kings County house cleaning in Lemoore, CA. Book vetted, insured cleaners online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-lemoore",
  },
};

export default function LemoorePage() {
  return <ServiceAreaPage area={area} />;
}

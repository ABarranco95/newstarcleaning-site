import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "woodward-park")!;

export const metadata: Metadata = {
  title: "House Cleaning in Woodward Park, Fresno",
  description:
    "Reliable house cleaning for Woodward Park families. Recurring, deep, and move-in/move-out cleaning from vetted, insured cleaners. Request a fast quote online.",
  alternates: {
    canonical: "/cleaning-services-woodward-park",
  },
  openGraph: {
    title: "House Cleaning in Woodward Park, Fresno | New Star Cleaning",
    description:
      "Trusted Woodward Park house cleaning. Background-checked, insured. Request a fast quote online.",
    url: "https://newstarcleaning.com/cleaning-services-woodward-park",
  },
};

export default function WoodwardParkPage() {
  return <ServiceAreaPage area={area} />;
}

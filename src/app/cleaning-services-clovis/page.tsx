import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "clovis")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Clovis, CA",
  description:
    "House cleaning in Clovis, from Old Town to Harlan Ranch and Loma Vista. Compare recurring, deep and empty-home cleaning, then request your quote.",
  alternates: {
    canonical: "/cleaning-services-clovis",
  },
  openGraph: {
    title: "House Cleaning Services in Clovis, CA | New Star Cleaning",
    description:
      "House cleaning in Clovis, from Old Town to Harlan Ranch and Loma Vista. Compare recurring, deep and empty-home cleaning, then request your quote.",
    url: "https://newstarcleaning.com/cleaning-services-clovis",
  },
};

export default function ClovisPage() {
  return <ServiceAreaPage area={area} />;
}

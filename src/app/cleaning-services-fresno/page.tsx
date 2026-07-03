import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fresno")!;

export const metadata: Metadata = {
  title: "House Cleaning Services in Fresno, CA",
  description:
    "Professional house cleaning in Fresno, CA and nearby Fresno-area homes. Standard recurring, deep, and move-in/move-out cleaning with clear scope before booking.",
  alternates: {
    canonical: "/cleaning-services-fresno",
  },
  openGraph: {
    title: "House Cleaning Services in Fresno, CA | New Star Cleaning",
    description:
      "Local Fresno-area house cleaning in Fresno, CA. Request clear pricing with clear scope before booking.",
    url: "https://newstarcleaning.com/cleaning-services-fresno",
  },
};

export default function FresnoPage() {
  return <ServiceAreaPage area={area} />;
}

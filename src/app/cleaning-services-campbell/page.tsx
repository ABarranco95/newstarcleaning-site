import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "campbell")!;
export const metadata: Metadata = {
  title: "House Cleaning in Campbell, CA",
  description: "House cleaning in Campbell for San Tomas ranch homes, Pruneyard-Dry Creek houses, condos and townhomes. See your price before you book.",
  alternates: { canonical: "/cleaning-services-campbell" },
  openGraph: { title: "House Cleaning in Campbell, CA | New Star Cleaning", description: "House cleaning in Campbell for San Tomas ranch homes, Pruneyard-Dry Creek houses, condos and townhomes. See your price before you book.", url: "https://newstarcleaning.com/cleaning-services-campbell" },
  twitter: { title: "House Cleaning in Campbell, CA | New Star Cleaning", description: "House cleaning in Campbell for San Tomas ranch homes, Pruneyard-Dry Creek houses, condos and townhomes. See your price before you book." },
};
export default function CampbellPage() { return <ServiceAreaPage area={area} />; }

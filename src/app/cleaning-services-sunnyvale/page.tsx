import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "sunnyvale")!;
export const metadata: Metadata = {
  title: "House Cleaning in Sunnyvale, CA",
  description: "House cleaning in Sunnyvale for Eichlers, Cherry Chase and Birdland homes, and the older houses of the Heritage District. See your price before you book.",
  alternates: { canonical: "/cleaning-services-sunnyvale" },
  openGraph: { title: "House Cleaning in Sunnyvale, CA | New Star Cleaning", description: "House cleaning in Sunnyvale for Eichlers, Cherry Chase and Birdland homes, and the older houses of the Heritage District. See your price before you book.", url: "https://newstarcleaning.com/cleaning-services-sunnyvale" },
  twitter: { title: "House Cleaning in Sunnyvale, CA | New Star Cleaning", description: "House cleaning in Sunnyvale for Eichlers, Cherry Chase and Birdland homes, and the older houses of the Heritage District. See your price before you book." },
};
export default function SunnyvalePage() { return <ServiceAreaPage area={area} />; }

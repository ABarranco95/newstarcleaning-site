import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "santa-clara")!;
export const metadata: Metadata = {
  title: "House Cleaning in Santa Clara, CA",
  description: "House cleaning in Santa Clara, from Old Quad Victorians to Rivermark townhomes and apartments near Lawrence Station. See your price before you book.",
  alternates: { canonical: "/cleaning-services-santa-clara" },
  openGraph: { title: "House Cleaning in Santa Clara, CA | New Star Cleaning", description: "House cleaning in Santa Clara, from Old Quad Victorians to Rivermark townhomes and apartments near Lawrence Station. See your price before you book.", url: "https://newstarcleaning.com/cleaning-services-santa-clara" },
  twitter: { title: "House Cleaning in Santa Clara, CA | New Star Cleaning", description: "House cleaning in Santa Clara, from Old Quad Victorians to Rivermark townhomes and apartments near Lawrence Station. See your price before you book." },
};
export default function SantaClaraPage() { return <ServiceAreaPage area={area} />; }

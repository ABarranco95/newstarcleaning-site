import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "san-jose")!;
export const metadata: Metadata = {
  title: "House Cleaning in San Jose, CA",
  description: "House cleaning across San Jose: Cambrian, Almaden Valley, Willow Glen, West San Jose and more. See your price and the full checklist before you book.",
  alternates: { canonical: "/cleaning-services-san-jose" },
  openGraph: { title: "House Cleaning in San Jose, CA | New Star Cleaning", description: "House cleaning across San Jose: Cambrian, Almaden Valley, Willow Glen, West San Jose and more. See your price and the full checklist before you book.", url: "https://newstarcleaning.com/cleaning-services-san-jose" },
  twitter: { title: "House Cleaning in San Jose, CA | New Star Cleaning", description: "House cleaning across San Jose: Cambrian, Almaden Valley, Willow Glen, West San Jose and more. See your price and the full checklist before you book." },
};
export default function SanJosePage() { return <ServiceAreaPage area={area} />; }

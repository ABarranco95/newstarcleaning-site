import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "saratoga")!;
export const metadata: Metadata = {
  title: "House Cleaning in Saratoga, CA",
  description: "House cleaning in Saratoga for Golden Triangle ranches, Village condos and larger foothill homes. See your price online or get a personal quote.",
  alternates: { canonical: "/cleaning-services-saratoga" },
  openGraph: { title: "House Cleaning in Saratoga, CA | New Star Cleaning", description: "House cleaning in Saratoga for Golden Triangle ranches, Village condos and larger foothill homes. See your price online or get a personal quote.", url: "https://newstarcleaning.com/cleaning-services-saratoga" },
  twitter: { title: "House Cleaning in Saratoga, CA | New Star Cleaning", description: "House cleaning in Saratoga for Golden Triangle ranches, Village condos and larger foothill homes. See your price online or get a personal quote." },
};
export default function SaratogaPage() { return <ServiceAreaPage area={area} />; }

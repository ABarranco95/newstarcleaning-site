import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "los-gatos")!;
export const metadata: Metadata = {
  title: "House Cleaning in Los Gatos, CA",
  description: "House cleaning in Los Gatos, from Almond Grove Victorians to Blossom Hill ranch homes and the foothills. See your price before you book.",
  alternates: { canonical: "/cleaning-services-los-gatos" },
  openGraph: { title: "House Cleaning in Los Gatos, CA | New Star Cleaning", description: "House cleaning in Los Gatos, from Almond Grove Victorians to Blossom Hill ranch homes and the foothills. See your price before you book.", url: "https://newstarcleaning.com/cleaning-services-los-gatos" },
  twitter: { title: "House Cleaning in Los Gatos, CA | New Star Cleaning", description: "House cleaning in Los Gatos, from Almond Grove Victorians to Blossom Hill ranch homes and the foothills. See your price before you book." },
};
export default function LosGatosPage() { return <ServiceAreaPage area={area} />; }

import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((item) => item.slug === "cupertino")!;
export const metadata: Metadata = {
  title: "House Cleaning in Cupertino, CA",
  description: "House cleaning in Cupertino, from Rancho Rinconada ranches and Fairgrove Eichlers to Stevens Creek townhomes. See your price before you book.",
  alternates: { canonical: "/cleaning-services-cupertino" },
  openGraph: { title: "House Cleaning in Cupertino, CA | New Star Cleaning", description: "House cleaning in Cupertino, from Rancho Rinconada ranches and Fairgrove Eichlers to Stevens Creek townhomes. See your price before you book.", url: "https://newstarcleaning.com/cleaning-services-cupertino" },
  twitter: { title: "House Cleaning in Cupertino, CA | New Star Cleaning", description: "House cleaning in Cupertino, from Rancho Rinconada ranches and Fairgrove Eichlers to Stevens Creek townhomes. See your price before you book." },
};
export default function CupertinoPage() { return <ServiceAreaPage area={area} />; }

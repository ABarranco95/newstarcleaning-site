import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("move-out-cleaning")!;

export const metadata: Metadata = {
  title: "Move-Out Cleaning in Fresno, CA",
  description:
    "Move-out and move-in cleaning for Fresno tenants, owners, sellers, buyers, and property turnovers. Request pricing and current availability.",
  alternates: {
    canonical: "/services/move-out-cleaning",
  },
  openGraph: {
    title:
      "Move-Out Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Move-out cleaning across Fresno, Clovis & Madera. Detailed empty-home cleaning for kitchens, bathrooms, baseboards, and floors, with appliance and cabinet interiors as add-ons.",
    url: "https://newstarcleaning.com/services/move-out-cleaning",
  },
};

export default function MoveOutCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Move-Out Cleaning in Fresno, CA"
    />
  );
}

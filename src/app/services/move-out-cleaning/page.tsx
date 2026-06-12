import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("move-out-cleaning")!;

export const metadata: Metadata = {
  title: "Move-Out Cleaning in Fresno, CA | Move-In Cleaning",
  description:
    "Clear-scope move-out and move-in cleaning for Fresno tenants, landlords, sellers, and buyers. Request same-week availability.",
  alternates: {
    canonical: "/services/move-out-cleaning",
  },
  openGraph: {
    title:
      "Move-Out Cleaning in Fresno, CA | Move-In Cleaning | New Star Cleaning",
    description:
      "Move-out cleaning across Fresno, Clovis & Madera with clear scope, appliance and empty-cabinet cleaning, and same-week availability.",
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

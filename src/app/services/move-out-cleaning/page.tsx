import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("move-out-cleaning")!;

export const metadata: Metadata = {
  title: "Move-Out Cleaning in Fresno, CA | Move-In Cleaning",
  description:
    "Comprehensive move-out cleaning for Fresno landlords and tenants. Deposit-back-quality service. Request same-week availability.",
  alternates: {
    canonical: "/services/move-out-cleaning",
  },
  openGraph: {
    title:
      "Move-Out Cleaning in Fresno, CA | Move-In Cleaning | New Star Cleaning",
    description:
      "Deposit-back-quality move-out cleaning across Fresno, Clovis & Madera. Same-week availability.",
    url: "https://newstarcleaning.com/services/move-out-cleaning",
  },
};

export default function MoveOutCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Move-Out Cleaning in Fresno, CA — Get Your Deposit Back"
    />
  );
}

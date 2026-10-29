import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("move-out-cleaning")!;

export const metadata: Metadata = {
  title: "Move-Out & Move-In Cleaning in Fresno & Clovis",
  description:
    "Empty-home cleaning in Fresno and Clovis, including empty cabinet, drawer and closet interiors. Oven and fridge interiors are optional. Request a quote.",
  alternates: {
    canonical: "/services/move-out-cleaning",
  },
  openGraph: {
    title:
      "Move-Out & Move-In Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Move-out and move-in cleaning in Fresno and Clovis, including empty cabinet and closet interiors. Oven and refrigerator interiors are optional add-ons.",
    url: "https://newstarcleaning.com/services/move-out-cleaning",
  },
};

export default function MoveOutCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Move-out & move-in cleaning in Fresno & Clovis."
    />
  );
}

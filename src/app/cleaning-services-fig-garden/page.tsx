import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fig-garden")!;

export const metadata: Metadata = {
  title: "House Cleaning in Fig Garden, Fresno",
  description:
    "Recurring, deep, and move-in/move-out house cleaning in Fig Garden, Fresno. Review services and request current availability.",
  alternates: {
    canonical: "/cleaning-services-fig-garden",
  },
  openGraph: {
    title: "House Cleaning in Fig Garden, Fresno | New Star Cleaning",
    description:
      "House cleaning in Old Fig Garden and nearby approved Fresno routes. Request pricing and current availability.",
    url: "https://newstarcleaning.com/cleaning-services-fig-garden",
  },
};

export default function FigGardenPage() {
  return <ServiceAreaPage area={area} />;
}

import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fig-garden")!;

export const metadata: Metadata = {
  title: "House Cleaning in Fig Garden, Fresno",
  description:
    "White-glove house cleaning in Old Fig Garden, Fresno. Recurring, deep, and move-out cleaning with clear scope before booking. Request clear pricing online.",
  alternates: {
    canonical: "/cleaning-services-fig-garden",
  },
  openGraph: {
    title: "House Cleaning in Fig Garden, Fresno | New Star Cleaning",
    description:
      "Reliable house cleaning in Old Fig Garden, Fresno. Clear-scope local cleaners. Request clear pricing online.",
    url: "https://newstarcleaning.com/cleaning-services-fig-garden",
  },
};

export default function FigGardenPage() {
  return <ServiceAreaPage area={area} />;
}

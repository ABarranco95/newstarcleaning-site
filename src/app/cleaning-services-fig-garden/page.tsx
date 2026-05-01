import type { Metadata } from "next";
import ServiceAreaPage from "@/components/ServiceAreaPage";
import { serviceAreas } from "@/lib/serviceAreas";

const area = serviceAreas.find((a) => a.slug === "fig-garden")!;

export const metadata: Metadata = {
  title: "House Cleaning in Fig Garden, Fresno",
  description:
    "White-glove house cleaning in Old Fig Garden, Fresno. Recurring, deep, and move-out cleaning from background-checked, insured teams. Book in 60 seconds.",
  alternates: {
    canonical: "/cleaning-services-fig-garden",
  },
  openGraph: {
    title: "House Cleaning in Fig Garden, Fresno | New Star Cleaning",
    description:
      "Reliable house cleaning in Old Fig Garden, Fresno. Vetted, insured cleaners. Book online in 60 seconds.",
    url: "https://newstarcleaning.com/cleaning-services-fig-garden",
  },
};

export default function FigGardenPage() {
  return <ServiceAreaPage area={area} />;
}

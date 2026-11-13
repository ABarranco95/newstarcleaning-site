import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("standard-cleaning")!;

export const metadata: Metadata = {
  title: "Recurring House Cleaning in Fresno & Clovis",
  description:
    "Recurring house cleaning in Fresno, Clovis and Madera: weekly, every two weeks or monthly, plus one-time standard cleans. See what's included and get your price.",
  alternates: {
    canonical: "/services/standard-cleaning",
  },
  openGraph: {
    title: "Recurring House Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Recurring house cleaning in Fresno, Clovis and Madera: weekly, every two weeks or monthly, plus one-time standard cleans. See what's included and get your price.",
    url: "https://newstarcleaning.com/services/standard-cleaning",
  },
};

export default function StandardCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Recurring house cleaning in Fresno, Clovis & Madera."
      intro="This is our standard cleaning: kitchen, bathrooms, dusting and floors, the same checklist every visit. Book it weekly, every two weeks or monthly, or once for a home that's already kept up."
    />
  );
}

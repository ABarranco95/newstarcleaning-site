import type { Metadata } from "next";
import { socialMetadata } from "@/lib/socialMeta";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { getService } from "@/lib/services";

const service = getService("standard-cleaning")!;

export const metadata: Metadata = {
  title: "Recurring & Standard House Cleaning in Fresno & Clovis",
  description:
    "Recurring & standard house cleaning in Fresno, Clovis, and Madera: weekly, bi-weekly, or monthly maid-style upkeep, plus one-time standard cleans. See what's included and get your price.",
  alternates: {
    canonical: "/services/standard-cleaning",
  },
  ...socialMetadata({
    title: "Recurring & Standard House Cleaning in Fresno & Clovis | New Star Cleaning",
    description:
      "Recurring & standard house cleaning in Fresno, Clovis, and Madera: weekly, bi-weekly, or monthly visits, plus one-time standard cleans. See what's included and get your price.",
    url: "https://newstarcleaning.com/services/standard-cleaning",
  }),
};

export default function StandardCleaningPage() {
  return (
    <ServiceDetailPage
      service={service}
      h1="Recurring & standard house cleaning in Fresno & Clovis."
      intro="Regular upkeep for Fresno, Clovis, and Madera homes: kitchen, bathrooms, dusting, and floors on the same checklist every visit. Book weekly, every two weeks, monthly, or one-time."
    />
  );
}

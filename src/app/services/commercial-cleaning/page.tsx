import type { Metadata } from "next";
import CommercialServicePage from "@/components/CommercialServicePage";

export const metadata: Metadata = {
  title: "Office & Commercial Cleaning in Fresno, CA",
  description:
    "Office and commercial cleaning in Fresno, Clovis & Madera. Restrooms, breakrooms, shared spaces and floors. Request a walkthrough and written quote.",
  alternates: { canonical: "/services/commercial-cleaning" },
  openGraph: {
    title: "Office & Commercial Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Walkthrough-based office cleaning proposals for Fresno, Clovis, Madera, and close-in Fresno routes.",
    url: "https://newstarcleaning.com/services/commercial-cleaning",
  },
};

const scopes = [
  {
    title: "Offices and common areas",
    description:
      "Reception areas, conference rooms, cleared desks, touchpoints, interior entry glass, and trash. We work around the areas your team uses and keep private work materials undisturbed.",
  },
  {
    title: "Restrooms and breakrooms",
    description:
      "Toilets, sinks, counters, tables, appliance exteriors, touchpoints, trash, and floors. Frequency is planned around daily use and the needs of the space.",
  },
  {
    title: "Recurring floor care",
    description:
      "Vacuuming, sweeping, and mopping suited to your floor surfaces. Carpet extraction, stripping, waxing, refinishing, and restoration are not part of routine cleaning.",
  },
];

const process = [
  {
    title: "Facility intake",
    description:
      "Share the address, square footage, business type, occupied hours, requested frequency, security requirements, and known problem areas.",
  },
  {
    title: "Walkthrough",
    description:
      "We review restrooms, breakrooms, offices, common areas, floors, trash volume, access, storage, and service-window constraints.",
  },
  {
    title: "Written proposal",
    description:
      "The proposal defines the task list, frequency, exclusions, supplies or consumables responsibility, price, and start conditions.",
  },
  {
    title: "Pilot and review",
    description:
      "When appropriate, one paid service or limited-area pilot confirms the standard before a longer recurring schedule is considered.",
  },
];

const faqs = [
  {
    question: "Which commercial properties do you clean?",
    answer:
      "We evaluate offices, professional suites, retail spaces, small commercial facilities, property-management spaces, and similar workplaces within the approved route area. Medical, dental, and other specialized facilities are welcome to reach out: the walkthrough is where we confirm what the space needs and whether we are the right fit. Industrial, food-production, and hazardous environments may need work outside our scope, and we will say so directly.",
  },
  {
    question: "Do you provide nightly janitorial service?",
    answer:
      "Tell us how often you need service and when the building is accessible. We review the facility and confirm the available schedule before you agree to ongoing cleaning.",
  },
  {
    question: "Are paper products and restroom consumables included?",
    answer:
      "Not automatically. The written proposal states whether the customer supplies consumables or asks New Star to price replenishment separately.",
  },
  {
    question: "Can you work after business hours?",
    answer:
      "Ask about the hours you need. We review available coverage, building access, keys, and alarm instructions before confirming an after-hours schedule.",
  },
  {
    question: "Can we start with one paid cleaning?",
    answer:
      "Yes. A paid pilot is often the cleanest way to confirm the task list, communication, access procedure, and quality standard before moving to a recurring agreement.",
  },
];

export default function CommercialCleaningPage() {
  return (
    <CommercialServicePage
      eyebrow="Office and facility cleaning"
      h1="Office and commercial cleaning in Fresno, CA"
      intro="Keep your workplace ready for the people who use it. Cleaning for offices, professional suites, retail spaces, and shared areas—with a task list and schedule that fit your building."
      serviceName="Office & Commercial Cleaning"
      schemaServiceType="Commercial cleaning and office cleaning"
      quoteService="Office / commercial cleaning"
      source="organic_commercial_cleaning_service"
      fitTitle="The everyday cleaning your workplace needs"
      fitIntro="Start with the spaces that matter most to your staff and visitors. During the walkthrough, we agree on the areas to clean, how often, and the best time to work. Your proposal puts the task list and price in writing."
      scopes={scopes}
      bestFor={[
        "Offices and professional suites",
        "Retail and customer-facing spaces",
        "Shared spaces managed by property teams",
        "One-time or recurring cleaning, by proposal",
      ]}
      process={process}
      boundaries={[
        "Medical waste, biohazards, sharps, mold remediation, industrial contamination, and regulated cleanup are not standard commercial scope.",
        "Carpet extraction, stripping and waxing, floor refinishing, exterior high glass, pressure washing, and restoration are not included in routine cleaning.",
        "Customer-supplied consumables, alarm procedures, keys, storage, and access permissions must be settled before service begins.",
        "The approved task list and frequency—not an implied unlimited-cleaning promise—define the recurring service.",
      ]}
      faqs={faqs}
    />
  );
}

import type { Metadata } from "next";
import CommercialServicePage from "@/components/CommercialServicePage";

export const metadata: Metadata = {
  title: "Office & Commercial Cleaning in Fresno, CA",
  description:
    "Scoped office and commercial cleaning for Fresno-area workplaces and property teams. Request a walkthrough for frequency, priorities, and written pricing.",
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
      "Accessible desks and horizontal surfaces, reception areas, conference rooms, touchpoints, interior entry glass, trash, and floors are scoped around occupancy and access rules.",
  },
  {
    title: "Restrooms and breakrooms",
    description:
      "Fixtures, counters, sinks, exterior appliances, tables, touchpoints, trash, and floors are included according to the approved task list and service frequency.",
  },
  {
    title: "Recurring floor care",
    description:
      "Routine vacuuming, sweeping, and mopping can be included. Carpet extraction, stripping, waxing, refinishing, pressure washing, and restoration are separate specialty work.",
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
      "We evaluate offices, professional suites, small commercial facilities, property-management spaces, and similar workplaces within the approved route area. Regulated, industrial, medical, food-production, or hazardous environments require separate qualification and may not be accepted.",
  },
  {
    question: "Do you provide nightly janitorial service?",
    answer:
      "Frequency depends on the facility, access window, task list, contract size, and current cleaner capacity. We do not promise nightly coverage until the walkthrough and operating plan are approved.",
  },
  {
    question: "Are paper products and restroom consumables included?",
    answer:
      "Not automatically. The written proposal states whether the customer supplies consumables or asks New Star to price replenishment separately.",
  },
  {
    question: "Can you work after business hours?",
    answer:
      "Potentially. Access, alarm procedures, key control, building rules, and available crew coverage must be reviewed before an after-hours schedule is approved.",
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
      intro="Walkthrough-based cleaning for offices, professional suites, property teams, and small commercial facilities. Frequency, scope, access, and pricing are confirmed in writing before service starts."
      serviceName="Office & Commercial Cleaning"
      schemaServiceType="Commercial cleaning and office cleaning"
      quoteService="Office / commercial cleaning"
      source="organic_commercial_cleaning_service"
      fitTitle="A cleaning plan tied to the actual facility"
      fitIntro="Commercial accounts fail when a generic checklist ignores occupancy, trash volume, restroom use, flooring, security, and service windows. The proposal starts with those operating facts so the crew and customer are aligned."
      scopes={scopes}
      bestFor={[
        "Professional offices and administrative workplaces",
        "Property managers needing a scoped vendor for shared or vacant commercial space",
        "Small facilities that want a clear recurring task list and one accountable contact",
        "Businesses that prefer a paid pilot before approving ongoing service",
      ]}
      process={process}
      boundaries={[
        "Medical waste, biohazards, sharps, mold remediation, industrial contamination, and regulated cleanup are not standard commercial scope.",
        "Carpet extraction, stripping and waxing, floor refinishing, exterior high glass, pressure washing, and restoration require separate specialty pricing.",
        "Customer-supplied consumables, alarm procedures, keys, storage, and access permissions must be settled before service begins.",
        "The approved task list and frequency—not an implied unlimited-cleaning promise—define the recurring service.",
      ]}
      faqs={faqs}
    />
  );
}

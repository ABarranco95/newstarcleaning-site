import type { Metadata } from "next";
import CommercialServicePage from "@/components/CommercialServicePage";

export const metadata: Metadata = {
  title: "Post-Construction Cleaning in Fresno, CA",
  description:
    "Post-construction final cleaning for Fresno-area builders, remodelers, property owners, and project teams. Request a scoped walkthrough and written proposal.",
  alternates: { canonical: "/services/post-construction-cleaning" },
  openGraph: {
    title: "Post-Construction Cleaning in Fresno, CA | New Star Cleaning",
    description:
      "Scoped final cleaning, detail cleaning, and punch-return support for Fresno-area construction and renovation projects.",
    url: "https://newstarcleaning.com/services/post-construction-cleaning",
  },
};

const scopes = [
  {
    title: "Final interior clean",
    description:
      "Dust and debris remaining after trades are substantially complete are addressed across accessible horizontal surfaces, kitchens, bathrooms, fixtures, trim, doors, and finished floors.",
  },
  {
    title: "Turnover detail",
    description:
      "Cabinet interiors, appliance surfaces, closet shelving, reachable glass, labels, light adhesive residue, and presentation details are included only when written into the approved scope.",
  },
  {
    title: "Punch-return visit",
    description:
      "A separate return can be priced after final trade corrections or inspections. The proposal defines which areas are being revisited and what new construction dust is included.",
  },
];

const process = [
  {
    title: "Project intake",
    description:
      "Share the address, square footage, construction stage, required handoff date, access rules, site contact, and current photos or plans.",
  },
  {
    title: "Walkthrough and scope",
    description:
      "We separate rough, final, glass/detail, and return work so the proposal reflects the actual condition and deadline.",
  },
  {
    title: "Written proposal",
    description:
      "The proposal lists included areas, exclusions, access assumptions, price, and timing before a crew is scheduled.",
  },
  {
    title: "Handoff check",
    description:
      "Completed work is checked against the written scope. Newly created dust or trade work after cleaning is handled as a separate return scope.",
  },
];

const faqs = [
  {
    question: "Do you provide post-construction cleaning for new homes and remodels?",
    answer:
      "Yes, when the project, condition, access, deadline, and crew capacity fit. We review the site before confirming a final-clean or renovation-cleaning proposal.",
  },
  {
    question: "Is construction debris hauling included?",
    answer:
      "No. Contractors should remove lumber, drywall, packaging, sharp debris, hazardous material, and bulk waste before the cleaning phase unless a separate disposal scope is expressly approved.",
  },
  {
    question: "Can final window cleaning be included?",
    answer:
      "Reachable interior glass and selected accessible window detail can be scoped. Exterior elevations, lifts, roof access, high ladder work, damaged glass, and specialized restoration are not automatically included.",
  },
  {
    question: "When should the final clean be scheduled?",
    answer:
      "After dusty trades and major corrections are substantially complete, utilities are working, surfaces are cured, debris is removed, and controlled access is available. Continued trade traffic can create a separate punch-return need.",
  },
  {
    question: "Can we start with one paid project?",
    answer:
      "Yes. A paid pilot on one home, unit, renovation, or defined project area is the preferred way to confirm scope, communication, quality expectations, and production timing before discussing repeat volume.",
  },
];

export default function PostConstructionCleaningPage() {
  return (
    <CommercialServicePage
      eyebrow="Fresno-area project cleaning"
      h1="Post-construction cleaning in Fresno, CA"
      intro="Final cleaning for new homes, renovations, tenant improvements, and property handoffs. Every project starts with the actual site condition, deadline, access, and written scope—not a generic square-foot promise."
      serviceName="Post-Construction Cleaning"
      schemaServiceType="Post-construction cleaning"
      quoteService="Post-construction cleaning"
      source="organic_post_construction_service"
      fitTitle="Final cleaning built around the handoff"
      fitIntro="Construction cleaning is not the same as an occupied-home clean. Dust can return after trades move through, deadlines are fixed, and the difference between rough, final, glass, and punch work has to be explicit before pricing."
      scopes={scopes}
      bestFor={[
        "Home builders and general contractors approaching buyer or owner handoff",
        "Remodelers finishing kitchens, bathrooms, additions, and whole-home renovations",
        "Property owners preparing newly completed or improved space for occupancy",
        "Project teams that need one paid pilot before approving repeat work",
      ]}
      process={process}
      boundaries={[
        "No hazardous dust, lead, asbestos, mold remediation, biohazards, active demolition, or unsafe unfinished areas.",
        "Bulk construction debris, sharp materials, paint disposal, and hauling remain the contractor’s responsibility unless separately approved.",
        "Exterior elevations, lifts, roof access, high glass, pressure washing, floor refinishing, and restoration require separate specialty scope.",
        "The site needs working utilities, safe access, cured surfaces, and major dusty trades substantially complete before final cleaning.",
      ]}
      faqs={faqs}
    />
  );
}

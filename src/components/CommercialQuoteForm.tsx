"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mergeAttributionForSubmission, sanitizeReferrer } from "@/lib/attribution";
import { trackFunnelEvent, trackLeadConversion } from "@/lib/conversionTracking";
import { createSubmissionId } from "@/lib/submissionId";

// Commercial and post-construction work is quoted from a walkthrough or
// photo/plan review, never self-booked. This form collects what a real
// proposal needs: organization, property type, size, required areas,
// frequency or deadline, access, and contact method.

type CommercialFormState = {
  name: string;
  phone: string;
  email: string;
  organization: string;
  service: string;
  propertyType: string;
  city: string;
  sqft: string;
  frequency: string;
  timeline: string;
  deadline: string;
  scope: string;
  walkthroughPreference: string;
  contactPreference: string;
  company: string;
};

type CommercialQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultService?: string;
};

const services = ["Office / commercial cleaning", "Post-construction cleaning"];

const propertyTypes = [
  "Office",
  "Retail or storefront",
  "Medical or dental office",
  "Restaurant or food service",
  "Warehouse or industrial",
  "Apartment or HOA common areas",
  "New construction or renovation",
  "Other",
];

const sqftOptions = [
  "under-1000",
  "1000-1499",
  "1500-1999",
  "2000-2499",
  "2500-2999",
  "3000-3499",
  "3500-4999",
  "5000-9999",
  "10000-19999",
  "20000+",
];

const sqftLabels: Record<string, string> = {
  "under-1000": "Under 1,000",
  "1000-1499": "1,000 – 1,499",
  "1500-1999": "1,500 – 1,999",
  "2000-2499": "2,000 – 2,499",
  "2500-2999": "2,500 – 2,999",
  "3000-3499": "3,000 – 3,499",
  "3500-4999": "3,500 – 4,999",
  "5000-9999": "5,000 – 9,999",
  "10000-19999": "10,000 – 19,999",
  "20000+": "20,000+",
};

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute/70 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

function normalizeServiceParam(value: string | null): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (normalized.includes("post-construction") || normalized.includes("post construction")) {
    return "Post-construction cleaning";
  }
  if (normalized.includes("commercial") || normalized.includes("office")) {
    return "Office / commercial cleaning";
  }
  return "";
}

function initialForm(defaultService?: string): CommercialFormState {
  return {
    name: "",
    phone: "",
    email: "",
    organization: "",
    service: defaultService || "",
    propertyType: "",
    city: "",
    sqft: "",
    frequency: "",
    timeline: "",
    deadline: "",
    scope: "",
    walkthroughPreference: "",
    contactPreference: "",
    company: "",
  };
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold tracking-[0.03em] text-ink-soft">
      {children} {required ? <span className="text-accent">*</span> : null}
    </label>
  );
}

export default function CommercialQuoteForm({
  title = "Request a walkthrough",
  subtitle = "Tell us about the property or project. We confirm scope and capacity before proposing work.",
  source = "organic_commercial_quote_page",
  defaultService,
}: CommercialQuoteFormProps) {
  const [formData, setFormData] = useState<CommercialFormState>(() => initialForm(defaultService));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const hasTrackedFormStart = useRef(false);
  const submissionIdRef = useRef("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const capture: Record<string, string> = {};
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
      "fbclid",
    ].forEach((key) => {
      const value = params.get(key);
      if (value) capture[key] = value;
    });
    const referrer = sanitizeReferrer(document.referrer);
    if (referrer) capture.referrer = referrer;
    setTracking(capture);

    const service = normalizeServiceParam(params.get("service"));
    if (service) {
      setFormData((current) => ({ ...current, service: current.service || service }));
    }
  }, []);

  const trackFormStart = () => {
    if (hasTrackedFormStart.current) return;
    hasTrackedFormStart.current = true;
    trackFunnelEvent("quote_form_start", {
      source,
      service: formData.service,
      city: formData.city,
      page: window.location.pathname,
    });
  };

  const updateField = (field: keyof CommercialFormState, value: string) => {
    trackFormStart();
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const isProjectService = formData.service === "Post-construction cleaning";
  const needsDeadline = formData.timeline === "specific-deadline";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackFunnelEvent("quote_submit_attempt", {
      source,
      service: formData.service,
      city: formData.city,
      page: window.location.pathname,
    });
    setIsSubmitting(true);
    setError("");

    try {
      const attribution = mergeAttributionForSubmission({
        ...tracking,
        firstLandingPage: window.location.pathname,
        firstReferrer: document.referrer,
        landingService: formData.service,
      });
      if (!submissionIdRef.current) submissionIdRef.current = createSubmissionId();

      // The required-areas answer is the project scope Apex quotes from.
      // Walkthrough preference rides along as a labeled line the CRM keeps.
      const messageLines = [
        formData.scope.trim(),
        formData.walkthroughPreference
          ? `Walkthrough preference: ${formData.walkthroughPreference}`
          : "",
        needsDeadline && formData.deadline.trim()
          ? `Deadline: ${formData.deadline.trim()}`
          : "",
      ].filter(Boolean);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          organization: formData.organization,
          service: formData.service,
          propertyType: formData.propertyType,
          city: formData.city,
          sqft: formData.sqft,
          homeSize: formData.sqft,
          frequency: formData.frequency,
          timeline: formData.timeline,
          requestedDate: needsDeadline ? formData.deadline.trim() || undefined : undefined,
          contactPreference: formData.contactPreference,
          walkthroughPreference: formData.walkthroughPreference,
          message: messageLines.join("\n"),
          company: formData.company,
          ...tracking,
          ...attribution,
          source,
          sourceForm: source,
          submissionId: submissionIdRef.current,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
          smsConsent: "service_related_quote_follow_up",
          consentText:
            "By requesting a quote, the visitor agreed to receive service-related calls/texts about pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out.",
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        details?: unknown;
        filtered?: boolean;
      };

      if (!response.ok) {
        if (response.status === 400) {
          trackFunnelEvent("quote_validation_error", {
            source,
            service: formData.service,
            city: formData.city,
            page: window.location.pathname,
            validationField: "server_validation",
          });
        }
        const details = Array.isArray(data.details) ? (data.details[0] as string | undefined) : undefined;
        throw new Error(
          (typeof data.error === "string" ? data.error : undefined) ||
            details ||
            "Could not send your request."
        );
      }

      if (data.filtered !== true) {
        trackLeadConversion({
          source,
          service: formData.service,
          city: formData.city,
          page: window.location.pathname,
          leadType: "walkthrough_request",
        });
      }

      setIsSuccess(true);
      submissionIdRef.current = "";
      setFormData(initialForm(defaultService));
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please call us directly and we will help right away."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-elev">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-ink">Request received.</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          We will review the property or project details and reach out to set up the walkthrough
          or photo review before any pricing is confirmed.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-elev sm:p-7 lg:p-8">
      <div className="mb-6">
        <span className="eyebrow eyebrow-dot">Commercial & project work</span>
        <h2 className="mt-3 font-display text-2xl leading-tight text-ink lg:text-[1.6rem]">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm leading-relaxed text-ink-soft">{subtitle}</p> : null}
      </div>

      <form
        onSubmit={handleSubmit}
        data-clarity-mask="true"
        onFocusCapture={trackFormStart}
        onInvalidCapture={(event) => {
          const field =
            event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLSelectElement ||
            event.target instanceof HTMLTextAreaElement
              ? event.target.name
              : "unknown";
          trackFunnelEvent("quote_validation_error", {
            source,
            service: formData.service,
            city: formData.city,
            page: window.location.pathname,
            validationField: field || "unknown",
          });
        }}
        className="space-y-4"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="commercial-company">Company</label>
          <input
            id="commercial-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-name" required>Contact name</FieldLabel>
            <input
              id="commercial-name"
              name="name"
              type="text"
              required
              minLength={2}
              value={formData.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
              placeholder="Your name"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="commercial-phone" required>Phone</FieldLabel>
            <input
              id="commercial-phone"
              name="phone"
              type="tel"
              required
              minLength={10}
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              autoComplete="tel"
              placeholder="(559) 000-0000"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-email">Email</FieldLabel>
            <input
              id="commercial-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              placeholder="For the written proposal"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="commercial-organization">Company or project name</FieldLabel>
            <input
              id="commercial-organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={(event) => updateField("organization", event.target.value)}
              autoComplete="organization"
              placeholder="Business, builder, or property"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-service" required>Type of work</FieldLabel>
            <select
              id="commercial-service"
              name="service"
              required
              value={formData.service}
              onChange={(event) => updateField("service", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="commercial-property-type" required>Property type</FieldLabel>
            <select
              id="commercial-property-type"
              name="propertyType"
              required
              value={formData.propertyType}
              onChange={(event) => updateField("propertyType", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-city" required>City or ZIP</FieldLabel>
            <input
              id="commercial-city"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              autoComplete="address-level2"
              placeholder="Fresno or 93711"
              className={fieldClass}
            />
          </div>
          <div>
            <FieldLabel htmlFor="commercial-sqft" required>Approx. sq ft</FieldLabel>
            <select
              id="commercial-sqft"
              name="sqft"
              required
              value={formData.sqft}
              onChange={(event) => updateField("sqft", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select size…</option>
              {sqftOptions.map((value) => (
                <option key={value} value={value}>{sqftLabels[value]}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-frequency" required>
              {isProjectService ? "Project need" : "Frequency needed"}
            </FieldLabel>
            <select
              id="commercial-frequency"
              name="frequency"
              required
              value={formData.frequency}
              onChange={(event) => updateField("frequency", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              <option value="one-time">One-time project</option>
              {!isProjectService ? (
                <>
                  <option value="daily">Daily or nightly</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="not-sure">Recurring, not sure how often</option>
                </>
              ) : (
                <option value="phased">Phased (rough + final clean)</option>
              )}
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="commercial-timeline" required>Timeline</FieldLabel>
            <select
              id="commercial-timeline"
              name="timeline"
              required
              value={formData.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select timing…</option>
              <option value="this-week">This week</option>
              <option value="next-week">Next week</option>
              <option value="specific-deadline">Specific deadline</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        {needsDeadline ? (
          <div>
            <FieldLabel htmlFor="commercial-deadline">Target date or deadline</FieldLabel>
            <input
              id="commercial-deadline"
              name="deadline"
              type="text"
              value={formData.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
              placeholder="Example: handoff on August 15"
              className={fieldClass}
            />
          </div>
        ) : null}

        <div>
          <FieldLabel htmlFor="commercial-scope" required>
            {isProjectService ? "Project state and areas to clean" : "Areas that need cleaning"}
          </FieldLabel>
          <textarea
            id="commercial-scope"
            name="scope"
            required
            rows={3}
            value={formData.scope}
            onChange={(event) => updateField("scope", event.target.value)}
            placeholder={
              isProjectService
                ? "Example: final clean after paint and flooring — dust removal, windows, bathrooms, kitchen, floors"
                : "Example: offices, restrooms, breakroom, entry glass, trash — plus current condition"
            }
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="commercial-walkthrough">Scoping preference</FieldLabel>
            <select
              id="commercial-walkthrough"
              name="walkthroughPreference"
              value={formData.walkthroughPreference}
              onChange={(event) => updateField("walkthroughPreference", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              <option value="On-site walkthrough">On-site walkthrough</option>
              <option value="Photos or plans first">Photos or plans first</option>
              <option value="Either works">Either works</option>
            </select>
          </div>
          <div>
            <FieldLabel htmlFor="commercial-contact-preference">Best way to reach you</FieldLabel>
            <select
              id="commercial-contact-preference"
              name="contactPreference"
              value={formData.contactPreference}
              onChange={(event) => updateField("contactPreference", event.target.value)}
              className={fieldClass}
            >
              <option value="">Best way?</option>
              <option value="text">Text</option>
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="either">Any of these</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-accent w-full !text-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isSubmitting ? "Sending…" : "Request a walkthrough"}
          {!isSubmitting && (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-ink-soft">
          By submitting, you consent to service-related calls/texts from New Star Cleaning about
          your quote, scheduling, and follow-ups. Reply STOP to opt out. Consent is not required
          to purchase services.
          &nbsp;·&nbsp;
          <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-accent">Privacy Policy</Link>
        </p>
      </form>
    </div>
  );
}

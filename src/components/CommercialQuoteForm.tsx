"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mergeAttributionForSubmission, sanitizeReferrer } from "@/lib/attribution";
import { paidSessionId, trackFunnelEvent, trackLeadConversion } from "@/lib/conversionTracking";
import { createSubmissionId } from "@/lib/submissionId";
import { buildQuoteSmsConsent, QUOTE_SMS_DISCLOSURE } from "@/lib/quoteSmsConsent";
import { replyWindowExpectation, serviceAreaToday, specificDeadlineError } from "@/lib/assistedIntakeValidation";
import { business as BUSINESS } from "@/lib/business";

// Commercial and post-construction work is quoted from a walkthrough or
// photo/plan review, never self-booked. Split into two fast steps so mobile
// buyers aren't hit by a 14-field wall while Apex still receives complete
// scope, property category, size, schedule/deadline, and contact preference.

type CommercialFormState = {
  name: string;
  phone: string;
  email: string;
  organization: string;
  service: string;
  propertyType: string;
  city: string;
  sqft: string;
  commercialFrequency: string;
  timeline: string;
  deadline: string;
  scope: string;
  walkthroughPreference: string;
  contactPreference: string;
  quoteWebsiteUrl: string;
};

type CommercialQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultService?: string;
  defaultCity?: string;
};

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

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

const COMMERCIAL_SCOPE_CHIPS = [
  "Offices & desks",
  "Restrooms",
  "Breakroom / kitchen",
  "Entry glass & reception",
  "Floors & trash",
];

const PROJECT_SCOPE_CHIPS = [
  "Final dust removal",
  "Kitchen & bathrooms",
  "Interior windows & tracks",
  "Cabinets & fixtures",
  "Finished floors",
];

const fieldClass = "qf-input";

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

function normalizeCityParam(value: string | null): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed || trimmed.toLowerCase() === "near-me") return "";
  const labels: Record<string, string> = {
    fresno: "Fresno",
    clovis: "Clovis",
    madera: "Madera",
    "north-fresno": "North Fresno",
    "woodward-park": "Woodward Park",
    "fig-garden": "Fig Garden",
    "tower-district": "Tower District",
  };
  const key = trimmed.toLowerCase().replace(/[ _]+/g, "-");
  return labels[key] || trimmed;
}

function initialForm(defaultService?: string, defaultCity?: string): CommercialFormState {
  return {
    name: "",
    phone: "",
    email: "",
    organization: "",
    service: defaultService || "",
    propertyType: "",
    city: defaultCity || "",
    sqft: "",
    commercialFrequency: "",
    timeline: "",
    deadline: "",
    scope: "",
    walkthroughPreference: "",
    contactPreference: "",
    quoteWebsiteUrl: "",
  };
}

function firstInvalidControl(root: ParentNode | null): FormControl | null {
  if (!root) return null;
  const controls = root.querySelectorAll<FormControl>("input, select, textarea");
  for (const control of controls) {
    if (!control.disabled && !control.checkValidity()) return control;
  }
  return null;
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
  optional = false,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="qf-label">
      {children}
      {required ? <span className="text-accent"> *</span> : null}
      {optional ? <span className="qf-optional">Optional</span> : null}
    </label>
  );
}

export default function CommercialQuoteForm({
  title = "Request a walkthrough",
  subtitle = "Tell us about the property or project. We confirm scope and availability before proposing work.",
  source = "organic_commercial_quote_page",
  defaultService,
  defaultCity,
}: CommercialQuoteFormProps) {
  const [formData, setFormData] = useState<CommercialFormState>(() => initialForm(defaultService, defaultCity));
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedExpectation, setSubmittedExpectation] = useState("");
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const hasTrackedFormStart = useRef(false);
  const submissionIdRef = useRef("");
  const submitInFlightRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const stepTitleRef = useRef<HTMLParagraphElement>(null);

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
    const city = normalizeCityParam(params.get("city") || params.get("zip"));
    if (service || city) {
      setFormData((current) => ({
        ...current,
        service: current.service || service,
        city: current.city || city,
      }));
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
    if (field === "contactPreference" && (value === "call" || value === "email")) setSmsOptIn(false);
    setFormData((current) => ({
      ...current,
      [field]: value,
      ...(field === "timeline" && value !== "specific-deadline" ? { deadline: "" } : {}),
    }));
  };

  const toggleScopeChip = (chip: string) => {
    trackFormStart();
    setSelectedScopes((current) =>
      current.includes(chip) ? current.filter((item) => item !== chip) : [...current, chip],
    );
  };

  const isProjectService = formData.service === "Post-construction cleaning";
  const needsDeadline = formData.timeline === "specific-deadline";
  const scopeChips = isProjectService ? PROJECT_SCOPE_CHIPS : COMMERCIAL_SCOPE_CHIPS;
  const combinedScope = [
    selectedScopes.length ? `Selected areas: ${selectedScopes.join(", ")}.` : "",
    formData.scope.trim(),
  ]
    .filter(Boolean)
    .join(" ");

  const focusStep = (target: 1 | 2) => {
    setStep(target);
    window.setTimeout(() => {
      const container = containerRef.current;
      if (container && container.getBoundingClientRect().top < 0) {
        container.scrollIntoView({ block: "start" });
      }
      stepTitleRef.current?.focus({ preventScroll: true });
    }, 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitInFlightRef.current) return;
    setError("");

    const formElement = event.currentTarget;
    const stepRoot = formElement.querySelector(`[data-quote-step="${step}"]`);
    const invalid = firstInvalidControl(stepRoot);
    if (invalid) {
      invalid.reportValidity();
      invalid.focus({ preventScroll: true });
      return;
    }

    if (step === 1) {
      const deadlineError = specificDeadlineError({
        timeline: formData.timeline,
        requestedDate: formData.deadline,
      });
      if (deadlineError) {
        setError(deadlineError);
        return;
      }
      trackFunnelEvent("quote_step_complete", {
        source,
        service: formData.service,
        city: formData.city,
        page: window.location.pathname,
        ctaLocation: "step_1",
      });
      focusStep(2);
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!combinedScope) {
      setError("Please select at least one area to clean or add a short scope note.");
      return;
    }
    const deadlineError = specificDeadlineError({
      timeline: formData.timeline,
      requestedDate: formData.deadline,
    });
    if (deadlineError) {
      setError(deadlineError);
      focusStep(1);
      return;
    }

    trackFunnelEvent("quote_submit_attempt", {
      source,
      service: formData.service,
      city: formData.city,
      page: window.location.pathname,
    });
    setIsSubmitting(true);

    try {
      submitInFlightRef.current = true;
      const attribution = mergeAttributionForSubmission({
        ...tracking,
        firstLandingPage: window.location.pathname,
        firstReferrer: document.referrer,
        landingService: formData.service,
      });
      if (!submissionIdRef.current) submissionIdRef.current = createSubmissionId();

      const messageLines = [
        combinedScope,
        formData.organization.trim() ? `Company/project: ${formData.organization.trim()}` : "",
        `Property category: ${formData.propertyType}`,
        formData.commercialFrequency ? `Commercial schedule: ${formData.commercialFrequency}` : "",
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
          frequency: formData.commercialFrequency,
          commercialFrequency: formData.commercialFrequency,
          timeline: formData.timeline,
          requestedDate: needsDeadline ? formData.deadline.trim() || undefined : undefined,
          contactPreference: formData.contactPreference,
          walkthroughPreference: formData.walkthroughPreference,
          message: messageLines.join("\n"),
          quoteWebsiteUrl: formData.quoteWebsiteUrl,
          ...tracking,
          ...attribution,
          source,
          sourceForm: source,
          funnelSessionId: paidSessionId(),
          nsinternal: new URLSearchParams(window.location.search).get("nsinternal") === "1" ? "1" : undefined,
          submissionId: submissionIdRef.current,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
          smsConsent: buildQuoteSmsConsent(smsOptIn, formData.contactPreference, source),
          consentText: QUOTE_SMS_DISCLOSURE,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        metadata?: { apex?: { success?: boolean } };
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
            "Could not send your request.",
        );
      }

      if (data.filtered !== true && data.metadata?.apex?.success !== true) {
        throw new Error("We couldn't confirm your request. Please retry or call us.");
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

      setSubmittedExpectation(replyWindowExpectation());
      setIsSuccess(true);
      submissionIdRef.current = "";
      setFormData(initialForm(defaultService, defaultCity));
      setSelectedScopes([]);
      setSmsOptIn(false);
      setStep(1);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please call us directly and we will help right away.",
      );
    } finally {
      submitInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div ref={containerRef} className="qf qf-success">
        <div className="qf-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2>Request received.</h2>
        <p>
          We will review the property or project details and reach out to set up the walkthrough
          or photo review before any pricing is confirmed. {submittedExpectation || replyWindowExpectation()}
        </p>
        <a
          href={BUSINESS.phoneHref}
          className="qf-success-call"
          data-phone-location="commercial_quote_success"
        >
          Urgent deadline? Call {BUSINESS.phoneDisplay}
        </a>
        <button
          type="button"
          onClick={() => {
            setSmsOptIn(false);
            setIsSuccess(false);
          }}
          className="qf-reset"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="qf">
      <div className="qf-head mb-4">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="qf-progress" data-steps="2" aria-hidden="true">
          <span data-done="true" />
          <span data-done={step === 2} />
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
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
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="commercial-website-url">Leave this blank</label>
          <input
            id="commercial-website-url"
            name="quoteWebsiteUrl"
            tabIndex={-1}
            autoComplete="off"
            value={formData.quoteWebsiteUrl}
            onChange={(event) => updateField("quoteWebsiteUrl", event.target.value)}
          />
        </div>

        <div data-quote-step="1" hidden={step !== 1}>
          <p ref={step === 1 ? stepTitleRef : undefined} tabIndex={-1} className="qf-step-title">
            Step 1 of 2 · <b>{isProjectService ? "The project" : "The property"}</b>
          </p>
          <div className="qf-stack">
            <div className="qf-row qf-row-2">
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

            <div className="qf-row qf-row-2">
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
                  placeholder="e.g. Fresno or 93720"
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

            <div className="qf-row qf-row-2">
              <div>
                <FieldLabel htmlFor="commercial-frequency" required>
                  {isProjectService ? "Project need" : "Frequency needed"}
                </FieldLabel>
                <select
                  id="commercial-frequency"
                  name="commercialFrequency"
                  required
                  value={formData.commercialFrequency}
                  onChange={(event) => updateField("commercialFrequency", event.target.value)}
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
                <FieldLabel htmlFor="commercial-deadline" required>Needed by</FieldLabel>
                <input
                  id="commercial-deadline"
                  name="deadline"
                  type="date"
                  required
                  min={serviceAreaToday()}
                  value={formData.deadline}
                  onChange={(event) => updateField("deadline", event.target.value)}
                  aria-describedby="commercial-deadline-help"
                  className={fieldClass}
                />
                <p id="commercial-deadline-help" className="qf-help">
                  Your target handoff or start date, not a confirmed booking. We&apos;ll confirm crew availability with you.
                </p>
              </div>
            ) : null}

            {error && step === 1 ? (
              <div role="alert" className="qf-error">{error}</div>
            ) : null}
          </div>

          <div className="qf-actions">
            <button type="submit" className="qf-submit">
              Continue to contact <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="qf-fine">
            <span>Next: who to send the walkthrough &amp; proposal to. No payment required.</span>
          </p>
        </div>

        <div data-quote-step="2" hidden={step !== 2}>
          <div className="nq-summary">
            <div>
              <p className="nq-summary-line">
                {formData.service || "Walkthrough"} · {formData.propertyType || "Property"} · {sqftLabels[formData.sqft] || formData.sqft} sq ft · {formData.city}
              </p>
            </div>
            <button type="button" className="nq-edit" onClick={() => focusStep(1)}>Change</button>
          </div>

          <p ref={step === 2 ? stepTitleRef : undefined} tabIndex={-1} className="qf-step-title">
            Step 2 of 2 · <b>Contact &amp; scope</b>
          </p>

          <div className="qf-stack">
            <div className="qf-row qf-row-2">
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
                  inputMode="tel"
                  required
                  pattern={"[0-9\\(\\)+\\-\\s.]{10,}"}
                  title="Enter a 10-digit phone number"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  autoComplete="tel"
                  placeholder="(559) 000-0000"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="qf-row qf-row-2">
              <div>
                <FieldLabel htmlFor="commercial-email" required={formData.contactPreference === "email"} optional={formData.contactPreference !== "email"}>Email</FieldLabel>
                <input
                  id="commercial-email"
                  name="email"
                  type="email"
                  required={formData.contactPreference === "email"}
                  value={formData.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  autoComplete="email"
                  placeholder="For the written proposal"
                  className={fieldClass}
                />
              </div>
              <div>
                <FieldLabel htmlFor="commercial-organization" optional>Company or project name</FieldLabel>
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

            <div>
              <FieldLabel htmlFor="commercial-scope" required={selectedScopes.length === 0}>
                {isProjectService ? "Project state and areas to clean" : "Areas that need cleaning"}
              </FieldLabel>
              <div className="nq-scope-chips" role="group" aria-label="Common areas to clean">
                {scopeChips.map((chip) => {
                  const pressed = selectedScopes.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      aria-pressed={pressed}
                      onClick={() => toggleScopeChip(chip)}
                      className="nq-scope-chip"
                    >
                      {pressed ? `✓ ${chip}` : `+ ${chip}`}
                    </button>
                  );
                })}
              </div>
              <textarea
                id="commercial-scope"
                name="scope"
                required={selectedScopes.length === 0}
                rows={2}
                value={formData.scope}
                onChange={(event) => updateField("scope", event.target.value)}
                placeholder={
                  isProjectService
                    ? "Optional notes: construction stage, access hours, or special surfaces"
                    : "Optional notes: occupied hours, alarm/key access, or priority areas"
                }
                className={fieldClass}
              />
            </div>

            <div className="qf-row qf-row-2">
              <div>
                <FieldLabel htmlFor="commercial-walkthrough" optional>Scoping preference</FieldLabel>
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
                <FieldLabel htmlFor="commercial-contact-preference" optional>Best way to reach you</FieldLabel>
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

            <div>
              {formData.contactPreference === "text" && !smsOptIn ? (
                <p className="nq-sms-callout" role="status">
                  Check the box below so we can text you — or choose Call or Email instead.
                </p>
              ) : null}
              <label className="qf-consent mt-2">
                <input
                  type="checkbox"
                  name="smsOptIn"
                  checked={smsOptIn && formData.contactPreference !== "call" && formData.contactPreference !== "email"}
                  disabled={formData.contactPreference === "call" || formData.contactPreference === "email"}
                  onChange={(event) => setSmsOptIn(event.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
                />
                <span>{QUOTE_SMS_DISCLOSURE}</span>
              </label>
            </div>

            {error && step === 2 ? (
              <div role="alert" className="qf-error">
                <p>{error}</p>
                <div className="nq-error-actions">
                  <a href={BUSINESS.phoneHref} className="qf-error-action" data-phone-location="commercial_quote_error">
                    Call {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </div>
            ) : null}
          </div>

          <div className="qf-actions">
            <button type="button" className="qf-back" onClick={() => focusStep(1)}>Back</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="qf-submit"
            >
              {isSubmitting ? "Sending…" : "Request a walkthrough"}
              {!isSubmitting ? <span aria-hidden="true">→</span> : null}
            </button>
          </div>

          <p className="qf-fine">
            <span>
              We reply during 8 AM–8 PM PT using your contact preference. Without text permission, we call or email.{" "}
              <Link href="/privacy" target="_blank" rel="noopener">Privacy Policy</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

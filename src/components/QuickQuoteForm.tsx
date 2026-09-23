"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mergeAttributionForSubmission, sanitizeReferrer } from "@/lib/attribution";
import { trackFunnelEvent, trackLeadConversion } from "@/lib/conversionTracking";
import { createSubmissionId } from "@/lib/submissionId";
import { buildQuoteSmsConsent, QUOTE_SMS_DISCLOSURE } from "@/lib/quoteSmsConsent";
import { serviceAreaToday, specificDeadlineError } from "@/lib/assistedIntakeValidation";
import BookingPrefillLink from "@/components/BookingPrefillLink";
import { acceptedPrefillSnapshot, type BookingPrefillPayload } from "@/lib/bookingPrefill";
import { business as BUSINESS } from "@/lib/business";

type QuickQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultCity?: string;
  landingCity?: string;
  defaultService?: string;
  compact?: boolean;
  extended?: boolean;
  paidSearch?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
  frequency: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  timeline: string;
  requestedDate: string;
  contactPreference: string;
  preferredTime: string;
  bookingIntent: string;
  condition: string;
  moveOutAddons: string[];
  moveOutScopeConfirmed: boolean;
  organization: string;
  company: string;
};

type TextFormField = Exclude<keyof FormState, "moveOutAddons" | "moveOutScopeConfirmed">;

type LeadResponse = {
  error?: string;
  details?: unknown;
  filtered?: boolean;
  metadata?: {
    apex?: {
      success?: boolean;
    };
  };
};

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const services = [
  "Standard recurring cleaning",
  "Deep cleaning",
  "Move-in / move-out cleaning",
  "Post-construction cleaning",
  "Office / commercial cleaning",
  "Not sure yet",
];

// Organic step 1 choices. Values are the exact service strings Apex receives;
// prices are the published starting floors.
const residentialChoices = [
  { value: "Standard recurring cleaning", label: "Standard cleaning", note: "Weekly, biweekly, or monthly · from $165" },
  { value: "Deep cleaning", label: "Deep cleaning", note: "Buildup, baseboards, fixtures · from $235" },
  { value: "Move-in / move-out cleaning", label: "Move-in / move-out", note: "Empty home, inside cabinets · from $325" },
  { value: "Not sure yet", label: "Not sure yet", note: "Tell us about the home and we’ll recommend one" },
] as const;

const STEP_COUNT = 3;
const stepNames = ["The cleaning", "Your home", "Where to send your quote"] as const;

// Empty cabinet, drawer, and closet interiors are included in move-out.
// Offer only the optional work here; see src/lib/services.ts.
const moveOutAddons = [
  "Inside oven",
  "Inside refrigerator",
  "Interior window glass",
  "Garage, patio, or balcony sweeping",
  "Extra blind detail",
  "Heavy pet hair or heavy buildup",
];

const fieldClass = "qf-input";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function normalizeServiceParam(value: string | null) {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (
    normalized === "recurring-cleaning" ||
    normalized === "recurring" ||
    normalized === "weekly-cleaning" ||
    normalized === "biweekly-cleaning" ||
    normalized === "monthly-cleaning" ||
    normalized === "standard-cleaning" ||
    normalized === "standard"
  ) {
    return "Standard recurring cleaning";
  }
  if (normalized === "deep-cleaning" || normalized === "deep") {
    return "Deep cleaning";
  }
  if (
    normalized === "move-out-cleaning" ||
    normalized === "move-out cleaning" ||
    normalized === "move-in / move-out cleaning" ||
    normalized === "move-out" ||
    normalized === "moveinout"
  ) {
    return "Move-in / move-out cleaning";
  }
  if (normalized === "post-construction-cleaning" || normalized === "post-construction") {
    return "Post-construction cleaning";
  }
  if (
    normalized === "commercial-cleaning" ||
    normalized === "office-cleaning" ||
    normalized === "commercial"
  ) {
    return "Office / commercial cleaning";
  }
  return services.includes(value) ? value : "";
}

function normalizeCityParam(value: string | null) {
  if (!value) return "";
  const normalized = value.trim().toLowerCase().replace(/_/g, "-");
  if (normalized === "near-me") return "";
  const cityLabels: Record<string, string> = {
    fresno: "Fresno",
    clovis: "Clovis",
    madera: "Madera",
    "woodward-park": "Woodward Park",
    "fig-garden": "Fig Garden",
    "tower-district": "Tower District",
  };
  return cityLabels[normalized] || value.trim();
}

function normalizeFrequencyParam(value: string | null) {
  if (!value) return "";
  const normalized = value.trim().toLowerCase().replace(/_/g, "-");
  const frequencies: Record<string, string> = {
    weekly: "weekly",
    biweekly: "bi-weekly",
    "bi-weekly": "bi-weekly",
    monthly: "monthly",
  };
  return frequencies[normalized] || "";
}

function initialForm(defaultCity?: string, defaultService?: string, paidSearch = false): FormState {
  return {
    name: "",
    phone: "",
    email: "",
    city: paidSearch ? "" : defaultCity || "",
    service: normalizeServiceParam(defaultService || null),
    message: "",
    frequency: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    timeline: "",
    requestedDate: "",
    contactPreference: "",
    preferredTime: "",
    bookingIntent: "",
    condition: "",
    moveOutAddons: [],
    moveOutScopeConfirmed: false,
    organization: "",
    company: "",
  };
}

function FieldLabel({ htmlFor, children, optional = false }: { htmlFor: string; children: string; required?: boolean; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="qf-label">
      {children}
      {optional ? <span className="qf-optional">Optional</span> : null}
    </label>
  );
}

function firstInvalidControl(root: ParentNode | null): FormControl | null {
  if (!root) return null;
  const controls = root.querySelectorAll<FormControl>("input, select, textarea");
  for (const control of controls) {
    if (!control.disabled && !control.checkValidity()) return control;
  }
  return null;
}

function SubmitButton({
  isSubmitting,
  compact,
  commercial,
  paidSearch,
}: {
  isSubmitting: boolean;
  compact: boolean;
  commercial: boolean;
  paidSearch: boolean;
}) {
  return (
    <button type="submit" disabled={isSubmitting} className="qf-submit">
      {isSubmitting
        ? "Sending…"
        : commercial
          ? "Request a walkthrough"
          : paidSearch
            ? "Request my quote"
            : compact
              ? "Get my quote"
              : "Get pricing & availability"}
      {!isSubmitting ? <ArrowIcon /> : null}
    </button>
  );
}

export default function QuickQuoteForm({
  title = "Get pricing & availability",
  subtitle = "Tell us where to send availability and pricing — we'll follow up quickly with the best next step for your home.",
  source = "organic_website",
  defaultCity,
  landingCity,
  defaultService,
  compact = false,
  extended = false,
  paidSearch = false,
  directBookingUrl = null,
}: QuickQuoteFormProps & { directBookingUrl?: string | null }) {
  const [formData, setFormData] = useState<FormState>(() => initialForm(defaultCity, defaultService, paidSearch));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedCommercial, setSubmittedCommercial] = useState(false);
  const [submittedAccepted, setSubmittedAccepted] = useState(false);
  const [acceptedSnapshot, setAcceptedSnapshot] = useState<BookingPrefillPayload | null>(null);
  const customerCityRef = useRef(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [showPaidDetails, setShowPaidDetails] = useState(false);
  const [step, setStep] = useState(1);
  const hasTrackedFormStart = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepTitleRef = useRef<HTMLParagraphElement>(null);
  const stepMoved = useRef(false);
  // One ID per submission attempt-session: reused on retry so Apex can
  // replay-dedupe, regenerated only after an accepted submission.
  const submissionIdRef = useRef("");
  // Every quote form (organic and paid) walks through three short steps.

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      city: paidSearch ? current.city : current.city || defaultCity || "",
      service: current.service || normalizeServiceParam(defaultService || null),
    }));
  }, [defaultCity, defaultService, paidSearch]);

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

    const city = normalizeCityParam(params.get("city"));
    const service = normalizeServiceParam(params.get("service"));
    const frequency = normalizeFrequencyParam(params.get("frequency"));
    if (!paidSearch && city) {
      setFormData((current) => ({
        ...current,
        city: current.city || city,
      }));
    }
    if (service || frequency) {
      setFormData((current) => ({
        ...current,
        service: current.service || service || "",
        frequency: current.frequency || frequency || "",
      }));
    }
  }, [paidSearch]);

  // After Continue/Back, bring the form top into view on small screens and
  // move focus to the step title so keyboard and screen-reader users land in
  // the new step.
  useEffect(() => {
    if (!stepMoved.current) return;
    const container = containerRef.current;
    if (container && container.getBoundingClientRect().top < 0) container.scrollIntoView({ block: "start" });
    stepTitleRef.current?.focus({ preventScroll: true });
  }, [step]);

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

  const updateField = (field: TextFormField, value: string) => {
    trackFormStart();
    if (field === "city") customerCityRef.current = true;
    if (field === "contactPreference" && (value === "call" || value === "email")) setSmsOptIn(false);
    setFormData((current) => ({
      ...current,
      [field]: value,
      ...(field === "timeline" && value !== "specific-deadline" ? { requestedDate: "" } : {}),
    }));
  };

  const toggleMoveOutAddon = (addon: string) => {
    trackFormStart();
    setFormData((current) => ({
      ...current,
      moveOutAddons: current.moveOutAddons.includes(addon)
        ? current.moveOutAddons.filter((item) => item !== addon)
        : [...current.moveOutAddons, addon],
    }));
  };

  const toggleMoveOutScopeConfirmed = () => {
    trackFormStart();
    setFormData((current) => ({
      ...current,
      moveOutScopeConfirmed: !current.moveOutScopeConfirmed,
    }));
  };

  const goToStep = (target: number) => {
    stepMoved.current = true;
    setStep(Math.min(Math.max(target, 1), STEP_COUNT));
  };

  const isMoveOutRequest = formData.service.toLowerCase().includes("move");
  const isRecurringRequest = formData.service.toLowerCase().includes("recurring");
  const isPaidHouseRequest = paidSearch && formData.service === "Not sure yet";
  const isCommercialRequest =
    formData.service.toLowerCase().includes("commercial") ||
    formData.service.toLowerCase().includes("office") ||
    formData.service.toLowerCase().includes("post-construction");
  const paidServicePrefilled = paidSearch && Boolean(formData.service.trim());
  const showPaidOptionalDetails = extended && paidSearch;
  const showInlineExtendedDetails = extended && !paidSearch;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Stepped forms validate one visible step at a time (the form itself is
    // noValidate so hidden later steps cannot block Continue).
    const formElement = event.currentTarget;
    if (formElement) {
      const invalid = firstInvalidControl(formElement.querySelector(`[data-quote-step="${step}"]`));
      if (invalid) {
        invalid.reportValidity();
        return;
      }
      if (step < STEP_COUNT) {
        trackFunnelEvent("quote_step_complete", {
          source,
          service: formData.service,
          city: formData.city,
          page: window.location.pathname,
          ctaLocation: `step_${step}`,
        });
        goToStep(step + 1);
        return;
      }
      for (let index = 1; index < STEP_COUNT; index += 1) {
        const earlier = firstInvalidControl(formElement.querySelector(`[data-quote-step="${index}"]`));
        if (earlier) {
          goToStep(index);
          window.setTimeout(() => earlier.reportValidity(), 0);
          return;
        }
      }
    }
    // Freeze the submitted customer values, not edits made during the request.
    const submittedSnapshot = acceptedPrefillSnapshot(formData, true, customerCityRef.current);
    trackFunnelEvent("quote_submit_attempt", {
      source,
      service: formData.service,
      city: formData.city,
      page: window.location.pathname,
    });
    setIsSubmitting(true);
    setError("");

    try {
      const deadlineError = specificDeadlineError(formData);
      if (deadlineError) throw new Error(deadlineError);

      const attribution = mergeAttributionForSubmission({
        ...tracking,
        firstLandingPage: window.location.pathname,
        firstReferrer: document.referrer,
        landingService: formData.service,
        landingCity,
      });
      const endpoint = paidSearch ? "/api/google-ads-lead" : "/api/lead";
      if (!submissionIdRef.current) submissionIdRef.current = createSubmissionId();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requestedDate: formData.timeline === "specific-deadline" ? formData.requestedDate : undefined,
          ...tracking,
          ...attribution,
          homeSize: formData.sqft,
          source,
          sourceForm: source,
          submissionId: submissionIdRef.current,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
          smsConsent: buildQuoteSmsConsent(smsOptIn, formData.contactPreference, source),
          consentText: QUOTE_SMS_DISCLOSURE,
        }),
      });

      const data = (await response
        .json()
        .catch(() => ({}))) as LeadResponse;

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
        const details = Array.isArray(data.details)
          ? (data.details[0] as string | undefined)
          : undefined;
        const errorMsg = typeof data.error === "string" ? data.error : undefined;
        throw new Error(errorMsg || details || "Could not send your quote request.");
      }

      // Only fire conversion pixels for real Apex-accepted leads.
      // Honeypot-filtered bot submissions return { filtered: true } — show the
      // bot a success state but never fire a conversion or pollute attribution.
      const apexAccepted = data.filtered !== true && data.metadata?.apex?.success === true;

      if (paidSearch && !apexAccepted) {
        throw new Error("We couldn't send your request — call or text us and we'll price it over the phone.");
      }
      if (!paidSearch && data.filtered !== true && !apexAccepted) {
        throw new Error("We couldn't confirm your request. Please retry or call us.");
      }

      if (apexAccepted) {
        trackLeadConversion({
          source,
          service: formData.service,
          city: formData.city,
          page: window.location.pathname,
          leadType: formData.bookingIntent || "quote_request",
        });
      }

      setSubmittedCommercial(isCommercialRequest);
      setSubmittedAccepted(apexAccepted && submittedSnapshot !== null);
      setAcceptedSnapshot(apexAccepted ? submittedSnapshot : null);
      setIsSuccess(true);
      setShowPaidDetails(false);
      setStep(1);
      stepMoved.current = false;
      submissionIdRef.current = "";
      setFormData(initialForm(defaultCity, defaultService, paidSearch));
      customerCityRef.current = false;
      setSmsOptIn(false);
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

  const renderServiceField = () => (
    <div>
      <FieldLabel htmlFor="quote-service" required>
        Service needed
      </FieldLabel>
      <select
        id="quote-service"
        name="service"
        required
        value={formData.service}
        onChange={(event) => updateField("service", event.target.value)}
        className={fieldClass}
      >
        <option value="">Select a service…</option>
        {services.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </div>
  );

  const renderServiceTiles = () => {
    const businessService = isCommercialRequest ? formData.service : "";
    return (
      <fieldset className="qf-step">
        <legend className="qf-label">What kind of cleaning?</legend>
        <div className="qf-tiles">
          {residentialChoices.map((choice, index) => (
            <label key={choice.value} htmlFor={`quote-service-${index}`} className="qf-tile">
              <input
                id={`quote-service-${index}`}
                type="radio"
                name="service"
                value={choice.value}
                required
                checked={formData.service === choice.value}
                onChange={() => updateField("service", choice.value)}
              />
              <strong>{choice.label}</strong>
              <span>{choice.note}</span>
            </label>
          ))}
          {businessService ? (
            <label htmlFor="quote-service-business" className="qf-tile">
              <input
                id="quote-service-business"
                type="radio"
                name="service"
                value={businessService}
                checked
                onChange={() => updateField("service", businessService)}
              />
              <strong>{businessService}</strong>
              <span>Scoped with a walkthrough</span>
            </label>
          ) : null}
        </div>
        <p className="qf-aside">
          Office, commercial, or construction? <Link href="/commercial-quote">Request a walkthrough</Link>
        </p>
      </fieldset>
    );
  };

  const renderCityField = () => (
    <div>
      <FieldLabel htmlFor="quote-city" required>
        City or ZIP
      </FieldLabel>
      <input
        id="quote-city"
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
  );

  const renderTimelineField = () => (
    <div>
      <FieldLabel htmlFor="quote-timeline" required>When do you need it?</FieldLabel>
      <select
        id="quote-timeline"
        name="timeline"
        required
        value={formData.timeline}
        onChange={(event) => updateField("timeline", event.target.value)}
        className={fieldClass}
      >
        <option value="">Select timing…</option>
        <option value="this-week">This week</option>
        <option value="next-week">Next week</option>
        <option value="specific-deadline">Specific deadline (walkthrough or lease date)</option>
        <option value="flexible">Flexible</option>
      </select>
    </div>
  );

  const renderSqftField = () => (
    <div>
      <FieldLabel htmlFor="quote-sqft" required>Approx. sq ft</FieldLabel>
      <select
        id="quote-sqft"
        name="sqft"
        required
        value={formData.sqft}
        onChange={(event) => updateField("sqft", event.target.value)}
        className={fieldClass}
      >
        <option value="">Select size…</option>
        <option value="under-1000">Under 1,000</option>
        <option value="1000-1499">1,000 – 1,499</option>
        <option value="1500-1999">1,500 – 1,999</option>
        <option value="2000-2499">2,000 – 2,499</option>
        <option value="2500-2999">2,500 – 2,999</option>
        <option value="3000-3499">3,000 – 3,499</option>
        <option value="3500-4999">3,500 – 4,999</option>
        <option value="5000-9999">5,000 – 9,999</option>
        <option value="10000-19999">10,000 – 19,999</option>
        <option value="20000+">20,000+</option>
        {paidSearch ? <option value="not-sure">Not sure — Angel can confirm</option> : null}
      </select>
    </div>
  );

  const renderRequestedDate = () => (formData.timeline === "specific-deadline" ? (
    <div>
      <FieldLabel htmlFor="quote-requested-date" required>Needed by</FieldLabel>
      <input
        id="quote-requested-date"
        name="requestedDate"
        type="date"
        required
        min={serviceAreaToday()}
        value={formData.requestedDate}
        onChange={(event) => updateField("requestedDate", event.target.value)}
        aria-describedby="quote-requested-date-help"
        className={fieldClass}
      />
      <p id="quote-requested-date-help" className="qf-help">
        Your requested deadline, not a confirmed booking. We&apos;ll confirm availability with you.
      </p>
    </div>
  ) : null);

  const renderBedBathFields = () => (
    <div className="qf-row qf-row-2">
      <div>
        <FieldLabel htmlFor="quote-bedrooms" required>
          Bedrooms
        </FieldLabel>
        <select
          id="quote-bedrooms"
          name="bedrooms"
          required
          value={formData.bedrooms}
          onChange={(event) => updateField("bedrooms", event.target.value)}
          className={fieldClass}
        >
          <option value="">Select…</option>
          {["1", "2", "3", "4", "5", "6+"].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <FieldLabel htmlFor="quote-bathrooms" required>
          Bathrooms
        </FieldLabel>
        <select
          id="quote-bathrooms"
          name="bathrooms"
          required
          value={formData.bathrooms}
          onChange={(event) => updateField("bathrooms", event.target.value)}
          className={fieldClass}
        >
          <option value="">Select…</option>
          {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderConditionField = () => (
    <div>
      <FieldLabel htmlFor="quote-condition" required>
        What&apos;s the home like right now?
      </FieldLabel>
      <select
        id="quote-condition"
        name="condition"
        required
        value={formData.condition}
        onChange={(event) => updateField("condition", event.target.value)}
        className={fieldClass}
      >
        <option value="">Choose one…</option>
        <option value="mostly-maintained">Regular upkeep, no major buildup</option>
        <option value="some-buildup-needs-detail">Some areas need extra detail</option>
        <option value="heavy-buildup-pet-hair-neglected">Heavy buildup or a lot of pet hair</option>
      </select>
    </div>
  );

  const renderMoveOutEmpty = () => (
    <label className="qf-check">
      <input
        type="checkbox"
        checked={formData.moveOutScopeConfirmed}
        onChange={toggleMoveOutScopeConfirmed}
      />
      <span>The home will be empty when we clean, with appliances and cabinets cleared.</span>
    </label>
  );

  const renderMoveOutAddons = () => (
    <fieldset className="qf-step">
      <legend className="qf-label">Move-out add-ons<span className="qf-optional">Optional</span></legend>
      <p className="qf-help">
        Move-out cleaning includes empty cabinet, drawer, and closet interiors. Inside the oven and refrigerator, window glass, and tracks are optional additions.
      </p>
      <div className="qf-checks mt-3 sm:grid-cols-2">
        {moveOutAddons.map((addon) => (
          <label key={addon} className="qf-check">
            <input
              type="checkbox"
              checked={formData.moveOutAddons.includes(addon)}
              onChange={() => toggleMoveOutAddon(addon)}
            />
            <span>{addon}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const renderContactPreference = () => (
    <div>
      <FieldLabel htmlFor="quote-contact-preference" optional>Best way to reach you</FieldLabel>
      <select
        id="quote-contact-preference"
        name="contactPreference"
        value={formData.contactPreference}
        onChange={(event) => updateField("contactPreference", event.target.value)}
        className={fieldClass}
      >
        <option value="">Best way?</option>
        <option value="text">Text</option>
        <option value="call">Call</option>
        <option value="either">Either</option>
      </select>
    </div>
  );

  const renderCustomerNotes = () => (
    <div>
      <FieldLabel htmlFor="quote-message" optional>Anything we should know?</FieldLabel>
      <textarea
        id="quote-message"
        name="message"
        rows={3}
        value={formData.message}
        onChange={(event) => updateField("message", event.target.value)}
        placeholder="Pets, priority areas, access notes, or preferred day"
        className={fieldClass}
      />
    </div>
  );

  const renderNameAndPhone = () => (
    <div className="qf-row qf-row-2">
      <div>
        <FieldLabel htmlFor="quote-name" required>Name</FieldLabel>
        <input
          id="quote-name"
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
        <FieldLabel htmlFor="quote-phone" required>Phone</FieldLabel>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          required
          pattern="[0-9()+\-\s.]{10,}"
          title="Enter a 10-digit phone number"
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          autoComplete="tel"
          inputMode="tel"
          placeholder={paidSearch ? "559-000-0000" : "(559) 000-0000"}
          className={fieldClass}
        />
      </div>
    </div>
  );

  const renderEmailField = () => (
    <div>
      <FieldLabel htmlFor="quote-email" optional={formData.contactPreference !== "email"}>Email</FieldLabel>
      <input
        id="quote-email"
        name="email"
        type="email"
        required={formData.contactPreference === "email"}
        value={formData.email}
        onChange={(event) => updateField("email", event.target.value)}
        autoComplete="email"
        placeholder="you@example.com"
        className={fieldClass}
      />
    </div>
  );

  const renderCommercialFields = () => (
    <>
      <div>
        <FieldLabel htmlFor="quote-organization" optional>Company or project</FieldLabel>
        <input
          id="quote-organization"
          name="organization"
          type="text"
          value={formData.organization}
          onChange={(event) => updateField("organization", event.target.value)}
          autoComplete="organization"
          placeholder="Company, property, or project name"
          className={fieldClass}
        />
      </div>
      <div>
        <FieldLabel htmlFor="quote-commercial-message" required>Areas and scope</FieldLabel>
        <textarea
          id="quote-commercial-message"
          name="message"
          required
          rows={2}
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          placeholder="Areas to clean, frequency or handoff date, access notes"
          className={fieldClass}
        />
      </div>
    </>
  );

  const renderSmsConsent = () => (
    <label className="qf-consent">
      <input type="checkbox" name="smsOptIn" checked={smsOptIn && formData.contactPreference !== "call" && formData.contactPreference !== "email"} disabled={formData.contactPreference === "call" || formData.contactPreference === "email"} onChange={(event) => setSmsOptIn(event.target.checked)} />
      <span>{QUOTE_SMS_DISCLOSURE}</span>
    </label>
  );

  const renderError = () => (error ? (
    <div role="alert" className="qf-error">
      {error}
      {" "}
      <a href={BUSINESS.phoneHref}>
        Call {BUSINESS.phoneDisplay}
      </a>
    </div>
  ) : null);

  const renderFinePrint = () => (
    <p className="qf-fine">
      <LockIcon />
      <span>
        No payment, and nothing is booked until you confirm.{" "}
        <Link href="/privacy" target="_blank" rel="noopener">Privacy</Link>
      </span>
    </p>
  );

  const renderExtendedDetails = (paid = false) => (
    <>
      {paid && isMoveOutRequest ? renderMoveOutAddons() : null}

      {paid && (isRecurringRequest || isPaidHouseRequest) ? (
        <div>
          <FieldLabel htmlFor="quote-frequency" required={isRecurringRequest}>How often?</FieldLabel>
          <select
            id="quote-frequency"
            name="frequency"
            required={isRecurringRequest}
            value={formData.frequency}
            onChange={(event) => updateField("frequency", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select…</option>
            {isPaidHouseRequest ? <option value="one-time">One-Time</option> : null}
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      ) : null}
    </>
  );

  const renderSteppedFrequency = () => (isRecurringRequest || showInlineExtendedDetails ? (
    <div>
      <FieldLabel htmlFor="quote-frequency" required={isRecurringRequest} optional={!isRecurringRequest}>How often would you like cleaning?</FieldLabel>
      <select id="quote-frequency" name="frequency" required={isRecurringRequest} value={formData.frequency} onChange={(event) => updateField("frequency", event.target.value)} className={fieldClass}>
        <option value="">Choose a frequency…</option>
        {!isRecurringRequest ? <option value="one-time">One-Time</option> : null}
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Biweekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  ) : null);

  const renderOrganicExtras = () => (showInlineExtendedDetails ? (
    <div className="qf-row qf-row-2">
      <div>
        <FieldLabel htmlFor="quote-booking-intent" optional>Where are you in the process?</FieldLabel>
        <select
          id="quote-booking-intent"
          name="bookingIntent"
          value={formData.bookingIntent}
          onChange={(event) => updateField("bookingIntent", event.target.value)}
          className={fieldClass}
        >
          <option value="">Select one…</option>
          <option value="ready-after-quote">Ready to book if the quote fits</option>
          <option value="comparing-options">Comparing quotes</option>
          <option value="planning-ahead">Planning ahead</option>
        </select>
      </div>
      <div>
        <FieldLabel htmlFor="quote-preferred-time" optional>Best time to reach you</FieldLabel>
        <input
          id="quote-preferred-time"
          name="preferredTime"
          type="text"
          value={formData.preferredTime}
          onChange={(event) => updateField("preferredTime", event.target.value)}
          placeholder="Example: today after 3 PM"
          className={fieldClass}
        />
      </div>
    </div>
  ) : null);

  const stepLabels = [paidServicePrefilled ? "Where and when" : stepNames[0], stepNames[1], stepNames[2]];

  const renderStepTitle = (index: number) => (
    <p ref={step === index ? stepTitleRef : undefined} tabIndex={-1} className="qf-step-title">
      Step {index} of {STEP_COUNT} · <b>{stepLabels[index - 1]}</b>
    </p>
  );

  const renderRequiredFrequency = () => (
    <div>
      <FieldLabel htmlFor="quote-frequency" required>How often would you like cleaning?</FieldLabel>
      <select id="quote-frequency" name="frequency" required value={formData.frequency} onChange={(event) => updateField("frequency", event.target.value)} className={fieldClass}>
        <option value="">Choose a frequency…</option>
        <option value="weekly">Weekly</option>
        <option value="bi-weekly">Biweekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>
  );

  // Paid pages keep low-value extras behind one quiet disclosure. Business
  // requests have none, so they never see an empty toggle.
  const renderPaidDisclosure = () => (
    <div className="qf-disclosure">
      <button
        type="button"
        onClick={() => {
          if (!showPaidDetails) {
            trackFunnelEvent("quote_details_open", {
              source,
              service: formData.service,
              city: formData.city,
              page: window.location.pathname,
            });
          }
          setShowPaidDetails((current) => !current);
        }}
        className="qf-disclosure-toggle"
        aria-expanded={showPaidDetails}
      >
        <span>{showPaidDetails ? "Hide home details" : isMoveOutRequest ? "Add move-out scope (oven, fridge, add-ons)" : "Add home details (optional)"}</span>
        <span aria-hidden="true">{showPaidDetails ? "−" : "+"}</span>
      </button>
      {showPaidDetails ? (
        <div className="qf-stack mt-4">
          {renderExtendedDetails(true)}
          {renderCustomerNotes()}
        </div>
      ) : null}
    </div>
  );

  const renderSteps = () => (
    <>
      <div className="qf-progress" aria-hidden="true">
        {stepLabels.map((name, index) => <span key={name} data-done={index < step} />)}
      </div>

      <div data-quote-step="1" hidden={step !== 1}>
        {renderStepTitle(1)}
        <div className="qf-stack">
          {!paidSearch ? renderServiceTiles() : !paidServicePrefilled ? renderServiceField() : null}
          {paidSearch && paidServicePrefilled ? <input type="hidden" name="service" value={formData.service} readOnly /> : null}
          {renderCityField()}
          {renderTimelineField()}
          {renderRequestedDate()}
        </div>
        <div className="qf-actions">
          <button type="submit" className="qf-submit">Continue <ArrowIcon /></button>
        </div>
      </div>

      <div data-quote-step="2" hidden={step !== 2}>
        {renderStepTitle(2)}
        <div className="qf-stack">
          {renderSqftField()}
          {!isCommercialRequest ? renderBedBathFields() : null}
          {!isCommercialRequest ? renderConditionField() : null}
          {paidSearch ? (isRecurringRequest && !showPaidDetails ? renderRequiredFrequency() : null) : renderSteppedFrequency()}
          {isMoveOutRequest ? renderMoveOutEmpty() : null}
          {!paidSearch && isMoveOutRequest ? renderMoveOutAddons() : null}
          {isCommercialRequest ? renderCommercialFields() : null}
          {!isCommercialRequest && !showPaidOptionalDetails ? renderCustomerNotes() : null}
          {showPaidOptionalDetails && !isCommercialRequest ? renderPaidDisclosure() : null}
        </div>
        <div className="qf-actions">
          <button type="button" className="qf-back" onClick={() => goToStep(1)}>Back</button>
          <button type="submit" className="qf-submit">Continue <ArrowIcon /></button>
        </div>
      </div>

      <div data-quote-step="3" hidden={step !== 3}>
        {renderStepTitle(3)}
        <div className="qf-stack">
          {renderNameAndPhone()}
          {!paidSearch ? renderEmailField() : null}
          {renderContactPreference()}
          {renderOrganicExtras()}
          {renderSmsConsent()}
          {renderError()}
        </div>
        <div className="qf-actions">
          <button type="button" className="qf-back" onClick={() => goToStep(2)}>Back</button>
          <SubmitButton
            isSubmitting={isSubmitting}
            compact={compact}
            commercial={isCommercialRequest}
            paidSearch={paidSearch}
          />
        </div>
      </div>
      {renderFinePrint()}
    </>
  );

  if (isSuccess) {
    return (
      <div id="quote" ref={containerRef} className="qf qf-success" data-paid-search={paidSearch || undefined}>
        <div className="qf-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2>Quote request received.</h2>
        <p>
          {paidSearch
            ? "We’ll follow up with your quote and available dates."
            : `We'll follow up with pricing, availability, and the next step for your ${submittedCommercial ? "property or project" : "home"}.`}
        </p>
        {directBookingUrl && submittedAccepted && !submittedCommercial ? (
          <>
            <p>
              Ready to book? You can also book online with New Star. Review the price before you confirm.
            </p>
            <BookingPrefillLink baseUrl={directBookingUrl} snapshot={acceptedSnapshot} onRelease={() => setAcceptedSnapshot(null)} />
          </>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setSubmittedCommercial(false);
            setSubmittedAccepted(false);
            setAcceptedSnapshot(null);
            setSmsOptIn(false);
            setStep(1);
            setIsSuccess(false);
          }}
          className="qf-reset"
        >
          Send another request
        </button>
        <a href={BUSINESS.phoneHref} className="qf-success-call" data-phone-location="quote_success">Questions? Call {BUSINESS.phoneDisplay}</a>
      </div>
    );
  }

  return (
    <div
      id="quote"
      ref={containerRef}
      data-paid-search={paidSearch || undefined}
      data-quote-layout="stepped"
      className="qf"
    >
      <div className="qf-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        data-clarity-mask="true"
        onFocusCapture={trackFormStart}
        onInvalidCapture={(event) => {
          const field = event.target instanceof HTMLInputElement ||
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
        className={paidSearch ? "mt-4" : ""}
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="quote-company">Company</label>
          <input
            id="quote-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company}
            onChange={(event) => updateField("company", event.target.value)}
          />
        </div>

        {renderSteps()}
      </form>
    </div>
  );
}

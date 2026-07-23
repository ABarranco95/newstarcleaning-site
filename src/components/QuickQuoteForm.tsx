"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { mergeAttributionForSubmission, sanitizeReferrer } from "@/lib/attribution";
import { trackFunnelEvent, trackLeadConversion } from "@/lib/conversionTracking";

type QuickQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultCity?: string;
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
  contactPreference: string;
  preferredTime: string;
  bookingIntent: string;
  condition: string;
  moveOutAddons: string[];
  organization: string;
  company: string;
};

type TextFormField = Exclude<keyof FormState, "moveOutAddons">;

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

const services = [
  "Standard recurring cleaning",
  "Deep cleaning",
  "Move-in / move-out cleaning",
  "Post-construction cleaning",
  "Office / commercial cleaning",
  "Not sure yet",
];

const moveOutAddons = [
  "Interior window glass",
  "Garage sweeping",
  "Patio or balcony sweeping",
  "Extra blind detail",
  "Heavy pet hair or heavy buildup",
];

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute/70 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

function normalizeServiceParam(value: string | null) {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (normalized === "standard-cleaning" || normalized === "standard") {
    return "Standard recurring cleaning";
  }
  if (normalized === "deep-cleaning" || normalized === "deep") {
    return "Deep cleaning";
  }
  if (
    normalized === "move-out-cleaning" ||
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

function initialForm(defaultCity?: string, defaultService?: string): FormState {
  return {
    name: "",
    phone: "",
    email: "",
    city: defaultCity || "",
    service: defaultService || "",
    message: "",
    frequency: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    timeline: "",
    contactPreference: "",
    preferredTime: "",
    bookingIntent: "",
    condition: "",
    moveOutAddons: [],
    organization: "",
    company: "",
  };
}

function FieldLabel({ htmlFor, children, required = false }: { htmlFor: string; children: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
      {children} {required ? <span className="text-accent">*</span> : null}
    </label>
  );
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
    <button
      type="submit"
      disabled={isSubmitting}
      className="btn btn-accent w-full !text-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {isSubmitting
        ? "Sending…"
        : commercial
          ? "Request a walkthrough"
          : paidSearch
            ? "Get my cleaning price"
            : compact
              ? "Get my quote"
              : "Get pricing & availability"}
      {!isSubmitting && (
        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      )}
    </button>
  );
}

export default function QuickQuoteForm({
  title = "Get pricing & availability",
  subtitle = "Tell us where to send availability and pricing — we'll follow up quickly with the best next step for your home.",
  source = "organic_website",
  defaultCity,
  defaultService,
  compact = false,
  extended = false,
  paidSearch = false,
}: QuickQuoteFormProps) {
  const [formData, setFormData] = useState<FormState>(() => initialForm(defaultCity, defaultService));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedCommercial, setSubmittedCommercial] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [showPaidDetails, setShowPaidDetails] = useState(false);
  const hasTrackedFormStart = useRef(false);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      city: current.city || defaultCity || "",
      service: current.service || defaultService || "",
    }));
  }, [defaultCity, defaultService]);

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
    ].forEach((key) => {
      const value = params.get(key);
      if (value) capture[key] = value;
    });
    const referrer = sanitizeReferrer(document.referrer);
    if (referrer) capture.referrer = referrer;
    setTracking(capture);

    const city = normalizeCityParam(params.get("city"));
    const service = normalizeServiceParam(params.get("service"));
    if (city || service) {
      setFormData((current) => ({
        ...current,
        city: current.city || city || "",
        service: current.service || service || "",
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

  const updateField = (field: TextFormField, value: string) => {
    trackFormStart();
    setFormData((current) => ({ ...current, [field]: value }));
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

  const isMoveOutRequest = formData.service.toLowerCase().includes("move");
  const isRecurringRequest = formData.service.toLowerCase().includes("recurring");
  const isPaidHouseRequest = paidSearch && formData.service === "Not sure yet";
  const isCommercialRequest =
    formData.service.toLowerCase().includes("commercial") ||
    formData.service.toLowerCase().includes("office") ||
    formData.service.toLowerCase().includes("post-construction");
  const paidCityPrefilled = paidSearch && Boolean(formData.city.trim());
  const paidServicePrefilled = paidSearch && Boolean(formData.service.trim());
  const showPaidOptionalDetails = extended && paidSearch;
  const showInlineExtendedDetails = extended && !paidSearch;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const attribution = mergeAttributionForSubmission({
        ...tracking,
        firstLandingPage: window.location.pathname,
        firstReferrer: document.referrer,
        landingService: formData.service,
        landingCity: formData.city,
      });
      const endpoint = paidSearch ? "/api/google-ads-lead" : "/api/lead";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          ...attribution,
          homeSize: formData.sqft,
          source,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
          smsConsent: "service_related_quote_follow_up",
          consentText:
            "By requesting a quote, the visitor agreed to receive service-related calls/texts about pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out.",
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
      const apexAccepted = paidSearch
        ? data.metadata?.apex?.success === true
        : data.filtered !== true;

      if (paidSearch && !apexAccepted) {
        throw new Error("We could not receive your quote request. Please call us directly.");
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
      setIsSuccess(true);
      setShowPaidDetails(false);
      setFormData(initialForm(defaultCity, defaultService));
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

  const renderExtendedDetails = () => (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="quote-bedrooms">Bedrooms</FieldLabel>
          <select
            id="quote-bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={(event) => updateField("bedrooms", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select bedrooms…</option>
            {["1", "2", "3", "4", "5", "6+"].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="quote-bathrooms">Bathrooms</FieldLabel>
          <select
            id="quote-bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={(event) => updateField("bathrooms", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select bathrooms…</option>
            {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="quote-condition">How much cleaning does the home need?</FieldLabel>
        <p className="mb-2 text-xs leading-relaxed text-ink-soft">
          A quick answer helps us price the right amount of time.
        </p>
        <select
          id="quote-condition"
          name="condition"
          value={formData.condition}
          onChange={(event) => updateField("condition", event.target.value)}
          className={fieldClass}
        >
          <option value="">Choose one…</option>
          <option value="mostly-maintained">Regular cleaning, no major buildup</option>
          <option value="some-buildup-needs-detail">Some buildup or areas needing extra detail</option>
          <option value="heavy-buildup-pet-hair-neglected">Heavy buildup or a lot of pet hair</option>
        </select>
      </div>

      {isMoveOutRequest && (
        <div>
          <div className="mb-2">
            <span className="block text-xs font-semibold uppercase tracking-wider text-mute">
              Optional move-out details
            </span>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Oven, refrigerator, microwave, and empty cabinet interiors are already part of our move-out scope when accessible. Select only the extra items you want priced.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {moveOutAddons.map((addon) => (
              <label key={addon} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-3 text-sm font-medium text-ink-soft">
                <input
                  type="checkbox"
                  checked={formData.moveOutAddons.includes(addon)}
                  onChange={() => toggleMoveOutAddon(addon)}
                  className="h-4 w-4 accent-accent"
                />
                <span>{addon}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="quote-contact-preference">Contact</FieldLabel>
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
        <div>
          <FieldLabel htmlFor="quote-booking-intent">Intent</FieldLabel>
          <select
            id="quote-booking-intent"
            name="bookingIntent"
            value={formData.bookingIntent}
            onChange={(event) => updateField("bookingIntent", event.target.value)}
            className={fieldClass}
          >
            <option value="">Select...</option>
            <option value="ready-after-quote">Ready after quote</option>
            <option value="comparing-options">Comparing options</option>
            <option value="just-researching">Just researching</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(!paidSearch || isRecurringRequest || isPaidHouseRequest) && (
          <div>
            <FieldLabel htmlFor="quote-frequency">How often?</FieldLabel>
            <select
              id="quote-frequency"
              name="frequency"
              value={formData.frequency}
              onChange={(event) => updateField("frequency", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select…</option>
              {(!paidSearch || isPaidHouseRequest) && <option value="one-time">One-Time</option>}
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
        <div>
          <FieldLabel htmlFor="quote-preferred-time">Best time to reach you</FieldLabel>
          <input
            id="quote-preferred-time"
            name="preferredTime"
            type="text"
            value={formData.preferredTime}
            onChange={(event) => updateField("preferredTime", event.target.value)}
            placeholder={paidSearch ? "Example: weekday morning or next week" : "Example: today after 3 PM"}
            className={fieldClass}
          />
        </div>
      </div>
    </>
  );

  if (isSuccess) {
    return (
      <div id="quote" className="rounded-3xl border border-line bg-white p-8 text-center shadow-elev">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-ink">Quote request received.</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          A member of the New Star team will follow up shortly with availability,
          pricing, and the best next step for your {submittedCommercial ? "property or project" : "home"}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmittedCommercial(false);
            setIsSuccess(false);
          }}
          className="mt-5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div
      id="quote"
      className={`rounded-3xl border border-line bg-white shadow-elev ${paidSearch ? "p-5 sm:p-7 lg:p-8" : "p-6 sm:p-7 lg:p-8"}`}
    >
      <div className={paidSearch ? "mb-4 sm:mb-6" : "mb-6"}>
        <span className="eyebrow eyebrow-dot">{paidSearch ? "Pricing & availability" : "Fast local quote"}</span>
        <h2 className={`mt-3 font-display leading-tight text-ink lg:text-[1.6rem] ${paidSearch ? "text-xl sm:text-2xl" : "text-2xl"}`}>
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{subtitle}</p>

        {paidSearch ? (
          <div className="mt-4 hidden gap-2 sm:grid">
            <a
              href="tel:+15597852822"
              className="btn btn-outline !min-h-11 !px-4 !text-sm"
            >
              Prefer to talk? Call (559) 785-2822
            </a>
          </div>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
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
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
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
              minLength={10}
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              autoComplete="tel"
              placeholder="(559) 000-0000"
              className={fieldClass}
            />
          </div>
        </div>

        {!paidSearch && !compact ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="quote-email">Email</FieldLabel>
              <input
                id="quote-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                className={fieldClass}
              />
            </div>
            {renderCityField()}
          </div>
        ) : null}

        {!paidSearch && compact ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {renderCityField()}
            {renderServiceField()}
          </div>
        ) : null}

        {paidSearch && !paidCityPrefilled ? renderCityField() : null}
        {paidSearch && paidCityPrefilled ? <input type="hidden" name="city" value={formData.city} readOnly /> : null}

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

        {paidSearch
          ? (!paidServicePrefilled ? renderServiceField() : null)
          : (!compact ? renderServiceField() : null)}
        {paidSearch && paidServicePrefilled ? <input type="hidden" name="service" value={formData.service} readOnly /> : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="quote-timeline" required>Timeline</FieldLabel>
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
              <option value="specific-deadline">Specific deadline</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
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
            </select>
          </div>
        </div>

        {isCommercialRequest ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="quote-organization">Company or project</FieldLabel>
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
              <FieldLabel htmlFor="quote-commercial-message">Scope or deadline</FieldLabel>
              <input
                id="quote-commercial-message"
                name="message"
                type="text"
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder="Areas, frequency, handoff date, or access notes"
                className={fieldClass}
              />
            </div>
          </div>
        ) : null}

        {showInlineExtendedDetails ? renderExtendedDetails() : null}

        {!compact && !paidSearch && !isCommercialRequest && (
          <div>
            <FieldLabel htmlFor="quote-message">Anything we should know?</FieldLabel>
            <textarea
              id="quote-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Square footage, move-out deadline, pets, preferred day, etc."
              className={fieldClass}
            />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <SubmitButton
          isSubmitting={isSubmitting}
          compact={compact}
          commercial={isCommercialRequest}
          paidSearch={paidSearch}
        />

        <p className="text-center text-xs leading-relaxed text-ink-soft">
          By submitting, you consent to service-related calls/texts from New Star Cleaning about your quote, pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out. Consent is not required to purchase services.
          &nbsp;·&nbsp;
          <Link href="/privacy" className="font-semibold text-primary underline underline-offset-2 hover:text-accent">Privacy Policy</Link>
        </p>

        {showPaidOptionalDetails ? (
          <div className="rounded-2xl border border-line bg-cream/60 p-4">
            <button
              type="button"
              onClick={() => setShowPaidDetails((current) => !current)}
              className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-primary"
              aria-expanded={showPaidDetails}
            >
              <span>{showPaidDetails ? "Hide home details" : "Add home details (optional)"}</span>
              <span className="text-lg text-accent">{showPaidDetails ? "−" : "+"}</span>
            </button>
            {showPaidDetails ? (
              <div className="mt-4 space-y-4">
                <div>
                  <FieldLabel htmlFor="quote-email">Email</FieldLabel>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
                {renderExtendedDetails()}
                <div>
                  <FieldLabel htmlFor="quote-message">Anything we should know?</FieldLabel>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Move-out deadline, pets, priority areas, gate code notes, etc."
                    className={fieldClass}
                  />
                </div>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  compact={compact}
                  commercial={isCommercialRequest}
                  paidSearch={paidSearch}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}

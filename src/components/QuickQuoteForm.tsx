"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { trackLeadConversion } from "@/lib/conversionTracking";

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
  company: string;
};

type TextFormField = Exclude<keyof FormState, "moveOutAddons">;

const services = [
  "Standard recurring cleaning",
  "Deep cleaning",
  "Move-in / move-out cleaning",
  "Not sure yet",
];

const moveOutAddons = [
  "Inside oven",
  "Inside refrigerator",
  "Inside cabinets/drawers",
  "Interior windows/tracks",
  "Blinds",
  "Heavy pet hair or heavy buildup",
];

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
  return services.includes(value) ? value : "";
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
    company: "",
  };
}

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute/70 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

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
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});

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
    if (document.referrer) capture.referrer = document.referrer;
    setTracking(capture);

    const city = params.get("city");
    const service = normalizeServiceParam(params.get("service"));
    if (city || service) {
      setFormData((current) => ({
        ...current,
        city: current.city || city || "",
        service: current.service || service || "",
      }));
    }
  }, []);

  const submitLabel = useMemo(() => {
    if (isSubmitting) return "Sending…";
    return compact ? "Get my quote" : "Get pricing & availability";
  }, [compact, isSubmitting]);

  const updateField = (field: TextFormField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleMoveOutAddon = (addon: string) => {
    setFormData((current) => ({
      ...current,
      moveOutAddons: current.moveOutAddons.includes(addon)
        ? current.moveOutAddons.filter((item) => item !== addon)
        : [...current.moveOutAddons, addon],
    }));
  };

  const isMoveOutRequest = formData.service.toLowerCase().includes("move");
  const isRecurringRequest = formData.service.toLowerCase().includes("recurring");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
          homeSize: formData.sqft,
          source,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
          smsConsent: "service_related_quote_follow_up",
          consentText:
            "By requesting a quote, the visitor agreed to receive service-related calls/texts about pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out.",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.details?.[0] || data?.error || "Could not send your quote request.");
      }

      trackLeadConversion({
        source,
        service: formData.service,
        city: formData.city,
        page: window.location.pathname,
        leadType: formData.bookingIntent || "quote_request",
      });
      setIsSuccess(true);
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

  if (isSuccess) {
    return (
      <div
        id="quote"
        className="rounded-3xl border border-line bg-white p-8 text-center shadow-elev"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-display text-2xl text-ink">Quote request received.</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          A member of the New Star team will follow up shortly with availability,
          pricing, and the best next step for your home.
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
    <div
      id="quote"
      className="rounded-3xl border border-line bg-white p-6 shadow-elev sm:p-7 lg:p-8"
    >
      <div className="mb-6">
        <span className="eyebrow eyebrow-dot">{paidSearch ? "Clear local pricing" : "Fast local quote"}</span>
        <h2 className="mt-3 font-display text-2xl leading-tight text-ink lg:text-[1.6rem]">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Name <span className="text-accent">*</span>
            </label>
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
            <label htmlFor="quote-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Phone <span className="text-accent">*</span>
            </label>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Email
            </label>
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
          <div>
            <label htmlFor="quote-city" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              City or ZIP <span className="text-accent">*</span>
            </label>
            <input
              id="quote-city"
              name="city"
              type="text"
              required
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              autoComplete="address-level2"
              placeholder="Fresno or 93720"
              className={fieldClass}
            />
          </div>
        </div>

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

        <div>
          <label htmlFor="quote-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
            Service needed <span className="text-accent">*</span>
          </label>
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-timeline" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Timeline <span className="text-accent">*</span>
            </label>
            <select
              id="quote-timeline"
              name="timeline"
              required
              value={formData.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
              className={fieldClass}
            >
              <option value="">Select timing…</option>
              {!paidSearch && <option value="as-soon-as-possible">ASAP</option>}
              {paidSearch && <option value="planned-this-week">This week / planned soon</option>}
              <option value="this-week">This week</option>
              <option value="next-week">Next week</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div>
            <label htmlFor="quote-sqft" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Approx. sq ft <span className="text-accent">*</span>
            </label>
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
              <option value="3500+">3,500+</option>
            </select>
          </div>
        </div>

        {extended && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="quote-bedrooms" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Bedrooms
                </label>
                <select
                  id="quote-bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={(event) => updateField("bedrooms", event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select bedrooms…</option>
                  {["1","2","3","4","5","6+"].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="quote-bathrooms" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Bathrooms
                </label>
                <select
                  id="quote-bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={(event) => updateField("bathrooms", event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select bathrooms…</option>
                  {["1","1.5","2","2.5","3","3.5","4+"].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="quote-condition" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                Current condition
              </label>
              <p className="mb-2 text-xs leading-relaxed text-mute">
                This helps us match the right scope and avoid surprises.
              </p>
              <select
                id="quote-condition"
                name="condition"
                value={formData.condition}
                onChange={(event) => updateField("condition", event.target.value)}
                className={fieldClass}
              >
                <option value="">Select condition…</option>
                <option value="mostly-maintained">Mostly maintained</option>
                <option value="some-buildup-needs-detail">Some buildup / needs detail</option>
                <option value="heavy-buildup-pet-hair-neglected">Heavy buildup, pet hair, or neglected areas</option>
              </select>
            </div>

            {isMoveOutRequest && (
              <div>
                <div className="mb-2">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-mute">
                    Move-out add-ons to price clearly
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-mute">
                    Select anything you want included so the quote is not vague.
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
                <label htmlFor="quote-contact-preference" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Contact
                </label>
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
                <label htmlFor="quote-booking-intent" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Intent
                </label>
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
              {(!paidSearch || isRecurringRequest) && (
                <div>
                  <label htmlFor="quote-frequency" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                    How often?
                  </label>
                  <select
                    id="quote-frequency"
                    name="frequency"
                    value={formData.frequency}
                    onChange={(event) => updateField("frequency", event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select…</option>
                    {!paidSearch && <option value="one-time">One-Time</option>}
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="quote-preferred-time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
                  Best time to reach you
                </label>
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
        )}

        {!compact && (
          <div>
            <label htmlFor="quote-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
              Anything we should know?
            </label>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitLabel}
          {!isSubmitting && (
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          )}
        </button>
        <p className="text-center text-xs leading-relaxed text-mute/80">
          By submitting, you consent to service-related calls/texts from New Star Cleaning about your quote, pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out. Consent is not required to purchase services.
          &nbsp;·&nbsp;
          <Link href="/privacy" className="underline hover:text-mute">Privacy Policy</Link>
        </p>
      </form>
    </div>
  );
}

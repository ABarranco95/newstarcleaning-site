"use client";

import { useEffect, useMemo, useState } from "react";

type QuickQuoteFormProps = {
  title?: string;
  subtitle?: string;
  source?: string;
  defaultCity?: string;
  compact?: boolean;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
};

const services = [
  "Standard recurring cleaning",
  "Deep cleaning",
  "Move-in / move-out cleaning",
  "Post-construction cleaning",
  "Vacation rental / Airbnb cleaning",
  "Not sure yet",
];

function initialForm(defaultCity?: string): FormState {
  return {
    name: "",
    phone: "",
    email: "",
    city: defaultCity || "",
    service: "",
    message: "",
  };
}

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute/70 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

export default function QuickQuoteForm({
  title = "Get a fast cleaning quote",
  subtitle = "Tell us where to send availability and pricing — we'll follow up quickly with the best next step for your home.",
  source = "organic_website",
  defaultCity,
  compact = false,
}: QuickQuoteFormProps) {
  const [formData, setFormData] = useState<FormState>(() => initialForm(defaultCity));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData((current) => ({ ...current, city: current.city || defaultCity || "" }));
  }, [defaultCity]);

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
  }, []);

  const submitLabel = useMemo(() => {
    if (isSubmitting) return "Sending…";
    return compact ? "Get my quote" : "Get my free quote";
  }, [compact, isSubmitting]);

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

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
          source,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.details?.[0] || data?.error || "Could not send your quote request.");
      }

      setIsSuccess(true);
      setFormData(initialForm(defaultCity));
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
        <span className="eyebrow eyebrow-dot">Fast local quote</span>
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
              City
            </label>
            <input
              id="quote-city"
              name="city"
              type="text"
              value={formData.city}
              onChange={(event) => updateField("city", event.target.value)}
              autoComplete="address-level2"
              placeholder="Fresno"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="quote-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">
            Service needed
          </label>
          <select
            id="quote-service"
            name="service"
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
        <p className="text-center text-xs leading-relaxed text-mute">
          No spam. We&apos;ll follow up quickly with availability and pricing.
        </p>
      </form>
    </div>
  );
}

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

export default function QuickQuoteForm({
  title = "Get a Fast Cleaning Quote",
  subtitle = "Tell us where to send availability and pricing. We will follow up quickly with the best next step for your home.",
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
    if (isSubmitting) return "Sending...";
    return compact ? "Get Quote" : "Get My Free Quote";
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
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Quote request received</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">
          We received your request. New Star Cleaning will follow up quickly with availability and next steps.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-5 text-sm font-semibold text-primary underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div id="quote" className="rounded-3xl border border-white/20 bg-white p-5 shadow-2xl sm:p-6 lg:p-7">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Fast local quote</p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="mb-1 block text-sm font-semibold text-gray-700">
              Name <span className="text-red-500">*</span>
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="quote-phone" className="mb-1 block text-sm font-semibold text-gray-700">
              Phone <span className="text-red-500">*</span>
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-email" className="mb-1 block text-sm font-semibold text-gray-700">
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="quote-city" className="mb-1 block text-sm font-semibold text-gray-700">
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="quote-service" className="mb-1 block text-sm font-semibold text-gray-700">
            Service needed
          </label>
          <select
            id="quote-service"
            name="service"
            value={formData.service}
            onChange={(event) => updateField("service", event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select a service...</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {!compact && (
          <div>
            <label htmlFor="quote-message" className="mb-1 block text-sm font-semibold text-gray-700">
              Anything we should know?
            </label>
            <textarea
              id="quote-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Square footage, move-out deadline, pets, preferred day, etc."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
          className="w-full rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {submitLabel}
        </button>
        <p className="text-center text-xs leading-relaxed text-gray-500">
          No spam. We will contact you quickly with availability, pricing, and the best next step.
        </p>
      </form>
    </div>
  );
}

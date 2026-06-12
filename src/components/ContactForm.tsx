"use client";

import { useState, type FormEvent } from "react";
import { trackLeadConversion } from "@/lib/conversionTracking";

interface ContactFormProps {
  source?: string;
  className?: string;
  compact?: boolean;
}

export default function ContactForm({ source = "Website Contact Form", className = "", compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function captureTracking() {
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
    return capture;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get("name") as string,
      phone: data.get("phone") as string,
      email: data.get("email") as string || undefined,
      service: data.get("service") as string,
      homeSize: data.get("homeSize") as string || undefined,
      preferredDate: data.get("preferredDate") as string || undefined,
      message: data.get("message") as string || undefined,
      source,
      company: data.get("company") as string || undefined,
      ...captureTracking(),
      page: window.location.pathname,
      submittedAt: new Date().toISOString(),
      smsConsent: "service_related_quote_follow_up",
      consentText:
        "By submitting, the visitor agreed to receive service-related calls/texts and emails about their cleaning service. Reply STOP to opt out.",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        trackLeadConversion({
          source,
          service: payload.service,
          page: window.location.pathname,
          leadType: "contact_form",
        });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We&apos;ll reach out within 15 minutes during business hours. If it&apos;s after hours, expect a response first thing in the morning.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${compact ? "space-y-4" : "space-y-5"} ${className}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            placeholder="(559) 555-0123"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
          />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-service" className="block text-sm font-medium text-gray-700 mb-1.5">
            Service Needed
          </label>
          <select
            id="lead-service"
            name="service"
            defaultValue=""
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
          >
            <option value="">Select a service</option>
            <option value="standard-recurring">Standard Recurring Cleaning</option>
            <option value="deep-cleaning">Deep Cleaning</option>
            <option value="move-out">Move-In / Move-Out Cleaning</option>
            <option value="commercial">Commercial Cleaning</option>
          </select>
        </div>
        <div>
          <label htmlFor="lead-homeSize" className="block text-sm font-medium text-gray-700 mb-1.5">
            Home Size
          </label>
          <select
            id="lead-homeSize"
            name="homeSize"
            defaultValue=""
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10"
          >
            <option value="">Select size</option>
            <option value="studio">Studio / 1 Bed</option>
            <option value="small">2 Bed / 1-2 Bath</option>
            <option value="medium">3 Bed / 2 Bath</option>
            <option value="large">4+ Bed / 3+ Bath</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="lead-date" className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Date
          </label>
          <input
            id="lead-date"
            name="preferredDate"
            type="date"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
          />
        </div>
      )}

      {!compact && (
        <div>
          <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-1.5">
            Anything else we should know?
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            placeholder="Specific areas to focus on, access instructions, pet info..."
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none resize-none"
          />
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center bg-accent hover:bg-accent-hover disabled:bg-gray-300 text-white font-bold px-8 py-3 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Get Your Free Quote
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>

      {status === "error" && (
        <p className="text-red-600 text-sm mt-2">{errorMessage || "Something went wrong. Please call or text us at (559) 785-2822."}</p>
      )}

      <p className="text-xs text-gray-400 mt-3">
        By submitting, you agree to receive text messages and emails about your cleaning service. Reply STOP to opt out.
      </p>
    </form>
  );
}

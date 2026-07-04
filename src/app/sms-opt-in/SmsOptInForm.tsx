"use client";

import Link from "next/link";
import { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  smsConsent: boolean;
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  smsConsent: false,
};

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-mute/70 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-mute">
      {children}
    </label>
  );
}

export default function SmsOptInForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string | boolean) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/sms-opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.details?.[0] || data?.error || "Failed to submit SMS opt-in");
      }

      setIsSuccess(true);
      setFormData(initialFormState);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-accent/15 bg-accent/5 p-6 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-ink">You&apos;re opted in</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We received your SMS consent and will use this number for cleaning service updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="firstName">
            First Name <span className="text-accent">*</span>
          </FieldLabel>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            minLength={2}
            value={formData.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder="Your first name"
            className={fieldClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="lastName">
            Last Name <span className="text-accent">*</span>
          </FieldLabel>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            placeholder="Your last name"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="phone">
          Phone Number <span className="text-accent">*</span>
        </FieldLabel>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          minLength={10}
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="(559) 000-0000"
          className={fieldClass}
        />
      </div>

      <div>
        <FieldLabel htmlFor="email">Email Address</FieldLabel>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>

      <div className="rounded-xl border border-line bg-cream-2 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="smsConsent"
            required
            checked={formData.smsConsent}
            onChange={(event) => updateField("smsConsent", event.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-line accent-accent"
          />
          <span className="text-sm leading-relaxed text-ink-soft">
            I agree to receive automated SMS/text messages from{" "}
            <strong className="text-ink">New Star Cleaning LLC</strong> at the phone number
            provided. Messages may include appointment confirmations, reminders, service updates,
            and promotional offers. Message frequency varies. Message and data rates may apply.
            Consent is not a condition of purchase. Reply <strong>STOP</strong> to opt out at any
            time. Reply <strong>HELP</strong> for assistance. View our{" "}
            <Link href="/privacy" className="font-semibold text-primary underline">Privacy Policy</Link>{" "}
            and{" "}
            <Link href="/terms" className="font-semibold text-primary underline">Terms of Service</Link>.
          </span>
        </label>
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
        {isSubmitting ? "Submitting…" : "Opt in to text updates"}
      </button>
    </form>
  );
}

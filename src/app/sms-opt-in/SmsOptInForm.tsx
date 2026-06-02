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
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re opted in
        </h2>
        <p className="text-sm text-gray-700">
          We received your SMS consent and will use this number for cleaning
          service updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          minLength={2}
          value={formData.firstName}
          onChange={(event) => updateField("firstName", event.target.value)}
          placeholder="Your first name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          value={formData.lastName}
          onChange={(event) => updateField("lastName", event.target.value)}
          placeholder="Your last name"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          minLength={10}
          value={formData.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="(559) 000-0000"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="smsConsent"
            required
            checked={formData.smsConsent}
            onChange={(event) => updateField("smsConsent", event.target.checked)}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I agree to receive automated SMS/text messages from{" "}
            <strong>NEW STAR CLEANING LLC</strong> at the phone number
            provided. Messages may include appointment confirmations, reminders,
            service updates, and promotional offers. Message frequency varies.
            Message and data rates may apply. Consent is not a condition of
            purchase. Reply <strong>STOP</strong> to opt out at any time. Reply{" "}
            <strong>HELP</strong> for assistance. View our{" "}
            <Link href="/privacy" className="text-primary underline font-semibold">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-primary underline font-semibold">
              Terms of Service
            </Link>
            .
          </span>
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Opt In to Text Updates"}
      </button>
    </form>
  );
}

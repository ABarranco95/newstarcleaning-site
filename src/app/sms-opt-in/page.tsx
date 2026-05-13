import type { Metadata } from "next";
import Link from "next/link";
import SmsOptInForm from "./SmsOptInForm";

export const metadata: Metadata = {
  title: "SMS Opt-In — New Star Cleaning",
  description:
    "Opt in to receive text messages from New Star Cleaning about your cleaning service, appointments, and follow-ups.",
  openGraph: {
    title: "SMS Opt-In | New Star Cleaning",
    description:
      "Opt in to receive text messages from New Star Cleaning.",
    url: "https://newstarcleaning.com/sms-opt-in",
  },
};

export default function SmsOptIn() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary to-primary-light py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            Stay Updated via Text
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Get appointment confirmations, reminders, and service updates
            directly to your phone.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Opt In to SMS Notifications
            </h2>

            <SmsOptInForm />

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting this form, you expressly consent to receive
                recurring automated text messages from New Star Cleaning at the
                phone number you provide. Message frequency varies (typically
                1–4 messages per service interaction, no more than 4 promotional
                messages per month). Message and data rates may apply. Consent is
                not required to purchase goods or services. You can opt out at
                any time by replying STOP. For help, reply HELP or contact us at{" "}
                <a
                  href="mailto:support@newstarcleaning.com"
                  className="text-primary underline"
                >
                  support@newstarcleaning.com
                </a>{" "}
                or call{" "}
                <a href="tel:+15597852822" className="text-primary underline">
                  (559) 785-2822
                </a>
                . See our{" "}
                <Link href="/privacy" className="text-primary underline">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-primary underline">
                  Terms of Service
                </Link>{" "}
                for more details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

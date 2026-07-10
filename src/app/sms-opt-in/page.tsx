import type { Metadata } from "next";
import Link from "next/link";
import SmsOptInForm from "./SmsOptInForm";

export const metadata: Metadata = {
  title: "SMS Opt-In — New Star Cleaning",
  description:
    "Opt in to receive text messages from New Star Cleaning about your cleaning service, appointments, and follow-ups.",
  alternates: { canonical: "/sms-opt-in" },
  openGraph: {
    title: "SMS Opt-In | New Star Cleaning",
    description: "Opt in to receive text messages from New Star Cleaning.",
    url: "https://newstarcleaning.com/sms-opt-in",
  },
};

export default function SmsOptIn() {
  return (
    <>
      <section className="bg-cream-2">
        <div className="mx-auto max-w-3xl px-4 pt-12 pb-10 sm:px-6 lg:px-8 lg:pt-16">
          <nav className="mb-6 text-sm text-mute" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-ink">SMS opt-in</span>
          </nav>
          <span className="eyebrow eyebrow-dot">Text updates</span>
          <h1 className="mt-4 text-3xl text-ink lg:text-4xl">
            Stay updated via text
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            Get appointment confirmations, reminders, and service updates directly to your phone.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 lg:py-16">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-line bg-white p-8 shadow-elev">
            <h2 className="text-2xl text-ink">Opt in to SMS notifications</h2>
            <div className="mt-6">
              <SmsOptInForm />
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-xs leading-relaxed text-mute">
                By submitting this form, you expressly consent to receive recurring automated
                text messages from New Star Cleaning at the phone number you provide. Message
                frequency varies (typically 1–4 messages per service interaction, no more than 4
                promotional messages per month). Message and data rates may apply. Consent is not
                required to purchase goods or services. You can opt out at any time by replying
                STOP. For help, reply HELP or contact us at{" "}
                <a href="mailto:support@newstarcleaning.com" className="text-primary underline">
                  support@newstarcleaning.com
                </a>{" "}
                or call{" "}
                <a href="tel:+15597852822" className="text-primary underline">(559) 785-2822</a>.
                See our{" "}
                <Link href="/privacy" className="text-primary underline">Privacy Policy</Link> and{" "}
                <Link href="/terms" className="text-primary underline">Terms of Service</Link> for
                more details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

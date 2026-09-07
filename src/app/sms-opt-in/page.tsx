import type { Metadata } from "next";
import Link from "next/link";
import SmsOptInForm from "./SmsOptInForm";

export const metadata: Metadata = {
  title: "SMS Opt-In — New Star Cleaning",
  description:
    "Opt in to receive text messages from New Star Cleaning about your cleaning service, appointments, and follow-ups.",
  alternates: { canonical: "/sms-opt-in" },
  // Compliance utility page reached from SMS disclosures, not a search target.
  robots: { index: false, follow: true },
  openGraph: {
    title: "SMS Opt-In | New Star Cleaning",
    description: "Opt in to receive text messages from New Star Cleaning.",
    url: "https://newstarcleaning.com/sms-opt-in",
  },
};

export default function SmsOptIn() {
  return <div className="site-reference"><section className="site-form-layout"><div className="site-form-heading"><nav className="site-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link></nav><h1>Text updates, if you want them.</h1><p>Opt in for appointment confirmations, reminders, and service updates. You can stop messages at any time.</p></div><div className="site-form-panel"><h2>Opt in to SMS notifications</h2><SmsOptInForm /><div className="site-rule mt-6 pt-6">
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
</div></div></section></div>;
}

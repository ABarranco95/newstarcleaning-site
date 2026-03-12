import type { Metadata } from "next";

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

            <form
              action="https://newstarcleaning.com/thank-you"
              method="GET"
              className="space-y-5"
            >
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
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-900"
                />
              </div>

              {/* SMS Consent Checkbox */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="smsConsent"
                    required
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I agree to receive automated SMS/text messages from{" "}
                    <strong>NEW STAR CLEANING LLC</strong> at the phone number
                    provided. Messages may include appointment confirmations,
                    reminders, service updates, and promotional offers. Message
                    frequency varies. Message and data rates may apply. Consent
                    is not a condition of purchase. Reply{" "}
                    <strong>STOP</strong> to opt out at any time. Reply{" "}
                    <strong>HELP</strong> for assistance. View our{" "}
                    <a
                      href="/privacy"
                      className="text-primary underline font-semibold"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms"
                      className="text-primary underline font-semibold"
                    >
                      Terms of Service
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Opt In to Text Updates
              </button>
            </form>

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
                <a href="tel:5597852822" className="text-primary underline">
                  (559) 785-2822
                </a>
                . See our{" "}
                <a href="/privacy" className="text-primary underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="/terms" className="text-primary underline">
                  Terms of Service
                </a>{" "}
                for more details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

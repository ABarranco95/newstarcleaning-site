import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for New Star Cleaning LLC. Learn how we collect, use, and protect your personal information, including our SMS/text messaging practices.",
  openGraph: {
    title: "Privacy Policy | New Star Cleaning",
    description: "Privacy Policy for New Star Cleaning LLC.",
    url: "https://newstarcleaning.com/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12">
          Last Updated: March 8, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              NEW STAR CLEANING LLC (&ldquo;New Star Cleaning,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy
              Policy describes how we collect, use, disclose, and safeguard your
              personal information when you visit our website
              (newstarcleaning.com), use our services, or communicate with us,
              including via SMS/text messaging.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              By using our website or services, you consent to the data
              practices described in this policy. If you do not agree with the
              terms of this Privacy Policy, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Contact Information:</strong> Name, phone number, email
                address, and mailing/service address
              </li>
              <li>
                <strong>Service Information:</strong> Details about the cleaning
                services you request, scheduling preferences, and special
                instructions
              </li>
              <li>
                <strong>Payment Information:</strong> Billing address and payment
                method details (processed securely through our third-party
                payment processor)
              </li>
              <li>
                <strong>Communication Records:</strong> Records of
                communications between you and New Star Cleaning, including
                phone calls, emails, and text messages
              </li>
              <li>
                <strong>Website Usage Data:</strong> IP address, browser type,
                pages visited, time spent on pages, and other analytical data
                collected through cookies and similar technologies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>To provide, maintain, and improve our cleaning services</li>
              <li>
                To communicate with you about appointments, including
                confirmations, reminders, and follow-ups via phone, email, or
                text message
              </li>
              <li>To process payments and send invoices</li>
              <li>
                To send you promotional offers and marketing communications
                (with your consent)
              </li>
              <li>To request feedback and reviews about our services</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. SMS/Text Messaging Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you provide your phone number and consent to receive text
              messages from New Star Cleaning, you may receive the following
              types of messages:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li>Appointment confirmations and scheduling updates</li>
              <li>Appointment reminders</li>
              <li>Service follow-ups and satisfaction check-ins</li>
              <li>Review and feedback requests</li>
              <li>
                Promotional offers and discounts (only with your express
                consent)
              </li>
            </ul>

            <div className="space-y-4 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Message Frequency
                </h3>
                <p className="text-gray-600 text-sm">
                  Message frequency varies based on your service interactions.
                  Typically, you may receive 1–4 messages per service
                  interaction (booking, reminder, follow-up, review request).
                  Promotional messages are sent no more than 4 times per month.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Message and Data Rates
                </h3>
                <p className="text-gray-600 text-sm">
                  Message and data rates may apply. Please contact your wireless
                  carrier for details about your messaging plan.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Opt-Out Instructions
                </h3>
                <p className="text-gray-600 text-sm">
                  You may opt out of receiving text messages at any time by
                  replying <strong>STOP</strong> to any message you receive from
                  us. After opting out, you will receive a one-time confirmation
                  message, and no further text messages will be sent unless you
                  re-subscribe.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Help
                </h3>
                <p className="text-gray-600 text-sm">
                  For help or questions about our text messaging program, reply{" "}
                  <strong>HELP</strong> to any message or contact us using the
                  information provided at the bottom of this policy.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  No Mobile Information Sharing
                </h3>
                <p className="text-gray-600 text-sm">
                  We do not sell, rent, loan, trade, lease, or otherwise transfer
                  for profit any phone numbers or personal information collected
                  through our SMS/text messaging program to any third party.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We do not sell your personal information. We may share your
              information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                service providers who assist us in operating our business (e.g.,
                payment processors, scheduling software, SMS messaging
                platforms). These providers are contractually obligated to
                protect your information.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or governmental regulation, or when we believe disclosure
                is necessary to protect our rights, your safety, or the safety
                of others.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets, in which case your
                personal information may be transferred to the acquiring entity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement reasonable administrative, technical, and physical
              security measures to protect your personal information from
              unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the internet or electronic storage
              is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your personal information for as long as necessary to
              fulfill the purposes for which it was collected, including to
              satisfy legal, accounting, or reporting requirements. Service
              records are retained for a minimum of 3 years. You may request
              deletion of your personal information at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies and similar tracking technologies to
              enhance your browsing experience and collect usage data. You can
              control cookie preferences through your browser settings. Disabling
              cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Your Rights
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to opt out of marketing communications</li>
              <li>
                The right to opt out of text messages by replying STOP at any
                time
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              California residents may have additional rights under the
              California Consumer Privacy Act (CCPA). To exercise any of these
              rights, please contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Children&apos;s Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children
              under 18. If we learn that we have collected personal information
              from a child under 18, we will take steps to delete that
              information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.
              We encourage you to review this policy periodically. Your
              continued use of our services after changes are posted constitutes
              your acceptance of the revised policy.
            </p>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, our data
              practices, or your rights, please contact us:
            </p>
            <div className="text-gray-600 space-y-1">
              <p>
                <strong>NEW STAR CLEANING LLC</strong>
              </p>
              <p>Fresno, CA</p>
              <p>
                Website:{" "}
                <a
                  href="https://newstarcleaning.com"
                  className="text-primary underline"
                >
                  newstarcleaning.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

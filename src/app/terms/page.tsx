import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for New Star Cleaning LLC. Review our service terms, SMS/text messaging terms, and conditions of use.",
  openGraph: {
    title: "Terms of Service | New Star Cleaning",
    description: "Terms of Service for New Star Cleaning LLC.",
    url: "https://newstarcleaning.com/terms",
  },
};

export default function TermsOfService() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Terms of Service
        </h1>
        <p className="text-gray-500 mb-12">
          Last Updated: March 8, 2026
        </p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding
              agreement between you and NEW STAR CLEANING LLC (&ldquo;New Star
              Cleaning,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a California limited
              liability company, governing your use of our website
              (newstarcleaning.com) and cleaning services. By accessing our
              website or using our services, you agree to be bound by these
              Terms. If you do not agree, please do not use our website or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Services
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              New Star Cleaning provides professional residential cleaning
              services in Fresno, CA and the surrounding Central Valley area,
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                <strong>Standard Recurring Cleaning:</strong> Regularly
                scheduled house cleaning on a weekly, bi-weekly, or monthly
                basis
              </li>
              <li>
                <strong>Deep Cleaning:</strong> One-time thorough cleaning of
                your home
              </li>
              <li>
                <strong>Move-In/Move-Out Cleaning:</strong> Comprehensive
                cleaning for properties being vacated or newly occupied
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Booking and Scheduling
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Services may be booked through our website, booking platform, or
              by contacting us directly. By booking a service, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide accurate and complete information</li>
              <li>
                Provide reasonable access to your property at the scheduled time
              </li>
              <li>
                Notify us of any changes or cancellations at least 24 hours
                before your scheduled appointment
              </li>
              <li>
                A cancellation fee may apply for cancellations made less than 24
                hours before the scheduled service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Payment Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Payment is due at the time of service unless other arrangements
              have been made. We accept major credit cards and other payment
              methods as specified during booking. Prices are subject to change;
              however, any price changes will be communicated to you before your
              next scheduled service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Satisfaction Guarantee
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We stand behind the quality of our work. If you are not satisfied
              with any aspect of our cleaning service, please contact us within
              24 hours of the completed service. We will return to re-clean the
              areas of concern at no additional charge. This guarantee does not
              cover requests for services not included in the original booking.
            </p>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              6. SMS/Text Messaging Terms
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              By providing your phone number and opting in, you consent to
              receive automated text messages from New Star Cleaning. This
              section outlines the terms governing our SMS/text messaging
              communications.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Consent to Receive Messages
                </h3>
                <p className="text-gray-600 text-sm">
                  By providing your mobile phone number and checking the SMS
                  consent checkbox on our booking form, or by texting us to
                  initiate a conversation, you expressly consent to receive
                  automated text messages from New Star Cleaning. Your consent
                  is not a condition of purchasing any goods or services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Types of Messages
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  You may receive the following types of text messages:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                  <li>Appointment confirmations and scheduling updates</li>
                  <li>Appointment reminders</li>
                  <li>Service follow-ups and satisfaction check-ins</li>
                  <li>Review and feedback requests</li>
                  <li>
                    Promotional offers and discounts (with your express consent)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Message Frequency
                </h3>
                <p className="text-gray-600 text-sm">
                  Message frequency varies. You may receive approximately 1–4
                  messages per service interaction. Promotional messages are
                  limited to no more than 4 per month. Actual frequency depends
                  on your service schedule and interactions with our business.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Message and Data Rates
                </h3>
                <p className="text-gray-600 text-sm">
                  <strong>Message and data rates may apply.</strong> Please
                  contact your wireless carrier for pricing details specific to
                  your plan. New Star Cleaning is not responsible for any charges
                  imposed by your carrier.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Opt-Out Instructions
                </h3>
                <p className="text-gray-600 text-sm">
                  You can opt out of receiving text messages at any time by
                  replying <strong>STOP</strong> to any message from us. You
                  will receive a single confirmation message after opting out,
                  and no further messages will be sent unless you re-subscribe.
                  Opting out of text messages does not affect other
                  communications (email, phone calls) or your service
                  appointments.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Help
                </h3>
                <p className="text-gray-600 text-sm">
                  For help with our text messaging program, reply{" "}
                  <strong>HELP</strong> to any message from us, or contact us
                  through our website at newstarcleaning.com.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Carrier Liability Disclaimer
                </h3>
                <p className="text-gray-600 text-sm">
                  Wireless carriers, including but not limited to AT&T,
                  T-Mobile, Verizon, Sprint, and other major U.S. carriers, are
                  not liable for delayed or undelivered messages. Message
                  delivery is subject to effective transmission by your wireless
                  carrier. New Star Cleaning is not responsible for messages that
                  are not received due to carrier issues, device
                  incompatibility, or other factors outside our control.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Compatible Carriers
                </h3>
                <p className="text-gray-600 text-sm">
                  Our SMS messaging program is compatible with all major U.S.
                  wireless carriers, including AT&T, Verizon, T-Mobile, Sprint,
                  US Cellular, and most regional and prepaid carriers. Carrier
                  coverage and compatibility may vary by location.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Age Restriction
                </h3>
                <p className="text-gray-600 text-sm">
                  You must be 18 years of age or older to opt in to our text
                  messaging program. By consenting to receive text messages, you
                  confirm that you are at least 18 years old.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Privacy
                </h3>
                <p className="text-gray-600 text-sm">
                  Your phone number and personal information collected through
                  our SMS program are subject to our{" "}
                  <a href="/privacy" className="text-primary underline">
                    Privacy Policy
                  </a>
                  . We do not sell, rent, or share your phone number or opt-in
                  information with any third parties for marketing purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              7. Property Access and Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You are responsible for providing safe and reasonable access to
              your property for our cleaning team. Please secure valuables,
              inform us of any security systems or access codes, and ensure pets
              are safely secured during the cleaning. We are not responsible for
              damage to items not properly secured or for issues arising from
              inaccurate access instructions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              8. Liability and Insurance
            </h2>
            <p className="text-gray-600 leading-relaxed">
              New Star Cleaning carries general liability insurance. In the
              unlikely event of accidental damage to your property during a
              cleaning, please notify us within 24 hours. We will assess the
              situation and work with you to resolve the issue. Our liability is
              limited to the cost of repair or replacement of the damaged item,
              up to the coverage limits of our insurance policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              To the fullest extent permitted by law, New Star Cleaning, its
              members, employees, and contractors shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including but not limited to loss of profits, data, or goodwill,
              arising out of or in connection with your use of our website or
              services. Our total liability for any claim arising out of these
              Terms shall not exceed the amount paid by you for the specific
              service giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              10. Indemnification
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You agree to indemnify and hold harmless New Star Cleaning, its
              members, employees, and contractors from any claims, damages,
              losses, or expenses (including reasonable attorney&apos;s fees) arising
              out of your violation of these Terms, your misuse of our services,
              or your provision of inaccurate information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              11. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on our website, including text, graphics, logos,
              images, and software, is the property of New Star Cleaning or its
              licensors and is protected by intellectual property laws. You may
              not reproduce, distribute, or create derivative works from our
              content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              12. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the State of California, without regard to its
              conflict of law principles. Any legal action or proceeding arising
              out of these Terms shall be brought exclusively in the state or
              federal courts located in Fresno County, California.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              13. Changes to These Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these Terms at any time. Any
              changes will be posted on this page with an updated &ldquo;Last
              Updated&rdquo; date. Your continued use of our website or services
              after changes are posted constitutes your acceptance of the
              revised Terms. We encourage you to review these Terms
              periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              14. Severability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              15. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
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

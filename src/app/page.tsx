import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

const faqItems = [
  {
    q: "What cleaning supplies do you use?",
    a: "We bring all cleaning supplies and equipment. We use professional-grade, eco-friendly products that are safe for children and pets. If you have specific product preferences, just let us know when booking.",
  },
  {
    q: "How do I reschedule or cancel a cleaning?",
    a: "You can reschedule or cancel through your Booking Koala account or by contacting us directly. We ask for at least 24 hours notice for cancellations to avoid a cancellation fee.",
  },
  {
    q: "Are your cleaners background checked?",
    a: "Yes, every cleaner on our team undergoes a thorough background check and vetting process before they ever enter a client's home. Your safety and trust are our top priority.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "No, you don't need to be home. Many clients leave a key, provide a garage code, or use a smart lock. We'll work with whatever access method is most convenient for you.",
  },
  {
    q: "What's included in a standard cleaning vs. deep cleaning?",
    a: "A standard cleaning covers all living areas — vacuuming, mopping, dusting, kitchen and bathroom surfaces, and general tidying. A deep cleaning includes everything in a standard cleaning plus baseboards, inside appliances, window sills, ceiling fans, and detailed scrubbing of showers and tubs.",
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "We offer a 100% satisfaction guarantee. If you're not happy with any part of the cleaning, contact us within 24 hours and we'll come back to make it right — at no additional cost.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              A Spotless Home,{" "}
              <span className="text-accent">Without the Stress</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              Professional house cleaning in Fresno, Clovis, and the Central
              Valley. Book online in 60 seconds. Vetted, insured cleaners you
              can trust.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-now"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Your Cleaning
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { stat: "500+", label: "Homes Cleaned" },
              { stat: "4.9★", label: "Average Rating" },
              { stat: "100%", label: "Satisfaction Guarantee" },
              { stat: "Same Week", label: "Availability" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 text-center border border-white/10"
              >
                <div className="text-2xl lg:text-3xl font-bold text-accent">
                  {item.stat}
                </div>
                <div className="text-sm text-white/70 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Cleaning Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From weekly maintenance to one-time deep cleans, we've got your
              home covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard Recurring",
                desc: "Keep your home consistently clean with weekly, bi-weekly, or monthly service. We handle the routine so you can enjoy your space.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                features: [
                  "Weekly, bi-weekly, or monthly",
                  "All rooms cleaned & refreshed",
                  "Consistent, trusted cleaners",
                  "Flexible scheduling",
                ],
              },
              {
                title: "Deep Cleaning",
                desc: "A thorough, top-to-bottom clean that tackles every corner, crevice, and surface. Perfect for a fresh start or seasonal refresh.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                features: [
                  "Every surface deep-scrubbed",
                  "Inside appliances & cabinets",
                  "Baseboards, fans, & vents",
                  "One-time or add to recurring",
                ],
              },
              {
                title: "Move-In / Move-Out",
                desc: "Moving is stressful enough. We'll make sure the place is spotless — whether you're moving in or handing back the keys.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                features: [
                  "Full property cleaning",
                  "Get your deposit back",
                  "Landlord & tenant friendly",
                  "Available same week",
                ],
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book-now"
                  className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors"
                >
                  Book This Service
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose New Star Cleaning
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We make it easy to get the clean home you deserve.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Book in 60 Seconds",
                desc: "Our simple online booking lets you schedule your cleaning in under a minute. Pick your date, choose your service, done.",
                icon: "⚡",
              },
              {
                title: "Vetted Professionals",
                desc: "Every cleaner is background-checked, trained, and vetted. We only send people we'd trust in our own homes.",
                icon: "✓",
              },
              {
                title: "Fully Insured",
                desc: "We're fully insured for your peace of mind. If anything goes wrong, we've got it covered — no questions asked.",
                icon: "🛡️",
              },
              {
                title: "Guaranteed Results",
                desc: "Not satisfied? We'll come back and make it right, free of charge. That's our 100% satisfaction guarantee.",
                icon: "⭐",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-2xl mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting a clean home is as easy as 1-2-3.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Book Online",
                desc: "Choose your service, pick a date and time that works for you, and book in under 60 seconds.",
              },
              {
                step: "2",
                title: "We Clean",
                desc: "Our vetted, professional cleaning team arrives on time and gets to work making your home sparkle.",
              },
              {
                step: "3",
                title: "You Relax",
                desc: "Come home to a spotless house. Enjoy your free time doing the things you actually love.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Get Started — Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real reviews from real homeowners in the Central Valley.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Fresno, CA",
                text: "We've been using New Star Cleaning for our bi-weekly service for 6 months now and the quality is consistently amazing. Our home always feels like new after they visit. Highly recommend!",
                rating: 5,
              },
              {
                name: "David R.",
                location: "Clovis, CA",
                text: "Had them do a move-out cleaning on our rental property. The place looked brand new — got our full $1,800 deposit back. Worth every penny. Will definitely use again.",
                rating: 5,
              },
              {
                name: "Maria L.",
                location: "Madera, CA",
                text: "The 60-second booking was no joke — so easy! And the deep clean they did was a total game-changer. My kitchen and bathrooms have never looked better. Thank you New Star!",
                rating: 5,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {review.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="https://g.page/r/CZnoJYR4LIauEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:text-accent transition-colors"
            >
              See All Reviews on Google →
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="areas" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Serving the Central Valley
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Professional house cleaning across Fresno and the surrounding
              communities.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Fresno", slug: "fresno", primary: true },
              { name: "Clovis", slug: "clovis", primary: true },
              { name: "Madera", slug: "madera" },
              { name: "Sanger", slug: "sanger" },
              { name: "Selma", slug: "selma" },
              { name: "Kingsburg", slug: "kingsburg" },
              { name: "Reedley", slug: "reedley" },
              { name: "Visalia", slug: "visalia" },
              { name: "Tulare", slug: "tulare" },
              { name: "Hanford", slug: "hanford" },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className={`rounded-xl p-4 text-center transition-all border hover:shadow-md ${
                  area.primary
                    ? "bg-primary text-white border-primary hover:bg-primary-dark"
                    : "bg-gray-50 text-gray-700 border-gray-100 hover:border-primary hover:text-primary"
                }`}
              >
                <div className="font-semibold">{area.name}</div>
                <div
                  className={`text-xs mt-1 ${
                    area.primary ? "text-white/70" : "text-gray-400"
                  }`}
                >
                  CA
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready for a Home That Sparkles?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Join 500+ homeowners in the Central Valley who trust New Star
            Cleaning. Book your first cleaning today and see the difference.
          </p>
          <div className="mt-8">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center bg-accent hover:bg-accent-hover text-white font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Book Your Cleaning Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
          <div className="mt-6">
            <TrustBadges compact />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      </section>

      {/* Blog Preview */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Cleaning Tips & Insights
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Helpful advice to keep your home looking its best between
              professional cleanings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Cleaning Hacks That Save Hours Every Week",
                excerpt:
                  "Professional cleaners share their favorite time-saving tricks that'll change how you clean forever.",
                category: "Tips & Tricks",
              },
              {
                title: "How Often Should You Deep Clean Your Home?",
                excerpt:
                  "A room-by-room guide to deep cleaning frequency, straight from our expert cleaning team.",
                category: "Guides",
              },
              {
                title: "Move-Out Cleaning Checklist: Get Your Full Deposit Back",
                excerpt:
                  "The complete checklist landlords use to inspect properties — and how to pass with flying colors.",
                category: "Checklists",
              },
            ].map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-primary/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

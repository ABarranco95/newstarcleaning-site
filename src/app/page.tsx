import Link from "next/link";
import QuickQuoteForm from "@/components/QuickQuoteForm";

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

const services = [
  {
    eyebrow: "01 / Recurring",
    title: "Standard Recurring",
    desc: "Weekly, bi-weekly, or monthly visits with a consistent cleaner you trust. The routine your home deserves, on a cadence that fits your life.",
    features: [
      "Weekly, bi-weekly, or monthly cadence",
      "All living areas refreshed each visit",
      "Same trusted cleaner, every time",
      "Reschedule any time in your portal",
    ],
  },
  {
    eyebrow: "02 / Deep Clean",
    title: "Deep Cleaning",
    desc: "A meticulous, top-to-bottom reset. Inside appliances, baseboards, fans, vents, and all the places routine cleans rarely reach.",
    features: [
      "Every surface deep-scrubbed",
      "Inside appliances, cabinets, and ovens",
      "Baseboards, fans, vents, and trim",
      "One-time, or layered onto recurring",
    ],
  },
  {
    eyebrow: "03 / Move-Out",
    title: "Move-In · Move-Out",
    desc: "Inspection-ready cleans for renters, landlords, and Realtors. Designed to recover your full deposit or hand off a turnkey property.",
    features: [
      "Full empty-property cleaning",
      "Tuned to landlord checklists",
      "Same-week availability",
      "Walk-through ready guarantee",
    ],
  },
];

const reviews = [
  {
    name: "Sarah M.",
    location: "Fresno, CA",
    text: "We've been using New Star Cleaning for our bi-weekly service for 6 months and the quality is consistently amazing. Our home always feels like new after they visit. Highly recommend.",
    rating: 5,
  },
  {
    name: "David R.",
    location: "Clovis, CA",
    text: "Had them do a move-out cleaning on our rental property. The place looked brand new and we got our full $1,800 deposit back. Worth every penny — will definitely use again.",
    rating: 5,
  },
  {
    name: "Maria L.",
    location: "Madera, CA",
    text: "The 60-second booking was no joke — so easy. The deep clean was a total game-changer. My kitchen and bathrooms have never looked better.",
    rating: 5,
  },
];

const featuredAreas = [
  {
    name: "Fresno",
    slug: "fresno",
    blurb: "Clovis Ave to Bullard. Recurring, deep, and move-out cleans across every Fresno neighborhood.",
  },
  {
    name: "Clovis",
    slug: "clovis",
    blurb: "Old Town to Harlan Ranch. Same-day availability for Clovis families and rentals.",
  },
];

const otherAreas = [
  { name: "Madera", slug: "madera" },
  { name: "Sanger", slug: "sanger" },
  { name: "Selma", slug: "selma" },
  { name: "Kingsburg", slug: "kingsburg" },
  { name: "Reedley", slug: "reedley" },
  { name: "Visalia", slug: "visalia" },
  { name: "Tulare", slug: "tulare" },
  { name: "Hanford", slug: "hanford" },
];

function StarRow({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-accent"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div
          className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 right-0 h-[32rem] w-[32rem] rounded-full bg-primary-light/40 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl text-white">
              <span className="eyebrow eyebrow-dot text-accent-light">
                Fresno · Clovis · Central Valley
              </span>

              <h1 className="mt-5 text-[2.6rem] sm:text-5xl lg:text-[4rem] leading-[1.04]">
                A spotless home,
                <br className="hidden sm:block" />
                <span className="italic text-accent-light"> kept that way.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Vetted, insured house cleaners across the Central Valley. Get a real
                quote in 60 seconds, or book a recurring, deep, or move-out clean
                online — same-week availability.
              </p>

              {/* Inline rating + proof microcopy */}
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <StarRow />
                  <span className="text-sm font-semibold text-white">4.9</span>
                  <span className="text-sm text-white/60">on Google · 500+ homes</span>
                </div>
                <div className="hidden h-4 w-px bg-white/15 sm:block" />
                <div className="flex items-center gap-2 text-sm text-white/75">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Insured · background checked · satisfaction-guaranteed
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#quote"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:bg-accent-hover hover:-translate-y-0.5"
                >
                  Get a fast quote
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <Link
                  href="/book-now"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Book online
                </Link>
              </div>

              {/* Stat strip */}
              <dl className="mt-12 hidden gap-x-6 gap-y-6 sm:grid sm:grid-cols-4">
                {[
                  { k: "500+", v: "Homes cleaned" },
                  { k: "4.9★", v: "Google rating" },
                  { k: "100%", v: "Satisfaction" },
                  { k: "Same-week", v: "Availability" },
                ].map((s) => (
                  <div key={s.v} className="border-l border-white/15 pl-4">
                    <dt className="font-display text-2xl text-white">{s.k}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-wider text-white/55">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quote form, lifted with a soft halo */}
            <div className="relative mt-10 lg:mt-0">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/15 blur-2xl" aria-hidden="true" />
              <QuickQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PROOF STRIP ─────────────── */}
      <section className="border-y border-line bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <StarRow />
              <span className="font-semibold text-ink">4.9 on Google</span>
            </div>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className="font-medium">Background-checked cleaners</span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className="font-medium">Fully insured · LLC</span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className="font-medium">100% satisfaction or we re-clean</span>
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section id="services" className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div className="max-w-xl">
              <span className="eyebrow eyebrow-dot">What we do</span>
              <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
                Three services. Done <em className="text-accent not-italic">properly</em>.
              </h2>
            </div>
            <p className="text-lg text-ink-soft lg:max-w-md lg:justify-self-end">
              No upsell maze, no confusing tiers. Pick the cadence — recurring, deep,
              or move-in/out — and we&apos;ll send a vetted local team.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative flex flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elev"
              >
                <span className="eyebrow text-mute group-hover:text-accent">
                  {service.eyebrow}
                </span>
                <h3 className="mt-4 text-2xl text-ink">{service.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                  {service.desc}
                </p>

                <div className="my-6 ns-divider" />

                <ul className="space-y-2.5 text-sm text-ink-soft">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book-now"
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Book this service
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Index numeral as decorative serif */}
                <span
                  className="pointer-events-none absolute right-6 top-6 font-display text-5xl text-line/80 select-none"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── WHY US ─────────────── */}
      <section className="ns-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Why New Star</span>
            <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
              The professional standard, without the agency markup.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              We built New Star for the homeowners who&apos;ve been burned by no-shows,
              shifting prices, and crews that vanish after one visit. Here&apos;s the
              difference.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Book in 60 seconds",
                desc: "Online quote and booking — no callbacks required, no surprise pricing later.",
              },
              {
                title: "Vetted professionals",
                desc: "Background-checked, trained, and rated. We send people we'd trust in our own homes.",
              },
              {
                title: "Fully insured",
                desc: "Licensed LLC, fully insured. If anything goes sideways, you're covered.",
              },
              {
                title: "Re-clean guarantee",
                desc: "Not satisfied with any room? We come back within 24 hours and re-clean it free.",
              },
            ].map((item, i) => (
              <div key={item.title} className="relative bg-white p-8 lg:p-10">
                <span className="font-display text-sm text-accent">
                  / {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section id="how-it-works" className="ns-section bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow eyebrow-dot">How it works</span>
              <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
                Three steps. <em className="not-italic text-accent">That&apos;s it.</em>
              </h2>
              <p className="mt-5 text-ink-soft">
                Designed to be the easiest cleaning booking in the Central Valley.
              </p>
              <Link
                href="/book-now"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary-light"
              >
                Start your booking
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <ol className="relative space-y-8 lg:space-y-10">
              <span className="absolute left-[1.4rem] top-2 bottom-2 w-px bg-line lg:left-[1.6rem]" aria-hidden="true" />
              {[
                {
                  step: "1",
                  title: "Book online",
                  desc: "Pick your service, the date and time that work for you, and book in under 60 seconds — no phone tag.",
                },
                {
                  step: "2",
                  title: "We clean",
                  desc: "A vetted New Star team arrives on time with all supplies and equipment, ready to make your home shine.",
                },
                {
                  step: "3",
                  title: "You relax",
                  desc: "Come home to a spotless space. Recurring? Lock in your cleaner and your cadence in one click.",
                },
              ].map((item) => (
                <li key={item.step} className="relative pl-16 lg:pl-20">
                  <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-xl text-white shadow-soft lg:h-14 lg:w-14 lg:text-2xl">
                    {item.step}
                  </span>
                  <h3 className="text-2xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed lg:max-w-lg">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─────────────── REVIEWS ─────────────── */}
      <section id="reviews" className="ns-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="eyebrow eyebrow-dot">Real homes, real reviews</span>
              <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
                Trusted by 500+ Central Valley homes.
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-line bg-cream px-5 py-2.5 shadow-soft">
              <StarRow />
              <span className="font-semibold text-ink">4.9</span>
              <span className="text-sm text-ink-soft">average on Google</span>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="relative flex flex-col rounded-3xl border border-line bg-cream p-8 shadow-soft"
              >
                <span
                  className="absolute -top-3 left-7 font-display text-7xl leading-none text-accent select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <StarRow />
                <blockquote className="mt-5 text-[1rem] leading-relaxed text-ink-soft">
                  {review.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">{review.name}</span>
                    <span className="block text-xs text-mute">{review.location}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="https://g.page/r/CZnoJYR4LIauEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
            >
              Read every review on Google
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────── AREAS ─────────────── */}
      <section id="areas" className="ns-section bg-cream-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Where we clean</span>
            <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
              Local to the Central Valley.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Our home base is Fresno. We dispatch teams across ten cities — every
              cleaner you meet is already familiar with your neighborhood.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featuredAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-elev lg:p-10"
              >
                <div className="absolute inset-0 ns-mesh opacity-90" aria-hidden="true" />
                <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
                <div className="relative">
                  <span className="eyebrow text-accent-light">Primary service area</span>
                  <h3 className="mt-3 text-3xl text-white lg:text-4xl">
                    {area.name}, CA
                  </h3>
                  <p className="mt-3 max-w-md text-white/75">{area.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    See {area.name} cleaning details
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {otherAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 transition-all hover:border-primary hover:shadow-soft"
              >
                <span>
                  <span className="block font-semibold text-ink">{area.name}</span>
                  <span className="block text-xs text-mute">CA</span>
                </span>
                <svg className="h-4 w-4 text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── BIG CTA ─────────────── */}
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <span className="eyebrow eyebrow-dot text-accent-light">
            Same-week availability
          </span>
          <h2 className="mt-5 text-4xl lg:text-6xl text-white">
            Ready for a home that
            <span className="italic text-accent-light"> sparkles?</span>
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-white/75">
            Join 500+ Central Valley homeowners who trust New Star Cleaning. Book in
            60 seconds, or grab a quote and we&apos;ll follow up fast.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-now"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Book your cleaning
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Or get a quote first
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span>Insured · LLC</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>Background-checked teams</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span>100% re-clean guarantee</span>
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="ns-section bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">FAQ</span>
            <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
              The honest answers.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              The questions homeowners actually ask before booking — answered straight.
            </p>
          </div>

          <div className="mt-12 divide-y divide-line border-y border-line">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                  <h3 className="text-lg font-semibold text-ink">{item.q}</h3>
                  <span className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line bg-cream text-mute transition-all group-open:rotate-45 group-open:bg-accent group-open:text-white group-open:border-accent">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-ink-soft">{item.a}</p>
              </details>
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

      {/* ─────────────── BLOG TEASER ─────────────── */}
      <section className="ns-section bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="eyebrow eyebrow-dot">Notes & guides</span>
              <h2 className="mt-4 text-4xl lg:text-5xl text-ink">
                Cleaning tips, straight from the team.
              </h2>
            </div>
            <p className="text-ink-soft md:max-w-xs">
              Field-tested advice from professional cleaners — to keep your home
              looking its best between visits.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "10 cleaning hacks that save hours every week",
                excerpt:
                  "Time-saving tricks our pros actually use on the job — most of them take less than 60 seconds.",
                category: "Tips & Tricks",
                tone: "from-accent/30 to-accent/0",
              },
              {
                title: "How often should you deep clean your home?",
                excerpt:
                  "A room-by-room cadence guide, straight from our deep-clean leads.",
                category: "Guides",
                tone: "from-primary/30 to-primary/0",
              },
              {
                title: "Move-out checklist: get your full deposit back",
                excerpt:
                  "The exact checklist landlords use — and how to walk into inspection day with zero stress.",
                category: "Checklists",
                tone: "from-accent-light/40 to-accent-light/0",
              },
            ].map((post) => (
              <article
                key={post.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-elev"
              >
                <div className={`relative h-44 bg-gradient-to-br ${post.tone} bg-cream-2`}>
                  <span
                    className="absolute inset-0 flex items-center justify-center font-display text-7xl text-ink/10 select-none"
                    aria-hidden="true"
                  >
                    {post.category.charAt(0)}
                  </span>
                </div>
                <div className="p-6">
                  <span className="eyebrow text-accent">{post.category}</span>
                  <h3 className="mt-3 text-xl text-ink">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

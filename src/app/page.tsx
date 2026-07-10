import Link from "next/link";
import BeforeAfterCarousel, { type BeforeAfterItem } from "@/components/BeforeAfterCarousel";

const services = [
  {
    number: "01",
    title: "Standard recurring cleaning",
    href: "/services/standard-cleaning",
    lead: "Weekly, bi-weekly, or monthly cleaning for homes that are already maintained and ready for a reliable routine.",
    fit: "Best for ongoing home care",
  },
  {
    number: "02",
    title: "Deep cleaning",
    href: "/services/deep-cleaning",
    lead: "A detailed reset for first visits, seasonal cleaning, baseboards, fixtures, reachable buildup, and floor edges.",
    fit: "Best for first visits and resets",
  },
  {
    number: "03",
    title: "Move-in / move-out cleaning",
    href: "/services/move-out-cleaning",
    lead: "Detailed cleaning for empty homes, including accessible room surfaces, appliances, empty cabinets, bathrooms, and floors.",
    fit: "Best for empty-home transitions",
  },
];

const steps = [
  {
    title: "Tell us about the home",
    text: "Share the city, service, approximate size, condition, and preferred timing.",
  },
  {
    title: "Receive a clear quote",
    text: "We confirm the price, what is included, and any optional details before you book.",
  },
  {
    title: "Choose an appointment",
    text: "Review the available times and move forward only when the details work for you.",
  },
];

const areas = [
  { name: "Fresno", slug: "fresno", type: "City service area" },
  { name: "Clovis", slug: "clovis", type: "City service area" },
  { name: "Madera", slug: "madera", type: "Availability confirmed" },
  { name: "Tower District", slug: "tower-district", type: "Fresno neighborhood" },
  { name: "Fig Garden", slug: "fig-garden", type: "Fresno neighborhood" },
  { name: "Woodward Park", slug: "woodward-park", type: "Fresno neighborhood" },
];

const faqs = [
  {
    q: "Which cleaning service should I request?",
    a: "Choose standard recurring cleaning for an already maintained home, deep cleaning for a detailed reset, or move-in/move-out cleaning for an empty home. If you are unsure, send the home details and we will recommend the right starting point.",
  },
  {
    q: "Are the oven, refrigerator, cabinets, and windows included?",
    a: "Standard and deep cleaning treat the inside of the oven and refrigerator, cabinet interiors, and interior window glass as optional additions. The inside of an empty microwave is included when accessible. Move-in/move-out cleaning includes the inside of an empty oven, refrigerator, microwave, and empty cabinets and drawers when they are accessible. Interior window glass is optional; exterior windows, screens, tracks, and ladder work are not included.",
  },
  {
    q: "Do cleaners bring supplies and equipment?",
    a: "Yes. Cleaners bring the supplies and equipment needed for the confirmed cleaning. Tell us about delicate surfaces, product sensitivities, or access requirements before the appointment.",
  },
  {
    q: "Do you handle laundry, dishes, organizing, or packing?",
    a: "No. New Star provides residential cleaning for accessible rooms and surfaces. Laundry, dishes, bed making, organizing, packing, unpacking, and personal-item handling are outside the service.",
  },
  {
    q: "Can I call or text instead of using the quote form?",
    a: "Yes. Call or text (559) 785-2822 if you would rather talk through the home and timing directly.",
  },
];

const trustPoints = [
  "Locally owned in Fresno",
  "Fresno, Clovis & Madera routes",
  "Cleaners bring supplies",
  "Quote confirmed before booking",
];

const resultsPairs: BeforeAfterItem[] = [
  {
    before: { src: "/photos/before1.jpg", alt: "Shower before a New Star deep cleaning" },
    after: { src: "/photos/after1.jpg", alt: "Shower after a New Star deep cleaning" },
    label: "Shower buildup removed from accessible tile and basin surfaces.",
  },
  {
    before: { src: "/photos/before2.jpg", alt: "Bathtub before a New Star cleaning" },
    after: { src: "/photos/after2.jpg", alt: "Bathtub after a New Star cleaning" },
    label: "Bathtub surface cleaned during a detailed bathroom visit.",
  },
  {
    before: { src: "/photos/before3.jpg", alt: "Door frame before detailed cleaning" },
    after: { src: "/photos/after3.jpg", alt: "Door frame after detailed cleaning" },
    label: "Reachable door-frame buildup removed during detail work.",
  },
  {
    before: { src: "/photos/before4.jpg", alt: "Window blinds before detailed cleaning" },
    after: { src: "/photos/after4.jpg", alt: "Window blinds after detailed cleaning" },
    label: "Accessible blind detail from a real New Star appointment.",
  },
];

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <span className="eyebrow text-accent-light">Serving Fresno, Clovis &amp; Madera</span>
            <h1 className="mt-5 max-w-3xl text-4xl text-white sm:text-5xl lg:text-[3.6rem]">
              House cleaning in Fresno, Clovis &amp; Madera—done with care.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Choose recurring, deep, or move-in/move-out cleaning. Tell us about the home and we will confirm the price, what is included, and available times before you book.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/book-now" className="btn btn-accent">
                Request a quote <ArrowIcon />
              </Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">
                Call or text (559) 785-2822
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/60">
              No payment is collected with your quote request.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-white/65">
              <span>Real New Star work</span>
              <span>View to compare</span>
            </div>
            <BeforeAfterCarousel items={[resultsPairs[0], resultsPairs[3]]} />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white" aria-label="Service facts">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-6 sm:grid-cols-4 sm:gap-x-10">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-ink-soft">
                <span className="text-accent" aria-hidden="true">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Cleaning services</span>
              <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Choose the right level of cleaning.</h2>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                Each service page lists the room-by-room work, optional additions, and exclusions in plain English.
              </p>
              <Link href="/checklist" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent">
                Compare the full checklist <ArrowIcon />
              </Link>
            </div>

            <div className="divide-y divide-line border-y border-line">
              {services.map((service) => (
                <Link key={service.title} href={service.href} className="group grid gap-4 py-7 transition-colors sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-6 hover:text-primary">
                  <span className="text-sm font-extrabold text-accent">{service.number}</span>
                  <span>
                    <span className="block text-xl font-bold text-ink group-hover:text-primary">{service.title}</span>
                    <span className="mt-2 block max-w-xl text-sm leading-6 text-ink-soft">{service.lead}</span>
                    <span className="mt-3 block text-xs font-bold uppercase tracking-[0.12em] text-mute">{service.fit}</span>
                  </span>
                  <span className="hidden pt-1 text-primary transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-line bg-cream-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">How it works</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">From home details to a confirmed appointment.</h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-l-2 border-primary pl-6">
                <span className="text-sm font-extrabold text-accent">0{index + 1}</span>
                <h3 className="mt-3 text-xl text-ink">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/book-now" className="btn btn-accent mt-10">Request a quote <ArrowIcon /></Link>
        </div>
      </section>

      <section id="results" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <span className="eyebrow eyebrow-dot">Real results</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Real before-and-after work from New Star appointments.</h2>
            <p className="mt-5 text-lg leading-8 text-ink-soft">
              These are customer-job photos, not stock images. Use the toggle to compare the same surface before and after cleaning.
            </p>
            <p className="mt-4 text-sm leading-6 text-mute">
              Results vary with surface condition, buildup, access, and the cleaning requested.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <BeforeAfterCarousel items={resultsPairs} />
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span className="eyebrow text-accent-light">Why New Star</span>
            <h2 className="mt-4 text-3xl text-white sm:text-4xl">Local cleaning with clear expectations.</h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              The goal is simple: the customer knows what was requested, the cleaner knows the job, and the appointment has enough time for the work.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {[
              ["A quote built around the home", "Size, condition, service type, pets, and optional details are considered before the price is confirmed."],
              ["Supplies come with the cleaner", "Cleaners bring the supplies and equipment needed for the confirmed residential cleaning."],
              ["A focused local service area", "Public routes stay within Fresno, Clovis, Madera, and the listed Fresno neighborhoods."],
              ["Support after the appointment", "If something included appears missed, contact us within 24 hours so the concern can be reviewed."],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-white/15 py-6">
                <h3 className="text-lg text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow eyebrow-dot">Service areas</span>
              <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Fresno-based routes, kept intentionally local.</h2>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                Fresno and Clovis are core routes. Madera appointments depend on route capacity. The neighborhood pages cover approved areas within Fresno.
              </p>
            </div>
            <Link href="/service-areas" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent">
              View all route details <ArrowIcon />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
            {areas.map((area) => (
              <Link key={area.slug} href={`/cleaning-services-${area.slug}`} className="group border-b border-r border-line px-4 py-6 transition-colors hover:bg-cream-2">
                <span className="block text-base font-bold text-primary">{area.name}</span>
                <span className="mt-1 block text-xs leading-5 text-mute">{area.type}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="border-y border-line bg-cream-2">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8 lg:py-16">
          <div>
            <span className="eyebrow eyebrow-dot">Customer feedback</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Read recent New Star reviews on Google.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
              See customer comments, uploaded photos, and the current Google Business Profile before deciding.
            </p>
          </div>
          <a href="https://www.google.com/maps?cid=12575787905603463321" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Open Google reviews <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <span className="eyebrow eyebrow-dot">FAQ</span>
          <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Before you request a quote.</h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <svg className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import BeforeAfterCarousel, { type BeforeAfterItem } from "@/components/BeforeAfterCarousel";

const services = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    lead: "A real reset — baseboards, reachable vents, fans, trim, fixtures, floor edges, and buildup. For first-time cleans, seasonal resets, or homes past maintenance condition.",
    fit: "Best for first-time cleans & seasonal resets",
  },
  {
    title: "Move-In / Move-Out",
    href: "/services/move-out-cleaning",
    lead: "Empty-home turnover cleaned against the details landlords, buyers, and sellers actually inspect — appliances, cabinets, blinds, and closets. Priced before booking, not guessed.",
    fit: "Best for rentals, turnovers & closings",
  },
  {
    title: "Standard Recurring",
    href: "/services/standard-cleaning",
    lead: "Maintenance for homes already in normal condition — weekly, bi-weekly, or monthly. Same trusted cleaner whenever scheduling allows.",
    fit: "Best after the home is already reset",
  },
];

const steps = [
  {
    title: "Send the basics",
    text: "City, service type, timing, and home size. The form stays short — we only ask what we need to price it correctly.",
  },
  {
    title: "We confirm scope",
    text: "If the home needs add-ons or heavy-duty work, we ask before pricing. No surprise charges after the cleaner arrives.",
  },
  {
    title: "You decide",
    text: "Clear pricing and availability, then you book only when it makes sense. No payment or commitment from the quote form.",
  },
];

const areas = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
  { name: "Tower District", slug: "tower-district" },
  { name: "Fig Garden", slug: "fig-garden" },
  { name: "Woodward Park", slug: "woodward-park" },
];

const faqs = [
  {
    q: "What kind of cleaning should I request?",
    a: "Standard Recurring for maintained homes, Deep Cleaning for a reset, and Move-In / Move-Out when the home is empty or being turned over. Not sure? Send the basics and we will classify it before quoting.",
  },
  {
    q: "Are oven, fridge, cabinets, and windows included?",
    a: "Only when they are part of your quote. We separate detail add-ons clearly so the price matches the work and the cleaner has enough time.",
  },
  {
    q: "Do you handle laundry, dishes, or organizing?",
    a: "No. New Star is a cleaning service, not a household-task service. Laundry, dishes, bed making, organizing, and packing are outside our scope.",
  },
  {
    q: "Can I call instead of filling out the form?",
    a: "Yes — call or text if timing is tight or you would rather talk through the home first.",
  },
];

const trustPoints = [
  "Locally owned, Fresno-based",
  "Fresno, Clovis & Madera routes",
  "Scope confirmed before booking",
  "Same trusted cleaner recurring",
];

/**
 * Real New Star before/after pairs. Swap or extend in /public/photos.
 * Hero uses after1.jpg by default (change HERO_PHOTO below to feature a different shot).
 */
const HERO_PHOTO = "/photos/after1.jpg";

const resultsPairs: BeforeAfterItem[] = [
  {
    before: { src: "/photos/before1.jpg", alt: "Before a New Star cleaning" },
    after: { src: "/photos/after1.jpg", alt: "After a New Star cleaning" },
  },
  {
    before: { src: "/photos/before2.jpg", alt: "Before a New Star cleaning" },
    after: { src: "/photos/after2.jpg", alt: "After a New Star cleaning" },
  },
  {
    before: { src: "/photos/before3.jpg", alt: "Before a New Star cleaning" },
    after: { src: "/photos/after3.jpg", alt: "After a New Star cleaning" },
  },
  {
    before: { src: "/photos/before4.jpg", alt: "Before a New Star cleaning" },
    after: { src: "/photos/after4.jpg", alt: "After a New Star cleaning" },
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — navy anchor, one clear path */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-1/4 h-[24rem] w-[24rem] rounded-full bg-primary-light/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-0.5 text-accent-light" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-semibold text-white/80">
                Fresno &amp; Clovis house cleaning
              </span>
            </div>

            <h1 className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
              Clear scope and honest pricing before a cleaner steps in your home.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              New Star is a locally owned cleaning company serving Fresno, Clovis, and Madera.
              No vague &ldquo;everything&rdquo; quotes, no surprises after arrival — just a clear
              scope, an honest price, and a cleaner who knows the job before they start.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/book-now" className="btn btn-accent">
                Get pricing
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">
                (559) 785-2822
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/55">
              Get pricing without a long form. Request clear pricing before anything is booked.
            </p>
          </div>

          {/* Real work — hero photo (swap HERO_PHOTO to feature a different shot) */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-4 border-white/10 shadow-elev">
              <Image
                src={HERO_PHOTO}
                alt="A finished New Star cleaning result"
                fill
                sizes="(min-width: 1024px) 420px, 80vw"
                className="object-cover"
                priority
              />
            </div>
            <a
              href="https://www.google.com/maps?cid=12575787905603463321"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-4 -left-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-primary px-4 py-2.5 shadow-elev sm:-left-5"
            >
              <span className="flex items-center gap-0.5 text-accent-light" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                  </svg>
                ))}
              </span>
              <span className="text-xs font-bold text-white">Read our Google reviews</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip — honest specifics */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-6 sm:grid-cols-4 sm:gap-x-10">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-semibold text-ink-soft">
                <svg className="h-4 w-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services — contained cards on tinted bg for depth */}
      <section id="services" className="bg-cream-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Services</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Match the clean to the condition of the home.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              We price the right scope so the cleaner walks in prepared and you know exactly what
              is included — not the same package sold to every visitor.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-elev"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-10 bg-line transition-colors group-hover:bg-accent" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-2xl text-ink transition-colors group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-ink-soft">{service.lead}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm font-bold text-ink">
                  {service.fit}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:text-accent-hover">
                  View details
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">How it works</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Quote first. Cleaning only after the scope makes sense.
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={step.title} className="relative rounded-2xl border border-line bg-cream-2 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link href="/book-now" className="btn btn-accent">Start the quote</Link>
          </div>
        </div>
      </section>

      {/* Real results — before/after proof */}
      <section id="results" className="bg-cream-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <div>
              <span className="eyebrow eyebrow-dot">Real results</span>
              <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
                See the difference, then decide.
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-soft">
                Real before/after from New Star jobs across Fresno, Clovis, and Madera. Use the
                toggle to compare, and swipe through a few recent cleans.
              </p>
              <p className="mt-4 text-sm leading-6 text-mute">
                Every job is scoped before booking. Your result depends on the home&apos;s condition
                and the agreed scope — not a stock photo and a vague promise.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <BeforeAfterCarousel items={resultsPairs} />
            </div>
          </div>
        </div>
      </section>

      {/* Why New Star — specifics */}
      <section className="border-y border-line bg-cream-2">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span className="eyebrow eyebrow-dot">Why New Star</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              The boring things that actually make a clean reliable.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              We would rather lose a booking than overpromise a result we can&apos;t control. Here
              is exactly how we operate.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                t: "Scope before booking",
                d: "We confirm service type, home condition, add-ons, and timing before a cleaner accepts — so the quote matches the job, not a best guess.",
              },
              {
                t: "Local, routed, not stretched",
                d: "Based in Fresno, we run tight routes across Clovis and Madera instead of chasing every nearby city. Scheduling stays honest, quality stays consistent.",
              },
              {
                t: "Clear on what we don't do",
                d: "Laundry, dishes, organizing, packing, and personal tasks are outside our scope — stated up front so expectations align before anyone is paid.",
              },
              {
                t: "Make-it-right review",
                d: "If something in the agreed scope is missed, contact us quickly and we will review the best fix.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <h3 className="text-base font-bold text-ink">{item.t}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section id="areas" className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Service areas</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Where we clean.</h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              We keep the public service area honest. Fresno and Clovis have the strongest route
              density; Madera is scheduled around route availability.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="rounded-xl border border-line bg-white px-4 py-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/25"
              >
                <span className="block text-base font-bold text-primary">{area.name}</span>
                <span className="mt-0.5 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">
                  CA
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA — navy band */}
      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:py-16 lg:text-left">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">Ready for a cleaner, clearer quote?</h2>
            <p className="mt-2 max-w-xl text-base leading-7 text-white/70">
              Clear pricing and route availability before anything is booked. Serving Fresno,
              Clovis, Madera, and nearby Fresno neighborhoods.
            </p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <Link href="/book-now" className="btn btn-accent">Get pricing</Link>
            <a href="tel:+15597852822" className="btn btn-ghost-dark">Call</a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <span className="flex justify-center gap-1 text-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
              </svg>
            ))}
          </span>
          <h2 className="mt-5 text-3xl text-ink sm:text-4xl">
            Don&apos;t book off a pretty page. Check our reviews.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Compare what is included, ask how heavy-duty work is priced, then read recent reviews
            on Google before you decide.
          </p>
          <div className="mt-8">
            <a
              href="https://www.google.com/maps?cid=12575787905603463321"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open Google reviews
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-cream-2">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">FAQ</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">Worth answering before the quote.</h2>
          </div>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-2xl leading-7 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — navy band */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl text-white sm:text-4xl">
            Start with the basics. We&apos;ll help price the right clean.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/75">
            Clear scope, no vague &ldquo;everything&rdquo; promise, no pressure to book before the
            details make sense.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/book-now" className="btn btn-accent">Get pricing</Link>
            <a href="tel:+15597852822" className="btn btn-ghost-dark">(559) 785-2822</a>
          </div>
        </div>
      </section>
    </>
  );
}

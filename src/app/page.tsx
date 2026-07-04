import Link from "next/link";

const services = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    lead: "A real reset — baseboards, reachable vents, fans, trim, fixtures, floor edges, and buildup. For first-time cleans, seasonal resets, or homes past maintenance condition.",
  },
  {
    title: "Move-In / Move-Out",
    href: "/services/move-out-cleaning",
    lead: "Empty-home turnover cleaned against the details landlords, buyers, and sellers actually inspect — appliances, cabinets, blinds, and closets. Priced before booking, not guessed.",
  },
  {
    title: "Standard Recurring",
    href: "/services/standard-cleaning",
    lead: "Maintenance for homes already in normal condition — weekly, bi-weekly, or monthly. Same trusted cleaner whenever scheduling allows.",
  },
];

const steps = [
  {
    title: "Send the basics",
    text: "City, service type, timing, and home size. The form stays short on purpose — we only ask what we need to price it correctly.",
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

export default function Home() {
  return (
    <>
      {/* Hero — typographic, one clear path */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                </svg>
              ))}
            </span>
            <span className="text-sm font-semibold text-ink-soft">
              Fresno &amp; Clovis house cleaning
            </span>
          </div>

          <h1 className="mt-6 text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-[3.75rem]">
            Clear scope and honest pricing before a cleaner ever steps in your home.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            New Star is a locally owned cleaning company serving Fresno, Clovis, and Madera.
            No vague &ldquo;everything&rdquo; quotes, no surprises after arrival — just a clear scope,
            an honest price, and a cleaner who knows the job before they start.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/book-now" className="btn btn-accent">
              Get pricing
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a href="tel:+15597852822" className="text-base font-bold text-primary underline-offset-4 hover:underline">
              or call (559) 785-2822
            </a>
          </div>

          <p className="mt-5 text-sm leading-6 text-mute">
            Get pricing without a long form. Request clear pricing before anything is booked.
          </p>
        </div>
      </section>

      {/* Services — editorial, no images */}
      <section id="services" className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Services</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Match the clean to the condition of the home.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              The goal is not to sell every visitor the same package. It is to price the right
              scope so the cleaner walks in prepared and you know exactly what is included.
            </p>
          </div>

          <div className="mt-12 divide-y divide-line border-y border-line">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={service.href}
                className="group grid gap-2 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl text-ink transition-colors group-hover:text-primary sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-7 text-ink-soft">
                    {service.lead}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 self-center text-sm font-bold text-primary">
                  Details
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
      <section id="how-it-works" className="border-y border-line bg-cream-2">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">How it works</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Quote first. Cleaning only after the scope makes sense.
            </h2>
          </div>
          <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => (
              <li key={step.title}>
                <div className="text-sm font-bold text-accent">Step {i + 1}</div>
                <h3 className="mt-2 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <Link href="/book-now" className="btn btn-accent">Start the quote</Link>
          </div>
        </div>
      </section>

      {/* Why New Star — specifics, not icon cards */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-4xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <span className="eyebrow eyebrow-dot">Why New Star</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              The boring things that actually make a clean reliable.
            </h2>
          </div>
          <div className="space-y-7 text-base leading-7 text-ink-soft">
            <p>
              <span className="font-bold text-ink">Scope before booking.</span> We confirm
              service type, home condition, add-ons, and timing before a cleaner accepts — so the
              quote matches the job, not a best guess.
            </p>
            <p>
              <span className="font-bold text-ink">Local, routed, not stretched.</span> Based in
              Fresno, we run tight routes across Clovis and Madera instead of chasing every
              nearby city. That keeps scheduling honest and quality consistent.
            </p>
            <p>
              <span className="font-bold text-ink">Clear on what we don&apos;t do.</span> Laundry,
              dishes, organizing, packing, and personal tasks are outside our scope — stated up
              front so expectations align before anyone is paid.
            </p>
            <p>
              <span className="font-bold text-ink">Make-it-right review.</span> If something in
              the agreed scope is missed, contact us quickly and we will review the best fix.
            </p>
          </div>
        </div>
      </section>

      {/* Service areas — text links, not pills */}
      <section id="areas" className="border-t border-line bg-cream-2">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Service areas</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Where we clean.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-soft">
              We keep the public service area honest. Fresno and Clovis have the strongest route
              density; Madera is scheduled around route availability.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="text-base font-semibold text-primary underline-offset-4 hover:text-accent hover:underline"
              >
                {area.name}, CA
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — calm */}
      <section id="reviews" className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
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
              className="btn btn-outline"
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
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Worth answering before the quote.
            </h2>
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

      {/* Final CTA — calm */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl text-ink sm:text-4xl">
            Start with the basics. We&apos;ll help price the right clean.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-ink-soft">
            Clear scope, no vague &ldquo;everything&rdquo; promise, no pressure to book before the
            details make sense.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/book-now" className="btn btn-accent">Get pricing</Link>
            <a href="tel:+15597852822" className="text-base font-bold text-primary underline-offset-4 hover:underline">
              (559) 785-2822
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

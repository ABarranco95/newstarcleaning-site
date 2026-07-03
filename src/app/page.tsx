import Link from "next/link";

const serviceCards = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    desc: "A detailed reset for kitchens, bathrooms, baseboards, reachable fixtures, trim, vents, floor edges, and buildup areas.",
    fit: "Best for first-time cleans, seasonal resets, and homes past maintenance-cleaning condition.",
  },
  {
    title: "Move-In / Move-Out",
    href: "/services/move-out-cleaning",
    desc: "Empty-home turnover cleaning with scope defined before booking so appliances, cabinets, windows, blinds, and heavy buildup are not vague.",
    fit: "Best for rentals, move deadlines, listings, and homes where the handoff needs to be clean.",
  },
  {
    title: "Standard Recurring",
    href: "/services/standard-cleaning",
    desc: "Maintenance cleaning for homes already in normal condition, with weekly, biweekly, and monthly options.",
    fit: "Best after the home is already reset and the ongoing scope is clear.",
  },
];

const processSteps = [
  {
    title: "Send the basics",
    text: "City, service type, timing, home size, and the best phone number. The quote path stays short on purpose.",
  },
  {
    title: "We confirm scope",
    text: "If the home needs add-ons or heavy-duty work, we ask before pricing instead of surprising you later.",
  },
  {
    title: "You decide",
    text: "You book only when the scope, price, and schedule make sense. No payment or commitment from the quote form.",
  },
];

const serviceAreas = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
  { name: "Tower District", slug: "tower-district" },
  { name: "Fig Garden", slug: "fig-garden" },
  { name: "Woodward Park", slug: "woodward-park" },
];

const faqItems = [
  {
    q: "What kind of cleaning should I request?",
    a: "Use Standard Recurring for maintained homes, Deep Cleaning for a reset, and Move-In / Move-Out when the home is empty or being turned over. If you are not sure, send the basics and we will help classify it before quoting.",
  },
  {
    q: "Are oven, refrigerator, cabinets, windows, and blinds included?",
    a: "They can be included when they are part of the quote. We separate detail add-ons clearly so the price matches the work and the cleaner has enough time.",
  },
  {
    q: "Can I call instead of filling out the form?",
    a: "Yes. Call or text New Star directly if the timing is tight or you would rather talk through the home first.",
  },
  {
    q: "Do you handle laundry, dishes, organizing, or packing?",
    a: "No. New Star provides cleaning service, not household task service. Laundry, dishes, bed making, organizing, packing, unpacking, and personal item handling are outside the cleaning scope.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 ns-mesh opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="eyebrow eyebrow-dot text-accent-light">
              Fresno · Clovis · Madera house cleaning
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[5.35rem]">
              Premium house cleaning with the scope clear before you book.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Request clear pricing before anything is booked. New Star helps Fresno-area homeowners choose the right clean, confirm the real scope, and avoid rushed or vague cleaning quotes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-now"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                Request clear pricing
              </Link>
              <a
                href="tel:+15597852822"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 py-4 text-base font-bold text-white transition hover:bg-white/14"
              >
                Call or text (559) 785-2822
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2 text-sm font-semibold text-white/82">
              {["Clear quote path", "Premium scope standards", "Fresno-area routes", "Quote first, then you decide"].map((item) => (
                <span key={item} className="rounded-full border border-white/14 bg-white/8 px-4 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="self-end rounded-[2rem] border border-white/12 bg-white p-6 text-ink shadow-[0_24px_80px_-28px_rgba(0,0,0,0.55)] sm:p-7">
            <div className="eyebrow eyebrow-dot">Quote path</div>
            <h2 className="mt-4 text-3xl leading-tight text-primary">
              Get pricing without a long form
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink-soft">
              The quote page asks for the basics only. We follow up by text or call to confirm scope, add-ons, timing, and price before anything is booked.
            </p>
            <div className="mt-6 grid gap-3">
              {processSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-line bg-cream px-4 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-sm font-bold tracking-normal text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/book-now"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-light"
            >
              Start the quote
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow eyebrow-dot">Services</div>
            <h2 className="mt-4 text-4xl leading-tight text-primary lg:text-5xl">
              Pick the clean that matches the condition of the home.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              The goal is not to sell every visitor the same service. It is to price the right scope so the cleaner walks in prepared and the customer knows what is included.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-[1.75rem] border border-line bg-cream p-6 transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white"
              >
                <h3 className="text-2xl text-primary">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-soft">{service.desc}</p>
                <p className="mt-5 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-semibold leading-6 text-ink">
                  {service.fit}
                </p>
                <span className="mt-6 inline-flex text-sm font-bold text-accent group-hover:text-accent-hover">
                  View service details →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-cream py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <div className="eyebrow eyebrow-dot">How it works</div>
            <h2 className="mt-4 text-4xl leading-tight text-primary lg:text-5xl">
              Quote first. Cleaning only after the scope makes sense.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              Most cleaning problems start with vague pricing. New Star keeps the first step short, then confirms the details that actually affect time and price.
            </p>
          </div>
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="grid gap-4 rounded-[1.5rem] border border-line bg-white p-6 sm:grid-cols-[auto_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-ink-soft">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
          <div>
            <div className="eyebrow eyebrow-dot text-accent-light">Ready when the scope is clear</div>
            <h2 className="mt-4 text-4xl leading-tight lg:text-5xl">
              Need pricing or route availability?
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/76">
              Send the basics or call New Star directly. We serve Fresno, Clovis, Madera, Tower District, Fig Garden, and Woodward Park.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/book-now" className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-8 py-4 font-bold text-white transition hover:bg-accent-hover">
              Request pricing
            </Link>
            <a href="tel:+15597852822" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-4 font-bold text-white transition hover:bg-white/14">
              Call or text
            </a>
          </div>
        </div>
      </section>

      <section id="areas" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow eyebrow-dot">Service areas</div>
            <h2 className="mt-4 text-4xl leading-tight text-primary lg:text-5xl">
              Focused routes across Fresno, Clovis, Madera, and close-in Fresno neighborhoods.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="rounded-2xl border border-line bg-cream px-4 py-5 text-center font-bold text-primary transition hover:border-primary/25 hover:bg-white"
              >
                {area.name}
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.2em] text-mute">CA</span>
              </Link>
            ))}
          </div>
          <Link href="/service-areas" className="mt-8 inline-flex rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-primary transition hover:border-primary">
            View all service areas
          </Link>
        </div>
      </section>

      <section id="reviews" className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="eyebrow eyebrow-dot justify-center">Reputation check</div>
          <h2 className="mt-4 text-4xl leading-tight text-primary lg:text-5xl">
            Compare our scope, then check our Google reviews.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Do not book a cleaner from a pretty page alone. Compare what is included, ask how heavy-duty work is priced, and read recent customer reviews before deciding.
          </p>
          <Link
            href="https://g.page/r/CZnoJYR4LIauEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-light"
          >
            Open Google reviews
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="eyebrow eyebrow-dot justify-center">Frequently asked questions</div>
            <h2 className="mt-4 text-4xl leading-tight text-primary lg:text-5xl">
              Cleaning questions worth answering before the quote.
            </h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-[1.5rem] border border-line bg-cream p-6">
                <h3 className="font-sans text-lg font-bold tracking-normal text-ink">{item.q}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-center text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl leading-tight lg:text-5xl">
            Start with the basics. We will help price the right clean.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/76">
            Clear scope, no vague “everything” promise, and no pressure to book before the details make sense.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book-now" className="inline-flex min-h-14 items-center justify-center rounded-full bg-accent px-8 py-4 font-bold text-white transition hover:bg-accent-hover">
              Request pricing
            </Link>
            <a href="tel:+15597852822" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-4 font-bold text-white transition hover:bg-white/14">
              Call (559) 785-2822
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

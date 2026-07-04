import Image from "next/image";
import Link from "next/link";
import { siteImages, uxPhotoUrl } from "@/lib/siteImages";

const serviceCards = [
  {
    title: "Deep Cleaning",
    href: "/services/deep-cleaning",
    desc: "A detailed reset for kitchens, bathrooms, baseboards, reachable fixtures, trim, vents, floor edges, and buildup areas.",
    fit: "Best for first-time cleans, seasonal resets, and homes past maintenance-cleaning condition.",
    photo: siteImages.serviceHero["deep-cleaning"],
  },
  {
    title: "Move-In / Move-Out",
    href: "/services/move-out-cleaning",
    desc: "Empty-home turnover cleaning with scope defined before booking so appliances, cabinets, windows, blinds, and heavy buildup are not vague.",
    fit: "Best for rentals, move deadlines, listings, and homes where the handoff needs to be clean.",
    photo: siteImages.serviceHero["move-out-cleaning"],
  },
  {
    title: "Standard Recurring",
    href: "/services/standard-cleaning",
    desc: "Maintenance cleaning for homes already in normal condition, with weekly, biweekly, and monthly options.",
    fit: "Best after the home is already reset and the ongoing scope is clear.",
    photo: siteImages.serviceHero["standard-cleaning"],
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

const trustBadges = [
  {
    title: "Clear scope first",
    text: "We confirm what is included, what is an add-on, and what is outside the job — before booking.",
    icon: "scope",
  },
  {
    title: "Local Fresno routes",
    text: "Based in Fresno and routed across Clovis, Madera, and close-in neighborhoods.",
    icon: "pin",
  },
  {
    title: "Quote before booking",
    text: "Clear pricing and availability up front. No payment or commitment to get a quote.",
    icon: "tag",
  },
  {
    title: "Consistent cleaners",
    text: "Recurring clients get the same trusted cleaner whenever scheduling allows.",
    icon: "sparkle",
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

function TrustIcon({ name }: { name: string }) {
  const common = "h-6 w-6";
  if (name === "scope")
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  if (name === "pin")
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  if (name === "tag")
    return (
      <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-5.586 5.586a2 2 0 01-2.828 0l-7-7A2 2 0 015 11V5a2 2 0 012-2z" />
      </svg>
    );
  return (
    <svg className={common} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream-2">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                  </svg>
                ))}
              </span>
              <span className="text-sm font-bold text-ink-soft">
                Fresno &amp; Clovis house cleaning
              </span>
            </div>

            <h1 className="mt-5 text-4xl text-ink sm:text-5xl lg:text-[3.9rem]">
              A spotless home with the scope clear before you book.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
              New Star is a locally owned cleaning company serving Fresno, Clovis,
              and Madera. Get clear pricing and availability first — then decide.
              No vague quotes, no surprises after the cleaner arrives.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-now" className="btn btn-accent">
                Request clear pricing
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a href="tel:+15597852822" className="btn btn-outline">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (559) 785-2822
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink-soft">
              Get pricing without a long form. Request clear pricing before anything is booked.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {["Clear quote path", "Premium scope standards", "Fresno-area routes", "Quote first, then you decide"].map((item) => (
                <span key={item} className="chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero image with floating quote card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-elev">
              <Image
                src={uxPhotoUrl(siteImages.heroes.cleanKitchen, 1100)}
                alt={siteImages.heroes.cleanKitchen.alt}
                width={1100}
                height={1320}
                sizes="(min-width: 1024px) 540px, 100vw"
                className="h-[24rem] w-full object-cover sm:h-[28rem] lg:h-[34rem]"
                priority
              />
            </div>
            <div className="absolute -bottom-5 -left-3 w-[15rem] rounded-2xl border border-line bg-white p-4 shadow-elev sm:-left-5 lg:w-[16.5rem]">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-extrabold text-ink">Fast local quotes</div>
                  <div className="text-xs text-mute">Clear pricing before booking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-cream py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="rounded-2xl border border-line bg-white p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary">
                  <TrustIcon name={badge.icon} />
                </span>
                <h3 className="mt-3 text-base font-bold text-ink">{badge.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-soft">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="ns-section bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Services</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
              Pick the clean that matches the condition of the home.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              The goal is not to sell every visitor the same service. It is to price
              the right scope so the cleaner walks in prepared and you know what is included.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {serviceCards.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-soft transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-elev"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={uxPhotoUrl(service.photo, 700)}
                    alt={service.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{service.desc}</p>
                  <p className="mt-4 rounded-xl border border-line bg-cream-2 px-4 py-3 text-sm font-semibold leading-6 text-ink">
                    {service.fit}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:text-accent-hover">
                    View service details
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="ns-section bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <span className="eyebrow eyebrow-dot">How it works</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
              Quote first. Cleaning only after the scope makes sense.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              Most cleaning problems start with vague pricing. New Star keeps the first
              step short, then confirms the details that actually affect time and price.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-now" className="btn btn-accent">Start the quote</Link>
              <Link href="/checklist" className="btn btn-outline">See what is included</Link>
            </div>
          </div>
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="grid gap-4 rounded-[1.25rem] border border-line bg-white p-6 shadow-soft sm:grid-cols-[auto_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-ink-soft">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results gallery */}
      <section id="results" className="ns-section bg-cream-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">The result</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
              The standard we clean to.
            </h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              A preview of the finish you can expect across kitchens, bathrooms, living
              areas, and floors. Stock photos shown — swap in your own before/afters anytime.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {siteImages.resultsGallery.map((photo) => (
              <div key={photo.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-white">
                <Image
                  src={uxPhotoUrl(photo, 600)}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section id="areas" className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow eyebrow-dot">Service areas</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
              Focused routes across Fresno, Clovis, and Madera.
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/cleaning-services-${area.slug}`}
                className="rounded-2xl border border-line bg-white px-4 py-5 text-center font-bold text-primary transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-soft"
              >
                {area.name}
                <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">CA</span>
              </Link>
            ))}
          </div>
          <Link href="/service-areas" className="mt-7 inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-accent">
            View all service areas
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-primary py-14 text-white lg:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <span className="flex justify-center gap-1 text-accent-light" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
              </svg>
            ))}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
            Compare our scope, then check our Google reviews.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
            Do not book a cleaner from a pretty page alone. Compare what is included, ask
            how heavy-duty work is priced, and read recent reviews before deciding.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://www.google.com/maps?cid=12575787905603463321"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Open Google reviews
            </a>
            <Link href="/book-now" className="btn btn-ghost-dark">
              Request pricing
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ns-section bg-cream">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="eyebrow eyebrow-dot">Frequently asked</span>
            <h2 className="mt-4 text-3xl text-ink sm:text-4xl">
              Cleaning questions worth answering before the quote.
            </h2>
          </div>
          <div className="mt-9 grid gap-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-line bg-white p-5 shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <svg className="h-5 w-5 flex-shrink-0 text-ink-soft transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 leading-7 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream-2 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white shadow-elev sm:px-12 lg:py-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl">
              Start with the basics. We will help price the right clean.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Clear scope, no vague “everything” promise, and no pressure to book before
              the details make sense.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book-now" className="btn btn-accent">Request pricing</Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">Call (559) 785-2822</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "About New Star Cleaning — Fresno's Trusted House Cleaning Company",
  description:
    "New Star Cleaning is a locally owned house cleaning company serving Fresno, Clovis, Madera and nearby Fresno neighborhoods. Clear scope, local routes, and pricing before booking.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About New Star Cleaning — Fresno's Trusted House Cleaning Company | New Star Cleaning",
    description:
      "Locally owned house cleaning for Fresno, Clovis, Madera and nearby Fresno neighborhoods with clear scope before booking.",
    url: "https://newstarcleaning.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream-2">
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
          <nav className="mb-6 text-sm text-mute" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-ink">About</span>
          </nav>
          <span className="eyebrow eyebrow-dot">About New Star</span>
          <h1 className="mt-4 max-w-3xl text-4xl text-ink lg:text-[3.2rem]">
            A cleaner home starts with trust.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
            New Star Cleaning is a locally owned house cleaning company serving Fresno, Clovis,
            Madera, and nearby Fresno neighborhoods. We built this business around one idea: home
            is sacred — and the people who clean it should be careful, consistent, and someone you
            actually want in your space.
          </p>
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 leading-relaxed text-ink-soft">
            <div>
              <span className="eyebrow eyebrow-dot">Our story</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Built locally, run carefully</h2>
              <p className="mt-5">
                We started New Star Cleaning to fix the things that frustrate homeowners about
                hiring help: no-shows, generic cleaning that misses the details, and quotes that
                do not match the actual condition of the home. We keep the roster tighter, scope
                jobs carefully, and make the expected result clear before booking.
              </p>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Our promise</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">What you can expect</h2>
              <ul className="mt-5 space-y-3">
                <li><strong className="text-ink">Vetted cleaner roster.</strong> New Star works with cleaners who are reviewed before being offered available work.</li>
                <li><strong className="text-ink">Scope before booking.</strong> We confirm service type, condition, add-ons, and timing before a cleaner accepts the job.</li>
                <li><strong className="text-ink">Consistent results.</strong> Recurring clients get the same trusted cleaner whenever possible.</li>
                <li><strong className="text-ink">Clear expectations.</strong> The agreed cleaning scope is documented so the cleaner and customer are aligned.</li>
                <li><strong className="text-ink">Make-it-right review.</strong> If something included in the agreed scope is missed, contact us quickly so we can review the best fix.</li>
              </ul>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Service area</span>
              <h2 className="mt-4 text-3xl text-ink lg:text-4xl">Where we clean</h2>
              <p className="mt-5">
                We serve homeowners in Fresno, Clovis, Madera, and close-in Fresno neighborhoods
                including Tower District, Fig Garden, and Woodward Park. We keep the public
                service area honest so customers outside our route are not misled.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/cleaning-services-fresno" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary">Fresno</Link>
                <Link href="/cleaning-services-clovis" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary">Clovis</Link>
                <Link href="/cleaning-services-madera" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary">Madera</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-2 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] bg-primary px-6 py-12 text-center text-white shadow-elev sm:px-12 lg:py-16">
            <h2 className="text-3xl text-white lg:text-4xl">
              Ready to get a quote from cleaners you can trust?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/75">
              Request clear pricing online. Same-week availability is strongest in Fresno and
              Clovis; Madera is scheduled around route availability.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/book-now" className="btn btn-accent">Request pricing &amp; availability</Link>
              <a href="tel:+15597852822" className="btn btn-ghost-dark">Call (559) 785-2822</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

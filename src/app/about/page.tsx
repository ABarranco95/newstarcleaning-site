import type { Metadata } from "next";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title: "About Our Fresno Cleaning Company",
  description:
    "New Star Cleaning is a locally owned residential cleaning company serving Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About New Star Cleaning | Fresno House Cleaning",
    description:
      "Locally owned residential cleaning for Fresno, Clovis, Madera, and the listed Fresno neighborhoods.",
    url: "https://newstarcleaning.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-14 sm:px-6 lg:px-8 lg:pt-14 lg:pb-20">
          <nav className="mb-6 text-sm text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="px-1.5">/</span>
            <span className="font-semibold text-white">About</span>
          </nav>
          <span className="eyebrow eyebrow-dot text-accent-light">About New Star</span>
          <h1 className="mt-4 max-w-3xl text-4xl text-white lg:text-[3.2rem]">
            A cleaner home starts with trust.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            New Star Cleaning is a locally owned house cleaning company serving Fresno, Clovis,
            Madera, and nearby Fresno neighborhoods. We built this business around one idea: home
            is sacred — and the people who clean it should be careful, consistent, and someone you
            actually want in your space.
          </p>
          <div className="mt-8">
            <TrustBadges onDark />
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
                <li><strong className="text-ink">Documented priorities.</strong> Requested rooms, add-ons, access notes, and customer priorities are recorded before the appointment.</li>
                <li><strong className="text-ink">Clear quote before booking.</strong> We confirm service type, condition, add-ons, and timing before the appointment is accepted.</li>
                <li><strong className="text-ink">Cleaner continuity when available.</strong> Recurring clients may be matched with the same cleaner when schedules align, but it is not guaranteed.</li>
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
              Request a quote online and we will confirm current appointment options for your address and service.
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

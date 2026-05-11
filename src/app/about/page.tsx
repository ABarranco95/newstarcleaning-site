import type { Metadata } from "next";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";

export const metadata: Metadata = {
  title:
    "About New Star Cleaning — Fresno's Trusted House Cleaning Company",
  description:
    "New Star Cleaning is a locally owned, background-checked cleaning service serving Fresno, Clovis, Madera and the Central Valley. Meet our team.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About New Star Cleaning — Fresno's Trusted House Cleaning Company | New Star Cleaning",
    description:
      "Locally owned, background-checked cleaning service for Fresno, Clovis, Madera and the Central Valley.",
    url: "https://newstarcleaning.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="absolute inset-0 ns-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-white">
          <span className="eyebrow eyebrow-dot text-accent-light">About New Star</span>
          <h1 className="mt-5 text-4xl lg:text-[3.25rem] leading-[1.05] max-w-3xl">
            A Cleaner Home Starts With
            <span className="italic text-accent-light"> Trust</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75">
            New Star Cleaning is a locally owned house cleaning company serving
            Fresno, Clovis, Madera, and the surrounding Central Valley. We
            built this business around one idea: home is sacred — and the
            people who clean it should be careful, consistent, and someone you
            actually want in your space.
          </p>
          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="ns-section bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-ink-soft leading-relaxed">
            <div>
              <span className="eyebrow eyebrow-dot">Our story</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Built locally, run carefully
              </h2>
              <p className="mt-5">
                We started New Star Cleaning to fix the things that frustrate
                homeowners about hiring help: no-shows, generic cleaning that
                misses the details, and cleaners who don&apos;t feel
                accountable. We hire fewer, better cleaners, train them in our
                checklist, and back every job with a satisfaction guarantee.
              </p>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Our promise</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                What you can expect
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <strong>Background-checked cleaners.</strong> Every team
                  member is vetted before they ever step into your home.
                </li>
                <li>
                  <strong>Fully insured.</strong> Your home and our cleaners
                  are protected on every visit.
                </li>
                <li>
                  <strong>Consistent results.</strong> Recurring clients get
                  the same trusted cleaner whenever possible.
                </li>
                <li>
                  <strong>Real checklist.</strong> We follow a thorough,
                  room-by-room standard so nothing slips through.
                </li>
                <li>
                  <strong>Satisfaction guarantee.</strong> If something
                  isn&apos;t right, we make it right — fast.
                </li>
              </ul>
            </div>

            <div>
              <span className="eyebrow eyebrow-dot">Service area</span>
              <h2 className="mt-4 text-3xl lg:text-4xl text-ink">
                Where we clean
              </h2>
              <p className="mt-5">
                We serve homeowners across the Central Valley, with primary
                coverage in Fresno, Clovis, and Madera, plus regular service
                in Sanger, Selma, Kingsburg, Reedley, Visalia, Tulare,
                Hanford, Lemoore, and Fresno neighborhoods including Tower
                District, Fig Garden, and Woodward Park.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/cleaning-services-fresno"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Fresno
                </Link>
                <Link
                  href="/cleaning-services-clovis"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Clovis
                </Link>
                <Link
                  href="/cleaning-services-madera"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Madera
                </Link>
                <Link
                  href="/cleaning-services-visalia"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft shadow-soft hover:border-primary hover:text-primary"
                >
                  Visalia
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 ns-mesh" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center text-white">
          <h2 className="text-3xl lg:text-4xl">
            Ready to book a cleaner you can
            <span className="italic text-accent-light"> trust</span>?
          </h2>
          <p className="mt-5 mx-auto max-w-2xl text-white/75">
            Request a fast quote online. Same-week availability across the
            Central Valley.
          </p>
          <div className="mt-8">
            <Link
              href="/book-now"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgba(239,106,55,0.6)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
            >
              Book your cleaning
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

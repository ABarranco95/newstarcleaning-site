import Image from "next/image";
import Link from "next/link";

const serviceAreas = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
  { name: "Sanger", slug: "sanger" },
  { name: "Selma", slug: "selma" },
  { name: "Kingsburg", slug: "kingsburg" },
  { name: "Reedley", slug: "reedley" },
  { name: "Visalia", slug: "visalia" },
  { name: "Tulare", slug: "tulare" },
  { name: "Hanford", slug: "hanford" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white pb-20 lg:pb-0">
      <div className="absolute inset-0 ns-mesh opacity-90" aria-hidden="true" />
      <div className="absolute inset-0 ns-grid-bg opacity-30" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/star-warm-white.png"
                alt=""
                width={52}
                height={50}
                sizes="52px"
                className="h-12 w-auto shrink-0 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
              />
              <div className="flex flex-col leading-none">
                <span className="font-sans text-2xl font-black tracking-[-0.07em] text-white">
                  New Star Cleaning
                </span>
                <span className="mt-1.5 text-[0.58rem] font-black uppercase tracking-[0.28em] text-accent-light">
                  Residential cleaning
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              Professional, vetted house cleaning across Fresno and the Central
              Valley. Clear pricing before booking. Insured New Star Cleaning LLC.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
              >
                Request quote
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="tel:+15597852822"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                (559) 785-2822
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>
                <Link href="/#services" className="transition-colors hover:text-accent-light">
                  Recurring cleaning
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-accent-light">
                  Deep cleaning
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-accent-light">
                  Move-in / move-out
                </Link>
              </li>
              <li>
                <Link href="/book-now" className="transition-colors hover:text-accent-light">
                  Request quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Service areas */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Service areas
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/75">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/cleaning-services-${area.slug}`}
                    className="transition-colors hover:text-accent-light"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>
                <Link
                  href="https://g.page/r/CZnoJYR4LIauEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent-light"
                >
                  Leave a Google review
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-accent-light">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-accent-light">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-sm text-white/45 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NEW STAR CLEANING LLC · All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>132 W Nees Ave Unit 106, Fresno, CA 93720</span>
            <span className="hidden h-3 w-px bg-white/20 md:block" />
            <span>Mon-Sat 8am-6pm</span>
            <span className="hidden h-3 w-px bg-white/20 md:block" />
            <span>Insured New Star Cleaning LLC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

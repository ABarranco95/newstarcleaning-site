"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const serviceAreas = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
  { name: "Tower District", slug: "tower-district" },
  { name: "Fig Garden", slug: "fig-garden" },
  { name: "Woodward Park", slug: "woodward-park" },
];

function StarRow() {
  return (
    <span className="flex items-center gap-0.5 text-accent-light" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/google-ads")) {
    return null;
  }

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-light">
              Need pricing or route availability?
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
              Ready for a spotless home?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
              Get clear pricing and route availability before anything is booked.
              Serving Fresno, Clovis, Madera, and nearby Fresno neighborhoods.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
            <Link href="/book-now" className="btn btn-accent">
              Request pricing
            </Link>
            <a href="tel:+15597852822" className="btn btn-ghost-dark">
              (559) 785-2822
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/star-warm-white.png"
                alt=""
                width={44}
                height={42}
                className="h-auto w-9"
              />
              <span className="text-lg font-extrabold">New Star Cleaning</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Locally owned house cleaning for Fresno, Clovis, Madera, and nearby
              Fresno neighborhoods. Clear scope and pricing before booking.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <StarRow />
              <a
                href="https://www.google.com/maps?cid=12575787905603463321"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                See our Google reviews
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/services" className="text-white/75 transition-colors hover:text-white">All cleaning services</Link></li>
              <li><Link href="/services/standard-cleaning" className="text-white/75 transition-colors hover:text-white">Standard recurring</Link></li>
              <li><Link href="/services/deep-cleaning" className="text-white/75 transition-colors hover:text-white">Deep cleaning</Link></li>
              <li><Link href="/services/move-out-cleaning" className="text-white/75 transition-colors hover:text-white">Move-in / move-out</Link></li>
              <li><Link href="/checklist" className="text-white/75 transition-colors hover:text-white">Service checklist</Link></li>
            </ul>
          </div>

          {/* Service areas */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Service areas
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/service-areas" className="text-white/75 transition-colors hover:text-white">All service areas</Link></li>
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <Link href={`/cleaning-services-${area.slug}`} className="text-white/75 transition-colors hover:text-white">
                    {area.name}, CA
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="text-white/75 transition-colors hover:text-white">About</Link></li>
              <li><Link href="/book-now" className="text-white/75 transition-colors hover:text-white">Request pricing</Link></li>
              <li><Link href="/contact" className="text-white/75 transition-colors hover:text-white">Contact</Link></li>
              <li><Link href="/blog" className="text-white/75 transition-colors hover:text-white">Cleaning tips</Link></li>
              <li>
                <a href="https://g.page/r/CZnoJYR4LIauEBM/review" target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-white">
                  Leave a review
                </a>
              </li>
              <li><Link href="/privacy" className="text-white/75 transition-colors hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-white/75 transition-colors hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} New Star Cleaning LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>Fresno, CA</span>
            <span aria-hidden="true">•</span>
            <a href="tel:+15597852822" className="font-semibold text-white/70 hover:text-white">
              (559) 785-2822
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

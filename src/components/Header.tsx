"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function StarRow() {
  return (
    <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/google-ads")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-line bg-white/90 shadow-[0_6px_24px_-18px_rgba(15,27,45,0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="New Star Cleaning home"
          >
            <Image
              src="/brand/star-ink-mono.png"
              alt=""
              width={52}
              height={50}
              sizes="52px"
              className="h-auto w-10 shrink-0 lg:w-11"
              priority
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="text-[1.05rem] font-extrabold tracking-tight text-primary sm:text-lg lg:text-xl">
                New Star Cleaning
              </span>
              <span className="mt-1 hidden text-[0.55rem] font-bold uppercase tracking-[0.22em] text-accent sm:block lg:text-[0.6rem]">
                Fresno · Clovis · Madera
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link href="/services" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
              Services
            </Link>
            <Link href="/#how-it-works" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
              How it works
            </Link>
            <Link href="/service-areas" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
              Service areas
            </Link>
            <Link href="/#reviews" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
              Reviews
            </Link>
            <Link href="/checklist" className="text-sm font-semibold text-ink-soft transition-colors hover:text-primary">
              Checklist
            </Link>
            <a
              href="tel:+15597852822"
              className="flex flex-col items-end leading-none"
            >
              <span className="text-sm font-extrabold text-primary">(559) 785-2822</span>
              <span className="mt-0.5 flex items-center gap-1.5">
                <StarRow />
                <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-mute">Google reviews</span>
              </span>
            </a>
            <Link href="/book-now" className="btn btn-accent">
              Request quote
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/book-now" className="btn btn-accent hidden !min-h-10 !px-4 !text-xs sm:inline-flex">
              Quote
            </Link>
            <a
              href="tel:+15597852822"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white"
              aria-label="Call (559) 785-2822"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="border-t border-line pb-5 lg:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              {[
                { href: "/services", label: "Services" },
                { href: "/#how-it-works", label: "How it works" },
                { href: "/service-areas", label: "Service areas" },
                { href: "/#reviews", label: "Reviews" },
                { href: "/checklist", label: "Checklist" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-ink-soft hover:bg-cream-2 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+15597852822"
                className="mt-2 flex items-center justify-between rounded-xl bg-cream-2 px-4 py-3 text-base font-extrabold text-primary"
              >
                <span>Call (559) 785-2822</span>
                <StarRow />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

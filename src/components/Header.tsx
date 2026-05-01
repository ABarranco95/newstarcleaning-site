"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(14,22,38,0.04)]"
          : "bg-cream/0 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
              <svg
                className="h-5 w-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-cream" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl text-ink">New Star</span>
              <span className="text-xs uppercase tracking-[0.2em] text-mute">
                Cleaning
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/#services"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              Services
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              How it works
            </Link>
            <Link
              href="/#reviews"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              Reviews
            </Link>
            <Link
              href="/#areas"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-primary"
            >
              Service areas
            </Link>
            <a
              href="tel:+15597852822"
              className="text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              (559) 785-2822
            </a>
            <Link
              href="/#quote"
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-soft transition-colors hover:border-primary"
            >
              Get quote
            </Link>
            <Link
              href="/book-now"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary-light"
            >
              Book now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/book-now"
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-soft"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden pb-5 pt-2 border-t border-line">
            <nav className="flex flex-col gap-1 pt-3">
              {[
                { href: "/#services", label: "Services" },
                { href: "/#how-it-works", label: "How it works" },
                { href: "/#reviews", label: "Reviews" },
                { href: "/#areas", label: "Service areas" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-ink-soft hover:bg-cream-2 hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+15597852822"
                className="mt-2 rounded-lg px-4 py-3 text-base font-semibold text-primary"
              >
                Call (559) 785-2822
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

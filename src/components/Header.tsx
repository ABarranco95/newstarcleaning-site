"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import BookingPortalLink from "@/components/BookingPortalLink";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";

const directBookingUrl = resolveDirectBookingUrl();

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isCommercial = pathname === "/commercial-quote" || pathname === "/services/commercial-cleaning" || pathname === "/services/post-construction-cleaning";
  const quoteHref = isCommercial
    ? pathname === "/commercial-quote" ? "/commercial-quote#quote-form" : `/commercial-quote?service=${encodeURIComponent(pathname.includes("post-construction") ? "Post-construction cleaning" : "Office / commercial cleaning")}`
    : "/book-now";

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

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
      className={`bg-primary sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "border-b border-white/15 shadow-[0_10px_28px_-18px_rgba(7,24,47,0.8)]"
          : "border-b border-white/10"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-0 items-center"
            aria-label="New Star Cleaning home"
          >
            <Image
              src="/brand/nsc-lockup-horizontal-reverse.svg"
              alt="New Star Cleaning"
              width={640}
              height={150}
              sizes="(min-width: 1024px) 200px, 176px"
              className="h-10 w-auto shrink-0 lg:h-11"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
            <Link href="/services" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Home cleaning
            </Link>
            <Link href="/services/commercial-cleaning" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Commercial
            </Link>
            <Link href="/services/post-construction-cleaning" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Post-construction
            </Link>
            <Link href="/service-areas" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Service areas
            </Link>
            <Link href="/#reviews" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
              Reviews
            </Link>
            {directBookingUrl && !isCommercial ? (
              <Suspense fallback={null}>
                <BookingPortalLink baseUrl={directBookingUrl} sourcePage={pathname} ctaLocation="header" label="Book online" showIcon={false} className="btn btn-ghost-dark !min-h-11 !px-4 !text-sm" />
              </Suspense>
            ) : null}
            <a
              href="tel:+15597852822"
              className="hidden flex-col items-end leading-none 2xl:flex"
            >
              <span className="text-sm font-extrabold text-white">(559) 785-2822</span>
              <span className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-white/60">Call or text</span>
            </a>
            <Link href={quoteHref} className="btn btn-accent !px-4 !text-sm">
              {isCommercial ? "Request a walkthrough" : "Request a quote"}
            </Link>
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link href={quoteHref} className="btn btn-accent hidden !min-h-10 !px-4 !text-xs sm:inline-flex">
              Quote
            </Link>
            <a
              href="tel:+15597852822"
              data-phone-location="header_mobile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-2 text-primary"
              aria-label="Call (559) 785-2822"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a
              href="sms:+15597852822"
              data-phone-location="header_mobile"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-2 text-primary"
              aria-label="Text (559) 785-2822"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
            <button
              ref={menuButton}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
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
          <div id="mobile-navigation" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/15 pb-5 xl:hidden">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 pt-3">
              {[
                { href: quoteHref, label: isCommercial ? "Request a walkthrough" : "Request a quote" },
                { href: "/services", label: "Home cleaning services" },
                { href: "/services/commercial-cleaning", label: "Office & commercial cleaning" },
                { href: "/services/post-construction-cleaning", label: "Post-construction cleaning" },
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
                  className="rounded-xl px-4 py-3 text-base font-semibold text-white/85 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              {directBookingUrl && !isCommercial ? (
                <Suspense fallback={null}>
                  <BookingPortalLink baseUrl={directBookingUrl} sourcePage={pathname} ctaLocation="mobile_menu" label="Book online" showIcon={false} className="mt-1 rounded-xl border border-white/25 px-4 py-3 text-center text-base font-semibold text-white hover:bg-white/10" />
                </Suspense>
              ) : null}
              <a
                href="tel:+15597852822"
                data-phone-location="mobile_menu"
                className="mt-2 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-base font-extrabold text-white"
              >
                <span>Call (559) 785-2822</span>
                <span className="text-xs font-semibold text-white/60">Tap to call</span>
              </a>
              <a
                href="sms:+15597852822"
                data-phone-location="mobile_menu"
                className="mt-2 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-base font-extrabold text-white"
              >
                <span>Text us</span>
                <span className="text-xs font-semibold text-white/60">Usually fastest</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

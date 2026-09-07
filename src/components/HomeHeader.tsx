"use client";

import { usePathname } from "next/navigation";
import { siteQuoteHref } from "@/lib/siteQuoteContext";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { business } from "@/lib/business";

const navigation = [
  { label: "Home cleaning", href: "/services" },
  { label: "Our work", href: "/#results" },
  { label: "Service areas", href: "/service-areas" },
  { label: "Commercial", href: "/services/commercial-cleaning" },
  { label: "Post-construction", href: "/services/post-construction-cleaning" },
];

export default function HomeHeader() {
  const pathname = usePathname();
  const quoteHref = siteQuoteHref(pathname, "");
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const reset = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menu.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header key={pathname} className="home-header" data-open={open} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <div className="home-header-inner">
        <Link href="/" aria-label="New Star Cleaning home" className="home-wordmark"><Image src="/brand/nsc-lockup-horizontal-reverse.svg" alt="New Star Cleaning" width={640} height={150} sizes="(min-width: 1024px) 190px, 156px" /></Link>
        <nav className="home-desktop-nav" aria-label="Main navigation">{navigation.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
        <div className="home-header-actions">
          <Suspense fallback={<Link href={quoteHref} className="home-header-quote"><span className="home-desktop-label">Request a </span>quote <span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-header-quote"><span className="home-desktop-label">Request a </span>quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense>
          <button type="button" ref={menu} className="home-menu-button" aria-label="Toggle menu" aria-expanded={open} aria-controls="home-mobile-menu" onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 8h18M3 16h18" />}</svg>
          </button>
        </div>
      </div>
      {open ? <nav id="home-mobile-menu" className="home-mobile-menu" aria-label="Mobile navigation">
        {navigation.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>)}
        <Link href="/about" onClick={() => setOpen(false)}>About New Star</Link>
        <Link href="/checklist" onClick={() => setOpen(false)}>Service checklist</Link>
        <a href={business.phoneHref} data-phone-location="header_mobile">Call {business.phoneDisplay}</a>
        <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_menu">Text us</a>
      </nav> : null}
    </header>
  );
}

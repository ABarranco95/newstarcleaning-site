"use client";

import { usePathname } from "next/navigation";
import { siteQuoteHref, siteQuoteParams } from "@/lib/siteQuoteContext";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import { business } from "@/lib/business";

type NavLink = { label: string; href: string };

const residentialLinks: NavLink[] = [
  { label: "Standard cleaning", href: "/services/standard-cleaning" },
  { label: "Deep cleaning", href: "/services/deep-cleaning" },
  { label: "Move-in / move-out", href: "/services/move-out-cleaning" },
];

const businessLinks: NavLink[] = [
  { label: "Commercial", href: "/services/commercial-cleaning" },
  { label: "Post-construction", href: "/services/post-construction-cleaning" },
];

const navigation: (NavLink & { panel?: "services" })[] = [
  { label: "Services", href: "/services", panel: "services" },
  { label: "Our work", href: "/our-work" },
  { label: "Areas", href: "/service-areas" },
  { label: "About", href: "/about" },
];

const mobileGroups: { title: string; links: NavLink[] }[] = [
  { title: "Home cleaning", links: residentialLinks },
  { title: "For businesses", links: [...businessLinks, { label: "All services", href: "/services" }] },
  { title: "Our work", links: [{ label: "Photo gallery & before/after", href: "/our-work" }] },
  { title: "Local areas", links: [{ label: "Service areas", href: "/service-areas" }] },
];

export default function HomeHeader() {
  const pathname = usePathname();
  const quoteHref = siteQuoteHref(pathname, "");
  const routeService = siteQuoteParams(pathname, "").get("service");
  const localService = residentialLinks.find((link) => pathname !== link.href && link.href === `/services/${routeService}`);
  const servicesCurrent = pathname === "/services" || pathname.startsWith("/services/") || Boolean(localService);
  const currentLocation = (href: string): "page" | "location" | undefined => {
    if (pathname === href) return "page";
    if (localService && href === localService.href) return "location";
    if (href === "/service-areas" && (pathname.startsWith("/cleaning-services-") || pathname.startsWith("/service-areas/"))) return "location";
    return undefined;
  };
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const reset = () => { setOpen(false); setServicesOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    if (!open && !servicesOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        (open ? menu : servicesTrigger).current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (open && !header.current?.contains(target)) setOpen(false);
      if (servicesOpen && !panel.current?.contains(target)) setServicesOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, servicesOpen]);

  return (
    <header ref={header} key={pathname} className="home-header" data-open={open} onClickCapture={(event) => { if ((event.target as Element).closest("a")) { setOpen(false); setServicesOpen(false); } }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setServicesOpen(false); } }}>
      <div className="home-header-inner">
        <Link href="/" aria-label="New Star Cleaning home" className="home-wordmark"><Image src="/brand/nsc-lockup-horizontal-reverse.svg" alt="New Star Cleaning" width={640} height={150} sizes="(min-width: 1024px) 190px, 156px" /></Link>
        <nav className="home-desktop-nav" aria-label="Main navigation">
          <div ref={panel} className={`home-nav-item home-nav-panel${servicesOpen ? " is-open" : ""}`} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}>
            <button
              type="button"
              className={`home-nav-trigger${servicesCurrent ? " is-active" : ""}`}
              ref={servicesTrigger}
              aria-expanded={servicesOpen}
              aria-controls="home-services-panel"
              aria-current={servicesCurrent ? "location" : undefined}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <span aria-hidden="true" className="home-nav-caret">▾</span>
            </button>
            <div
              id="home-services-panel"
              className="home-services-panel"
            >
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">Home cleaning</p>
                {residentialLinks.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link">{link.label}</Link>)}
              </div>
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">For businesses &amp; job sites</p>
                {businessLinks.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link">{link.label}</Link>)}
                <Link href="/services" aria-current={currentLocation("/services")} className="home-services-panel-more">All services <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
          {navigation.filter((link) => !link.panel).map((link) => (
            <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className={currentLocation(link.href) ? "is-active" : undefined}>{link.label}</Link>
          ))}
        </nav>
        <div className="home-header-actions">
          <a href={business.phoneHref} className="home-header-phone" data-phone-location="header_desktop"><span aria-hidden="true">◔</span> {business.phoneDisplay}</a>
          <Suspense fallback={<Link href={quoteHref} className="home-header-quote"><span className="home-quote-full">Request a quote</span><span className="home-quote-short">Quote</span><span aria-hidden="true">↗</span></Link>}><HomeQuoteLink className="home-header-quote"><span className="home-quote-full">Request a quote</span><span className="home-quote-short">Quote</span><span aria-hidden="true">↗</span></HomeQuoteLink></Suspense>
          <button type="button" ref={menu} className="home-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="home-mobile-menu" onClick={() => setOpen(!open)}>
            <span className="home-menu-label">{open ? "Close" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 8h18M3 16h18" />}</svg>
          </button>
        </div>
      </div>
      {open ? <nav id="home-mobile-menu" className="home-mobile-menu" aria-label="Mobile navigation">
        {mobileGroups.map((group) => (
          <div key={group.title} className="home-mobile-group">
            <p className="home-mobile-group-title">{group.title}</p>
            {group.links.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">→</span></Link>)}
          </div>
        ))}
        <div className="home-mobile-group">
          <p className="home-mobile-group-title">Company</p>
          <Link href="/about" aria-current={currentLocation("/about")} onClick={() => setOpen(false)}>About New Star<span aria-hidden="true">→</span></Link>
          <Link href="/checklist" aria-current={currentLocation("/checklist")} onClick={() => setOpen(false)}>Service checklist<span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-mobile-contact">
          <a href={business.phoneHref} data-phone-location="header_mobile">Call {business.phoneDisplay}</a>
          <a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_menu">Text us</a>
          <Suspense fallback={null}><HomeQuoteLink className="home-mobile-quote">Request a quote <span aria-hidden="true">↗</span></HomeQuoteLink></Suspense>
        </div>
      </nav> : null}
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { siteQuoteHref, siteQuoteParams } from "@/lib/siteQuoteContext";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import HomeQuoteLink from "@/components/HomeQuoteLink";
import HomeBookingLink from "@/components/HomeBookingLink";
import Icon from "@/components/Icon";
import { business } from "@/lib/business";

type NavLink = { label: string; href: string; sub?: string; price?: string };

const residentialLinks: NavLink[] = [
  { label: "Standard cleaning", href: "/services/standard-cleaning", price: "$165+", sub: "Weekly, bi-weekly, monthly or 1x" },
  { label: "Deep cleaning", href: "/services/deep-cleaning", price: "$235+", sub: "Buildup, baseboards & fixtures" },
  { label: "Move-in / move-out", href: "/services/move-out-cleaning", price: "$325+", sub: "Empty home + inside cabinets" },
];

const businessLinks: NavLink[] = [
  { label: "Office & commercial", href: "/services/commercial-cleaning" },
  { label: "Post-construction", href: "/services/post-construction-cleaning" },
];

const navigation: (NavLink & { panel?: "services" })[] = [
  { label: "Services", href: "/services", panel: "services" },
  { label: "What's Included", href: "/checklist" },
  { label: "Before & After", href: "/our-work" },
  { label: "About", href: "/about" },
];

const centralValleyLinks: NavLink[] = ["Fresno", "Clovis", "Madera"].map((label) => ({
  label,
  href: `/cleaning-services-${label.toLowerCase()}`,
}));
const fresnoNeighborhoodLinks: NavLink[] = [
  { label: "North Fresno", href: "/cleaning-services-north-fresno" },
  { label: "Woodward Park", href: "/cleaning-services-woodward-park" },
  { label: "Fig Garden", href: "/cleaning-services-fig-garden" },
  { label: "Tower District", href: "/cleaning-services-tower-district" },
];

export default function HomeHeader() {
  const serviceLinks = residentialLinks;
  const areaLinks = centralValleyLinks;
  const mobileGroups: { title: string; links: NavLink[] }[] = [
    { title: "Areas", links: [...areaLinks, ...fresnoNeighborhoodLinks, { label: "Service areas", href: "/service-areas" }] },
    { title: "Company & Guides", links: [{ label: "About New Star", href: "/about" }, { label: "Contact", href: "/contact" }, { label: "Cleaning cost guides", href: "/blog" }, { label: "All services", href: "/services" }] },
    { title: "Fresno-area businesses", links: [...businessLinks, { label: "Request a walkthrough", href: "/commercial-quote" }] },
  ];
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
  const [areasOpen, setAreasOpen] = useState(false);
  const menu = useRef<HTMLButtonElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const areasTrigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const areasPanel = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reset = () => { setOpen(false); setServicesOpen(false); setAreasOpen(false); };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    if (!open && !servicesOpen && !areasOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        setAreasOpen(false);
        (open ? menu : servicesOpen ? servicesTrigger : areasTrigger).current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (open && !header.current?.contains(target)) setOpen(false);
      if (servicesOpen && !panel.current?.contains(target)) setServicesOpen(false);
      if (areasOpen && !areasPanel.current?.contains(target)) setAreasOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, servicesOpen, areasOpen]);

  return (
    <header ref={header} className="home-header ns-on-dark" data-open={open} onClickCapture={(event) => { if ((event.target as Element).closest("a")) { setOpen(false); setServicesOpen(false); setAreasOpen(false); } }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setOpen(false); setServicesOpen(false); setAreasOpen(false); } }}>
      <div className="home-header-inner">
        <Link href="/" aria-label="New Star Cleaning home" className="home-wordmark"><Image src="/brand/nsc-lockup-horizontal-reverse.svg" alt="New Star Cleaning" width={640} height={150} sizes="(min-width: 1024px) 176px, 156px" /></Link>
        <nav className="home-desktop-nav" aria-label="Main navigation">
          <div ref={panel} className={`home-nav-item home-nav-panel${servicesOpen ? " is-open" : ""}`} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}>
            <button
              type="button"
              className={`home-nav-trigger${servicesCurrent ? " is-active" : ""}`}
              ref={servicesTrigger}
              aria-expanded={servicesOpen}
              aria-controls="home-services-panel"
              aria-current={servicesCurrent ? "location" : undefined}
              onClick={() => { setServicesOpen(!servicesOpen); setAreasOpen(false); }}
            >
              Services <span aria-hidden="true" className="home-nav-caret">▾</span>
            </button>
            <div id="home-services-panel" className="home-services-panel">
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">Home cleaning</p>
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link justify-between gap-2">
                    <span>{link.label}</span>
                    {link.price ? <span className="rounded-full border border-line-strong bg-cream-2 px-2 py-0.5 text-xs font-bold text-primary">{link.price}</span> : null}
                  </Link>
                ))}
              </div>
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">Fresno-area businesses</p>
                {businessLinks.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link">{link.label}</Link>)}
              </div>
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">Before you book</p>
                <Link href="/checklist" className="home-services-panel-more">45-point checklist →</Link>
                <Link href="/our-work" className="home-services-panel-more">Before &amp; after gallery →</Link>
                <Link href="/services" className="home-services-panel-more">All services <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
          {navigation.filter((link) => !link.panel).map((link) => (
            <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className={currentLocation(link.href) ? "is-active" : undefined}>{link.label}</Link>
          ))}
          <div ref={areasPanel} className={`home-nav-panel${areasOpen ? " is-open" : ""}`} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setAreasOpen(false); }}>
            <button type="button" ref={areasTrigger} className="home-nav-trigger" aria-expanded={areasOpen} aria-controls="home-areas-panel" aria-current={currentLocation("/service-areas")} onClick={() => { setAreasOpen(!areasOpen); setServicesOpen(false); }}>Areas <span aria-hidden="true">▾</span></button>
            <div id="home-areas-panel" className="home-services-panel home-areas-panel">
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">{business.serviceAreaName}</p>
                {areaLinks.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link">{link.label}</Link>)}
                <Link href="/service-areas" className="home-services-panel-more">Service areas →</Link>
              </div>
              <div className="home-services-panel-group">
                <p className="home-services-panel-label">Fresno neighborhoods</p>
                {fresnoNeighborhoodLinks.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} className="home-services-panel-link">{link.label}</Link>)}
              </div>
            </div>
          </div>
        </nav>
        <div className="home-header-actions">
          <a href={business.phoneHref} className="home-header-phone" data-phone-location="header_desktop" aria-label={`Call ${business.phoneDisplay}`}><Icon name="phone" /><span className="home-header-phone-number">{business.phoneDisplay}</span></a>
          <HomeBookingLink placement="header" />
          <button type="button" ref={menu} className="home-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="home-mobile-menu" onClick={() => setOpen(!open)}>
            <span className="home-menu-label">{open ? "Close" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m5 5 14 14M5 19 19 5" /> : <path d="M3 8h18M3 16h18" />}</svg>
          </button>
        </div>
      </div>
      {open ? <nav id="home-mobile-menu" className="home-mobile-menu" aria-label="Mobile navigation">
        <div className="home-mobile-contact"><HomeBookingLink /><div className="home-mobile-contact-row"><a href={business.phoneHref} data-phone-location="header_mobile">Call {business.phoneDisplay}</a><a href={business.phoneHref.replace("tel:", "sms:")} data-phone-location="mobile_menu">Text Us</a></div></div>
        <div className="home-mobile-group">
          <p className="home-mobile-group-title">Quick Pricing &amp; Scope</p>
          <div className="grid grid-cols-2 gap-2.5">
            {serviceLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="!flex !flex-col !items-start gap-1 rounded-xl !border !border-line bg-cream-2 !p-3">
                <span className="flex w-full items-center justify-between gap-1 text-sm font-bold text-primary">
                  <span>{link.label.split(" ")[0]}</span>
                  <span className="rounded-full border border-line-strong bg-white px-2 py-0.5 text-xs">{link.price}</span>
                </span>
                <span className="text-xs text-ink-soft">{link.sub}</span>
              </Link>
            ))}
            <Link href="/checklist" onClick={() => setOpen(false)} className="!flex !flex-col !items-start gap-1 rounded-xl !border-2 !border-primary bg-selected !p-3">
              <span className="flex w-full items-center justify-between gap-1 text-sm font-bold text-primary">
                <span>Checklist</span>
                <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-primary-dark">45 Pts</span>
              </span>
              <span className="text-xs text-ink-soft">Room-by-room scope →</span>
            </Link>
          </div>
          <Link href="/our-work" onClick={() => setOpen(false)} className="mt-2.5 !flex !flex-col !items-start gap-1 rounded-xl !border !border-primary bg-white !p-3.5">
            <span className="rounded-full bg-primary-dark px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">Real Job Photos</span>
            <span className="text-base font-bold text-primary">Before &amp; After Work Gallery →</span>
          </Link>
        </div>
        {mobileGroups.map((group) => (
          <div key={group.title} className={`home-mobile-group${group.title === "Areas" ? " home-mobile-areas" : ""}`}>
            <p className="home-mobile-group-title">{group.title}</p>
            <div>{group.links.map((link) => <Link key={link.href} href={link.href} aria-current={currentLocation(link.href)} onClick={() => setOpen(false)}>{link.label}</Link>)}</div>
          </div>
        ))}
        <div className="mt-4">
          <Suspense fallback={<Link href={quoteHref}>Get a quote</Link>}><HomeQuoteLink className="home-text-link">Get a quote <span aria-hidden="true">→</span></HomeQuoteLink></Suspense>
        </div>
      </nav> : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import BookingPortalLink from "@/components/BookingPortalLink";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { trackFunnelEvent } from "@/lib/conversionTracking";
import {
  calculateFresnoInstantEstimate,
  FRESNO_SQFT_PRESETS,
  normalizeFresnoServiceParam,
  type FresnoFrequency,
  type FresnoResidentialService,
} from "@/lib/fresnoPricingEngine";

export interface FresnoInstantPriceCalculatorProps {
  defaultService?: "STANDARD" | "DEEP" | "MOVE_OUT";
  defaultCity?: string;
  directBookingUrl?: string | null;
  source?: string;
  compact?: boolean;
}

const configuredDirectBookingUrl = resolveDirectBookingUrl();

const SERVICE_TABS: ReadonlyArray<{
  key: FresnoResidentialService;
  label: string;
  floorText: string;
  slug: string;
  portalName: string;
}> = [
  {
    key: "STANDARD",
    label: "Standard",
    floorText: "$165+",
    slug: "standard-cleaning",
    portalName: "Standard recurring cleaning",
  },
  {
    key: "DEEP",
    label: "Deep Clean",
    floorText: "$235+",
    slug: "deep-cleaning",
    portalName: "Deep cleaning",
  },
  {
    key: "MOVE_OUT",
    label: "Move-In/Out",
    floorText: "$325+",
    slug: "move-out-cleaning",
    portalName: "Move-in / move-out cleaning",
  },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
const BATHROOM_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4] as const;

const STANDARD_FREQUENCIES: ReadonlyArray<{
  key: FresnoFrequency;
  label: string;
  badge?: string;
  portalValue?: string;
}> = [
  { key: "BIWEEKLY", label: "Bi-Weekly", badge: "-15%", portalValue: "bi-weekly" },
  { key: "WEEKLY", label: "Weekly", badge: "-20%", portalValue: "weekly" },
  { key: "MONTHLY", label: "Monthly", badge: "-10%", portalValue: "monthly" },
  { key: "ONE_TIME", label: "One-Time" },
];

export default function FresnoInstantPriceCalculator({
  defaultService = "STANDARD",
  defaultCity,
  directBookingUrl,
  source = "instant_calculator",
  compact = false,
}: FresnoInstantPriceCalculatorProps) {
  const pathname = usePathname();
  const resolvedBookingUrl =
    directBookingUrl === undefined ? configuredDirectBookingUrl : directBookingUrl;

  const [service, setService] = useState<FresnoResidentialService>(defaultService);
  const [frequency, setFrequency] = useState<FresnoFrequency>("BIWEEKLY");
  const [beds, setBeds] = useState<number>(3);
  const [baths, setBaths] = useState<number>(2);
  const [sqftId, setSqftId] = useState<string>("1200-1799");
  const [urlCity, setUrlCity] = useState<string>("");
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    setService(defaultService);
  }, [defaultService]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const incomingCity = params.get("city") || params.get("nsc_city");
    if (incomingCity) setUrlCity(incomingCity.trim());

    const incomingService = params.get("service") || params.get("nsc_service");
    if (incomingService) {
      setService(normalizeFresnoServiceParam(incomingService, defaultService));
    }

    const incomingFreq = (params.get("frequency") || params.get("nsc_frequency") || "")
      .trim()
      .toLowerCase();
    if (incomingFreq === "weekly") setFrequency("WEEKLY");
    else if (incomingFreq === "biweekly" || incomingFreq === "bi-weekly") setFrequency("BIWEEKLY");
    else if (incomingFreq === "monthly") setFrequency("MONTHLY");
    else if (incomingFreq === "one-time" || incomingFreq === "one_time") setFrequency("ONE_TIME");
  }, [defaultService]);

  const activePreset = useMemo(
    () => FRESNO_SQFT_PRESETS.find((preset) => preset.id === sqftId) ?? FRESNO_SQFT_PRESETS[1],
    [sqftId],
  );

  const estimate = useMemo(
    () =>
      calculateFresnoInstantEstimate({
        beds,
        baths,
        sqft: activePreset.sqft,
        condition: "lived_in",
        serviceType: service,
      }),
    [beds, baths, activePreset.sqft, service],
  );

  const activeTabMeta = useMemo(
    () => SERVICE_TABS.find((tab) => tab.key === service) ?? SERVICE_TABS[0],
    [service],
  );

  const activeStandardPrice = useMemo(() => {
    if (frequency === "WEEKLY") return estimate.standardWeekly;
    if (frequency === "BIWEEKLY") return estimate.standardBiweekly;
    if (frequency === "MONTHLY") return estimate.standardMonthly;
    return estimate.standardOneTime;
  }, [estimate, frequency]);

  const activeDollars =
    service === "STANDARD"
      ? activeStandardPrice
      : service === "DEEP"
        ? estimate.deepClean
        : estimate.moveOut;

  const standardSavings =
    service === "STANDARD" && frequency !== "ONE_TIME"
      ? Math.max(0, estimate.standardOneTime - activeStandardPrice)
      : 0;

  const effectiveCity = (defaultCity || urlCity || "").trim();
  const isCustomLarge = Boolean(activePreset.isCustom);

  const activeFrequencyMeta = useMemo(
    () =>
      STANDARD_FREQUENCIES.find((item) => item.key === frequency) ?? STANDARD_FREQUENCIES[0],
    [frequency],
  );

  const portalFrequency =
    service === "STANDARD" && activeFrequencyMeta.portalValue
      ? activeFrequencyMeta.portalValue
      : undefined;

  const fallbackQuoteHref = useMemo(() => {
    const query = new URLSearchParams();
    query.set("service", activeTabMeta.slug);
    if (effectiveCity) query.set("city", effectiveCity);
    if (portalFrequency) query.set("frequency", portalFrequency);
    return `/book-now?${query.toString()}`;
  }, [activeTabMeta.slug, effectiveCity, portalFrequency]);

  const recordInteraction = (nextService = service) => {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    const tab = SERVICE_TABS.find((item) => item.key === nextService) ?? activeTabMeta;
    trackFunnelEvent("price_view", {
      source,
      service: tab.portalName,
      city: effectiveCity || "Fresno",
      page: pathname || "/",
    });
  };

  const ctaLabel = isCustomLarge
    ? "Request 3,500+ Sq Ft Quote ->"
    : resolvedBookingUrl
      ? `Book Online ($${activeDollars}${service === "STANDARD" && frequency !== "ONE_TIME" ? "/visit" : ""}) ->`
      : `Get Exact Quote ($${activeDollars}) ->`;

  const ctaClassName =
    "fresno-calc-cta flex min-h-[52px] w-full items-center justify-center rounded-xl bg-gold px-5 py-3.5 text-center text-[15px] font-bold text-primary-dark transition-colors hover:bg-gold-hover sm:text-base";

  return (
    <div
      data-testid="fresno-instant-calculator"
      className={`fresno-calc-card w-full overflow-hidden rounded-2xl border border-line-strong bg-white text-ink ${
        compact ? "fresno-calc-compact" : ""
      }`}
    >
      {/* Header Bar */}
      <div className="border-b border-line bg-cream-2 px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            Instant Fresno &amp; Clovis Estimate
          </span>
          <span className="rounded-full border border-primary/20 bg-selected px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            No phone or email gate
          </span>
        </div>
        {!compact ? (
          <p className="mt-1 text-xs leading-4 text-ink-soft">
            Tap your rooms and home size for live New Star flat-rate pricing.
          </p>
        ) : null}
      </div>

      <div className={compact ? "space-y-3 p-3.5 sm:p-4" : "space-y-3.5 p-4 sm:p-5"}>
        {/* 1. Service Tabs */}
        <div
          role="group"
          aria-label="Cleaning service type"
          className="grid grid-cols-3 gap-1 rounded-xl bg-surface p-1"
        >
          {SERVICE_TABS.map((tab) => {
            const selected = service === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  recordInteraction(tab.key);
                  setService(tab.key);
                }}
                className={`flex min-h-[46px] cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-1.5 text-center transition-colors ${
                  selected
                    ? "bg-primary font-bold text-white"
                    : "bg-transparent font-semibold text-ink hover:bg-white/80"
                }`}
              >
                <span className="text-xs leading-tight sm:text-[13px]">{tab.label}</span>
                <span
                  className={`mt-0.5 text-[11px] leading-tight tabular-nums ${
                    selected ? "text-gold" : "text-mute"
                  }`}
                >
                  ({tab.floorText})
                </span>
              </button>
            );
          })}
        </div>

        {/* Standard Frequency Toggle (Bi-Weekly savings vs One-Time) */}
        {service === "STANDARD" ? (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-soft">Visit Schedule</span>
              <span className="font-semibold text-success">Pause or cancel anytime</span>
            </div>
            <div
              role="group"
              aria-label="Recurring cleaning frequency"
              className="grid grid-cols-4 gap-1.5"
            >
              {STANDARD_FREQUENCIES.map((opt) => {
                const selected = frequency === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      recordInteraction();
                      setFrequency(opt.key);
                    }}
                    className={`flex min-h-[40px] cursor-pointer flex-col items-center justify-center rounded-lg border px-1.5 py-1 text-center transition-colors ${
                      selected
                        ? "border-primary bg-selected text-primary ring-1 ring-primary"
                        : "border-line bg-white text-ink hover:border-primary/60"
                    }`}
                  >
                    <span className="text-[11px] leading-tight font-bold sm:text-xs">
                      {opt.label}
                    </span>
                    {opt.badge ? (
                      <span className="text-[10px] font-bold text-primary">{opt.badge}</span>
                    ) : (
                      <span className="text-[10px] text-mute">Single</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* 2. Bedrooms Pill Row (1 to 6) */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-soft">Bedrooms</span>
            <span className="font-bold text-ink tabular-nums">
              {beds} {beds === 1 ? "Bedroom" : "Bedrooms"}
            </span>
          </div>
          <div
            role="group"
            aria-label="Number of bedrooms"
            className="grid grid-cols-6 gap-1.5"
          >
            {BEDROOM_OPTIONS.map((count) => {
              const selected = beds === count;
              return (
                <button
                  key={count}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    recordInteraction();
                    setBeds(count);
                  }}
                  className={`min-h-[38px] cursor-pointer rounded-lg border text-sm font-bold tabular-nums transition-colors ${
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-cream-2 text-ink hover:border-primary/60 hover:bg-white"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Bathrooms Pill Row (1 to 4 in 0.5 steps) */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-soft">Bathrooms</span>
            <span className="font-bold text-ink tabular-nums">
              {baths} {baths === 1 ? "Bathroom" : "Bathrooms"}
            </span>
          </div>
          <div
            role="group"
            aria-label="Number of bathrooms"
            className="grid grid-cols-7 gap-1"
          >
            {BATHROOM_OPTIONS.map((count) => {
              const selected = baths === count;
              return (
                <button
                  key={count}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    recordInteraction();
                    setBaths(count);
                  }}
                  className={`min-h-[38px] cursor-pointer rounded-lg border px-1 text-xs font-bold tabular-nums transition-colors sm:text-[13px] ${
                    selected
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-cream-2 text-ink hover:border-primary/60 hover:bg-white"
                  }`}
                >
                  {count}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Home Size Presets */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-soft">Home Size (Sq Ft)</span>
            <span className="text-mute tabular-nums">{activePreset.approxLabel}</span>
          </div>
          <div
            role="group"
            aria-label="Approximate square footage"
            className="grid grid-cols-2 gap-1.5 sm:grid-cols-3"
          >
            {FRESNO_SQFT_PRESETS.map((preset) => {
              const selected = preset.id === activePreset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    recordInteraction();
                    setSqftId(preset.id);
                  }}
                  className={`min-h-[38px] cursor-pointer rounded-lg border px-2 py-1 text-xs font-semibold tabular-nums transition-colors ${
                    selected
                      ? "border-primary bg-selected text-primary ring-1 ring-primary"
                      : "border-line bg-white text-ink hover:border-primary/60"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Live Transparent Price Readout */}
        <div
          aria-live="polite"
          data-testid="fresno-calculator-price"
          className="rounded-xl border border-primary/20 bg-cream-2 p-3.5 sm:p-4"
        >
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs text-mute">
            <span className="font-semibold text-ink-soft tabular-nums">
              {beds} bd / {baths} ba · {activePreset.approxLabel}
            </span>
            {!isCustomLarge ? (
              <span className="rounded-md border border-line bg-white px-2 py-0.5 text-[11px] font-semibold text-primary tabular-nums">
                Est. {estimate.estimatedHoursRange}
              </span>
            ) : null}
          </div>

          {isCustomLarge ? (
            <div>
              <p className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                {service === "STANDARD"
                  ? "Custom quote for 3,500+ sq ft"
                  : "Photo review for 3,500+ sq ft"}
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-soft">
                For larger Fresno &amp; Clovis homes, we confirm exact room count and condition
                first so your price and crew schedule are accurate.
              </p>
            </div>
          ) : service === "STANDARD" ? (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-3xl font-bold tracking-tight text-primary tabular-nums sm:text-4xl">
                  ${activeStandardPrice}
                </span>
                <span className="text-sm font-semibold text-ink-soft">
                  {frequency === "ONE_TIME" ? "one-time visit" : "/ visit"}
                </span>
                {standardSavings > 0 ? (
                  <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-white tabular-nums">
                    Save ${standardSavings}/visit
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-xs text-ink-soft tabular-nums">
                {frequency !== "ONE_TIME" ? (
                  <>
                    One-time Standard: <strong>${estimate.standardOneTime}</strong> ·{" "}
                    {activeFrequencyMeta.label} maintenance rate
                  </>
                ) : (
                  <>
                    Switch to Bi-Weekly for <strong>${estimate.standardBiweekly}/visit</strong>{" "}
                    (15% recurring savings)
                  </>
                )}
              </p>
            </div>
          ) : service === "DEEP" ? (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-3xl font-bold tracking-tight text-primary tabular-nums sm:text-4xl">
                  ${estimate.deepClean}
                </span>
                <span className="text-sm font-semibold text-ink-soft">flat-rate deep clean</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft tabular-nums">
                Includes baseboards, trim, reachable fans, and detail scrubbing · Ongoing bi-weekly
                after: <strong>${estimate.standardBiweekly}/visit</strong>
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-3xl font-bold tracking-tight text-primary tabular-nums sm:text-4xl">
                  ${estimate.moveOut}
                </span>
                <span className="text-sm font-semibold text-ink-soft">empty-home flat rate</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Empty cabinet, drawer, and closet interiors included · Oven ($45) &amp; fridge ($35)
                optional
              </p>
            </div>
          )}

          <p className="mt-2.5 border-t border-line pt-2 text-[11.5px] font-medium leading-4 text-ink-soft sm:text-xs">
            Confirmed before anything is booked · Supplies &amp; liability insurance included
          </p>
        </div>

        {/* 6. Primary CTA Action */}
        <div>
          {resolvedBookingUrl && !isCustomLarge ? (
            <Suspense
              fallback={
                <a href={resolvedBookingUrl} className={ctaClassName}>
                  {ctaLabel}
                </a>
              }
            >
              <BookingPortalLink
                baseUrl={resolvedBookingUrl}
                service={activeTabMeta.portalName}
                city={effectiveCity || undefined}
                frequency={portalFrequency}
                sourcePage={pathname}
                ctaLocation="instant_calculator"
                label={ctaLabel}
                showIcon={false}
                className={ctaClassName}
              />
            </Suspense>
          ) : (
            <Link href={fallbackQuoteHref} className={ctaClassName}>
              {ctaLabel}
            </Link>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-0.5 text-xs">
            <Link
              href="/checklist"
              className="inline-flex min-h-[34px] items-center font-semibold text-primary underline underline-offset-4 hover:text-primary-light"
            >
              Compare all 3 checklists -&gt;
            </Link>
            <a
              href={pathname === "/" ? "#quote" : fallbackQuoteHref}
              className="inline-flex min-h-[34px] items-center font-semibold text-ink-soft underline underline-offset-4 hover:text-primary"
            >
              Rather get a quote by text? -&gt;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

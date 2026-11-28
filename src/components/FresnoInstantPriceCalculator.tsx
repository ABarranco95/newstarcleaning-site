"use client";

import Link from "next/link";
import { Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
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
  slug: string;
  portalName: string;
}> = [
  {
    key: "STANDARD",
    label: "Standard",
    slug: "standard-cleaning",
    portalName: "Standard recurring cleaning",
  },
  {
    key: "DEEP",
    label: "Deep Clean",
    slug: "deep-cleaning",
    portalName: "Deep cleaning",
  },
  {
    key: "MOVE_OUT",
    label: "Move-Out",
    slug: "move-out-cleaning",
    portalName: "Move-in / move-out cleaning",
  },
];

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6] as const;
const BATHROOM_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4] as const;

const STANDARD_FREQUENCIES: ReadonlyArray<{
  key: FresnoFrequency;
  label: string;
  shortTag?: string;
  portalValue?: string;
}> = [
  { key: "BIWEEKLY", label: "Bi-weekly", shortTag: "-15%", portalValue: "bi-weekly" },
  { key: "WEEKLY", label: "Weekly", shortTag: "-20%", portalValue: "weekly" },
  { key: "MONTHLY", label: "Monthly", shortTag: "-10%", portalValue: "monthly" },
  { key: "ONE_TIME", label: "One-time" },
];

export default function FresnoInstantPriceCalculator({
  defaultService = "STANDARD",
  defaultCity,
  directBookingUrl,
  source = "instant_calculator",
}: FresnoInstantPriceCalculatorProps) {
  const pathname = usePathname();
  const uid = useId();
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

  const priceCaption =
    service === "STANDARD"
      ? frequency === "ONE_TIME"
        ? "One-time standard estimate"
        : `${activeFrequencyMeta.label} recurring estimate`
      : service === "DEEP"
        ? "Deep cleaning estimate"
        : "Empty-home move-out estimate";

  const ctaLabel = isCustomLarge
    ? "Request Custom Quote →"
    : resolvedBookingUrl
      ? "Continue to Booking →"
      : "Get Exact Quote →";

  const ctaClassName =
    "fresno-calc-cta inline-flex min-h-[48px] w-full sm:w-auto sm:min-w-[216px] items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-center text-[15.5px] font-bold text-white transition-colors hover:bg-primary-light whitespace-nowrap";

  return (
    <div
      data-testid="fresno-instant-calculator"
      className="fresno-starter-card w-full rounded-[8px] border border-line-strong border-t-[3px] border-t-primary bg-white p-4 text-ink sm:p-5"
    >
      {/* 1. Grounded Service Type Segmented Bar */}
      <div
        role="group"
        aria-label="Cleaning service type"
        className="grid grid-cols-3 gap-0.5 rounded-[6px] border border-line-strong bg-cream-2 p-[3px]"
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
              className={`flex min-h-[40px] cursor-pointer items-center justify-center rounded-[4px] px-2 py-1.5 text-center text-[13.5px] transition-colors sm:text-sm ${
                selected
                  ? "bg-primary font-bold text-white"
                  : "bg-transparent font-semibold text-ink hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 2. Clean 3-Dropdown Home Selectors */}
      <div className="fresno-starter-fields mt-3.5">
        <div>
          <label htmlFor={`${uid}-beds`} className="fresno-starter-label">
            Bedrooms
          </label>
          <select
            id={`${uid}-beds`}
            value={beds}
            onChange={(e) => {
              recordInteraction();
              setBeds(Number(e.target.value));
            }}
            className="fresno-starter-select"
          >
            {BEDROOM_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "Bedroom" : "Bedrooms"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-baths`} className="fresno-starter-label">
            Bathrooms
          </label>
          <select
            id={`${uid}-baths`}
            value={baths}
            onChange={(e) => {
              recordInteraction();
              setBaths(Number(e.target.value));
            }}
            className="fresno-starter-select"
          >
            {BATHROOM_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "Bathroom" : "Bathrooms"}
              </option>
            ))}
          </select>
        </div>

        <div className="fresno-starter-sqft">
          <label htmlFor={`${uid}-sqft`} className="fresno-starter-label">
            Home size
          </label>
          <select
            id={`${uid}-sqft`}
            value={sqftId}
            onChange={(e) => {
              recordInteraction();
              setSqftId(e.target.value);
            }}
            className="fresno-starter-select"
          >
            {FRESNO_SQFT_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.isCustom ? "3,500+ sq ft" : `${preset.label} sq ft`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Grounded Rectangular Visit-Frequency Bar (Zero pill shapes) */}
      {service === "STANDARD" ? (
        <div
          role="group"
          aria-label="Visit frequency"
          className="mt-3 grid grid-cols-2 gap-1 rounded-[6px] border border-line bg-cream-2 p-[3px] sm:grid-cols-4"
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
                className={`inline-flex min-h-[34px] cursor-pointer items-center justify-center gap-1 rounded-[4px] px-2 py-1 text-xs font-semibold whitespace-nowrap transition-colors ${
                  selected
                    ? "bg-white font-bold text-primary shadow-[0_1px_2px_rgb(15_28_46/8%)] ring-1 ring-primary/25"
                    : "text-ink-soft hover:bg-white/70 hover:text-ink"
                }`}
              >
                <span>{opt.label}</span>
                {opt.shortTag ? (
                  <span className="font-bold text-success">{opt.shortTag}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {/* 4. Clean Estimate + Wizard Handoff Action Bar */}
      <div
        aria-live="polite"
        data-testid="fresno-calculator-price"
        className="mt-4 flex flex-col gap-3.5 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-mute">{priceCaption}</p>
          {isCustomLarge ? (
            <p className="mt-0.5 text-lg font-bold tracking-tight text-primary">
              Custom walkthrough or photo quote
            </p>
          ) : (
            <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-3xl font-extrabold tracking-tight text-primary tabular-nums sm:text-[34px]">
                ${activeDollars}
              </span>
              <span className="text-sm font-medium text-ink-soft">
                {service === "STANDARD" && frequency !== "ONE_TIME" ? "/ visit" : "flat rate"}
              </span>
              {standardSavings > 0 ? (
                <span className="text-xs font-bold text-[#16613e] tabular-nums">
                  Save ${standardSavings}/visit
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="shrink-0">
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
                bedrooms={String(beds)}
                bathrooms={String(baths)}
                sqft={String(activePreset.sqft)}
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
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-mute">
        <span>Customize add-ons &amp; pick your open date next · Nothing charged today.</span>
        <a
          href={pathname === "/" ? "#quote" : fallbackQuoteHref}
          className="font-semibold text-primary underline underline-offset-4 hover:text-primary-light"
        >
          Prefer a text quote?
        </a>
      </div>
    </div>
  );
}

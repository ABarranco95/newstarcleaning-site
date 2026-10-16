"use client";

import { useEffect, useState } from "react";
import { paidHomeSize } from "@/lib/paidHomeSize";

type PriceInputs = {
  enabled: boolean;
  service: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
};

type QuoteRequest = {
  serviceType: "STANDARD" | "DEEP" | "MOVE_OUT";
  beds: number;
  baths: number;
  halfBaths: number;
  sqft?: number;
  frequency: "ONE_TIME";
  propertyType: "house";
  addons: string[];
  hasPets: false;
};

type QuotePrice = { total: number; biweekly?: number };
type PriceResult =
  | { status: "hidden" | "custom" }
  | { status: "ready"; low: number; high?: number; biweekly?: number };

type PriceState = PriceResult & { key: string };

const QUOTE_URL = "https://book.newstarcleaning.com/api/public/quote";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0,
});

function formatPrice(cents: number, rounding: "low" | "high" | "nearest" = "low") {
  const dollars = cents / 100;
  return currency.format(rounding === "low" ? Math.floor(dollars) : rounding === "high" ? Math.ceil(dollars) : Math.round(dollars));
}

function buildRequest({ enabled, service, bedrooms, bathrooms, sqft }: PriceInputs, endpoint: "low" | "high" = "low"): QuoteRequest | null {
  if (!enabled || !/^\d+$/.test(bedrooms) || !/^\d+(\.5)?$/.test(bathrooms)) return null;
  const serviceType = service === "Deep cleaning" ? "DEEP"
    : service === "Move-in / move-out cleaning" ? "MOVE_OUT"
      : service === "Not sure yet" || service === "Standard recurring cleaning" ? "STANDARD" : null;
  const beds = Number(bedrooms);
  const baths = Math.floor(Number(bathrooms));
  const band = paidHomeSize(sqft);
  const size = band ? endpoint === "high" ? band.max : band.min : undefined;
  // Open-ended 6+/4+ selections and an unfinished size cannot promise an exact
  // engine range. Keep intake available and leave those homes to the office.
  if (!serviceType || beds > 10 || baths > 10 || (sqft && !band) || size === null) return null;
  return {
    serviceType, beds, baths, halfBaths: Number(bathrooms) % 1 === 0 ? 0 : 1,
    ...(size === undefined ? {} : { sqft: size }),
    frequency: "ONE_TIME", propertyType: "house", addons: [], hasPets: false,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPrice(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

async function fetchPrice(request: QuoteRequest, condition: "normal" | "dusty", signal: AbortSignal): Promise<QuotePrice | "custom"> {
  const response = await fetch(QUOTE_URL, {
    method: "POST",
    // text/plain keeps this a CORS "simple request": Apex answers the POST with
    // Access-Control-Allow-Origin, but its OPTIONS preflight does not.
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    credentials: "omit",
    referrerPolicy: "no-referrer",
    cache: "no-store",
    signal,
    body: JSON.stringify({ ...request, condition }),
  });
  const data: unknown = await response.json();
  if (isRecord(data) && data.code === "CUSTOM_QUOTE_REQUIRED") return "custom";
  if (!response.ok || !isRecord(data)) throw new Error("Price unavailable");
  const total = request.serviceType === "MOVE_OUT" && isRecord(data.moveOutPackages) && data.moveOutPackages.essentials != null
    ? data.moveOutPackages.essentials : data.totalPrice;
  if (!isPrice(total)) throw new Error("Invalid price");
  const biweekly = isRecord(data.frequencyTotals) ? data.frequencyTotals.BIWEEKLY : undefined;
  return { total, ...(isPrice(biweekly) ? { biweekly } : {}) };
}

export default function usePaidPriceRange(inputs: PriceInputs) {
  const request = buildRequest(inputs);
  const band = paidHomeSize(inputs.sqft);
  const highRequest = band ? buildRequest(inputs, "high") : null;
  const key = request && band?.max !== null ? JSON.stringify({ low: request, high: highRequest }) : "";
  const [result, setResult] = useState<PriceState | null>(null);

  useEffect(() => {
    if (!key) return;
    let active = true;
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const debounce = setTimeout(async () => {
      timeout = setTimeout(() => controller.abort(), 6500);
      try {
        const body = JSON.parse(key) as { low: QuoteRequest; high: QuoteRequest | null };
        const [normal, dusty] = await Promise.all([
          fetchPrice(body.low, "normal", controller.signal),
          body.high ? fetchPrice(body.high, "dusty", controller.signal) : Promise.resolve(null),
        ]);
        if (!active || controller.signal.aborted) return;
        if (normal === "custom" || dusty === "custom") {
          setResult({ key, status: "custom" });
        } else if (!dusty || dusty.total >= normal.total) {
          setResult({ key, status: "ready", low: normal.total, ...(dusty ? { high: dusty.total } : {}),
            ...(body.high && body.low.serviceType === "STANDARD" && normal.biweekly !== undefined && normal.biweekly < normal.total
              ? { biweekly: normal.biweekly } : {}),
          });
        } else {
          setResult({ key, status: "hidden" });
        }
      } catch {
        if (active) setResult({ key, status: "hidden" });
      } finally {
        clearTimeout(timeout);
        controller.abort();
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(debounce);
      clearTimeout(timeout);
      controller.abort();
    };
  }, [key]);

  if (inputs.enabled && band?.max === null) return { status: "custom" as const };
  if (!key) return { status: "hidden" as const };
  if (result?.key !== key) return { status: "loading" as const };
  if (result.status !== "ready") return { status: result.status };
  const low = formatPrice(result.low);
  const range = result.high === undefined ? undefined : `${low}–${formatPrice(result.high, "high")}`;
  const service = request?.serviceType === "STANDARD" ? "Standard" : inputs.service;
  return {
    status: "ready" as const,
    low,
    range,
    bookableSqft: band && range ? String(band.min) : undefined,
    biweekly: result.biweekly === undefined ? undefined : formatPrice(result.biweekly, "nearest"),
    note: `Range shown on page: ${range || `From ${low}`} (${range ? "normal at size minimum–dusty at size maximum" : "normal, no size given"}, ${inputs.bedrooms} bed / ${inputs.bathrooms} bath${band ? `, ${band.label} sqft` : ""}, ${service}).`,
  };
}

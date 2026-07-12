"use client";

const STORAGE_KEY = "newstar:first-paid-touch:v1";
const MAX_VALUE_LENGTH = 512;
const PAID_TOUCH_TTL_MS = 90 * 24 * 60 * 60 * 1000;

export const ATTRIBUTION_FIELDS = [
  "capturedAt",
  "expiresAt",
  "firstLandingPage",
  "firstReferrer",
  "landingService",
  "landingCity",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];
type OptionalAttributionField = Exclude<AttributionField, "capturedAt">;

export type FirstPaidTouchRecord = {
  capturedAt: string;
  expiresAt: string;
  firstLandingPage?: string;
  firstReferrer?: string;
  landingService?: string;
  landingCity?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};

export type PaidAttributionSubmission = Partial<FirstPaidTouchRecord>;

type CaptureFirstPaidTouchInput = {
  landingService?: string | null;
  landingCity?: string | null;
};

const QUERY_FIELD_MAP: ReadonlyArray<readonly [OptionalAttributionField, string]> = [
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_content", "utm_content"],
  ["utm_term", "utm_term"],
  ["gclid", "gclid"],
  ["gbraid", "gbraid"],
  ["wbraid", "wbraid"],
];

function sanitizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return normalized ? normalized.slice(0, MAX_VALUE_LENGTH) : undefined;
}

export function sanitizePageValue(value: unknown): string | undefined {
  const normalized = sanitizeText(value);
  if (!normalized) return undefined;

  try {
    const url = new URL(normalized, "https://newstarcleaning.com");
    return sanitizeText(url.pathname);
  } catch {
    return undefined;
  }
}

export function sanitizeReferrer(value: unknown): string | undefined {
  const normalized = sanitizeText(value);
  if (!normalized) return undefined;

  try {
    const url = new URL(normalized);
    return sanitizeText(`${url.origin}${url.pathname}`);
  } catch {
    return undefined;
  }
}

function sanitizeField(field: AttributionField, value: unknown): string | undefined {
  if (field === "firstLandingPage") return sanitizePageValue(value);
  if (field === "firstReferrer") return sanitizeReferrer(value);
  if (field === "capturedAt" || field === "expiresAt") {
    const normalized = sanitizeText(value);
    if (!normalized || Number.isNaN(Date.parse(normalized))) return undefined;
    return normalized;
  }
  return sanitizeText(value);
}

function allowlistedAttribution(value: unknown): PaidAttributionSubmission {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const source = value as Record<string, unknown>;
  return ATTRIBUTION_FIELDS.reduce<PaidAttributionSubmission>((result, field) => {
    const normalized = sanitizeField(field, source[field]);
    if (normalized) result[field] = normalized;
    return result;
  }, {});
}

function currentPaidQuery(): PaidAttributionSubmission {
  if (typeof window === "undefined") return {};
  const searchParams = new URLSearchParams(window.location.search);
  return QUERY_FIELD_MAP.reduce<PaidAttributionSubmission>((result, [field, queryName]) => {
    const normalized = sanitizeText(searchParams.get(queryName));
    if (normalized) result[field] = normalized;
    return result;
  }, {});
}

function hasPaidQuerySignal(value: PaidAttributionSubmission): boolean {
  if (value.gclid || value.gbraid || value.wbraid) return true;
  const medium = value.utm_medium?.trim().toLowerCase();
  return ["cpc", "ppc", "paid", "paid_search", "paid-search"].includes(medium || "");
}

function scrubPaidQueryFromVisibleUrl() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    for (const [, queryName] of QUERY_FIELD_MAP) url.searchParams.delete(queryName);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    // Attribution capture must not fail if history access is restricted.
  }
}

export function readFirstPaidTouch(): FirstPaidTouchRecord | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    const parsed = allowlistedAttribution(JSON.parse(serialized));
    if (!parsed.capturedAt || !parsed.expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY);
      return undefined;
    }
    if (Date.parse(parsed.expiresAt) <= Date.now()) {
      window.localStorage.removeItem(STORAGE_KEY);
      return undefined;
    }
    return parsed as FirstPaidTouchRecord;
  } catch {
    return undefined;
  }
}

export function captureFirstPaidTouch(
  input: CaptureFirstPaidTouchInput = {},
): FirstPaidTouchRecord | undefined {
  if (typeof window === "undefined") return undefined;

  const existing = readFirstPaidTouch();
  const currentQuery = currentPaidQuery();
  if (!hasPaidQuerySignal(currentQuery)) {
    const landingService = existing?.landingService || sanitizeText(input.landingService);
    const landingCity = existing?.landingCity || sanitizeText(input.landingCity);
    if (existing && (landingService !== existing.landingService || landingCity !== existing.landingCity)) {
      const enriched = { ...existing, landingService, landingCity };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
      } catch {
        // Return the enriched in-memory record when storage is unavailable.
      }
      return enriched;
    }
    return existing;
  }

  const capturedAt = new Date();
  const firstTouch: FirstPaidTouchRecord = existing || {
    capturedAt: capturedAt.toISOString(),
    expiresAt: new Date(capturedAt.getTime() + PAID_TOUCH_TTL_MS).toISOString(),
    firstLandingPage: sanitizePageValue(window.location.href),
    firstReferrer: sanitizeReferrer(document.referrer),
    landingService: sanitizeText(input.landingService),
    landingCity: sanitizeText(input.landingCity),
  };
  const record: FirstPaidTouchRecord = {
    capturedAt: firstTouch.capturedAt,
    expiresAt: firstTouch.expiresAt,
    firstLandingPage: firstTouch.firstLandingPage,
    firstReferrer: firstTouch.firstReferrer,
    landingService: firstTouch.landingService || sanitizeText(input.landingService),
    landingCity: firstTouch.landingCity || sanitizeText(input.landingCity),
    ...currentQuery,
  };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Submission still receives the in-memory capture when storage is unavailable.
  }

  scrubPaidQueryFromVisibleUrl();
  return record;
}

export function mergeAttributionForSubmission(
  current: Record<string, unknown> = {},
): PaidAttributionSubmission {
  const currentAttribution = allowlistedAttribution(current);
  const firstTouch = readFirstPaidTouch();
  if (!firstTouch) return currentAttribution;

  return {
    ...firstTouch,
    ...currentAttribution,
    capturedAt: firstTouch.capturedAt,
    expiresAt: firstTouch.expiresAt,
    firstLandingPage: firstTouch.firstLandingPage,
    firstReferrer: firstTouch.firstReferrer,
    landingService: firstTouch.landingService,
    landingCity: firstTouch.landingCity,
  };
}

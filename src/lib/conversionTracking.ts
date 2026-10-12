"use client";

import { captureFirstPaidTouch, readFirstPaidTouch } from "@/lib/attribution";

export type FunnelEventName =
  | "paid_landing_view"
  | "quote_cta_click"
  | "quote_form_start"
  | "quote_step_complete"
  | "quote_details_open"
  | "quote_submit_attempt"
  | "quote_validation_error"
  | "lead_submit_accepted"
  | "lead_submit_failed"
  | "booking_cta_click"
  | "booking_handoff_started"
  | "website_phone_click"
  | "website_text_click"
  | "field_focus"
  | "field_complete"
  | "section_view"
  | "sticky_cta_click"
  | "page_exit";

export type FunnelEventPayload = {
  source?: string;
  service?: string;
  city?: string;
  page?: string;
  intent?: string;
  leadType?: string;
  ctaLocation?: string;
  validationField?: string;
  phoneLocation?: string;
  handoffId?: string;
  field?: string;
  section?: string;
  lastField?: string;
  maxScrollPct?: number;
  secondsOnPage?: number;
};

type FunnelVisitContext = {
  paid: boolean;
  device: "phone" | "desktop";
  internal: boolean;
};

type FunnelDataLayerEvent = {
  event: FunnelEventName;
  lead_source: string;
  page_path?: string;
  service?: string;
  city?: string;
  intent?: string;
  lead_type?: string;
  cta_location?: string;
  validation_field?: string;
  phone_location?: string;
  handoff_id?: string;
  field?: string;
  section?: string;
  last_field?: string;
  max_scroll_pct?: number;
  seconds_on_page?: number;
  paid: boolean;
  device: "phone" | "desktop";
  internal: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const googleTagManagerConfigured = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const googleAdsLeadConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL;
const googleAdsPhoneConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL;
const gtmGoogleAdsFormConfigured = process.env.NEXT_PUBLIC_GTM_GOOGLE_ADS_FORM_CONVERSION_CONFIGURED === "true";
const gtmGoogleAdsPhoneConfigured = process.env.NEXT_PUBLIC_GTM_GOOGLE_ADS_PHONE_CONVERSION_CONFIGURED === "true";
// Public URL only. No intake secret or customer form field belongs in a beacon.
const apexFunnelUrl = process.env.NEXT_PUBLIC_APEX_CRM_BASE_URL?.replace(/\/$/, "");
const paidServices = new Set([
  "Standard recurring cleaning", "Deep cleaning", "Move-in / move-out cleaning",
  "Post-construction cleaning", "Office / commercial cleaning", "Not sure yet",
]);
const paidCities = new Set(["Fresno", "Clovis", "Madera", "Woodward Park", "Fig Garden", "Tower District", "Fresno-area"]);
const paidIntents = new Set(["house", "move", "deep", "recurring", "postConstruction", "commercial"]);
const paidFields = new Set([
  "city", "bedrooms", "bathrooms", "name", "phone", "contactPreference", "smsOptIn",
  "requestedDate", "server_validation", "rate_limited", "server_error", "network", "unknown",
]);
const paidFunnelEvents = new Set<FunnelEventName>([
  "paid_landing_view", "quote_cta_click", "quote_form_start", "quote_step_complete",
  "quote_details_open", "quote_submit_attempt", "quote_validation_error", "lead_submit_accepted",
  "lead_submit_failed",
  "website_phone_click", "website_text_click", "field_focus", "field_complete",
  "section_view", "sticky_cta_click", "page_exit",
]);

const paidFormFields = new Set([
  "city", "service", "bedrooms", "bathrooms", "name", "phone", "email",
  "contactPreference", "smsOptIn", "timeline", "requestedDate", "sqft", "condition",
  "frequency", "message", "moveOutScopeConfirmed", "moveOutAddons", "organization",
  "propertyType", "commercialFrequency", "deadline", "scope", "walkthroughPreference",
]);
const paidSections = new Set(["hero", "form", "offer", "proof", "reviews", "faq", "footer"]);
let internalVisit = false;
let fallbackSessionId: string | undefined;

export function isPaidFormField(field: string): boolean {
  return paidFormFields.has(field);
}

function funnelVisitContext(): FunnelVisitContext {
  const attribution = readFirstPaidTouch() || captureFirstPaidTouch();
  const medium = attribution?.utm_medium?.trim().toLowerCase();
  internalVisit ||= new URLSearchParams(window.location.search).get("nsinternal") === "1";
  try {
    internalVisit ||= window.localStorage.getItem("ns_internal") === "1";
    if (internalVisit) window.localStorage.setItem("ns_internal", "1");
  } catch {
    // Keep the current visit tagged even when browser storage is blocked.
  }
  return {
    paid: Boolean(attribution?.gclid || attribution?.gbraid || attribution?.wbraid || medium === "cpc" || medium === "paid"),
    device: window.innerWidth < 768 ? "phone" : "desktop",
    internal: internalVisit,
  };
}

function paidSessionId(): string {
  const key = "nsc_paid_funnel_session";
  try {
    const existing = window.sessionStorage.getItem(key);
    if (existing && /^[0-9a-f-]{36}$/i.test(existing)) return existing;
    fallbackSessionId ||= window.crypto.randomUUID();
    window.sessionStorage.setItem(key, fallbackSessionId);
  } catch {
    fallbackSessionId ||= window.crypto.randomUUID();
  }
  return fallbackSessionId;
}

function sendPaidFunnelEvent(name: FunnelEventName, payload: FunnelEventPayload, context: FunnelVisitContext) {
  if (!apexFunnelUrl || payload.source !== "google-ads" || window.location.pathname !== "/google-ads" || !paidFunnelEvents.has(name)) return;
  try {
    // Exact fields only. The city input can contain ZIP/address/free text, so
    // unrecognized values never leave the browser as telemetry.
    const body = JSON.stringify({
      eventName: name,
      page: "/google-ads",
      serviceIntent: payload.service && paidServices.has(payload.service) ? payload.service : undefined,
      city: payload.city && paidCities.has(payload.city) ? payload.city : undefined,
      intent: payload.intent && paidIntents.has(payload.intent) ? payload.intent : undefined,
      step: name === "quote_step_complete" && payload.ctaLocation === "step_1" ? 1 : undefined,
      field: name === "quote_validation_error" || name === "lead_submit_failed"
        ? payload.validationField && paidFields.has(payload.validationField) ? payload.validationField : "unknown"
        : (name === "field_focus" || name === "field_complete") && payload.field && isPaidFormField(payload.field) ? payload.field : undefined,
      ...context,
      section: name === "section_view" && payload.section && paidSections.has(payload.section) ? payload.section : undefined,
      lastField: name === "page_exit" ? payload.lastField && isPaidFormField(payload.lastField) ? payload.lastField : "none" : undefined,
      maxScrollPct: name === "page_exit" && Number.isFinite(payload.maxScrollPct)
        ? Math.round(Math.min(100, Math.max(0, payload.maxScrollPct!)) / 10) * 10 : undefined,
      secondsOnPage: name === "page_exit" && Number.isFinite(payload.secondsOnPage)
        ? Math.min(600, Math.max(0, Math.floor(payload.secondsOnPage!))) : undefined,
      sessionId: paidSessionId(),
      occurredAt: new Date().toISOString(),
    });
    const url = `${apexFunnelUrl}/api/public/funnel-events`;
    // text/plain is CORS-safelisted: no preflight to lose a navigation beacon.
    if (!navigator.sendBeacon?.(url, new Blob([body], { type: "text/plain" }))) {
      void fetch(url, { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } }).catch(() => {});
    }
  } catch {
    // Measurement must never interrupt a quote or conversion.
  }
}

export const googleAdsConversionReadiness = {
  form: googleTagManagerConfigured
    ? gtmGoogleAdsFormConfigured
    : Boolean(googleAdsConversionId && googleAdsLeadConversionLabel),
  phone: googleTagManagerConfigured
    ? gtmGoogleAdsPhoneConfigured
    : Boolean(googleAdsConversionId && googleAdsPhoneConversionLabel),
};

function funnelEvent(
  name: FunnelEventName,
  payload: FunnelEventPayload,
  context: FunnelVisitContext,
): FunnelDataLayerEvent {
  return {
    event: name,
    lead_source: payload.source || "website",
    page_path:
      payload.page ||
      (typeof window !== "undefined" ? window.location.pathname : undefined),
    service: payload.service || undefined,
    city: payload.city || undefined,
    intent: payload.intent || undefined,
    lead_type: payload.leadType || undefined,
    cta_location: payload.ctaLocation || undefined,
    validation_field: payload.validationField || undefined,
    phone_location: payload.phoneLocation || undefined,
    handoff_id: payload.handoffId || undefined,
    field: payload.field && isPaidFormField(payload.field) ? payload.field : undefined,
    section: payload.section && paidSections.has(payload.section) ? payload.section : undefined,
    last_field: payload.lastField === "none" || (payload.lastField && isPaidFormField(payload.lastField)) ? payload.lastField : undefined,
    max_scroll_pct: payload.maxScrollPct,
    seconds_on_page: payload.secondsOnPage,
    ...context,
  };
}

export function trackFunnelEvent(
  name: FunnelEventName,
  payload: FunnelEventPayload = {},
) {
  if (typeof window === "undefined") return;

  const context = funnelVisitContext();
  const event = funnelEvent(name, payload, context);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  sendPaidFunnelEvent(name, payload, context);

  if (!googleTagManagerConfigured && typeof window.gtag === "function") {
    window.gtag("event", name, event);
  }
}

export function trackLeadConversion(payload: FunnelEventPayload = {}) {
  if (typeof window === "undefined") return;

  trackFunnelEvent("lead_submit_accepted", payload);

  if (!googleTagManagerConfigured && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Lead",
      event_label: payload.source || "website",
      lead_type: payload.leadType || "quote_request",
      service: payload.service || undefined,
      city: payload.city || undefined,
    });

    if (googleAdsConversionId && googleAdsLeadConversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsConversionId}/${googleAdsLeadConversionLabel}`,
      });
    }
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: payload.leadType || "quote_request",
      content_category: payload.service || undefined,
      city: payload.city || undefined,
    });
  }
}

export function trackWebsitePhoneClick(payload: FunnelEventPayload = {}) {
  trackFunnelEvent("website_phone_click", payload);
}

export function trackWebsiteTextClick(payload: FunnelEventPayload = {}) {
  trackFunnelEvent("website_text_click", payload);
}

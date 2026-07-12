"use client";

export type FunnelEventName =
  | "paid_landing_view"
  | "quote_cta_click"
  | "quote_form_start"
  | "quote_validation_error"
  | "lead_submit_accepted"
  | "website_phone_click";

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
  };
}

export function trackFunnelEvent(
  name: FunnelEventName,
  payload: FunnelEventPayload = {},
) {
  if (typeof window === "undefined") return;

  const event = funnelEvent(name, payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

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

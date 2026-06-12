"use client";

type LeadConversionPayload = {
  source?: string;
  service?: string;
  city?: string;
  page?: string;
  leadType?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
const googleAdsLeadConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_LABEL;

function leadEvent(payload: LeadConversionPayload) {
  return {
    event: "lead_submit",
    lead_source: payload.source || "website",
    lead_type: payload.leadType || "quote_request",
    service: payload.service || undefined,
    city: payload.city || undefined,
    page_path: payload.page || (typeof window !== "undefined" ? window.location.pathname : undefined),
  };
}

export function trackLeadConversion(payload: LeadConversionPayload = {}) {
  if (typeof window === "undefined") return;

  const event = leadEvent(payload);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "Lead",
      event_label: event.lead_source,
      lead_type: event.lead_type,
      service: event.service,
      city: event.city,
    });

    if (googleAdsConversionId && googleAdsLeadConversionLabel) {
      window.gtag("event", "conversion", {
        send_to: `${googleAdsConversionId}/${googleAdsLeadConversionLabel}`,
      });
    }
  }

  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_name: event.lead_type,
      content_category: event.service,
      city: event.city,
    });
  }
}

const MAX_MOVE_OUT_ADDONS = 20;
const MAX_ADDON_LENGTH = 160;

// Apex pins its server-side "paid leads must include a customer city or ZIP"
// check to this exact marker. Do not change the string without a matching
// Apex release; bumping it silently disables that enforcement.
export const PAID_LEAD_WEBSITE_API_VERSION = "2026-07-29-paid-location-scope-v2";

export type NormalizedPaidLeadSubmission = {
  name?: string;
  phone?: string;
  city?: string;
  moveOutAddons: string[];
};

export type PaidLeadForwardPayload = {
  [key: string]: unknown;
  firstName: string;
  phone: string;
  source: string;
};

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeMoveOutAddons(value: unknown): string[] {
  const values = Array.isArray(value) ? value : optionalText(value) ? [value] : [];
  const normalized = values
    .map(optionalText)
    .filter((item): item is string => Boolean(item))
    .map((item) => item.slice(0, MAX_ADDON_LENGTH));

  return Array.from(new Set(normalized)).slice(0, MAX_MOVE_OUT_ADDONS);
}

function splitName(value: string | undefined): { firstName: string; lastName?: string } {
  const parts = (value || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || undefined,
  };
}

export function normalizePaidLeadSubmission(
  body: Record<string, unknown>,
): NormalizedPaidLeadSubmission {
  return {
    name: optionalText(body.name),
    phone: optionalText(body.phone),
    city: optionalText(body.city),
    moveOutAddons: normalizeMoveOutAddons(body.moveOutAddons),
  };
}

// The exact payload forwarded to Apex for a paid lead. Every qualification
// answer travels as its own canonical field: Apex strips legacy
// "Label: value" lines out of the customer message, so anything packed into
// message text is lost to normalization. `message` carries only the visitor's
// own words.
export function buildPaidLeadForward(body: Record<string, unknown>): PaidLeadForwardPayload {
  const { name, phone, city, moveOutAddons } = normalizePaidLeadSubmission(body);
  const { firstName, lastName } = splitName(name);
  const submissionId = optionalText(body.submissionId);

  return {
    submissionId,
    idempotencyKey: optionalText(body.idempotencyKey) || submissionId,
    sourceForm: optionalText(body.sourceForm) || "google_ads_landing_quote_form",
    firstName,
    lastName,
    phone: phone || "",
    email: optionalText(body.email),
    city,
    service: optionalText(body.service),
    message: optionalText(body.message),
    source: "google_ads",
    page: optionalText(body.page) || "/google-ads",
    homeSize:
      optionalText(body.homeSize) || optionalText(body.homesize) || optionalText(body.sqft),
    bedrooms: optionalText(body.bedrooms),
    bathrooms: optionalText(body.bathrooms),
    // A timeline token ("this-week") is urgency, not an appointment request.
    // Only a real date field may become requestedDate.
    timeline: optionalText(body.timeline),
    requestedDate: optionalText(body.date) || optionalText(body.requestedDate),
    frequency: optionalText(body.frequency),
    condition: optionalText(body.condition),
    contactPreference: optionalText(body.contactPreference),
    preferredTime: optionalText(body.preferredTime),
    moveOutAddons,
    moveOutScopeConfirmed: body.moveOutScopeConfirmed === true,
    organization: optionalText(body.organization),
    bookingIntent: optionalText(body.bookingIntent) || "paid-search-quote-request",
    smsConsent: optionalText(body.smsConsent) || "service_related_quote_follow_up",
    consentText: optionalText(body.consentText),
    firstLandingPage: optionalText(body.firstLandingPage),
    firstReferrer: optionalText(body.firstReferrer),
    landingService: optionalText(body.landingService),
    landingCity: optionalText(body.landingCity),
    capturedAt: optionalText(body.capturedAt),
    utm_source: optionalText(body.utm_source),
    utm_medium: optionalText(body.utm_medium),
    utm_campaign: optionalText(body.utm_campaign),
    utm_content: optionalText(body.utm_content),
    utm_term: optionalText(body.utm_term),
    gclid: optionalText(body.gclid),
    gbraid: optionalText(body.gbraid),
    wbraid: optionalText(body.wbraid),
    fbclid: optionalText(body.fbclid),
    submittedAt: optionalText(body.submittedAt),
    websiteApiVersion: PAID_LEAD_WEBSITE_API_VERSION,
  };
}

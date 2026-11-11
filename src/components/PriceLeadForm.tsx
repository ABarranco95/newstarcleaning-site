"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { mergeAttributionForSubmission, sanitizeReferrer } from "@/lib/attribution";
import { completedHome, paidSessionId, trackFunnelEvent, trackLeadConversion } from "@/lib/conversionTracking";
import { createSubmissionId } from "@/lib/submissionId";
import { buildQuoteSmsConsent, QUOTE_SMS_DISCLOSURE } from "@/lib/quoteSmsConsent";
import { serviceAreaToday, specificDeadlineError } from "@/lib/assistedIntakeValidation";
import BookingPrefillLink from "@/components/BookingPrefillLink";
import PaidQuoteStickyCTA from "@/components/PaidQuoteStickyCTA";
import PaidPriceBookingButton from "@/components/PaidPriceBookingButton";
import { acceptedPrefillSnapshot, allowedPrefillPair, bookingAttributionSnapshot, type BookingPrefillPayload } from "@/lib/bookingPrefill";
import { useMarket } from "@/components/MarketProvider";
import { marketForCity, normalizedZip, type MarketId } from "@/lib/markets";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import usePaidPriceRange from "@/lib/usePaidPriceRange";
import { PAID_HOME_SIZES, paidHomeSize, paidLeadHomeSize } from "@/lib/paidHomeSize";
import { claimFormStart, claimPriceView, ensureQuoteDraft, updateQuoteDraft, useQuoteDraft } from "@/lib/quoteDraft";

export type ResidentialService = "Standard recurring cleaning" | "Deep cleaning" | "Move-in / move-out cleaning";

export const RESIDENTIAL_SERVICES: ReadonlyArray<{ value: ResidentialService; label: string }> = [
  { value: "Standard recurring cleaning", label: "Standard" },
  { value: "Deep cleaning", label: "Deep" },
  { value: "Move-in / move-out cleaning", label: "Move-out" },
];

const serviceCaptions: Record<string, string> = {
  "Standard recurring cleaning": "Standard cleaning",
  "Not sure yet": "Standard cleaning",
  "Deep cleaning": "Deep cleaning",
  "Move-in / move-out cleaning": "Move-in / move-out cleaning",
};

export function serviceCaption(service: string): string {
  return serviceCaptions[service] ?? service;
}

export function isCommercialService(service: string): boolean {
  const value = service.toLowerCase();
  return value.includes("commercial") || value.includes("office") || value.includes("post-construction");
}

export function normalizeServiceParam(value: string | null): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase();
  if (
    normalized === "recurring-cleaning" ||
    normalized === "recurring" ||
    normalized === "weekly-cleaning" ||
    normalized === "biweekly-cleaning" ||
    normalized === "monthly-cleaning" ||
    normalized === "standard-cleaning" ||
    normalized === "standard"
  ) {
    return "Standard recurring cleaning";
  }
  if (normalized === "deep-cleaning" || normalized === "deep") return "Deep cleaning";
  if (
    normalized === "move-out-cleaning" ||
    normalized === "move-out cleaning" ||
    normalized === "move-in / move-out cleaning" ||
    normalized === "move-out" ||
    normalized === "moveinout"
  ) {
    return "Move-in / move-out cleaning";
  }
  if (normalized === "post-construction-cleaning" || normalized === "post-construction") return "Post-construction cleaning";
  if (normalized === "commercial-cleaning" || normalized === "office-cleaning" || normalized === "commercial") return "Office / commercial cleaning";
  return ["Post-construction cleaning", "Office / commercial cleaning", "Not sure yet", ...RESIDENTIAL_SERVICES.map((item) => item.value)].includes(value) ? value : "";
}

export function normalizeFrequencyParam(value: string | null): string {
  if (!value) return "";
  const normalized = value.trim().toLowerCase().replace(/_/g, "-");
  const frequencies: Record<string, string> = { weekly: "weekly", biweekly: "bi-weekly", "bi-weekly": "bi-weekly", monthly: "monthly" };
  return frequencies[normalized] || "";
}

const bedroomsOptions = ["1", "2", "3", "4", "5", "6+"];
const bathroomsOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];

// Empty cabinet, drawer, and closet interiors are included in move-out.
const moveOutAddons = [
  "Inside oven",
  "Inside refrigerator",
  "Interior window glass",
  "Garage, patio, or balcony sweeping",
  "Extra blind detail",
  "Heavy pet hair or heavy buildup",
];

// Apex's current timeline enum cannot represent a two-week window. Keep its
// canonical values and preserve the exact chip answer in the existing notes.
const paidMoveTimingChoices = [
  { value: "this-week", label: "This week", timeline: "this-week" },
  { value: "next-2-weeks", label: "Next 2 weeks", timeline: "unknown" },
  { value: "later", label: "Later", timeline: "flexible" },
  { value: "not-sure", label: "Not sure", timeline: "unknown" },
] as const;

type ContactState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
  frequency: string;
  timeline: string;
  requestedDate: string;
  contactPreference: string;
  condition: string;
  organization: string;
  quoteWebsiteUrl: string;
};

type SentState = {
  firstWord: string;
  phone: string;
  smsOptIn: boolean;
  line: string;
  price: string;
  ready: boolean;
  market: MarketId;
  acceptedSnapshot: BookingPrefillPayload | null;
  accepted: boolean;
  commercial: boolean;
};

type LeadResponse = {
  error?: string;
  details?: unknown;
  filtered?: boolean;
  metadata?: { apex?: { success?: boolean } };
};

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Spec §4: network, 429, 5xx and an unconfirmed receipt all keep the details
// and offer the call/text recovery. Only a server 400 shows its own message.
const SEND_FAILED_MESSAGE =
  "We couldn't send your request. Your details are still here, so you can try again, or call or text us for your price.";

const emptyContact: ContactState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  message: "",
  frequency: "",
  timeline: "",
  requestedDate: "",
  contactPreference: "",
  condition: "",
  organization: "",
  quoteWebsiteUrl: "",
};

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function firstInvalidControl(root: ParentNode | null): FormControl | null {
  if (!root) return null;
  const controls = root.querySelectorAll<FormControl>("input, select, textarea");
  for (const control of controls) {
    if (!control.disabled && !control.checkValidity()) return control;
  }
  return null;
}

// The page origin, read after hydration (the server snapshot is empty).
const subscribeOrigin = () => () => {};
const readOrigin = () => window.location.origin;
const serverOrigin = () => "";

// PaidPriceBookingButton renders nothing unless the site and booking origins
// are an allowed pair (the production hosts, or both loopback). Same check, so
// the booking notes never show without their button.
function bookingButtonRenders(siteOrigin: string, bookingUrl: string | null): boolean {
  if (!siteOrigin || !bookingUrl) return false;
  try {
    const url = new URL(bookingUrl);
    return allowedPrefillPair(siteOrigin, url.origin) && ["/book", "/book/"].includes(url.pathname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export type PriceLeadFormProps = {
  placement: "hero" | "page";
  source: string;
  priceSource?: string;
  service?: string;
  defaultCity?: string;
  market?: MarketId;
  id?: string;
  paidSearch?: boolean;
  landingCity?: string;
  submitLabel?: string;
  submitAlternative?: ReactNode;
  decisionProof?: ReactNode;
  stickyPaidCta?: boolean;
  onStickyPaidClick?: () => void;
  directBookingUrl?: string | null;
};

export default function PriceLeadForm(props: PriceLeadFormProps) {
  const pathname = usePathname();
  return <PriceLeadFormContent key={pathname} {...props} pathname={pathname} />;
}

function PriceLeadFormContent({
  placement,
  source,
  priceSource,
  service,
  defaultCity,
  market,
  id,
  paidSearch = false,
  landingCity,
  submitLabel,
  submitAlternative,
  decisionProof,
  stickyPaidCta = false,
  onStickyPaidClick,
  directBookingUrl,
  pathname,
}: PriceLeadFormProps & { pathname: string }) {
  const BUSINESS = useMarket(market);
  const draft = useQuoteDraft(pathname);
  const siteOrigin = useSyncExternalStore(subscribeOrigin, readOrigin, serverOrigin);
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;
  // A commercial or post-construction page, or a commercial ?service= on the
  // page placement, is a walkthrough request: one contact screen, no price.
  const [queryWalkthrough, setQueryWalkthrough] = useState("");
  const walkthroughService = isCommercialService(service || "") ? service || "" : queryWalkthrough;
  const walkthrough = Boolean(walkthroughService);
  const [step, setStep] = useState<"price" | "contact" | "sent">(walkthrough ? "contact" : "price");
  const [homeExpanded, setHomeExpanded] = useState(false);
  const [contact, setContact] = useState<ContactState>(emptyContact);
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [moveOutAddonsSelected, setMoveOutAddonsSelected] = useState<string[]>([]);
  const [moveOutScopeConfirmed, setMoveOutScopeConfirmed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsOpened, setDetailsOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<SentState | null>(null);
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [prefillFrequency, setPrefillFrequency] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const submissionIdRef = useRef("");
  const submitInFlightRef = useRef(false);

  const pinnedService = paidSearch ? service || "" : "";
  const leadService = walkthrough ? walkthroughService : draft.service;
  const postal = normalizedZip(draft.zip);
  const sizeBand = paidHomeSize(draft.size);
  const sizeLabel = sizeBand?.label ?? draft.size;
  const openEnded = draft.bedrooms.endsWith("+") || draft.bathrooms.endsWith("+");
  const price = usePaidPriceRange({
    enabled: !walkthrough && Boolean(postal),
    service: leadService,
    bedrooms: draft.bedrooms,
    bathrooms: draft.bathrooms,
    sqft: draft.size,
    market: BUSINESS.id,
    zip: postal,
  });
  const ready = !walkthrough && postal && price.status === "ready" ? price : null;
  // Nothing on screen 1 leads on until the ZIP is valid (spec s4): a lead must
  // carry its location, and paid leads are refused without one.
  const directQuote = Boolean(postal) && (price.status === "custom" || openEnded);
  const askState = !directQuote && !ready && Boolean(postal) && price.status === "zip-required";
  const loading = Boolean(postal) && price.status === "loading" && !directQuote;
  const marketId = ready?.market ?? BUSINESS.id;
  const resolvedBookingUrl = directBookingUrl === undefined ? resolveDirectBookingUrl() : directBookingUrl;
  const bookableService: ResidentialService =
    draft.service === "Deep cleaning" || draft.service === "Move-in / move-out cleaning" ? draft.service : "Standard recurring cleaning";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryZip = normalizedZip(params.get("zip") || params.get("nsc_zip")) || "";
    const queryService = normalizeServiceParam(params.get("service") || null);
    // The page's own service wins over ?service=, as both old forms did. A
    // commercial ?service= opens the walkthrough on the page placement only;
    // the shared price draft (and so the hero) stays residential.
    const commercialQuery = isCommercialService(queryService);
    if (commercialQuery && placement === "page" && !service) setQueryWalkthrough(queryService);
    const draftService = isCommercialService(service || "") ? "" : service || (commercialQuery ? "" : queryService);
    ensureQuoteDraft(pathname, {
      ...(draftService ? { service: draftService } : {}),
      ...(queryZip ? { zip: queryZip } : {}),
    });
    setPrefillFrequency(normalizeFrequencyParam(params.get("frequency") || null));
    const capture: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid", "fbclid"].forEach((key) => {
      const value = params.get(key);
      if (value) capture[key] = value;
    });
    const referrer = sanitizeReferrer(document.referrer);
    if (referrer) capture.referrer = referrer;
    setTracking(capture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A price becomes ready once; both placements share the set, so the same
  // price is never reported twice on one page.
  const priceLowCents = ready?.priceLowCents;
  const priceHighCents = ready?.priceHighCents;
  const readyMarket = ready?.market;
  useEffect(() => {
    if (!readyMarket || priceLowCents === undefined) return;
    const key = JSON.stringify([draft.service, draft.bedrooms, draft.bathrooms, draft.size, postal, readyMarket, priceLowCents, priceHighCents]);
    if (!claimPriceView(key)) return;
    trackFunnelEvent("price_view", {
      source: priceSource || source,
      service: leadService,
      home: { priceLowCents, priceHighCents },
    });
  }, [draft.service, leadService, draft.bedrooms, draft.bathrooms, draft.size, postal, readyMarket, priceLowCents, priceHighCents, priceSource, source]);

  const trackFormStart = () => {
    if (!claimFormStart()) return;
    trackFunnelEvent("quote_form_start", { source, service: leadService, city: postal || draft.zip, page: window.location.pathname });
  };

  const page = () => window.location.pathname;

  const focusStepTitle = () => {
    const card = containerRef.current;
    if (card) {
      const box = card.getBoundingClientRect();
      const scrollMarginTop = parseFloat(window.getComputedStyle(card).scrollMarginTop) || 0;
      if (box.top < scrollMarginTop || box.bottom > window.innerHeight) card.scrollIntoView({ block: "start" });
    }
    titleRef.current?.focus({ preventScroll: true });
  };

  const fieldError = (name: string) => fieldErrors[name];

  const markInvalid = (control: FormControl) => {
    const messages: Record<string, string> = {
      name: "Enter your name.",
      phone: "Enter a 10-digit phone number.",
      requestedDate: specificDeadlineError(contact) || "Choose the date you need it by.",
    };
    const message = messages[control.name] || control.validationMessage || "Check this field.";
    setFieldErrors((current) => ({ ...current, [control.name]: message }));
    control.setAttribute("aria-invalid", "true");
    control.focus({ preventScroll: true });
  };

  const clearInvalid = (control: FormControl) => {
    if (!fieldErrors[control.name]) return;
    if (!control.checkValidity()) return;
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[control.name];
      return next;
    });
    control.removeAttribute("aria-invalid");
  };

  const setContactField = (key: keyof ContactState, value: string) => {
    trackFormStart();
    setContact((current) => ({
      ...current,
      [key]: value,
      ...(key === "timeline" && value !== "specific-deadline" ? { requestedDate: "" } : {}),
    }));
  };

  const openContact = () => {
    if (ready || askState || directQuote) {
      trackFunnelEvent("quote_step_complete", {
        source,
        service: leadService,
        city: postal || draft.zip,
        page: page(),
        ctaLocation: "step_1",
        home: completedHome({ bedrooms: draft.bedrooms, bathrooms: draft.bathrooms, sqft: draft.size, city: postal || "", service: draft.service }, ready?.priceLowCents, ready?.priceHighCents),
      });
    }
    setError("");
    setStep("contact");
    window.setTimeout(focusStepTitle, 0);
  };

  const returnToPrice = () => {
    setError("");
    setStep("price");
    window.setTimeout(() => zipRef.current?.focus({ preventScroll: true }), 0);
  };

  const postedContactPreference = smsOptIn && !contact.contactPreference ? "text" : contact.contactPreference;
  const paidMoveTimingChoice = paidSearch && draft.service === "Move-in / move-out cleaning"
    ? paidMoveTimingChoices.find((choice) => choice.value === contact.timeline)
    : undefined;
  const postedTimeline = paidMoveTimingChoice?.timeline || contact.timeline;
  const leadHomeSize = walkthrough ? "" : paidLeadHomeSize(draft.size);
  const leadBedrooms = walkthrough ? "" : draft.bedrooms;
  const leadBathrooms = walkthrough ? "" : draft.bathrooms;
  const leadFrequency = walkthrough ? "" : contact.frequency || prefillFrequency;
  const priceNote = ready ? ready.note : "";
  const assembledMessage = walkthrough
    ? contact.message
    : [
        contact.message,
        sizeBand ? `Home size selected: ${sizeLabel} sq ft.` : "",
        paidMoveTimingChoice ? `Move cleaning timing requested: ${paidMoveTimingChoice.label}.` : "",
        priceNote,
      ].filter(Boolean).join("\n\n");
  // A page default is context, not a customer-confirmed address. Use it only
  // when Apex has resolved this ZIP to the same market.
  const postedCity = walkthrough ? contact.city : ready && defaultCity && marketForCity(defaultCity) === ready.market ? defaultCity : postal || "";
  const postedZip = walkthrough ? normalizedZip(contact.city) || "" : postal || "";

  const formForSnapshot = {
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    city: postedCity,
    zip: postedZip,
    service: leadService,
    message: assembledMessage,
    frequency: leadFrequency,
    bedrooms: leadBedrooms,
    bathrooms: leadBathrooms,
    sqft: leadHomeSize,
    timeline: postedTimeline,
    requestedDate: contactedDate(),
    contactPreference: postedContactPreference,
    condition: contact.condition,
    moveOutAddons: moveOutAddonsSelected,
    moveOutScopeConfirmed,
    organization: contact.organization,
    propertyType: walkthrough ? "commercial" : "house",
  };

  function contactedDate() {
    return postedTimeline === "specific-deadline" ? contact.requestedDate : "";
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Synchronous guard: Enter/requestSubmit can run again before React paints
    // the disabled button. Release in finally so a failed request can retry.
    if (submitInFlightRef.current) return;
    // The other placement can edit the shared ZIP while this contact step is open.
    if (!walkthrough && !postal) {
      returnToPrice();
      return;
    }
    const formElement = event.currentTarget;
    const invalid = firstInvalidControl(formElement);
    if (invalid) {
      markInvalid(invalid);
      return;
    }
    const moveTiming = specificDeadlineError({ timeline: postedTimeline, requestedDate: contact.requestedDate });
    if (moveTiming) {
      setError(moveTiming);
      return;
    }
    trackFunnelEvent("quote_step_complete", {
      source,
      service: leadService,
      city: postal || contact.city,
      page: page(),
      ctaLocation: walkthrough ? "step_1" : "step_2",
    });
    const location = { zip: postedZip, market: ready ? ready.market : BUSINESS.id };
    const prefill = acceptedPrefillSnapshot({ ...formForSnapshot, ...location }, true, false);
    const submittedSnapshot = prefill ? Object.freeze({ ...prefill, ...bookingAttributionSnapshot(tracking), funnelSessionId: paidSessionId() }) : null;
    trackFunnelEvent("quote_submit_attempt", { source, service: leadService, city: postal || contact.city, page: page() });
    setIsSubmitting(true);
    setError("");

    try {
      submitInFlightRef.current = true;
      const attribution = mergeAttributionForSubmission({
        ...tracking,
        firstLandingPage: page(),
        firstReferrer: document.referrer,
        landingService: leadService,
        landingCity,
      });
      const endpoint = paidSearch ? "/api/google-ads-lead" : "/api/lead";
      if (!submissionIdRef.current) submissionIdRef.current = createSubmissionId();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...location,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          city: postedCity,
          zip: postedZip,
          service: leadService,
          message: assembledMessage,
          frequency: leadFrequency,
          bedrooms: leadBedrooms,
          bathrooms: leadBathrooms,
          sqft: leadHomeSize,
          timeline: postedTimeline,
          requestedDate: postedTimeline === "specific-deadline" ? contact.requestedDate : undefined,
          contactPreference: postedContactPreference,
          preferredTime: "",
          bookingIntent: "",
          condition: contact.condition,
          moveOutAddons: moveOutAddonsSelected,
          moveOutScopeConfirmed,
          organization: contact.organization,
          quoteWebsiteUrl: contact.quoteWebsiteUrl,
          ...tracking,
          ...attribution,
          homeSize: leadHomeSize,
          source,
          sourceForm: source,
          funnelSessionId: paidSessionId(),
          nsinternal: new URLSearchParams(window.location.search).get("nsinternal") === "1" ? "1" : undefined,
          submissionId: submissionIdRef.current,
          page: page(),
          submittedAt: new Date().toISOString(),
          smsConsent: buildQuoteSmsConsent(smsOptIn, postedContactPreference, source),
          consentText: QUOTE_SMS_DISCLOSURE,
        }),
      }).catch(() => {
        if (paidSearch) {
          try {
            trackFunnelEvent("lead_submit_failed", { source, service: leadService, city: postal || contact.city, page: page(), validationField: "network" });
          } catch {
            // Even a failing analytics tag must not change submit recovery.
          }
        }
        throw new Error(SEND_FAILED_MESSAGE);
      });

      const data = (await response.json().catch(() => ({}))) as LeadResponse;

      if (!response.ok) {
        if (paidSearch) {
          try {
            trackFunnelEvent("lead_submit_failed", {
              source,
              service: leadService,
              city: postal || contact.city,
              page: page(),
              validationField: response.status === 429 ? "rate_limited" : response.status === 400 ? "server_validation" : response.status >= 500 ? "server_error" : "unknown",
            });
          } catch {
            // ignore analytics failures
          }
        }
        if (response.status === 400) {
          trackFunnelEvent("quote_validation_error", { source, service: leadService, city: postal || contact.city, page: page(), validationField: "server_validation" });
        }
        if (response.status !== 400) throw new Error(SEND_FAILED_MESSAGE);
        const details = Array.isArray(data.details) ? (data.details[0] as string | undefined) : undefined;
        const errorMsg = typeof data.error === "string" ? data.error : undefined;
        throw new Error(errorMsg || details || SEND_FAILED_MESSAGE);
      }

      // Only fire conversion pixels for real Apex-accepted leads.
      // Honeypot-filtered bot submissions return { filtered: true } — show the
      // bot a success state but never fire a conversion or pollute attribution.
      const apexAccepted = data.filtered !== true && data.metadata?.apex?.success === true;
      if (paidSearch && !apexAccepted) throw new Error(SEND_FAILED_MESSAGE);
      if (!paidSearch && data.filtered !== true && !apexAccepted) throw new Error(SEND_FAILED_MESSAGE);

      if (apexAccepted) {
        trackLeadConversion({ source, service: leadService, city: postal || contact.city, page: page(), leadType: "quote_request" });
      }

      const summaryLine = walkthrough
        ? ""
        : `${serviceCaption(draft.service)} · ${draft.bedrooms} bed · ${draft.bathrooms} bath · ${sizeLabel} sq ft${postedZip ? ` · ${postedZip}` : ""}`;
      setSent({
        firstWord: contact.name.trim().split(/\s+/)[0] || "",
        phone: contact.phone.trim(),
        smsOptIn,
        line: summaryLine,
        price: ready ? ready.range ?? ready.low : "Price confirmed with you",
        ready: Boolean(ready),
        market: marketId,
        acceptedSnapshot: apexAccepted ? submittedSnapshot : null,
        accepted: apexAccepted && submittedSnapshot !== null,
        commercial: walkthrough,
      });
      setIsSubmitting(false);
      setStep("sent");
      submissionIdRef.current = "";
      setContact(emptyContact);
      setSmsOptIn(false);
      setMoveOutAddonsSelected([]);
      setMoveOutScopeConfirmed(false);
      setShowDetails(false);
      setDetailsOpened(false);
      window.setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 0);
      return;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We couldn't send your request. Your details are still here, so you can try again, or call or text us for your price.",
      );
    } finally {
      submitInFlightRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleStickySubmit = () => {
    if (isSubmitting) return;
    onStickyPaidClick?.();
    if (!walkthrough && step === "price") {
      if (ready || askState || directQuote) openContact();
      else {
        const card = containerRef.current;
        if (card) {
          const box = card.getBoundingClientRect();
          const scrollMarginTop = parseFloat(window.getComputedStyle(card).scrollMarginTop) || 0;
          if (box.top < scrollMarginTop || box.bottom > window.innerHeight) card.scrollIntoView({ block: "start" });
        }
        zipRef.current?.focus({ preventScroll: true });
      }
      return;
    }
    const form = formRef.current;
    if (!form) return;
    const invalid = firstInvalidControl(form);
    if (invalid) {
      markInvalid(invalid);
      return;
    }
    form.requestSubmit();
  };

  const submitText = isSubmitting
    ? "Sending…"
    : smsOptIn
      ? paidSearch && submitLabel
        ? submitLabel
        : "Text me my price"
      : "Request my price";

  const summaryPrice = ready ? ready.range ?? ready.low : "Price confirmed with you";
  const serviceName = serviceCaption(draft.service);
  const showBooking = Boolean(ready?.bookableSqft && bookingButtonRenders(siteOrigin, resolvedBookingUrl) &&
    (!paidSearch || draft.service === "Deep cleaning" || draft.service === "Not sure yet" || draft.service === "Move-in / move-out cleaning"));
  const twoDayNotice = showBooking && ready?.market === "southbay";

  const renderPriceOutput = () => {
    if (directQuote) {
      return (
        <>
          <p className="ns-price-prompt">{openEnded ? "This home needs a direct quote." : "Homes over 5,500 sq ft get a direct quote."}</p>
          <p className="ns-price-help">Send us the home and we&apos;ll price it with you.</p>
        </>
      );
    }
    if (ready) {
      return (
        <>
          <p className="ns-price-label">Your price</p>
          <p className="ns-price-value">{ready.range ?? ready.low}</p>
          <p className="ns-price-caption">{serviceName} · {draft.bedrooms} bed · {draft.bathrooms} bath · {sizeLabel} sq ft</p>
          {ready.biweekly ? <p className="ns-price-recurring">Every other week: <strong>{ready.biweekly}</strong> a visit</p> : null}
          {ready.range ? <p className="ns-price-help">A kept-up home lands near the low end. More buildup or a bigger home moves it up.</p> : null}
        </>
      );
    }
    if (loading) {
      return (
        <div className="ns-price-loading" aria-label="Checking your price">
          <span />
          <span />
        </div>
      );
    }
    if (askState) {
      return (
        <>
          <p className="ns-price-prompt">We don&apos;t have an online price for that ZIP yet.</p>
          <p className="ns-price-help">Send us the home and we&apos;ll check the address and price it with you.</p>
        </>
      );
    }
    return <p className="ns-price-prompt">Enter your ZIP to see your price.</p>;
  };

  const renderActions = () => {
    if (directQuote || askState) {
      return (
        <div className="nq-actions">
          <div>
            <button type="button" className="home-button" data-quote-next onClick={openContact}>
              Ask us for a quote <ArrowIcon />
            </button>
            <p className="nq-note">{ready ? "We'll confirm your exact price and the days we have open. Nothing is booked until you say so." : "Leave a name and number and we'll get back to you during the day."}</p>
          </div>
          <div className="ns-price-contact">
            <a href={BUSINESS.phoneHref} className="home-button-secondary" data-phone-location="organic_price">Call {BUSINESS.phoneDisplay}</a>
            <a href={BUSINESS.phoneHref.replace("tel:", "sms:")} className="home-button-secondary">Text us</a>
          </div>
        </div>
      );
    }
    if (!ready) return null;
    return (
      <div className="nq-actions">
        <div>
          <button type="button" className="home-button" data-quote-next onClick={openContact}>
            Text me this price <ArrowIcon />
          </button>
          <p className="nq-note">We&apos;ll confirm your exact price and the days we have open. Nothing is booked until you say so.</p>
        </div>
        {showBooking && resolvedBookingUrl ? (
          <div>
            <PaidPriceBookingButton
              key={`${draft.service}-${draft.bedrooms}-${draft.bathrooms}-${draft.size}-${postal}-${ready.market}`}
              primary={false}
              baseUrl={resolvedBookingUrl}
              service={bookableService}
              bedrooms={draft.bedrooms}
              bathrooms={draft.bathrooms}
              squareFeet={ready.bookableSqft!}
              zip={postal}
              market={ready.market}
              source={source}
              ctaLocation={paidSearch ? "paid_live_price" : "organic_live_price"}
            />
          </div>
        ) : null}
        {twoDayNotice ? <p className="nq-note">Online booking needs two days&apos; notice.</p> : null}
      </div>
    );
  };

  if (step === "sent" && sent) {
    return (
      <div className={`${placement === "hero" ? "ns-price-picker" : "nq-form"} ${paidSearch ? "scroll-mt-4" : "scroll-mt-22"}`} id={placement === "hero" ? id : undefined} data-price-picker={placement === "hero" ? true : undefined} data-market-price={sent.market} ref={containerRef}>
        <div className="nq-sent">
          <div className="qf-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="ns-icon"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h2 ref={titleRef} tabIndex={-1}>{sent.firstWord ? `Got it, ${sent.firstWord}.` : "Got it."}</h2>
          {sent.line ? (
            <div className="nq-sent-summary">
              <p className="nq-summary-line">{sent.line}</p>
              <p className="nq-summary-price">{sent.price}</p>
            </div>
          ) : null}
          <p className="nq-sent-next">
            {sent.commercial
              ? "We'll be in touch during the day about your property or project."
              : sent.smsOptIn
                ? `We'll text ${sent.phone} with ${sent.ready ? "your exact price and the days we have open" : "a price for your home"}. The text comes from ${BUSINESS.phoneDisplay}. We reply during the day, Mon–Fri 8–6 and Sat 8–5.`
                : `We'll reach you at ${sent.phone} with ${sent.ready ? "your exact price and the days we have open" : "a price for your home"}. We reply during the day, Mon–Fri 8–6 and Sat 8–5.`}
          </p>
          {resolvedBookingUrl && sent.accepted && !sent.commercial && sent.ready ? (
            <div className="nq-sent-book">
              <BookingPrefillLink baseUrl={resolvedBookingUrl} snapshot={sent.acceptedSnapshot} onRelease={() => setSent((current) => current ? { ...current, acceptedSnapshot: null } : current)} />
              <p className="nq-note">Rather not wait? Pick your day and time now. You review the price before you confirm.</p>
              {sent.market === "southbay" ? <p className="nq-note">Online booking needs two days&apos; notice.</p> : null}
            </div>
          ) : null}
          <a href={BUSINESS.phoneHref} className="qf-success-call" data-phone-location="quote_success">Questions? Call {BUSINESS.phoneDisplay}</a>
          <button
            type="button"
            className="qf-reset"
            onClick={() => {
              setSent(null);
              setStep(walkthrough ? "contact" : "price");
              setHomeExpanded(false);
            }}
          >
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const contactForm = (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      data-clarity-mask="true"
      onFocusCapture={trackFormStart}
      onInvalidCapture={(event) => {
        const target = event.target;
        const name = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement ? target.name : "unknown";
        trackFunnelEvent("quote_validation_error", { source, service: leadService, city: postal || contact.city, page: page(), validationField: name || "unknown" });
      }}
      hidden={!walkthrough && step !== "contact"}
      data-quote-step="2"
    >
      {pinnedService ? <input type="hidden" name="service" value={leadService} readOnly /> : null}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={field("quote-website-url")}>Leave this blank</label>
        <input id={field("quote-website-url")} name="quoteWebsiteUrl" tabIndex={-1} autoComplete="off" value={contact.quoteWebsiteUrl} onChange={(event) => setContactField("quoteWebsiteUrl", event.target.value)} />
      </div>
      {walkthrough ? (
        <div className="qf-stack">
          <div>
            <label className="qf-label" htmlFor={field("walkthrough-city")}>City or ZIP</label>
            <input className="qf-input" id={field("walkthrough-city")} name="city" type="text" required autoComplete="address-level2" placeholder={BUSINESS.id === "southbay" ? "e.g. San Jose" : "e.g. Fresno"} value={contact.city} onChange={(event) => setContactField("city", event.target.value)} aria-describedby={field("city-error")} />
            {fieldError("city") ? <p className="nq-field-error" id={field("city-error")}>{fieldError("city")}</p> : null}
          </div>
          <div className="qf-row qf-row-2">
            <div>
              <label className="qf-label" htmlFor={field("walkthrough-name")}>Name</label>
              <input className="qf-input" id={field("walkthrough-name")} name="name" type="text" required minLength={2} autoComplete="name" placeholder="Your name" value={contact.name} onChange={(event) => { setContactField("name", event.target.value); clearInvalid(event.target); }} aria-describedby={field("name-error")} />
              {fieldError("name") ? <p className="nq-field-error" id={field("name-error")}>{fieldError("name")}</p> : null}
            </div>
            <div>
              <label className="qf-label" htmlFor={field("walkthrough-phone")}>Mobile number</label>
              <input className="qf-input" id={field("walkthrough-phone")} name="phone" type="tel" required pattern={"[0-9\\(\\)+\\-\\s.]{10,}"} title="Enter a 10-digit phone number" autoComplete="tel" inputMode="tel" placeholder="Your 10-digit number" value={contact.phone} onChange={(event) => { setContactField("phone", event.target.value); clearInvalid(event.target); }} aria-describedby={field("phone-error")} />
              {fieldError("phone") ? <p className="nq-field-error" id={field("phone-error")}>{fieldError("phone")}</p> : null}
            </div>
          </div>
          <div>
            <label className="qf-label" htmlFor={field("wallet-organization")}>Company or project<span className="qf-optional">Optional</span></label>
            <input className="qf-input" id={field("wallet-organization")} name="organization" type="text" autoComplete="organization" placeholder="Company, property, or project name" value={contact.organization} onChange={(event) => setContactField("organization", event.target.value)} />
          </div>
          <div>
            <label className="qf-label" htmlFor={field("walkthrough-message")}>Areas and scope</label>
            <textarea className="qf-input" id={field("walkthrough-message")} name="message" required rows={2} placeholder="Areas to clean, frequency or handoff date, access notes" value={contact.message} onChange={(event) => setContactField("message", event.target.value)} />
          </div>
          <div>
            <p className="nq-consent-lead">Want it by text? Tick this box.</p>
            <label className="qf-consent">
              <input type="checkbox" name="smsOptIn" checked={smsOptIn} onChange={(event) => setSmsOptIn(event.target.checked)} />
              <span>{QUOTE_SMS_DISCLOSURE}</span>
            </label>
          </div>
          <div role="alert" className="qf-error" hidden={!error}>
            {error ? <><p>{error}</p><div className="nq-error-actions"><a href={BUSINESS.phoneHref} className="qf-error-action" data-phone-location="paid_quote_error">Call {BUSINESS.phoneDisplay}</a><a href={BUSINESS.phoneHref.replace("tel:", "sms:")} className="qf-error-action">Text us</a></div></> : null}
          </div>
        </div>
      ) : (
        <>
          <div className="nq-summary">
            <div>
              <p className="nq-summary-line">{serviceName} · {draft.bedrooms} bed · {draft.bathrooms} bath · {sizeLabel} sq ft{postal ? ` · ${postal}` : ""}</p>
              <p className="nq-summary-price">{summaryPrice}</p>
            </div>
            <button type="button" className="nq-edit" onClick={returnToPrice}>Change</button>
          </div>
          <h2 className="nq-title" ref={titleRef} tabIndex={-1}>Where should we send it?</h2>
          <div className="qf-stack">
            <div className="qf-row qf-row-2">
              <div>
                <label className="qf-label" htmlFor={field("name")}>Name</label>
                <input className="qf-input" id={field("name")} name="name" type="text" required minLength={2} autoComplete="name" placeholder="Your name" value={contact.name} onChange={(event) => { setContactField("name", event.target.value); clearInvalid(event.target); }} aria-describedby={field("name-error")} />
                {fieldError("name") ? <p className="nq-field-error" id={field("name-error")}>{fieldError("name")}</p> : null}
              </div>
              <div>
                <label className="qf-label" htmlFor={field("phone")}>Mobile number</label>
                <input className="qf-input" id={field("phone")} name="phone" type="tel" required pattern={"[0-9\\(\\)+\\-\\s.]{10,}"} title="Enter a 10-digit phone number" autoComplete="tel" inputMode="tel" placeholder="Your 10-digit number" value={contact.phone} onChange={(event) => { setContactField("phone", event.target.value); clearInvalid(event.target); }} aria-describedby={field("phone-error")} />
                {fieldError("phone") ? <p className="nq-field-error" id={field("phone-error")}>{fieldError("phone")}</p> : null}
              </div>
            </div>
            <div>
              <p className="nq-consent-lead">Want it by text? Tick this box.</p>
              <label className="qf-consent">
                <input type="checkbox" name="smsOptIn" checked={smsOptIn && contact.contactPreference !== "call" && contact.contactPreference !== "email"} disabled={contact.contactPreference === "call" || contact.contactPreference === "email"} onChange={(event) => setSmsOptIn(event.target.checked)} />
                <span>{QUOTE_SMS_DISCLOSURE}</span>
              </label>
            </div>
            <div role="alert" className="qf-error" hidden={!error}>
              {error ? (
                <>
                  <p>{error}</p>
                  <div className="nq-error-actions">
                    <a href={BUSINESS.phoneHref} className="qf-error-action" data-phone-location="paid_quote_error">Call {BUSINESS.phoneDisplay}</a>
                    <a href={BUSINESS.phoneHref.replace("tel:", "sms:")} className="qf-error-action">Text us</a>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </>
      )}
      <div className="qf-actions">
        <button type="submit" className="qf-submit" disabled={isSubmitting}>
          {walkthrough ? (isSubmitting ? "Sending…" : <>Request a walkthrough <ArrowIcon /></>) : <>{submitText} <ArrowIcon /></>}
        </button>
      </div>
      {submitAlternative}
      <p className="qf-fine">
        <LockIcon />
        <span>We reply during the day, Mon–Fri 8–6 and Sat 8–5. No payment, and nothing is booked until you confirm. <Link href="/privacy" target="_blank" rel="noopener">Privacy</Link></span>
      </p>
      {!walkthrough ? (
        <>
          <div className="qf-disclosure">
            <button
              type="button"
              className="qf-disclosure-toggle"
              aria-expanded={showDetails}
              onClick={() => {
                if (!detailsOpened) {
                  setDetailsOpened(true);
                  trackFunnelEvent("quote_details_open", { source, service: leadService, city: postal || contact.city, page: page() });
                }
                setShowDetails((current) => !current);
              }}
            >
              <span>{showDetails ? "Hide details" : "Add details (optional)"}</span>
              <span aria-hidden="true">{showDetails ? "−" : "+"}</span>
            </button>
            {showDetails ? (
              <div className="qf-stack mt-4">
                <div>
                  <label className="qf-label" htmlFor={field("timeline")}>When do you need it?<span className="qf-optional">Optional</span></label>
                  {paidSearch && draft.service === "Move-in / move-out cleaning" ? (
                    <select className="qf-input" id={field("timeline")} name="timeline" value={contact.timeline} onChange={(event) => setContactField("timeline", event.target.value)}>
                      <option value="">Choose timing…</option>
                      {paidMoveTimingChoices.map((choice) => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
                    </select>
                  ) : (
                    <select className="qf-input" id={field("timeline")} name="timeline" value={contact.timeline} onChange={(event) => setContactField("timeline", event.target.value)}>
                      <option value="">Select timing…</option>
                      <option value="this-week">This week</option>
                      <option value="next-week">Next week</option>
                      <option value="specific-deadline">Specific deadline (walkthrough or lease date)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  )}
                </div>
                {contact.timeline === "specific-deadline" ? (
                  <div>
                    <label className="qf-label" htmlFor={field("requested-date")}>Needed by</label>
                    <input className="qf-input" id={field("requested-date")} name="requestedDate" type="date" required min={serviceAreaToday()} value={contact.requestedDate} onChange={(event) => { setContactField("requestedDate", event.target.value); clearInvalid(event.target); }} aria-describedby={field("requested-date-help")} />
                    <p id={field("requested-date-help")} className="qf-help">Your requested deadline, not a confirmed booking. We&apos;ll confirm availability with you.</p>
                    {fieldError("requestedDate") ? <p className="nq-field-error">{fieldError("requestedDate")}</p> : null}
                  </div>
                ) : null}
                <div>
                  <label className="qf-label" htmlFor={field("condition")}>What&apos;s the home like right now?<span className="qf-optional">Optional</span></label>
                  <select className="qf-input" id={field("condition")} name="condition" value={contact.condition} onChange={(event) => setContactField("condition", event.target.value)}>
                    <option value="">Choose one…</option>
                    <option value="mostly-maintained">Regular upkeep, no major buildup</option>
                    <option value="some-buildup-needs-detail">Some areas need extra detail</option>
                    <option value="heavy-buildup-pet-hair-neglected">Heavy buildup or a lot of pet hair</option>
                  </select>
                </div>
                {draft.service === "Standard recurring cleaning" ? (
                  <div>
                    <label className="qf-label" htmlFor={field("frequency")}>How often would you like cleaning?<span className="qf-optional">Optional</span></label>
                    <select className="qf-input" id={field("frequency")} name="frequency" value={contact.frequency || prefillFrequency} onChange={(event) => setContactField("frequency", event.target.value)}>
                      <option value="">Choose a frequency…</option>
                      <option value="one-time">One-Time</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Biweekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                ) : null}
                {draft.service === "Move-in / move-out cleaning" ? (
                  <div className="qf-stack">
                    <label className="qf-check">
                      <input type="checkbox" name="moveOutScopeConfirmed" checked={moveOutScopeConfirmed} onChange={() => { trackFormStart(); setMoveOutScopeConfirmed((current) => !current); }} />
                      <span>The home will be empty when we clean, with appliances and cabinets cleared.</span>
                    </label>
                    <fieldset className="qf-step">
                      <legend className="qf-label">Move-out add-ons<span className="qf-optional">Optional</span></legend>
                      <p className="qf-help">Move-out cleaning includes empty cabinet, drawer, and closet interiors. Inside the oven and refrigerator, window glass, and tracks are optional additions.</p>
                      <div className="qf-checks mt-3 sm:grid-cols-2">
                        {moveOutAddons.map((addon) => (
                          <label key={addon} className="qf-check">
                            <input
                              type="checkbox"
                              name="moveOutAddons"
                              checked={moveOutAddonsSelected.includes(addon)}
                              onChange={() => {
                                trackFormStart();
                                setMoveOutAddonsSelected((current) => current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]);
                              }}
                            />
                            <span>{addon}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ) : null}
                <div>
                  <label className="qf-label" htmlFor={field("email")}>Email<span className="qf-optional">Optional</span></label>
                  <input className="qf-input" id={field("email")} name="email" type="email" autoComplete="email" placeholder="you@example.com" value={contact.email} onChange={(event) => setContactField("email", event.target.value)} />
                </div>
                <div>
                  <label className="qf-label" htmlFor={field("contact-preference")}>Best way to reach you<span className="qf-optional">Optional</span></label>
                  <select
                    className="qf-input"
                    id={field("contact-preference")}
                    name="contactPreference"
                    value={contact.contactPreference}
                    onChange={(event) => {
                      const value = event.target.value;
                      setContactField("contactPreference", value);
                      if (value === "call" || value === "email") setSmsOptIn(false);
                    }}
                  >
                    <option value="">Best way?</option>
                    <option value="text">Text</option>
                    <option value="call">Call</option>
                    <option value="either">Either</option>
                  </select>
                </div>
                <div>
                  <label className="qf-label" htmlFor={field("message")}>Anything we should know?<span className="qf-optional">Optional</span></label>
                  <textarea className="qf-input" id={field("message")} name="message" rows={3} placeholder="Pets, priority areas, access notes, or preferred day" value={contact.message} onChange={(event) => setContactField("message", event.target.value)} />
                </div>
              </div>
            ) : null}
          </div>
          <p className="nq-promise">If something included in the agreed scope was missed, tell us within 24 hours and we come back and make it right at no charge.</p>
        </>
      ) : null}
    </form>
  );

  return (
    <div
      ref={containerRef}
      className={`${placement === "hero" ? "ns-price-picker" : "nq-form"} ${paidSearch ? "scroll-mt-4" : "scroll-mt-22"}`}
      id={placement === "hero" ? id : undefined}
      data-price-picker={placement === "hero" ? true : undefined}
      data-has-zip={postal ? "" : undefined}
      data-market-price={marketId}
    >
      {walkthrough ? null : <div data-quote-step="1" hidden={step !== "price"}>
        <fieldset className="ns-price-services">
          <legend className="ns-sr">Cleaning type</legend>
          <div className="ns-price-segments" hidden={Boolean(pinnedService)}>
            {RESIDENTIAL_SERVICES.map((item) => (
              <label key={item.value}>
                <input type="radio" name={field("service")} value={item.value} checked={draft.service === item.value} onChange={() => { trackFormStart(); updateQuoteDraft({ service: item.value }); }} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="ns-price-fields">
          <div>
            <label htmlFor={field("zip")}>ZIP</label>
            <input
              ref={zipRef}
              id={field("zip")}
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              value={draft.zip}
              onChange={(event) => { trackFormStart(); updateQuoteDraft({ zip: event.target.value }); }}
              placeholder="5-digit ZIP"
              aria-describedby={field("output")}
            />
          </div>
          <div className="ns-price-home-summary">
            <span id={field("summary")}>{draft.bedrooms} bed · {draft.bathrooms} bath · {sizeLabel} sq ft</span>
            <button type="button" aria-expanded={homeExpanded} aria-controls={field("home")} aria-describedby={field("summary")} onClick={() => setHomeExpanded(!homeExpanded)}>Change</button>
          </div>
          <div id={field("home")} className="ns-price-home" data-collapsed={homeExpanded ? undefined : ""}>
            <div>
              <label htmlFor={field("bedrooms")}>Bedrooms</label>
              <select id={field("bedrooms")} name="bedrooms" value={draft.bedrooms} onChange={(event) => { trackFormStart(); updateQuoteDraft({ bedrooms: event.target.value }); }}>
                {bedroomsOptions.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={field("bathrooms")}>Bathrooms</label>
              <select id={field("bathrooms")} name="bathrooms" value={draft.bathrooms} onChange={(event) => { trackFormStart(); updateQuoteDraft({ bathrooms: event.target.value }); }}>
                {bathroomsOptions.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={field("size")}>Home size</label>
              <select id={field("size")} name="sqft" aria-label="Home size in square feet" value={draft.size} onChange={(event) => { trackFormStart(); updateQuoteDraft({ size: event.target.value }); }}>
                {PAID_HOME_SIZES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div id={field("output")} className="ns-price-output nq-out" role="status" aria-live="polite" aria-atomic="true">
          {renderPriceOutput()}
        </div>
        {!postal && !directQuote ? (
          <>
            <button type="button" className="home-button ns-price-start" data-quote-next onClick={() => zipRef.current?.focus()}>
              See your price <ArrowIcon />
            </button>
            <p className="ns-price-help">You&apos;ll see the price right here. No phone number needed.</p>
          </>
        ) : null}
        {renderActions()}
        {placement === "page" ? (
          <p className="qf-aside">
            Office, commercial, or construction? <Link href="/commercial-quote">Request a walkthrough</Link>
          </p>
        ) : null}
      </div>}
      {contactForm}
      {paidSearch ? decisionProof : null}
      {stickyPaidCta ? (
        <PaidQuoteStickyCTA
          key={`${step}-${ready ? "ready" : directQuote ? "direct" : askState ? "ask" : loading ? "loading" : "first"}`}
          formRef={containerRef}
          activeStep={step === "price" ? 1 : 2}
          bookingAvailable={Boolean(ready?.bookableSqft)}
          isSubmitting={isSubmitting}
          label={step === "price" ? "Text me this price" : submitText}
          onClick={handleStickySubmit}
        />
      ) : null}
    </div>
  );
}

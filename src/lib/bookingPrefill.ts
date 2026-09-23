// Private customer details travel only in memory, after an accepted lead and
// an explicit click. Keep this wire contract in sync with Apex booking-prefill.
export const PREFILL_CHANNEL = "nsc.booking-prefill.v1";
export const PREFILL_VERSION = 1;
export const PREFILL_PARAM = "nsc_prefill";
export const SITE_ORIGINS = ["https://newstarcleaning.com", "https://www.newstarcleaning.com"] as const;
export const BOOKING_ORIGINS = ["https://book.newstarcleaning.com", "https://apex-crm-abarranco95-s-team.vercel.app"] as const;
export const CUSTOMER_FIELDS = ["name", "email", "phone", "city", "service", "frequency", "bedrooms", "bathrooms", "squareFeet", "propertyType", "condition", "message", "timeline", "requestedDate", "contactPreference"] as const;
export type BookingPrefillPayload = Readonly<Partial<Record<typeof CUSTOMER_FIELDS[number], string>> & { moveOutAddons?: readonly string[] }>;
export type PrefillSendStatus = "waiting" | "sent" | "applied" | "review" | "rejected" | "blocked" | "unsupported" | "unavailable" | "cancelled";

export function loopbackOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return url.origin === origin && ["http:", "https:"].includes(url.protocol) && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  } catch { return false; }
}
export function allowedPrefillPair(siteOrigin: string, bookingOrigin: string): boolean {
  return (SITE_ORIGINS.some((o) => o === siteOrigin) && BOOKING_ORIGINS.some((o) => o === bookingOrigin)) ||
    (loopbackOrigin(siteOrigin) && loopbackOrigin(bookingOrigin));
}
export function validAttemptId(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
export function validPayload(value: unknown): value is BookingPrefillPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return Object.keys(obj).length > 0 && Object.entries(obj).every(([key, v]) =>
    key === "moveOutAddons" ? Array.isArray(v) && v.every((entry) => typeof entry === "string") :
      CUSTOMER_FIELDS.some((field) => field === key) && typeof v === "string");
}
export function isBookableIntake(service: string): boolean {
  return ["Standard recurring cleaning", "Deep cleaning", "Move-in / move-out cleaning"].includes(service);
}
/** Build from the accepted submission closure, NEVER response metadata/attribution. */
export function acceptedPrefillSnapshot(form: Record<string, unknown>, apexAccepted: boolean, customerCity: boolean): BookingPrefillPayload | null {
  if (!apexAccepted || typeof form.service !== "string" || !isBookableIntake(form.service)) return null;
  const snapshot: Partial<Record<typeof CUSTOMER_FIELDS[number], string>> & { moveOutAddons?: readonly string[] } = {};
  for (const field of CUSTOMER_FIELDS) {
    if (field === "city" && !customerCity) continue; // campaign/default city is not a home location
    if (field === "requestedDate" && form.timeline !== "specific-deadline") continue;
    const value = form[field === "squareFeet" ? "sqft" : field];
    if (typeof value === "string" && value.trim()) snapshot[field] = value;
  }
  if (Array.isArray(form.moveOutAddons) && form.moveOutAddons.length && form.moveOutAddons.every((v) => typeof v === "string")) {
    snapshot.moveOutAddons = Object.freeze([...form.moveOutAddons]);
  }
  return Object.freeze(snapshot);
}

/** Call synchronously from the customer's click; no await before window.open. */
export function startBookingPrefill(win: Window, destination: string, snapshot: BookingPrefillPayload, onStatus: (status: PrefillSendStatus) => void): () => void {
  let url: URL;
  try { url = new URL(destination); } catch { onStatus("unsupported"); return () => {}; }
  if (!allowedPrefillPair(win.location.origin, url.origin) || !["/book", "/book/"].includes(url.pathname) || url.username || url.password || !validPayload(snapshot)) {
    onStatus("unsupported"); return () => {};
  }
  let attemptId: string;
  try { attemptId = win.crypto.randomUUID(); } catch { onStatus("unavailable"); return () => {}; }
  url.searchParams.set(PREFILL_PARAM, attemptId);
  let child: Window | null = null;
  let payload: BookingPrefillPayload | null = snapshot;
  let sent = false;
  let done = false;
  const cleanup = () => {
    done = true;
    payload = null;
    child = null;
    win.removeEventListener("message", receive);
    win.removeEventListener("pagehide", cancel);
  };
  const cancel = () => { if (!done) { cleanup(); onStatus("cancelled"); } };
  const receive = (event: MessageEvent) => {
    if (done || event.source !== child || event.origin !== url.origin || !child || child.closed) return;
    const data = event.data;
    if (!data || data.channel !== PREFILL_CHANNEL || data.version !== PREFILL_VERSION || data.attemptId !== attemptId) return;
    if (data.type === "request" && Object.keys(data).sort().join() === "attemptId,channel,type,version" && !sent && payload) {
      sent = true;
      try {
        child.postMessage({ channel: PREFILL_CHANNEL, version: PREFILL_VERSION, attemptId, type: "payload", payload }, url.origin);
        payload = null; // never resend, including after a lost ACK
        onStatus("sent");
      } catch { cleanup(); onStatus("unavailable"); }
    } else if (data.type === "ack" && sent && Object.keys(data).sort().join() === "attemptId,channel,status,type,version" && ["applied", "review", "rejected"].includes(data.status)) {
      const status = data.status as PrefillSendStatus;
      cleanup();
      onStatus(status);
    }
  };
  win.addEventListener("message", receive);
  win.addEventListener("pagehide", cancel);
  onStatus("waiting");
  try {
    child = win.open(url.toString(), "_blank");
    if (!child || child.closed) { cleanup(); onStatus("blocked"); }
  } catch { cleanup(); onStatus("blocked"); }
  return cancel;
}

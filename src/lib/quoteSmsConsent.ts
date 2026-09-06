export const QUOTE_SMS_DISCLOSURE = "You may text me about this quote, pricing, scheduling, appointment reminders, and follow-ups. Message and data rates may apply. Reply STOP to opt out. Text consent is optional and is not required to purchase services.";
export const QUOTE_SMS_DISCLOSURE_VERSION = "newstar-quote-sms-2026-09-05";

export function buildQuoteSmsConsent(checked: boolean, contactPreference: string, source: string) {
  const granted = checked && contactPreference !== "call" && contactPreference !== "email";
  return {
    status: granted ? "granted" : "denied",
    capturedAt: new Date().toISOString(),
    source,
    disclosureVersion: QUOTE_SMS_DISCLOSURE_VERSION,
  };
}

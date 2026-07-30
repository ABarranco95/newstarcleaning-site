// The standalone /sms-opt-in page exists to capture explicit SMS consent.
// Apex records consent from a structured smsConsent object; a sentence in the
// message body does not count. This builder produces that structured payload,
// and the page may only show "opted in" after Apex accepts it.
export const SMS_OPT_IN_DISCLOSURE_VERSION = "newstar-sms-opt-in-page-2026-07-30";

const SMS_OPT_IN_CONSENT_TEXT =
  "Visitor checked the SMS opt-in consent box on newstarcleaning.com/sms-opt-in agreeing to receive recurring automated text messages from New Star Cleaning LLC (appointment confirmations, reminders, service updates, and occasional promotional offers). Message frequency varies; message and data rates may apply; consent is not a condition of purchase; reply STOP to opt out, HELP for help.";

export type SmsOptInForwardPayload = {
  [key: string]: unknown;
  firstName: string;
  phone: string;
  source: string;
};

export type SmsOptInForwardResult =
  | { ok: true; payload: SmsOptInForwardPayload }
  | { ok: false; error: string };

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function buildSmsOptInForward(body: Record<string, unknown>): SmsOptInForwardResult {
  const firstName = optionalText(body.firstName);
  const phone = optionalText(body.phone);

  // Consent must be the checkbox's literal boolean. Anything else is not an
  // explicit grant and must not be forwarded as one.
  if (body.smsConsent !== true) {
    return { ok: false, error: "First name, phone, and SMS consent are required" };
  }
  if (!firstName || !phone) {
    return { ok: false, error: "First name, phone, and SMS consent are required" };
  }

  const submissionId = optionalText(body.submissionId);
  const submittedAt = optionalText(body.submittedAt);

  return {
    ok: true,
    payload: {
      submissionId,
      idempotencyKey: submissionId,
      sourceForm: "sms_opt_in_page",
      firstName,
      lastName: optionalText(body.lastName),
      phone,
      email: optionalText(body.email),
      service: "SMS Opt-In",
      source: "sms_opt_in",
      page: optionalText(body.page) || "/sms-opt-in",
      submittedAt,
      smsConsent: {
        status: "granted",
        capturedAt: submittedAt,
        source: "sms_opt_in_page",
        disclosureVersion: SMS_OPT_IN_DISCLOSURE_VERSION,
      },
      consentText: SMS_OPT_IN_CONSENT_TEXT,
      message: "SMS opt-in request from the standalone opt-in page.",
    },
  };
}

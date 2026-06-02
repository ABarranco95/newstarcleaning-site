import { NextResponse } from "next/server";

const APEX_CRM_BASE_URL = (
  process.env.APEX_CRM_BASE_URL ||
  process.env.NEXT_PUBLIC_APEX_CRM_BASE_URL ||
  ""
).replace(/\/$/, "");

const APEX_INCOMING_URL =
  process.env.APEX_CRM_INCOMING_URL ||
  (APEX_CRM_BASE_URL ? `${APEX_CRM_BASE_URL}/api/incoming` : "");

const GHL_FALLBACK_WEBHOOK_URL = process.env.GHL_FALLBACK_WEBHOOK_URL || "";

type LeadPayload = {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  source: string;
  page?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
};

type LeadRoutingResult = {
  success: boolean;
  metadata: {
    apex: {
      configured: boolean;
      success: boolean;
      status?: number;
      data?: unknown;
    };
    fallback?: {
      provider: "ghl";
      configured: boolean;
      attempted: boolean;
      success: boolean;
      status?: number;
    };
  };
};

export function splitFullName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || undefined,
  };
}

export function normalizeOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function appendDetails(
  fields: Array<[string, unknown]>,
  baseMessage?: string
) {
  const lines = fields
    .map(([label, value]) => {
      const normalized = normalizeOptionalString(value);
      return normalized ? `${label}: ${normalized}` : undefined;
    })
    .filter(Boolean);

  return [normalizeOptionalString(baseMessage), ...lines].filter(Boolean).join("\n");
}

export function normalizePhone(value: unknown) {
  const rawPhone = normalizeOptionalString(value);
  if (!rawPhone) return undefined;

  return rawPhone.replace(/[^\d+]/g, "");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLeadPayload(payload: LeadPayload) {
  const errors: string[] = [];
  const firstName = normalizeOptionalString(payload.firstName);
  const phone = normalizePhone(payload.phone);
  const email = normalizeOptionalString(payload.email);

  if (!firstName) errors.push("First name is required.");
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    errors.push("A valid phone number is required.");
  }
  if (email && !isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!normalizeOptionalString(payload.source)) {
    errors.push("Lead source is required.");
  }

  return {
    errors,
    payload: {
      ...payload,
      firstName: firstName || "",
      lastName: normalizeOptionalString(payload.lastName),
      phone: phone || "",
      email,
      city: normalizeOptionalString(payload.city),
      service: normalizeOptionalString(payload.service),
      message: normalizeOptionalString(payload.message),
      source: normalizeOptionalString(payload.source) || "",
      page: normalizeOptionalString(payload.page),
    },
  };
}

function forwardedHeaders(sourceHeaders?: Headers) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const forwardedFor = sourceHeaders?.get("x-forwarded-for");
  const realIp = sourceHeaders?.get("x-real-ip");

  if (forwardedFor) headers["x-forwarded-for"] = forwardedFor;
  if (realIp) headers["x-real-ip"] = realIp;

  return headers;
}

async function readJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function submitToGhlFallback(payload: LeadPayload, sourceHeaders?: Headers) {
  if (!GHL_FALLBACK_WEBHOOK_URL) {
    return {
      provider: "ghl" as const,
      configured: false,
      attempted: false,
      success: false,
    };
  }

  try {
    const response = await fetch(GHL_FALLBACK_WEBHOOK_URL, {
      method: "POST",
      headers: forwardedHeaders(sourceHeaders),
      body: JSON.stringify(payload),
    });

    return {
      provider: "ghl" as const,
      configured: true,
      attempted: true,
      success: response.ok,
      status: response.status,
    };
  } catch (error) {
    console.error("GHL fallback lead submission failed:", error);
    return {
      provider: "ghl" as const,
      configured: true,
      attempted: true,
      success: false,
    };
  }
}

export async function submitLeadToApex(
  payload: LeadPayload,
  sourceHeaders?: Headers
) {
  const validation = validateLeadPayload(payload);

  if (validation.errors.length) {
    return NextResponse.json(
      { error: "Please check the form and try again.", details: validation.errors },
      { status: 400 }
    );
  }

  if (!APEX_INCOMING_URL) {
    return NextResponse.json(
      {
        error: "Lead routing is not configured.",
        metadata: {
          apex: { configured: false, success: false },
        },
      },
      { status: 503 }
    );
  }

  let apexData: unknown = null;
  let apexStatus: number | undefined;

  try {
    const response = await fetch(APEX_INCOMING_URL, {
      method: "POST",
      headers: forwardedHeaders(sourceHeaders),
      body: JSON.stringify(validation.payload),
    });
    apexStatus = response.status;
    apexData = await readJsonSafely(response);

    if (response.ok) {
      const result: LeadRoutingResult = {
        success: true,
        metadata: {
          apex: {
            configured: true,
            success: true,
            status: response.status,
            data: apexData,
          },
        },
      };

      return NextResponse.json(result, { status: 201 });
    }

    console.error("Apex CRM lead submission failed:", {
      status: response.status,
      data: apexData,
    });
  } catch (error) {
    console.error("Apex CRM lead submission error:", error);
  }

  const fallback = await submitToGhlFallback(validation.payload, sourceHeaders);

  return NextResponse.json(
    {
      success: fallback.success,
      error: "Failed to route lead to Apex CRM.",
      metadata: {
        apex: {
          configured: true,
          success: false,
          status: apexStatus,
          data: apexData,
        },
        fallback,
      },
    },
    { status: fallback.success ? 202 : 502 }
  );
}

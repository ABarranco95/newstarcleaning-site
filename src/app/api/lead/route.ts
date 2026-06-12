import { NextRequest, NextResponse } from "next/server";

// Proxy leads to Apex CRM: keeps secrets server-side and gives the website a
// stable submit URL even if the CRM host changes later.
const APEX_LEAD_URL = process.env.APEX_LEAD_URL || "https://apex-crm-abarranco95-s-team.vercel.app/api/public/lead";
const APEX_LEAD_INTAKE_SECRET =
  process.env.APEX_LEAD_INTAKE_SECRET || process.env.APEX_PUBLIC_API_KEY || "";

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function validPhone(value: string) {
  return value.replace(/\D/g, "").length >= 10;
}

function validEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function forwardedHeaders(req: NextRequest) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const userAgent = req.headers.get("user-agent");

  if (forwardedFor) headers["x-forwarded-for"] = forwardedFor;
  if (realIp) headers["x-real-ip"] = realIp;
  if (userAgent) headers["x-source-user-agent"] = userAgent;

  if (APEX_LEAD_INTAKE_SECRET) {
    headers.Authorization = `Bearer ${APEX_LEAD_INTAKE_SECRET}`;
  } else {
    headers.Origin = "https://newstarcleaning.com";
  }

  return headers;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = text(body.name);
    const phone = text(body.phone);
    const email = text(body.email);

    if (text(body.company)) {
      return NextResponse.json({ success: true, filtered: true });
    }

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    if (!validPhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    if (!validEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apexRes = await fetch(APEX_LEAD_URL, {
      method: "POST",
      headers: forwardedHeaders(req),
      body: JSON.stringify({
        ...body,
        name,
        phone,
        email: email || undefined,
        source: text(body.source) || "newstarcleaning.com",
        consentText:
          text(body.consentText) ||
          "By requesting a quote, the visitor agreed to receive service-related calls/texts about pricing, appointment confirmations, reminders, and follow-ups. Reply STOP to opt out.",
        websiteApiVersion: "2026-06-11",
      }),
    });

    const apexData = await apexRes.json().catch(() => ({}));

    if (!apexRes.ok) {
      console.error("Apex CRM lead intake failed:", apexRes.status, apexData);
      return NextResponse.json(
        { error: apexData.error || "Unable to submit lead. Please try again or call us." },
        { status: apexRes.status }
      );
    }

    return NextResponse.json(apexData, { status: 201 });
  } catch (error) {
    console.error("Lead proxy error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call or text us at (559) 785-2822." },
      { status: 500 }
    );
  }
}

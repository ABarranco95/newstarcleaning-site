import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
const GHL_STAGE_ID = process.env.GHL_STAGE_ID;

const GHL_BASE = "https://services.leadconnectorhq.com";
const HEADERS = {
  Authorization: `Bearer ${GHL_API_KEY}`,
  "Content-Type": "application/json",
  Version: "2021-07-28",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      service,
      homeSize,
      preferredDate,
      message,
      source = "Website Contact Form",
      utm_source,
      utm_medium,
      utm_campaign,
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Build source string
    const leadSource = [utm_source, utm_medium, utm_campaign]
      .filter(Boolean)
      .join(" | ") || source;

    // Normalize service value
    const serviceMap: Record<string, string> = {
      "standard": "Standard Recurring",
      "deep": "Deep Cleaning",
      "move": "Move-In / Move-Out",
      "commercial": "Commercial",
      "standard-recurring": "Standard Recurring",
      "deep-cleaning": "Deep Cleaning",
      "move-out": "Move-In / Move-Out",
      "move-in": "Move-In / Move-Out",
    };
    const serviceLabel = serviceMap[service?.toLowerCase()] || service || "Not specified";

    // Build message for opportunity notes
    const notes = [
      message && `Message: ${message}`,
      homeSize && `Home Size: ${homeSize}`,
      preferredDate && `Preferred Date: ${preferredDate}`,
    ].filter(Boolean).join("\n");

    // 1. Create or update contact in GHL
    const contactPayload: Record<string, unknown> = {
      firstName,
      lastName,
      phone,
      email: email || undefined,
      locationId: GHL_LOCATION_ID,
      source: leadSource,
      tags: ["website-lead", service || "general"],
      customFields: [
        { id: "pdohoBpa4isyZnNY8Cm2", value: serviceLabel },
        { id: "rjumB4yIexNvcSomixRZ", value: homeSize || "" },
        { id: "yecZrPnzlxfQTFcQ1U3V", value: leadSource },
        { id: "h4c2wo6vYqN5VbLZUaAk", value: preferredDate || "" },
      ],
    };

    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const err = await contactRes.text();
      console.error("GHL contact creation failed:", contactRes.status, err);
      return NextResponse.json(
        { error: "Unable to submit lead. Please try again or call us directly." },
        { status: 502 }
      );
    }

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    if (!contactId) {
      console.error("No contact ID returned:", JSON.stringify(contactData));
      return NextResponse.json(
        { error: "Lead submitted but contact creation failed. We'll reach out shortly." },
        { status: 500 }
      );
    }

    // 2. Create opportunity in pipeline
    const opportunityPayload = {
      pipelineId: GHL_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      name: `${firstName} ${lastName} - ${serviceLabel}`,
      stageId: GHL_STAGE_ID,
      contactId,
      status: "open",
      source: leadSource,
      notes: notes || undefined,
    };

    const oppRes = await fetch(`${GHL_BASE}/opportunities/`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(opportunityPayload),
    });

    const oppData = await oppRes.json();

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll reach out within 15 minutes during business hours.",
      contactId,
      opportunityId: oppData?.opportunity?.id,
    });
  } catch (error) {
    console.error("Lead API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us at (559) XXX-XXXX." },
      { status: 500 }
    );
  }
}

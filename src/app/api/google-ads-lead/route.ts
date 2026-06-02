import { NextRequest, NextResponse } from "next/server";

const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
const GHL_STAGE_ID = process.env.GHL_STAGE_ID;

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_HEADERS = {
  Authorization: `Bearer ${GHL_API_KEY}`,
  "Content-Type": "application/json",
  Version: "2021-07-28",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, homesize, date, utm_source, utm_medium, utm_campaign, utm_content } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    // Split name
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Build UTM source string
    const leadSource = [utm_source, utm_medium, utm_campaign, utm_content].filter(Boolean).join(" | ") || "Google Ads";

    // 1. Create or update contact in GHL
    const contactPayload: Record<string, unknown> = {
      firstName,
      lastName,
      phone,
      email: email || undefined,
      locationId: GHL_LOCATION_ID,
      source: "Google Ads Landing Page",
      tags: ["google-ads", "landing-page"],
      customFields: [
        { id: "pdohoBpa4isyZnNY8Cm2", value: service || "" },        // Service Type
        { id: "rjumB4yIexNvcSomixRZ", value: homesize || "" },       // Home Size
        { id: "yecZrPnzlxfQTFcQ1U3V", value: leadSource },          // Lead Source
        { id: "h4c2wo6vYqN5VbLZUaAk", value: date || "" },          // Preferred Day
      ],
    };

    const contactRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();
    const contactId = contactData?.contact?.id;

    if (!contactId) {
      console.error("Failed to create contact:", contactData);
      return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }

    // 2. Create opportunity in pipeline
    const opportunityPayload = {
      pipelineId: GHL_PIPELINE_ID,
      locationId: GHL_LOCATION_ID,
      name: `${firstName} ${lastName} - ${service || "Google Ads Lead"}`,
      stageId: GHL_STAGE_ID,
      contactId,
      status: "open",
      source: "Google Ads",
    };

    const oppRes = await fetch(`${GHL_BASE}/opportunities/`, {
      method: "POST",
      headers: GHL_HEADERS,
      body: JSON.stringify(opportunityPayload),
    });

    const oppData = await oppRes.json();

    return NextResponse.json({
      success: true,
      contactId,
      opportunityId: oppData?.opportunity?.id,
    });
  } catch (error) {
    console.error("Google Ads lead API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

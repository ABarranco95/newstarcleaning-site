import { NextRequest, NextResponse } from "next/server";

// Proxy leads to Apex CRM — our own lead management system
const APEX_LEAD_URL = process.env.APEX_LEAD_URL || "https://apex-crm-abarranco95-s-team.vercel.app/api/public/lead";
const APEX_API_KEY = process.env.APEX_PUBLIC_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Origin": "https://newstarcleaning.com",
    };

    if (APEX_API_KEY) {
      headers["x-api-key"] = APEX_API_KEY;
    }

    const apexRes = await fetch(APEX_LEAD_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const apexData = await apexRes.json();

    if (!apexRes.ok) {
      console.error("Apex CRM lead intake failed:", apexRes.status, apexData);
      return NextResponse.json(
        { error: apexData.error || "Unable to submit lead. Please try again or call us." },
        { status: apexRes.status }
      );
    }

    return NextResponse.json(apexData);
  } catch (error) {
    console.error("Lead proxy error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please call us at (559) XXX-XXXX." },
      { status: 500 }
    );
  }
}

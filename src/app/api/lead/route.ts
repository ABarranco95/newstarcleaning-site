import { NextRequest, NextResponse } from "next/server";
import {
  appendDetails,
  normalizeOptionalString,
  splitFullName,
  submitLeadToApex,
} from "@/lib/apexCrm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      firstName,
      lastName,
      phone,
      email,
      city,
      service,
      message,
      page,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      submittedAt,
    } = body;

    const splitName = normalizeOptionalString(name)
      ? splitFullName(name)
      : { firstName: normalizeOptionalString(firstName) || "", lastName };

    return submitLeadToApex(
      {
        firstName: splitName.firstName,
        lastName: normalizeOptionalString(splitName.lastName),
        phone,
        email: normalizeOptionalString(email),
        city: normalizeOptionalString(city),
        service: normalizeOptionalString(service),
        source: normalizeOptionalString(source) || "organic_website",
        page: normalizeOptionalString(page),
        message: appendDetails(
          [
            ["Page", page],
            ["UTM source", utm_source],
            ["UTM medium", utm_medium],
            ["UTM campaign", utm_campaign],
            ["UTM content", utm_content],
            ["Submitted at", submittedAt],
          ],
          message
        ),
      },
      req.headers
    );
  } catch (error) {
    console.error("Organic lead routing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

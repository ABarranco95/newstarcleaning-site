import { NextRequest, NextResponse } from "next/server";
import { isMarket, MARKET_COOKIE, MARKET_COOKIE_MAX_AGE, marketForCity, marketForPaidParams, marketForPath } from "@/lib/markets";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  // Flight headers are stripped before proxy execution; the matcher below
  // excludes Next prefetches. Browser prefetch purpose headers survive here.
  const isPrefetch = ["purpose", "sec-purpose"].some((name) =>
    request.headers.get(name)?.split(";")[0].trim().toLowerCase() === "prefetch");
  if (isPrefetch) return response;

  const header = request.headers.get("x-vercel-ip-city");
  let city = "";
  try { city = decodeURIComponent(header || ""); } catch { /* Ignore malformed geo data. */ }
  const saved = request.cookies.get(MARKET_COOKIE)?.value;
  const geo = request.headers.get("x-vercel-ip-country") === "US" && request.headers.get("x-vercel-ip-country-region") === "CA" ? marketForCity(city) : undefined;
  const market = marketForPath(request.nextUrl.pathname) ||
    (request.nextUrl.pathname === "/google-ads" ? marketForPaidParams(request.nextUrl.searchParams) : undefined) ||
    (isMarket(saved) ? saved : geo);
  if (market && saved !== market) {
    response.cookies.set(MARKET_COOKIE, market, { path: "/", sameSite: "lax", secure: request.nextUrl.protocol === "https:", maxAge: MARKET_COOKIE_MAX_AGE });
  }
  return response;
}

export const config = {
  matcher: [{
    source: "/((?!api|_next|.*\\..*).*)",
    // Match before Next strips Flight headers; all prefetch values (1/2/3).
    missing: [
      { type: "header", key: "next-router-prefetch" },
      { type: "header", key: "next-router-segment-prefetch" },
    ],
  }],
};

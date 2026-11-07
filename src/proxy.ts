import { NextRequest, NextResponse } from "next/server";
import { MARKET_COOKIE, marketForCity } from "@/lib/markets";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const header = request.headers.get("x-vercel-ip-city");
  let city = "";
  try { city = decodeURIComponent(header || ""); } catch { /* Ignore malformed geo data. */ }
  const market = request.headers.get("x-vercel-ip-country-region") === "CA" ? marketForCity(city) : undefined;
  if (market && request.cookies.get(MARKET_COOKIE)?.value !== market) {
    response.cookies.set(MARKET_COOKIE, market, { path: "/", sameSite: "lax", secure: request.nextUrl.protocol === "https:", maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };

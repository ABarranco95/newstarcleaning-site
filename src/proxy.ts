import { NextResponse } from "next/server";

// Retired pages are gone, not aliases for an unrelated local page.
export function proxy() {
  return new NextResponse(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page removed | New Star Cleaning</title></head><body><main><h1>This page has been removed.</h1><p><a href="/">New Star Cleaning home</a></p></main></body></html>',
    { status: 410, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } },
  );
}

export const config = {
  matcher: [
    "/cleaning-services-san-jose/:path*",
    "/cleaning-services-campbell",
    "/cleaning-services-cupertino",
    "/cleaning-services-los-gatos",
    "/cleaning-services-santa-clara",
    "/cleaning-services-saratoga",
    "/cleaning-services-sunnyvale",
    "/deep-cleaning-san-jose",
    "/move-out-cleaning-san-jose",
    "/standard-cleaning-san-jose",
  ],
};

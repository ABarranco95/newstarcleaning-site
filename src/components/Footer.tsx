"use client";

import { usePathname } from "next/navigation";
import HomeFooter from "@/components/HomeFooter";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/google-ads")) return null;
  return <HomeFooter />;
}

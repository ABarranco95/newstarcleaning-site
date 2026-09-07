"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "@/components/HomeHeader";

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/google-ads")) return null;
  return <HomeHeader key={pathname} />;
}

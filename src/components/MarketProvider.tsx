"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isMarket, MARKET_COOKIE, marketForPath, marketForCity, markets, type MarketId } from "@/lib/markets";

const MarketContext = createContext<MarketId | undefined>(undefined);

function readMarketCookie(): MarketId | undefined {
  const params = new URLSearchParams(window.location.search);
  const hint = params.get("market") || params.get("nsc_market");
  if (isMarket(hint)) return hint;
  const cityMarket = marketForCity(params.get("city") || params.get("nsc_city"));
  if (cityMarket) return cityMarket;
  const value = document.cookie.split("; ").find((part) => part.startsWith(`${MARKET_COOKIE}=`))?.split("=")[1];
  return isMarket(value) ? value : undefined;
}

function subscribe(listener: () => void) {
  window.addEventListener("focus", listener);
  window.addEventListener("pageshow", listener);
  return () => {
    window.removeEventListener("focus", listener);
    window.removeEventListener("pageshow", listener);
  };
}

const serverMarket = () => undefined;

export default function MarketProvider({ children }: { children: ReactNode }) {
  usePathname();
  const market = useSyncExternalStore(subscribe, readMarketCookie, serverMarket);
  return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket(pageMarket?: MarketId) {
  const geoMarket = useContext(MarketContext);
  const pathname = usePathname();
  const id = pageMarket || marketForPath(pathname) || geoMarket || (pathname === "/" ? "southbay" : "fresno");
  return markets[id];
}

"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isMarket, MARKET_COOKIE, MARKET_COOKIE_MAX_AGE, marketForPath, markets, neutralMarket, type MarketId } from "@/lib/markets";

const MarketContext = createContext<MarketId | undefined>(undefined);

function readMarketCookie(): MarketId | undefined {
  const value = document.cookie.split("; ").find((part) => part.startsWith(`${MARKET_COOKIE}=`))?.split("=")[1];
  return isMarket(value) ? value : undefined;
}

export function setMarketCookie(market: MarketId) {
  if (readMarketCookie() === market) return;
  document.cookie = `${MARKET_COOKIE}=${market}; Path=/; SameSite=Lax; Max-Age=${MARKET_COOKIE_MAX_AGE}${window.location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new Event("nsc-market-change"));
}

function subscribe(listener: () => void) {
  window.addEventListener("focus", listener);
  window.addEventListener("pageshow", listener);
  window.addEventListener("nsc-market-change", listener);
  return () => {
    window.removeEventListener("focus", listener);
    window.removeEventListener("pageshow", listener);
    window.removeEventListener("nsc-market-change", listener);
  };
}

const serverMarket = () => undefined;

export default function MarketProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const market = useSyncExternalStore(subscribe, readMarketCookie, serverMarket);
  useEffect(() => {
    const pathMarket = marketForPath(pathname);
    if (pathMarket) setMarketCookie(pathMarket);
  }, [pathname]);
  return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket(pageMarket?: MarketId) {
  const geoMarket = useContext(MarketContext);
  const pathname = usePathname();
  const id = marketForPath(pathname) || pageMarket || geoMarket;
  return id ? markets[id] : neutralMarket;
}

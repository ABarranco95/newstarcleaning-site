"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { useMarket } from "@/components/MarketProvider";
import { normalizedZip, markets, type MarketId } from "@/lib/markets";
import usePaidPriceRange from "@/lib/usePaidPriceRange";

interface MarketPriceExampleProps {
  market?: MarketId;
  service?: string;
}

const exampleServices = [
  { value: "Standard recurring cleaning", label: "Standard cleaning" },
  { value: "Deep cleaning", label: "Deep cleaning" },
  { value: "Move-in / move-out cleaning", label: "Move-in / move-out" },
];

const subscribe = () => () => {};
const serverZip = () => "";
const readZip = () => normalizedZip(new URLSearchParams(window.location.search).get("zip")) || "";

export default function MarketPriceExample({ market, service }: MarketPriceExampleProps) {
  const config = useMarket(market);
  const id = useId();
  const [selectedService, setSelectedService] = useState(service || exampleServices[0].value);
  const queryZip = useSyncExternalStore(subscribe, readZip, serverZip);
  const [zipInput, setZipInput] = useState<string | null>(null);
  const zip = zipInput ?? queryZip;
  const price = usePaidPriceRange({ enabled: true, service: selectedService, bedrooms: "3", bathrooms: "2", sqft: "", exactSqft: 1430, market: config.id, zip });
  const quoteParams = new URLSearchParams({ market: price.status === "ready" ? price.market : config.id, service: selectedService, ...(zip ? { zip } : {}) });

  return (
    <div className="my-6 max-w-xl border-y border-slate-200 py-5" data-market-price={config.id}>
      <p className="text-sm font-semibold text-slate-900">A price example for {config.name}</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">3 beds · 2 baths · 1,430 sq ft · normal condition · one visit · no extras</p>
      {!service ? <div className="mt-3"><label htmlFor={`${id}-service`} className="sr-only">Example cleaning service</label><select id={`${id}-service`} value={selectedService} onChange={(event) => setSelectedService(event.target.value)} className="min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">{exampleServices.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div> : null}
      <div className="mt-3 min-h-12" role="status" aria-live="polite" aria-atomic="true">
        {price.status === "ready" ? <><p className="text-2xl font-semibold tracking-tight text-slate-900">{price.low}</p><p className="mt-1 text-xs text-slate-600">{zip ? `For ZIP ${zip} · ${markets[price.market].name}. ` : ""}Example only. Your home, condition, and extras set your total.</p></> : <p className="text-sm leading-6 text-slate-600">{price.status === "loading" ? "Checking the current price…" : price.status === "custom" ? "This home needs a personal quote. Send us the details and we’ll price it." : normalizedZip(zip) ? "We couldn’t price this ZIP online. Ask us to confirm coverage and your price." : "Enter your ZIP to check pricing. If an instant price is unavailable, we’ll confirm your quote personally."}</p>}
      </div>
      <form className="mt-3" onSubmit={(event) => { event.preventDefault(); const value = normalizedZip(zip); if (value) setZipInput(value); }}>
        <label htmlFor={`${id}-zip`} className="mb-1 block text-xs font-semibold text-slate-700">Your ZIP for an accurate market price</label>
        <div className="flex gap-2"><input id={`${id}-zip`} name="zip" value={zip} onChange={(event) => setZipInput(event.target.value)} inputMode="numeric" autoComplete="postal-code" required pattern="[0-9]{5}(-[0-9]{4})?" maxLength={10} placeholder="5-digit ZIP" className="min-h-11 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900" /><button type="submit" className="min-h-11 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">Check price</button></div>
      </form>
      <a href={`/book-now?${quoteParams}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-slate-900 underline underline-offset-4">Get a quote for your home →</a>
    </div>
  );
}

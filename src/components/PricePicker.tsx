"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useMarket } from "@/components/MarketProvider";
import PaidPriceBookingButton from "@/components/PaidPriceBookingButton";
import { resolveDirectBookingUrl } from "@/lib/bookingPortal";
import { trackFunnelEvent } from "@/lib/conversionTracking";
import { normalizedZip, type MarketId } from "@/lib/markets";
import { PAID_HOME_SIZES, paidHomeSize } from "@/lib/paidHomeSize";
import usePaidPriceRange from "@/lib/usePaidPriceRange";

interface PricePickerProps {
  id: string;
  source: string;
  service?: "Standard recurring cleaning" | "Deep cleaning" | "Move-in / move-out cleaning";
  market?: MarketId;
  quoteHref: string;
}

const services = [
  { value: "Standard recurring cleaning", label: "Standard" },
  { value: "Deep cleaning", label: "Deep" },
  { value: "Move-in / move-out cleaning", label: "Move-out" },
] as const;
const bedroomsOptions = ["1", "2", "3", "4", "5", "6+"];
const bathroomsOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];
const subscribe = () => () => {};
const serverZip = () => "";
const readZip = () => normalizedZip(new URLSearchParams(window.location.search).get("zip")) || "";
const directBookingUrl = resolveDirectBookingUrl();

export default function PricePicker({ id, source, service, market, quoteHref }: PricePickerProps) {
  const config = useMarket(market);
  const fieldId = useId();
  const [selectedService, setService] = useState(service ?? "Standard recurring cleaning");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2");
  const [size, setSize] = useState("1500-1999");
  const queryZip = useSyncExternalStore(subscribe, readZip, serverZip);
  const [zipInput, setZipInput] = useState<string | null>(null);
  const zip = zipInput ?? queryZip;
  const postal = normalizedZip(zip);
  const openEnded = bedrooms.endsWith("+") || bathrooms.endsWith("+");
  const price = usePaidPriceRange({ enabled: Boolean(postal), service: selectedService, bedrooms, bathrooms, sqft: size, market: config.id, zip: postal });
  const sizeLabel = paidHomeSize(size)?.label ?? size;
  const ready = postal && price.status === "ready" ? price : null;
  const readyKey = ready ? JSON.stringify([source, selectedService, bedrooms, bathrooms, size, postal, ready.market, ready.priceLowCents, ready.priceHighCents]) : "";
  const seenPrices = useRef(new Set<string>());
  const priceLowCents = ready?.priceLowCents;
  const priceHighCents = ready?.priceHighCents;

  useEffect(() => {
    if (!readyKey || seenPrices.current.has(readyKey) || priceLowCents === undefined) return;
    seenPrices.current.add(readyKey);
    trackFunnelEvent("price_view", { source, service: selectedService, home: { priceLowCents, priceHighCents } });
  }, [readyKey, source, selectedService, priceLowCents, priceHighCents]);

  return (
    <div className="ns-price-picker" id={id} data-price-picker data-market-price={ready?.market ?? config.id}>
      <fieldset className="ns-price-services">
        <legend>Cleaning type</legend>
        <div className="ns-price-segments">
          {services.map((item) => <label key={item.value}><input type="radio" name={`${fieldId}-service`} value={item.value} checked={selectedService === item.value} onChange={() => setService(item.value)} /><span>{item.label}</span></label>)}
        </div>
      </fieldset>
      <div className="ns-price-fields">
        <div><label htmlFor={`${fieldId}-beds`}>Bedrooms</label><select id={`${fieldId}-beds`} value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}>{bedroomsOptions.map((value) => <option key={value}>{value}</option>)}</select></div>
        <div><label htmlFor={`${fieldId}-baths`}>Bathrooms</label><select id={`${fieldId}-baths`} value={bathrooms} onChange={(event) => setBathrooms(event.target.value)}>{bathroomsOptions.map((value) => <option key={value}>{value}</option>)}</select></div>
        <div><label htmlFor={`${fieldId}-size`}>Home size</label><select id={`${fieldId}-size`} aria-label="Home size in square feet" value={size} onChange={(event) => setSize(event.target.value)}>{PAID_HOME_SIZES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></div>
        <div><label htmlFor={`${fieldId}-zip`}>ZIP</label><input id={`${fieldId}-zip`} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} value={zip} onChange={(event) => setZipInput(event.target.value)} placeholder="5-digit ZIP" aria-describedby={`${fieldId}-zip-help`} /></div>
      </div>
      <p id={`${fieldId}-zip-help`} className="ns-price-help">Your ZIP sets the price for your area.</p>
      <div className="ns-price-output" role="status" aria-live="polite" aria-atomic="true">
        {price.status === "custom" || openEnded ? <p className="ns-price-prompt">{openEnded ? "This home needs a direct quote. Call or text and we'll price it with you." : "Homes over 5,500 sq ft get a direct quote. Call or text and we'll price it with you."}</p>
          : ready ? <><p className="ns-price-label">Your price</p><p className="ns-price-value">{ready.range ?? ready.low}</p><p className="ns-price-caption">{bedrooms} bed · {bathrooms} bath · {sizeLabel} sq ft</p>{ready.biweekly ? <p className="ns-price-recurring">Every other week: <strong>{ready.biweekly}</strong> a visit</p> : null}</>
            : postal && price.status === "loading" ? <div className="ns-price-loading" aria-label="Checking your price"><span /><span /></div>
              : <p className="ns-price-prompt">{postal ? "We don't have an online price for that ZIP yet. Text us the address and we'll check." : "Enter your ZIP to see your price."}</p>}
      </div>
      <div className="ns-price-action">
        {ready && ready.bookableSqft && directBookingUrl ? <PaidPriceBookingButton key={`${selectedService}-${bedrooms}-${bathrooms}-${size}-${postal}-${ready.market}`} primary baseUrl={directBookingUrl} service={selectedService} bedrooms={bedrooms} bathrooms={bathrooms} squareFeet={ready.bookableSqft} zip={postal} market={ready.market} source={source} ctaLocation="organic_live_price" />
          : ready ? <a href={quoteHref} className="home-button">Get a quote by text <span aria-hidden="true">→</span></a>
            : price.status === "custom" || openEnded ? <div className="ns-price-contact"><a href={config.phoneHref} className="home-button-secondary" data-phone-location="organic_price">Call</a><a href={config.phoneHref.replace("tel:", "sms:")} className="home-button-secondary">Text</a></div>
              : postal && price.status === "loading" ? null
                : <a href={config.phoneHref.replace("tel:", "sms:")} className="home-button-secondary">Text us</a>}
      </div>
      <p className={`ns-price-help${ready?.range ? "" : " invisible"}`} aria-hidden={ready?.range ? undefined : true}>The range covers your size band and how much buildup there is. Your exact price shows before you confirm.</p>
      <p className="ns-price-help">No contract. Nothing is charged when you book.</p>
      <a href={quoteHref} className="home-text-link ns-price-quote">Rather get a quote by text?</a>
    </div>
  );
}

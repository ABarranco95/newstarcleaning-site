import { homeQuoteParams, isBusinessCleaning } from "@/lib/homeQuoteContext";

const cityLabels: Record<string, string> = {
  fresno: "Fresno", clovis: "Clovis", madera: "Madera",
  "tower-district": "Tower District", "fig-garden": "Fig Garden", "woodward-park": "Woodward Park",
};
const residential = ["standard-cleaning", "deep-cleaning", "move-out-cleaning"];

export function siteQuoteParams(pathname: string, search: string) {
  const params = homeQuoteParams(search);
  const set = (key: string, value: string) => { params.set(key, value); params.delete(`nsc_${key}`); };
  const area = pathname.replace(/^\/cleaning-services-/, "");
  if (cityLabels[area]) set("city", cityLabels[area]);
  for (const service of residential) {
    if (pathname === `/services/${service}`) set("service", service);
    const prefix = `/${service}-`;
    if (pathname.startsWith(prefix) && cityLabels[pathname.slice(prefix.length)]) {
      set("service", service);
      set("city", cityLabels[pathname.slice(prefix.length)]);
    }
  }
  if (pathname === "/services/commercial-cleaning") set("service", "Office / commercial cleaning");
  if (pathname === "/services/post-construction-cleaning") set("service", "Post-construction cleaning");
  if (pathname === "/commercial-quote" && !isBusinessCleaning(params.get("service"))) set("service", "Office / commercial cleaning");
  return params;
}

export function siteQuoteHref(pathname: string, search: string) {
  const params = siteQuoteParams(pathname, search);
  const destination = isBusinessCleaning(params.get("service")) ? "/commercial-quote" : "/book-now";
  const query = params.toString();
  return query ? `${destination}?${query}` : destination;
}

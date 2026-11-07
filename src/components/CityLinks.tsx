import Link from "next/link";

interface CityLinksProps {
  omit?: string;
}

const cities = [
  { name: "San Jose", slug: "san-jose" },
  { name: "Santa Clara", slug: "santa-clara" },
  { name: "Sunnyvale", slug: "sunnyvale" },
  { name: "Cupertino", slug: "cupertino" },
  { name: "Campbell", slug: "campbell" },
  { name: "Saratoga", slug: "saratoga" },
  { name: "Los Gatos", slug: "los-gatos" },
];

export default function CityLinks({ omit }: CityLinksProps) {
  return (
    <div className="ns-city-links">
      {cities.filter((city) => city.slug !== omit).map((city) => <Link key={city.slug} href={`/cleaning-services-${city.slug}`}>House cleaning in {city.name}, CA<span aria-hidden="true">↗</span></Link>)}
    </div>
  );
}

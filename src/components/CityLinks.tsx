import Link from "next/link";

interface CityLinksProps {
  omit?: string;
  allAreas?: boolean;
}

const cities = [
  { name: "Fresno", slug: "fresno" },
  { name: "Clovis", slug: "clovis" },
  { name: "Madera", slug: "madera" },
];

export default function CityLinks({ omit, allAreas = false }: CityLinksProps) {
  return (
    <div className={`ns-city-links${omit ? " ns-city-links-nearby" : ""}`}>
      {cities.filter((city) => city.slug !== omit).map((city) => <Link key={city.slug} href={`/cleaning-services-${city.slug}`}>House cleaning in {city.name}, CA<span aria-hidden="true">↗</span></Link>)}
      {allAreas ? <Link href="/service-areas">All service areas<span aria-hidden="true">↗</span></Link> : null}
    </div>
  );
}

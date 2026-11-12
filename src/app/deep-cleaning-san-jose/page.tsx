import ServiceCityPage, { generateMetadata as serviceMetadata } from "@/components/ServiceCityPage";

const serviceCity = "deep-cleaning-san-jose";

export function generateMetadata() {
  return serviceMetadata({ params: Promise.resolve({ serviceCity }) });
}

export default function Page() {
  return <ServiceCityPage params={Promise.resolve({ serviceCity })} />;
}

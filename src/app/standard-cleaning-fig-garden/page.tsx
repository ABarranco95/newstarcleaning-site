import ServiceCityPage, { generateMetadata as serviceMetadata } from "@/components/ServiceCityPage";

const serviceCity = "standard-cleaning-fig-garden";

export function generateMetadata() {
  return serviceMetadata({ params: Promise.resolve({ serviceCity }) });
}

export default function Page() {
  return <ServiceCityPage params={Promise.resolve({ serviceCity })} />;
}

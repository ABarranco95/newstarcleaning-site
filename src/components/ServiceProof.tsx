import BeforeAfterPairs from "@/components/BeforeAfterPairs";
import PhotoStrip from "@/components/PhotoStrip";
import type { MarketId } from "@/lib/markets";
import { servicePresentation } from "@/lib/servicePresentation";
import type { ServiceDefinition } from "@/lib/services";

interface ServiceProofProps {
  service: ServiceDefinition;
  market?: MarketId;
}

export default function ServiceProof({ service, market = "fresno" }: ServiceProofProps) {
  const presentation = servicePresentation[service.slug];
  return presentation.proofPairs?.length
    ? <BeforeAfterPairs pairs={presentation.proofPairs} market={market} />
    : <PhotoStrip photos={presentation.proofPhotos} market={market} />;
}

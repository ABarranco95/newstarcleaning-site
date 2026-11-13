import BeforeAfterPairs from "@/components/BeforeAfterPairs";
import PhotoStrip from "@/components/PhotoStrip";
import { servicePresentation } from "@/lib/servicePresentation";
import type { ServiceDefinition } from "@/lib/services";

interface ServiceProofProps {
  service: ServiceDefinition;
}

export default function ServiceProof({ service }: ServiceProofProps) {
  const presentation = servicePresentation[service.slug];
  return presentation.proofPairs?.length
    ? <BeforeAfterPairs pairs={presentation.proofPairs} />
    : <PhotoStrip photos={presentation.proofPhotos} />;
}

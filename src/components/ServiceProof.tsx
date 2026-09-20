import "./service-editorial.css";
import Image from "next/image";
import type { RealWorkPhoto } from "@/lib/realWorkPhotos";
import { servicePresentation } from "@/lib/servicePresentation";
import type { ServiceDefinition } from "@/lib/services";

function PhotoCell({ photo, tag, tagClass, sizes }: {
  photo: RealWorkPhoto;
  tag?: string;
  tagClass?: string;
  sizes: string;
}) {
  return (
    <figure>
      <div className="se-proof-cell">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} />
        {tag ? <span className={`se-tag ${tagClass ?? ""}`}>{tag}</span> : null}
      </div>
      <figcaption>{photo.caption} · New Star work</figcaption>
    </figure>
  );
}

/**
 * Service-specific photo proof with per-intent composition. Photos come from
 * servicePresentation as filename-stable real New Star work; the optional pair
 * is a verified same-surface before/after rendered fully visible (never hidden
 * inside an accordion). Captions claim no city, date, or customer.
 */
export default function ServiceProof({ service, quotePhotoSrc }: { service: ServiceDefinition; quotePhotoSrc?: string }) {
  const presentation = servicePresentation[service.slug];
  const { proofPhotos, proofPair, pairNote } = presentation;
  if (proofPhotos.length === 0) return null;
  const [feature, ...side] = proofPhotos;
  const cellSizes = "(min-width: 1024px) 320px, (min-width: 640px) 40vw, 90vw";
  const featureSizes = "(min-width: 1024px) 620px, (min-width: 640px) 80vw, 100vw";
  return (
    <div className={`se-proof se-proof-${presentation.proofLayout}`}>
      <figure>
        <div className="se-proof-feature">
          <Image src={feature.src} alt={feature.alt} fill sizes={featureSizes} />
        </div>
        <figcaption>{feature.caption} · New Star work</figcaption>
      </figure>
      <div>
        <div className="se-proof-side">
          {side.map((photo, index) => photo.src === quotePhotoSrc ? null : (
            <PhotoCell
              key={photo.src}
              photo={photo}
              tag={presentation.proofPhotoTags?.[index + 1]}
              tagClass={presentation.proofPhotoTags?.[index + 1] === "Add-on" ? "se-tag-addon" : "se-tag-included"}
              sizes={cellSizes}
            />
          ))}
        </div>
      </div>
        {proofPair ? (
          <div className="se-pair">
            <figure>
              <Image src={proofPair.before.src} alt={proofPair.before.alt} fill sizes={cellSizes} />
              <span className="se-pair-tag">Before</span>
            </figure>
            <figure>
              <Image src={proofPair.after.src} alt={proofPair.after.alt} fill sizes={cellSizes} />
              <span className="se-pair-tag">After</span>
            </figure>
            <p className="se-pair-note">{pairNote ?? proofPair.label}</p>
          </div>
        ) : null}
    </div>
  );
}

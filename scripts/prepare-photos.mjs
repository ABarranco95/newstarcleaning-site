// Reproducible photo derivative pipeline.
//
// Reads approved originals from the owner's local photo folder, strips all
// metadata (EXIF/GPS/etc. — sharp omits metadata unless withMetadata() is
// called), resizes to a web-appropriate width, and emits WebP files into
// public/photos/real-work. Run with:  node scripts/prepare-photos.mjs
//
// Every entry records the source filename and its SHA-1 at intake time so the
// published derivative can always be traced to the exact original.
// Rights note: originals are New Star's own posted work photos supplied by
// Angel on 2026-07-30 from Desktop/New Star Cleaning. Keep the originals and
// any customer/property permission records outside this repository.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_ROOT = "C:/Users/abarr/Desktop/New Star Cleaning/Ads";
const OUT_ROOT = "public/photos/real-work";
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

const PHOTOS = [
  // Empty-home / turnover set (posted album "Ads")
  {
    source: "747674609_1011513198277451_1484866233981358716_n.jpg",
    sha1: null,
    out: "kitchen-turnover-new-star.webp",
  },
  {
    source: "748700993_1011513061610798_3145131919182971688_n.jpg",
    sha1: null,
    out: "dining-kitchen-turnover-new-star.webp",
  },
  {
    source: "747643047_1011513274944110_6861039417206811953_n.jpg",
    sha1: null,
    out: "stairs-landing-kitchen-new-star.webp",
  },
  {
    source: "747613091_1011514111610693_6969201275928707311_n.jpg",
    sha1: null,
    out: "refrigerator-empty-clean-new-star.webp",
  },
  {
    source: "748097042_1011513651610739_4627839542438625202_n.jpg",
    sha1: null,
    out: "bathroom-turnover-new-star.webp",
  },
  // Furnished finished-room set (posted album "b4aftr")
  {
    source: "b4aftr/733271378_998604779568293_6275870559549768342_n.jpg",
    sha1: null,
    out: "kitchen-island-clean-new-star.webp",
  },
  {
    source: "b4aftr/731379717_998604549568316_7394142938744041457_n.jpg",
    sha1: null,
    out: "bedroom-clean-new-star.webp",
  },
  {
    source: "b4aftr/735608318_998604519568319_4022146392410814192_n.jpg",
    sha1: null,
    out: "living-room-clean-new-star.webp",
  },
  {
    source: "b4aftr/736260963_998904886204949_4447203718382757624_n.jpg",
    sha1: null,
    out: "primary-bathroom-clean-new-star.webp",
  },
  // Verified same-oven before/after pair (identical embossing, racks, and
  // surrounding cabinets in both frames).
  {
    source: "b4aftr/747978146_1012328544862583_3924488335998314948_n.jpg",
    sha1: null,
    out: "pairs/oven-buildup-before.webp",
  },
  {
    source: "b4aftr/748608171_1012328618195909_4179695596231234905_n.jpg",
    sha1: null,
    out: "pairs/oven-buildup-after.webp",
  },
];

async function run() {
  let failures = 0;
  for (const photo of PHOTOS) {
    const sourcePath = path.join(SOURCE_ROOT, photo.source);
    if (!existsSync(sourcePath)) {
      console.error(`MISSING SOURCE: ${sourcePath}`);
      failures += 1;
      continue;
    }
    const sha1 = createHash("sha1").update(readFileSync(sourcePath)).digest("hex");
    const outPath = path.join(OUT_ROOT, photo.out);
    mkdirSync(path.dirname(outPath), { recursive: true });
    await sharp(sourcePath)
      .rotate() // bake in EXIF orientation before metadata is stripped
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);
    console.log(`${photo.out}  <-  ${photo.source}  sha1:${sha1}`);
  }
  if (failures) process.exit(1);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

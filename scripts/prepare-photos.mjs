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
// Angel in July and August 2026 from Desktop/New Star Cleaning. Keep the
// originals and any customer/property permission records outside this repository.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_ROOT = "C:/Users/abarr/Desktop/New Star Cleaning/Ads";
const OUT_ROOT = "public/photos/real-work";
const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;

const PHOTOS = [
  {
    source: "b4aftr/749036329_1012329288195842_7247785626001234424_n.jpg",
    sha1: "2c6cbc758d9e7123256491fb4aab189f4adad5eb",
    out: "double-vanity-detail-new-star.webp",
  },
  {
    source: "b4aftr/732706681_998904959538275_4179846580063816355_n.jpg",
    sha1: "8c9dfce12c20e41ec28a4107651c08aed2d7abe8",
    out: "glass-shower-freestanding-tub-new-star.webp",
  },
  // Empty-home / turnover set (posted album "Ads")
  {
    source: "747674609_1011513198277451_1484866233981358716_n.jpg",
    sha1: "e58d56a106d6ea4f31f9ffd9c5dcdd17e51ff874",
    out: "kitchen-turnover-new-star.webp",
  },
  {
    source: "748700993_1011513061610798_3145131919182971688_n.jpg",
    sha1: "d49487a21d39eae0097901dfd5878c6e74c4c868",
    out: "dining-kitchen-turnover-new-star.webp",
  },
  {
    source: "747643047_1011513274944110_6861039417206811953_n.jpg",
    sha1: "ec5c3532b7a100e402f855095f096fb009f93b04",
    out: "stairs-landing-kitchen-new-star.webp",
  },
  {
    source: "747613091_1011514111610693_6969201275928707311_n.jpg",
    sha1: "2e6f483cb45ef939ac15bdcce3546828e8efc253",
    out: "refrigerator-empty-clean-new-star.webp",
  },
  {
    source: "748097042_1011513651610739_4627839542438625202_n.jpg",
    sha1: "ff96b3568ac4afa757613dc6f2c0355297070ad0",
    out: "bathroom-turnover-new-star.webp",
  },
  // Furnished finished-room set (posted album "b4aftr")
  {
    source: "b4aftr/733271378_998604779568293_6275870559549768342_n.jpg",
    sha1: "9b64e067308a25cf32eb8024e4588bef9156bcb4",
    out: "kitchen-island-clean-new-star.webp",
  },
  {
    source: "b4aftr/731379717_998604549568316_7394142938744041457_n.jpg",
    sha1: "5c15cc20bfd31cd221e548b37f7075d8e8f43bd8",
    out: "bedroom-clean-new-star.webp",
  },
  {
    source: "b4aftr/735608318_998604519568319_4022146392410814192_n.jpg",
    sha1: "64060e29380f733b8a8058ee35c2eb35a2790a04",
    out: "living-room-clean-new-star.webp",
  },
  {
    source: "b4aftr/736260963_998904886204949_4447203718382757624_n.jpg",
    sha1: "d2c5383d69daffe257715c838d4684bedefa3db0",
    out: "primary-bathroom-clean-new-star.webp",
  },
  // Verified same-oven before/after pair (identical embossing, racks, and
  // surrounding cabinets in both frames).
  {
    source: "b4aftr/747978146_1012328544862583_3924488335998314948_n.jpg",
    sha1: "bb4792d654cd9d27204a52df731e3ecc51ee2786",
    out: "pairs/oven-buildup-before.webp",
  },
  {
    source: "b4aftr/748608171_1012328618195909_4179695596231234905_n.jpg",
    sha1: "08b0a6b0d58bc7df1856f092e72c43c32cf5dc3d",
    out: "pairs/oven-buildup-after.webp",
  },
  // Aug 2026 move-out job pairs (same surface/location, verified frame by
  // frame). Sources carry the faint centered New Star watermark by design.
  {
    source: "aug-2026-pairs/pair-01-kitchen-cooktop-1-before.jpg",
    sha1: "e29ddcfe2bb7a87367a81386bb1d798c004debc7",
    out: "pairs/cooktop-grates-before.webp",
  },
  {
    source: "aug-2026-pairs/pair-01-kitchen-cooktop-2-after.jpg",
    sha1: "309f0403302bbdcc5fe0e5ae01baefa526eb92b8",
    out: "pairs/cooktop-grates-after.webp",
  },
  {
    source: "aug-2026-pairs/pair-05-bathroom-under-sink-cabinet-1-before.jpg",
    sha1: "528d7dac090e1022b4d96f30e73c65470d1be9e4",
    out: "pairs/under-sink-cabinet-before.webp",
  },
  {
    source: "aug-2026-pairs/pair-05-bathroom-under-sink-cabinet-2-after.jpg",
    sha1: "8f26707cd48852998d2521ec34bf2787289337e2",
    out: "pairs/under-sink-cabinet-after.webp",
  },
  {
    source: "aug-2026-pairs/pair-09-laundry-sink-counter-1-before.jpg",
    sha1: "14e7ef4eeb5cd129f90076e0e4cbd6cf1b613258",
    out: "pairs/laundry-sink-before.webp",
  },
  {
    source: "aug-2026-pairs/pair-09-laundry-sink-counter-2-after.jpg",
    sha1: "d25940aa4d1723ebb040f2569317c12b1e51dbb2",
    out: "pairs/laundry-sink-after.webp",
  },
  {
    source: "aug-2026-pairs/pair-10-laundry-alcove-1-before.jpg",
    sha1: "f4691bd4b9a726c97f7120bd5ed842ae5ec003eb",
    out: "pairs/laundry-alcove-before.webp",
  },
  {
    source: "aug-2026-pairs/pair-10-laundry-alcove-2-after.jpg",
    sha1: "b5a9bb750f253947751990138197cdb27076cc8e",
    out: "pairs/laundry-alcove-after.webp",
  },
  // Aug 2026 finished-room singles from the same jobs.
  {
    source: "aug-2026-pairs/single-01-den-built-ins-after.jpg",
    sha1: "fe0e1aa000515f5257bc3fbf7303c4e227ccc9e1",
    out: "den-built-ins-clean-new-star.webp",
  },
  {
    source: "aug-2026-pairs/single-02-walk-in-pantry-after.jpg",
    sha1: "4a565f4ef4dc25ff3fdd95a123dfecf69e9dcad2",
    out: "walk-in-pantry-clean-new-star.webp",
  },
  {
    source: "aug-2026-pairs/single-03-living-room-vacuumed-after.jpg",
    sha1: "01c799b5deab419f4e442ea11dc91935e64cf671",
    out: "living-room-vacuumed-new-star.webp",
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
    if (sha1 !== photo.sha1) {
      console.error(`SOURCE HASH MISMATCH: ${sourcePath}`);
      console.error(`  expected sha1:${photo.sha1}`);
      console.error(`  actual   sha1:${sha1}`);
      failures += 1;
      continue;
    }
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

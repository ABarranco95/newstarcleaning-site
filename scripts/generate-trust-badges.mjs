import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/trust");
mkdirSync(OUT_DIR, { recursive: true });

// Clean up deprecated separate-box PNGs so public/trust stays spotless
for (const old of [
  "hundreds-happy-homeowners.png",
  "hundreds-happy-homeowners-dark.png",
  "insured-local-guarantee.png",
  "insured-local-guarantee-dark.png",
]) {
  rmSync(path.join(OUT_DIR, old), { force: true });
}

// Official sharp 5-point Google Material star path (24x24 viewBox centered at 12,12)
function googleStarsGroup(startX, centerY, size = 19, gap = 21.5) {
  const scale = (size / 20).toFixed(4);
  let out = "";
  for (let i = 0; i < 5; i++) {
    const tx = (startX + i * gap).toFixed(2);
    const ty = (centerY - size / 2).toFixed(2);
    out += `<g transform="translate(${tx}, ${ty}) scale(${scale})"><path fill="#FBBC04" d="M10 1.3l2.62 5.31 5.86.85-4.24 4.13 1 5.84L10 14.67l-5.24 2.76 1-5.84L1.52 7.46l5.86-.85L10 1.3z"/></g>`;
  }
  return out;
}

function googleG(cx, cy, size = 28) {
  const scale = (size / 48).toFixed(4);
  const tx = (cx - size / 2).toFixed(2);
  const ty = (cy - size / 2).toFixed(2);
  return `<g transform="translate(${tx}, ${ty}) scale(${scale})">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </g>`;
}

function homeSealIcon(cx, cy, dark = false) {
  const navy = dark ? "#2B5B9E" : "#12325B";
  return `<g transform="translate(${cx}, ${cy})">
    <circle cx="0" cy="0" r="13.5" fill="${navy}"/>
    <path d="M-7.5 1.5 L0 -5.2 L7.5 1.5" fill="none" stroke="#FFFFFF" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-5 0.8 V6.8 H5 V0.8" fill="none" stroke="#FFFFFF" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="0" cy="-8.2" r="1.6" fill="#FBBC04"/>
  </g>`;
}

function shieldCheckIcon(cx, cy, dark = false) {
  const fill = dark ? "#1E7A4E" : "#16613E";
  return `<g transform="translate(${cx}, ${cy})">
    <path d="M0 -13.5 L11.5 -9.2 V-0.5 C11.5 6.8, 6.2 11.5, 0 14 C-6.2 11.5, -11.5 6.8, -11.5 -0.5 V-9.2 Z" fill="${fill}"/>
    <path d="M-4.6 0.4 L-1.4 3.6 L5.2 -3.4" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;
}

// 1. Standalone Sleek Single-Line Google Rating Lockup (for section headers & /our-work)
function buildGoogleLockupSvg({ dark = false } = {}) {
  const bg = dark ? "#102746" : "#F8FAFC";
  const border = dark ? "#2D4B73" : "#D6E0EC";
  const scoreColor = dark ? "#FFFFFF" : "#0F1C2E";
  const wordColor = dark ? "#CBD9EC" : "#475569";
  const dotColor = dark ? "#6884AA" : "#94A3B8";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="48" viewBox="0 0 256 48">
  <rect x="0.75" y="0.75" width="254.5" height="46.5" rx="6" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
  ${googleG(26, 24, 24)}
  ${googleStarsGroup(47, 24, 17.5, 19.5)}
  <text x="150" y="29.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="16" font-weight="800" fill="${scoreColor}">5.0</text>
  <circle cx="180" cy="24.5" r="1.7" fill="${dotColor}"/>
  <text x="188" y="29.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${wordColor}">Google</text>
</svg>`;
}

// 2. Single Unified Horizontal Trust Banner (Desktop & Tablet >= 640px)
function buildUnifiedBannerDesktopSvg({ dark = false } = {}) {
  const bg = dark ? "#102746" : "#F8FAFC";
  const border = dark ? "#2D4B73" : "#D6E0EC";
  const divider = dark ? "#2A476E" : "#CBD5E1";
  const ink = dark ? "#FFFFFF" : "#0F1C2E";
  const sub = dark ? "#CBD9EC" : "#334155";
  const dot = dark ? "#6884AA" : "#94A3B8";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="724" height="50" viewBox="0 0 724 50">
  <rect x="0.75" y="0.75" width="722.5" height="48.5" rx="6" fill="${bg}" stroke="${border}" stroke-width="1.5"/>

  <!-- Segment 1: Unboxed Google 'G' + 5 Flat Gold Stars + 5.0 · Google -->
  ${googleG(25, 25, 23)}
  ${googleStarsGroup(44, 25, 16.5, 18.2)}
  <text x="140" y="30.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="15.5" font-weight="800" fill="${ink}">5.0</text>
  <circle cx="168.5" cy="25.5" r="1.6" fill="${dot}"/>
  <text x="176" y="30.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="14.5" font-weight="700" fill="${sub}">Google</text>

  <line x1="242" y1="12" x2="242" y2="38" stroke="${divider}" stroke-width="1.25"/>

  <!-- Segment 2: 100s of Happy Homeowners -->
  ${homeSealIcon(266, 25, dark)}
  <text x="286" y="30.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="14.5" font-weight="700" letter-spacing="-0.15" fill="${ink}">100s of Happy Homeowners</text>

  <line x1="494" y1="12" x2="494" y2="38" stroke="${divider}" stroke-width="1.25"/>

  <!-- Segment 3: Insured · 24-Hr Guarantee -->
  ${shieldCheckIcon(516, 25, dark)}
  <text x="535" y="30.5" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="14.5" font-weight="700" letter-spacing="-0.15" fill="${ink}">Insured · 24-Hr Guarantee</text>
</svg>`;
}

// 3. Single Unified Mobile Trust Banner (< 640px — ONE single banner, never multiple boxes)
function buildUnifiedBannerMobileSvg({ dark = false } = {}) {
  const bg = dark ? "#102746" : "#F8FAFC";
  const border = dark ? "#2D4B73" : "#D6E0EC";
  const divider = dark ? "#254063" : "#E2E8F0";
  const ink = dark ? "#FFFFFF" : "#0F1C2E";
  const sub = dark ? "#CBD9EC" : "#334155";
  const dot = dark ? "#6884AA" : "#94A3B8";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="358" height="78" viewBox="0 0 358 78">
  <rect x="0.75" y="0.75" width="356.5" height="76.5" rx="6" fill="${bg}" stroke="${border}" stroke-width="1.5"/>

  <!-- Top Row: Google 5.0 5-Star Lockup -->
  ${googleG(22, 21, 20)}
  ${googleStarsGroup(39, 21, 15.5, 17)}
  <text x="129" y="26" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="14.5" font-weight="800" fill="${ink}">5.0</text>
  <circle cx="155" cy="21.5" r="1.5" fill="${dot}"/>
  <text x="162" y="26" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="13.5" font-weight="700" fill="${sub}">Google Rating</text>

  <line x1="12" y1="39.5" x2="346" y2="39.5" stroke="${divider}" stroke-width="1"/>

  <!-- Bottom Row: 100s of Happy Homeowners | Insured · 24-Hr -->
  ${homeSealIcon(21, 58.5, dark)}
  <text x="39" y="63" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="12.5" font-weight="700" letter-spacing="-0.15" fill="${ink}">100s of Happy Homeowners</text>

  <line x1="210" y1="47" x2="210" y2="70" stroke="${divider}" stroke-width="1.1"/>

  ${shieldCheckIcon(226, 58.5, dark)}
  <text x="242" y="63" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="12.5" font-weight="700" letter-spacing="-0.15" fill="${ink}">Insured · 24-Hr</text>
</svg>`;
}

const assets = [
  { name: "google-5-star-badge.png", svg: buildGoogleLockupSvg({ dark: false }) },
  { name: "google-5-star-badge-dark.png", svg: buildGoogleLockupSvg({ dark: true }) },
  { name: "trust-banner.png", svg: buildUnifiedBannerDesktopSvg({ dark: false }) },
  { name: "trust-banner-dark.png", svg: buildUnifiedBannerDesktopSvg({ dark: true }) },
  { name: "trust-banner-mobile.png", svg: buildUnifiedBannerMobileSvg({ dark: false }) },
  { name: "trust-banner-mobile-dark.png", svg: buildUnifiedBannerMobileSvg({ dark: true }) },
];

for (const asset of assets) {
  const target = path.join(OUT_DIR, asset.name);
  await sharp(Buffer.from(asset.svg), { density: 288 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`Generated ${asset.name}: ${meta.width}x${meta.height}`);
}

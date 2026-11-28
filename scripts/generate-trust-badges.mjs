import { mkdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/trust");
mkdirSync(OUT_DIR, { recursive: true });

function starPolygon(cx, cy, outerR, innerR) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(" ");
}

function fiveStarsSvg(startX, cy, outerR = 12.6, gap = 27.5) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    const cx = startX + i * gap;
    out += `<polygon points="${starPolygon(cx, cy + 0.8, outerR, outerR * 0.44)}" fill="#D98A00" opacity="0.32"/>`;
    out += `<polygon points="${starPolygon(cx, cy, outerR, outerR * 0.44)}" fill="url(#goldStarGrad)" stroke="#D48806" stroke-width="0.7" stroke-linejoin="round"/>`;
  }
  return out;
}

function buildGoogleBadgeSvg({ dark = false } = {}) {
  const bg = dark ? "#102849" : "#FFFFFF";
  const outerStroke = dark ? "#355582" : "#C5D1E0";
  const innerStroke = dark ? "#1D3C69" : "#EDF2F8";
  const labelColor = dark ? "#DCE7F5" : "#334155";
  const scoreColor = dark ? "#FFFFFF" : "#0F1C2E";
  const subColor = dark ? "#B8CBE4" : "#526075";
  const medallionBg = dark ? "#FFFFFF" : "#F8FAFC";
  const medallionStroke = dark ? "#FFFFFF" : "#E2E8F0";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="388" height="156" viewBox="0 0 388 156">
  <defs>
    <linearGradient id="goldStarGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFD043"/>
      <stop offset="55%" stop-color="#FBBC04"/>
      <stop offset="100%" stop-color="#E59400"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="384" height="152" rx="8" fill="${bg}" stroke="${outerStroke}" stroke-width="2.5"/>
  <rect x="7" y="7" width="374" height="142" rx="5" fill="none" stroke="${innerStroke}" stroke-width="1.5"/>
  <path d="M10 3.25 H103 V7.25 H10 Z" fill="#4285F4"/>
  <path d="M103 3.25 H196 V7.25 H103 Z" fill="#EA4335"/>
  <path d="M196 3.25 H289 V7.25 H196 Z" fill="#FBBC05"/>
  <path d="M289 3.25 H378 V7.25 H289 Z" fill="#34A853"/>

  <rect x="20" y="28" width="100" height="100" rx="10" fill="${medallionBg}" stroke="${medallionStroke}" stroke-width="2"/>
  <g transform="translate(38, 46) scale(1.3333)">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </g>

  <text x="136" y="54" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="25" font-weight="700" letter-spacing="-0.2" fill="${labelColor}">Google Rating</text>
  <text x="136" y="102" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="39" font-weight="800" letter-spacing="-0.8" fill="${scoreColor}">5.0</text>
  ${fiveStarsSvg(216, 88, 12.6, 27.5)}
  <text x="137" y="131" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="1.4" fill="${subColor}">5-STAR RATED</text>
</svg>`;
}

function buildHomeownersSealSvg({ dark = false } = {}) {
  const bg = dark ? "#102849" : "#FFFFFF";
  const outerStroke = dark ? "#355582" : "#C5D1E0";
  const innerStroke = dark ? "#1D3C69" : "#EDF2F8";
  const primaryText = dark ? "#FFFFFF" : "#12325B";
  const secondaryText = dark ? "#DCE7F5" : "#0F1C2E";
  const goldText = dark ? "#F5C259" : "#9E6908";
  const emblemNavy = dark ? "#1A3B68" : "#12325B";
  const emblemStroke = dark ? "#F5C259" : "#C98C1D";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="406" height="156" viewBox="0 0 406 156">
  <defs>
    <linearGradient id="laurelGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E5AD3B"/>
      <stop offset="50%" stop-color="#C98C1D"/>
      <stop offset="100%" stop-color="#9E6908"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="402" height="152" rx="8" fill="${bg}" stroke="${outerStroke}" stroke-width="2.5"/>
  <rect x="7" y="7" width="392" height="142" rx="5" fill="none" stroke="${innerStroke}" stroke-width="1.5"/>
  <path d="M10 3.25 H396 V7.25 H10 Z" fill="url(#laurelGold)"/>

  <g transform="translate(70, 79)">
    <circle cx="0" cy="0" r="48" fill="${emblemNavy}" stroke="url(#laurelGold)" stroke-width="3.2"/>
    <circle cx="0" cy="0" r="40" fill="none" stroke="${emblemStroke}" stroke-width="1.3" opacity="0.8"/>
    <polygon points="${starPolygon(-14, -24, 4.8, 2.1)}" fill="#FFD043"/>
    <polygon points="${starPolygon(0, -28, 6.2, 2.7)}" fill="#FFD043"/>
    <polygon points="${starPolygon(14, -24, 4.8, 2.1)}" fill="#FFD043"/>
    <path d="M-21 4 L0 -14 L21 4" fill="none" stroke="#FFFFFF" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-14 2 V20 H14 V2" fill="none" stroke="#FFFFFF" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="-4.5" y="6.5" width="9" height="9" rx="1.5" fill="#FFD043"/>
  </g>

  <text x="136" y="45" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="15.5" font-weight="800" letter-spacing="1.4" fill="${goldText}">SERVING SINCE 2020</text>
  <text x="136" y="84" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="33" font-weight="800" letter-spacing="-0.6" fill="${primaryText}">100s of Happy</text>
  <text x="136" y="122" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="33" font-weight="800" letter-spacing="-0.6" fill="${secondaryText}">Homeowners</text>
</svg>`;
}

function buildInsuredShieldSvg({ dark = false } = {}) {
  const bg = dark ? "#102849" : "#FFFFFF";
  const outerStroke = dark ? "#355582" : "#C5D1E0";
  const innerStroke = dark ? "#1D3C69" : "#EDF2F8";
  const primaryText = dark ? "#FFFFFF" : "#0F1C2E";
  const subText = dark ? "#8CE0B5" : "#16613E";
  const overlineText = dark ? "#B8CBE4" : "#12325B";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="388" height="156" viewBox="0 0 388 156">
  <defs>
    <linearGradient id="shieldNavy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A4378"/>
      <stop offset="100%" stop-color="#0E2749"/>
    </linearGradient>
    <linearGradient id="shieldGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F0B946"/>
      <stop offset="100%" stop-color="#B97B10"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="384" height="152" rx="8" fill="${bg}" stroke="${outerStroke}" stroke-width="2.5"/>
  <rect x="7" y="7" width="374" height="142" rx="5" fill="none" stroke="${innerStroke}" stroke-width="1.5"/>
  <path d="M10 3.25 H378 V7.25 H10 Z" fill="#12325B"/>

  <g transform="translate(68, 79)">
    <path d="M0 -48 L40 -33 V-2 C40 24, 21 41, 0 50 C-21 41, -40 24, -40 -2 V-33 Z" fill="url(#shieldNavy)" stroke="url(#shieldGold)" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M0 -40 L32 -28 V-2 C32 19, 17 34, 0 42 C-17 34, -32 19, -32 -2 V-28 Z" fill="none" stroke="#EAB543" stroke-width="1.2" opacity="0.75"/>
    <path d="M-15 2 L-4 13 L18 -11" fill="none" stroke="#FFFFFF" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    <polygon points="${starPolygon(0, -24, 5.8, 2.6)}" fill="#FFD043"/>
  </g>

  <text x="128" y="45" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="15.5" font-weight="800" letter-spacing="1.4" fill="${overlineText}">LOCAL PROTECTION</text>
  <text x="128" y="85" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="34" font-weight="800" letter-spacing="-0.6" fill="${primaryText}">Fully Insured</text>
  <text x="128" y="122" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="-0.2" fill="${subText}">24-Hr Guarantee</text>
</svg>`;
}

const assets = [
  { name: "google-5-star-badge.png", svg: buildGoogleBadgeSvg({ dark: false }) },
  { name: "google-5-star-badge-dark.png", svg: buildGoogleBadgeSvg({ dark: true }) },
  { name: "hundreds-happy-homeowners.png", svg: buildHomeownersSealSvg({ dark: false }) },
  { name: "hundreds-happy-homeowners-dark.png", svg: buildHomeownersSealSvg({ dark: true }) },
  { name: "insured-local-guarantee.png", svg: buildInsuredShieldSvg({ dark: false }) },
  { name: "insured-local-guarantee-dark.png", svg: buildInsuredShieldSvg({ dark: true }) },
];

for (const asset of assets) {
  const target = path.join(OUT_DIR, asset.name);
  await sharp(Buffer.from(asset.svg), { density: 216 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`Generated ${asset.name}: ${meta.width}x${meta.height}`);
}

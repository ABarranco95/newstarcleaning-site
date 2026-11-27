// Fresno / Clovis / Madera residential pricing engine for New Star Cleaning LLC.
// Ported 1:1 from Apex CRM FRESNO_RATE_CARD + LABOR_HOURS (lib/pricing-engine.ts).
// Engine internal math runs in cents; customer helpers return whole dollars.

export type FresnoServiceType = "STANDARD" | "DEEP" | "MOVE_IN" | "MOVE_OUT" | "OFFICE";
export type FresnoResidentialService = "STANDARD" | "DEEP" | "MOVE_OUT";
export type FresnoFrequency = "ONE_TIME" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";

export const CONDITION_INPUTS = [
  "well_kept",
  "lived_in",
  "extra_attention",
  "heavy",
  "extreme",
  "normal",
  "dusty",
  "heavy_duty",
] as const;

export type FresnoConditionTier = (typeof CONDITION_INPUTS)[number];
export type FresnoConditionLevel =
  | "well_kept"
  | "lived_in"
  | "extra_attention"
  | "heavy"
  | "extreme";

type LaborService = "DEEP" | "MOVE_IN" | "MOVE_OUT";

export interface FresnoPricingInput {
  serviceType: FresnoServiceType;
  sqft?: number;
  beds: number;
  baths: number;
  halfBaths?: number;
  frequency: FresnoFrequency;
  addons?: string[];
  addonQuantities?: Record<string, number>;
  hasPets?: boolean;
  condition?: FresnoConditionTier;
  propertyType?: "house" | "apartment" | "condo" | "townhouse";
}

export interface FresnoPurchasedAddon {
  slug: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface FresnoBreakdownLine {
  description: string;
  amount: number;
  type: "base" | "addon" | "discount" | "fee" | "surcharge";
}

export interface FresnoPricingOutput {
  purchasedAddons: FresnoPurchasedAddon[];
  basePrice: number;
  addonTotal: number;
  subtotal: number;
  frequencyDiscount: number;
  petFee: number;
  conditionSurcharge: number;
  totalPrice: number;
  estimatedMinutes: number;
  breakdown: FresnoBreakdownLine[];
}

export interface SqftTier {
  max: number;
  dollars: number;
}

export interface ServiceTable {
  beds: number[];
  baths: number[];
  halfBath: number;
  sqft: SqftTier[];
  floor: number;
}

export interface FresnoRateCard {
  crewRatePerHour: number;
  laborRatePerHour: number;
  STANDARD: ServiceTable;
  DEEP: ServiceTable;
  MOVE_IN: ServiceTable;
  MOVE_OUT: ServiceTable;
  OFFICE: { floor: number; addons: Record<string, number> };
}

export const LABOR_RATE_PER_HOUR_DOLLARS = 60;
export const FRESNO_CREW_RATE_PER_HOUR = 55;
export const LARGE_HOME_PHOTO_SQFT = 3500;

export const FRESNO_RATE_CARD: FresnoRateCard = {
  crewRatePerHour: FRESNO_CREW_RATE_PER_HOUR,
  laborRatePerHour: LABOR_RATE_PER_HOUR_DOLLARS,
  STANDARD: {
    beds: [0, 42, 53, 80, 106, 133, 159, 186],
    baths: [0, 53, 74, 111, 148, 186, 223],
    halfBath: 16,
    sqft: [
      { max: 999, dollars: 80 },
      { max: 1499, dollars: 80 },
      { max: 1999, dollars: 85 },
      { max: 2499, dollars: 101 },
      { max: 2999, dollars: 117 },
      { max: 3499, dollars: 138 },
      { max: 3999, dollars: 159 },
      { max: 4499, dollars: 186 },
      { max: 4999, dollars: 228 },
      { max: 5499, dollars: 265 },
    ],
    floor: 165,
  },
  DEEP: {
    beds: [0, 40, 70, 105, 140, 175, 210, 245],
    baths: [0, 55, 100, 150, 200, 250, 300],
    halfBath: 15,
    sqft: [
      { max: 999, dollars: 140 },
      { max: 1499, dollars: 170 },
      { max: 1999, dollars: 200 },
      { max: 2499, dollars: 235 },
      { max: 2999, dollars: 270 },
      { max: 3499, dollars: 305 },
      { max: 3999, dollars: 350 },
      { max: 4499, dollars: 420 },
      { max: 4999, dollars: 500 },
      { max: 5499, dollars: 590 },
    ],
    floor: 235,
  },
  MOVE_IN: {
    beds: [0, 25, 55, 105, 140, 175, 210, 245],
    baths: [0, 45, 85, 130, 170, 215, 255],
    halfBath: 15,
    sqft: [
      { max: 999, dollars: 170 },
      { max: 1499, dollars: 225 },
      { max: 1999, dollars: 290 },
      { max: 2499, dollars: 365 },
      { max: 2999, dollars: 410 },
      { max: 3499, dollars: 455 },
      { max: 3999, dollars: 510 },
      { max: 4499, dollars: 650 },
      { max: 4999, dollars: 780 },
      { max: 5499, dollars: 920 },
    ],
    floor: 325,
  },
  MOVE_OUT: {
    beds: [0, 25, 55, 105, 140, 175, 210, 245],
    baths: [0, 45, 85, 130, 170, 215, 255],
    halfBath: 15,
    sqft: [
      { max: 999, dollars: 170 },
      { max: 1499, dollars: 225 },
      { max: 1999, dollars: 290 },
      { max: 2499, dollars: 365 },
      { max: 2999, dollars: 410 },
      { max: 3499, dollars: 455 },
      { max: 3999, dollars: 510 },
      { max: 4499, dollars: 650 },
      { max: 4999, dollars: 780 },
      { max: 5499, dollars: 920 },
    ],
    floor: 325,
  },
  OFFICE: { floor: 150, addons: {} },
};

export interface FresnoAddonDef {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  dollars: number;
  qty: boolean;
  unitLabel?: string;
  maxQuantity: number;
  minutes: number;
}

export const FRESNO_ADDON_CATALOG: Record<string, FresnoAddonDef> = {
  inside_oven: {
    slug: "inside_oven",
    name: "Inside Oven",
    shortName: "Inside Oven",
    description: "Baked-on grease lifted from racks and door glass",
    dollars: 45,
    qty: true,
    unitLabel: "per oven",
    maxQuantity: 4,
    minutes: 40,
  },
  inside_fridge: {
    slug: "inside_fridge",
    name: "Inside Refrigerator",
    shortName: "Inside Fridge",
    description: "Shelves and drawers removed and washed clean",
    dollars: 35,
    qty: true,
    unitLabel: "per fridge",
    maxQuantity: 4,
    minutes: 30,
  },
  interior_windows_glass: {
    slug: "interior_windows_glass",
    name: "Interior Windows (glass only)",
    shortName: "Interior Glass",
    description: "Streak-free wipe of reachable interior glass panes",
    dollars: 6,
    qty: true,
    unitLabel: "per window",
    maxQuantity: 50,
    minutes: 5,
  },
  window_tracks: {
    slug: "window_tracks",
    name: "Window Tracks & Sills",
    shortName: "Tracks & Sills",
    description: "Reachable tracks, sills, and frames scrubbed",
    dollars: 3,
    qty: true,
    unitLabel: "per window",
    maxQuantity: 50,
    minutes: 3,
  },
  interior_windows_full: {
    slug: "interior_windows_full",
    name: "Interior Windows (glass + tracks)",
    shortName: "Interior Glass + Tracks",
    description: "Reachable interior panes plus sills and tracks scrubbed",
    dollars: 9,
    qty: true,
    unitLabel: "per window",
    maxQuantity: 50,
    minutes: 8,
  },
  blind_dusting: {
    slug: "blind_dusting",
    name: "Blind Dusting",
    shortName: "Blind Dusting",
    description: "Both sides of every slat dusted",
    dollars: 5,
    qty: true,
    unitLabel: "per set",
    maxQuantity: 40,
    minutes: 4,
  },
  blinds: {
    slug: "blinds",
    name: "Heavy Blind Cleaning",
    shortName: "Heavy Blinds",
    description: "Stained or greasy slats hand-washed",
    dollars: 15,
    qty: true,
    unitLabel: "per set",
    maxQuantity: 8,
    minutes: 15,
  },
  carpet_shampoo_room: {
    slug: "carpet_shampoo_room",
    name: "Carpet Shampoo (per room)",
    shortName: "Carpet Shampoo",
    description: "Any carpeted bedroom, living room, or den",
    dollars: 60,
    qty: true,
    unitLabel: "per room",
    maxQuantity: 10,
    minutes: 30,
  },
  carpet_shampoo_stairs: {
    slug: "carpet_shampoo_stairs",
    name: "Carpet Shampoo (per stairway)",
    shortName: "Carpet Shampoo (Stairs)",
    description: "One full flight of carpeted stairs",
    dollars: 45,
    qty: true,
    unitLabel: "per stairway",
    maxQuantity: 5,
    minutes: 25,
  },
  carpet_shampoo_hall: {
    slug: "carpet_shampoo_hall",
    name: "Carpet Shampoo (per hallway)",
    shortName: "Carpet Shampoo (Hall)",
    description: "Connecting halls and landings between rooms",
    dollars: 30,
    qty: true,
    unitLabel: "per hallway",
    maxQuantity: 5,
    minutes: 20,
  },
};

export const ADDON_CATALOG = FRESNO_ADDON_CATALOG;

export const FRESNO_POPULAR_ADDONS: FresnoAddonDef[] = [
  FRESNO_ADDON_CATALOG.inside_oven,
  FRESNO_ADDON_CATALOG.inside_fridge,
  FRESNO_ADDON_CATALOG.interior_windows_glass,
  FRESNO_ADDON_CATALOG.window_tracks,
  FRESNO_ADDON_CATALOG.carpet_shampoo_room,
];

export const FREQUENCY_DISCOUNTS: Record<FresnoFrequency, number> = {
  ONE_TIME: 0,
  WEEKLY: 20,
  BIWEEKLY: 15,
  MONTHLY: 10,
};

export const FRESNO_SERVICE_FLOORS_CENTS: Record<FresnoServiceType, number> = {
  STANDARD: 16500,
  DEEP: 23500,
  MOVE_IN: 32500,
  MOVE_OUT: 32500,
  OFFICE: 15000,
};

const PET_FEE_FLOOR_CENTS = 3000;
const PET_FEE_CAP_CENTS = 6000;
const PET_FEE_PERCENT = 0.1;

const CONDITION_FLOOR_CENTS = 6000;
const DUSTY_FLOOR_CENTS = 2500;
const HEAVY_DUTY_FLOOR_CENTS = 10000;

const CONDITION_LEVEL: Record<string, FresnoConditionLevel> = {
  well_kept: "well_kept",
  lived_in: "lived_in",
  extra_attention: "extra_attention",
  heavy: "heavy",
  extreme: "extreme",
  normal: "lived_in",
  dusty: "extra_attention",
  heavy_duty: "extreme",
  standard: "lived_in",
  light: "extra_attention",
};

export function conditionLevelOf(condition?: string): FresnoConditionLevel {
  if (!condition) return "lived_in";
  return CONDITION_LEVEL[condition] ?? "lived_in";
}

const ROUTINE_CONDITION: Record<
  FresnoConditionLevel,
  { time: number; price: number; floorCents: number; chargeLabel: string; customerTitle: string }
> = {
  well_kept: {
    time: 1.0,
    price: 1.0,
    floorCents: 0,
    chargeLabel: "",
    customerTitle: "Well kept",
  },
  lived_in: {
    time: 1.0,
    price: 1.0,
    floorCents: 0,
    chargeLabel: "",
    customerTitle: "Lived in",
  },
  extra_attention: {
    time: 1.25,
    price: 1.25,
    floorCents: DUSTY_FLOOR_CENTS,
    chargeLabel: "Light buildup adjustment",
    customerTitle: "Needs extra attention",
  },
  heavy: {
    time: 1.45,
    price: 1.5,
    floorCents: CONDITION_FLOOR_CENTS,
    chargeLabel: "Heavy condition surcharge",
    customerTitle: "Heavy buildup",
  },
  extreme: {
    time: 1.6,
    price: 1.75,
    floorCents: HEAVY_DUTY_FLOOR_CENTS,
    chargeLabel: "Heavy duty surcharge",
    customerTitle: "Extreme",
  },
};

const TIME_PROFILES: Record<
  FresnoServiceType,
  { sqftBase: number; bedAdd: number; bathAdd: number; halfBathAdd: number; floor: number }
> = {
  STANDARD: { sqftBase: 75, bedAdd: 15, bathAdd: 20, halfBathAdd: 10, floor: 120 },
  DEEP: { sqftBase: 150, bedAdd: 25, bathAdd: 35, halfBathAdd: 15, floor: 240 },
  MOVE_IN: { sqftBase: 175, bedAdd: 25, bathAdd: 40, halfBathAdd: 15, floor: 300 },
  MOVE_OUT: { sqftBase: 175, bedAdd: 25, bathAdd: 40, halfBathAdd: 15, floor: 300 },
  OFFICE: { sqftBase: 60, bedAdd: 0, bathAdd: 15, halfBathAdd: 5, floor: 90 },
};

const FREQUENCY_TIME_FACTOR: Record<FresnoFrequency, number> = {
  ONE_TIME: 1.0,
  WEEKLY: 0.85,
  BIWEEKLY: 0.92,
  MONTHLY: 0.98,
};

export interface LaborHoursProfile {
  baseHours: number;
  hoursPer1000Sqft: number;
  hoursPerBedroom: number;
  hoursPerFullBath: number;
  hoursPerHalfBath: number;
  minimumHours: number;
}

export const LABOR_HOURS: Record<LaborService, LaborHoursProfile> = {
  DEEP: {
    baseHours: 1.3,
    hoursPer1000Sqft: 1.04,
    hoursPerBedroom: 0.455,
    hoursPerFullBath: 1.04,
    hoursPerHalfBath: 0.39,
    minimumHours: 3.25,
  },
  MOVE_IN: {
    baseHours: 1.5,
    hoursPer1000Sqft: 1.0,
    hoursPerBedroom: 0.75,
    hoursPerFullBath: 1.0,
    hoursPerHalfBath: 0.4,
    minimumHours: 3.0,
  },
  MOVE_OUT: {
    baseHours: 1.5,
    hoursPer1000Sqft: 1.0,
    hoursPerBedroom: 0.75,
    hoursPerFullBath: 1.0,
    hoursPerHalfBath: 0.4,
    minimumHours: 3.0,
  },
};

export const CONDITION_TIME_MULTIPLIER: Record<
  LaborService,
  Record<FresnoConditionLevel, number>
> = {
  DEEP: { well_kept: 0.92, lived_in: 1.0, extra_attention: 1.2, heavy: 1.48, extreme: 1.95 },
  MOVE_IN: { well_kept: 0.92, lived_in: 1.0, extra_attention: 1.2, heavy: 1.5, extreme: 1.98 },
  MOVE_OUT: { well_kept: 0.92, lived_in: 1.0, extra_attention: 1.2, heavy: 1.5, extreme: 1.98 },
};

export const CONDITION_ROOM_HOURS: Record<
  FresnoConditionLevel,
  { tubPerBath: number; kitchenCabinets: number }
> = {
  well_kept: { tubPerBath: 0, kitchenCabinets: 0 },
  lived_in: { tubPerBath: 0, kitchenCabinets: 0 },
  extra_attention: { tubPerBath: 0.3, kitchenCabinets: 0.15 },
  heavy: { tubPerBath: 0.65, kitchenCabinets: 0.4 },
  extreme: { tubPerBath: 0.75, kitchenCabinets: 0.4 },
};

const MAX_SCRUBBED_BATHS = 2;

export const CONDITION_JOB_FLOORS: Record<LaborService, Record<FresnoConditionLevel, number>> = {
  MOVE_OUT: { well_kept: 325, lived_in: 325, extra_attention: 385, heavy: 500, extreme: 600 },
  MOVE_IN: { well_kept: 325, lived_in: 325, extra_attention: 385, heavy: 500, extreme: 600 },
  DEEP: { well_kept: 235, lived_in: 235, extra_attention: 300, heavy: 365, extreme: 430 },
};

function roundHours(hours: number): number {
  return Math.round(hours * 20) / 20;
}

function roundCentsUpTo5(cents: number): number {
  return Math.ceil(cents / 500) * 500;
}

function roundTo15(min: number): number {
  return Math.max(0, Math.round(min / 15) * 15);
}

function clampSurcharge(basePrice: number, floor: number, percent: number, cap: number): number {
  return Math.min(Math.max(Math.round(basePrice * percent), floor), cap);
}

/**
 * Splits fractional bath selections (e.g. 2.5 -> 2 full + 1 half) identically
 * to New Star's live Apex CRM quote bridge (`usePaidPriceRange.ts`).
 */
export function splitBathrooms(
  baths: number,
  explicitHalfBaths?: number,
): { fullBaths: number; halfBaths: number } {
  const safeBaths = Number.isFinite(baths) && baths > 0 ? baths : 1;
  const fullBaths = Math.max(1, Math.floor(safeBaths));
  const fractionalHalf = Math.abs((safeBaths % 1) - 0.5) < 0.01 ? 1 : 0;
  const halfBaths =
    explicitHalfBaths !== undefined ? Math.max(0, Math.round(explicitHalfBaths)) : fractionalHalf;
  return { fullBaths, halfBaths };
}

function serviceLabel(type: FresnoServiceType): string {
  switch (type) {
    case "STANDARD":
      return "Routine clean";
    case "DEEP":
      return "Deep clean";
    case "MOVE_IN":
      return "Move-in clean";
    case "MOVE_OUT":
      return "Move-out clean";
    case "OFFICE":
      return "Office clean";
  }
}

function lookupBeds(table: ServiceTable, beds: number): number {
  const n = Math.max(1, Math.min(7, Math.round(beds)));
  return table.beds[n] ?? table.beds[table.beds.length - 1];
}

function lookupBaths(table: ServiceTable, fullBaths: number): number {
  const n = Math.max(1, Math.min(6, Math.ceil(fullBaths)));
  return table.baths[n] ?? table.baths[table.baths.length - 1];
}

/**
 * Midpoint-anchored linear interpolation matching Apex CRM `lookupSqft`
 * (`projects/apex-crm/lib/pricing-engine.ts` lines 496-518).
 */
export function lookupSqftMidpoint(table: ServiceTable, sqft: number | undefined): number {
  const s = Math.max(1, sqft || 0);
  const tiers = table.sqft;
  const lo = (i: number) => (i === 0 ? 1 : tiers[i - 1].max + 1);
  const mid = (i: number) => (lo(i) + tiers[i].max) / 2;
  if (s <= mid(0)) return tiers[0].dollars;
  for (let i = 1; i < tiers.length; i++) {
    if (s <= mid(i)) {
      const prevMid = mid(i - 1);
      const curMid = mid(i);
      const span = curMid - prevMid;
      const frac = span > 0 ? (s - prevMid) / span : 0;
      return Math.round(tiers[i - 1].dollars + (tiers[i].dollars - tiers[i - 1].dollars) * frac);
    }
  }
  return tiers[tiers.length - 1].dollars;
}

export function laborBaseHours(input: FresnoPricingInput, service: LaborService): number {
  const profile = LABOR_HOURS[service];
  const sqft = Math.max(300, input.sqft || 1000);
  const beds = Math.max(1, Math.round(input.beds || 1));
  const { fullBaths, halfBaths } = splitBathrooms(input.baths, input.halfBaths);
  const hours =
    profile.baseHours +
    (sqft / 1000) * profile.hoursPer1000Sqft +
    beds * profile.hoursPerBedroom +
    fullBaths * profile.hoursPerFullBath +
    halfBaths * profile.hoursPerHalfBath;
  return Math.max(profile.minimumHours, roundHours(hours));
}

function conditionAddedHours(
  baseHours: number,
  level: FresnoConditionLevel,
  service: LaborService,
): number {
  const multiplier = CONDITION_TIME_MULTIPLIER[service][level] ?? 1;
  return roundHours(baseHours * (multiplier - 1));
}

function conditionRoomHours(input: FresnoPricingInput, level: FresnoConditionLevel): number {
  const rule = CONDITION_ROOM_HOURS[level];
  if (!rule || (rule.tubPerBath === 0 && rule.kitchenCabinets === 0)) return 0;
  const { fullBaths } = splitBathrooms(input.baths, input.halfBaths);
  const baths = Math.min(MAX_SCRUBBED_BATHS, Math.max(0, fullBaths));
  return roundHours(baths * rule.tubPerBath + rule.kitchenCabinets);
}

export function laborJobHours(input: FresnoPricingInput, service: LaborService): number {
  const base = laborBaseHours(input, service);
  const level = conditionLevelOf(input.condition);
  const added = conditionAddedHours(base, level, service) + conditionRoomHours(input, level);
  let addonHours = 0;
  const quantities = input.addonQuantities || {};
  for (const slug of input.addons || []) {
    const def = FRESNO_ADDON_CATALOG[slug];
    if (!def) continue;
    const qty = def.qty ? Math.max(1, Math.floor(quantities[slug] || 1)) : 1;
    addonHours += (def.minutes * qty) / 60;
  }
  return roundHours(base + added + addonHours);
}

export function estimateFresnoMinutes(
  input: FresnoPricingInput,
  rates?: FresnoRateCard,
): number {
  if (
    rates?.laborRatePerHour !== undefined &&
    (input.serviceType === "DEEP" ||
      input.serviceType === "MOVE_IN" ||
      input.serviceType === "MOVE_OUT")
  ) {
    const hours = laborJobHours(input, input.serviceType);
    return Math.round(hours * 60 * (FREQUENCY_TIME_FACTOR[input.frequency] ?? 1.0));
  }

  const profile = TIME_PROFILES[input.serviceType];
  if (!profile) return 0;

  let minutes = 0;
  const sqft = Math.max(500, input.sqft || 1000);
  const { fullBaths, halfBaths } = splitBathrooms(input.baths, input.halfBaths);

  if (input.serviceType === "OFFICE") {
    minutes += (sqft / 1000) * profile.sqftBase;
    minutes += profile.bathAdd * fullBaths;
  } else {
    minutes += (sqft / 1000) * profile.sqftBase;
    minutes += profile.bedAdd * Math.max(1, Math.round(input.beds || 1));
    minutes += profile.bathAdd * fullBaths;
    minutes += profile.halfBathAdd * halfBaths;
  }

  const quantities = input.addonQuantities || {};
  for (const slug of input.addons || []) {
    const def = FRESNO_ADDON_CATALOG[slug];
    if (!def) continue;
    const qty = def.qty ? Math.max(1, Math.floor(quantities[slug] || 1)) : 1;
    minutes += def.minutes * qty;
  }

  const level = conditionLevelOf(input.condition);
  const conditionFactor = ROUTINE_CONDITION[level].time;
  if (conditionFactor !== 1) minutes *= conditionFactor;

  minutes *= FREQUENCY_TIME_FACTOR[input.frequency] ?? 1.0;
  if (minutes < profile.floor) minutes = profile.floor;

  return roundTo15(minutes);
}

export function largeHomePhotoRequired(input: {
  serviceType?: string;
  sqft?: number | null;
}): boolean {
  return (
    ["DEEP", "MOVE_IN", "MOVE_OUT"].includes(input.serviceType ?? "") &&
    (input.sqft ?? 0) >= LARGE_HOME_PHOTO_SQFT
  );
}

/**
 * Full penny-exact Fresno pricing engine ported 1:1 from Apex CRM `calculatePrice`.
 * Enforces hard floors ($165 Standard, $235 Deep, $325 Move-In/Out) both on base
 * cleans and AFTER recurring discounts so recurring discounts never undercut $165.
 */
export function calculateFresnoPrice(
  rawInput: FresnoPricingInput,
  rates: FresnoRateCard = FRESNO_RATE_CARD,
): FresnoPricingOutput {
  const { fullBaths, halfBaths } = splitBathrooms(rawInput.baths, rawInput.halfBaths);
  const input: FresnoPricingInput = {
    ...rawInput,
    baths: fullBaths,
    halfBaths,
    addons: rawInput.addons ?? [],
    addonQuantities: rawInput.addonQuantities ?? {},
    hasPets: rawInput.hasPets ?? false,
    condition: rawInput.condition ?? "lived_in",
  };

  const crewRateDollars = rates.crewRatePerHour;
  const laborRate = rates.laborRatePerHour;
  const breakdown: FresnoBreakdownLine[] = [];
  const purchasedAddons: FresnoPurchasedAddon[] = [];

  const laborService: LaborService | null =
    input.serviceType === "DEEP" ||
    input.serviceType === "MOVE_IN" ||
    input.serviceType === "MOVE_OUT"
      ? input.serviceType
      : null;

  let basePrice = 0;
  let conditionSurcharge = 0;
  let laborFloorAdjust = 0;

  if (input.serviceType === "OFFICE") {
    basePrice = rates.OFFICE.floor * 100;
    breakdown.push({
      description: serviceLabel("OFFICE"),
      amount: basePrice,
      type: "base",
    });
  } else if (laborService) {
    const baseHours = laborBaseHours(input, laborService);
    const level = conditionLevelOf(input.condition);
    const addedHours = roundHours(
      conditionAddedHours(baseHours, level, laborService) + conditionRoomHours(input, level),
    );

    const baseCents = roundCentsUpTo5(Math.round(baseHours * laborRate * 100));
    const baseLine: FresnoBreakdownLine = {
      description: `${serviceLabel(laborService)} (${baseHours.toFixed(2)} labor hours)`,
      amount: baseCents,
      type: "base",
    };
    breakdown.push(baseLine);
    basePrice = baseCents;
    let cleanCents = baseCents;

    if (addedHours !== 0) {
      const delta = roundCentsUpTo5(Math.round(addedHours * laborRate * 100));
      if (delta >= 0) {
        conditionSurcharge = delta;
        cleanCents = baseCents + delta;
        breakdown.push({
          description: `${ROUTINE_CONDITION[level].customerTitle} (+${addedHours.toFixed(2)} hours)`,
          amount: delta,
          type: "surcharge",
        });
      } else {
        basePrice = baseCents + delta;
        cleanCents = basePrice;
        baseLine.description = `${serviceLabel(laborService)} (${(baseHours + addedHours).toFixed(2)} labor hours)`;
        baseLine.amount = basePrice;
      }
    }

    const jobFloorCents = Math.max(
      FRESNO_SERVICE_FLOORS_CENTS[laborService],
      CONDITION_JOB_FLOORS[laborService][level] * 100,
    );
    if (cleanCents < jobFloorCents) {
      laborFloorAdjust = jobFloorCents - cleanCents;
      breakdown.push({
        description: "Minimum price adjustment",
        amount: laborFloorAdjust,
        type: "fee",
      });
    }
  } else {
    const table = rates.STANDARD;
    const bedsCents = lookupBeds(table, input.beds) * 100;
    const bathsCents = lookupBaths(table, fullBaths) * 100;
    const sqftCents = lookupSqftMidpoint(table, input.sqft) * 100;
    const halfBathCents = halfBaths * table.halfBath * 100;

    breakdown.push({
      description:
        input.beds >= 1 ? `${input.beds} bedroom${input.beds === 1 ? "" : "s"}` : "Studio",
      amount: bedsCents,
      type: "base",
    });
    breakdown.push({
      description: `${fullBaths} bathroom${fullBaths === 1 ? "" : "s"}`,
      amount: bathsCents,
      type: "base",
    });
    if (halfBathCents > 0) {
      breakdown.push({
        description: `${halfBaths} half bath${halfBaths === 1 ? "" : "s"}`,
        amount: halfBathCents,
        type: "base",
      });
    }
    breakdown.push({
      description: `${(input.sqft || 1000).toLocaleString()} sqft tier`,
      amount: sqftCents,
      type: "base",
    });

    basePrice = bedsCents + bathsCents + sqftCents + halfBathCents;

    const floorCents = table.floor * 100;
    if (basePrice < floorCents) {
      const floorAdjust = floorCents - basePrice;
      breakdown.push({
        description: "Minimum price adjustment",
        amount: floorAdjust,
        type: "base",
      });
      basePrice = floorCents;
    }

    // Crew-hour rate floor on base clean ($55/hr rounded up to $5 step).
    const baseHours =
      estimateFresnoMinutes({
        ...input,
        addons: [],
        addonQuantities: {},
        condition: "normal",
      }) / 60;
    if (baseHours > 0) {
      const rateFloorCents = Math.ceil((baseHours * crewRateDollars * 100) / 500) * 500;
      if (basePrice < rateFloorCents) {
        const rateAdjust = rateFloorCents - basePrice;
        breakdown.push({
          description: "Large-home time adjustment",
          amount: rateAdjust,
          type: "base",
        });
        basePrice = rateFloorCents;
      }
    }
  }

  let addonTotal = 0;
  const quantities = input.addonQuantities || {};
  for (const slug of input.addons || []) {
    const def = FRESNO_ADDON_CATALOG[slug];
    if (!def) continue;
    const unitCents = def.dollars * 100;
    const qty = def.qty
      ? Math.max(1, Math.min(def.maxQuantity, Math.floor(quantities[slug] || 1)))
      : 1;
    const lineCents = unitCents * qty;
    purchasedAddons.push({
      slug,
      name: def.name,
      quantity: qty,
      unitPrice: unitCents,
      totalPrice: lineCents,
    });
    addonTotal += lineCents;
    breakdown.push({
      description: def.qty && qty > 1 ? `${def.name} x ${qty}` : def.name,
      amount: lineCents,
      type: "addon",
    });
  }

  const subtotal = basePrice + addonTotal;

  let petFee = 0;
  if (input.hasPets) {
    petFee = clampSurcharge(basePrice, PET_FEE_FLOOR_CENTS, PET_FEE_PERCENT, PET_FEE_CAP_CENTS);
    breakdown.push({ description: "Pet fee", amount: petFee, type: "fee" });
  }

  const discountPercent = FREQUENCY_DISCOUNTS[input.frequency];
  const frequencyDiscount = Math.round(((basePrice + petFee) * discountPercent) / 100);
  if (frequencyDiscount > 0) {
    breakdown.push({
      description: `${input.frequency.replace("_", "-").toLowerCase()} discount (${discountPercent}%)`,
      amount: -frequencyDiscount,
      type: "discount",
    });
  }

  if (!laborService) {
    const level = conditionLevelOf(input.condition);
    const condition = ROUTINE_CONDITION[level];
    const factor = condition.price;
    if (factor !== 1) {
      const minimum = condition.floorCents;
      conditionSurcharge =
        factor > 1
          ? Math.max(minimum, Math.round((basePrice + petFee) * (factor - 1)))
          : -Math.round((basePrice + petFee) * (1 - factor));
      breakdown.push({
        description: condition.chargeLabel,
        amount: conditionSurcharge,
        type: "surcharge",
      });
    }
  }

  let jobTimeAdjust = 0;
  if (!laborService && input.serviceType !== "OFFICE") {
    const jobFloorCents =
      Math.ceil(((estimateFresnoMinutes(input, rates) / 60) * crewRateDollars * 100) / 500) * 500;
    const beforeDiscount = subtotal + petFee + conditionSurcharge;
    if (beforeDiscount < jobFloorCents) {
      jobTimeAdjust = jobFloorCents - beforeDiscount;
      breakdown.push({
        description: "Extra-time adjustment",
        amount: jobTimeAdjust,
        type: "surcharge",
      });
    }
  }

  let totalPrice =
    subtotal - frequencyDiscount + petFee + conditionSurcharge + jobTimeAdjust + laborFloorAdjust;

  // Enforce service hard floor AFTER discount so recurring discounts never violate $165 floor.
  const floorCents = FRESNO_SERVICE_FLOORS_CENTS[input.serviceType];
  if (totalPrice < floorCents) {
    const adjust = floorCents - totalPrice;
    breakdown.push({
      description: "Minimum price adjustment",
      amount: adjust,
      type: "fee",
    });
    totalPrice = floorCents;
  }

  return {
    purchasedAddons,
    basePrice,
    addonTotal,
    subtotal,
    frequencyDiscount,
    petFee,
    conditionSurcharge: conditionSurcharge + jobTimeAdjust,
    totalPrice,
    estimatedMinutes: estimateFresnoMinutes(input, rates),
    breakdown,
  };
}

function formatCrewHoursRange(singleCleanerMinutes: number): string {
  const crewHours = Math.max(1.5, singleCleanerMinutes / 60 / 2);
  const low = Math.max(1.5, Math.round(crewHours * 2) / 2);
  const high = low + 1;
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));
  return `${fmt(low)}-${fmt(high)} hrs`;
}

export interface FresnoInstantEstimateInput {
  beds: number;
  baths: number;
  sqft: number;
  condition?: FresnoConditionTier;
  serviceType?: FresnoResidentialService;
}

export interface FresnoInstantEstimate {
  standardOneTime: number;
  standardBiweekly: number;
  standardWeekly: number;
  standardMonthly: number;
  deepClean: number;
  moveOut: number;
  estimatedHoursRange: string;
  hoursByService: {
    STANDARD: string;
    DEEP: string;
    MOVE_OUT: string;
  };
  isLargeHomeCustom: boolean;
}

/**
 * Browser-side 0ms whole-dollar instant estimate helper for Fresno, Clovis & Madera.
 */
export function calculateFresnoInstantEstimate({
  beds,
  baths,
  sqft,
  condition = "lived_in",
  serviceType = "STANDARD",
}: FresnoInstantEstimateInput): FresnoInstantEstimate {
  const shared = {
    beds,
    baths,
    sqft,
    condition,
    addons: [] as string[],
    addonQuantities: {},
    hasPets: false,
  };

  const stdOne = calculateFresnoPrice({
    ...shared,
    serviceType: "STANDARD",
    frequency: "ONE_TIME",
  });
  const stdBiweekly = calculateFresnoPrice({
    ...shared,
    serviceType: "STANDARD",
    frequency: "BIWEEKLY",
  });
  const stdWeekly = calculateFresnoPrice({
    ...shared,
    serviceType: "STANDARD",
    frequency: "WEEKLY",
  });
  const stdMonthly = calculateFresnoPrice({
    ...shared,
    serviceType: "STANDARD",
    frequency: "MONTHLY",
  });
  const deep = calculateFresnoPrice({
    ...shared,
    serviceType: "DEEP",
    frequency: "ONE_TIME",
  });
  const move = calculateFresnoPrice({
    ...shared,
    serviceType: "MOVE_OUT",
    frequency: "ONE_TIME",
  });

  const hoursByService = {
    STANDARD: formatCrewHoursRange(stdBiweekly.estimatedMinutes),
    DEEP: formatCrewHoursRange(deep.estimatedMinutes),
    MOVE_OUT: formatCrewHoursRange(move.estimatedMinutes),
  };

  return {
    standardOneTime: Math.round(stdOne.totalPrice / 100),
    standardBiweekly: Math.round(stdBiweekly.totalPrice / 100),
    standardWeekly: Math.round(stdWeekly.totalPrice / 100),
    standardMonthly: Math.round(stdMonthly.totalPrice / 100),
    deepClean: Math.round(deep.totalPrice / 100),
    moveOut: Math.round(move.totalPrice / 100),
    estimatedHoursRange: hoursByService[serviceType],
    hoursByService,
    isLargeHomeCustom: sqft >= LARGE_HOME_PHOTO_SQFT,
  };
}

export interface FresnoSqftPreset {
  id: string;
  label: string;
  approxLabel: string;
  sqft: number;
  min: number;
  max: number | null;
  isCustom?: boolean;
}

export const FRESNO_SQFT_PRESETS: readonly FresnoSqftPreset[] = [
  {
    id: "under-1200",
    label: "Under 1,200",
    approxLabel: "~1,050 sq ft",
    sqft: 1050,
    min: 100,
    max: 1199,
  },
  {
    id: "1200-1799",
    label: "1,200-1,799",
    approxLabel: "~1,500 sq ft",
    sqft: 1500,
    min: 1200,
    max: 1799,
  },
  {
    id: "1800-2399",
    label: "1,800-2,399",
    approxLabel: "~2,100 sq ft",
    sqft: 2100,
    min: 1800,
    max: 2399,
  },
  {
    id: "2400-2999",
    label: "2,400-2,999",
    approxLabel: "~2,700 sq ft",
    sqft: 2700,
    min: 2400,
    max: 2999,
  },
  {
    id: "3000-3499",
    label: "3,000-3,499",
    approxLabel: "~3,250 sq ft",
    sqft: 3250,
    min: 3000,
    max: 3499,
  },
  {
    id: "3500-plus",
    label: "3,500+ custom",
    approxLabel: "3,500+ sq ft",
    sqft: 3600,
    min: 3500,
    max: null,
    isCustom: true,
  },
] as const;

export function normalizeFresnoServiceParam(
  raw: string | null | undefined,
  fallback: FresnoResidentialService = "STANDARD",
): FresnoResidentialService {
  if (!raw) return fallback;
  const s = raw.trim().toLowerCase();
  if (!s) return fallback;
  if (s.includes("move") || s === "move_out" || s === "move_in") return "MOVE_OUT";
  if (s.includes("deep")) return "DEEP";
  if (
    s.includes("standard") ||
    s.includes("recurring") ||
    s.includes("routine") ||
    s.includes("weekly") ||
    s.includes("biweekly") ||
    s.includes("monthly")
  ) {
    return "STANDARD";
  }
  return fallback;
}

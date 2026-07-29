const MAX_MOVE_OUT_ADDONS = 20;
const MAX_ADDON_LENGTH = 160;

export type NormalizedPaidLeadSubmission = {
  name?: string;
  phone?: string;
  city?: string;
  moveOutAddons: string[];
};

function optionalText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeMoveOutAddons(value: unknown): string[] {
  const values = Array.isArray(value) ? value : optionalText(value) ? [value] : [];
  const normalized = values
    .map(optionalText)
    .filter((item): item is string => Boolean(item))
    .map((item) => item.slice(0, MAX_ADDON_LENGTH));

  return Array.from(new Set(normalized)).slice(0, MAX_MOVE_OUT_ADDONS);
}

export function normalizePaidLeadSubmission(
  body: Record<string, unknown>,
): NormalizedPaidLeadSubmission {
  return {
    name: optionalText(body.name),
    phone: optionalText(body.phone),
    city: optionalText(body.city),
    moveOutAddons: normalizeMoveOutAddons(body.moveOutAddons),
  };
}
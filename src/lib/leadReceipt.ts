// The public lead route returns this receipt only after persistence or replay.
// Keep identities server-side: callers return acceptance metadata, not the receipt.
export function isAcceptedLeadReceipt(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const receipt = value as Record<string, unknown>;
  return receipt.success === true && typeof receipt.contactId === "string" && receipt.contactId.trim().length > 0;
}

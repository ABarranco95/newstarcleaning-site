// Stable per-attempt submission identifier. Apex uses submissionId /
// idempotencyKey to replay-dedupe retries of the same submission, so the same
// ID must be reused when a visitor retries after a network or server failure
// and regenerated only after an accepted submission.
export function createSubmissionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `nsc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

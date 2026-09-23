// A requested deadline is a calendar day in New Star's service area, not a
// booked appointment or a timestamp. Never shift the customer's day via UTC.
const SERVICE_TIME_ZONE = "America/Los_Angeles";

export function serviceAreaToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SERVICE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((value) => value.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function isCalendarDay(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function specificDeadlineError(
  body: { timeline?: unknown; requestedDate?: unknown; date?: unknown },
  now = new Date(),
): string | null {
  // Older clients may send a date without this timeline. Keep their existing
  // contract; only the explicitly chosen specific-deadline path requires one.
  if (body.timeline !== "specific-deadline") return null;
  const requestedDate = body.requestedDate ?? body.date;
  if (!requestedDate) return "Please choose a Needed by date for your specific deadline.";
  if (!isCalendarDay(requestedDate)) return "Please enter a valid Needed by date.";
  if (requestedDate < serviceAreaToday(now)) return "Please choose today or a future Needed by date (Pacific time).";
  return null;
}

import ical from "ical";
import { Bookings } from "@/models/bookings";

export type NormalizedIcalEvent = {
  start: Date;
  end: Date;
  summary?: string;
};

export type PropertyForAvailability = {
  _id?: unknown;
  pricePerDay?: number[][];
  icalLinks?: Map<string, string> | Record<string, string> | null;
};

const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^0\.0\.0\.0$/,
  /^\[::1\]$/,
];

export function validateIcalUrl(raw: string): { valid: boolean; error?: string; url?: string } {
  const trimmed = String(raw ?? "").trim();
  if (!trimmed) {
    return { valid: false, error: "Calendar URL is required" };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { valid: false, error: "Enter a valid URL" };
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return { valid: false, error: "URL must use http or https" };
  }

  const host = parsed.hostname;
  if (BLOCKED_HOST_PATTERNS.some((p) => p.test(host))) {
    return { valid: false, error: "That calendar URL is not allowed" };
  }

  return { valid: true, url: parsed.toString() };
}

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && "toJSDate" in value) {
    const d = (value as { toJSDate: () => Date }).toJSDate();
    return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
  }
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

type IcalParsedItem = {
  type?: string;
  start?: unknown;
  end?: unknown;
  summary?: unknown;
};

export function normalizeParsedIcal(
  parsed: Record<string, IcalParsedItem>,
): NormalizedIcalEvent[] {
  const events: NormalizedIcalEvent[] = [];

  for (const key of Object.keys(parsed)) {
    const item = parsed[key];
    if (!item || item.type !== "VEVENT") continue;

    const start = toDate(item.start);
    let end = toDate(item.end);
    if (!start) continue;
    if (!end || end <= start) {
      end = new Date(start);
      end.setDate(end.getDate() + 1);
    }

    events.push({
      start,
      end,
      summary: typeof item.summary === "string" ? item.summary : undefined,
    });
  }

  return events;
}

export async function parseIcalFromUrl(url: string): Promise<NormalizedIcalEvent[]> {
  const validation = validateIcalUrl(url);
  if (!validation.valid || !validation.url) {
    throw new Error(validation.error ?? "Invalid URL");
  }

  const response = await fetch(validation.url, {
    headers: { Accept: "text/calendar, */*" },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Could not fetch calendar (${response.status})`);
  }

  const text = await response.text();
  const parsed = ical.parseICS(text);
  return normalizeParsedIcal(parsed);
}

/** Night-stay date keys (check-in nights) in local calendar */
export function expandEventsToDateKeys(events: NormalizedIcalEvent[]): Set<string> {
  const keys = new Set<string>();

  for (const event of events) {
    const cursor = new Date(event.start);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(event.end);
    end.setHours(0, 0, 0, 0);

    while (cursor < end) {
      keys.add(formatDateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return keys;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

export function getManualBlockedDateKeys(property: PropertyForAvailability): Set<string> {
  const keys = new Set<string>();
  const grid = property.pricePerDay;
  if (!Array.isArray(grid)) return keys;

  const year = new Date().getFullYear();

  for (let monthIndex = 0; monthIndex < grid.length; monthIndex++) {
    const monthDays = grid[monthIndex];
    if (!Array.isArray(monthDays)) continue;

    for (let dayIndex = 0; dayIndex < monthDays.length; dayIndex++) {
      if (monthDays[dayIndex] < 0) {
        const dt = new Date(year, monthIndex, dayIndex + 1);
        dt.setHours(0, 0, 0, 0);
        keys.add(formatDateKey(dt));
      }
    }
  }

  return keys;
}

export function collectIcalLinkUrls(
  icalLinks: PropertyForAvailability["icalLinks"],
): string[] {
  if (!icalLinks) return [];
  if (icalLinks instanceof Map) {
    return Array.from(icalLinks.values()).filter(
      (v) => typeof v === "string" && v.trim().length > 0,
    );
  }
  return Object.values(icalLinks).filter(
    (v) => typeof v === "string" && v.trim().length > 0,
  );
}

export async function getExternalIcalDateKeys(
  icalLinks: PropertyForAvailability["icalLinks"],
): Promise<Set<string>> {
  const urls = collectIcalLinkUrls(icalLinks);
  const keys = new Set<string>();

  for (const url of urls) {
    try {
      const events = await parseIcalFromUrl(url);
      const expanded = expandEventsToDateKeys(events);
      expanded.forEach((k) => keys.add(k));
    } catch (err) {
      console.error("iCal parse failed for", url, err);
    }
  }

  return keys;
}

export async function getConfirmedBookingDateKeys(
  propertyId: string,
): Promise<Set<string>> {
  const keys = new Set<string>();
  const bookings = await Bookings.find({
    propertyId,
    bookingStatus: "confirmed",
  })
    .select("startDate endDate")
    .lean();

  for (const booking of bookings) {
    const start = new Date(booking.startDate as Date);
    const end = new Date(booking.endDate as Date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const cursor = new Date(start);
    while (cursor < end) {
      keys.add(formatDateKey(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  return keys;
}

export async function getUnavailableDateKeysForProperty(
  property: PropertyForAvailability,
): Promise<Set<string>> {
  const keys = new Set<string>();

  getManualBlockedDateKeys(property).forEach((k) => keys.add(k));

  const external = await getExternalIcalDateKeys(property.icalLinks);
  external.forEach((k) => keys.add(k));

  if (property._id) {
    const bookingKeys = await getConfirmedBookingDateKeys(String(property._id));
    bookingKeys.forEach((k) => keys.add(k));
  }

  return keys;
}

/** True if [rangeStart, rangeEnd) shares any night with unavailable keys */
export function rangeOverlapsUnavailable(
  rangeStart: Date,
  rangeEnd: Date,
  unavailable: Set<string>,
): boolean {
  const start = new Date(rangeStart);
  const end = new Date(rangeEnd);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const cursor = new Date(start);
  while (cursor < end) {
    if (unavailable.has(formatDateKey(cursor))) return true;
    cursor.setDate(cursor.getDate() + 1);
  }
  return false;
}

export function rangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date,
): boolean {
  return aStart < bEnd && bStart < aEnd;
}

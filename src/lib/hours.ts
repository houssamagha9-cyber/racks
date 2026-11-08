export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

const DAY_WORDS: [string, number][] = [
  ["sunday", 0],
  ["monday", 1],
  ["tuesday", 2],
  ["wednesday", 3],
  ["thursday", 4],
  ["friday", 5],
  ["saturday", 6],
  ["sun", 0],
  ["mon", 1],
  ["tue", 2],
  ["wed", 3],
  ["thu", 4],
  ["fri", 5],
  ["sat", 6],
];

export type Window = { start: number; end: number };

export type DayPlan = {
  windows: Window[];
  appointment: boolean;
};

export type ParsedHours = {
  days: DayPlan[];
  recognized: boolean;
};

function emptyDays(): DayPlan[] {
  return Array.from({ length: 7 }, () => ({ windows: [], appointment: false }));
}

function dayIndex(word: string): number | null {
  const hit = DAY_WORDS.find(([name]) => name === word.toLowerCase());
  return hit ? hit[1] : null;
}

function parseClock(raw: string): number | null {
  const match = raw.trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = match[2] ? Number(match[2]) : 0;
  if (hour < 1 || hour > 12 || minute > 59) return null;
  if (hour === 12) hour = 0;
  if (match[3] === "pm") hour += 12;
  return hour * 60 + minute;
}

function splitClauses(text: string): string[] {
  const clauses: string[] = [];
  let current = "";
  for (const bit of text.split(",")) {
    const piece = bit.trim();
    if (!piece) continue;
    if (!current) {
      current = piece;
      continue;
    }
    const ready = /(\d)\s*(am|pm)/i.test(current) || /appointment/i.test(current);
    const next = /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat|closed)\b/i.test(piece);
    if (ready && next) {
      clauses.push(current);
      current = piece;
    } else {
      current = `${current}, ${piece}`;
    }
  }
  if (current) clauses.push(current);
  return clauses;
}

function fillRange(found: Set<number>, start: number, end: number) {
  let day = start;
  for (let step = 0; step < 7; step += 1) {
    found.add(day);
    if (day === end) break;
    day = (day + 1) % 7;
  }
}

function daySet(clause: string): number[] {
  const found = new Set<number>();
  const rangeRe =
    /\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)\s*-\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)\b/gi;
  const stripped = clause.replace(rangeRe, (_full, startWord: string, endWord: string) => {
    const start = dayIndex(startWord);
    const end = dayIndex(endWord);
    if (start != null && end != null) fillRange(found, start, end);
    return " ";
  });
  const single = /\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)\b/gi;
  for (const match of stripped.matchAll(single)) {
    const idx = dayIndex(match[1] ?? "");
    if (idx != null) found.add(idx);
  }
  return [...found];
}

export function parseHours(hours: string): ParsedHours {
  const days = emptyDays();
  if (/permanently closed/i.test(hours)) return { days, recognized: true };
  let recognized = false;
  for (const clause of splitClauses(hours.replace(/[–—]/g, "-"))) {
    const named = daySet(clause);
    if (named.length === 0) continue;
    if (/appointment/i.test(clause)) {
      recognized = true;
      for (const day of named) days[day] = { windows: [], appointment: true };
      continue;
    }
    if (/\bclosed\b/i.test(clause) && !/(am|pm)/i.test(clause)) {
      recognized = true;
      for (const day of named) days[day] = { windows: [], appointment: false };
      continue;
    }
    const time = clause.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
    if (!time) continue;
    const start = parseClock(time[1] ?? "");
    const end = parseClock(time[2] ?? "");
    if (start == null || end == null || end <= start) continue;
    recognized = true;
    for (const day of named) days[day] = { windows: [{ start, end }], appointment: false };
  }
  return { days, recognized };
}

export function formatMinutes(mins: number): string {
  const hour24 = Math.floor(mins / 60);
  const minute = mins % 60;
  const suffix = hour24 >= 12 ? "pm" : "am";
  let hour = hour24 % 12;
  if (hour === 0) hour = 12;
  if (minute === 0) return `${hour}${suffix}`;
  return `${hour}:${String(minute).padStart(2, "0")}${suffix}`;
}

export function dayWindowLabel(plan: DayPlan): string {
  if (plan.appointment && plan.windows.length === 0) return "By appointment";
  const window = plan.windows[0];
  if (!window) return "Closed";
  return `${formatMinutes(window.start)}–${formatMinutes(window.end)}`;
}

export type MemphisClock = { day: number; minutes: number; label: string };

export function memphisNow(date = new Date()): MemphisClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const grab = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hour = Number(grab("hour"));
  const minute = Number(grab("minute"));
  const label = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
  return {
    day: map[grab("weekday")] ?? 0,
    minutes: (Number.isFinite(hour) ? hour % 24 : 0) * 60 + (Number.isFinite(minute) ? minute : 0),
    label,
  };
}

export type LiveStatus =
  | { kind: "permanent" }
  | { kind: "unknown" }
  | { kind: "appointment" }
  | { kind: "open"; until: string }
  | { kind: "later"; at: string }
  | { kind: "closed" };

export function liveStatus(hours: string, permanentlyClosed: boolean, clock: MemphisClock): LiveStatus {
  if (permanentlyClosed || /permanently closed/i.test(hours)) return { kind: "permanent" };
  const parsed = parseHours(hours);
  if (!parsed.recognized) return { kind: "unknown" };
  const plan = parsed.days[clock.day];
  if (!plan) return { kind: "unknown" };
  if (plan.appointment && plan.windows.length === 0) return { kind: "appointment" };
  const window = plan.windows[0];
  if (!window) return { kind: "closed" };
  if (clock.minutes >= window.start && clock.minutes < window.end) {
    return { kind: "open", until: formatMinutes(window.end) };
  }
  if (clock.minutes < window.start) return { kind: "later", at: formatMinutes(window.start) };
  return { kind: "closed" };
}

export function statusPhrase(status: LiveStatus): string | null {
  if (status.kind === "open") return `Open now, until ${status.until}`;
  if (status.kind === "later") return `Opens today at ${status.at}`;
  if (status.kind === "appointment") return "By appointment today";
  if (status.kind === "closed") return "Closed today";
  if (status.kind === "permanent") return "Permanently closed";
  return null;
}

const SCHEMA_DAYS = [
  "https://schema.org/Sunday",
  "https://schema.org/Monday",
  "https://schema.org/Tuesday",
  "https://schema.org/Wednesday",
  "https://schema.org/Thursday",
  "https://schema.org/Friday",
  "https://schema.org/Saturday",
];

function hhmm(mins: number) {
  return `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
}

export function openingHoursSpecification(hours: string) {
  const parsed = parseHours(hours);
  if (!parsed.recognized) return [];
  const specs = [];
  for (let day = 0; day < 7; day += 1) {
    const window = parsed.days[day]?.windows[0];
    if (!window) continue;
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[day],
      opens: hhmm(window.start),
      closes: hhmm(window.end),
    });
  }
  return specs;
}

import assert from "node:assert/strict";
import test from "node:test";
import { dayWindowLabel, liveStatus, parseHours, type MemphisClock } from "./hours.ts";

const sundayMorning: MemphisClock = { day: 0, minutes: 11 * 60, label: "Sunday" };
const mondayMorning: MemphisClock = { day: 1, minutes: 11 * 60, label: "Monday" };

test("goodwill sunday versus weekday close", () => {
  const parsed = parseHours("Mon–Sat 9am–8pm, Sunday 10am–6pm");
  assert.equal(parsed.recognized, true);
  assert.equal(dayWindowLabel(parsed.days[1]!), "9am–8pm");
  assert.equal(dayWindowLabel(parsed.days[0]!), "10am–6pm");
  assert.equal(liveStatus("Mon–Sat 9am–8pm, Sunday 10am–6pm", false, sundayMorning).kind, "open");
});

test("habitat is closed sunday and monday", () => {
  const hours = "Tue–Sat 11am–5pm, closed Sunday and Monday";
  const parsed = parseHours(hours);
  assert.equal(dayWindowLabel(parsed.days[0]!), "Closed");
  assert.equal(dayWindowLabel(parsed.days[1]!), "Closed");
  assert.equal(dayWindowLabel(parsed.days[2]!), "11am–5pm");
  assert.equal(liveStatus(hours, false, mondayMorning).kind, "closed");
});

test("legacy is four days", () => {
  const parsed = parseHours("Mon, Wed, Fri, Sat 10am–4pm");
  assert.equal(dayWindowLabel(parsed.days[1]!), "10am–4pm");
  assert.equal(dayWindowLabel(parsed.days[2]!), "Closed");
  assert.equal(dayWindowLabel(parsed.days[0]!), "Closed");
  assert.equal(dayWindowLabel(parsed.days[6]!), "10am–4pm");
});

test("second kiss and blue suede keep appointment days", () => {
  const kiss = parseHours("Wed 4pm–8pm, Thu–Sun 12pm–5pm, closed Mon–Tue");
  assert.equal(dayWindowLabel(kiss.days[3]!), "4pm–8pm");
  assert.equal(dayWindowLabel(kiss.days[0]!), "12pm–5pm");
  assert.equal(dayWindowLabel(kiss.days[1]!), "Closed");
  const suede = parseHours("Thu, Fri, Sun 12pm–5pm, Sat 10am–5pm, Mon–Wed by appointment");
  assert.equal(dayWindowLabel(suede.days[0]!), "12pm–5pm");
  assert.equal(dayWindowLabel(suede.days[6]!), "10am–5pm");
  assert.equal(dayWindowLabel(suede.days[1]!), "By appointment");
  assert.equal(liveStatus("Thu, Fri, Sun 12pm–5pm, Sat 10am–5pm, Mon–Wed by appointment", false, mondayMorning).kind, "appointment");
});

test("half hours and drop-off weeks", () => {
  const flash = parseHours("Mon–Sat 10:30am–5:30pm, Sunday 1pm–5pm");
  assert.equal(dayWindowLabel(flash.days[1]!), "10:30am–5:30pm");
  assert.equal(dayWindowLabel(flash.days[0]!), "1pm–5pm");
  const drop = parseHours("Mon–Fri 9am–6pm, Sat–Sun 7am–7pm");
  assert.equal(dayWindowLabel(drop.days[1]!), "9am–6pm");
  assert.equal(dayWindowLabel(drop.days[0]!), "7am–7pm");
  const all = parseHours("Mon–Sun 7am–7pm");
  assert.equal(all.days.every((day) => day.windows.length === 1), true);
});

test("closed stores stay closed", () => {
  assert.equal(liveStatus("Permanently closed", true, sundayMorning).kind, "permanent");
  assert.equal(parseHours("Permanently closed").recognized, true);
});

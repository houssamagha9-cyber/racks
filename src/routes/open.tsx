import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/site/ad-slot";
import { PinPreview } from "@/components/site/pin-preview";
import { Shell } from "@/components/site/shell";
import { type Store, stores } from "@/data/racks";
import {
  DAY_NAMES,
  dayWindowLabel,
  liveStatus,
  memphisNow,
  parseHours,
  statusPhrase,
  type LiveStatus,
  type MemphisClock,
} from "@/lib/hours";

export const Route = createFileRoute("/open")({
  head: () => ({
    meta: [
      { title: "Thrift stores open today in Memphis — Racks" },
      {
        name: "description",
        content:
          "Which Mid-South thrift shops are open right now, in Memphis time, from the hours already printed on each listing. Donation centers stay on their own list.",
      },
    ],
  }),
  component: OpenPage,
});

function OpenPage() {
  const [clock, setClock] = useState<MemphisClock | null>(null);
  useEffect(() => {
    const tick = () => setClock(memphisNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const shops = stores.filter((store) => store.role === "shop" && !store.closed);
  const drops = stores.filter((store) => store.role === "dropoff" && !store.closed);

  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-brass">Memphis time · America/Chicago</p>
        <h1 className="mt-2 text-5xl text-fg">What’s open right now</h1>
        <p className="mt-4 max-w-2xl text-muted">
          The clock uses the hours already printed on each listing. A shop whose line did not parse is not called
          closed. Drop-offs are not mixed into the shop list. Call before you drive if the trip is long.
        </p>
        <PinPreview />
        {clock ? (
          <Live clock={clock} shops={shops} drops={drops} />
        ) : (
          <p className="mt-6 text-sm text-muted">Checking Memphis time…</p>
        )}
        <div className="mt-8">
          <AdSlot placement="Open today" />
        </div>
        <p className="mt-4 text-sm text-muted">
          The empty slot is where a display ad would sit after the page has visitors. A shop that wants the row above
          it holds a{" "}
          <Link to="/advertise" className="text-brass">
            pin preview
          </Link>
          . Two per city, $49 a month on the rate card, and this phone’s preview is not a charge.
        </p>
        <Week title="Shop hours, day by day" rows={shops} today={clock?.day ?? null} />
        <Week title="Drop-off hours, day by day" rows={drops} today={clock?.day ?? null} />
      </div>
    </Shell>
  );
}

function Live({ clock, shops, drops }: { clock: MemphisClock; shops: Store[]; drops: Store[] }) {
  const shopGroups = group(shops, clock);
  const dropOpen = drops.filter((store) => liveStatus(store.hours, store.closed, clock).kind === "open");
  return (
    <div className="mt-8">
      <p className="text-sm tabular-nums text-muted">{clock.label}</p>
      <StatusBlock title="Open now" rows={shopGroups.open} empty="No sourced shop is inside its printed hours." />
      <StatusBlock title="Opens later today" rows={shopGroups.later} empty="Nothing left to open today." />
      {shopGroups.appointment.length > 0 ? (
        <StatusBlock title="By appointment today" rows={shopGroups.appointment} empty="" />
      ) : null}
      <details className="mt-6">
        <summary className="min-h-11 cursor-pointer text-fg">Closed today · {shopGroups.closed.length} shops</summary>
        <StatusList rows={shopGroups.closed} />
      </details>
      <section className="mt-8">
        <h2 className="text-3xl text-fg">Drop-offs open now</h2>
        <p className="mt-2 text-sm text-muted">Donation hours. You cannot shop these addresses.</p>
        {dropOpen.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No attended drop-off is inside its printed hours.</p>
        ) : (
          <StatusList rows={dropOpen.map((store) => ({ store, phrase: statusPhrase(liveStatus(store.hours, false, clock)) ?? "" }))} />
        )}
      </section>
    </div>
  );
}

function group(rows: Store[], clock: MemphisClock) {
  const open: { store: Store; phrase: string }[] = [];
  const later: { store: Store; phrase: string }[] = [];
  const appointment: { store: Store; phrase: string }[] = [];
  const closed: { store: Store; phrase: string }[] = [];
  for (const store of rows) {
    const status: LiveStatus = liveStatus(store.hours, store.closed, clock);
    const phrase = statusPhrase(status) ?? "Hours not parsed";
    const row = { store, phrase };
    if (status.kind === "open") open.push(row);
    else if (status.kind === "later") later.push(row);
    else if (status.kind === "appointment") appointment.push(row);
    else closed.push(row);
  }
  return { open, later, appointment, closed };
}

function StatusBlock({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: { store: Store; phrase: string }[];
  empty: string;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-3xl text-fg">
        {title}
        <span className="ml-3 text-base tabular-nums text-muted">{rows.length}</span>
      </h2>
      {rows.length === 0 ? <p className="mt-3 text-sm text-muted">{empty}</p> : <StatusList rows={rows} />}
    </section>
  );
}

function StatusList({ rows }: { rows: { store: Store; phrase: string }[] }) {
  return (
    <ul className="mt-2">
      {rows.map(({ store, phrase }) => (
        <li key={store.slug} className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:items-baseline sm:justify-between">
          <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-lg text-fg hover:text-brass">
            {store.name}
          </Link>
          <span className="text-sm text-muted">
            {phrase} · {store.city}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Week({ title, rows, today }: { title: string; rows: Store[]; today: number | null }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl text-fg">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Days with no printed window are omitted. Closed that day means the source did not give a walk-in hour.
      </p>
      <div className="mt-4 space-y-6">
        {DAY_NAMES.map((name, day) => {
          const listed = rows.flatMap((store) => {
            const plan = parseHours(store.hours).days[day];
            if (!plan || (plan.windows.length === 0 && !plan.appointment)) return [];
            return [{ store, label: dayWindowLabel(plan) }];
          });
          return (
            <div key={name} className={today === day ? "rounded-lg border border-brass p-4" : undefined}>
              <h3 className="text-xl text-fg">
                {name}
                {today === day ? " · today" : ""}
                <span className="ml-3 text-sm tabular-nums text-muted">{listed.length}</span>
              </h3>
              <ul className="mt-2">
                {listed.map(({ store, label }) => (
                  <li key={store.slug} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-fg hover:text-brass">
                      {store.name}
                    </Link>
                    <span className="text-sm text-muted">
                      {label} · {store.city}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

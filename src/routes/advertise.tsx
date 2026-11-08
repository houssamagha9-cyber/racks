import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdSlot } from "@/components/site/ad-slot";
import { btnPrimary, field, Shell } from "@/components/site/shell";
import { holdPin, saveLead, useRacksStore } from "@/lib/venue-store";
import { getStore } from "@/data/racks";

export const Route = createFileRoute("/advertise")({
  head: () => ({
    meta: [
      { title: "Advertise on Racks" },
      {
        name: "description",
        content: "Featured pins are capped at two per city. Display slots stay empty until the pages have visitors.",
      },
    ],
  }),
  component: AdvertisePage,
});

const offers = [
  {
    name: "Featured pin",
    price: "$49 / mo",
    detail:
      "Sits above a city list and above Open today. Two per city, then the page stops selling. The badge says Sponsored. On this phone you can preview the row. Other people do not see that preview, and nothing is charged here.",
  },
  {
    name: "Display unit",
    price: "After traffic",
    detail:
      "The dashed slots. Frey’s thrift directory made its money from display ads after the pages ranked, about $1,200 the first month ads were on and up to $3,000 a month at the peak. Empty slots are not a network. They are the shape.",
  },
  {
    name: "Confirm-hours note",
    price: "Free",
    detail:
      "A shop can send a correction. Wrong hours are how a directory dies. The note stays on this device until someone reads it. It is not a sold lead.",
  },
];

function AdvertisePage() {
  const [sent, setSent] = useState(false);
  const { pins } = useRacksStore();
  const held = pins
    .map((pin) => getStore(pin.slug))
    .filter((store): store is NonNullable<ReturnType<typeof getStore>> => Boolean(store));
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-brass">Sell the decision, not a blue link</p>
        <h1 className="mt-2 text-5xl text-fg">What a shop would pay for</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Prices are a rate card, not a claim that anyone has paid them. Display ads need visitors first. The page
          people recheck is Open today. A pin is the row above that list.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {offers.map((offer) => (
            <li key={offer.name} className="rounded-lg border border-line bg-surface p-5">
              <p className="text-sm text-brass">{offer.price}</p>
              <h2 className="mt-2 text-3xl text-fg">{offer.name}</h2>
              <p className="mt-3 text-sm text-muted">{offer.detail}</p>
            </li>
          ))}
        </ul>
        {held.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-3xl text-fg">Pin previews on this phone</h2>
            <ul className="mt-4 space-y-2">
              {held.map((store) => (
                <li key={store.slug} className="flex flex-wrap items-center gap-3">
                  <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-brass">
                    {store.name}
                  </Link>
                  <span className="text-sm text-muted">{store.city}</span>
                  <button
                    type="button"
                    onClick={() => holdPin(store.slug, store.citySlug)}
                    className="inline-flex min-h-11 items-center text-sm text-muted"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="mt-8 text-sm text-muted">
            No pin preview yet. Open a shop and choose Preview a pin. The row shows on that city page and on Open today.
          </p>
        )}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <AdSlot placement="Example banner" />
          <AdSlot placement="Example card" size="card" />
        </div>
        <form
          className="mt-10 grid max-w-xl gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const note = String(data.get("note") ?? "").trim();
            const name = String(data.get("name") ?? "").trim();
            if (!name || !note) return;
            saveLead({
              id: `${Date.now()}`,
              placeSlug: "advertise",
              placeName: name,
              note,
              created: new Date().toISOString(),
            });
            setSent(true);
          }}
        >
          <h2 className="text-3xl text-fg">Ask for a pin or send a correction</h2>
          <p className="text-sm text-muted">Stored in this browser. Nothing is emailed.</p>
          <input className={field} name="name" placeholder="Shop name" required />
          <textarea className={field} name="note" rows={4} placeholder="What should change, or which city pin" required />
          <button type="submit" className={btnPrimary}>
            Save note
          </button>
          {sent ? <p className="text-sm text-brass">Saved on this device.</p> : null}
        </form>
        <Link to="/grow" className="mt-8 inline-flex min-h-11 items-center text-brass">
          Read the playbook, including what it cannot promise
        </Link>
      </div>
    </Shell>
  );
}

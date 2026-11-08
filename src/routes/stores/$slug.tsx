import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/site/ad-slot";
import { PlaceGrid } from "@/components/site/place-card";
import { HoursNow } from "@/components/site/open-mark";
import { btnPrimary, Shell } from "@/components/site/shell";
import {
  cityBySlug,
  flagLabel,
  getStore,
  kindLabel,
  rackSearch,
  stores,
  type Store,
} from "@/data/racks";
import { openingHoursSpecification } from "@/lib/hours";
import { bumpStat, holdPin, toggleCompare, toggleShortlist, useRacksStore } from "@/lib/venue-store";

export const Route = createFileRoute("/stores/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const place = getStore(loaderData?.slug ?? "");
    return {
      meta: [
        { title: place ? `${place.name} — Racks` : "Shop — Racks" },
        { name: "description", content: place?.blurb ?? "Thrift shop." },
      ],
    };
  },
  component: PlacePage,
});

function PlacePage() {
  const { slug } = Route.useLoaderData();
  const { custom, ready, shortlist, compare, pins } = useRacksStore();
  const [pinNote, setPinNote] = useState<string | null>(null);
  const place = getStore(slug) ?? custom.find((item) => item.slug === slug) ?? null;

  useEffect(() => {
    if (place) bumpStat("views", `place:${place.slug}`);
  }, [place]);

  if (!place) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-5 py-20">
          <h1 className="text-4xl text-fg">{ready ? "That shop is not in the index" : "Opening listing"}</h1>
          <Link to="/stores" search={rackSearch()} className="mt-6 inline-flex min-h-11 items-center text-brass">
            Back to shops
          </Link>
        </div>
      </Shell>
    );
  }

  const city = cityBySlug(place.citySlug);
  const related = stores
    .filter((item) => item.citySlug === place.citySlug && item.slug !== place.slug && !item.closed && item.role === place.role)
    .slice(0, 3);
  const saved = shortlist.includes(place.slug);
  const picked = compare.includes(place.slug);
  const pinned = pins.some((pin) => pin.slug === place.slug);
  const directory = getStore(place.slug);

  return (
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(place) }} />
      <article className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-muted">
          {city ? (
            <Link to="/cities/$slug" params={{ slug: city.slug }} className="hover:text-fg">
              {city.name}
            </Link>
          ) : (
            place.city
          )}
          {" · "}
          {place.state}
          {place.closed ? " · Permanently closed" : ""}
        </p>
        <h1 className="mt-3 text-5xl text-fg">{place.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{place.blurb}</p>
        <HoursNow hours={place.hours} closed={place.closed} />
        <figure className="mt-6 overflow-hidden rounded-lg border border-line">
          <img
            src={place.image}
            alt={place.imageAlt}
            width={1728}
            height={1152}
            className="frame-photo w-full object-cover"
          />
          <figcaption className="px-4 py-3 text-sm text-muted">
            Room plate. Not a picture from {place.name}.
          </figcaption>
        </figure>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
            <Fact label="Address" value={place.address} />
            <Fact label="Hours" value={place.hours} />
            <Fact label="Phone" value={place.phone ?? "Not printed in the source"} />
            <Fact label="Kind" value={kindLabel[place.kind]} />
            <Fact label="Sunday" value={flagLabel(place.sunday)} />
            <Fact label="Furniture" value={flagLabel(place.furniture)} />
            <Fact label="Books" value={flagLabel(place.books)} />
            <Fact label="Bargain floor" value={flagLabel(place.bargain)} />
            <Fact label="Donation drop" value={flagLabel(place.donation)} />
          </div>
          <AdSlot placement="Listing" size="card" />
        </div>
        <div className="mt-8 max-w-3xl space-y-4">
          {place.about.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-muted">
              {paragraph}
            </p>
          ))}
          <p className="text-sm text-muted">Source: {place.source}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {place.website ? (
            <a href={place.website} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              Open the source site
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => toggleShortlist(place.slug)}
            className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm text-fg"
          >
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(place.slug)}
            className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm text-fg"
          >
            {picked ? "In compare" : "Compare"}
          </button>
          {directory && !place.closed && place.role === "shop" ? (
            <button
              type="button"
              onClick={() => {
                const result = holdPin(place.slug, place.citySlug);
                setPinNote(
                  result === "full" ? "This city already has two pin previews. Remove one on Advertise." : null,
                );
              }}
              className="inline-flex min-h-11 items-center rounded-md border border-line px-4 text-sm text-fg"
            >
              {pinned ? "Pin preview on" : "Preview a pin"}
            </button>
          ) : null}
        </div>
        {directory && !place.closed && place.role === "shop" ? (
          <p className="mt-3 max-w-xl text-sm text-muted">
            A pin preview sits on this city’s page and on Open today. It stays on this phone. Two per city. It is not a
            charge. The rate card is on{" "}
            <Link to="/advertise" className="text-brass">
              Advertise
            </Link>
            .
          </p>
        ) : null}
        {pinNote ? <p className="mt-2 text-sm text-brass">{pinNote}</p> : null}
        {related.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl text-fg">Also in {place.city}</h2>
            <div className="mt-6">
              <PlaceGrid places={related} />
            </div>
          </section>
        ) : null}
      </article>
    </Shell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-fg">{value}</p>
    </div>
  );
}

function jsonLd(place: Store) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": place.role === "dropoff" ? "LocalBusiness" : "ThriftStore",
    name: place.name,
    description: place.blurb,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: place.city,
      addressRegion: place.state,
      addressCountry: "US",
    },
  };
  if (place.phone) data.telephone = place.phone;
  if (place.website) data.url = place.website;
  const hours = openingHoursSpecification(place.hours);
  if (!place.closed && hours.length > 0) data.openingHoursSpecification = hours;
  if (place.lat != null && place.lng != null) {
    data.geo = { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng };
  }
  return JSON.stringify(data);
}

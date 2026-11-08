import { Link } from "@tanstack/react-router";
import { flagLabel, kindLabel, type Store } from "@/data/racks";
import { toggleCompare, toggleShortlist, useRacksStore } from "@/lib/venue-store";
import { OpenMark } from "@/components/site/open-mark";

export function PlaceCard({ place }: { place: Store }) {
  const { shortlist, compare } = useRacksStore();
  const saved = shortlist.includes(place.slug);
  const picked = compare.includes(place.slug);
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-brass">
      <Link to="/stores/$slug" params={{ slug: place.slug }} className="frame-photo relative block overflow-hidden">
        <img src={place.image} alt={place.imageAlt} width={1728} height={1152} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-md bg-bg px-2 py-1 text-xs text-fg">{place.city}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {place.closed ? <Badge>Closed</Badge> : null}
          {place.role === "dropoff" ? <Badge>Drop-off</Badge> : <OpenMark hours={place.hours} closed={place.closed} />}
          {place.pick ? <Badge>Start here</Badge> : null}
          {place.sunday === "yes" ? <Badge>Sunday</Badge> : null}
          {place.furniture === "yes" ? <Badge>Furniture</Badge> : null}
          {place.bargain === "yes" ? <Badge>Bargain</Badge> : null}
          {place.books === "yes" ? <Badge>Books</Badge> : null}
        </div>
        <div>
          <h3 className="text-2xl text-fg">
            <Link to="/stores/$slug" params={{ slug: place.slug }} className="hover:text-brass">
              {place.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">
            {kindLabel[place.kind]} · {place.city}, {place.state}
          </p>
        </div>
        <p className="text-sm text-muted">{place.blurb}</p>
        <p className="mt-auto text-sm text-fg">
          Sunday {flagLabel(place.sunday)} · Furniture {flagLabel(place.furniture)} · {place.hours}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => toggleShortlist(place.slug)}
            className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm text-fg hover:bg-surface-2"
            aria-pressed={saved}
          >
            {saved ? "Saved" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(place.slug)}
            className="inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm text-fg hover:bg-surface-2"
            aria-pressed={picked}
          >
            {picked ? "In compare" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-line px-2 py-1 text-xs tracking-wide text-brass">{children}</span>;
}

export function PlaceGrid({ places }: { places: Store[] }) {
  if (places.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-surface px-4 py-8 text-muted">
        No open shop matches that filter. Clear it, or add a door you can verify.
      </p>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <PlaceCard key={place.slug} place={place} />
      ))}
    </div>
  );
}

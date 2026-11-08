import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaceGrid } from "@/components/site/place-card";
import { Shell } from "@/components/site/shell";
import { getStore, rackSearch } from "@/data/racks";
import { useRacksStore } from "@/lib/venue-store";

export const Route = createFileRoute("/shortlist")({
  head: () => ({
    meta: [
      { title: "Shortlist — Racks" },
      { name: "description", content: "Shops you saved on this device." },
    ],
  }),
  component: ShortlistPage,
});

function ShortlistPage() {
  const { shortlist, custom, ready } = useRacksStore();
  const places = shortlist
    .map((slug) => getStore(slug) ?? custom.find((item) => item.slug === slug))
    .filter((item) => item != null);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Shortlist</h1>
        <p className="mt-3 max-w-2xl text-muted">Saved in this browser only. It does not follow you to another phone.</p>
        {!ready || places.length === 0 ? (
          <p className="mt-8 text-muted">
            Empty.{" "}
            <Link to="/stores" search={rackSearch()} className="text-brass">
              Browse shops
            </Link>
            .
          </p>
        ) : (
          <div className="mt-8">
            <PlaceGrid places={places} />
          </div>
        )}
      </div>
    </Shell>
  );
}

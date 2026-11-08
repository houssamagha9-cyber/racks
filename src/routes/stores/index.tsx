import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/ad-slot";
import { PlaceGrid } from "@/components/site/place-card";
import { SearchForm } from "@/components/site/search-form";
import { Shell } from "@/components/site/shell";
import { filterStores, rackSearch, stores, type RackSearch } from "@/data/racks";
import { useRacksStore } from "@/lib/venue-store";

export const Route = createFileRoute("/stores/")({
  validateSearch: (search: Record<string, unknown>): RackSearch =>
    rackSearch({
      q: typeof search.q === "string" ? search.q : "",
      city: typeof search.city === "string" ? search.city : "",
      sunday: search.sunday === "yes" ? "yes" : "",
      furniture: search.furniture === "yes" ? "yes" : "",
      books: search.books === "yes" ? "yes" : "",
      bargain: search.bargain === "yes" ? "yes" : "",
    }),
  head: () => ({
    meta: [
      { title: "Thrift shops — Racks" },
      {
        name: "description",
        content: "Filter Mid-South thrift shops by city, Sunday hours, furniture, books, and bargain barns.",
      },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const search = Route.useSearch();
  const { custom } = useRacksStore();
  const rows = filterStores([...stores, ...custom], search);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Shops</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Closed doors and drop-off centers stay off this list until you search their name. Donation centers have their
          own page. “Not stated” means the source did not say. It does not mean no.{" "}
          <Link to="/fits/$slug" params={{ slug: "donate" }} className="text-brass">
            Where to donate
          </Link>
          .
        </p>
        <div className="mt-6">
          <SearchForm initial={search} />
        </div>
        <p className="mt-6 text-sm tabular-nums text-muted">{rows.length} shops</p>
        <div className="mt-4">
          <PlaceGrid places={rows} />
        </div>
        <div className="mt-8">
          <AdSlot placement="Shop index" />
        </div>
      </div>
    </Shell>
  );
}

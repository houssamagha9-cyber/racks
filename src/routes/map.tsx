import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { chains, cities, fits, loops, openStores, stores, storesInCity } from "@/data/racks";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Every page — Racks" },
      {
        name: "description",
        content: "Index of every thrift shop, donation center, city, and filter on Racks.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const shops = openStores();
  const dropCount = stores.filter((store) => store.role === "dropoff" && !store.closed).length;
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Every page</h1>
        <p className="mt-3 max-w-2xl text-muted">
          {shops.length} shops and {dropCount} drop-offs. Towns with one door and nothing else to say stay as listings,
          not city pages.
        </p>
        <section className="mt-10">
          <h2 className="text-3xl text-fg">Cities</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link to="/cities/$slug" params={{ slug: city.slug }} className="text-brass">
                  {storesInCity(city.slug).length ? `Thrift stores in ${city.name}` : `Donate clothes in ${city.name}`}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="text-3xl text-fg">Filters and loops</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {fits.map((fit) => (
              <li key={fit.slug}>
                <Link to="/fits/$slug" params={{ slug: fit.slug }} className="text-brass">
                  {fit.title}
                </Link>
              </li>
            ))}
            {chains.map((chain) => (
              <li key={chain.slug}>
                <Link to="/chains/$slug" params={{ slug: chain.slug }} className="text-brass">
                  {chain.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/open" className="text-brass">
                Open today
              </Link>
            </li>
            {loops.map((loop) => (
              <li key={loop.slug}>
                <Link to="/loops/$slug" params={{ slug: loop.slug }} className="text-brass">
                  {loop.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="text-3xl text-fg">Shops</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {shops.map((store) => (
              <li key={store.slug}>
                <Link to="/stores/$slug" params={{ slug: store.slug }} className="hover:text-brass">
                  {store.name}
                </Link>
                <span className="text-muted"> · {store.city}</span>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-8 text-sm text-muted">Drop-off centers are linked from each city page and from Where to donate.</p>
      </div>
    </Shell>
  );
}

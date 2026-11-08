import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { cities, dropsInCity, stores, storesInCity } from "@/data/racks";

export const Route = createFileRoute("/cities/")({
  head: () => ({
    meta: [
      { title: "Thrift stores by city — Racks" },
      {
        name: "description",
        content: "City pages for Memphis, Southaven, and the towns where a shop or a drop-off needs a straight answer.",
      },
    ],
  }),
  component: CitiesPage,
});

function CitiesPage() {
  const known = new Set(cities.map((city) => city.slug));
  const loneShops = stores.filter((store) => !store.closed && store.role === "shop" && !known.has(store.citySlug));
  const loneDrops = stores.filter((store) => !store.closed && store.role === "dropoff" && !known.has(store.citySlug));
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Cities</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A city page exists when the copy can tell shops from drop-off pins. A town with one verified Goodwill and
          nothing else to warn you about stays a shop page, so it is not a thin roundup.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {cities.map((city) => (
            <li key={city.slug} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="text-3xl text-fg">
                <Link to="/cities/$slug" params={{ slug: city.slug }} className="hover:text-brass">
                  {city.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-muted">
                {city.state} · {storesInCity(city.slug).length} shops · {dropsInCity(city.slug).length} drop-offs
              </p>
              <p className="mt-3 text-sm text-muted">{city.intro[0]}</p>
            </li>
          ))}
        </ul>
        {loneShops.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-3xl text-fg">One shop, no city page</h2>
            <ul className="mt-4 space-y-2">
              {loneShops.map((store) => (
                <li key={store.slug}>
                  <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-brass">
                    {store.name}
                  </Link>
                  <span className="text-muted"> · {store.city}, {store.state}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {loneDrops.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-3xl text-fg">Drop-offs in towns without a page</h2>
            <ul className="mt-4 space-y-2">
              {loneDrops.map((store) => (
                <li key={store.slug}>
                  <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-brass">
                    {store.name}
                  </Link>
                  <span className="text-muted"> · {store.city}, {store.state}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </Shell>
  );
}

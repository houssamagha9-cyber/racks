import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/ad-slot";
import { PinPreview } from "@/components/site/pin-preview";
import { PlaceGrid } from "@/components/site/place-card";
import { Shell } from "@/components/site/shell";
import { cityBySlug, dropsInCity, stores, storesInCity } from "@/data/racks";

export const Route = createFileRoute("/cities/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const city = cityBySlug(loaderData?.slug ?? "");
    const shops = storesInCity(loaderData?.slug ?? "");
    const title = !city
      ? "City — Racks"
      : shops.length
        ? `Thrift stores in ${city.name} — Racks`
        : `Where to donate clothes in ${city.name} — Racks`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: city?.intro[0] ?? "Thrift stores by city.",
        },
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { slug } = Route.useLoaderData();
  const city = cityBySlug(slug);
  if (!city) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-5 py-20">
          <h1 className="text-4xl text-fg">That city is not a page</h1>
          <Link to="/cities" className="mt-6 inline-flex min-h-11 items-center text-brass">
            All cities
          </Link>
        </div>
      </Shell>
    );
  }
  const rows = storesInCity(city.slug);
  const drops = dropsInCity(city.slug);
  const heading = rows.length ? `Thrift stores in ${city.name}` : `Where to donate clothes in ${city.name}`;
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-brass">{city.state}</p>
        <h1 className="mt-2 text-5xl text-fg">{heading}</h1>
        <div className="mt-4 max-w-3xl space-y-4">
          {city.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        {rows.length > 0 ? (
          <>
            <p className="mt-6 text-sm tabular-nums text-muted">{rows.length} open shops</p>
            <div className="mt-4">
              <PlaceGrid places={rows} />
            </div>
          </>
        ) : (
          <p className="mt-6 text-muted">No shop inside this city on the sourced list. The drop-offs are below.</p>
        )}
        {drops.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-3xl text-fg">Drop-off only</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              These take donations. They do not sell. A pin that looks like a store is the usual way this search goes wrong.
            </p>
            <div className="mt-4">
              <PlaceGrid places={drops} />
            </div>
          </section>
        ) : null}
        {stores.some((store) => store.citySlug === city.slug && store.closed) ? (
          <p className="mt-6 text-sm text-muted">
            Closed, still listed so the old address does not fool you:{" "}
            {stores
              .filter((store) => store.citySlug === city.slug && store.closed)
              .map((store) => (
                <Link key={store.slug} to="/stores/$slug" params={{ slug: store.slug }} className="mr-3 text-brass">
                  {store.name}
                </Link>
              ))}
          </p>
        ) : null}
        <PinPreview citySlug={city.slug} />
        <div className="mt-8">
          <AdSlot placement={`${city.name} city`} />
        </div>
        <p className="mt-4 text-sm text-muted">
          Two featured pins per city.{" "}
          <Link to="/advertise" className="text-brass">
            The rate card
          </Link>{" "}
          is $49 a month, labeled sponsored, and it stops at two so the list stays usable.
        </p>
      </div>
    </Shell>
  );
}

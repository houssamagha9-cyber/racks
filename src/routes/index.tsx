import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/ad-slot";
import { SearchForm } from "@/components/site/search-form";
import { Shell } from "@/components/site/shell";
import { PlaceGrid } from "@/components/site/place-card";
import { cities, fits, openStores, stores } from "@/data/racks";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Thrift stores in Memphis and the Mid-South — Racks" },
      {
        name: "description",
        content:
          "Thrift stores in Memphis, Southaven, Collierville, Hernando, and nearby towns. Shops separated from donation centers, with Sunday, furniture, and books marked only when a source says so.",
      },
    ],
  }),
});

function Home() {
  const picks = openStores().filter((item) => item.pick);
  const closed = stores.find((item) => item.closed);
  return (
    <Shell>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-sm text-brass">Memphis · Southaven · the Mid-South</p>
          <h1 className="mt-3 text-5xl text-fg sm:text-6xl">Thrift stores you can actually plan.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Racks answers two searches people already type: thrift stores, and where to donate clothes. Shops and
            drop-offs are never the same list. Sunday, furniture, books, and bargain barns are filled in only when a
            source said so.
          </p>
          <div className="mt-6">
            <SearchForm />
          </div>
          <Link to="/open" className="mt-4 inline-flex min-h-11 items-center text-brass">
            What’s open right now
          </Link>
        </div>
        <figure className="overflow-hidden rounded-lg border border-line">
          <img
            src="/media/loft.jpg"
            alt="A brick warehouse interior, a room plate, not a specific thrift store"
            width={1728}
            height={1152}
            className="frame-photo w-full object-cover"
          />
          <figcaption className="px-4 py-3 text-sm text-muted">
            Room plate. Not a photograph of a listed shop.
          </figcaption>
        </figure>
      </section>
      <div className="mx-auto w-full max-w-6xl px-5">
        <AdSlot placement="Homepage" />
      </div>
      {closed ? (
        <p className="mx-auto mt-8 w-full max-w-6xl px-5 text-sm text-muted">
          Do not drive to {closed.address}. Goodwill marks {closed.name} permanently closed.{" "}
          <Link to="/stores/$slug" params={{ slug: closed.slug }} className="text-brass">
            Read the note
          </Link>
          .
        </p>
      ) : null}
      <section className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl text-fg">Cities with a real answer</h2>
          <Link to="/cities" className="text-sm text-brass">
            All cities
          </Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <li key={city.slug}>
              <Link
                to="/cities/$slug"
                params={{ slug: city.slug }}
                className="block min-h-11 rounded-lg border border-line bg-surface px-4 py-4 hover:border-brass"
              >
                <span className="text-xl text-fg">{city.name}</span>
                <span className="mt-1 block text-sm text-muted">{city.state}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 pb-4">
        <h2 className="text-3xl text-fg">The fields a map hides</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {fits.map((fit) => (
            <li key={fit.slug}>
              <Link
                to="/fits/$slug"
                params={{ slug: fit.slug }}
                className="block rounded-lg border border-line px-4 py-4 hover:border-brass"
              >
                <span className="text-xl text-fg">{fit.title}</span>
                <span className="mt-1 block text-sm text-muted">{fit.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <h2 className="text-3xl text-fg">The names people type</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <li>
            <Link to="/chains/$slug" params={{ slug: "goodwill" }} className="block rounded-lg border border-line px-4 py-4 hover:border-brass">
              <span className="text-xl text-fg">Goodwill shops</span>
              <span className="mt-1 block text-sm text-muted">Retail doors only. Drop-offs are a different list.</span>
            </Link>
          </li>
          <li>
            <Link to="/chains/$slug" params={{ slug: "habitat" }} className="block rounded-lg border border-line px-4 py-4 hover:border-brass">
              <span className="text-xl text-fg">Habitat ReStore</span>
              <span className="mt-1 block text-sm text-muted">Closed Sunday and Monday. Furniture and supplies.</span>
            </Link>
          </li>
          <li>
            <Link to="/chains/$slug" params={{ slug: "vintage" }} className="block rounded-lg border border-line px-4 py-4 hover:border-brass">
              <span className="text-xl text-fg">Vintage</span>
              <span className="mt-1 block text-sm text-muted">Three Midtown doors. Two are not walk-in all week.</span>
            </Link>
          </li>
          <li>
            <Link to="/fits/$slug" params={{ slug: "kids" }} className="block rounded-lg border border-line px-4 py-4 hover:border-brass">
              <span className="text-xl text-fg">Kids and toys</span>
              <span className="mt-1 block text-sm text-muted">One sourced shop. Once Upon a Child had no printed hours.</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 py-12">
        <h2 className="text-3xl text-fg">Start here</h2>
        <div className="mt-6">
          <PlaceGrid places={picks} />
        </div>
      </section>
    </Shell>
  );
}

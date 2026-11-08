import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { fits, stores } from "@/data/racks";

export const Route = createFileRoute("/fits/")({
  head: () => ({
    meta: [
      { title: "Sunday, furniture, books, bargain barns — Racks" },
      {
        name: "description",
        content: "Filter pages for thrift questions a map does not answer: open Sunday, furniture, books, and bargain barns.",
      },
    ],
  }),
  component: FitsPage,
});

function FitsPage() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Filters</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Each page is one question. A shop gets on it only when a source answered yes. Guessing is how thrift lists
          go stale.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {fits.map((fit) => (
            <li key={fit.slug} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="text-3xl text-fg">
                <Link to="/fits/$slug" params={{ slug: fit.slug }} className="hover:text-brass">
                  {fit.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm tabular-nums text-muted">{stores.filter(fit.test).length} listings</p>
              <p className="mt-3 text-sm text-muted">{fit.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

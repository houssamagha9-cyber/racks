import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { chains, stores } from "@/data/racks";

export const Route = createFileRoute("/chains/")({
  head: () => ({
    meta: [
      { title: "Goodwill, Habitat, vintage, resale — Racks" },
      {
        name: "description",
        content: "Chain pages for the thrift names people actually type: Goodwill shops, Habitat ReStore, vintage, and resale.",
      },
    ],
  }),
  component: ChainsPage,
});

function ChainsPage() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">The names people type</h1>
        <p className="mt-3 max-w-2xl text-muted">
          A map pin is a bad answer to “Goodwill near me” when half the pins are drop-offs. Each page below is one
          name, and it only includes doors a source described.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {chains.map((chain) => (
            <li key={chain.slug} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="text-3xl text-fg">
                <Link to="/chains/$slug" params={{ slug: chain.slug }} className="hover:text-brass">
                  {chain.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm tabular-nums text-muted">{stores.filter(chain.test).length} shops</p>
              <p className="mt-3 text-sm text-muted">{chain.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

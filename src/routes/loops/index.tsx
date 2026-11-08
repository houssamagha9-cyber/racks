import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { loops } from "@/data/racks";

export const Route = createFileRoute("/loops/")({
  head: () => ({
    meta: [
      { title: "Thrift loops — Racks" },
      { name: "description", content: "Short driving loops that only stack shops whose hours can share a day." },
    ],
  }),
  component: LoopsPage,
});

function LoopsPage() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Loops</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Three routes, not a pile of city clones. Each one says which door is closed which day.
        </p>
        <ul className="mt-8 grid gap-4">
          {loops.map((loop) => (
            <li key={loop.slug} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="text-3xl text-fg">
                <Link to="/loops/$slug" params={{ slug: loop.slug }} className="hover:text-brass">
                  {loop.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{loop.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PlaceGrid } from "@/components/site/place-card";
import { Shell } from "@/components/site/shell";
import { getStore, loopBySlug } from "@/data/racks";

export const Route = createFileRoute("/loops/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const loop = loopBySlug(loaderData?.slug ?? "");
    return {
      meta: [
        { title: loop ? `${loop.title} — Racks` : "Loop — Racks" },
        { name: "description", content: loop?.description ?? "Thrift loop." },
      ],
    };
  },
  component: LoopPage,
});

function LoopPage() {
  const { slug } = Route.useLoaderData();
  const loop = loopBySlug(slug);
  if (!loop) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-5 py-20">
          <h1 className="text-4xl text-fg">That loop is not a page</h1>
          <Link to="/loops" className="mt-6 inline-flex min-h-11 items-center text-brass">
            All loops
          </Link>
        </div>
      </Shell>
    );
  }
  const stops = loop.stops.map((item) => getStore(item)).filter((item) => item != null);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">{loop.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">{loop.description}</p>
        <div className="mt-4 max-w-3xl space-y-4">
          {loop.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <PlaceGrid places={stops} />
        </div>
      </div>
    </Shell>
  );
}

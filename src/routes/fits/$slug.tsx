import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/ad-slot";
import { PlaceGrid } from "@/components/site/place-card";
import { Shell } from "@/components/site/shell";
import { fitBySlug, stores } from "@/data/racks";

export const Route = createFileRoute("/fits/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const fit = fitBySlug(loaderData?.slug ?? "");
    return {
      meta: [
        { title: fit ? `${fit.title} — Racks` : "Filter — Racks" },
        { name: "description", content: fit?.description ?? "Thrift filter." },
      ],
    };
  },
  component: FitPage,
});

function FitPage() {
  const { slug } = Route.useLoaderData();
  const fit = fitBySlug(slug);
  if (!fit) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-5 py-20">
          <h1 className="text-4xl text-fg">That filter is not a page</h1>
          <Link to="/fits" className="mt-6 inline-flex min-h-11 items-center text-brass">
            All filters
          </Link>
        </div>
      </Shell>
    );
  }
  const rows = stores.filter(fit.test);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-brass">One question</p>
        <h1 className="mt-2 text-5xl text-fg">{fit.title}</h1>
        <div className="mt-4 max-w-3xl space-y-4">
          {fit.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 text-sm tabular-nums text-muted">{rows.length} listings</p>
        <div className="mt-4">
          <PlaceGrid places={rows} />
        </div>
        <div className="mt-8">
          <AdSlot placement={fit.title} />
        </div>
      </div>
    </Shell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/site/ad-slot";
import { PlaceGrid } from "@/components/site/place-card";
import { Shell } from "@/components/site/shell";
import { chainBySlug, stores } from "@/data/racks";

export const Route = createFileRoute("/chains/$slug")({
  loader: ({ params }) => ({ slug: params.slug }),
  head: ({ loaderData }) => {
    const chain = chainBySlug(loaderData?.slug ?? "");
    return {
      meta: [
        { title: chain ? `${chain.title} — Racks` : "Chain — Racks" },
        { name: "description", content: chain?.description ?? "Thrift chain." },
      ],
    };
  },
  component: ChainPage,
});

function ChainPage() {
  const { slug } = Route.useLoaderData();
  const chain = chainBySlug(slug);
  if (!chain) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-5 py-20">
          <h1 className="text-4xl text-fg">That name is not a page</h1>
          <Link to="/chains" className="mt-6 inline-flex min-h-11 items-center text-brass">
            All names
          </Link>
        </div>
      </Shell>
    );
  }
  const rows = stores.filter(chain.test);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <p className="text-sm text-brass">One name</p>
        <h1 className="mt-2 text-5xl text-fg">{chain.title}</h1>
        <div className="mt-4 max-w-3xl space-y-4">
          {chain.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>
        {chain.slug === "goodwill" ? (
          <p className="mt-4 text-sm text-muted">
            Donation centers are not on this page.{" "}
            <Link to="/fits/$slug" params={{ slug: "donate" }} className="text-brass">
              Where to donate clothes
            </Link>
            .
          </p>
        ) : null}
        <p className="mt-6 text-sm tabular-nums text-muted">{rows.length} shops</p>
        <div className="mt-4">
          <PlaceGrid places={rows} />
        </div>
        <div className="mt-8">
          <AdSlot placement={chain.title} />
        </div>
        <p className="mt-4 text-sm text-muted">
          Two featured pins per city, labeled sponsored.{" "}
          <Link to="/advertise" className="text-brass">
            The rate card
          </Link>{" "}
          is $49 a month. A preview on this phone is not a sale.
        </p>
      </div>
    </Shell>
  );
}

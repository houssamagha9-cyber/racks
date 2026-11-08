import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";

export const Route = createFileRoute("/badge")({
  head: () => ({
    meta: [
      { title: "Listed on Racks — badge" },
      {
        name: "description",
        content: "A badge a listed shop can put on its site. The link points back here. That is the backlink, earned not bought.",
      },
    ],
  }),
  component: BadgePage,
});

const snippet = `<a href="https://racks.example/stores/your-shop">
  Listed on Racks
</a>`;

function BadgePage() {
  return (
    <Shell>
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <p className="text-sm text-brass">The link is the asset</p>
        <h1 className="mt-2 text-5xl text-fg">Listed on Racks</h1>
        <p className="mt-4 text-muted">
          Frey said a single relevant link moved his thrift directory onto page one. The clean version of that, without
          paying a stranger $50, is a badge the shop puts on its own site because the listing is useful. Replace the
          sample URL with the live shop page once this site has a domain.
        </p>
        <p className="mt-8 inline-flex min-h-11 items-center rounded-md border border-brass px-4 text-sm text-brass">
          Listed on Racks
        </p>
        <pre className="mt-6 overflow-x-auto rounded-lg border border-line bg-surface p-4 text-sm text-fg">{snippet}</pre>
        <p className="mt-4 text-sm text-muted">
          Do not buy a link from a page that has nothing to do with thrift. That is the part of the old playbook that
          ages badly. A shop linking its own listing is the one that still fits.
        </p>
      </div>
    </Shell>
  );
}

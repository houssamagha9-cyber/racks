import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { flagLabel, getStore, rackSearch, type Store } from "@/data/racks";
import { useRacksStore } from "@/lib/venue-store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare thrift shops — Racks" },
      { name: "description", content: "Compare up to three shops on Sunday, furniture, books, bargain floors, and hours." },
    ],
  }),
  component: ComparePage,
});

const rows: { label: string; value: (store: Store) => string }[] = [
  { label: "City", value: (store) => store.city },
  { label: "Hours", value: (store) => store.hours },
  { label: "Sunday", value: (store) => flagLabel(store.sunday) },
  { label: "Furniture", value: (store) => flagLabel(store.furniture) },
  { label: "Books", value: (store) => flagLabel(store.books) },
  { label: "Bargain", value: (store) => flagLabel(store.bargain) },
  { label: "Donation", value: (store) => flagLabel(store.donation) },
];

function ComparePage() {
  const { compare, custom, ready } = useRacksStore();
  const picked = compare
    .map((slug) => getStore(slug) ?? custom.find((item) => item.slug === slug) ?? null)
    .filter((item) => item != null);
  return (
    <Shell>
      <div className="mx-auto w-full max-w-6xl px-5 py-10">
        <h1 className="text-5xl text-fg">Compare</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Up to three shops, same questions. This is the part a map pin does not give you.
        </p>
        {!ready || picked.length === 0 ? (
          <p className="mt-8 text-muted">
            Nothing selected.{" "}
            <Link to="/stores" search={rackSearch()} className="text-brass">
              Browse shops
            </Link>{" "}
            and press Compare.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted">Field</th>
                  {picked.map((store) => (
                    <th key={store.slug} className="px-4 py-3 font-medium text-fg">
                      <Link to="/stores/$slug" params={{ slug: store.slug }} className="hover:text-brass">
                        {store.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th className="px-4 py-3 font-medium text-muted">{row.label}</th>
                    {picked.map((store) => (
                      <td key={store.slug} className="px-4 py-3 text-fg">
                        {row.value(store)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Shell>
  );
}

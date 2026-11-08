import { Link } from "@tanstack/react-router";
import { getStore, type Store } from "@/data/racks";
import { useRacksStore } from "@/lib/venue-store";

export function PinPreview({ citySlug }: { citySlug?: string }) {
  const { pins, ready } = useRacksStore();
  if (!ready) return null;
  const rows = pins
    .map((pin) => getStore(pin.slug))
    .filter((store): store is Store => {
      if (!store || store.closed || store.role !== "shop") return false;
      if (citySlug && store.citySlug !== citySlug) return false;
      return true;
    });
  if (rows.length === 0) return null;
  return (
    <section className="mt-8 rounded-lg border border-brass bg-surface p-4">
      <p className="text-sm text-brass">Pin preview · this phone only · not a charge</p>
      <ul className="mt-3 space-y-2">
        {rows.map((store) => (
          <li key={store.slug}>
            <Link to="/stores/$slug" params={{ slug: store.slug }} className="text-fg hover:text-brass">
              {store.name}
            </Link>
            <span className="text-sm text-muted">
              {" "}
              · {store.city} · {store.hours}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

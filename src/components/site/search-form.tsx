import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cities, rackSearch, type RackSearch } from "@/data/racks";
import { btnPrimary, field } from "@/components/site/shell";

export function SearchForm({ initial }: { initial?: RackSearch }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initial?.q ?? "");
  const [city, setCity] = useState(initial?.city ?? "");
  const [sunday, setSunday] = useState(initial?.sunday === "yes");
  const [furniture, setFurniture] = useState(initial?.furniture === "yes");
  const [books, setBooks] = useState(initial?.books === "yes");
  const [bargain, setBargain] = useState(initial?.bargain === "yes");

  const search = rackSearch({
    q,
    city,
    sunday: sunday ? "yes" : "",
    furniture: furniture ? "yes" : "",
    books: books ? "yes" : "",
    bargain: bargain ? "yes" : "",
  });

  return (
    <form
      className="grid gap-3 rounded-lg border border-line bg-surface p-3"
      onSubmit={(event) => {
        event.preventDefault();
        void navigate({ to: "/stores", search });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className="mb-1 block text-xs text-muted">Search</span>
          <input
            className={field}
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Southaven, books, Saltillo…"
            suppressHydrationWarning
          />
        </label>
        <label>
          <span className="mb-1 block text-xs text-muted">City</span>
          <select
            className={field}
            value={city}
            onChange={(event) => setCity(event.target.value)}
            suppressHydrationWarning
          >
            <option value="">All cities</option>
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Toggle on={sunday} setOn={setSunday} label="Open Sunday" />
        <Toggle on={furniture} setOn={setFurniture} label="Furniture" />
        <Toggle on={books} setOn={setBooks} label="Books" />
        <Toggle on={bargain} setOn={setBargain} label="Bargain barn" />
      </div>
      <button type="submit" className={btnPrimary}>
        Find shops
      </button>
    </form>
  );
}

function Toggle({ on, setOn, label }: { on: boolean; setOn: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn(!on)}
      className={
        on
          ? "inline-flex min-h-11 items-center rounded-md bg-brass px-3 text-sm text-bg"
          : "inline-flex min-h-11 items-center rounded-md border border-line px-3 text-sm text-fg"
      }
    >
      {label}
    </button>
  );
}

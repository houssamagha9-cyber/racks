import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { btnPrimary, field, Shell } from "@/components/site/shell";
import { cities, type Flag, type Store } from "@/data/racks";
import { saveCustom } from "@/lib/venue-store";

export const Route = createFileRoute("/list")({
  head: () => ({
    meta: [
      { title: "Add a shop — Racks" },
      { name: "description", content: "Add a thrift shop you can verify. It stays on this device." },
    ],
  }),
  component: ListPage,
});

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base || "shop";
}

function flagFrom(value: FormDataEntryValue | null): Flag {
  return value === "yes" ? "yes" : "unstated";
}

function ListPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  return (
    <Shell>
      <div className="mx-auto w-full max-w-xl px-5 py-10">
        <h1 className="text-5xl text-fg">Add a shop</h1>
        <p className="mt-3 text-muted">
          Only if you have the address from the shop’s own site or you are standing in it. This copy stays in this
          browser. Leave a box alone if you do not know. Do not guess Sunday hours.
        </p>
        <form
          className="mt-6 grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const name = String(data.get("name") ?? "").trim();
            const citySlug = String(data.get("city") ?? "");
            const address = String(data.get("address") ?? "").trim();
            const hours = String(data.get("hours") ?? "").trim();
            const blurb = String(data.get("blurb") ?? "").trim();
            const city = cities.find((item) => item.slug === citySlug);
            if (!name || !city || !address || !hours || !blurb) {
              setError("Name, city, address, hours, and a one-line note are required.");
              return;
            }
            const place: Store = {
              slug: `${slugify(name)}-${city.slug}`,
              name,
              city: city.name,
              citySlug: city.slug,
              state: city.state === "Mississippi" ? "MS" : "TN",
              address,
              phone: null,
              website: null,
              hours,
              sunday: flagFrom(data.get("sunday")),
              furniture: flagFrom(data.get("furniture")),
              books: "unstated",
              kids: "unstated",
              bargain: "unstated",
              donation: "unstated",
              role: "shop",
              kind: "thrift",
              closed: false,
              blurb,
              about: ["Added on this device. Not part of the sourced index until it is checked."],
              source: "Added in this browser. Not independently checked.",
              lat: null,
              lng: null,
              image: "/media/loft.jpg",
              imageAlt: "A brick warehouse interior. Room plate, not a photograph of this shop.",
              pick: false,
            };
            saveCustom(place);
            void navigate({ to: "/stores/$slug", params: { slug: place.slug } });
          }}
        >
          <label>
            <span className="mb-1 block text-xs text-muted">Name</span>
            <input className={field} name="name" required />
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted">City</span>
            <select className={field} name="city" required defaultValue="memphis">
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted">Address</span>
            <input className={field} name="address" required />
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted">Hours</span>
            <input className={field} name="hours" required placeholder="Tue–Sat 10am–5pm" />
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted">One line</span>
            <input className={field} name="blurb" required />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-fg">
            <input type="checkbox" name="sunday" value="yes" />
            Source says open Sunday
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-fg">
            <input type="checkbox" name="furniture" value="yes" />
            Source says furniture
          </label>
          {error ? <p className="text-sm text-brass">{error}</p> : null}
          <button type="submit" className={btnPrimary}>
            Save on this device
          </button>
        </form>
      </div>
    </Shell>
  );
}

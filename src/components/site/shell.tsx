import { Link } from "@tanstack/react-router";
import { rackSearch } from "@/data/racks";
import { useRacksStore } from "@/lib/venue-store";

export function Shell({ children }: { children: React.ReactNode }) {
  const { shortlist, compare } = useRacksStore();
  return (
    <div className="min-h-screen bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brass focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to the shops
      </a>
      <header className="border-b border-line bg-bg">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link to="/" className="font-display text-3xl leading-none tracking-tight text-fg">
            Racks
          </Link>
          <Link to="/list" className={btnPrimary}>
            Add a shop
          </Link>
        </div>
        <nav className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-3 pb-3" aria-label="Directory">
          <Link
            to="/open"
            className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm text-muted hover:bg-surface hover:text-fg"
          >
            Open today
          </Link>
          <Link
            to="/stores"
            search={rackSearch()}
            className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm text-muted hover:bg-surface hover:text-fg"
          >
            Shops
          </Link>
          <Nav to="/cities" label="Cities" />
          <Nav to="/fits" label="Filters" />
          <Nav to="/chains" label="Names" />
          <Nav to="/loops" label="Loops" />
          <Nav to="/compare" label={`Compare ${compare.length || ""}`.trim()} />
          <Nav to="/shortlist" label={`Shortlist ${shortlist.length}`} />
          <Nav to="/advertise" label="Advertise" />
          <Nav to="/grow" label="Playbook" />
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className="mt-16 border-t border-line">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-fg">Racks</p>
            <p className="mt-2 text-sm text-muted">
              Thrift shops in Memphis and the Mid-South. A shop is listed only with an address from Goodwill’s map,
              Habitat’s site, or the October 2026 Hey Memphis guide. Photographs are room plates, not the store.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-fg">Start here</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link to="/open" className="hover:text-fg">
                  Open right now
                </Link>
              </li>
              <li>
                <Link to="/chains/$slug" params={{ slug: "goodwill" }} className="hover:text-fg">
                  Goodwill shops
                </Link>
              </li>
              <li>
                <Link to="/cities/$slug" params={{ slug: "memphis" }} className="hover:text-fg">
                  Thrift stores in Memphis
                </Link>
              </li>
              <li>
                <Link to="/cities/$slug" params={{ slug: "southaven" }} className="hover:text-fg">
                  Thrift stores in Southaven
                </Link>
              </li>
              <li>
                <Link to="/fits/$slug" params={{ slug: "sunday" }} className="hover:text-fg">
                  Open Sunday
                </Link>
              </li>
              <li>
                <Link to="/fits/$slug" params={{ slug: "donate" }} className="hover:text-fg">
                  Where to donate clothes
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-fg">
                  Every page
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-fg">The business</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link to="/advertise" className="hover:text-fg">
                  Featured pins and ad slots
                </Link>
              </li>
              <li>
                <Link to="/badge" className="hover:text-fg">
                  Listed-on-Racks badge
                </Link>
              </li>
              <li>
                <Link to="/grow" className="hover:text-fg">
                  Why this is the directory format
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Nav({
  to,
  label,
}: {
  to: "/cities" | "/fits" | "/chains" | "/loops" | "/compare" | "/shortlist" | "/advertise" | "/grow";
  label: string;
}) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 shrink-0 items-center rounded-md px-3 text-sm text-muted hover:bg-surface hover:text-fg"
    >
      {label}
    </Link>
  );
}

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-brass px-4 text-sm font-medium text-bg transition-colors duration-200 hover:bg-fg";

export const btnGhost =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-line bg-surface px-4 text-sm text-fg transition-colors duration-200 hover:bg-surface-2";

export const field =
  "min-h-11 w-full rounded-md border border-line bg-surface px-3 text-base text-fg outline-none placeholder:text-muted focus:border-brass";

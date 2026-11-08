import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";
import { cities, fits, openStores, stores } from "@/data/racks";

export const Route = createFileRoute("/grow")({
  head: () => ({
    meta: [
      { title: "The directory playbook — Racks" },
      {
        name: "description",
        content:
          "What Frey Chu actually did on the $150k thrift directory, what this site copies, and what no build can guarantee.",
      },
    ],
  }),
  component: GrowPage,
});

function GrowPage() {
  return (
    <Shell>
      <article className="mx-auto w-full max-w-3xl px-5 py-10">
        <p className="text-sm text-brass">Chris Koerner interviewed Frey Chu. Not a revenue guarantee.</p>
        <h1 className="mt-2 text-5xl text-fg">The format that made the money</h1>
        <div className="mt-6 space-y-4 text-muted">
          <p>
            The video is The Koerner Office, October 2026, with Frey Chu. The site he said made about $150,000 over
            four years was a thrift-store directory. It reached on the order of 90,000 monthly visitors and up to
            $3,000 a month, mostly display ads. He said he touched it about half an hour every few months. He also
            said one $50 link was a big reason it reached page one, and that the first month of ads made about
            $1,200. Those are his figures from the interview, not a forecast for this site.
          </p>
          <p>
            His rules, in his words and the write-ups of that conversation: one niche, not a yellow pages. Check that
            an existing directory is weak before you build. Data first. A directory is a list that helps a decision
            Google Maps answers badly. Do not expect money in month one. Ranking on the thrift site took about six
            months to reach 10,000 visits.
          </p>
          <p>
            Venues failed that test. The Knot and WeddingWire already own “event venue” searches. A second pretty
            venue site does not outrank them because the design is darker. Distilleries failed the next test. The
            Tennessee Whiskey Trail and tourism boards already are the list, and there are not enough doors to build
            city pages the way a thrift directory does.
          </p>
          <p>
            A national scrape of 5,000 thrift stores also fails the 2026 test. Google has spent the year ignoring
            thin city clones. Directory guides this year say a page needs original typed fields, and that a category
            with a handful of real listings beats hundreds of empty ones. So this site stays on the Mid-South, where
            the records could be read off Goodwill’s own map, Habitat’s ReStore page, and one dated Memphis guide.
          </p>
          <h2 className="pt-4 text-3xl text-fg">The edge, specifically</h2>
          <p>
            Goodwill’s map plots shops and attended donation centers on the same pins, and it still plots a
            permanently closed store on Austin Peay. National listicles do not say which Hernando door is the bargain
            barn, or that the “Tupelo” store is in Saltillo. Racks is those distinctions: Sunday, furniture, books,
            bargain floor, donation-at-this-door, and a closed warning. {openStores().length} open shops,{" "}
            {stores.filter((item) => item.closed).length} closed warning, {cities.length} city pages, {fits.length}{" "}
            filters. No invented hours.
          </p>
          <h2 className="pt-4 text-3xl text-fg">What still has to happen outside this build</h2>
          <p>
            Nothing here ranks itself. Google is not a contract, and no directory “guarantees” revenue. The sequence
            that matched the interview is: publish the best answer for a small set of searches, get the site on its
            own domain, add it to Search Console, then earn a few relevant links. Frey’s method was a short email to
            a site that already listed a thrift store, offering $50 to $75 to add a link. The badge on this site is
            the thing a shop can embed. It is not a link you already have.
          </p>
          <p>
            Ads come after visits. Selling a featured pin comes after a shop wants the placement. A $150,000 outcome
            took four years on a site that already ranked. Copying the format raises the odds versus a venue brochure.
            It does not make the odds 100 percent.
          </p>
          <p>
            <Link to="/badge" className="text-brass">
              Get the badge
            </Link>
            {" · "}
            <Link to="/advertise" className="text-brass">
              See the rate card
            </Link>
            {" · "}
            <Link to="/cities/$slug" params={{ slug: "southaven" }} className="text-brass">
              Southaven, the honest one-shop page
            </Link>
          </p>
        </div>
      </article>
    </Shell>
  );
}

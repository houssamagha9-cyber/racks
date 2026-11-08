import { createFileRoute } from "@tanstack/react-router";
import { chains, cities, fits, loops, stores } from "@/data/racks";

function paths() {
  const urls = [
    "/",
    "/open",
    "/map",
    "/cities",
    "/fits",
    "/chains",
    "/loops",
    "/stores",
    "/advertise",
    "/grow",
    "/badge",
  ];
  for (const city of cities) urls.push(`/cities/${city.slug}`);
  for (const fit of fits) urls.push(`/fits/${fit.slug}`);
  for (const chain of chains) urls.push(`/chains/${chain.slug}`);
  for (const loop of loops) urls.push(`/loops/${loop.slug}`);
  for (const store of stores) {
    if (!store.closed) urls.push(`/stores/${store.slug}`);
  }
  return urls;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths()
  .map((path) => `  <url><loc>${origin}${path === "/" ? "/" : path}</loc></url>`)
  .join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

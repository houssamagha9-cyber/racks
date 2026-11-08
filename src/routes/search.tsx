import { createFileRoute, redirect } from "@tanstack/react-router";
import { rackSearch } from "@/data/racks";

export const Route = createFileRoute("/search")({
  beforeLoad: () => {
    throw redirect({ to: "/stores", search: rackSearch() });
  },
});

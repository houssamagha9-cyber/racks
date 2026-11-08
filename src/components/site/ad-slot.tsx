import { Link } from "@tanstack/react-router";

export function AdSlot({
  placement,
  size = "banner",
}: {
  placement: string;
  size?: "banner" | "card";
}) {
  return (
    <Link
      to="/advertise"
      className={
        size === "banner"
          ? "flex min-h-24 flex-col justify-center rounded-lg border border-dashed border-line bg-surface px-4 py-4 transition-colors duration-200 hover:border-brass"
          : "flex min-h-44 flex-col justify-between rounded-lg border border-dashed border-line bg-surface p-4 transition-colors duration-200 hover:border-brass"
      }
    >
      <span className="text-xs tracking-wide text-muted">Open slot · {placement}</span>
      <span className="font-display text-2xl text-fg">This slot is empty on purpose</span>
      <span className="text-sm text-brass">Featured pins stay capped. Ads wait for traffic.</span>
    </Link>
  );
}

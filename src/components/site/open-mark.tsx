import { useEffect, useState } from "react";
import { liveStatus, memphisNow, statusPhrase } from "@/lib/hours";

export function OpenMark({ hours, closed }: { hours: string; closed: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const tick = () => setOpen(liveStatus(hours, closed, memphisNow()).kind === "open");
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [hours, closed]);
  if (!open) return null;
  return <span className="rounded-md border border-line px-2 py-1 text-xs tracking-wide text-brass">Open now</span>;
}

export function HoursNow({ hours, closed }: { hours: string; closed: boolean }) {
  const [phrase, setPhrase] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setPhrase(statusPhrase(liveStatus(hours, closed, memphisNow())));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [hours, closed]);
  if (!phrase) return null;
  return <p className="mt-3 text-sm text-brass">{phrase}. Memphis time, from the printed hours.</p>;
}

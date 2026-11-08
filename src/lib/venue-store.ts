import { useEffect, useState } from "react";
import { type Store } from "@/data/racks";

const SHORTLIST = "racks.shortlist.v1";
const CUSTOM = "racks.custom.v1";
const LEADS = "racks.leads.v1";
const STATS = "racks.stats.v1";
const COMPARE = "racks.compare.v1";
const PINS = "racks.pins.v1";

export type Pin = {
  slug: string;
  citySlug: string;
  created: string;
};

export type Lead = {
  id: string;
  placeSlug: string;
  placeName: string;
  note: string;
  created: string;
};

export type Stats = {
  views: Record<string, number>;
  clicks: Record<string, number>;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("venue-store"));
}

export function loadShortlist() {
  const rows = readJson<string[]>(SHORTLIST, []);
  return Array.isArray(rows) ? rows.filter((slug) => typeof slug === "string") : [];
}

export function toggleShortlist(slug: string) {
  const current = loadShortlist();
  const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
  writeJson(SHORTLIST, next);
}

export function loadCompare() {
  const rows = readJson<string[]>(COMPARE, []);
  return Array.isArray(rows) ? rows.filter((slug) => typeof slug === "string").slice(0, 3) : [];
}

export function toggleCompare(slug: string) {
  const current = loadCompare();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug].slice(-3);
  writeJson(COMPARE, next);
}

function isStore(item: unknown): item is Store {
  if (!item || typeof item !== "object") return false;
  const row = item as Store;
  return typeof row.slug === "string" && typeof row.name === "string" && typeof row.city === "string";
}

export function loadCustom(): Store[] {
  const rows = readJson<Store[]>(CUSTOM, []);
  if (!Array.isArray(rows)) return [];
  return rows.filter(isStore);
}

export function saveCustom(place: Store) {
  writeJson(CUSTOM, [place, ...loadCustom().filter((item) => item.slug !== place.slug)]);
}

export function loadLeads(): Lead[] {
  const rows = readJson<Lead[]>(LEADS, []);
  return Array.isArray(rows) ? rows : [];
}

export function saveLead(lead: Lead) {
  writeJson(LEADS, [lead, ...loadLeads()].slice(0, 40));
}

export function loadPins(): Pin[] {
  const rows = readJson<Pin[]>(PINS, []);
  if (!Array.isArray(rows)) return [];
  return rows.filter(
    (pin) => pin && typeof pin.slug === "string" && typeof pin.citySlug === "string" && typeof pin.created === "string",
  );
}

export function holdPin(slug: string, citySlug: string): "added" | "removed" | "full" {
  const pins = loadPins();
  if (pins.some((pin) => pin.slug === slug)) {
    writeJson(
      PINS,
      pins.filter((pin) => pin.slug !== slug),
    );
    return "removed";
  }
  if (pins.filter((pin) => pin.citySlug === citySlug).length >= 2) return "full";
  writeJson(PINS, [...pins, { slug, citySlug, created: new Date().toISOString() }].slice(0, 24));
  return "added";
}

export function loadStats(): Stats {
  const stats = readJson<Stats>(STATS, { views: {}, clicks: {} });
  return {
    views: stats?.views && typeof stats.views === "object" ? stats.views : {},
    clicks: stats?.clicks && typeof stats.clicks === "object" ? stats.clicks : {},
  };
}

export function bumpStat(bucket: keyof Stats, key: string) {
  const stats = loadStats();
  stats[bucket][key] = (stats[bucket][key] ?? 0) + 1;
  writeJson(STATS, stats);
}

export function useRacksStore() {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [custom, setCustom] = useState<Store[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pins, setPins] = useState<Pin[]>([]);
  const [stats, setStats] = useState<Stats>({ views: {}, clicks: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setShortlist(loadShortlist());
      setCompare(loadCompare());
      setCustom(loadCustom());
      setLeads(loadLeads());
      setPins(loadPins());
      setStats(loadStats());
      setReady(true);
    };
    sync();
    window.addEventListener("venue-store", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("venue-store", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { shortlist, compare, custom, leads, pins, stats, ready };
}

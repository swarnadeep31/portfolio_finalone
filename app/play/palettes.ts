"use client";

import { useSyncExternalStore } from "react";

/* --------------------------------------------------
   Theme = a mode (light / dark / follow the system)
   plus an optional colour palette from the swatch.
   "auto" palette means paper in light mode, ink in dark.
-------------------------------------------------- */

export type Mode = "light" | "dark" | "system";
export const ACCENTS = ["auto", "acid", "tomato", "night"] as const;
type Accent = (typeof ACCENTS)[number];

const DARK_PALETTES = new Set(["ink", "night"]);
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

const read = <T extends string>(key: string, fallback: T): T => {
  try {
    return (localStorage.getItem(key) as T) || fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

let mode: Mode = "system";
let accent: Accent = "auto";
const listeners = new Set<() => void>();

/* Puts the resolved palette on <html> */
function apply(animate: boolean) {
  const root = document.documentElement;
  const dark = mode === "dark" || (mode === "system" && darkQuery().matches);
  const palette = accent === "auto" ? (dark ? "ink" : "paper") : accent;
  const set = () => {
    root.dataset.palette = palette;
    root.dataset.theme = DARK_PALETTES.has(palette) ? "dark" : "light";
    root.style.colorScheme = root.dataset.theme;
  };
  if (animate && document.startViewTransition) document.startViewTransition(set);
  else set();
  listeners.forEach((l) => l());
}

let started = false;
function init() {
  if (started || typeof window === "undefined") return;
  started = true;
  mode = read<Mode>("theme-mode", "system");
  accent = read<Accent>("palette-accent", "auto");
  // Follow the OS live while in system mode
  darkQuery().addEventListener("change", () => mode === "system" && apply(true));
}

export function setMode(next: Mode) {
  init();
  mode = next;
  accent = "auto"; // picking a mode shows that mode's own colours
  write("theme-mode", mode);
  write("palette-accent", accent);
  apply(true);
}

export function nextAccent() {
  init();
  accent = ACCENTS[(ACCENTS.indexOf(accent) + 1) % ACCENTS.length];
  write("palette-accent", accent);
  apply(true);
}

export function useThemeMode() {
  return useSyncExternalStore(
    (cb) => {
      init();
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => (init(), mode),
    () => "system" as Mode
  );
}

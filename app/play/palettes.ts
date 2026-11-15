export const PALETTES = [
  { id: "paper", swatch: "#101010" },
  { id: "ink", swatch: "#efede7" },
  { id: "acid", swatch: "#e3ff3b" },
  { id: "tomato", swatch: "#ff4f2e" },
  { id: "night", swatch: "#6f78ff" },
] as const;

export function nextPalette() {
  const root = document.documentElement;
  const i = PALETTES.findIndex((p) => p.id === root.dataset.palette);
  const next = PALETTES[(i + 1) % PALETTES.length].id;
  const apply = () => {
    root.dataset.palette = next;
    root.dataset.theme = next === "ink" || next === "night" ? "dark" : "light";
    try {
      localStorage.setItem("palette", next);
    } catch {}
  };
  if (document.startViewTransition) document.startViewTransition(apply);
  else apply();
}

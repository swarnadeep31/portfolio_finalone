"use client";

import { useEffect, useState } from "react";

const STEPS = " ░▒▓█";
const CELLS = 24;

/* A block-character progress bar that fills, then idles as a soft wave */
export default function DitherBar({ className }: { className?: string }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fill = Math.min(1, t / 1.6);
  let bar = "";
  for (let i = 0; i < CELLS; i++) {
    const loaded = i / CELLS < fill;
    if (!loaded) bar += "░";
    else if (fill < 1) bar += "█";
    else {
      const w = (Math.sin(i * 0.55 - t * 3) + 1) / 2;
      bar += STEPS[1 + Math.round(w * 3)];
    }
  }

  return (
    <span aria-hidden className={`font-mono leading-none tracking-[-0.05em] ${className ?? ""}`}>
      {bar}
    </span>
  );
}

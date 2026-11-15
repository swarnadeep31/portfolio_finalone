"use client";

import { useEffect, useRef, useState } from "react";
import { INSTRUMENTS, synth } from "./synth";

/* --------------------------------------------------
   "Type to play": every key becomes a dot-matrix letter
   that assembles on screen and plays a note.
-------------------------------------------------- */

type Dot = { x: number; y: number; tx: number; ty: number; vx: number; vy: number };
type Glyph = { dots: Dot[]; born: number; dying: number | null };

// 4×4 ordered-dither matrix: decides which cells of a soft edge get a dot
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const INTRO = "SWARNADEEP";

export default function TypePlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [instrument, setInstrument] = useState(0);
  const [octave, setOctave] = useState(0);
  const [echo, setEcho] = useState(1);
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyphs: Glyph[] = [];
    const pointer = { x: -9999, y: -9999 };
    let W = 0;
    let H = 0;
    let size = 160; // glyph height in px
    let cell = 6; // dot pitch
    let cursor = { x: 0, y: 0 };


    const sampler = document.createElement("canvas");
    const sctx = sampler.getContext("2d", { willReadFrequently: true })!;
    const fontFamily = getComputedStyle(document.body).fontFamily;

    const layout = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Size letters so the intro name fills one line
      sctx.font = `600 100px ${fontFamily}`;
      const nameWidth = sctx.measureText(INTRO).width + INTRO.length * 4;
      size = Math.max(44, Math.min(200, ((W - 2 * Math.max(16, W * 0.04)) * 100) / nameWidth));
      cell = Math.max(4, Math.round(size / 26));
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);

    const margin = () => Math.max(16, W * 0.04);
    const resetCursor = () => (cursor = { x: margin(), y: Math.max(20, H * 0.5 - size * 0.55) });
    resetCursor();

    /* Rasterise one character into dot targets */
    const makeGlyph = (ch: string, ox: number, oy: number, settle: boolean) => {
      const w = Math.ceil(size * 0.9);
      const h = Math.ceil(size * 1.1);
      sampler.width = w;
      sampler.height = h;
      sctx.clearRect(0, 0, w, h);
      sctx.fillStyle = "#000";
      sctx.font = `600 ${size}px ${fontFamily}`;
      sctx.textBaseline = "top";
      sctx.fillText(ch, 0, size * 0.05);
      const data = sctx.getImageData(0, 0, w, h).data;
      const dots: Dot[] = [];
      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          const a = data[(y * w + x) * 4 + 3] / 255;
          const threshold = BAYER[((y / cell) % 4) * 4 + ((x / cell) % 4)];
          if (a > threshold) {
            const tx = ox + x;
            const ty = oy + y;
            const ang = Math.random() * Math.PI * 2;
            const spread = settle ? 0 : 60 + Math.random() * 140;
            dots.push({ x: tx + Math.cos(ang) * spread, y: ty + Math.sin(ang) * spread, tx, ty, vx: 0, vy: 0 });
          }
        }
      }
      return { dots, born: performance.now(), dying: null } as Glyph;
    };

    const advance = (ch: string) => {
      sctx.font = `600 ${size}px ${fontFamily}`;
      return Math.max(size * 0.32, sctx.measureText(ch).width);
    };

    const typeChar = (ch: string, settle = false) => {
      if (ch === " ") {
        cursor.x += size * 0.35;
        return;
      }
      const adv = advance(ch);
      if (cursor.x + adv > W - margin()) newLine();
      glyphs.push(makeGlyph(ch, cursor.x, cursor.y, settle));
      cursor.x += adv + size * 0.04;
    };

    const newLine = () => {
      cursor.x = margin();
      cursor.y += size * 1.05;
      if (cursor.y + size > H) {
        // Push everything up a line; the top line crumbles away
        const lift = size * 1.05;
        cursor.y -= lift;
        for (const g of glyphs) {
          for (const d of g.dots) d.ty -= lift;
          if (g.dots.some((d) => d.ty < 0) && g.dying === null) g.dying = performance.now();
        }
      }
    };

    const backspace = () => {
      const g = [...glyphs].reverse().find((x) => x.dying === null);
      if (!g) return;
      g.dying = performance.now();
      const minX = Math.min(...g.dots.map((d) => d.tx));
      cursor.x = Math.max(margin(), minX);
    };

    const clearAll = () => {
      const now = performance.now();
      for (const g of glyphs) if (g.dying === null) g.dying = now;
      resetCursor();
    };

    /* Intro: the name types itself in, silently */
    let introTimer = 0;
    if (reduce) {
      for (const ch of INTRO) typeChar(ch, true);
    } else {
      let i = 0;
      const next = () => {
        if (i >= INTRO.length) return;
        typeChar(INTRO[i++]);
        introTimer = window.setTimeout(next, 90);
      };
      introTimer = window.setTimeout(next, 500);
    }

    let firstUserKey = true;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      // Only while the hero is on screen
      const r = wrap.getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight - 80) return;

      if (/^[0-9]$/.test(e.key)) {
        const i = (Number(e.key) + 9) % 10; // 1→0 … 0→9
        synth.instrument = i;
        setInstrument(i);
        synth.play("a");
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        synth.setOctave(synth.octave + (e.key === "ArrowUp" ? 1 : -1));
        setOctave(synth.octave);
        synth.play("c");
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        synth.setEcho(synth.echo + (e.key === "ArrowRight" ? 1 : -1));
        setEcho(synth.echo);
        synth.play("e");
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
      }
      if (e.key === "Enter") {
        newLine();
        return;
      }
      if (e.key === "Escape") {
        clearAll();
        return;
      }
      if (e.key === " " || /^[\p{L}\p{N}\p{P}\p{S}]$/u.test(e.key)) {
        if (e.key === " ") e.preventDefault();
        if (firstUserKey) {
          // The visitor takes over: clear the intro name
          firstUserKey = false;
          clearAll();
          setTyped(true);
        }
        typeChar(e.key.toUpperCase());
        if (e.key !== " ") synth.play(e.key);
      }
    };
    window.addEventListener("keydown", onKey);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    /* Physics + draw */
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = getComputedStyle(canvas).color;
      const s = cell * 0.82;

      for (let gi = glyphs.length - 1; gi >= 0; gi--) {
        const g = glyphs[gi];
        const dying = g.dying !== null ? (now - g.dying) / 1000 : -1;
        if (dying > 1.6) {
          glyphs.splice(gi, 1);
          continue;
        }
        for (const d of g.dots) {
          if (dying >= 0) {
            // Crumble: fall and scatter
            d.vy += 900 * dt;
            d.vx += (Math.random() - 0.5) * 60;
          } else {
            // Spring toward the target, pushed away by the cursor
            d.vx += (d.tx - d.x) * 60 * dt;
            d.vy += (d.ty - d.y) * 60 * dt;
            const dx = d.x - pointer.x;
            const dy = d.y - pointer.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < 90 * 90) {
              const f = (1 - Math.sqrt(dist2) / 90) * 2400 * dt;
              const inv = 1 / Math.max(1, Math.sqrt(dist2));
              d.vx += dx * inv * f;
              d.vy += dy * inv * f;
            }
            d.vx *= Math.exp(-9 * dt);
            d.vy *= Math.exp(-9 * dt);
          }
          d.x += d.vx * dt;
          d.y += d.vy * dt;
        }
        ctx.globalAlpha = dying >= 0 ? Math.max(0, 1 - dying / 1.6) : 1;
        for (const d of g.dots) ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // Blinking caret
      if (Math.floor(now / 530) % 2 === 0) ctx.fillRect(cursor.x, cursor.y + size * 0.1, Math.max(3, cell * 0.8), size * 0.85);

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(introTimer);
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={wrapRef} className="relative h-[58svh] min-h-[320px] w-full">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full text-foreground" aria-hidden />
        {/* Phones have no keyboard on screen: offer a field to type into */}
        <label className="absolute inset-x-4 bottom-2 [@media(hover:hover)]:hidden">
          <span className="sr-only">Type to play</span>
          <input
            onChange={(e) => {
              const ch = e.target.value.slice(-1);
              e.target.value = "";
              if (ch) window.dispatchEvent(new KeyboardEvent("keydown", { key: ch }));
            }}
            placeholder="Tap here and type to play ♪"
            className="w-full border-b border-current bg-transparent py-2 text-center font-mono text-xs outline-none placeholder:text-muted"
          />
        </label>
      </div>

      <div className="container-page mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[11px] text-muted uppercase">
        <span>{typed ? "Backspace erase · Enter new line · Esc clear" : "Type to play · 1–0 instrument · ↑↓ pitch · ←→ echo"}</span>
        <span className="flex gap-4 tabular-nums">
          <span>
            Inst <span className="text-foreground">{String(instrument + 1).padStart(2, "0")} {INSTRUMENTS[instrument]}</span>
          </span>
          <span>
            Oct <span className="text-foreground">{octave >= 0 ? `+${octave}` : octave}</span>
          </span>
          <span>
            Echo <span className="text-foreground">{"▮".repeat(echo)}{"▯".repeat(4 - echo)}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

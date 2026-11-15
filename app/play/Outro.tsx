"use client";

import { useEffect, useRef } from "react";
import { contact } from "../lib/content";
import { socials } from "../lib/socials";
import { useContactForm } from "../hooks/useContactForm";
import Scramble from "./Scramble";

const RAMP = " .·:-=+*#%@";

/* Inverted footer: an ASCII field that swells around the cursor */
function AsciiField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -999, y: -999, inside: false };
    let W = 0;
    let H = 0;
    const CELL = 14;

    const fit = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = r.width;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = pointer.y > 0 && pointer.y < H;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Only animate while on screen
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible && !reduce) return;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = getComputedStyle(canvas).color;
      ctx.font = `${CELL}px ui-monospace, monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL * 0.62) {
          const wave = Math.sin(x * 0.012 + t * 0.8) + Math.cos(y * 0.018 - t * 0.6) + Math.sin((x + y) * 0.006 + t * 0.4);
          let v = (wave + 3) / 6;
          if (pointer.inside) {
            const d = Math.hypot(x - pointer.x, y - pointer.y);
            v += Math.max(0, 1 - d / 180) * 0.9;
          }
          // Fade out toward the top so the copy above stays readable
          v *= Math.min(1, (y / H) * 1.6);
          const ch = RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)))];
          if (ch !== " ") ctx.fillText(ch, x, y);
        }
      }
      if (reduce) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full text-background/45" />;
}

export default function Outro() {
  const { status, onSubmit } = useContactForm();
  const field =
    "mt-2 w-full rounded-md border border-background/25 bg-background/[0.06] px-4 py-3.5 text-base outline-none transition-colors placeholder:text-background/35 hover:border-background/45 focus:border-background focus:bg-background/10";
  const label = "block font-mono text-[11px] uppercase opacity-70";

  return (
    <footer id="contact" className="relative overflow-hidden bg-foreground pb-32 text-background">
      <AsciiField />
      <div className="container-page relative grid grid-cols-12 gap-y-14 pt-[16vh]">
        <div className="col-span-12 md:col-span-6">
          <p className="font-mono text-[11px] uppercase opacity-60">Contact</p>
          <h2 className="mt-6 text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
            <Scramble text="Let’s build" />
            <br />
            <Scramble text="something" delay={0.1} />{" "}
            <span className="font-serif font-normal italic">
              <Scramble text="together." delay={0.2} />
            </span>
          </h2>
          <ul className="mt-10 space-y-1 font-mono text-sm">
            <li>
              <a href={`mailto:${contact.email}`} className="hover:opacity-60">{contact.email}</a>
            </li>
            <li>
              <a href={contact.phoneHref} className="hover:opacity-60">{contact.phone}</a>
            </li>
            <li className="opacity-60">{contact.location}</li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="col-span-12 space-y-6 self-end rounded-xl border border-background/20 bg-foreground/85 p-6 backdrop-blur-sm sm:p-8 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p className="font-mono text-[11px] uppercase opacity-60">Send a message</p>
          {status === "sent" ? (
            <p className="py-10 font-mono text-sm uppercase">
              <Scramble text="Message received — talk soon." />
            </p>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
                <label className={label}>
                  Name
                  <input name="name" required placeholder="Jane Doe" autoComplete="name" className={field} />
                </label>
                <label className={label}>
                  Email
                  <input name="email" type="email" required placeholder="jane@company.com" autoComplete="email" className={field} />
                </label>
              </div>
              <label className={label}>
                Message
                <textarea name="message" required rows={4} placeholder="Tell me about your project…" className={`${field} resize-none`} />
              </label>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button disabled={status === "sending"} className="rounded-md bg-background px-7 py-3.5 font-mono text-xs text-foreground uppercase transition-opacity hover:opacity-80 disabled:opacity-50">
                  {status === "sending" ? "Sending…" : "Send ↗"}
                </button>
                {status === "error" && <p className="font-mono text-xs">Something went wrong — try again.</p>}
              </div>
            </>
          )}
        </form>

        <p className="col-span-12 flex flex-wrap justify-between gap-2 border-t border-background/20 pt-5 font-mono text-[11px] uppercase opacity-60">
          <span>© {new Date().getFullYear()} Swarnadeep Roy</span>
          <span>Kolkata, India</span>
          <span>Built with Next.js &amp; Web Audio</span>
        </p>
      </div>
    </footer>
  );
}

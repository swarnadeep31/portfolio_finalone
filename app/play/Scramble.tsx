"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "░▒▓█<>/\\|_-=+*#@%&ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/* Text that decodes from random glyphs into the real words, the first time
   it scrolls into view — and again on hover when `hover` is set. The real
   text keeps the layout (and is what screen readers get). */
export default function Scramble({
  text,
  className,
  delay = 0,
  hover = false,
  speed = 1,
}: {
  text: string;
  className?: string;
  delay?: number;
  hover?: boolean;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string>("");
  const [done, setDone] = useState(false);
  const frame = useRef(0);

  const run = (wait: number) => {
    cancelAnimationFrame(frame.current);
    setDone(false);
    const start = performance.now() + wait;
    const total = Math.max(320, text.length * 28) / speed;
    const tick = (now: number) => {
      const p = (now - start) / total;
      if (p < 0) {
        setShown("");
        frame.current = requestAnimationFrame(tick);
        return;
      }
      if (p >= 1) {
        setShown(text);
        setDone(true);
        return;
      }
      const solved = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < solved || ch === " ") out += ch;
        else if (i < solved + 6) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        else out += " ";
      }
      setShown(out);
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      setDone(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run(delay * 1000);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className ?? ""}`}
      onPointerEnter={hover ? () => done && run(0) : undefined}>
      <span className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0 whitespace-pre">
        {shown}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

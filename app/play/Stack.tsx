"use client";

import { categories, skills } from "../lib/content";
import Scramble from "./Scramble";
import { synth } from "./synth";

/* The stack as a quiet table — each skill plays its own note on hover */
export default function Stack() {
  return (
    <section id="stack" className="container-page pb-[18vh]">
      <p className="border-b pb-3 font-mono text-[11px] text-muted uppercase">Stack — hover to hear it</p>
      {categories.map((cat, i) => {
        const items = skills.filter((s) => s.category === cat.key);
        return (
          <div key={cat.key} className="grid grid-cols-12 gap-y-3 border-b py-6">
            <p className="col-span-12 font-mono text-xs uppercase md:col-span-3">
              <Scramble text={`${String(i + 1).padStart(2, "0")} ${cat.label}`} />
            </p>
            <ul className="col-span-12 flex flex-wrap gap-x-6 gap-y-1 text-2xl tracking-[-0.03em] md:col-span-9 md:text-3xl">
              {items.map((s, j) => (
                <li
                  key={s.name}
                  onPointerEnter={() => synth.play(s.name)}
                  className="cursor-default transition-[font-style,opacity] hover:font-serif hover:italic">
                  <Scramble text={s.name} delay={j * 0.04} hover />
                  {j < items.length - 1 && <span className="text-subtle">,</span>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { projects } from "../lib/content";
import Scramble from "./Scramble";
import { synth } from "./synth";

/* Numbered project rows; hovering one shows its screenshot at the cursor */
export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30, mass: 0.5 });

  return (
    <section id="work" className="py-[22vh]" onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}>
      <div className="container-page">
        <div className="grid grid-cols-12 border-b px-4 pb-3 font-mono text-[11px] text-muted uppercase md:px-8">
          <span className="col-span-2 md:col-span-1">No.</span>
          <span className="col-span-10 md:col-span-4">Project</span>
          <span className="hidden md:col-span-5 md:block">Built with</span>
          <span className="hidden text-right md:col-span-2 md:block">Visit</span>
        </div>

        <ul onPointerLeave={() => setActive(null)}>
          {projects.map((p, i) => (
            <li key={p.id}>
              <a
                href={p.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => {
                  setActive(i);
                  synth.tick();
                }}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative isolate grid grid-cols-12 items-baseline border-b px-4 py-7 md:px-8 md:py-10">
                {/* Ink wipe on hover */}
                <span className="absolute inset-x-0 inset-y-1.5 -z-10 origin-left scale-x-0 rounded-lg bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="col-span-2 font-mono text-xs transition-colors group-hover:text-background md:col-span-1">
                  <Scramble text={String(i + 1).padStart(2, "0")} />
                </span>
                <span className="col-span-10 text-3xl font-medium tracking-[-0.04em] transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-background md:col-span-4 md:text-5xl">
                  <Scramble text={p.title} hover delay={i * 0.08} />
                </span>
                <span className="col-span-10 col-start-3 mt-2 font-mono text-[11px] text-muted uppercase transition-colors group-hover:text-background/70 md:col-span-5 md:col-start-auto md:mt-0">
                  <Scramble text={p.tags.slice(0, 4).join(" · ")} delay={0.2 + i * 0.08} />
                </span>
                {/* Touch screens have no hover preview: show the screenshot in the row */}
                <span className="relative col-span-10 col-start-3 mt-5 hidden aspect-video overflow-hidden rounded-lg bg-surface [@media(hover:none)]:block">
                  <Image src={p.image!} alt="" fill sizes="(min-width: 768px) 50vw, 85vw" className="object-cover object-top" />
                </span>
                <span className="hidden text-right font-mono text-xs transition-colors group-hover:text-background md:col-span-2 md:block">
                  {new URL(p.demoUrl).host.replace("www.", "")} ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor preview (mouse only) */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden [@media(hover:hover)]:block">
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ clipPath: "inset(50% 50% 50% 50%)", rotate: -4 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", rotate: 0 }}
              exit={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
              className="-mt-[130px] ml-8 w-[360px] rounded-xl bg-foreground p-2.5 text-background shadow-2xl">
              <div className="relative h-[210px] overflow-hidden rounded-md bg-surface">
              {projects[active].video ? (
                <video src={projects[active].video} poster={projects[active].image} autoPlay muted loop playsInline className="h-full w-full object-cover object-top" />
              ) : (
                <Image src={projects[active].image!} alt="" fill sizes="340px" className="object-cover object-top" />
              )}
              </div>
              <p className="flex items-center justify-between px-1.5 pt-2.5 pb-1 font-mono text-[10px] uppercase">
                <span>
                  {String(active + 1).padStart(2, "0")} / {projects[active].title}
                </span>
                <span className="opacity-60">Open ↗</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

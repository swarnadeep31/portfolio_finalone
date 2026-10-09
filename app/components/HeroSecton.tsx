"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import SectionWrapper from "./StackedSection";

const ease = [0.22, 1, 0.36, 1] as const;

/* Slides a line of text up from behind a mask */
function MaskLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

/* Local time in Kolkata — null on the server so hydration never mismatches */
const kolkataTime = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

const subscribeToClock = (tick: () => void) => {
  const id = setInterval(tick, 15_000);
  return () => clearInterval(id);
};

function LocalTime() {
  const time = useSyncExternalStore(
    subscribeToClock,
    () => kolkataTime.format(new Date()),
    () => null
  );

  return <span className="tabular-nums">{time ?? "--:-- --"}</span>;
}

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" className="overflow-hidden">
      <div className="relative flex min-h-[100svh] flex-col pt-28 pb-8 md:pt-32">
        {/* Background grid */}
        <div aria-hidden className="bg-grid absolute inset-0 -z-10" />

        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="container-page flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2.5 rounded-full border bg-background/60 px-3 py-1.5 text-xs backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-foreground motion-safe:animate-pulse-dot" />
              <span className="relative h-2 w-2 rounded-full bg-foreground" />
            </span>
            Available for new projects
          </span>

          <span className="label-mono hidden sm:block">
            Kolkata, IN — <LocalTime /> IST
          </span>
        </motion.div>

        {/* Headline */}
        <div className="container-page flex flex-1 flex-col justify-center py-16">
          <p className="label-mono mb-6 md:mb-8">
            <MaskLine delay={0.1}>Fullstack Developer &amp; UI Engineer</MaskLine>
          </p>

          <div className="relative">
            <h1 className="text-[clamp(3.25rem,15vw,13.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]">
              <MaskLine delay={0.15}>Swarnadeep</MaskLine>
              <MaskLine delay={0.25}>
                Roy
                <span className="font-serif font-normal italic tracking-normal text-muted">
                  .
                </span>
              </MaskLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-8 max-w-md text-lg leading-relaxed text-pretty text-muted md:absolute md:right-0 md:bottom-[0.2em] md:mt-0 md:max-w-sm lg:max-w-md lg:text-xl">
              Crafting{" "}
              <em className="font-serif text-[1.2em] text-foreground">
                fast, accessible
              </em>{" "}
              and elegant web experiences with React, TypeScript and Tailwind
              CSS.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-12 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85">
              View projects
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background">
              Get in touch
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="container-page">
          <div className="grid grid-cols-2 gap-4 border-t pt-5 md:grid-cols-4">
            <span className="label-mono">Based in Kolkata, India</span>
            <span className="label-mono hidden md:block">
              React · Next.js · TypeScript
            </span>
            <span className="label-mono hidden md:block">
              Design-minded engineering
            </span>
            <a
              href="#about"
              className="label-mono inline-flex items-center justify-end gap-2 transition-colors hover:text-foreground">
              Scroll
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}>
                <ArrowDown size={12} />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

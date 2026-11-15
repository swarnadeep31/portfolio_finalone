"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { nextPalette } from "./palettes";
import { synth } from "./synth";

/* Floating control bar: palette swatch, name, contact, sound */
export default function Bar() {
  const [sound, setSound] = useState(true);

  return (
    <motion.header
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 24 }}
      className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-md bg-foreground py-2.5 pr-3 pl-2.5 font-mono text-[12px] whitespace-nowrap text-background shadow-xl md:gap-6">
      <button
        onClick={() => {
          nextPalette();
          synth.tick(true);
        }}
        aria-label="Change colours"
        title="Change colours"
        className="h-5 w-5 rounded-[3px] bg-background transition-transform hover:scale-110 hover:rotate-45"
      />
      <a href="#top" className="hover:opacity-70">Swarnadeep Roy</a>
      <span className="hidden opacity-50 sm:inline">Fullstack Developer</span>
      <a
        href="#contact"
        onClick={() => {
          synth.tick(true);
          // After the smooth scroll lands, put the cursor in the form
          setTimeout(() => document.querySelector<HTMLInputElement>("#contact input[name=name]")?.focus({ preventScroll: true }), 900);
        }}
        className="underline-offset-4 hover:underline md:ml-6">
        Let’s talk
      </a>
      <button
        onClick={() => {
          synth.enabled = !sound;
          setSound(!sound);
        }}
        aria-pressed={sound}
        aria-label={sound ? "Turn sound off" : "Turn sound on"}
        className={`flex w-12 items-center justify-end gap-1 transition-opacity ${sound ? "" : "opacity-40"}`}>
        <span aria-hidden className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2px] bg-current ${sound ? "animate-[eq_0.9s_ease-in-out_infinite]" : ""}`}
              style={{ height: sound ? undefined : 3, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
        {sound ? "On" : "Off"}
      </button>
    </motion.header>
  );
}

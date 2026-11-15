"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { nextAccent, setMode, useThemeMode, type Mode } from "./palettes";
import { synth } from "./synth";

const MODES: { id: Mode; label: string; Icon: typeof Sun }[] = [
  { id: "light", label: "Light mode", Icon: Sun },
  { id: "dark", label: "Dark mode", Icon: Moon },
  { id: "system", label: "Match my device", Icon: Monitor },
];

/* Floating control bar: colour swatch, name, light/dark/auto, sound */
export default function Bar() {
  const [sound, setSound] = useState(true);
  const mode = useThemeMode();

  return (
    <motion.header
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 220, damping: 24 }}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-3 rounded-md bg-foreground py-2 pr-2.5 pl-2.5 font-mono text-[12px] whitespace-nowrap text-background shadow-xl sm:gap-5">
      <button
        onClick={() => {
          nextAccent();
          synth.tick(true);
        }}
        aria-label="Change colours"
        title="Change colours"
        className="h-5 w-5 shrink-0 rounded-[3px] bg-background transition-transform hover:scale-110 hover:rotate-45"
      />
      <a href="#top" className="truncate hover:opacity-70">
        Swarnadeep<span className="hidden min-[400px]:inline"> Roy</span>
      </a>
      <span className="hidden opacity-50 md:inline">Fullstack Developer</span>

      {/* Light / dark / follow the device */}
      <div role="radiogroup" aria-label="Theme" className="flex shrink-0 items-center rounded-[5px] bg-background/10 p-0.5 md:ml-4">
        {MODES.map(({ id, label, Icon }) => (
          <button
            key={id}
            role="radio"
            aria-checked={mode === id}
            aria-label={label}
            title={label}
            onClick={() => {
              setMode(id);
              synth.tick();
            }}
            className={`flex h-7 w-8 items-center justify-center rounded-[4px] transition-colors ${
              mode === id ? "bg-background text-foreground" : "opacity-60 hover:opacity-100"
            }`}>
            <Icon size={14} />
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          synth.enabled = !sound;
          setSound(!sound);
        }}
        aria-pressed={sound}
        aria-label={sound ? "Turn sound off" : "Turn sound on"}
        className={`flex shrink-0 items-center justify-end gap-1 transition-opacity sm:w-12 ${sound ? "" : "opacity-40"}`}>
        <span aria-hidden className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2px] bg-current ${sound ? "animate-[eq_0.9s_ease-in-out_infinite]" : ""}`}
              style={{ height: sound ? undefined : 3, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
        <span className="hidden sm:inline">{sound ? "On" : "Off"}</span>
      </button>
    </motion.header>
  );
}

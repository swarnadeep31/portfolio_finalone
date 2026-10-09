"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";

    const apply = () => {
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border text-foreground transition-colors hover:bg-foreground hover:text-background",
        className
      )}>
      {/* Icon swap is pure CSS so it never mismatches during hydration */}
      <Sun size={15} className="hidden dark:block" />
      <Moon size={15} className="block dark:hidden" />
    </button>
  );
}

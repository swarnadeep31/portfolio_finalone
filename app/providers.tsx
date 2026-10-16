"use client";

import { useEffect } from "react";
import { Toaster } from "./components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  /* ---------------- IN-PAGE LINKS WITHOUT #HASH IN URL ---------------- */
  useEffect(() => {
    // Old shared links like /#projects: keep the jump, drop the hash
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;

      const section = document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      // Next frame, so the mobile menu can close and unlock page scroll first
      requestAnimationFrame(() => section.scrollIntoView({ behavior: "smooth" }));
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}

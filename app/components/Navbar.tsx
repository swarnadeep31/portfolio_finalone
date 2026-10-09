"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  /* ---------------- SCROLL BG ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- ACTIVE SECTION ---------------- */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ["#hero", ...navItems.map((item) => item.href)].forEach((href) => {
      const section = document.querySelector(href);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(href === "#hero" ? "" : href);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ---------------- LOCK PAGE WHEN MENU OPEN ---------------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-line bg-background/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}>
        <nav className="container-page flex h-16 items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-3 text-sm font-medium tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground font-mono text-[11px] font-semibold text-background transition-transform duration-500 group-hover:rotate-[360deg]">
              SR
            </span>
            <span className="hidden sm:inline">Swarnadeep Roy</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 rounded-full border bg-background/40 p-1 backdrop-blur md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative isolate rounded-full px-4 py-1.5 text-sm transition-colors",
                  active === item.href
                    ? "text-background"
                    : "text-muted hover:text-foreground"
                )}>
                {active === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85 md:inline-flex">
              Let’s talk
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border md:hidden">
              <Menu size={17} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ---------------- MOBILE MENU ----------------
          Rendered outside the header: its backdrop-filter would otherwise
          trap this fixed overlay inside the header's box. */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden">
            <div className="container-page flex h-16 items-center justify-between">
              <span className="label-mono">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border">
                <X size={17} />
              </button>
            </div>

            <div className="container-page flex flex-1 flex-col justify-center">
              {[{ name: "Home", href: "#hero" }, ...navItems].map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-baseline gap-4 border-b py-4 text-4xl font-medium tracking-tight">
                  <span className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            <div className="container-page pb-10">
              <p className="label-mono">Get in touch</p>
              <a
                href="mailto:swarnadeeproy35@gmail.com"
                className="mt-2 block text-lg">
                swarnadeeproy35@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

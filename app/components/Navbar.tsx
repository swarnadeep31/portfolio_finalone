"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  /* ---------------- SCROLL BG ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- ACTIVE SECTION ---------------- */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(item.href);
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
    document.body.style.pointerEvents = open ? "none" : "";

    return () => {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] transition-all",
        scrolled
          ? "bg-[#f7f3ee]/80 backdrop-blur-xl border-b border-[#2b2118]/15"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={cn("flex items-center justify-between", scrolled ? "py-3" : "py-6")}>
          {/* Brand */}
          <a href="#hero" className="font-serif text-xl font-semibold text-[#2b2118]">
            Swarnadeep
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition",
                  active === item.href
                    ? "text-[#2b2118]"
                    : "text-[#6b5a4a] hover:text-[#2b2118]"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-px bg-[#2b2118] transition-all duration-300",
                    active === item.href ? "w-full" : "w-0"
                  )}
                />
              </a>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2118]/40"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#f7f3ee] pointer-events-auto"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2118]/40"
            >
              <X />
            </button>

            <div className="flex h-full flex-col items-center justify-center gap-10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl font-semibold text-[#2b2118]"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

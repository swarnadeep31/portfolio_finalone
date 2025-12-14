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
  const [active, setActive] = useState<string>("");

  /* ---------------- SCROLL STATE ---------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map((i) =>
        document.querySelector(i.href)
      );
      const scrollPos = window.scrollY + 120;

      sections.forEach((sec, i) => {
        if (!sec) return;
        const top = (sec as HTMLElement).offsetTop;
        const height = (sec as HTMLElement).offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActive(navItems[i].href);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- LOCK BODY SCROLL (MOBILE) ---------------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "bg-[#f7f3ee]/80 backdrop-blur-xl border-b border-[#2b2118]/15"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={cn(
            "flex items-center justify-between transition-all",
            scrolled ? "py-3" : "py-6"
          )}
        >
          {/* Brand */}
          <a
            href="#hero"
            className="font-serif text-lg md:text-xl font-semibold tracking-tight text-[#2b2118]"
          >
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

                {/* Active underline */}
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
            aria-label="Open menu"
            className="md:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2118]/40 text-[#2b2118] hover:bg-[#eae3da] transition"
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
            className="fixed inset-0 z-40 bg-[#f7f3ee]/95 backdrop-blur-xl"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-[#2b2118]/40 text-[#2b2118] hover:bg-[#eae3da] transition"
            >
              <X size={22} />
            </button>

            {/* Menu Items */}
            <div className="flex h-full flex-col items-center justify-center gap-10">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="font-serif text-3xl font-semibold text-[#2b2118] hover:text-[#5c4632] transition"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

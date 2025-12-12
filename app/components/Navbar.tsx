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

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-black/40 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400"
        >
          Swarnadeep
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              className="relative text-sm font-medium text-white/70 hover:text-white transition"
              whileHover={{ y: -2 }}
            >
              {link.name}

              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-pink-500 to-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          aria-label="Open menu"
          className="md:hidden p-2 text-white"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 z-40"
            >
              {navItems.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08 },
                  }}
                  className="text-3xl font-semibold text-white hover:text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-red-500 to-yellow-400 transition"
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

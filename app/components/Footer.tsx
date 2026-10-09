"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { socials } from "../lib/socials";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t">
      <div className="container-page grid grid-cols-2 gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="col-span-2 md:col-span-5">
          <p className="text-xl font-medium tracking-tight">Swarnadeep Roy</p>
          <p className="mt-2 max-w-xs text-muted">
            Frontend developer based in Kolkata, building calm and considered
            interfaces for the web.
          </p>
        </div>

        <nav className="md:col-span-2" aria-label="Footer">
          <p className="label-mono mb-4">Navigate</p>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label-mono mb-4">Socials</p>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground">
                  {s.name}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:flex md:justify-end">
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors hover:bg-foreground hover:text-background">
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="container-page select-none">
        <p className="translate-y-[0.12em] text-center text-[clamp(3rem,15vw,14rem)] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent bg-linear-to-b from-foreground/90 to-foreground/10 bg-clip-text">
          Swarnadeep
        </p>
      </div>

      <div className="relative border-t bg-background">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Swarnadeep Roy. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS &amp; Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}

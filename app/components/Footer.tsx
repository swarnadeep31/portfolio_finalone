"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#f7f3ee]">
      {/* Paper texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0.05),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Top divider (soft, not harsh) */}
      <div className="h-px w-full bg-[#2b2118]/15" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-[#6b5a4a] text-center md:text-left">
            © {new Date().getFullYear()} Swarnadeep Roy. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
            {[
              {
                href: "https://www.linkedin.com/in/swarnadeeproy/",
                icon: <Linkedin size={18} />,
              },
              {
                href: "https://www.instagram.com/thatgoddamntrip/",
                icon: <Instagram size={18} />,
              },
              {
                href: "https://www.facebook.com/swarnadeep.roy.90/",
                icon: <Facebook size={18} />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260 }}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2b2118]/30 text-[#2b2118] hover:bg-[#eae3da] transition"
                >
                  {item.icon}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260 }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="mx-auto md:mx-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2b2118] text-[#f7f3ee] hover:bg-[#3a2c20] transition"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center text-xs text-[#6b5a4a]">
          Designed & built with care using Next.js, Tailwind CSS, and Framer Motion
        </div>
      </motion.div>
    </footer>
  );
}

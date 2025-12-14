"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import SectionWrapper from "./StackedSection";

export default function HeroSection() {
  return (
    <SectionWrapper id="hero">
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background texture */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_60%)]" />

        {/* Center container */}
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-5xl md:text-7xl font-bold text-[#2b2118]"
          >
            Hi, I’m <br />
            <span className="text-[#5c4632]">Swarnadeep Roy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-[#6b5a4a]"
          >
            Frontend developer crafting fast, accessible, and elegant web
            experiences with React, TypeScript, and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="#projects"
              className="rounded-xl bg-[#2b2118] px-6 py-3 text-sm font-semibold text-[#f7f3ee] hover:bg-[#3a2c20] transition"
            >
              View Projects
            </Link>

            <Link
              href="#contact"
              className="rounded-xl border border-[#2b2118]/40 px-6 py-3 text-sm text-[#2b2118] hover:bg-[#eae3da] transition"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          aria-hidden
          animate={{ y: [0, 12, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#6b5a4a]"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </section>
    </SectionWrapper>
  );
}

"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../lib/utils";
import SectionWrapper from "./StackedSection";

const skills = [
  { name: "HTML / CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "MongoDB", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "Git & GitHub", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "VS Code", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"] as const;

/* --------------------------------------------
   Animations (FILTER SAFE)
-------------------------------------------- */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function SkillsSection() {
  const [active, setActive] =
    useState<(typeof categories)[number]>("all");

  const visible = skills.filter(
    (s) => active === "all" || s.category === active
  );

  return (
    <SectionWrapper id="skills">
      <section className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-20 text-center"
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2b2118]">
              Skills & Tools
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-[#6b5a4a]">
              Technologies I use to design and build thoughtful, modern web
              experiences.
            </p>
          </motion.div>

          {/* FILTERS */}
          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium capitalize transition",
                  active === c
                    ? "bg-[#2b2118] text-[#f7f3ee]"
                    : "border border-[#2b2118]/30 text-[#2b2118] hover:bg-[#eae3da]"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* SKILLS LIST */}
          <motion.ul
            key={active}                 // 🔥 THIS IS THE FIX
            initial="hidden"
            animate="visible"
            className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((skill, i) => (
              <motion.li
                key={skill.name}
                custom={i}
                variants={itemVariants}
                className="flex items-baseline justify-between border-b border-[#2b2118]/15 pb-3"
              >
                <span className="font-serif text-lg font-semibold text-[#2b2118]">
                  {skill.name}
                </span>
                <span className="text-xs uppercase tracking-wide text-[#6b5a4a]">
                  {skill.category}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </SectionWrapper>
  );
}

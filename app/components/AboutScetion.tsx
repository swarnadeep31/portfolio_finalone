"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Briefcase, Code, User } from "lucide-react";
import SectionWrapper from "./StackedSection";

/* --------------------------------------------
   Animations (TS-safe)
-------------------------------------------- */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="py-32">
        <div className="mx-auto max-w-6xl px-6 grid gap-20 lg:grid-cols-2 items-start">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="space-y-8">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2b2118]">
              Crafting Digital
              <br />
              Experiences
            </h2>

            <p className="max-w-xl leading-relaxed text-[#6b5a4a]">
              I’m a frontend developer who enjoys transforming ideas into
              elegant, intuitive interfaces with a strong focus on clarity,
              performance, and usability.
            </p>

            <p className="max-w-xl leading-relaxed text-[#6b5a4a]">
              I work with modern frontend stacks, design systems, and subtle
              animations to create products that feel refined and purposeful.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="mailto:swarnadeeproy35@gmail.com"
                className="rounded-lg bg-[#2b2118] px-6 py-3 text-sm font-semibold text-[#f7f3ee] hover:bg-[#3a2c20] transition">
                Contact Me
              </Link>

              <Link
                href="https://drive.google.com/file/d/1ZOZoWvxnno2F1nKxUba-ggB5B8vi9f6J/view?usp=sharing"
                className="rounded-lg border border-[#2b2118]/40 px-6 py-3 text-sm text-[#2b2118] hover:bg-[#eae3da] transition">
                View Resume
              </Link>
            </div>
          </motion.div>

          {/* FLAT LIST (NO CARDS) */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="space-y-6">
            {[
              {
                title: "Frontend Engineering",
                desc: "Modern, scalable UI development using React, TypeScript, and Tailwind.",
                icon: <Code className="h-5 w-5" />,
              },
              {
                title: "Computer Science",
                desc: "Strong foundation in software engineering and problem-solving.",
                icon: <User className="h-5 w-5" />,
              },
              {
                title: "Real Projects",
                desc: "Hands-on experience building and shipping production-ready applications.",
                icon: <Briefcase className="h-5 w-5" />,
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={itemVariants}
                className="flex gap-4 border-b border-[#2b2118]/15 pb-6">
                <div className="mt-1 text-[#5c4632]">{item.icon}</div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#2b2118]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-[#6b5a4a]">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

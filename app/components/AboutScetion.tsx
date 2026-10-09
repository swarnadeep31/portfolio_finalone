"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "./StackedSection";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

/* Words wrapped in *asterisks* render in the italic serif accent */
const statement =
  "I’m a frontend developer who enjoys transforming ideas into *elegant, intuitive* interfaces — with a strong focus on clarity, performance, and usability.";

const words = (() => {
  let accent = false;
  return statement.split(" ").map((raw) => {
    if (raw.startsWith("*")) accent = true;
    const word = { text: raw.replaceAll("*", ""), accent };
    if (raw.endsWith("*")) accent = false;
    return word;
  });
})();

const highlights = [
  {
    title: "Frontend Engineering",
    desc: "Modern, scalable UI development using React, TypeScript, and Tailwind.",
  },
  {
    title: "Computer Science",
    desc: "Strong foundation in software engineering and problem-solving.",
  },
  {
    title: "Real Projects",
    desc: "Hands-on experience building and shipping production-ready applications.",
  },
];

function Word({
  children,
  accent,
  progress,
  range,
}: {
  children: string;
  accent: boolean;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={accent ? "font-serif text-[1.08em] italic" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/* Statement whose words ink in one by one as it scrolls through the viewport */
function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <p
      ref={ref}
      className="text-3xl font-medium leading-[1.15] tracking-[-0.03em] md:text-5xl">
      {words.map((word, i) =>
        reduceMotion ? (
          <span
            key={i}
            className={
              word.accent ? "font-serif text-[1.08em] italic" : undefined
            }>
            {word.text}{" "}
          </span>
        ) : (
          <Word
            key={i}
            accent={word.accent}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}>
            {word.text}
          </Word>
        )
      )}
    </p>
  );
}

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="01" label="About" title="Who I am" />

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-5">
            <ScrollStatement />

            <Reveal className="mt-12 grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-muted">
                I work with modern frontend stacks, design systems, and subtle
                animations to create products that feel refined and
                purposeful.
              </p>

              <div className="flex flex-wrap items-start gap-3 md:justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85">
                  Contact me
                </a>
                <a
                  href="https://drive.google.com/file/d/1-kO1Wrbl8T_FzpfJlKlrg14IQEghVzl8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background">
                  View resume
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-24 grid border-t md:mt-32 md:grid-cols-3">
          {highlights.map((item, i) => (
            <li
              key={item.title}
              className="border-b py-8 md:border-b-0 md:py-10 md:pr-10 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-10">
              <Reveal delay={i * 0.08}>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{item.desc}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

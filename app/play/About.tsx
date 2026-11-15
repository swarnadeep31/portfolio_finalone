"use client";

import { contact, highlights } from "../lib/content";
import Scramble from "./Scramble";

const LINES = [
  "I’m a frontend developer who enjoys",
  "transforming ideas into elegant, intuitive",
  "interfaces — with a strong focus on clarity,",
  "performance, and usability.",
];

export default function About() {
  return (
    <section id="about" className="container-page pb-[22vh]">
      <div className="grid grid-cols-12 gap-y-10">
        <p className="col-span-12 font-mono text-[11px] text-muted uppercase md:col-span-3">About</p>
        <div className="col-span-12 md:col-span-9">
          <p className="text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.08] tracking-[-0.035em]">
            {LINES.map((l, i) => (
              <span key={i} className="block">
                <Scramble text={l} delay={i * 0.12} speed={1.6} />
              </span>
            ))}
          </p>
          <p className="mt-8 max-w-xl text-lg text-muted">
            I work with modern frontend stacks, design systems, and subtle animations to create products that feel refined and
            purposeful.
          </p>
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border-b border-current pb-0.5 font-mono text-xs uppercase hover:opacity-60">
            Read the resume ↗
          </a>

          <ul className="mt-16 grid gap-8 border-t pt-8 md:grid-cols-3">
            {highlights.map((h, i) => (
              <li key={h.title}>
                <p className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-xl tracking-tight">
                  <Scramble text={h.title} delay={i * 0.1} />
                </p>
                <p className="mt-2 text-muted">{h.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

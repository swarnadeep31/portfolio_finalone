"use client";

import SectionWrapper from "./StackedSection";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const skills = [
  { name: "HTML / CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "MongoDB", category: "backend" },
  { name: "SQL", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Git & GitHub", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "VS Code", category: "tools" },
  { name: "Next.js", category: "frontend" },
  { name: "NextAuth", category: "frontend" },
  { name: "Recharts", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Mongoose", category: "backend" },
];

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
] as const;

const marquee = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "Framer Motion",
  "PostgreSQL",
];

function Marquee() {
  // Two identical halves so translating by -50% loops seamlessly
  const row = [...marquee, ...marquee];

  return (
    <div
      aria-hidden
      className="relative flex overflow-hidden border-y py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:py-8">
      <div className="flex shrink-0 motion-safe:animate-marquee">
        {row.map((name, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center text-4xl font-medium tracking-[-0.04em] md:text-7xl">
            <span className={i % 2 ? "font-serif font-normal italic text-muted" : ""}>
              {name}
            </span>
            <span className="mx-6 text-subtle md:mx-10">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="02"
          label="Skills & Tools"
          title={
            <>
              The stack I{" "}
              <span className="font-serif font-normal italic">build</span> with
            </>
          }
          aside={
            <p>
              Technologies I use to design and build thoughtful, modern web
              experiences.
            </p>
          }
        />
      </div>

      <div className="mt-16 md:mt-24">
        <Marquee />
      </div>

      <div className="container-page mt-16 md:mt-24">
        <div className="border-t">
          {categories.map((cat, i) => {
            const items = skills.filter((s) => s.category === cat.key);

            return (
              <Reveal
                key={cat.key}
                delay={i * 0.06}
                className="grid gap-6 border-b py-8 md:grid-cols-12 md:py-10">
                <div className="flex items-baseline gap-3 md:col-span-4">
                  <h3 className="text-xl font-medium tracking-tight">
                    {cat.label}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    ({String(items.length).padStart(2, "0")})
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2 md:col-span-8">
                  {items.map((skill) => (
                    <li
                      key={skill.name}
                      className="cursor-default rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-foreground hover:text-background">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

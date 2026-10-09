"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./StackedSection";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { cn } from "../lib/utils";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
};

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const projects: Project[] = [
  {
    id: 1,
    title: "learnest",
    description:
      "An AI-powered platform designed to help students prepare for exams and assist teachers in creating exams automatically. The system focuses on smart question generation, analytics, and seamless assessment workflows.",
    image: "/projects/learnest.png",
    video: "",
    tags: [
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "Shadcn UI",
      "MongoDB",
      "OpenAI",
      "Razorpay",
    ],
    demoUrl: "https://trylearnest.com/",
    githubUrl: "#",
  },

  {
    id: 2,
    title: "Esho Natok Shikhi",
    description:
      "A full-stack drama school platform with dynamic content and admissions workflow.",
    image: "/projects/project2.png",
    video: "/projects/esho-natok-shiki.mp4",
    tags: ["React", "TypeScript", "MongoDB", "Node"],
    demoUrl: "https://esonatakshikhi.com",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Modern Real Estate",
    description:
      "A modern real estate frontend showcasing listings with smooth transitions.",
    image: "/projects/realestate.png",
    video: "/projects/realestate.mp4",
    tags: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://real-estate-awwwards.vercel.app/",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Job Tracker",
    description:
      "A modern job application tracking system with authentication, dashboard analytics, and status management. Built with Next.js and MongoDB for seamless job hunting organization.",
    image: "/projects/job-tracker.png",
    video: "/projects/job-tracker.mp4",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "NextAuth",
      "Recharts",
      "Framer Motion",
    ],
    demoUrl: "https://urjobs.vercel.app/",
    githubUrl: "https://github.com/swarnadeep31/ai-job-tracker",
  },
  {
    id: 5,
    title: "TypeSpeed — Typing Trainer",
    description:
      "A real-time typing practice app with live WPM, accuracy tracking, and a responsive interface.",
    image: "/projects/typing.png",
    video: "/projects/typing.mp4",
    tags: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://type-speed-green.vercel.app/",
    githubUrl: "https://github.com/swarnadeep31/type-speed",
  },
];

/* --------------------------------------------------
   SECTION
-------------------------------------------------- */
export default function ProjectSection() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <SectionWrapper id="projects" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="03"
          label="Selected Work"
          title={
            <>
              Things I’ve{" "}
              <span className="font-serif font-normal italic">built</span>
            </>
          }
          aside={
            <p>
              A curated selection of real-world work focused on clarity,
              performance, and thoughtful design.
            </p>
          }
        />

        {/* Projects */}
        <div className="mt-16 grid gap-x-6 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i === 0 ? 0 : (i % 2) * 0.1}
              className={cn(i === 0 && "md:col-span-2")}>
              <ProjectItem
                project={project}
                index={i + 1}
                featured={i === 0}
                onOpen={() => setActive(project)}
              />
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-24 flex flex-col items-center gap-6 border-t pt-16 text-center">
          <p className="label-mono">More on GitHub</p>
          <a
            href="https://github.com/swarnadeep31"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-3xl font-medium tracking-tight md:text-5xl">
            <Github className="h-7 w-7 md:h-10 md:w-10" />
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              @swarnadeep31
            </span>
            <ArrowUpRight className="h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-10 md:w-10" />
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={close} />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

/* --------------------------------------------------
   PROJECT ITEM
-------------------------------------------------- */
function ProjectItem({
  project,
  index,
  featured,
  onOpen,
}: {
  project: Project;
  index: number;
  featured: boolean;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasGithub = project.githubUrl !== "#";

  return (
    <article className="group">
      {/* Media */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border bg-surface",
          featured ? "aspect-video lg:aspect-[2.2/1]" : "aspect-video"
        )}
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}>
        {/* Grayscale at rest, full colour on hover (always colour on touch screens) */}
        <div className="absolute inset-0 transition-[filter,transform] duration-700 ease-out grayscale group-hover:scale-[1.03] group-hover:grayscale-0 [@media(hover:none)]:grayscale-0">
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              preload="none"
              poster={project.image}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <Image
              src={project.image!}
              fill
              sizes={featured ? "(min-width: 768px) 1280px, 100vw" : "(min-width: 768px) 640px, 100vw"}
              alt={project.title}
              className="object-cover object-top"
            />
          )}
        </div>

        <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
          {String(index).padStart(2, "0")}
        </span>

        <button
          onClick={onOpen}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus-visible:translate-y-0 md:focus-visible:opacity-100">
          <Maximize2 size={14} />
          Preview
        </button>
      </div>

      {/* Meta */}
      <div
        className={cn(
          "mt-6 grid gap-4",
          featured && "lg:grid-cols-12 lg:gap-6"
        )}>
        <div className={cn(featured && "lg:col-span-5")}>
          <div
            className={cn(
              "flex items-start justify-between gap-4",
              featured && "lg:flex-col lg:gap-6"
            )}>
            <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
              {project.title}
            </h3>

            <div className="flex shrink-0 gap-2">
              {hasGithub && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-foreground hover:text-background">
                  <Github size={16} />
                </a>
              )}
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live site`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:-rotate-45">
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className={cn(featured && "lg:col-span-7")}>
          <p className="max-w-2xl leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted uppercase">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/* --------------------------------------------------
   MODAL
-------------------------------------------------- */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl overflow-hidden rounded-2xl border bg-background">
        {/* Header bar */}
        <div className="flex items-center justify-between gap-4 border-b px-4 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden gap-1.5 sm:flex" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-subtle" />
              <span className="h-2.5 w-2.5 rounded-full bg-subtle" />
              <span className="h-2.5 w-2.5 rounded-full bg-subtle" />
            </span>
            <p className="truncate text-sm font-medium">{project.title}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors hover:bg-foreground hover:text-background">
              Live site
              <ArrowUpRight size={13} />
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:bg-foreground hover:text-background">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="relative aspect-video max-h-[75vh] w-full bg-black">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              controls
              playsInline
              poster={project.image}
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              src={project.image!}
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              alt={project.title}
              className="object-contain"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

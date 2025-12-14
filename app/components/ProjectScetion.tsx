"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SectionWrapper from "./StackedSection";

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
    title: "TypeSpeed — Typing Trainer",
    description:
      "A real-time typing practice app with live WPM, accuracy tracking, and a responsive interface.",
    image: "/projects/typing.png",
    video: "/projects/typing.mp4",
    tags: ["React", "TypeScript", "Tailwind"],
    demoUrl: "https://type-speed-green.vercel.app/",
    githubUrl: "https://github.com/swarnadeep31/type-speed",
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
];

/* --------------------------------------------------
   ANIMATION
-------------------------------------------------- */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // ✔ TS-safe cubic bezier
    },
  },
};

/* --------------------------------------------------
   SECTION
-------------------------------------------------- */
export default function ProjectSection() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <SectionWrapper id="projects">
      <section className="py-32">
        {/* Paper texture */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="mb-20 text-center"
          >
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2b2118]">
              Selected Projects
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-[#6b5a4a]">
              A curated selection of real-world work focused on clarity,
              performance, and thoughtful design.
            </p>
          </motion.div>

          {/* Projects */}
          <div className="grid gap-20 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="group"
              >
                <ProjectItem
                  project={project}
                  onOpen={() => setActive(project)}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <Link
              href="https://github.com/swarnadeep31"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border border-[#2b2118]/40 px-6 py-3 text-[#2b2118] hover:bg-[#eae3da] transition"
            >
              View More on GitHub
            </Link>
          </div>

          <AnimatePresence>
            {active && (
              <ProjectModal
                project={active}
                onClose={() => setActive(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </SectionWrapper>
  );
}

/* --------------------------------------------------
   PROJECT ITEM (NO CARD EFFECT)
-------------------------------------------------- */
function ProjectItem({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="space-y-6">
      {/* Media */}
      <div
        className="relative aspect-video overflow-hidden rounded-xl bg-[#eae3da]"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            poster={project.image}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={project.image!}
            fill
            alt={project.title}
            className="object-cover"
          />
        )}

        <button
          onClick={onOpen}
          className="absolute bottom-4 right-4 rounded-md bg-[#2b2118] px-4 py-2 text-sm text-[#f7f3ee] hover:bg-[#3a2c20] transition"
        >
          Preview
        </button>
      </div>

      {/* Meta */}
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#6b5a4a]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-lg font-semibold text-[#2b2118]">
          {project.title}
        </h3>

        <p className="mt-2 max-w-xl text-sm text-[#6b5a4a]">
          {project.description}
        </p>

        <div className="mt-4 flex gap-4">
          <Link href={project.demoUrl} target="_blank">
            <ExternalLink size={18} />
          </Link>
          {project.githubUrl !== "#" && (
            <Link href={project.githubUrl} target="_blank">
              <Github size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
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
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.96 }}
        className="relative mx-4 w-full max-w-5xl overflow-hidden rounded-2xl bg-[#f7f3ee]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-[#2b2118]/40 p-2 hover:bg-[#eae3da]"
        >
          <X size={18} />
        </button>

        <div className="h-[70vh] bg-[#eae3da]">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              controls
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <Image
              src={project.image!}
              fill
              alt={project.title}
              className="object-contain"
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

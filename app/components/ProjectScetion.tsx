"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

const projects: Project[] = [
  {
    id: 1,
    title: "TypeSpeed — Real-Time Typing Trainer",
    description:
      "A Monkey-Typing style typing web app built with React, TypeScript and Tailwind CSS. Adjustable test lengths, live WPM/accuracy, responsive UI.",
    image: "/projects/typing.png",
    video: "/projects/typing.mp4",
    tags: ["React", "Tailwind CSS", "TypeScript", "Node.js"],
    demoUrl: "https://type-speed-green.vercel.app/",
    githubUrl: "https://github.com/swarnadeep31/type-speed",
  },
  {
    id: 2,
    title: "Esho Natok Shikhi — Drama School Website",
    description:
      "A full-stack drama school website built with React, Tailwind, TypeScript and MERN. Dynamic content, responsive UI and admission forms.",
    image: "/projects/project2.png",
    video: "/projects/esho-natok-shiki.mp4",
    tags: ["React", "Tailwind CSS", "TypeScript", "MongoDB", "Express.js", "Node.js"],
    demoUrl: "https://esonatakshikhi.com",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Modern Real Estate Website",
    description:
      "A responsive real estate frontend built with React, Tailwind and TypeScript. Property listings, featured sections and subtle animations.",
    image: "/projects/realestate.png",
    video: "/projects/realestate.mp4",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    demoUrl: "https://real-estate-awwwards.vercel.app/",
    githubUrl: "#",
  },
];

// animations
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

export default function  ProjectSection ()  {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute top-10 left-0 w-[450px] h-[450px] bg-linear-to-r from-pink-500 to-yellow-400 blur-[180px] opacity-20 rounded-full" />

      <div className="mx-auto max-w-6xl">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4"
        >
          Featured{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">
            Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-16"
        >
          Explore my latest work — hover for preview and click to open a fullscreen demo.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition"
            >
              <ProjectCard project={project} onPreview={() => setOpenProject(project)} />
            </motion.div>
          ))}
        </div>

        {/* GitHub Button */}
        <div className="text-center mt-14">
          <Link
            href="https://github.com/swarnadeep31"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            Check My GitHub <ArrowRight size={16} />
          </Link>
        </div>

        <AnimatePresence>
          {openProject && (
            <ModalProject project={openProject} onClose={() => setOpenProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ---------------------------------------------------------
// PROJECT CARD
// ---------------------------------------------------------
const ProjectCard = ({
  project,
  onPreview,
}: {
  project: Project;
  onPreview: () => void;
}) => {
  const previewRef = useRef<HTMLVideoElement | null>(null);

  return (
    <>
      {/* Preview */}
      <div
        className="w-full h-52 md:h-64 relative bg-black overflow-hidden rounded-t-2xl"
        onMouseEnter={() => previewRef.current?.play()}
        onMouseLeave={() => {
          previewRef.current?.pause();
          if (previewRef.current) previewRef.current.currentTime = 0;
        }}
      >
        {project.video ? (
          <video
            ref={previewRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster={project.image}
          />
        ) : (
          <Image
            src={project.image!}
            fill
            alt={project.title}
            className="object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-md text-xs bg-white/10 border border-white/10 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-300 text-sm mb-6">{project.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href={project.demoUrl} target="_blank" className="text-gray-300 hover:text-white transition">
              <ExternalLink size={20} />
            </Link>
            {project.githubUrl !== "#" && (
              <Link href={project.githubUrl} target="_blank" className="text-gray-300 hover:text-white transition">
                <Github size={20} />
              </Link>
            )}
          </div>

          <button
            onClick={onPreview}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-yellow-400 text-black font-medium hover:brightness-110 transition"
          >
            Preview Demo
          </button>
        </div>
      </div>
    </>
  );
};

// ---------------------------------------------------------
// MODAL
// ---------------------------------------------------------
const ModalProject = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Dark glass backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-lg"></div>

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="relative w-full max-w-5xl mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 z-50 flex gap-2">
            <button
              onClick={() => setMuted((m) => !m)}
              className="px-3 py-1 rounded-md bg-white/10 text-gray-200"
            >
              {muted ? "Muted" : "Sound"}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Video */}
          <div className="w-full h-[75vh] bg-black">
            {project.video ? (
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                loop
                muted={muted}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <Image src={project.image!} alt={project.title} fill className="object-contain" />
            )}
          </div>

          {/* Info */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-gray-300 mt-2">{project.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

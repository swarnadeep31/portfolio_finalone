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

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: ["easeOut"] },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: ["easeOut"] },
  },
} satisfies Variants;


export const ProjectSection: React.FC = () => {
  // modal state
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="projects" className="py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
          Featured <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are a few projects — click <strong>Preview Demo</strong> to open a fullscreen showcase.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              className="group bg-card rounded-xl overflow-hidden shadow transition"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover="hover"
            >
              <ProjectCard project={project} onPreview={() => setOpenProject(project)} />
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="https://github.com/swarnadeep31"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-primary/10 hover:bg-primary/20 transition"
          >
            Check My GitHub <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {openProject && (
          <ModalProject project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;

/* ---------------------------
   ProjectCard component
   - hover play preview
   - Preview Demo button opens modal
----------------------------*/
const ProjectCard: React.FC<{ project: Project; onPreview: () => void }> = ({ project, onPreview }) => {
  const previewRef = useRef<HTMLVideoElement | null>(null);

  // Hover to play / pause
  const handleMouseEnter = () => {
    try {
      previewRef.current?.play();
    } catch {
      // ignore play errors
    }
  };
  const handleMouseLeave = () => {
    try {
      previewRef.current?.pause();
      previewRef.current!.currentTime = 0;
    } catch {}
  };

  return (
    <>
      <div
        className="w-full h-48 md:h-56 lg:h-64 relative bg-black overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {project.video ? (
          <video
            ref={previewRef}
            src={project.video}
            muted
            loop
            playsInline
            // no autoPlay here to avoid mobile autoplay issues; we play on hover
            className="w-full h-full object-cover"
            poster={project.image}
            // preload small metadata to improve responsiveness
            preload="metadata"
          />
        ) : (
          <Image
            src={project.image || "/projects/placeholder.png"}
            alt={project.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.35 }}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-secondary-foreground border"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="text-foreground/80 hover:text-primary transition"
                aria-label={`${project.title} demo`}
              >
                <ExternalLink size={20} />
              </Link>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <Link
                href={project.githubUrl}
                target="_blank"
                className="text-foreground/80 hover:text-primary transition"
                aria-label={`${project.title} github`}
              >
                <Github size={20} />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPreview}
              className="rounded-md px-3 py-2 bg-primary text-white text-sm font-medium hover:brightness-90 transition"
            >
              Preview Demo
            </button>

            <Link
              href={project.demoUrl || "#"}
              target="_blank"
              className="text-primary text-sm font-medium flex items-center gap-2"
            >
              View Live <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

/* ---------------------------
   ModalProject component
   - fullscreen modal with blur + fade (premium look)
   - plays video inside modal, can toggle muted
----------------------------*/
const ModalProject: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  // focus trap-ish: disable scroll when modal open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // stop video when closing
  useEffect(() => {
    return () => {
      try {
        videoRef.current?.pause();
        videoRef.current!.currentTime = 0;
      } catch {}
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.18 } }}
        exit={{ opacity: 0, transition: { duration: 0.12 } }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={onClose} // close on backdrop click
      >
        {/* blurred & darkened backdrop */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.98, y: 10 }}
          animate={{ scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }}
          exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.18 } }}
          className="relative w-full max-w-5xl mx-4 md:mx-8 lg:mx-12 bg-black/70 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Top controls */}
          <div className="absolute right-3 top-3 z-40 flex gap-2 items-center">
            <button
              onClick={() => setMuted((m) => !m)}
              className="rounded-md px-3 py-1 bg-white/10 text-sm text-white backdrop-blur-sm"
            >
              {muted ? "Muted" : "Sound"}
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
              aria-label="Close preview"
            >
              <X size={18} color="white" />
            </button>
          </div>

          {/* Video / Fallback content */}
          <div className="w-full h-[72vh] md:h-[78vh] lg:h-[80vh] relative">
            {project.video ? (
              <video
                ref={videoRef}
                src={project.video}
                autoPlay
                loop
                muted={muted}
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : project.image ? (
              <Image src={project.image} alt={project.title} fill className="object-contain" />
            ) : (
              <div className="flex items-center justify-center h-full text-white/70">No preview available</div>
            )}
          </div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.06 } }}
            className="px-6 py-4 bg-linear-to-t from-black/60 to-transparent"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-white/80 max-w-xl">{project.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" className="px-3 py-2 rounded-md bg-white/10 text-white">
                    Open Demo
                  </Link>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <Link href={project.githubUrl} target="_blank" className="px-3 py-2 rounded-md bg-white/10 text-white">
                    GitHub
                  </Link>
                )}

                <button
                  onClick={onClose}
                  className="px-3 py-2 rounded-md bg-white/10 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* backdrop layer */}
        <div className="fixed inset-0 -z-10 bg-black/60 backdrop-blur-sm"></div>
      </motion.div>
    </AnimatePresence>
  );
};

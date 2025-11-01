"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Car Shop Website",
    description:
      "A responsive car shop website built with React and Tailwind CSS.",
    image: "/projects/project1.png",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    demoUrl: "https://cars-phi-nine.vercel.app/",
    githubUrl: "https://github.com/swarnadeep31/cars",
  },
  {
    id: 2,
    title: "Esho Natok Shiki",
    description: "Drama school website built with React and Tailwind CSS.",
    image: "/projects/project2.png",
    tags: [
      "React",
      "Tailwind CSS",
      "TypeScript",
      "MongoDB",
      "Express.js",
      "Node.js",
    ],
    demoUrl: "https://esonatakshikhi.com",
    githubUrl: "#",
  },
];

export const ProjectScetion = () => {
  return (
    <section id="projects" className="py-24 relative px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects — carefully selected to showcase
          my skills and experience in web development.
        </p>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-primary/20 text-secondary-foreground border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </Link>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <Link
            href="https://github.com/swarnadeep31"
            target="_blank"
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
          >
            Check My GitHub <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

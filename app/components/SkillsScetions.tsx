"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const skills = [
  // Frontend
  { name: "HTML / CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },

  // Backend
  { name: "MongoDB", category: "backend" },
  { name: "SQL", category: "backend" },

  // Tools
  { name: "Git & GitHub", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "VS Code", category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export default function SkillsScetions () {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter((skill) =>
    activeCategory === "all" ? true : skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute -top-40 right-0 w-72 h-72 bg-linear-to-br from-pink-500 to-yellow-400 rounded-full blur-[160px] opacity-20" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12"
        >
          My{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">
            Skills
          </span>
        </motion.h2>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full capitalize font-medium text-sm transition-all",
                activeCategory === category
                  ? "bg-linear-to-r from-pink-500 to-yellow-400 text-black shadow-lg scale-105"
                  : "bg-white/5 text-white/80 hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 shadow-xl group overflow-hidden"
            >
              {/* Gradient Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-pink-500/20 via-red-500/20 to-yellow-400/20 transition-opacity duration-500"></div>

              <h3 className="relative font-semibold text-lg text-white mb-3">
                {skill.name}
              </h3>

              {/* <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-pink-500 to-yellow-400"
                  initial={{ width: 0 }}
        
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

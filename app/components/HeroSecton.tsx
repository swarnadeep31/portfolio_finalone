"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Background Gradient Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-linear-to-r from-pink-500 via-red-500 to-yellow-400 rounded-full blur-[160px] opacity-20" />

      {/* Floating Accent Shape */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute -top-32 -right-20 w-72 h-72 bg-linear-to-br from-pink-500 to-yellow-400 opacity-20 blur-[100px] rounded-full"
      />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
        >
          Hi, I'm
          <br />
          <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">
            Swarnadeep Roy
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          I craft modern, world-class web experiences using{" "}
          <span className="text-white font-semibold">React</span>,{" "}
          <span className="text-white font-semibold">Tailwind CSS</span>, and{" "}
          <span className="text-white font-semibold">JavaScript</span>.  
          Clean design, smooth interactions, and scalable architecture.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-4 justify-center mt-6"
        >
          <Link
            href="#projects"
            className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 to-yellow-400 text-black font-semibold shadow-lg hover:scale-[1.05] transition"
          >
            View Projects
          </Link>

          <Link
            href="#contact"
            className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 12 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.4,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
      >
        <ArrowDown className="h-6 w-6 text-pink-400" />
      </motion.div>
    </section>
  );
};

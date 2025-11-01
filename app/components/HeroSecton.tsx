"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Hero content */}
      <div className="max-w-4xl mx-auto space-y-6 z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="block opacity-0 animate-fade-in">Hi, I'm</span>
          <span className="text-primary opacity-0 animate-fade-in-delay-1">
            {" "}
            Swarnadeep
          </span>
          <span className="ml-2 opacity-0 animate-fade-in-delay-2 text-glow">
            Roy
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
          I build modern, responsive, and user-friendly web applications.
          Specializing in React, Tailwind CSS, and JavaScript, I craft seamless
          digital experiences that balance performance and design.
        </p>

        <div className="pt-4 opacity-0 animate-fade-in-delay-4">
          <Link
            href="#projects"
            className="cosmic-button inline-flex items-center"
          >
            View My Work
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};

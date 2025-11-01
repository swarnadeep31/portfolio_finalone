"use client";

import Link from "next/link";
import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Column - About Text */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-semibold">
              Web Developer & Game Enthusiast
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I’ve built multiple projects ranging from simple landing pages to
              complex web applications. I’m passionate about creating seamless
              user experiences and writing clean, efficient code. I also love to
              play games during leisure time — it keeps my creativity sharp.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I enjoy learning new technologies and continuously improving my
              skills. When I’m not coding, I’m usually gaming or exploring new
              design ideas to bring into my projects.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link href="#contact" className="cosmic-button text-center">
                Get In Touch
              </Link>

              <Link
                href="https://drive.google.com/file/d/1kqOx5FgZG3I2JU50iJG9TtOUloRxk-Nm/view?usp=sharing"
                target="_blank"
                className="px-6 py-2 rounded-full border border-primary hover:bg-primary/10 transition-colors duration-300 text-center"
              >
                Download CV
              </Link>
            </div>
          </div>

          {/* Right Column - Info Cards */}
          <div className="grid grid-cols-1 gap-6">
            {/* Card 1 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">
                    I build responsive and dynamic web apps using modern tools
                    like React, TypeScript, and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">University Student</h4>
                  <p className="text-muted-foreground">
                    Currently pursuing my Master’s in Computer Science, focusing
                    on software development and algorithms.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">
                    Projects & Experience
                  </h4>
                  <p className="text-muted-foreground">
                    Experienced in building and deploying real-world web
                    applications that emphasize performance and UI/UX quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

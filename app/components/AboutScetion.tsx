"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Code, User } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-purple-900/20 via-black to-black" />
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-linear-to-br from-pink-500 to-yellow-400 rounded-full blur-[180px] opacity-20" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            About{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 via-red-500 to-yellow-400">
              Me
            </span>
          </h2>

          <p className="text-gray-300 leading-relaxed">
            I'm a passionate frontend developer specializing in modern web
            technologies. I love building smooth, aesthetic, and deeply
            interactive user experiences using React, TypeScript, and Tailwind
            CSS.
          </p>

          <p className="text-gray-300 leading-relaxed">
            When I’m not coding, I enjoy gaming, exploring UI/UX inspiration,
            and continuously learning new technologies to sharpen my craft.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="#contact" className="px-6 py-3 rounded-full bg-linear-to-r from-pink-500 to-yellow-400 text-black font-semibold shadow-lg hover:scale-[1.03] transition">
              Get In Touch
            </Link>

            <Link
              href="https://drive.google.com/file/d/1kqOx5FgZG3I2JU50iJG9TtOUloRxk-Nm/view?usp=sharing"
              target="_blank"
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              Download CV
            </Link>
          </div>
        </motion.div>

        {/* Right Floating Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-6"
        >
          {[
            {
              title: "Web Development",
              desc: "Building sleek, responsive, and modern interfaces with React, TypeScript, and Tailwind CSS.",
              icon: <Code className="h-6 w-6 text-pink-400" />,
            },
            {
              title: "Computer Science Student",
              desc: "MCA student focusing on software engineering, algorithms, and real-world application development.",
              icon: <User className="h-6 w-6 text-pink-400" />,
            },
            {
              title: "Projects & Experience",
              desc: "Hands-on experience building full-stack and real-world production-grade applications.",
              icon: <Briefcase className="h-6 w-6 text-pink-400" />,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-white/10">{card.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {card.title}
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

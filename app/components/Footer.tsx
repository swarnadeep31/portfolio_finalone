"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Facebook, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-20 pt-14 pb-10 overflow-hidden border-t border-white/10 bg-black">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/80 to-transparent" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 rounded-full blur-[160px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} Swarnadeep.co — Crafted with passion and precision.
        </p>

        {/* Back to Top Button */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            href="#hero"
            className="p-3 rounded-full bg-linear-to-r from-pink-500 to-yellow-400 text-black shadow-lg hover:brightness-105 transition"
          >
            <ArrowUp size={20} />
          </Link>
        </motion.div>

        {/* Social Links */}
        <div className="flex items-center space-x-6">
          {[
            {
              href: "https://www.linkedin.com/in/swarnadeeproy/",
              icon: <Linkedin size={22} />,
            },
            {
              href: "https://www.instagram.com/thatgoddamntrip/",
              icon: <Instagram size={22} />,
            },
            {
              href: "https://www.facebook.com/",
              icon: <Facebook size={22} />,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                {item.icon}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom small text */}
      <div className="text-center text-gray-500 text-xs mt-10">
        Designed & Developed by Swarnadeep Roy
      </div>
    </footer>
  );
};

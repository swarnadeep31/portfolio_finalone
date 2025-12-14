"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

type SectionWrapperProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionWrapper({
  id,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={cn(
        "relative -mt-32 bg-[#f7f3ee]", // overlap via margin
        className
      )}
    >
      {children}
    </motion.section>
  );
}

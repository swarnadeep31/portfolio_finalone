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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative scroll-mt-28 bg-[#f7f3ee]",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

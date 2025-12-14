"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

let zIndexCounter = 10;

export default function SectionWrapper({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const zIndex = zIndexCounter++;

  return (
    <motion.section
      id={id}
      style={{ zIndex }}
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative -mt-32 bg-[#f7f3ee]",
        className
      )}
    >
      {children}
    </motion.section>
  );
}

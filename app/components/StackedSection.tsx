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
    <section id={id} className={cn("relative scroll-mt-16", className)}>
      {children}
    </section>
  );
}

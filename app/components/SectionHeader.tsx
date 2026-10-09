import { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  label,
  title,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 border-t pt-6 md:grid-cols-12">
      <p className="label-mono md:col-span-4">
        ({index}) <span className="ml-2">{label}</span>
      </p>
      <div className="flex flex-col gap-6 md:col-span-8">
        <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.035em] md:text-6xl">
          {title}
        </h2>
        {aside && <div className="max-w-md text-muted">{aside}</div>}
      </div>
    </Reveal>
  );
}

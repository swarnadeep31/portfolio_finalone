"use client";

import DitherBar from "./DitherBar";
import Scramble from "./Scramble";
import TypePlay from "./TypePlay";

export default function Intro() {
  return (
    <section id="top" className="pt-8">
      <div className="container-page grid grid-cols-12 items-center gap-y-3 font-mono text-[12px] uppercase">
        <span className="col-span-6 md:col-span-3">
          <Scramble text="Swarnadeep Roy" />
        </span>
        <span className="order-3 col-span-12 md:order-none md:col-span-6 md:text-center">
          <DitherBar className="text-[13px]" />
        </span>
        <span className="col-span-6 text-right md:col-span-3">
          <Scramble text="Fullstack Developer" delay={0.15} />
        </span>
      </div>
      <TypePlay />
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPinned, Route, Youtube } from "lucide-react";
import SectionWrapper from "./StackedSection";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { cn } from "../lib/utils";

/* --------------------------------------------------
   DATA
-------------------------------------------------- */
const shots = [
  {
    src: "/projects/trailcast-home.png",
    label: "Landing",
    alt: "TrailCast landing page with an illustrated mountain trail",
  },
  {
    src: "/projects/trailcast-feed.webp",
    label: "Trail feed",
    alt: "TrailCast feed of the latest rides, treks and climbs",
  },
  {
    src: "/projects/trailcast-trail.webp",
    label: "Trail view",
    alt: "A TrailCast trail: YouTube video beside a live map with numbered key points",
  },
];

const features = [
  {
    icon: Youtube,
    title: "Paste a YouTube link",
    text: "Rides, treks and climbs stay on YouTube, live streams too. TrailCast puts a map right beside the video.",
  },
  {
    icon: Route,
    title: "Put the route on the map",
    text: "Upload a GPS file, let AI spot the places mentioned in the video, or tap them on the map yourself.",
  },
  {
    icon: MapPinned,
    title: "Everyone rides along",
    text: "Viewers see where you are at every moment and save the stops to Google Maps, a GPX file or a trip sheet.",
  },
];

const tags = ["YouTube embeds", "Leaflet", "OpenStreetMap", "AI route detection", "GPX"];

/* --------------------------------------------------
   SECTION
-------------------------------------------------- */
export default function BuildingSection() {
  const [current, setCurrent] = useState(0);
  const shot = shots[current];

  return (
    <SectionWrapper id="building" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeader
          index="04"
          label="In Progress"
          title={
            <>
              Currently{" "}
              <span className="font-serif font-normal italic">building</span>
            </>
          }
          aside={
            <p>
              What I’m shipping right now. A home for adventure videos, with
              the trail mapped out beside them.
            </p>
          }
        />

        <div className="mt-16 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Gallery */}
          <Reveal className="lg:col-span-7">
            <div className="group relative aspect-video overflow-hidden rounded-2xl border bg-surface">
              <AnimatePresence initial={false}>
                <motion.div
                  key={shot.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 transition-[filter,transform] duration-700 ease-out grayscale group-hover:scale-[1.03] group-hover:grayscale-0 [@media(hover:none)]:grayscale-0">
                  <Image
                    src={shot.src}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    alt={shot.alt}
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>

              <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
                {shot.label}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => setCurrent(i)}
                  aria-label={`Show ${s.label} screenshot`}
                  aria-pressed={i === current}
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-lg border transition-all duration-300",
                    i === current
                      ? "border-foreground"
                      : "opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                  )}>
                  <Image
                    src={s.src}
                    fill
                    sizes="(min-width: 1024px) 240px, 33vw"
                    alt=""
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <span className="inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-foreground motion-safe:animate-pulse-dot" />
                <span className="relative h-2 w-2 rounded-full bg-foreground" />
              </span>
              In development
            </span>

            <h3 className="mt-6 text-3xl font-medium tracking-[-0.03em] md:text-4xl">
              TrailCast
            </h3>
            <p className="mt-2 font-serif text-xl italic text-muted">
              Watch the adventure. Follow the trail.
            </p>

            <p className="mt-6 leading-relaxed text-muted">
              Moto vlogs, Himalayan treks and summit climbs with a live map
              beside the video. Viewers see exactly where the creator is, then
              save the places for their own trip.
            </p>

            <ol className="mt-8 border-t">
              {features.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4 border-b py-5">
                  <span className="label-mono pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="flex items-center gap-2 font-medium">
                      <Icon size={16} className="text-muted" />
                      {title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted uppercase">
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </SectionWrapper>
  );
}

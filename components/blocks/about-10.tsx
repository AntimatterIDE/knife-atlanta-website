"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const founder = {
  src: images.lounge,
  name: "The room",
  role: "Atlanta",
};

const portraits = [
  { src: images.mezze, name: "Mezze", desktopOnly: false },
  { src: images.lamb, name: "Lamb chops", desktopOnly: false },
  { src: images.kebab, name: "Filet kebab", desktopOnly: false },
  { src: images.shrimp, name: "Shrimp", desktopOnly: false },
  { src: images.patio, name: "The patio", desktopOnly: false },
  { src: images.shank, name: "Lamb shank", desktopOnly: false },
  { src: images.cuisine, name: "Ribeye", desktopOnly: true },
  { src: images.happyHour, name: "Happy hour", desktopOnly: true },
];

const notes = ["Charcoal", "Mezze", "Cocktails", "Patio", "Late dining"];

export default function About10() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      aria-labelledby="house-title"
      className="w-full bg-surface section-y section-x"
    >
      <div className="container-lux mx-auto w-full">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.p variants={item} className="text-eyebrow text-ink">
            The house
          </motion.p>
          <motion.h2
            id="house-title"
            variants={item}
            className="mt-6 font-display text-display-l text-ink text-balance"
          >
            We are{" "}
            <span className="text-ink-muted">{site.name}.</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-display text-[1.35rem] leading-relaxed text-ink-muted md:text-[1.5rem]"
          >
            Modern Mediterranean in an evening room — plates meant to be shared,
            charcoal heat, and a patio for the night air.
          </motion.p>
          <motion.div variants={item} className="mt-10">
            <Link href="/story" className="link-lux text-caps text-ink">
              Our story <span aria-hidden="true">›</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid auto-rows-[140px] grid-cols-2 gap-3 sm:mt-20 sm:auto-rows-[160px] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[200px] lg:grid-cols-6"
        >
          <motion.figure
            variants={item}
            className="group relative col-span-2 row-span-2 row-start-1 overflow-hidden bg-surface-2 sm:col-start-2 lg:col-start-3"
          >
            <Image
              src={founder.src}
              alt={`${founder.name} at Knife`}
              fill
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <figcaption className="absolute bottom-4 left-4 bg-surface/90 px-4 py-2 backdrop-blur-sm">
              <span className="block font-display text-lg leading-tight text-ink">
                {founder.name}
              </span>
              <span className="block text-eyebrow text-ink-muted">
                {founder.role}
              </span>
            </figcaption>
          </motion.figure>
          {portraits.map((shot) => (
            <motion.div
              key={shot.name}
              variants={item}
              className={`group relative overflow-hidden bg-surface-2 ${
                shot.desktopOnly ? "hidden sm:block" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.name}
                fill
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col gap-5 border-t border-hairline pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-eyebrow text-ink-muted">The evening</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {notes.map((note) => (
              <span
                key={note}
                className="font-display text-lg tracking-tight text-ink-muted"
              >
                {note}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

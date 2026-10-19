"use client";

import { motion } from "motion/react";
import { site } from "@/lib/site";

const items = [
  {
    title: "Charcoal\nheat",
    body: "Grills and reductions cut for sharing — heat that stays quiet on the plate.",
  },
  {
    title: "Shared\ntables",
    body: "Mezze first, then the room opens. Intimate dinners and lively gatherings alike.",
  },
  {
    title: "Evening\nair",
    body: "The patio after dusk. Cocktails later still. A house for the night.",
  },
];

export default function Features8() {
  return (
    <section
      aria-labelledby="pillars-title"
      className="flex w-full items-center justify-center bg-surface-2 section-y section-x"
    >
      <div className="container-lux mx-auto flex w-full flex-col items-center">
        <p className="text-eyebrow text-ink">The evening</p>
        <h2
          id="pillars-title"
          className="mt-5 max-w-[18ch] text-center font-display text-display-m text-ink text-balance"
        >
          How the house holds you
        </h2>

        <div className="mt-16 grid w-full grid-cols-1 gap-14 sm:mt-20 sm:grid-cols-3 sm:gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <h3 className="whitespace-pre-line font-display text-[1.85rem] leading-[1.15] text-ink sm:text-[2.15rem]">
                {item.title}
              </h3>
              <p className="max-w-[28ch] text-ink-muted">{item.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16 text-center text-eyebrow text-ink-muted"
        >
          {site.city} · {site.tagline}
        </motion.p>
      </div>
    </section>
  );
}

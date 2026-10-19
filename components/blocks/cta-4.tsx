"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const shots = [
  { id: 1, url: images.mezze, alt: "Mezze trio" },
  { id: 2, url: images.lamb, alt: "Lamb chops" },
  { id: 3, url: images.kebab, alt: "Filet kebab" },
  { id: 4, url: images.lounge, alt: "Dining room" },
  { id: 5, url: images.shrimp, alt: "Shrimp" },
  { id: 6, url: images.patio, alt: "Patio" },
  { id: 7, url: images.shank, alt: "Lamb shank" },
  { id: 8, url: images.cuisine, alt: "Ribeye" },
];

export default function Cta4() {
  const duplicated = [...shots, ...shots];

  return (
    <section
      aria-labelledby="hours-cta-title"
      className="flex w-full flex-col items-center overflow-hidden bg-surface section-x"
    >
      <div className="container-lux mx-auto flex w-full items-center justify-center py-20 md:py-28">
        <div className="max-w-3xl space-y-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-eyebrow text-ink"
          >
            Hours
          </motion.p>
          <motion.h2
            id="hours-cta-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 }}
            className="font-display text-display-l text-ink text-balance"
          >
            Dining from dusk.{" "}
            <em className="font-display italic text-ink-muted">Bar later still.</em>
          </motion.h2>
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mx-auto grid max-w-lg gap-3 text-left sm:grid-cols-2"
          >
            {site.hours.dining.map((row) => (
              <li
                key={row.days}
                className="flex justify-between gap-4 border-b border-hairline pb-3 text-sm"
              >
                <span className="text-ink">{row.days}</span>
                <span className="text-ink-muted">{row.time}</span>
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex justify-center pt-2"
          >
            <Link href="/contact" className="link-lux text-caps text-ink">
              Visit details <span aria-hidden="true">›</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full overflow-x-clip pb-16 pt-4 md:pb-24">
        <div className="relative">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 48,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            }}
            style={{ willChange: "transform" }}
          >
            {duplicated.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className={`relative h-44 w-32 shrink-0 overflow-hidden bg-surface-2 sm:h-52 sm:w-40 md:h-60 md:w-48 ${
                  index % 2 === 1 ? "-mt-8 md:-mt-12" : ""
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

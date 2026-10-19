"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { images as knifeImages } from "@/lib/images";
import { site } from "@/lib/site";

export default function Cta4() {
  const images = [
    { id: 1, url: knifeImages.mezze, alt: "Mezze" },
    { id: 2, url: knifeImages.lamb, alt: "Lamb chops" },
    { id: 3, url: knifeImages.kebab, alt: "Filet kebab" },
    { id: 4, url: knifeImages.lounge, alt: "Dining room" },
    { id: 5, url: knifeImages.shrimp, alt: "Shrimp" },
    { id: 6, url: knifeImages.patio, alt: "Patio" },
    { id: 7, url: knifeImages.shank, alt: "Lamb shank" },
    { id: 8, url: knifeImages.cuisine, alt: "Ribeye" },
  ];

  const duplicatedImages = [...images, ...images];

  return (
    <section className="flex w-full flex-col items-center overflow-hidden bg-night px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="space-y-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-eyebrow text-dusk-muted"
          >
            Hours
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-display text-3xl font-normal leading-[1.15] text-dusk sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Dining from dusk.{" "}
            <em className="italic font-normal text-dusk-muted">
              Bar later still.
            </em>
          </motion.h2>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto grid max-w-lg gap-3 pt-2 text-left sm:grid-cols-2"
          >
            {site.hours.dining.map((row) => (
              <li
                key={row.days}
                className="flex justify-between gap-4 border-b border-dusk-line pb-3 text-sm"
              >
                <span className="text-dusk">{row.days}</span>
                <span className="text-dusk-muted">{row.time}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex justify-center pt-4"
          >
            <Link
              href="/reservations"
              className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-dusk py-2 pl-6 pr-2 text-sm font-medium text-night transition-colors duration-200 hover:bg-white sm:text-base"
            >
              <span className="relative z-10">Reserve a table</span>
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-night transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4 text-dusk sm:h-5 sm:w-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full overflow-x-clip pb-16 pt-4 sm:pb-20 md:pb-24">
        <div className="relative">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
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
            {duplicatedImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className={`h-44 w-32 shrink-0 overflow-hidden bg-night-2 sm:h-52 sm:w-40 md:h-60 md:w-48 ${
                  index % 2 === 1 ? "-mt-8 md:-mt-12" : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

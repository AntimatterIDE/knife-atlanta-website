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
    <section className="flex w-full flex-col items-center overflow-hidden bg-[#FBF9F4] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="space-y-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl font-normal leading-[1.15] text-neutral-900 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Dining from dusk.{" "}
            <span className="italic font-light">Bar later still.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base md:text-lg"
          >
            {site.hours.dining.map((r) => `${r.days} ${r.time}`).join(" · ")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Link
              href="/reservations"
              className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-neutral-900 py-2 pl-6 pr-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-neutral-800 sm:text-base"
            >
              <span className="relative z-10">Reserve a table</span>
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4 text-neutral-900 sm:h-5 sm:w-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="w-full overflow-x-clip pb-12 pt-8 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="relative">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 40,
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
                className={`h-44 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-48 sm:w-36 md:h-56 md:w-44 lg:h-64 lg:w-48 ${
                  index % 2 === 1 ? "-mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16" : ""
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

"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

const slides = [
  { src: images.lounge, alt: "Knife dining room and bar" },
  { src: images.patio, alt: "Knife patio at night" },
  { src: images.mezze, alt: "Mezze trio at Knife" },
];

export default function Contact5() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideDuration = 5000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, slideDuration);
    return () => clearTimeout(timeout);
  }, [activeSlide]);

  return (
    <section className="w-full bg-surface px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col pt-4 lg:pt-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-eyebrow text-ink"
            >
              Contact
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-display-l text-ink"
            >
              Visit Knife
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[42ch] text-ink-muted"
            >
              Hours, dress code, and a quiet line to the house — for tables,
              private evenings, and everything in between.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid gap-10 sm:grid-cols-2"
            >
              <div>
                <p className="text-eyebrow text-ink">Location</p>
                <p className="mt-4 text-ink">
                  {site.address.line1}
                  <br />
                  United States
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-eyebrow text-ink">Mail</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-lux mt-4 inline-block text-ink"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-eyebrow text-ink">Phone</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="link-lux mt-4 inline-block text-ink"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 grid gap-4 sm:grid-cols-2"
            >
              <Link
                href="/reservations"
                className="group flex items-center justify-between border border-ink bg-ink px-6 py-5 text-paper transition-colors duration-500 hover:bg-transparent hover:text-ink"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-paper/70 group-hover:text-ink-muted">
                    Tonight
                  </p>
                  <p className="mt-1 text-caps">Reserve a table</p>
                </div>
                <span aria-hidden>›</span>
              </Link>
              <Link
                href="/private-dining"
                className="group flex items-center justify-between border border-hairline bg-paper px-6 py-5 text-ink transition-colors duration-500 hover:border-ink"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
                    Gatherings
                  </p>
                  <p className="mt-1 text-caps">Private events</p>
                </div>
                <span aria-hidden>›</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border border-hairline bg-paper p-8"
            >
              <p className="text-eyebrow text-ink">Dress code</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                {site.dressCode}
              </p>
              <p className="mt-6 text-caps text-ink">{site.ageRequirement}</p>
              <p className="mt-3 text-[13px] text-ink-muted">{site.serviceCharge}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[28rem] lg:min-h-full"
          >
            <div className="absolute right-6 top-6 z-10 flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className="h-px w-8 overflow-hidden bg-paper/30"
                >
                  {index < activeSlide ? (
                    <div className="h-full w-full bg-paper" />
                  ) : index === activeSlide ? (
                    <motion.div
                      key={`progress-${activeSlide}`}
                      className="h-full bg-paper"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: slideDuration / 1000,
                        ease: "linear",
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="relative h-full min-h-[28rem] overflow-hidden lg:absolute lg:inset-0">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activeSlide}
                  src={slides[activeSlide].src}
                  alt={slides[activeSlide].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

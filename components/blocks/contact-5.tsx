"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <section className="w-full bg-surface section-x pt-10 pb-20 sm:pt-14 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-stretch">
          <div className="flex flex-col">
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
              className="mt-6 max-w-[42ch] text-lead text-ink-muted"
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
                <p className="label-lux">Location</p>
                <p className="font-display text-2xl text-ink">
                  {site.address.line1}
                </p>
                <p className="mt-2 text-ink-muted">United States</p>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="label-lux">Mail</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-lux text-[15px] text-ink"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="label-lux">Phone</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="link-lux text-[15px] text-ink"
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
                className="group relative flex min-h-[7.5rem] flex-col justify-between overflow-hidden bg-ink px-7 py-6 text-paper transition-transform duration-500 hover:scale-[1.01]"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-paper/55">
                    Tonight
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-paper/70 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="font-display text-[1.65rem] leading-none">
                  Reserve a table
                </p>
              </Link>
              <Link
                href="/private-dining"
                className="group relative flex min-h-[7.5rem] flex-col justify-between overflow-hidden border border-hairline bg-paper px-7 py-6 text-ink transition-colors duration-500 hover:border-ink"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Gatherings
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="font-display text-[1.65rem] leading-none">
                  Private events
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="panel-lux mt-14 p-8 md:p-10"
            >
              <p className="text-eyebrow text-ink">Dress code</p>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
                {site.dressCode}
              </p>
              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-caps text-ink">{site.ageRequirement}</p>
                <p className="mt-3 text-[13px] text-ink-muted">
                  {site.serviceCharge}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[32rem] lg:min-h-[44rem]"
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

            <div className="relative h-full min-h-[32rem] overflow-hidden lg:absolute lg:inset-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[activeSlide].src}
                    alt={slides[activeSlide].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={activeSlide === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

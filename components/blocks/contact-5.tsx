"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

const slides = [
  { src: images.lounge, alt: "Knife dining room and bar" },
  { src: images.patio, alt: "Knife patio at night" },
  { src: images.mezze, alt: "Mezze trio at Knife" },
  { src: images.lamb, alt: "Lamb chops at Knife" },
];

export default function Contact5() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideDuration = 5200;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, slideDuration);
    return () => clearTimeout(timeout);
  }, [activeSlide]);

  return (
    <section className="relative min-h-[calc(100dvh-5.5rem)] w-full overflow-hidden bg-surface">
      <div className="grid min-h-[calc(100dvh-5.5rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-center section-x py-16 md:py-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-lg"
          >
            <p className="text-eyebrow text-ink">Contact</p>
            <h1 className="mt-5 font-display text-display-l text-ink">
              Visit Knife
            </h1>
            <p className="mt-6 max-w-[38ch] text-lead text-ink-muted">
              Hours, dress code, and a quiet line to the house.
            </p>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <p className="text-eyebrow text-ink-muted">Location</p>
                <p className="mt-4 font-display text-[1.75rem] leading-tight text-ink">
                  {site.address.line1}
                </p>
              </div>
              <div className="space-y-7">
                <div>
                  <p className="text-eyebrow text-ink-muted">Mail</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 block text-[15px] text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="text-eyebrow text-ink-muted">Phone</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="mt-3 block font-display text-[1.5rem] text-ink"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-3">
              <Link
                href="/reservations"
                className="group flex items-center justify-between bg-ink px-6 py-5 text-paper transition-opacity hover:opacity-90"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-paper/50">
                    Tonight
                  </p>
                  <p className="mt-1 font-display text-2xl leading-none">
                    Reserve a table
                  </p>
                </div>
                <span
                  aria-hidden
                  className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-1"
                >
                  ›
                </span>
              </Link>
              <Link
                href="/private-dining"
                className="group flex items-center justify-between border border-ink/15 bg-paper px-6 py-5 text-ink transition-colors hover:border-ink"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Gatherings
                  </p>
                  <p className="mt-1 font-display text-2xl leading-none">
                    Private events
                  </p>
                </div>
                <span
                  aria-hidden
                  className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-1"
                >
                  ›
                </span>
              </Link>
            </div>

            <div className="mt-12 border-t border-hairline pt-8">
              <p className="text-eyebrow text-ink">Dress code</p>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-muted">
                {site.dressCode}
              </p>
              <p className="mt-6 text-caps text-ink">{site.ageRequirement}</p>
              <p className="mt-2 text-[13px] text-ink-muted">
                {site.serviceCharge}
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full">
          <div className="absolute right-6 top-6 z-10 flex gap-2 sm:right-8 sm:top-8">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className="h-px w-8 overflow-hidden bg-paper/35"
              >
                {index < activeSlide ? (
                  <span className="block h-full w-full bg-paper" />
                ) : index === activeSlide ? (
                  <motion.span
                    key={`p-${activeSlide}`}
                    className="block h-full bg-paper"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: slideDuration / 1000,
                      ease: "linear",
                    }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <AnimatePresence initial={false}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[activeSlide].src}
                alt={slides[activeSlide].alt}
                fill
                priority={activeSlide === 0}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

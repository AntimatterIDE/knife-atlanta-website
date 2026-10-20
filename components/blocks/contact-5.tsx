"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";
import { images as knifeImages } from "@/lib/images";

export default function Contact5() {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    knifeImages.lounge,
    knifeImages.patio,
    knifeImages.mezze,
    knifeImages.lamb,
  ];

  const slideDuration = 5000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, slideDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeSlide, images.length, slideDuration]);

  return (
    <section className="w-full bg-[#FBF9F4] px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-12 lg:mb-20"
            >
              <h3 className="sr-only">{site.name}</h3>
              <LogoMark heightClass="h-7 w-auto md:h-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-12 lg:mb-16"
            >
              <h1 className="mb-6 font-display text-4xl font-normal leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Visit
                <br />
                our house.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-neutral-600">
                Hours, dress code, and a quiet line for tables, private evenings,
                and everything in between.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-12 grid gap-8 sm:grid-cols-2 lg:mb-16"
            >
              <div>
                <p className="mb-2 text-sm text-neutral-400">Location</p>
                <p className="text-base text-neutral-900">
                  {site.address.line1}
                  <br />
                  United States
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm text-neutral-400">Mail</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-base text-neutral-900 transition-colors hover:text-neutral-600"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-sm text-neutral-400">Phone</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="text-base text-neutral-900 transition-colors hover:text-neutral-600"
                  >
                    {site.phone}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Link
                href="/reservations"
                className="group flex items-center justify-between rounded-2xl bg-neutral-900 p-6 transition-transform hover:scale-[1.02]"
              >
                <div>
                  <p className="mb-1 text-sm text-neutral-400">Tonight</p>
                  <p className="text-lg font-medium text-white">
                    Reserve a table
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 transition-colors group-hover:border-neutral-500">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
              </Link>

              <Link
                href="/private-dining"
                className="group flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg"
              >
                <div>
                  <p className="text-lg font-medium text-neutral-900">
                    Private events
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 transition-colors group-hover:border-neutral-400">
                  <ArrowRight className="h-5 w-5 text-neutral-900" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <p className="mb-3 text-sm text-neutral-400">Dress code</p>
              <p className="text-sm leading-relaxed text-neutral-600">
                {site.dressCode}
              </p>
              <p className="mt-5 text-sm font-medium text-neutral-900">
                {site.ageRequirement}
              </p>
              <p className="mt-2 text-xs text-neutral-500">{site.serviceCharge}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[28rem] lg:min-h-full"
          >
            <div className="absolute right-6 top-6 z-10 flex gap-2 sm:right-8 sm:top-8">
              {images.map((_, index) => (
                <div
                  key={index}
                  className="h-0.5 w-6 overflow-hidden rounded-full bg-neutral-900/30 backdrop-blur-sm sm:w-8"
                >
                  {index < activeSlide ? (
                    <div className="h-full w-full bg-neutral-900" />
                  ) : index === activeSlide ? (
                    <motion.div
                      key={`progress-${activeSlide}-${index}`}
                      className="h-full bg-neutral-900"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: slideDuration / 1000,
                        ease: "linear",
                      }}
                      style={{ willChange: "width" }}
                    />
                  ) : (
                    <div className="h-full w-0 bg-neutral-900" />
                  )}
                </div>
              ))}
            </div>

            <div className="relative h-full min-h-[28rem] overflow-hidden rounded-3xl border border-neutral-200/50 lg:absolute lg:inset-0 lg:min-h-0">
              <AnimatePresence initial={false} custom={activeSlide}>
                <motion.img
                  key={activeSlide}
                  src={images[activeSlide]}
                  alt={`Knife ${activeSlide + 1}`}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

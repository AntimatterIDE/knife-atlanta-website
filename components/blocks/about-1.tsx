"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { images } from "@/lib/images";

interface Dish {
  id: number;
  name: string;
  role: string;
  image: string;
  price: string;
}

const DISHES: Dish[] = [
  {
    id: 1,
    name: "Meze Trio",
    role: "Hummus, muhammara, labneh — lavash",
    image: images.mezze,
    price: "$18",
  },
  {
    id: 2,
    name: "Lamb Chops",
    role: "Charcoal-grilled with orzo and asparagus",
    image: images.lamb,
    price: "$52",
  },
  {
    id: 3,
    name: "Filet Kebab",
    role: "Tenderloin, lemon, garlic, tzatziki",
    image: images.kebab,
    price: "$36",
  },
  {
    id: 4,
    name: "Lamb Shank",
    role: "Braised until the evening softens",
    image: images.shank,
    price: "$48",
  },
  {
    id: 5,
    name: "Shrimp of the House",
    role: "From the grille, finished at the table",
    image: images.shrimp,
    price: "$34",
  },
];

const CAROUSEL_CONFIG = {
  autoPlayInterval: 5500,
  animationDuration: 0.55,
  layoutDuration: 1.6,
  paddingDuration: 0.9,
  easing: [0.22, 1, 0.36, 1] as const,
};

const CAROUSEL_HEIGHT = 480;

export default function About1({
  displayProgressIndicators = true,
}: { displayProgressIndicators?: boolean } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DISHES.length);
    }, CAROUSEL_CONFIG.autoPlayInterval);
    return () => clearInterval(interval);
  }, [resetKey]);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    setResetKey((prev) => prev + 1);
  };

  const visible = [
    DISHES[activeIndex],
    DISHES[(activeIndex + 1) % DISHES.length],
    DISHES[(activeIndex + 2) % DISHES.length],
  ];

  return (
    <section
      aria-labelledby="kitchen-title"
      className="w-full bg-surface section-y section-x"
    >
      <div className="container-lux mx-auto w-full">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-3">
            <div className="space-y-5">
              {DISHES.map((dish, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => handleIndexChange(index)}
                    className="group flex w-full items-center gap-3 text-left"
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive ? "bg-ink" : "bg-ink/25 group-hover:bg-ink/50"
                      }`}
                    />
                    <span
                      className={`text-sm tracking-wide ${
                        isActive
                          ? "font-medium text-ink"
                          : "text-ink-muted group-hover:text-ink"
                      }`}
                    >
                      {dish.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-9">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-eyebrow text-ink">From the kitchen</p>
                <h2
                  id="kitchen-title"
                  className="mt-4 font-display text-display-m text-ink"
                >
                  Begin at the table
                </h2>
              </div>
              <Link href="/menu" className="link-lux text-caps text-ink">
                Full menu <span aria-hidden="true">›</span>
              </Link>
            </div>

            <div
              className="relative w-full overflow-hidden"
              style={{ height: CAROUSEL_HEIGHT }}
            >
              <div className="flex h-full gap-5">
                <AnimatePresence mode="sync" initial={false}>
                  {visible.map((dish, position) => (
                    <CarouselCard
                      key={dish.id}
                      dish={dish}
                      position={position}
                    />
                  ))}
                </AnimatePresence>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-gradient-to-l from-surface to-transparent lg:block" />
            </div>

            {displayProgressIndicators ? (
              <div className="mt-8 flex items-center gap-2">
                {DISHES.map((_, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleIndexChange(index)}
                      className="group relative h-px flex-1 overflow-hidden bg-hairline"
                      aria-label={`Show ${DISHES[index].name}`}
                    >
                      <motion.div
                        className="absolute inset-0 origin-left bg-ink"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{
                          duration: isActive
                            ? CAROUSEL_CONFIG.autoPlayInterval / 1000
                            : 0.35,
                          ease: isActive ? "linear" : "easeOut",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselCard({ dish, position }: { dish: Dish; position: number }) {
  const isActive = position === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: -80,
        transition: { duration: CAROUSEL_CONFIG.animationDuration },
      }}
      transition={{
        duration: CAROUSEL_CONFIG.animationDuration,
        ease: CAROUSEL_CONFIG.easing,
        layout: {
          duration: CAROUSEL_CONFIG.layoutDuration,
          ease: CAROUSEL_CONFIG.easing,
        },
      }}
      className="h-full w-[260px] shrink-0 sm:w-[320px] md:w-[400px]"
    >
      <motion.div
        className="relative h-full w-full overflow-hidden bg-surface-2"
        animate={{ padding: isActive ? 0 : 48 }}
        transition={{ duration: CAROUSEL_CONFIG.paddingDuration }}
      >
        <div className="relative h-full w-full">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110C]/75 via-[#14110C]/15 to-transparent" />
          <div
            className={`absolute inset-x-0 bottom-0 ${
              isActive ? "p-6 md:p-8" : "p-4"
            }`}
          >
            <h3
              className={`font-display text-paper ${
                isActive
                  ? "text-2xl md:text-3xl"
                  : "text-lg md:text-xl"
              }`}
            >
              {dish.name}
            </h3>
            <p
              className={`mt-1 text-paper/75 ${
                isActive ? "text-sm md:text-base" : "text-xs"
              }`}
            >
              {dish.role}
            </p>
            {isActive ? (
              <p className="mt-4 text-caps text-paper/80">{dish.price}</p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

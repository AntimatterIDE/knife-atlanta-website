"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import FadeUp from "@/components/FadeUp";
import { images } from "@/lib/images";
import { menu, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const categoryImages: Record<
  string,
  { src: string; alt: string; caption: string }
> = {
  appetizers: {
    src: images.mezze,
    alt: "Mezze trio",
    caption: "Mezze and shared plates",
  },
  salads: {
    src: images.patio,
    alt: "Evening patio",
    caption: "Bright and composed",
  },
  entrees: {
    src: images.lamb,
    alt: "Lamb chops",
    caption: "Charcoal and coastal",
  },
  pastas: {
    src: images.shrimp,
    alt: "Shrimp of the house",
    caption: "Coastal pastas",
  },
  kebabs: {
    src: images.kebab,
    alt: "Filet kebab",
    caption: "Over the grill",
  },
  desserts: {
    src: images.cuisine,
    alt: "Bone-in ribeye",
    caption: "A sweet close",
  },
};

const featuredImages: Record<string, string> = {
  "Meze Trio": images.mezze,
  "Lamb Chops": images.lamb,
  "Lamb Shank": images.shank,
  "Filet Kebab": images.kebab,
  "Bone-in Ribeye (20 oz)": images.cuisine,
  "Shrimp Kebab": images.shrimp,
  "Chef's Plate for Two": images.kebab,
};

export default function MenuPage() {
  const categories = menu.categories;
  const [openId, setOpenId] = useState(categories[0]?.id ?? "");
  const open = categories.find((c) => c.id === openId) ?? categories[0];
  const hero = open ? categoryImages[open.id] : null;

  return (
    <div className="bg-surface pt-[88px]">
      <section aria-labelledby="menu-title" className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-ink">Menu</p>
          <h1
            id="menu-title"
            className="mt-6 font-display text-display-l text-ink"
          >
            The table
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ink-muted">
            Modern Mediterranean — mezze, charcoal, pasta, and kebabs.
          </p>
        </FadeUp>

        <div className="container-lux mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <FadeUp className="relative hidden min-h-[70vh] overflow-hidden lg:block">
            <AnimatePresence mode="wait">
              {hero ? (
                <motion.div
                  key={hero.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent p-8">
                    <p className="text-eyebrow text-[#FBF9F4]">{hero.caption}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </FadeUp>

          <div className="min-w-0">
            <ul className="border-t border-hairline">
              {categories.map((cat) => {
                const isOpen = cat.id === openId;
                const thumb = categoryImages[cat.id];

                return (
                  <li key={cat.id} className="border-b border-hairline">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? "" : cat.id)}
                      className="group flex w-full items-center gap-5 py-6 text-left transition-colors duration-500 hover:text-ink"
                    >
                      {thumb ? (
                        <span className="relative hidden h-14 w-14 shrink-0 overflow-hidden sm:block">
                          <Image
                            src={thumb.src}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="56px"
                          />
                        </span>
                      ) : null}
                      <span className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                        <span
                          className={cn(
                            "font-display text-[1.65rem] leading-[1.15] md:text-[2rem]",
                            isOpen ? "text-ink" : "text-ink-muted"
                          )}
                        >
                          {cat.label}
                        </span>
                        <span className="text-caps text-ink-muted">
                          {String(cat.items.length).padStart(2, "0")}
                          <span className="mx-2 opacity-40">/</span>
                          {isOpen ? "Close" : "Open"}
                        </span>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key={`${cat.id}-panel`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-10">
                            {cat.intro ? (
                              <p className="mb-8 max-w-[46ch] text-ink-muted">
                                {cat.intro}
                              </p>
                            ) : null}

                            {thumb ? (
                              <div className="relative mb-10 aspect-[16/10] overflow-hidden lg:hidden">
                                <Image
                                  src={thumb.src}
                                  alt={thumb.alt}
                                  fill
                                  className="object-cover"
                                  sizes="100vw"
                                />
                              </div>
                            ) : null}

                            <ul>
                              {cat.items.map((item) => {
                                const dishImage = featuredImages[item.name];
                                return (
                                  <li
                                    key={item.name}
                                    className="grid gap-4 border-b border-hairline py-6 last:border-0 md:grid-cols-[1fr_auto] md:items-start"
                                  >
                                    <div className="flex gap-4">
                                      {dishImage ? (
                                        <span className="relative mt-1 hidden h-16 w-16 shrink-0 overflow-hidden sm:block">
                                          <Image
                                            src={dishImage}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                          />
                                        </span>
                                      ) : null}
                                      <div>
                                        <h2 className="font-display text-[1.35rem] leading-[1.2] text-ink md:text-[1.5rem]">
                                          {item.name}
                                        </h2>
                                        {item.desc ? (
                                          <p className="mt-2 max-w-[48ch] text-[15px] text-ink-muted">
                                            {item.desc}
                                          </p>
                                        ) : null}
                                      </div>
                                    </div>
                                    <p className="text-ink-muted md:pt-1">
                                      {item.price === "MP"
                                        ? "MP"
                                        : `$${item.price}`}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <p className="mt-12 text-[13px] text-ink-muted">
              {site.serviceCharge}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

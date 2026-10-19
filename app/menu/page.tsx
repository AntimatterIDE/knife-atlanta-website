"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import FadeUp from "@/components/FadeUp";
import { images } from "@/lib/images";
import { menu, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const categoryImages: Record<string, { src: string; alt: string }> = {
  appetizers: { src: images.mezze, alt: "Mezze trio" },
  salads: { src: images.patio, alt: "Evening patio" },
  entrees: { src: images.lamb, alt: "Lamb chops" },
  pastas: { src: images.shrimp, alt: "Shrimp of the house" },
  kebabs: { src: images.kebab, alt: "Filet kebab" },
  desserts: { src: images.cuisine, alt: "Bone-in ribeye" },
};

const featuredImages: Record<string, string> = {
  "Meze Trio": images.mezze,
  "Lamb Chops": images.lamb,
  "Lamb Shank": images.shank,
  "Filet Kebab": images.kebab,
  "Bone-in Ribeye (20 oz)": images.cuisine,
  "Shrimp Kebab": images.shrimp,
  "Chef's Plate for Two": images.kebab,
  "Lobster Mac & Cheese": images.shrimp,
};

export default function MenuPage() {
  const categories = menu.categories;
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(cat.id);
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [categories]);

  function scrollTo(id: string) {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-surface">
      <section className="relative min-h-[52vh] overflow-hidden md:min-h-[58vh]">
        <Image
          src={images.cuisine}
          alt="Cuisine at Knife"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#14110C]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-[#14110C]/25 to-transparent" />
        <div className="relative z-10 flex min-h-[52vh] flex-col justify-end section-x pb-14 pt-[100px] md:min-h-[58vh] md:pb-20">
          <FadeUp className="container-lux max-w-3xl">
            <p className="text-eyebrow text-dusk/80">Menu</p>
            <h1 className="mt-5 font-display text-display-l text-dusk">
              The table
            </h1>
            <p className="mt-5 max-w-md text-lead text-dusk/80">
              Mezze, charcoal, pasta, and kebabs — plated for sharing.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="sticky top-[72px] z-30 border-b border-hairline bg-surface/95 backdrop-blur-md md:top-[88px]">
        <nav
          aria-label="Menu categories"
          className="container-lux section-x flex gap-1 overflow-x-auto py-4 scrollbar-none"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollTo(cat.id)}
              className={cn(
                "shrink-0 px-4 py-2 text-caps transition-colors duration-400",
                active === cat.id
                  ? "bg-ink text-paper"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="section-x pb-24 pt-6 md:pb-32 md:pt-10">
        <div className="container-lux mx-auto max-w-3xl">
          {categories.map((cat, index) => {
            const visual = categoryImages[cat.id];
            return (
              <section
                key={cat.id}
                id={cat.id}
                ref={(el) => {
                  sectionRefs.current[cat.id] = el;
                }}
                className={cn(
                  "scroll-mt-[140px] md:scroll-mt-[160px]",
                  index > 0 && "mt-20 border-t border-hairline pt-20 md:mt-28 md:pt-28"
                )}
              >
                <FadeUp>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-eyebrow text-ink-muted">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-3 font-display text-display-m text-ink">
                        {cat.label}
                      </h2>
                      {cat.intro ? (
                        <p className="mt-4 max-w-[42ch] text-ink-muted">
                          {cat.intro}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {visual ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="relative mt-10 aspect-[16/9] w-full overflow-hidden md:aspect-[2/1]"
                    >
                      <Image
                        src={visual.src}
                        alt={visual.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </motion.div>
                  ) : null}

                  <ul className="mt-10">
                    {cat.items.map((item) => {
                      const dishImage = featuredImages[item.name];
                      return (
                        <li
                          key={item.name}
                          className="grid gap-3 border-b border-hairline py-7 last:border-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                        >
                          <div className="flex gap-4">
                            {dishImage ? (
                              <span className="relative mt-0.5 hidden h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden sm:block">
                                <Image
                                  src={dishImage}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="72px"
                                />
                              </span>
                            ) : null}
                            <div>
                              <h3 className="font-display text-[1.4rem] leading-[1.2] text-ink md:text-[1.55rem]">
                                {item.name}
                              </h3>
                              {item.desc ? (
                                <p className="mt-2 max-w-[48ch] text-[15px] text-ink-muted">
                                  {item.desc}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <p className="text-caps text-ink-muted sm:text-right">
                            {item.price === "MP" ? "MP" : `$${item.price}`}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </FadeUp>
              </section>
            );
          })}

          <div className="mt-20 border-t border-hairline pt-12 text-center md:mt-28">
            <p className="text-[13px] text-ink-muted">{site.serviceCharge}</p>
            <p className="mt-3 text-[13px] text-ink-muted">
              {site.ageRequirement}
            </p>
            <Link
              href="/reservations"
              className="btn-border mt-10 inline-flex"
            >
              Reserve a table
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

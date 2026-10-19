"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import Section from "@/components/Section";
import { menu } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const categories = menu.categories;
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <Section className="mx-auto max-w-5xl">
      <FadeUp className="text-center">
        <p className="text-caption text-knife-gold">The Menu</p>
        <h1 className="mt-4 font-display text-headline text-knife-cream">
          Knife
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-knife-mist">
          Dry-aged beef, live-fire cooking, and a cellar built for steak.
        </p>
      </FadeUp>

      <div className="mt-12 flex flex-wrap justify-center gap-2 border-b border-knife-ash/60 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={cn(
              "px-4 py-2 text-caption transition-colors",
              active === cat.id
                ? "text-knife-gold"
                : "text-knife-mist hover:text-knife-cream"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {current && (
        <FadeUp key={current.id} className="mt-10">
          <p className="text-center text-knife-mist">{current.intro}</p>
          <ul className="mt-8 divide-y divide-knife-ash/70">
            {current.items.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <h2 className="font-display text-2xl text-knife-cream">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-knife-mist">{item.desc}</p>
                </div>
                <p className="font-display text-xl text-knife-gold">${item.price}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      )}
    </Section>
  );
}

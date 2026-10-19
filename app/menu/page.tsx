"use client";

import { useState } from "react";
import FadeUp from "@/components/FadeUp";
import { menu } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function MenuPage() {
  const categories = menu.categories;
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const current = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <div className="bg-surface pt-[88px]">
      <section className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-4xl text-center">
          <p className="text-eyebrow text-terracotta">Menu</p>
          <h1 className="mt-5 font-display text-display-l text-ink">Knife</h1>
          <p className="mx-auto mt-5 max-w-xl text-ink-muted">
            Modern Mediterranean — mezze, charcoal, pasta, and kebabs.
          </p>
        </FadeUp>

        <div className="container-lux mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2 border-b border-hairline pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                "px-4 py-2 text-caps transition-colors",
                active === cat.id
                  ? "text-terracotta"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {current && (
          <FadeUp key={current.id} className="container-lux mx-auto mt-12 max-w-3xl">
            <p className="text-center text-ink-muted">{current.intro}</p>
            <ul className="mt-10">
              {current.items.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-2 border-b border-hairline py-7 md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink">{item.name}</h2>
                    {item.desc ? (
                      <p className="mt-2 text-ink-muted">{item.desc}</p>
                    ) : null}
                  </div>
                  <p className="font-display text-xl text-terracotta">
                    {item.price === "MP" ? "MP" : `$${item.price}`}
                  </p>
                </li>
              ))}
            </ul>
          </FadeUp>
        )}
      </section>
    </div>
  );
}

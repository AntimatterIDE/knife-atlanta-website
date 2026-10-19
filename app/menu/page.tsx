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
      <section aria-labelledby="menu-title" className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-ink">Menu</p>
          <h1
            id="menu-title"
            className="mt-6 font-display text-display-l text-ink"
          >
            Knife
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-ink-muted">
            Modern Mediterranean — mezze, charcoal, pasta, and kebabs.
          </p>
        </FadeUp>

        <div className="container-lux mx-auto mt-16 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 border-b border-hairline pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                "min-h-11 text-caps transition-colors duration-500",
                active === cat.id
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {current && (
          <FadeUp key={current.id} className="container-lux mx-auto mt-14 max-w-2xl">
            {current.intro ? (
              <p className="text-center text-ink-muted">{current.intro}</p>
            ) : null}
            <ul className="mt-12">
              {current.items.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-2 border-b border-hairline py-8 md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <div>
                    <h2 className="font-display text-[1.75rem] leading-[1.15] text-ink">
                      {item.name}
                    </h2>
                    {item.desc ? (
                      <p className="mt-2 max-w-[52ch] text-ink-muted">
                        {item.desc}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-ink-muted">
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

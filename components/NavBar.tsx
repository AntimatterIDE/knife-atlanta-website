"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[400ms]",
        solid
          ? "border-b border-hairline bg-surface/92 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-lux section-x flex h-[72px] items-center justify-between md:h-[88px]">
        <Link
          href="/"
          className={cn(
            "font-display text-[1.35rem] tracking-[0.04em] md:text-[1.5rem]",
            solid ? "text-ink" : "text-paper"
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-lux text-caps",
                solid ? "text-ink" : "text-paper"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.reservationUrl}
            className={cn(
              "link-lux text-caps",
              solid ? "text-terracotta" : "text-paper"
            )}
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          className={cn("text-caps lg:hidden", solid ? "text-ink" : "text-paper")}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-surface lg:hidden">
          <nav className="flex flex-col gap-6 px-6 py-10">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-display-m text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={site.reservationUrl}
              className="btn-terra mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Reserve a Table
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

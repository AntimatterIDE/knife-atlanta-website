"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease",
        solid
          ? "border-b border-hairline bg-surface/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-lux section-x flex h-[72px] items-center justify-between md:h-[88px]">
        <Link
          href="/"
          className={cn(
            "font-display text-[1.25rem] tracking-[0.02em] md:text-[1.5rem]",
            solid || open ? "text-ink" : "text-paper"
          )}
          onClick={() => setOpen(false)}
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
              solid ? "text-ink" : "text-paper"
            )}
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          className={cn(
            "min-h-11 min-w-11 text-caps lg:hidden",
            solid || open ? "text-ink" : "text-paper"
          )}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 bg-surface md:top-[88px] lg:hidden">
          <nav className="flex h-full flex-col items-center justify-center gap-10 px-8">
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
              className="link-lux text-caps text-ink"
              onClick={() => setOpen(false)}
            >
              Reserve ›
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

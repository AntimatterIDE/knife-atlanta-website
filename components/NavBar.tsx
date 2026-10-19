"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-knife-ash/50 bg-knife-black/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 sm:h-[4.5rem] sm:px-6 lg:px-10">
        <Link
          href="/"
          className="font-display text-[1.65rem] tracking-[0.14em] text-knife-cream sm:text-2xl"
        >
          {site.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-caption text-knife-cream/75 hover:text-knife-cream"
            >
              {item.label}
            </Link>
          ))}
          <Button href={site.reservationUrl} className="ml-2">
            Reserve
          </Button>
        </nav>

        <button
          type="button"
          className="text-caption text-knife-cream lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-knife-ash/50 bg-knife-black lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-5 px-5 py-8">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-3xl text-knife-cream"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href={site.reservationUrl} className="mt-2 w-full">
            Reserve a Table
          </Button>
        </nav>
      </div>
    </header>
  );
}

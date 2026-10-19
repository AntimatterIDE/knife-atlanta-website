"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-knife-ash/60 bg-knife-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.08em] text-knife-cream"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline text-caption text-knife-cream/80 hover:text-knife-gold"
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
          className="text-caption text-knife-cream md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-knife-ash/60 bg-knife-black md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-4 px-4 py-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-subtitle text-knife-cream"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button href={site.reservationUrl}>Reserve a Table</Button>
        </nav>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Solid on interior pages, or after scrolling past the home hero
  const solid = !isHome || scrolled || open;
  const light = !solid;

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
            light
              ? "text-[#FBF9F4] [text-shadow:0_1px_18px_rgba(0,0,0,0.55)]"
              : "text-ink"
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
                light
                  ? "text-[#FBF9F4] [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]"
                  : "text-ink",
                pathname === item.href && !light && "opacity-100",
                pathname === item.href && light && "opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            className={cn(
              "link-lux text-caps",
              light
                ? "text-[#FBF9F4] [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]"
                : "text-ink"
            )}
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          className={cn(
            "min-h-11 min-w-11 text-caps lg:hidden",
            light
              ? "text-[#FBF9F4] [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]"
              : "text-ink"
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
              href="/reservations"
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

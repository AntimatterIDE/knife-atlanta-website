"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { images } from "@/lib/images";

interface ContentItem {
  id: number;
  type: "image" | "text";
  content: string;
  alt?: string;
  row: 1 | 2;
  size: "small" | "medium" | "large";
}

const CONTENT_ITEMS: ContentItem[] = [
  {
    id: 1,
    type: "image",
    content: images.mezze,
    alt: "Mezze trio",
    row: 1,
    size: "large",
  },
  {
    id: 2,
    type: "image",
    content: images.lamb,
    alt: "Lamb chops",
    row: 1,
    size: "medium",
  },
  {
    id: 3,
    type: "image",
    content: images.lounge,
    alt: "Dining room",
    row: 1,
    size: "large",
  },
  {
    id: 4,
    type: "image",
    content: images.shrimp,
    alt: "Shrimp of the house",
    row: 1,
    size: "small",
  },
  {
    id: 5,
    type: "image",
    content: images.kebab,
    alt: "Filet kebab",
    row: 2,
    size: "medium",
  },
  {
    id: 6,
    type: "text",
    content: "Shared plates, charcoal heat.",
    row: 2,
    size: "large",
  },
  {
    id: 7,
    type: "image",
    content: images.patio,
    alt: "Evening patio",
    row: 2,
    size: "medium",
  },
  {
    id: 8,
    type: "image",
    content: images.cuisine,
    alt: "Bone-in ribeye",
    row: 2,
    size: "medium",
  },
];

const SIZES = {
  small: { width: "280px", height: "220px" },
  medium: { width: "420px", height: "220px" },
  large: { width: "560px", height: "220px" },
};

function ImageCard({ item }: { item: ContentItem }) {
  const dimensions = SIZES[item.size];
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden bg-surface-2"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <Image
        src={item.content}
        alt={item.alt ?? ""}
        fill
        className="object-cover"
        sizes="560px"
      />
    </div>
  );
}

function TextCard({ item }: { item: ContentItem }) {
  const dimensions = SIZES[item.size];
  return (
    <div
      className="flex flex-shrink-0 items-center justify-center bg-surface-2 px-10"
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <h3 className="max-w-[18ch] text-center font-display text-display-m text-ink leading-tight">
        {item.content}
      </h3>
    </div>
  );
}

export default function About5() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;
    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let rafId = 0;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      if (destroyed || !containerRef.current) return;

      lenis = new Lenis({
        wrapper: containerRef.current,
        content: containerRef.current.querySelector(
          ".scroll-content"
        ) as HTMLElement,
        orientation: "horizontal",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    void initLenis();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  const row1Items = CONTENT_ITEMS.filter((item) => item.row === 1);
  const row2Items = CONTENT_ITEMS.filter((item) => item.row === 2);
  const duplicatedRow1 = Array.from({ length: 8 }, () => row1Items).flat();
  const duplicatedRow2 = Array.from({ length: 8 }, () => row2Items).flat();

  return (
    <section
      ref={containerRef}
      aria-label="Kitchen gallery"
      className="relative h-[min(100vh,56rem)] w-full overflow-hidden bg-surface-2"
    >
      <div className="pointer-events-none absolute inset-x-0 top-10 z-10 section-x md:top-14">
        <div className="container-lux text-center">
          <p className="text-eyebrow text-ink">Cuisine</p>
          <p className="mt-4 font-display text-display-m text-ink">
            Through the kitchen
          </p>
        </div>
      </div>
      <div className="scroll-content flex h-full flex-col justify-center gap-6 py-24 md:gap-8">
        <div className="row-1 ml-0 flex gap-5 pl-6 md:gap-6 md:pl-8">
          {duplicatedRow1.map((item, index) =>
            item.type === "image" ? (
              <ImageCard key={`${item.id}-${index}`} item={item} />
            ) : (
              <TextCard key={`${item.id}-${index}`} item={item} />
            )
          )}
        </div>
        <div className="row-2 ml-16 flex gap-5 pl-6 md:ml-32 md:gap-6 md:pl-8">
          {duplicatedRow2.map((item, index) =>
            item.type === "image" ? (
              <ImageCard key={`${item.id}-${index}`} item={item} />
            ) : (
              <TextCard key={`${item.id}-${index}`} item={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

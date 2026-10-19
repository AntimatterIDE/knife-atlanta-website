"use client";

import dynamic from "next/dynamic";
import FadeUp from "@/components/FadeUp";
import { images } from "@/lib/images";

const PassageGallery = dynamic(
  () => import("@/components/react-bits/passage-gallery"),
  { ssr: false }
);

const galleryItems = [
  {
    src: images.lounge,
    alt: "Dining room and bar at Knife",
    title: "The room",
  },
  {
    src: images.mezze,
    alt: "Mezze trio with lavash",
    title: "Mezze",
  },
  {
    src: images.lamb,
    alt: "Grilled lamb chops",
    title: "Lamb chops",
  },
  {
    src: images.kebab,
    alt: "Filet kebab",
    title: "Filet kebab",
  },
  {
    src: images.shank,
    alt: "Braised lamb shank",
    title: "Lamb shank",
  },
  {
    src: images.shrimp,
    alt: "Shrimp of the house",
    title: "Shrimp",
  },
  {
    src: images.cuisine,
    alt: "Bone-in ribeye",
    title: "Ribeye",
  },
  {
    src: images.patio,
    alt: "Evening patio",
    title: "The patio",
  },
  {
    src: images.patioEvent,
    alt: "Patio gathering",
    title: "Gatherings",
  },
  {
    src: images.happyHour,
    alt: "Happy hour",
    title: "Happy hour",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-surface">
      <section className="section-x pt-[120px] pb-10 md:pt-[140px]">
        <FadeUp className="container-lux text-center">
          <p className="text-eyebrow text-ink">Gallery</p>
          <h1 className="mt-6 font-display text-display-l text-ink">
            Through the room
          </h1>
          <p className="mx-auto mt-5 max-w-md text-ink-muted">
            Scroll or drag to move through the tunnel. Click a frame to bring it
            forward.
          </p>
        </FadeUp>
      </section>

      <section className="h-[85vh] min-h-[520px] w-full md:h-screen">
        <PassageGallery
          items={galleryItems}
          backgroundColor="#14110C"
          colors={["#6E665A", "#D8D1C4"]}
          photoFill={0.55}
          accentFill={0.04}
          lineOpacity={0.1}
          speed={0.35}
          fog={0.85}
          blur={0.6}
          look={0.7}
          hover={0.8}
          captions
          focusOnClick
          ariaLabel="Knife photo tunnel. Scroll or drag to travel, click a photo to view it."
        >
          <span className="sr-only">Knife gallery</span>
        </PassageGallery>
      </section>
    </div>
  );
}

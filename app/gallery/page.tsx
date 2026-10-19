"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
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
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-dvh w-full overflow-hidden bg-[#14110C]">
      <PassageGallery
        className="h-full min-h-0"
        items={galleryItems}
        backgroundColor="#14110C"
        colors={["#6E665A", "#D8D1C4"]}
        photoFill={0.55}
        accentFill={0.04}
        lineOpacity={0.1}
        speed={0.4}
        fog={0.85}
        blur={0.5}
        look={0}
        hover={0}
        wheel={false}
        interactive={false}
        captions
        focusOnClick
        ariaLabel="Knife photo tunnel. Click a photo to view it."
      >
        <span className="sr-only">Knife gallery</span>
      </PassageGallery>
    </div>
  );
}

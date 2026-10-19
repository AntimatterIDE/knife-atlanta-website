import type { Metadata } from "next";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import Section from "@/components/Section";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A look inside ${site.name} — the room, the fire, the plate.`,
};

export default function GalleryPage() {
  return (
    <Section className="mx-auto max-w-7xl">
      <FadeUp className="text-center">
        <p className="text-caption text-knife-gold">Gallery</p>
        <h1 className="mt-4 font-display text-headline text-knife-cream">
          The room & the fire
        </h1>
      </FadeUp>

      <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.gallery.map((image, i) => (
          <FadeUp
            key={image.src}
            className={cn("mb-4 break-inside-avoid overflow-hidden", image.tall && "sm:mt-8")}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden",
                image.tall ? "aspect-[3/4]" : "aspect-[4/3]"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < 2}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

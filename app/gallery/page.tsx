import type { Metadata } from "next";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Inside ${site.fullName}.`,
};

export default function GalleryPage() {
  return (
    <div className="bg-surface pt-[88px]">
      <section aria-labelledby="gallery-title" className="section-y section-x">
        <FadeUp className="container-lux text-center">
          <p className="text-eyebrow text-ink">Gallery</p>
          <h1
            id="gallery-title"
            className="mt-6 font-display text-display-l text-ink"
          >
            The room & the plate
          </h1>
        </FadeUp>

        <div className="container-lux mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {images.gallery.map((image, i) => (
            <FadeUp
              key={image.src + i}
              className={cn(
                "overflow-hidden",
                image.tall && "lg:row-span-1"
              )}
            >
              <div
                className={cn(
                  "relative w-full",
                  image.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 2}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </div>
  );
}

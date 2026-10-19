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
      <section className="section-y section-x">
        <FadeUp className="container-lux text-center">
          <p className="text-eyebrow text-terracotta">Gallery</p>
          <h1 className="mt-5 font-display text-display-l text-ink">
            The room & the plate
          </h1>
        </FadeUp>

        <div className="container-lux mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.gallery.map((image, i) => (
            <FadeUp
              key={image.src + i}
              className={cn(
                "mb-4 break-inside-avoid overflow-hidden",
                image.tall && "sm:mt-6"
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

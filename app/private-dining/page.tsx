import type { Metadata } from "next";
import Image from "next/image";
import Contact7 from "@/components/blocks/contact-7";
import FadeUp from "@/components/FadeUp";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Events",
  description: `Private dining and large party reservations at ${site.fullName}.`,
};

export default function PrivateDiningPage() {
  return (
    <>
      <section
        aria-labelledby="events-hero"
        className="relative min-h-[55vh] overflow-hidden"
      >
        <Image
          src={images.patioEvent}
          alt="Private gathering on the patio"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="scrim-hero absolute inset-0" />
        <div className="relative z-10 flex min-h-[55vh] items-end section-x pb-16 md:pb-24">
          <FadeUp className="container-lux">
            <p className="text-eyebrow text-paper/80">Events</p>
            <h1
              id="events-hero"
              className="mt-5 font-display text-display-l text-paper"
            >
              Private dining
            </h1>
          </FadeUp>
        </div>
      </section>

      <Contact7 />
    </>
  );
}

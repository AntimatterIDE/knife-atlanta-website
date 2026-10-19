import type { Metadata } from "next";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import Section from "@/components/Section";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: `The story behind ${site.name} — Atlanta's modern steakhouse.`,
};

export default function StoryPage() {
  return (
    <Section className="mx-auto max-w-6xl">
      <FadeUp className="text-center">
        <p className="text-caption text-knife-gold">Our Story</p>
        <h1 className="mt-4 font-display text-headline text-knife-cream">
          Built for the cut
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-body-lg text-knife-mist">
          Knife began with a simple belief: great beef deserves patience, fire,
          and a room that lets the evening stretch.
        </p>
      </FadeUp>

      <div className="mt-16 grid items-center gap-10 md:grid-cols-2">
        <FadeUp className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={images.chef}
            alt="Chef at Knife Atlanta"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeUp>
        <FadeUp>
          <h2 className="font-display text-title text-knife-cream">
            Chef Johannes Schmidt
          </h2>
          <div className="gold-rule mt-5" />
          <p className="mt-6 text-knife-mist leading-relaxed">
            Raised around long tables and slow Sundays, Chef Schmidt brings a
            European sense of craft to American prime. At Knife, every steak is
            dry-aged in house, finished over live fire, and plated with the
            restraint of an editorial kitchen.
          </p>
          <p className="mt-4 text-knife-mist leading-relaxed">
            The dining room follows the same idea — dark timber, warm light, and
            space enough for conversation to settle between courses.
          </p>
        </FadeUp>
      </div>
    </Section>
  );
}

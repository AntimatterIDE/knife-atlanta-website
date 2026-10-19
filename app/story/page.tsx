import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `The house behind ${site.fullName}.`,
};

export default function StoryPage() {
  return (
    <div className="bg-surface pt-[88px]">
      <section aria-labelledby="about-title" className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-ink">About</p>
          <h1
            id="about-title"
            className="mt-6 font-display text-display-l text-ink"
          >
            Modern Mediterranean
          </h1>
        </FadeUp>
      </section>

      <section className="section-x pb-8">
        <FadeUp className="container-lux">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={images.lounge}
              alt="Knife dining room and bar"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </FadeUp>
      </section>

      <section className="section-y section-x">
        <FadeUp className="container-lux mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-20">
          <p className="text-ink-muted leading-relaxed">
            The story starts with the Mediterranean table — shared plates,
            charcoal heat, and rooms that invite the night to linger. At Knife,
            that instinct meets Atlanta&apos;s energy: chic, social, and never
            in a hurry.
          </p>
          <p className="text-ink-muted leading-relaxed">{site.philosophy}</p>
        </FadeUp>
      </section>

      <section
        aria-labelledby="craft-img-title"
        className="section-y section-x bg-surface-2"
      >
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.shank}
              alt="Braised lamb shank"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
          <FadeUp className="max-w-[46ch]">
            <p className="text-eyebrow text-ink">The kitchen</p>
            <h2
              id="craft-img-title"
              className="mt-6 font-display text-display-m text-ink"
            >
              Coastal plates, charcoal evenings.
            </h2>
            <p className="mt-6 text-ink-muted">
              Mezze to open, kebabs over heat, pasta and seafood for the longer
              table — food meant to be shared, not staged.
            </p>
          </FadeUp>
        </div>
      </section>

      <section
        aria-labelledby="philosophy-title"
        className="section-y section-x bg-surface"
      >
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p id="philosophy-title" className="text-eyebrow text-ink">
            Philosophy
          </p>
          <div className="mt-10 font-display text-display-m text-ink">
            <BlurHighlight
              blurAmount={5}
              inactiveOpacity={0.4}
              highlightColor="#1A1712"
              highlightedBits={["finer things", "unforgettable gatherings"]}
              viewportOptions={{ once: true, amount: 0.35 }}
            >
              Dining is atmosphere as much as flavor — coastal plates, crafted
              cocktails, and evenings that feel unhurried.
            </BlurHighlight>
          </div>
          <Link
            href={site.reservationUrl}
            className="btn-border mt-14"
          >
            Reserve a table
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}

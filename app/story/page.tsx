import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the house behind ${site.fullName}.`,
};

export default function StoryPage() {
  return (
    <div className="damask pt-[88px]">
      <section className="section-y section-x">
        <FadeUp className="container-lux text-center">
          <p className="text-eyebrow text-terracotta">About</p>
          <h1 className="mt-6 font-display text-display-l text-ink md:text-display-xl">
            Meet the team
          </h1>
        </FadeUp>
      </section>

      <section className="section-x pb-24">
        <FadeUp className="container-lux">
          <div className="paper-frame overflow-hidden">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={images.plated}
                alt="Service at Knife"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
            <div className="grid gap-10 px-6 py-12 md:grid-cols-2 md:gap-16 md:px-12 md:py-16">
              <p className="text-ink-muted leading-relaxed">
                The story starts with the Mediterranean table — shared plates,
                charcoal heat, and rooms that invite the night to linger. At
                Knife, that instinct meets Atlanta&apos;s energy: chic, social,
                and never in a hurry.
              </p>
              <p className="text-ink-muted leading-relaxed">
                {site.philosophy}
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="section-y section-x bg-surface">
        <div className="container-lux">
          <FadeUp className="flex items-center gap-6">
            <p className="text-eyebrow shrink-0 text-terracotta">Get to know us</p>
            <div className="rule-terra flex-1" />
          </FadeUp>
          <FadeUp>
            <h2 className="mt-6 font-display text-display-l uppercase tracking-[-0.02em] text-ink md:text-display-xl">
              Who are we
            </h2>
          </FadeUp>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((member) => (
              <FadeUp key={member.name}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <p className="mt-4 font-display text-2xl text-ink">{member.name}</p>
                <p className="mt-1 text-caps text-ink-muted">{member.role}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y section-x bg-surface-2">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-terracotta">Our philosophy</p>
          <div className="mt-8 font-display text-display-m text-ink">
            <BlurHighlight
              blurAmount={6}
              inactiveOpacity={0.3}
              highlightColor="#8c4a32"
              highlightedBits={["finer things", "unforgettable gatherings"]}
              viewportOptions={{ once: true, amount: 0.35 }}
            >
              We believe dining is an art of atmosphere as much as flavor —
              coastal plates, expertly crafted cocktails, and evenings that feel
              effortless.
            </BlurHighlight>
          </div>
          <Link href={site.reservationUrl} className="btn-terra mt-12">
            Reserve a Table
          </Link>
        </FadeUp>
      </section>
    </div>
  );
}

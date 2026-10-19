import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import HeroScale from "@/components/HeroScale";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import About10 from "@/components/blocks/about-10";
import About5 from "@/components/blocks/about-5";
import About1 from "@/components/blocks/about-1";
import Features8 from "@/components/blocks/features-8";
import Cta4 from "@/components/blocks/cta-4";
import Cta2 from "@/components/blocks/cta-2";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative h-screen w-full overflow-hidden"
      >
        <HeroScale>
          <Image
            src={images.hero}
            alt="The dining room at Knife Modern Mediterranean"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
        </HeroScale>
        <div className="scrim-hero absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 section-x pb-20 md:pb-28">
          <div className="container-lux">
            <p className="rise-lux text-eyebrow text-paper/80">Atlanta</p>
            <h1
              id="hero-title"
              className="rise-lux rise-lux-1 mt-5 font-display text-display-xl text-paper text-balance"
            >
              Knife
            </h1>
            <p className="rise-lux rise-lux-2 mt-5 max-w-md text-lead text-paper/90">
              Modern Mediterranean. A house for the evening.
            </p>
            <Link
              href="/reservations"
              className="rise-lux rise-lux-3 link-lux mt-10 text-caps text-paper"
            >
              Reserve a table <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="statement-title"
        className="section-y section-x bg-surface"
      >
        <FadeUp className="container-lux mx-auto max-w-[44rem] text-center">
          <p id="statement-title" className="text-eyebrow text-ink">
            Atmosphere
          </p>
          <div className="mt-12 font-display text-display-m text-ink md:text-display-l">
            <BlurHighlight
              blurAmount={5}
              inactiveOpacity={0.38}
              highlightColor="#1A1712"
              highlightedBits={[
                "modern Mediterranean",
                "chic sophistication",
              ]}
              viewportOptions={{ once: true, amount: 0.4 }}
            >
              {site.description}
            </BlurHighlight>
          </div>
        </FadeUp>
      </section>

      <About10 />
      <About5 />
      <About1 />
      <Features8 />

      <section
        aria-labelledby="editorial-title"
        className="relative min-h-screen w-full overflow-hidden"
      >
        <Image
          src={images.patio}
          alt="The patio at night"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="scrim-hero absolute inset-0" />
        <div className="relative z-10 flex min-h-screen items-end section-x pb-20 md:pb-28">
          <FadeUp className="container-lux max-w-2xl">
            <p className="text-eyebrow text-paper/80">The patio</p>
            <h2
              id="editorial-title"
              className="mt-5 font-display text-display-l text-paper text-balance"
            >
              A house on the evening air.
            </h2>
            <Link
              href="/gallery"
              className="link-lux mt-10 text-caps text-paper"
            >
              Enter the gallery <span aria-hidden="true">›</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <Cta4 />
      <Cta2 />
    </>
  );
}

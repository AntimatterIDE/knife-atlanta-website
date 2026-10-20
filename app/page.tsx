import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import HeroScale from "@/components/HeroScale";
import LogoMark from "@/components/LogoMark";
import About10 from "@/components/blocks/about-10";
import About1 from "@/components/blocks/about-1";
import Features8 from "@/components/blocks/features-8";
import Cta4 from "@/components/blocks/cta-4";
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
            <h1 id="hero-title" className="rise-lux rise-lux-1 mt-5">
              <LogoMark
                priority
                invert
                glow
                heightClass="h-14 w-auto md:h-20 lg:h-24"
              />
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

      {/* Dark statement */}
      <section
        aria-labelledby="statement-title"
        className="section-y section-x bg-night"
      >
        <FadeUp className="container-lux mx-auto max-w-[42rem] text-center">
          <p id="statement-title" className="text-eyebrow text-dusk-muted">
            Atmosphere
          </p>
          <p className="mt-12 font-display text-display-m text-dusk text-balance md:text-display-l">
            Step into{" "}
            <LogoMark
              decorative
              invert
              heightClass="mx-1 inline-block h-[0.85em] w-auto align-[-0.12em] md:h-[0.9em]"
            />
            , where the essence of{" "}
            <em className="italic">modern Mediterranean</em> cuisine harmonizes
            with an atmosphere that exudes{" "}
            <em className="italic">chic sophistication</em>.
          </p>
        </FadeUp>
      </section>

      <About10 />

      {/* Dark cuisine feature */}
      <section className="section-y section-x bg-night">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={images.mezze}
              alt="Mezze trio with lavash"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
          <FadeUp className="max-w-[40ch]">
            <p className="text-eyebrow text-dusk-muted">Cuisine</p>
            <h2 className="mt-6 font-display text-display-m text-dusk">
              Shared plates, charcoal heat.
            </h2>
            <p className="mt-6 text-dusk-muted">{site.philosophy}</p>
            <Link
              href="/menu"
              className="link-lux mt-10 text-caps text-dusk"
            >
              View the menu <span aria-hidden="true">›</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <About1 />

      {/* Dark pillars */}
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
        <div className="absolute inset-0 bg-[#14110C]/45" />
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

      {/* Dark reserve */}
      <section
        aria-labelledby="reserve-title"
        className="relative overflow-hidden bg-night-2 section-y section-x"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <Image
            src={images.lounge}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <FadeUp className="relative z-10 container-lux flex min-h-[50vh] flex-col items-start justify-center gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-eyebrow text-dusk-muted">Reservations</p>
            <h2
              id="reserve-title"
              className="mt-6 font-display text-display-l text-dusk text-balance"
            >
              Request a table
            </h2>
            <p className="mt-5 max-w-md text-dusk-muted">
              Intimate dinners and lively gatherings — reserved directly with
              the house.
            </p>
          </div>
          <Link href="/reservations" className="btn-border-light">
            Reserve
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

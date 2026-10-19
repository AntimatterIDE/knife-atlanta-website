import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import Parallax from "@/components/Parallax";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import { images } from "@/lib/images";
import { menu, site } from "@/lib/site";

export default function HomePage() {
  const featured = menu.categories[0]?.items.slice(0, 3) ?? [];

  return (
    <>
      <section className="relative flex min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Seared steak at Knife Atlanta"
            fill
            priority
            className="ken-burns object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="overlay-hero absolute inset-0 z-[1]" />
        <div className="grain" />

        <div className="relative z-10 flex w-full flex-col justify-end section-padding pb-16 pt-28 sm:pb-24 md:pb-28">
          <p className="rise-in text-caption text-knife-gold">
            Buckhead · {site.city}
          </p>
          <h1 className="rise-in rise-in-delay-1 mt-4 font-display text-display text-knife-cream">
            {site.name}
          </h1>
          <p className="rise-in rise-in-delay-2 mt-5 max-w-md text-subtitle text-knife-cream/90">
            {site.tagline}. Dry-aged beef over live fire.
          </p>
          <div className="rise-in rise-in-delay-3 mt-10 flex flex-wrap gap-4">
            <Button href={site.reservationUrl}>Reserve a Table</Button>
            <Button href="/menu" variant="ghost">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      <Section className="relative overflow-hidden bg-knife-charcoal">
        <div className="mx-auto grid max-w-[90rem] items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <FadeUp className="lg:col-span-5">
            <p className="text-caption text-knife-gold">The Ritual</p>
            <h2 className="mt-5 font-display text-headline text-knife-cream">
              Dry-aged.
              <br />
              Live fire.
            </h2>
            <div className="gold-rule mt-7" />
            <p className="mt-7 max-w-md text-body-lg text-knife-mist">
              House aging. Open flame. A Buckhead room built for evenings that
              refuse to rush.
            </p>
            <div className="mt-10">
              <Button href="/story" variant="ghost">
                Our Story
              </Button>
            </div>
          </FadeUp>

          <Parallax
            offset={60}
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:col-span-7 lg:aspect-[4/5]"
          >
            <Image
              src={images.steak}
              alt="Prime steak finished over live fire"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Parallax>
        </div>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-[90rem]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-caption text-knife-gold">From the grill</p>
              <h2 className="mt-4 font-display text-title text-knife-cream">
                Signature cuts
              </h2>
            </div>
            <Button href="/menu" variant="ghost">
              Full Menu
            </Button>
          </div>

          <div className="knife-divider mt-12" />

          <ul>
            {featured.map((item, i) => (
              <FadeUp key={item.name}>
                <li
                  className={`grid gap-3 py-9 md:grid-cols-[1fr_auto] md:items-baseline md:gap-10 ${
                    i < featured.length - 1 ? "border-b border-knife-ash/60" : ""
                  }`}
                >
                  <div>
                    <h3 className="font-display text-[2rem] text-knife-cream md:text-[2.35rem]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-knife-mist">{item.desc}</p>
                  </div>
                  <p className="font-display text-2xl text-knife-gold md:text-3xl">
                    ${item.price}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </FadeUp>
      </Section>

      <section className="relative min-h-[75vh] overflow-hidden">
        <Image
          src={images.dining}
          alt="Knife dining room"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="overlay-full absolute inset-0" />
        <div className="grain" />
        <div className="relative z-10 flex min-h-[75vh] items-center section-padding">
          <FadeUp className="max-w-xl">
            <p className="text-caption text-knife-gold">Private Dining</p>
            <h2 className="mt-5 font-display text-headline text-knife-cream">
              Rooms for the nights that matter.
            </h2>
            <p className="mt-6 text-body-lg text-knife-cream/85">
              Birthdays, board dinners, quiet celebrations — reserved spaces
              with the full Knife kitchen behind them.
            </p>
            <div className="mt-10">
              <Button href="/private-dining" variant="light">
                Plan an Event
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <Section className="bg-knife-smoke">
        <FadeUp className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-caption text-knife-gold">Tonight</p>
            <h2 className="mt-4 max-w-xl font-display text-headline text-knife-cream">
              Your table is waiting.
            </h2>
          </div>
          <Button href={site.reservationUrl}>Reserve on OpenTable</Button>
        </FadeUp>
      </Section>
    </>
  );
}

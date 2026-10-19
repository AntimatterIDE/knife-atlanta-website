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
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={images.hero}
          alt="Live-fire steak at Knife Atlanta"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="overlay-dark absolute inset-0" />
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end section-padding pb-20 md:pb-28">
          <FadeUp>
            <p className="text-caption text-knife-gold">{site.city}</p>
            <h1 className="mt-4 font-display text-display text-knife-cream">
              {site.name}
            </h1>
            <p className="mt-5 max-w-xl text-body-lg text-knife-cream/85">
              {site.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={site.reservationUrl}>Reserve a Table</Button>
              <Button href="/menu" variant="ghost">
                Explore the Menu
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      <Section className="bg-knife-charcoal">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <p className="text-caption text-knife-gold">The Cut</p>
            <h2 className="mt-4 font-display text-headline text-knife-cream">
              Dry-aged. Live fire.
              <br />
              Editorial dining.
            </h2>
            <div className="gold-rule mt-6" />
            <p className="mt-6 max-w-lg text-knife-mist text-body-lg">
              In Buckhead, Knife centers the ritual of great beef — house dry-aging,
              open flame, and a room built for unhurried evenings.
            </p>
            <div className="mt-8">
              <Button href="/story" variant="ghost">
                Our Story
              </Button>
            </div>
          </FadeUp>
          <Parallax offset={80} className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.steak}
              alt="Prime steak finished over live fire"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Parallax>
        </div>
      </Section>

      <Section>
        <FadeUp className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-caption text-knife-gold">From the Menu</p>
              <h2 className="mt-3 font-display text-title text-knife-cream">
                Signature steaks
              </h2>
            </div>
            <Button href="/menu" variant="ghost">
              Full Menu
            </Button>
          </div>
          <div className="knife-divider mt-10" />
          <ul className="mt-2 divide-y divide-knife-ash/70">
            {featured.map((item) => (
              <li
                key={item.name}
                className="flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-2xl text-knife-cream">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-knife-mist">{item.desc}</p>
                </div>
                <p className="font-display text-xl text-knife-gold">${item.price}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </Section>

      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src={images.dining}
          alt="Knife dining room"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="overlay-full absolute inset-0" />
        <div className="relative z-10 flex min-h-[70vh] items-center section-padding">
          <FadeUp className="max-w-2xl">
            <p className="text-caption text-knife-gold">Private Dining</p>
            <h2 className="mt-4 font-display text-headline text-knife-cream">
              Rooms for celebrations and quiet deals.
            </h2>
            <p className="mt-5 text-body-lg text-knife-cream/85">
              Intimate spaces for birthdays, board dinners, and evenings that
              deserve the full Knife treatment.
            </p>
            <div className="mt-8">
              <Button href="/private-dining">Plan an Event</Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

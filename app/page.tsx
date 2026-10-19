import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import HeroScale from "@/components/HeroScale";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import { images } from "@/lib/images";
import { menu, site } from "@/lib/site";

export default function HomePage() {
  const featured = [
    menu.categories.find((c) => c.id === "appetizers")?.items.find(
      (i) => i.name === "Meze Trio"
    ),
    menu.categories.find((c) => c.id === "entrees")?.items.find(
      (i) => i.name === "Lamb Chops"
    ),
    menu.categories.find((c) => c.id === "kebabs")?.items.find(
      (i) => i.name === "Filet Kebab"
    ),
  ].filter(Boolean);

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
              href={site.reservationUrl}
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
        <FadeUp className="container-lux mx-auto max-w-[42rem] text-center">
          <p id="statement-title" className="text-eyebrow text-ink">
            The house
          </p>
          <div className="mt-12 font-display text-display-m text-ink md:text-display-l">
            <BlurHighlight
              blurAmount={5}
              inactiveOpacity={0.4}
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

      <section
        aria-labelledby="craft-title"
        className="section-y section-x bg-surface-2"
      >
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={images.mezze}
              alt="Mezze trio with lavash and olive oil"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
          <FadeUp className="max-w-[46ch]">
            <p className="text-eyebrow text-ink">Cuisine</p>
            <h2
              id="craft-title"
              className="mt-6 font-display text-display-m text-ink"
            >
              Shared plates, charcoal heat.
            </h2>
            <p className="mt-6 text-ink-muted">
              {site.philosophy}
            </p>
            <Link href="/menu" className="link-lux mt-10 text-caps text-ink">
              View the menu <span aria-hidden="true">›</span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <section
        aria-labelledby="lamb-title"
        className="section-y section-x bg-surface"
      >
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="order-2 max-w-[46ch] lg:order-1">
            <p className="text-eyebrow text-ink">From the kitchen</p>
            <h2
              id="lamb-title"
              className="mt-6 font-display text-display-m text-ink"
            >
              Lamb chops
            </h2>
            <p className="mt-6 text-ink-muted">
              Charcoal-grilled chops with orzo rice, asparagus, and a quiet
              reduction — plated for the table, not the photograph.
            </p>
            <p className="mt-8 text-ink-muted">$52</p>
            <Link
              href={site.reservationUrl}
              className="link-lux mt-10 text-caps text-ink"
            >
              Enquire <span aria-hidden="true">›</span>
            </Link>
          </FadeUp>
          <FadeUp className="relative order-1 aspect-[4/5] w-full overflow-hidden lg:order-2">
            <Image
              src={images.lamb}
              alt="Grilled lamb chops at Knife"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
        </div>
      </section>

      <section
        aria-labelledby="kebab-title"
        className="section-y section-x bg-surface-2"
      >
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={images.kebab}
              alt="Filet kebab with tzatziki"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
          <FadeUp className="max-w-[46ch]">
            <p className="text-eyebrow text-ink">Kebabs</p>
            <h2
              id="kebab-title"
              className="mt-6 font-display text-display-m text-ink"
            >
              Filet kebab
            </h2>
            <p className="mt-6 text-ink-muted">
              Charcoal-grilled tenderloin with lemon, garlic and herbs —
              served with signature orzo rice and tzatziki.
            </p>
            <p className="mt-8 text-ink-muted">$36</p>
          </FadeUp>
        </div>
      </section>

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
          </FadeUp>
        </div>
      </section>

      <section
        aria-labelledby="menu-preview-title"
        className="section-y section-x bg-surface"
      >
        <FadeUp className="container-lux">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow text-ink">Menu</p>
              <h2
                id="menu-preview-title"
                className="mt-5 font-display text-display-m text-ink"
              >
                Begin at the table
              </h2>
            </div>
            <Link href="/menu" className="link-lux text-caps text-ink">
              Full menu <span aria-hidden="true">›</span>
            </Link>
          </div>
          <div className="hairline mt-14" />
          <ul>
            {featured.map((item) =>
              item ? (
                <li
                  key={item.name}
                  className="grid gap-2 border-b border-hairline py-10 md:grid-cols-[1fr_auto] md:items-baseline"
                >
                  <div>
                    <h3 className="font-display text-[1.75rem] leading-[1.15] text-ink md:text-[2rem]">
                      {item.name}
                    </h3>
                    {item.desc ? (
                      <p className="mt-3 max-w-xl text-ink-muted">{item.desc}</p>
                    ) : null}
                  </div>
                  <p className="text-ink-muted">
                    {item.price === "MP" ? "MP" : `$${item.price}`}
                  </p>
                </li>
              ) : null
            )}
          </ul>
        </FadeUp>
      </section>

      <section
        aria-labelledby="hours-title"
        className="section-y section-x bg-surface-2"
      >
        <div className="container-lux grid gap-16 md:grid-cols-2 md:gap-24">
          <FadeUp>
            <p className="text-eyebrow text-ink">Hours</p>
            <h2
              id="hours-title"
              className="mt-6 font-display text-display-m text-ink"
            >
              Dining room
            </h2>
            <ul className="mt-10 space-y-4">
              {site.hours.dining.map((row) => (
                <li
                  key={row.days}
                  className="flex justify-between gap-8 border-b border-hairline pb-4"
                >
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp>
            <p className="text-eyebrow text-ink">Bar</p>
            <h2 className="mt-6 font-display text-display-m text-ink">
              Later still
            </h2>
            <ul className="mt-10 space-y-4">
              {site.hours.bar.map((row) => (
                <li
                  key={row.days}
                  className="flex justify-between gap-8 border-b border-hairline pb-4"
                >
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <section
        aria-labelledby="reserve-title"
        className="section-y section-x bg-surface"
      >
        <FadeUp className="container-lux flex min-h-[50vh] flex-col items-start justify-center gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-eyebrow text-ink">Reservations</p>
            <h2
              id="reserve-title"
              className="mt-6 font-display text-display-l text-ink text-balance"
            >
              Request a table
            </h2>
            <p className="mt-5 max-w-md text-ink-muted">
              Intimate dinners and lively gatherings — reserved through
              OpenTable.
            </p>
          </div>
          <Link href={site.reservationUrl} className="btn-border">
            Reserve
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { BlurHighlight } from "@/components/react-bits/blur-highlight";
import { images } from "@/lib/images";
import { menu, site } from "@/lib/site";

export default function HomePage() {
  const featured = menu.categories[0]?.items.slice(0, 4) ?? [];

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={images.hero}
          alt="Modern Mediterranean cuisine at Knife Atlanta"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="scrim-hero absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 section-x pb-16 md:pb-24">
          <div className="container-lux">
            <p className="rise-lux text-eyebrow text-paper/80">Atlanta</p>
            <h1 className="rise-lux rise-lux-1 mt-4 font-display text-display-xl text-paper">
              {site.name}
            </h1>
            <p className="rise-lux rise-lux-2 mt-5 max-w-md text-lead text-paper/90">
              {site.tagline}. Chic evenings, coastal plates, and a room built for gathering.
            </p>
            <div className="rise-lux rise-lux-3 mt-10 flex flex-wrap gap-4">
              <Link href={site.reservationUrl} className="btn-border-light">
                Reserve a Table
              </Link>
              <Link href="/menu" className="link-lux text-caps text-paper">
                View Menu ›
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="damask section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-terracotta">The house</p>
          <div className="mt-10 font-display text-display-m text-ink md:text-display-l">
            <BlurHighlight
              blurAmount={6}
              inactiveOpacity={0.35}
              highlightColor="#8c4a32"
              highlightedBits={["modern Mediterranean", "chic sophistication"]}
              viewportOptions={{ once: true, amount: 0.4 }}
            >
              {site.description}
            </BlurHighlight>
          </div>
        </FadeUp>
      </section>

      <section className="section-y section-x bg-surface-2">
        <div className="container-lux grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeUp className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={images.mezze}
              alt="Mezze and Mediterranean shared plates"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeUp>
          <FadeUp>
            <p className="text-eyebrow text-terracotta">Cuisine</p>
            <h2 className="mt-5 font-display text-display-m text-ink">
              Modern Mediterranean, made for the table.
            </h2>
            <p className="mt-6 max-w-[46ch] text-ink-muted">
              {site.philosophy}
            </p>
            <Link href="/story" className="link-lux mt-10 text-caps text-ink">
              Get to know us ›
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="section-y section-x">
        <FadeUp className="container-lux">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow text-terracotta">From the menu</p>
              <h2 className="mt-4 font-display text-display-m text-ink">
                Begin with mezze
              </h2>
            </div>
            <Link href="/menu" className="link-lux text-caps text-ink">
              Full Menu ›
            </Link>
          </div>
          <div className="hairline mt-12" />
          <ul>
            {featured.map((item) => (
              <li
                key={item.name}
                className="grid gap-2 border-b border-hairline py-8 md:grid-cols-[1fr_auto] md:items-baseline"
              >
                <div>
                  <h3 className="font-display text-2xl text-ink md:text-3xl">
                    {item.name}
                  </h3>
                  {item.desc ? (
                    <p className="mt-2 max-w-xl text-ink-muted">{item.desc}</p>
                  ) : null}
                </div>
                <p className="font-display text-xl text-terracotta">
                  {item.price === "MP" ? "MP" : `$${item.price}`}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </section>

      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src={images.interior}
          alt="Knife dining room"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="scrim-hero absolute inset-0" />
        <div className="relative z-10 flex min-h-[80vh] items-end section-x pb-16 md:pb-24">
          <FadeUp className="container-lux max-w-xl">
            <p className="text-eyebrow text-paper/80">Private events</p>
            <h2 className="mt-4 font-display text-display-l text-paper">
              Gatherings, elevated.
            </h2>
            <p className="mt-5 text-lead text-paper/90">
              Large parties and private evenings with the full Knife kitchen
              behind them.
            </p>
            <Link href="/private-dining" className="btn-border-light mt-10">
              Plan an Event
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="section-y section-x bg-surface">
        <FadeUp className="container-lux flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-eyebrow text-terracotta">Tonight</p>
            <h2 className="mt-4 font-display text-display-l text-ink">
              Your table is waiting.
            </h2>
          </div>
          <Link href={site.reservationUrl} className="btn-terra">
            Reserve on OpenTable
          </Link>
        </FadeUp>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import InquiryForm from "@/components/InquiryForm";
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
        aria-labelledby="events-title"
        className="relative min-h-[70vh] overflow-hidden"
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
        <div className="relative z-10 flex min-h-[70vh] items-end section-x pb-16 md:pb-24">
          <FadeUp className="container-lux">
            <p className="text-eyebrow text-paper/80">Events</p>
            <h1
              id="events-title"
              className="mt-5 font-display text-display-l text-paper"
            >
              Private dining
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="section-y section-x bg-surface">
        <div className="container-lux mx-auto max-w-2xl">
          <FadeUp className="text-center">
            <p className="text-lead text-ink-muted">
              Celebrations, corporate dinners, and large parties — with the full
              Mediterranean menu and cocktail program behind them.
            </p>
            <p className="mt-8 text-ink-muted">
              Or call{" "}
              <a href={`tel:${site.phoneHref}`} className="link-lux text-ink">
                {site.phone}
              </a>
            </p>
            <Link href={site.largePartyUrl} className="btn-border mt-12">
              Large party reservations
            </Link>
          </FadeUp>
          <FadeUp className="mt-20">
            <InquiryForm />
          </FadeUp>
        </div>
      </section>
    </>
  );
}

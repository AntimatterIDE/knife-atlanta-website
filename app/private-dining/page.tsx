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
      <section className="relative min-h-[60vh] overflow-hidden pt-[72px]">
        <Image
          src={images.dining}
          alt="Private dining at Knife"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="scrim-hero absolute inset-0" />
        <div className="relative z-10 flex min-h-[60vh] items-end section-x pb-16">
          <FadeUp className="container-lux">
            <p className="text-eyebrow text-paper/80">Events</p>
            <h1 className="mt-4 font-display text-display-l text-paper">
              Private dining
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="section-y section-x bg-surface">
        <div className="container-lux mx-auto max-w-2xl">
          <FadeUp className="text-center">
            <p className="text-lead text-ink-muted">
              For celebrations, corporate dinners, and large parties — Knife
              brings the full Mediterranean menu and cocktail program to your
              evening.
            </p>
            <p className="mt-6 text-ink-muted">
              Or call{" "}
              <a href={`tel:${site.phoneHref}`} className="link-lux text-ink">
                {site.phone}
              </a>
            </p>
            <Link href={site.largePartyUrl} className="btn-terra mt-10">
              Large Party Reservations
            </Link>
          </FadeUp>
          <FadeUp className="mt-16">
            <InquiryForm />
          </FadeUp>
        </div>
      </section>
    </>
  );
}

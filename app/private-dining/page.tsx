import type { Metadata } from "next";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";
import Section from "@/components/Section";
import InquiryForm from "@/components/InquiryForm";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Dining",
  description: `Private dining and events at ${site.name} in Buckhead.`,
};

export default function PrivateDiningPage() {
  return (
    <>
      <section className="relative min-h-[55vh] overflow-hidden">
        <Image
          src={images.privateDining}
          alt="Private dining at Knife"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="overlay-dark absolute inset-0" />
        <div className="relative z-10 flex min-h-[55vh] items-end section-padding pb-16">
          <FadeUp>
            <p className="text-caption text-knife-gold">Events</p>
            <h1 className="mt-3 font-display text-headline text-knife-cream">
              Private Dining
            </h1>
          </FadeUp>
        </div>
      </section>

      <Section className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <p className="text-body-lg text-knife-mist">
            For an exclusive dining experience, our private rooms offer warmth
            and quiet focus — ideal for celebrations, corporate dinners, and
            evenings that deserve the full Knife treatment.
          </p>
          <p className="mt-4 text-knife-mist">
            Or call{" "}
            <a
              href={`tel:${site.phoneHref}`}
              className="text-knife-gold hover:underline"
            >
              {site.phone}
            </a>
          </p>
        </FadeUp>

        <FadeUp className="mt-12 text-left">
          <InquiryForm />
        </FadeUp>
      </Section>
    </>
  );
}

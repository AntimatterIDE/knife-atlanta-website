import type { Metadata } from "next";
import FadeUp from "@/components/FadeUp";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} in ${site.city}.`,
};

export default function ContactPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    site.address.mapQuery
  )}`;

  return (
    <Section className="mx-auto max-w-4xl">
      <FadeUp className="text-center">
        <p className="text-caption text-knife-gold">Contact</p>
        <h1 className="mt-4 font-display text-headline text-knife-cream">
          Visit Knife
        </h1>
      </FadeUp>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <FadeUp>
          <h2 className="font-display text-2xl text-knife-cream">Location</h2>
          <p className="mt-4 text-knife-mist">{site.address.line1}</p>
          <p className="text-knife-mist">{site.address.line2}</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-knife-gold hover:underline"
          >
            Open in Maps
          </a>
        </FadeUp>

        <FadeUp>
          <h2 className="font-display text-2xl text-knife-cream">Reach us</h2>
          <a
            href={`tel:${site.phoneHref}`}
            className="mt-4 block text-knife-mist hover:text-knife-gold"
          >
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 block text-knife-mist hover:text-knife-gold"
          >
            {site.email}
          </a>
          <div className="mt-8">
            <Button href={site.reservationUrl}>Reserve a Table</Button>
          </div>
        </FadeUp>
      </div>

      <FadeUp className="mt-14">
        <h2 className="font-display text-2xl text-knife-cream">Hours</h2>
        <ul className="mt-6 max-w-md space-y-3">
          {site.hours.map((row) => (
            <li
              key={row.days}
              className="flex justify-between gap-6 border-b border-knife-ash/60 pb-3"
            >
              <span className="text-knife-cream">{row.days}</span>
              <span className="text-knife-mist">{row.time}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </Section>
  );
}

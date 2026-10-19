import type { Metadata } from "next";
import Link from "next/link";
import FadeUp from "@/components/FadeUp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Hours, dress code, and reservations for ${site.fullName}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-surface pt-[88px]">
      <section aria-labelledby="contact-title" className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-ink">Contact</p>
          <h1
            id="contact-title"
            className="mt-6 font-display text-display-l text-ink"
          >
            Visit Knife
          </h1>
        </FadeUp>

        <div className="container-lux mx-auto mt-20 grid max-w-4xl gap-16 md:grid-cols-2">
          <FadeUp>
            <p className="text-eyebrow text-ink">Reach us</p>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-6 block font-display text-[1.75rem] text-ink"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-lux mt-4 inline-block text-ink-muted"
            >
              {site.email}
            </a>
            <Link href={site.reservationUrl} className="btn-border mt-12">
              Reserve a table
            </Link>
          </FadeUp>

          <FadeUp>
            <p className="text-eyebrow text-ink">Dining room</p>
            <ul className="mt-6 space-y-3">
              {site.hours.dining.map((row) => (
                <li key={row.days} className="flex justify-between gap-6">
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-12 text-eyebrow text-ink">Bar</p>
            <ul className="mt-6 space-y-3">
              {site.hours.bar.map((row) => (
                <li key={row.days} className="flex justify-between gap-6">
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        <FadeUp className="container-lux mx-auto mt-24 max-w-2xl border border-hairline bg-paper p-10 md:p-14">
          <p className="text-eyebrow text-ink">Dress code</p>
          <p className="mt-6 text-ink-muted leading-relaxed">{site.dressCode}</p>
          <p className="mt-8 text-caps text-ink">{site.ageRequirement}</p>
          <p className="mt-3 text-[13px] text-ink-muted">{site.serviceCharge}</p>
        </FadeUp>
      </section>
    </div>
  );
}

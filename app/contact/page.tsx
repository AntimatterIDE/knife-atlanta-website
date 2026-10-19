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
      <section className="section-y section-x">
        <FadeUp className="container-lux mx-auto max-w-4xl text-center">
          <p className="text-eyebrow text-terracotta">Contact</p>
          <h1 className="mt-5 font-display text-display-l text-ink">
            Visit Knife
          </h1>
        </FadeUp>

        <div className="container-lux mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-2">
          <FadeUp>
            <p className="text-eyebrow text-terracotta">Reach us</p>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-4 block font-display text-2xl text-ink"
            >
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="link-lux mt-3 inline-block text-ink-muted"
            >
              {site.email}
            </a>
            <Link href={site.reservationUrl} className="btn-terra mt-10">
              Reserve a Table
            </Link>
          </FadeUp>

          <FadeUp>
            <p className="text-eyebrow text-terracotta">Dining room</p>
            <ul className="mt-4 space-y-3">
              {site.hours.dining.map((row) => (
                <li key={row.days} className="flex justify-between gap-6">
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-eyebrow text-terracotta">Bar</p>
            <ul className="mt-4 space-y-3">
              {site.hours.bar.map((row) => (
                <li key={row.days} className="flex justify-between gap-6">
                  <span>{row.days}</span>
                  <span className="text-ink-muted">{row.time}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        <FadeUp className="container-lux mx-auto mt-20 max-w-3xl paper-frame p-8 md:p-12">
          <p className="text-eyebrow text-terracotta">Dress code</p>
          <p className="mt-5 text-ink-muted leading-relaxed">{site.dressCode}</p>
          <p className="mt-6 text-caps text-ink">{site.ageRequirement}</p>
          <p className="mt-3 text-sm text-ink-muted">{site.serviceCharge}</p>
        </FadeUp>
      </section>
    </div>
  );
}

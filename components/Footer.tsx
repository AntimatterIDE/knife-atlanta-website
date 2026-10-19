import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface">
      <div className="container-lux section-x grid gap-16 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-5">
          <p className="font-display text-display-m text-ink">{site.name}</p>
          <p className="mt-4 max-w-xs text-ink-muted">{site.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-eyebrow text-ink">Visit</p>
          <p className="mt-5 text-ink">{site.address.line1}</p>
          <a
            href={`tel:${site.phoneHref}`}
            className="link-lux mt-4 inline-block text-ink-muted"
          >
            {site.phone}
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="text-eyebrow text-ink">Dining room</p>
          <ul className="mt-5 space-y-2">
            {site.hours.dining.map((row) => (
              <li
                key={row.days}
                className="flex justify-between gap-6 text-[13px] tracking-[0.02em]"
              >
                <span>{row.days}</span>
                <span className="text-ink-muted">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-lux section-x flex flex-col gap-4 py-8 text-[12px] uppercase tracking-[0.12em] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}
          </p>
          <div className="flex flex-wrap gap-8">
            <Link href={site.social.instagram} className="link-lux">
              Instagram
            </Link>
            <Link href={site.social.facebook} className="link-lux">
              Facebook
            </Link>
            <Link href="/contact" className="link-lux">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-knife-ash/50 bg-knife-black">
      <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10 lg:py-20">
        <div className="md:col-span-5">
          <p className="font-display text-5xl tracking-[-0.02em] text-knife-cream md:text-6xl">
            {site.name}
          </p>
          <p className="mt-4 max-w-xs text-knife-mist">{site.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-caption text-knife-gold">Visit</p>
          <p className="mt-4 text-knife-cream">{site.address.line1}</p>
          <p className="text-knife-cream">{site.address.line2}</p>
          <a
            href={`tel:${site.phoneHref}`}
            className="mt-4 block text-knife-mist transition-colors hover:text-knife-gold"
          >
            {site.phone}
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="text-caption text-knife-gold">Hours</p>
          <ul className="mt-4 space-y-3">
            {site.hours.map((row) => (
              <li
                key={row.days}
                className="flex justify-between gap-6 text-knife-cream/90"
              >
                <span>{row.days}</span>
                <span className="text-knife-mist">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-knife-ash/50">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-4 py-6 text-sm text-knife-mist sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>
            © {year} {site.name}. {site.city}, GA.
          </p>
          <div className="flex gap-6">
            <Link
              href={site.social.instagram}
              className="transition-colors hover:text-knife-cream"
            >
              Instagram
            </Link>
            <Link
              href={site.social.facebook}
              className="transition-colors hover:text-knife-cream"
            >
              Facebook
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-knife-cream"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-knife-ash/60 bg-knife-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl tracking-[0.08em] text-knife-cream">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-knife-mist">{site.tagline}</p>
        </div>

        <div>
          <p className="text-caption text-knife-gold">Visit</p>
          <p className="mt-3 text-knife-cream">{site.address.line1}</p>
          <p className="text-knife-cream">{site.address.line2}</p>
          <a
            href={`tel:${site.phoneHref}`}
            className="mt-3 block text-knife-mist hover:text-knife-gold"
          >
            {site.phone}
          </a>
        </div>

        <div>
          <p className="text-caption text-knife-gold">Hours</p>
          <ul className="mt-3 space-y-2 text-knife-cream/90">
            {site.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="text-knife-mist">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-knife-ash/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-knife-mist sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {site.name}. {site.city}, GA.
          </p>
          <div className="flex gap-5">
            <Link href={site.social.instagram} className="hover:text-knife-gold">
              Instagram
            </Link>
            <Link href={site.social.facebook} className="hover:text-knife-gold">
              Facebook
            </Link>
            <Link href="/contact" className="hover:text-knife-gold">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Instagram, Facebook } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50";

const columns: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}[] = [
  {
    title: "House",
    links: [
      { label: "About", href: "/story" },
      { label: "Menu", href: "/menu" },
      { label: "Gallery", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Reservations", href: "/reservations" },
      { label: "Private Events", href: "/private-dining" },
      { label: "Hours", href: "/contact" },
      { label: "Dress Code", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Instagram", href: site.social.instagram },
      { label: "Facebook", href: site.social.facebook },
      { label: "TikTok", href: site.social.tiktok },
      { label: "Email", href: `mailto:${site.email}` },
    ],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: site.social.instagram },
  { icon: Facebook, label: "Facebook", href: site.social.facebook },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer9() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden bg-[#FBF9F4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto w-full max-w-[1400px]"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
            {columns.map((column) => (
              <motion.nav
                key={column.title}
                variants={item}
                aria-label={column.title}
                className="min-w-0"
              >
                <h3 className="mb-6 inline-flex rounded-md bg-neutral-200/70 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-600">
                  {column.title}
                </h3>
                <ul className="space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-2 rounded-sm text-[15px] text-neutral-700 transition-colors duration-200 hover:text-neutral-950 ${focusRing}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>

          <motion.div variants={item} className="flex flex-col gap-4">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="h-40 overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src={images.patio}
                  alt="Knife patio"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
                Dining room hours
              </h3>
              <ul className="mt-3 space-y-1.5">
                {site.hours.dining.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-3 text-sm text-neutral-600"
                  >
                    <span>{row.days}</span>
                    <span>{row.time}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${site.phoneHref}`}
                className={`mt-4 inline-block text-sm font-medium text-neutral-900 ${focusRing}`}
              >
                {site.phone}
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-3xl bg-neutral-900 px-6 py-4">
              <span className="text-sm font-medium text-white">Follow us</span>
              <div className="flex items-center gap-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-400 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          aria-hidden="true"
          className="mt-14 select-none sm:mt-20"
        >
          <p className="text-center font-display text-[clamp(4rem,16vw,10rem)] leading-[0.9] tracking-[-0.03em] text-neutral-900">
            Knife
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">
            © {year} {site.fullName}
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">
            {site.tagline} · {site.city}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

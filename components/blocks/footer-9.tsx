"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Instagram, Facebook } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";

const focusRing =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#FBF9F4]";

const columns: {
  title: string;
  links: { label: string; href: string }[];
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
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer9() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden">
      <Image
        src={images.patio}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#14110C]/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14110C] via-[#14110C]/50 to-[#14110C]/35" />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-8 sm:py-28"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3">
            {columns.map((column) => (
              <motion.nav
                key={column.title}
                variants={item}
                aria-label={column.title}
                className="min-w-0"
              >
                <h3 className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[#FBF9F4]/70">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`text-[13px] uppercase tracking-[0.12em] text-[#FBF9F4]/90 transition-opacity duration-500 hover:opacity-100 ${focusRing}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>

          <motion.div variants={item} className="flex flex-col gap-6">
            <div className="border border-[#FBF9F4]/20 bg-[#14110C]/40 p-6 backdrop-blur-sm">
              <p className="text-eyebrow text-[#FBF9F4]/70">Dining room</p>
              <ul className="mt-5 space-y-2">
                {site.hours.dining.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-4 text-[13px] text-[#FBF9F4]/90"
                  >
                    <span>{row.days}</span>
                    <span className="text-[#FBF9F4]/60">{row.time}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${site.phoneHref}`}
                className={`mt-6 inline-block text-[13px] uppercase tracking-[0.12em] text-[#FBF9F4] ${focusRing}`}
              >
                {site.phone}
              </a>
            </div>

            <div className="flex items-center justify-between gap-4 border border-[#FBF9F4]/15 bg-[#14110C]/50 px-6 py-4">
              <span className="text-[12px] uppercase tracking-[0.12em] text-[#FBF9F4]">
                Follow us
              </span>
              <div className="flex items-center gap-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`flex h-10 w-10 items-center justify-center text-[#FBF9F4]/70 transition-colors duration-500 hover:text-[#FBF9F4] ${focusRing}`}
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
          className="mt-16 select-none sm:mt-24"
        >
          <p className="font-display text-center text-[clamp(4.5rem,18vw,11rem)] leading-[0.9] tracking-[-0.02em] text-[#FBF9F4]/95">
            Knife
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 border-t border-[#FBF9F4]/15 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#FBF9F4]/55">
            © {year} {site.fullName}
          </p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#FBF9F4]/55">
            {site.tagline} · {site.city}
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

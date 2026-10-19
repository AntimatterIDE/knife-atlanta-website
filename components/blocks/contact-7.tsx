"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function Contact7() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-surface">
      <div className="grid min-h-[calc(100dvh-5.5rem)] lg:grid-cols-2">
        <div className="relative hidden min-h-full lg:block">
          <Image
            src={images.patioEvent}
            alt="Private gathering at Knife"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-[#14110C]/35" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <p className="text-eyebrow text-paper/70">Private dining</p>
            <p className="mt-4 max-w-[18ch] font-display text-display-m text-paper">
              Celebrations held with intention.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center section-x py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md"
          >
            <p className="text-eyebrow text-ink">Private events</p>
            <h1 className="mt-5 font-display text-display-m text-ink md:text-display-l">
              Plan an evening the{" "}
              <em className="italic">quiet</em> way.
            </h1>
            <p className="mt-5 text-ink-muted">
              Celebrations, corporate dinners, and large parties. Call{" "}
              <a href={`tel:${site.phoneHref}`} className="text-ink underline decoration-hairline underline-offset-4">
                {site.phone}
              </a>
              .
            </p>

            <form
              className="mt-12 space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-eyebrow text-ink-muted" htmlFor="evt-first">
                    First
                  </label>
                  <input
                    id="evt-first"
                    name="firstName"
                    required
                    placeholder="Alex"
                    className="mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-eyebrow text-ink-muted" htmlFor="evt-last">
                    Last
                  </label>
                  <input
                    id="evt-last"
                    name="lastName"
                    required
                    placeholder="Morgan"
                    className="mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink"
                  />
                </div>
              </div>

              <div>
                <label className="text-eyebrow text-ink-muted" htmlFor="evt-email">
                  Email
                </label>
                <input
                  id="evt-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@email.com"
                  className="mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-eyebrow text-ink-muted" htmlFor="evt-date">
                    Date
                  </label>
                  <input
                    id="evt-date"
                    type="date"
                    name="date"
                    className="mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-eyebrow text-ink-muted" htmlFor="evt-guests">
                    Guests
                  </label>
                  <div className="relative mt-3">
                    <select
                      id="evt-guests"
                      name="guests"
                      defaultValue="8–12"
                      className="w-full appearance-none border-0 border-b border-hairline bg-transparent py-3 pr-8 text-[1.05rem] text-ink outline-none transition-colors focus:border-ink"
                    >
                      <option>6–8</option>
                      <option>8–12</option>
                      <option>12–20</option>
                      <option>20–40</option>
                      <option>40+</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-eyebrow text-ink-muted" htmlFor="evt-message">
                  Occasion
                </label>
                <textarea
                  id="evt-message"
                  name="message"
                  rows={3}
                  required
                  placeholder="Tell us about your gathering"
                  className="mt-3 w-full resize-none border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink"
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="btn-border w-full">
                  {sent ? "Inquiry received" : "Submit inquiry"}
                </button>
                <p className="mt-5 text-center text-[12px] text-ink-muted">
                  {sent
                    ? `Thank you — we will follow up at ${site.email}.`
                    : "We reply within one business day."}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

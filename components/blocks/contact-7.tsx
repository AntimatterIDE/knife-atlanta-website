"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { site } from "@/lib/site";

export default function Contact7() {
  const [sent, setSent] = useState(false);

  return (
    <section className="flex w-full items-start bg-surface px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-eyebrow text-ink"
        >
          Private events
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-display-l text-ink"
        >
          Plan an evening
          <br />
          the <em className="font-display italic">quiet</em> way.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-md text-ink-muted"
        >
          Celebrations, corporate dinners, and large parties — with the full
          Mediterranean menu and cocktail program. Or call{" "}
          <a href={`tel:${site.phoneHref}`} className="link-lux text-ink">
            {site.phone}
          </a>
          .
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full border border-hairline bg-paper p-8 text-left sm:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-caps text-ink">First name</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First name"
                className="border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-caps text-ink">Last name</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last name"
                className="border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-caps text-ink">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
            />
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-caps text-ink">Event date</label>
              <input
                type="date"
                name="date"
                className="border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-caps text-ink">Guests</label>
              <select
                name="guests"
                className="appearance-none border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                defaultValue="8–12"
              >
                <option>6–8</option>
                <option>8–12</option>
                <option>12–20</option>
                <option>20–40</option>
                <option>40+</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-caps text-ink">Occasion</label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tell us about your gathering"
              className="resize-none border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
            />
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button type="submit" className="btn-border w-full sm:w-auto">
              {sent ? "Inquiry received" : "Submit inquiry"}
            </button>
            {sent ? (
              <p className="text-center text-sm text-ink-muted">
                Thank you — our events team will follow up shortly at{" "}
                {site.email}.
              </p>
            ) : (
              <p className="text-center text-[12px] text-ink-muted">
                We reply within one business day.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}

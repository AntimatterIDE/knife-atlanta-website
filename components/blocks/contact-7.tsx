"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";

export default function Contact7() {
  const [sent, setSent] = useState(false);

  return (
    <section className="flex w-full items-start bg-surface section-x section-y">
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
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-display-l text-ink"
        >
          Plan an evening
          <br />
          the <em className="font-display italic">quiet</em> way.
        </motion.h2>
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
          className="panel-lux mt-14 w-full p-8 text-left sm:p-11"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className="label-lux" htmlFor="evt-first">
                First name
              </label>
              <input
                id="evt-first"
                type="text"
                name="firstName"
                required
                placeholder="Alex"
                className="field-lux-box"
              />
            </div>
            <div>
              <label className="label-lux" htmlFor="evt-last">
                Last name
              </label>
              <input
                id="evt-last"
                type="text"
                name="lastName"
                required
                placeholder="Morgan"
                className="field-lux-box"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="label-lux" htmlFor="evt-email">
              Email
            </label>
            <input
              id="evt-email"
              type="email"
              name="email"
              required
              placeholder="you@email.com"
              className="field-lux-box"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className="label-lux" htmlFor="evt-date">
                Event date
              </label>
              <input
                id="evt-date"
                type="date"
                name="date"
                className="field-lux-box"
              />
            </div>
            <div>
              <label className="label-lux" htmlFor="evt-guests">
                Guests
              </label>
              <div className="relative">
                <select
                  id="evt-guests"
                  name="guests"
                  className="field-lux-box pr-10"
                  defaultValue="8–12"
                >
                  <option>6–8</option>
                  <option>8–12</option>
                  <option>12–20</option>
                  <option>20–40</option>
                  <option>40+</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="label-lux" htmlFor="evt-message">
              Occasion
            </label>
            <textarea
              id="evt-message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your gathering"
              className="field-lux-box resize-none"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-5">
            <button type="submit" className="btn-border w-full sm:w-auto sm:min-w-[14rem]">
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

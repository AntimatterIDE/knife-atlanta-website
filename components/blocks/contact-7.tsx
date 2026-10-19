"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";

const inputClass =
  "px-3.5 py-2.5 rounded-md bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900";

export default function Contact7() {
  const [sent, setSent] = useState(false);

  return (
    <section className="flex w-full min-h-[calc(100dvh-5.5rem)] items-start px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-eyebrow text-[#EAE4D8]/70"
        >
          Private events
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-4 font-display text-3xl font-normal leading-[1.05] tracking-tight text-[#EAE4D8] [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl"
        >
          Plan an evening the{" "}
          <em className="font-display italic font-normal">quiet</em> way.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-4 max-w-md text-sm text-[#EAE4D8]/70 sm:text-base"
        >
          Celebrations, corporate dinners, and large parties. Call{" "}
          <a
            href={`tel:${site.phoneHref}`}
            className="underline decoration-[#EAE4D8]/35 underline-offset-4 hover:decoration-[#EAE4D8]"
          >
            {site.phone}
          </a>{" "}
          or send a note — we reply within a business day.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10 flex w-full flex-col gap-5 rounded-2xl border border-white/20 bg-[#FBF9F4]/92 p-6 text-left shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-900">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Enter your first name*"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-900">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Enter your last name*"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-900">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter email address*"
                className={`${inputClass} w-full pr-10`}
              />
              <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-900">
                Event date
              </label>
              <input type="date" name="date" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-neutral-900">
                Guests
              </label>
              <div className="relative">
                <select
                  name="guests"
                  defaultValue="8–12"
                  className={`${inputClass} w-full cursor-pointer appearance-none pr-10`}
                >
                  <option>6–8</option>
                  <option>8–12</option>
                  <option>12–20</option>
                  <option>20–40</option>
                  <option>40+</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-neutral-900">
              Occasion
            </label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Tell us about your gathering"
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="cursor-pointer rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              {sent ? "Inquiry received" : "Submit inquiry"}
            </motion.button>
            <p className="text-center text-xs text-neutral-500">
              {sent
                ? `Thank you — we will follow up at ${site.email}.`
                : "We reply within one business day."}
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

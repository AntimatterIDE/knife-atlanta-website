"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

const timeSlots = [
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

type Step = "details" | "confirm" | "done";

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const field =
  "mt-3 w-full border-0 border-b border-hairline bg-transparent py-3 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-ink-muted/50 focus:border-ink";

export default function ReservationModule() {
  const [step, setStep] = useState<Step>("details");
  const [party, setParty] = useState(2);
  const [date, setDate] = useState(tomorrowISO);
  const [time, setTime] = useState("7:00 PM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const summary = `${party} ${party === 1 ? "guest" : "guests"} · ${date} · ${time}`;

  function submitReservation(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !phone) return;
    const id = `KN-${Date.now().toString(36).toUpperCase()}`;
    setConfirmation(id);

    const subject = encodeURIComponent(`Table request — ${summary}`);
    const body = encodeURIComponent(
      [
        `Reservation request from the Knife website`,
        ``,
        `Confirmation: ${id}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Party: ${party}`,
        `Date: ${date}`,
        `Time: ${time}`,
        notes ? `Notes: ${notes}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.open(`mailto:${site.email}?subject=${subject}&body=${body}`, "_blank");
    setStep("done");
  }

  return (
    <section className="relative w-full overflow-hidden bg-surface">
      <div className="grid min-h-[calc(100dvh-5.5rem)] lg:grid-cols-2">
        <div className="relative hidden min-h-full lg:block">
          <Image
            src={images.lounge}
            alt="Dining room at Knife"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110C]/70 via-[#14110C]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <p className="text-eyebrow text-paper/70">Reservations</p>
            <p className="mt-4 max-w-[16ch] font-display text-display-m text-paper">
              Your table, held with care.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center section-x py-16 md:py-20">
          <div className="mx-auto w-full max-w-md">
            <AnimatePresence mode="wait">
              {step === "details" && (
                <motion.form
                  key="details"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep("confirm");
                  }}
                >
                  <p className="text-eyebrow text-ink">Reservations</p>
                  <h1 className="mt-5 font-display text-display-m text-ink md:text-display-l">
                    Request a table
                  </h1>
                  <p className="mt-4 text-ink-muted">
                    Choose your evening directly with the house.
                  </p>

                  <p className="mt-12 text-eyebrow text-ink-muted">Party size</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {partySizes.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setParty(n)}
                        className={cn(
                          "flex h-11 w-11 items-center justify-center text-sm transition-colors duration-400",
                          party === n
                            ? "bg-ink text-paper"
                            : "bg-surface-2 text-ink hover:bg-hairline"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-[13px] text-ink-muted">
                    9 or more?{" "}
                    <Link href="/private-dining" className="text-ink underline decoration-hairline underline-offset-4">
                      Private events
                    </Link>
                  </p>

                  <div className="mt-10 grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-date">
                        Date
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={minDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-time">
                        Time
                      </label>
                      <div className="relative">
                        <select
                          id="res-time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className={`${field} appearance-none pr-8`}
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-0 top-[calc(50%+0.4rem)] h-4 w-4 -translate-y-1/2 text-ink-muted" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-8">
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-name">
                        Name
                      </label>
                      <input
                        id="res-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full name"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-email">
                        Email
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@email.com"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-phone">
                        Phone
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="(404) 000-0000"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className="text-eyebrow text-ink-muted" htmlFor="res-notes">
                        Notes
                      </label>
                      <textarea
                        id="res-notes"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Allergies, celebration, seating"
                        className={`${field} resize-none`}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-border mt-12 w-full">
                    Review request
                  </button>
                  <p className="mt-5 text-center text-[12px] text-ink-muted">
                    Prefer OpenTable?{" "}
                    <a
                      href={site.reservationUrl}
                      className="text-ink underline decoration-hairline underline-offset-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Continue there
                    </a>
                  </p>
                </motion.form>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-eyebrow text-ink">Confirm</p>
                  <h2 className="mt-5 font-display text-display-m text-ink">
                    Your evening
                  </h2>
                  <dl className="mt-10 space-y-5 border-y border-hairline py-8 text-[15px]">
                    {[
                      ["Party", `${party} guests`],
                      ["Date", date],
                      ["Time", time],
                      ["Name", name],
                      ["Email", email],
                      ["Phone", phone],
                      ...(notes ? [["Notes", notes] as const] : []),
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6">
                        <dt className="text-ink-muted">{k}</dt>
                        <dd className="text-right text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <form
                    onSubmit={submitReservation}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    <button
                      type="button"
                      onClick={() => setStep("details")}
                      className="btn-border flex-1"
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="btn-border flex-1 bg-ink text-paper hover:bg-transparent hover:text-ink"
                    >
                      Confirm
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="text-eyebrow text-ink">Confirmed</p>
                  <h2 className="mt-5 font-display text-display-m text-ink">
                    We have your table
                  </h2>
                  <p className="mx-auto mt-5 max-w-sm text-ink-muted">
                    {summary}
                  </p>
                  <p className="mt-10 font-display text-3xl text-ink">
                    {confirmation}
                  </p>
                  <p className="mt-3 text-[13px] text-ink-muted">
                    Keep this reference for your visit.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4">
                    <Link href="/menu" className="btn-border">
                      View the menu
                    </Link>
                    <Link href="/" className="link-lux text-caps text-ink">
                      Back home ›
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

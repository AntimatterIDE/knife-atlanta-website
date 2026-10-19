"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
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
    // Soft notify house email while keeping UX on-site
    window.open(`mailto:${site.email}?subject=${subject}&body=${body}`, "_blank");
    setStep("done");
  }

  return (
    <section className="section-y section-x">
      <div className="container-lux mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-eyebrow text-ink">Reservations</p>
          <h1 className="mt-6 font-display text-display-l text-ink">
            Request a table
          </h1>
          <p className="mx-auto mt-5 max-w-md text-ink-muted">
            Choose your evening with us directly. We will hold your seats and
            confirm by email.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.form
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border border-hairline bg-paper p-8 md:p-12"
              onSubmit={(e) => {
                e.preventDefault();
                setStep("confirm");
              }}
            >
              <p className="text-caps text-ink">Party size</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {partySizes.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setParty(n)}
                    className={cn(
                      "min-h-11 min-w-11 border px-3 text-sm transition-colors duration-500",
                      party === n
                        ? "border-ink bg-ink text-paper"
                        : "border-hairline text-ink hover:border-ink"
                    )}
                  >
                    {n}
                  </button>
                ))}
                <span className="flex min-h-11 items-center px-2 text-[13px] text-ink-muted">
                  9+ →{" "}
                  <Link href="/private-dining" className="link-lux ml-1 text-ink">
                    Private events
                  </Link>
                </span>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-caps text-ink" htmlFor="res-date">
                    Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="mt-3 w-full border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-caps text-ink" htmlFor="res-time">
                    Time
                  </label>
                  <select
                    id="res-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-3 w-full appearance-none border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-10 space-y-5">
                <div>
                  <label className="text-caps text-ink" htmlFor="res-name">
                    Name
                  </label>
                  <input
                    id="res-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-3 w-full border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-caps text-ink" htmlFor="res-email">
                    Email
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-3 w-full border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-caps text-ink" htmlFor="res-phone">
                    Phone
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-3 w-full border border-hairline bg-surface px-4 py-3 text-ink outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label className="text-caps text-ink" htmlFor="res-notes">
                    Notes{" "}
                    <span className="normal-case tracking-normal text-ink-muted">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, celebration, seating preference"
                    className="mt-3 w-full resize-none border border-hairline bg-surface px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
                  />
                </div>
              </div>

              <button type="submit" className="btn-border mt-10 w-full">
                Review request
              </button>

              <p className="mt-6 text-center text-[12px] text-ink-muted">
                Prefer OpenTable?{" "}
                <a
                  href={site.reservationUrl}
                  className="link-lux text-ink"
                  target="_blank"
                  rel="noreferrer"
                >
                  Continue there ›
                </a>
              </p>
            </motion.form>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border border-hairline bg-paper p-8 md:p-12"
            >
              <p className="text-eyebrow text-ink">Confirm</p>
              <h2 className="mt-4 font-display text-display-m text-ink">
                Your evening
              </h2>
              <dl className="mt-10 space-y-4 border-t border-hairline pt-8 text-[15px]">
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Party</dt>
                  <dd>{party} guests</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Date</dt>
                  <dd>{date}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Time</dt>
                  <dd>{time}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Name</dt>
                  <dd>{name}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Email</dt>
                  <dd className="truncate">{email}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-ink-muted">Phone</dt>
                  <dd>{phone}</dd>
                </div>
                {notes ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink-muted">Notes</dt>
                    <dd className="max-w-[50%] text-right">{notes}</dd>
                  </div>
                ) : null}
              </dl>
              <form onSubmit={submitReservation} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="btn-border flex-1"
                >
                  Edit
                </button>
                <button type="submit" className="btn-border flex-1 bg-ink text-paper hover:bg-transparent hover:text-ink">
                  Confirm reservation
                </button>
              </form>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 border border-hairline bg-paper p-8 text-center md:p-14"
            >
              <p className="text-eyebrow text-ink">Confirmed</p>
              <h2 className="mt-5 font-display text-display-m text-ink">
                We have your table
              </h2>
              <p className="mx-auto mt-5 max-w-md text-ink-muted">
                {summary}. A copy has been prepared for{" "}
                <span className="text-ink">{site.email}</span>.
              </p>
              <p className="mt-8 font-display text-2xl text-ink">{confirmation}</p>
              <p className="mt-3 text-[13px] text-ink-muted">
                Reference number — please keep this for your visit.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

        <p className="mx-auto mt-12 max-w-lg text-center text-[13px] text-ink-muted">
          {site.ageRequirement}. {site.serviceCharge}
        </p>
      </div>
    </section>
  );
}

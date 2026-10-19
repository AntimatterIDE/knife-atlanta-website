"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { User, ChevronDown } from "lucide-react";
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

const inputClass =
  "px-3.5 py-2.5 rounded-md bg-white border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 w-full";

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
    <section className="flex w-full min-h-[var(--rb-section-min-h,100vh)] items-start bg-[#FBF9F4] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <h1 className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                Request a{" "}
                <em className="font-display italic font-normal">table</em>.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm text-neutral-600 sm:text-base">
                Choose your evening with us directly. We will hold your seats
                and confirm by email.
              </p>

              <form
                className="mt-10 flex w-full flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left sm:p-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("confirm");
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-900">
                    Party size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {partySizes.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setParty(n)}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors",
                          party === n
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-neutral-500">
                    9+ guests?{" "}
                    <Link
                      href="/private-dining"
                      className="underline underline-offset-2"
                    >
                      Private events
                    </Link>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-medium text-neutral-900"
                      htmlFor="res-date"
                    >
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs font-medium text-neutral-900"
                      htmlFor="res-time"
                    >
                      Time
                    </label>
                    <div className="relative">
                      <select
                        id="res-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={`${inputClass} cursor-pointer appearance-none pr-10`}
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium text-neutral-900"
                    htmlFor="res-name"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="res-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Enter your full name*"
                      className={`${inputClass} pr-10`}
                    />
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium text-neutral-900"
                    htmlFor="res-email"
                  >
                    Email address
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter email address*"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium text-neutral-900"
                    htmlFor="res-phone"
                  >
                    Phone
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="Enter phone number*"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs font-medium text-neutral-900"
                    htmlFor="res-notes"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Allergies, celebration, seating preference"
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
                    Review request
                  </motion.button>
                  <p className="text-center text-xs text-neutral-500">
                    Prefer OpenTable?{" "}
                    <a
                      href={site.reservationUrl}
                      className="underline text-neutral-700"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Continue there
                    </a>
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <h2 className="font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-5xl">
                Confirm your evening
              </h2>
              <div className="mt-10 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-left sm:p-8">
                <dl className="space-y-4 text-sm">
                  {[
                    ["Party", `${party} guests`],
                    ["Date", date],
                    ["Time", time],
                    ["Name", name],
                    ["Email", email],
                    ["Phone", phone],
                    ...(notes ? [["Notes", notes] as const] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-neutral-500">{k}</dt>
                      <dd className="text-right text-neutral-900">{v}</dd>
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
                    className="flex-1 cursor-pointer rounded-md border border-neutral-300 bg-white px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
                  >
                    Edit
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 cursor-pointer rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    Confirm reservation
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <h2 className="font-display text-3xl font-normal tracking-tight text-neutral-900 sm:text-5xl">
                We have your table
              </h2>
              <div className="mt-10 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <p className="text-sm text-neutral-600">{summary}</p>
                <p className="mt-6 font-display text-3xl text-neutral-900">
                  {confirmation}
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                  Keep this reference for your visit.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3">
                  <Link
                    href="/menu"
                    className="rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    View the menu
                  </Link>
                  <Link
                    href="/"
                    className="text-xs text-neutral-500 underline underline-offset-2"
                  >
                    Back home
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

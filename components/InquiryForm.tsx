"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        className="w-full border border-hairline bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
        placeholder="Name"
        name="name"
        type="text"
        required
      />
      <input
        className="w-full border border-hairline bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <input
        className="w-full border border-hairline bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
        placeholder="Date of event"
        name="date"
        type="text"
      />
      <textarea
        className="w-full border border-hairline bg-paper px-4 py-3.5 text-ink outline-none placeholder:text-ink-muted focus:border-ink"
        placeholder="Tell us about your event"
        name="message"
        rows={4}
        required
      />
      <button type="submit" className="btn-border w-full">
        {sent ? "Inquiry received" : "Submit inquiry"}
      </button>
      {sent && (
        <p className="text-center text-sm text-ink-muted">
          Thank you — our events team will follow up shortly.
        </p>
      )}
    </form>
  );
}

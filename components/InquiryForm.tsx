"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        className="w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-terracotta"
        placeholder="Name"
        name="name"
        type="text"
        required
      />
      <input
        className="w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-terracotta"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <input
        className="w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-terracotta"
        placeholder="Date of event"
        name="date"
        type="text"
      />
      <textarea
        className="w-full border border-hairline bg-paper px-4 py-3 text-ink outline-none placeholder:text-ink-muted focus:border-terracotta"
        placeholder="Tell us about your event"
        name="message"
        rows={4}
        required
      />
      <button type="submit" className="btn-terra w-full">
        {sent ? "Inquiry Received" : "Submit Inquiry"}
      </button>
      {sent && (
        <p className="text-center text-sm text-terracotta">
          Thank you — our events team will follow up shortly.
        </p>
      )}
    </form>
  );
}

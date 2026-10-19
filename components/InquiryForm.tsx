"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

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
        className="w-full border border-knife-ash bg-knife-smoke px-4 py-3 text-knife-cream outline-none placeholder:text-knife-mist focus:border-knife-gold"
        placeholder="Name"
        name="name"
        type="text"
        required
      />
      <input
        className="w-full border border-knife-ash bg-knife-smoke px-4 py-3 text-knife-cream outline-none placeholder:text-knife-mist focus:border-knife-gold"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <input
        className="w-full border border-knife-ash bg-knife-smoke px-4 py-3 text-knife-cream outline-none placeholder:text-knife-mist focus:border-knife-gold"
        placeholder="Date of event"
        name="date"
        type="text"
      />
      <textarea
        className="w-full border border-knife-ash bg-knife-smoke px-4 py-3 text-knife-cream outline-none placeholder:text-knife-mist focus:border-knife-gold"
        placeholder="Tell us about your event"
        name="message"
        rows={4}
        required
      />
      <Button type="submit" className="w-full">
        {sent ? "Inquiry Received" : "Submit Inquiry"}
      </Button>
      {sent && (
        <p className="text-center text-sm text-knife-gold">
          Thank you — our events team will follow up shortly.
        </p>
      )}
    </form>
  );
}

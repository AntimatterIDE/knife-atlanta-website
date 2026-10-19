"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-knife-black text-knife-cream text-sm py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          © 2023 Knife. Atlanta, GA.
        </div>
        <div className="flex gap-2">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
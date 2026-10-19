"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-knife-black/90 text-knife-cream h-14 flex items-center justify-between px-4 shadow-lg">
      <div className="font-display text-lg">
        <Link href="/">Knife</Link>
      </div>
      <nav className="hidden sm:flex gap-4">
        <Link href="/story">Our Story</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/events">Events</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <button className="sm:hidden">Menu</button>
    </header>
  );
}
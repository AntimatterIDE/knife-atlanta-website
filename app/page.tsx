"use client";

import Image from "next/image";
import Button from "@/components/Button";
import defaultVideo from "public/hero-video.mp4";
import FadeUp from "@/components/FadeUp";

export default function HomePage() {
  return (
    <FadeUp className="pb-10">
      <section className="h-screen relative">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          src={defaultVideo}
          playsInline
        />
        <div className="relative z-10 flex flex-col justify-end items-center h-full pb-32 text-center">
          <h1 className="text-knife-cream font-display text-5xl md:text-8xl leading-tight">
            Knife Atlanta
          </h1>
          <p className="text-knife-gold font-body text-lg md:text-xl mt-4">
            Elevate your dining experience
          </p>
          <Button className="mt-6" href="/reservations" light>
            Reserve a Table
          </Button>
        </div>
        <div className="absolute inset-0 bg-black opacity-40" />
      </section>
    </FadeUp>
  );
}

"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import FadeUp from "@/components/FadeUp";

export default function StoryPage() {
  const chefBioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function scrollIntoView() {
      if (chefBioRef.current) {
        chefBioRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    scrollIntoView();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <section className="text-center pb-12">
        <h1 className="text-knife-cream font-display text-6xl leading-tight">
          Our Story
        </h1>
        <p className="text-knife-gold font-body text-lg mt-4">
          A culinary journey led by passion and excellence
        </p>
      </section>
      <FadeUp className="grid md:grid-cols-2 gap-8">
        <Image
          src="/images/chef.jpg"
          alt="Portrait of Chef"
          width={600}
          height={900}
          className="w-full h-auto rounded-lg"
        />
        <div ref={chefBioRef} className="pt-4">
          <h2 className="text-knife-cream font-display text-3xl pb-4">
            Chef Johannes Schmidt
          </h2>
          <p className="text-knife-cream font-body">
            Growing up in the lush countryside, Chef Schmidt's inspirations rooted in his family's rich traditions of preparing hearty meals that touch the soul. With decades of expertise harnessing flavors that speak utmost sophistication...
          </p>
        </div>
      </FadeUp>
    </div>
  );
}

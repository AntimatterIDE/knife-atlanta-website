"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { images } from "@/lib/images";

const trailImages = [
  images.mezze,
  images.lamb,
  images.kebab,
  images.patio,
  images.shrimp,
  images.lounge,
];

export default function Cta2() {
  const trailerRef = useRef<HTMLDivElement>(null);
  const currentImageIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastImageTime = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const movementThreshold = 110;
    const delayBetween = 90;

    const createImageTrail = (e: MouseEvent) => {
      if (!trailerRef.current || !sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < movementThreshold) return;

      const now = Date.now();
      if (
        lastImageTime.current !== 0 &&
        now - lastImageTime.current < delayBetween
      ) {
        return;
      }

      const img = document.createElement("img");
      img.src = trailImages[currentImageIndex.current];
      img.alt = "";
      img.className = "absolute pointer-events-none object-cover";
      img.style.width = "140px";
      img.style.height = "190px";
      img.style.left = `${relativeX - 70}px`;
      img.style.top = `${relativeY - 95}px`;

      trailerRef.current.appendChild(img);
      currentImageIndex.current =
        (currentImageIndex.current + 1) % trailImages.length;

      gsap.fromTo(
        img,
        { opacity: 1, scale: 0, rotation: gsap.utils.random(-12, 12) },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
      );
      gsap.to(img, {
        opacity: 0,
        scale: 0.85,
        duration: 0.7,
        delay: 0.55,
        ease: "power2.in",
        onComplete: () => img.remove(),
      });

      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastImageTime.current = now;
    };

    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", createImageTrail);
    return () => section.removeEventListener("mousemove", createImageTrail);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reserve-title"
      className="relative h-[min(100vh,52rem)] w-full overflow-hidden bg-surface"
    >
      <div
        ref={trailerRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      <div className="relative z-20 flex h-full flex-col items-center justify-center section-x text-center">
        <motion.p
          className="text-eyebrow text-ink"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Reservations
        </motion.p>
        <motion.h2
          id="reserve-title"
          className="mt-6 max-w-[14ch] font-display text-display-l text-ink text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.08 }}
        >
          Request a table
        </motion.h2>
        <motion.p
          className="mt-5 max-w-md text-ink-muted"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.14 }}
        >
          Intimate dinners and lively gatherings — reserve directly with the
          house.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link href="/reservations" className="btn-border">
            Reserve
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

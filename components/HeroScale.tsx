"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const lgQuery = "(min-width: 1024px)";
const reduceQuery = "(prefers-reduced-motion: reduce)";

function subscribe(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function HeroScale({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLg = useMedia(lgQuery);
  const reduceMotion = useMedia(reduceQuery);
  const enabled = isLg && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {enabled ? (
        <motion.div
          style={{ scale }}
          className="absolute inset-0 will-change-transform"
        >
          {children}
        </motion.div>
      ) : (
        <div className="absolute inset-0">{children}</div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import LogoMark from "@/components/LogoMark";

export default function SitePreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduce ? 400 : 2000);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.div
            key="knife-preload"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#14110C]"
            initial={{ x: "0%" }}
            animate={{ x: "0%" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { x: "100%", transition: { duration: 1.05, ease: [0.65, 0, 0.35, 1] } }
            }
            transition={reduce ? { duration: 0.35 } : undefined}
            aria-label="Loading Knife"
            role="status"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center"
            >
              <LogoMark
                priority
                decorative
                invert
                heightClass="h-12 w-auto md:h-16"
              />
              <motion.div
                className="mt-10 h-px w-16 origin-left bg-[#FBF9F4]/35"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </>
  );
}

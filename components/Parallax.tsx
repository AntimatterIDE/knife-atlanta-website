"use client";

import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useRef } from "react";

export default function Parallax({
  children,
  offset = 100,
  className = "",
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, offset], [0, -offset * 0.5]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
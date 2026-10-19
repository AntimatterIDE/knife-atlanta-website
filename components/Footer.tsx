"use client";

import { usePathname } from "next/navigation";
import Footer9 from "@/components/blocks/footer-9";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/gallery") return null;
  return <Footer9 />;
}

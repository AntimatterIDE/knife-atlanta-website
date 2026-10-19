"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Preloader from "@/components/react-bits/preloader";
import { images } from "@/lib/images";

export default function SitePreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finish = () => setLoading(false);
    const timer = window.setTimeout(finish, 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader
        loading={loading}
        variant="curtain"
        position="fixed"
        duration={2200}
        bgColor="#14110C"
        zIndex={200}
        loadingText=" "
        textClassName="!opacity-0"
        respectReducedMotion
        reducedMotionFallback="fade"
        ariaLabel="Loading Knife"
      >
        <span className="sr-only" />
      </Preloader>

      {loading ? (
        <div
          className="pointer-events-none fixed inset-0 z-[210] flex flex-col items-center justify-center gap-5"
          aria-hidden
        >
          <Image
            src={images.logo}
            alt=""
            width={160}
            height={130}
            priority
            className="h-[4.5rem] w-auto brightness-0 invert md:h-24"
          />
          <p className="font-display text-2xl tracking-[0.04em] text-[#EAE4D8] md:text-3xl">
            Knife
          </p>
        </div>
      ) : null}

      {children}
    </>
  );
}

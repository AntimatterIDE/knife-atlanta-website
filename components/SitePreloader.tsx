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
          className="pointer-events-none fixed inset-0 z-[210] flex items-center justify-center"
          aria-hidden
        >
          <Image
            src={images.logo}
            alt=""
            width={200}
            height={160}
            priority
            className="h-20 w-auto brightness-0 invert md:h-28"
          />
        </div>
      ) : null}

      {children}
    </>
  );
}

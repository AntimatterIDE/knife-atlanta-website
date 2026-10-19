"use client";

import dynamic from "next/dynamic";

const HexagonalVault = dynamic(
  () => import("@/components/react-bits/hexagonal-vault"),
  { ssr: false }
);

/** Knife night palette — warm bronze lattice, not purple SaaS defaults */
export default function VaultBackdrop({
  children,
  className = "min-h-dvh w-full",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HexagonalVault
      className={className}
      backgroundColor="#14110C"
      colors={["#C4A574", "#EAE4D8"]}
      cellSize={1.55}
      lineWidth={0.45}
      litWidth={1.6}
      lattice={0.35}
      glow={1.35}
      glowRadius={0.55}
      core={0.35}
      vignette={0.45}
      grain={0.7}
      trailLength={2.4}
      trailWidth={0.9}
      follow={0.65}
      flow={0.45}
      autoplay
      shimmer={0.85}
      speed={0.75}
      interactive
      clickPulses
      pulseSpeed={0.85}
    >
      {children}
    </HexagonalVault>
  );
}

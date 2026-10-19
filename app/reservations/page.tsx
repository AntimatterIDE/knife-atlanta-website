import type { Metadata } from "next";
import ReservationModule from "@/components/ReservationModule";
import VaultBackdrop from "@/components/VaultBackdrop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Reserve a table directly at ${site.fullName}.`,
};

export default function ReservationsPage() {
  return (
    <VaultBackdrop className="min-h-dvh w-full">
      <div className="pt-[88px] md:pt-[104px]">
        <ReservationModule />
      </div>
    </VaultBackdrop>
  );
}

import type { Metadata } from "next";
import ReservationModule from "@/components/ReservationModule";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Reserve a table directly at ${site.fullName}.`,
};

export default function ReservationsPage() {
  return (
    <div className="bg-surface pt-[96px] md:pt-[112px]">
      <ReservationModule />
    </div>
  );
}

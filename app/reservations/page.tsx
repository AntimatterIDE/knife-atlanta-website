import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Reserve a table at ${site.fullName}.`,
};

export default function ReservationsPage() {
  redirect(site.reservationUrl);
}

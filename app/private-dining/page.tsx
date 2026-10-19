import type { Metadata } from "next";
import Contact7 from "@/components/blocks/contact-7";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Events",
  description: `Private dining and large party reservations at ${site.fullName}.`,
};

export default function PrivateDiningPage() {
  return (
    <div className="bg-surface pt-[72px] md:pt-[88px]">
      <Contact7 />
    </div>
  );
}

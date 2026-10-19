import type { Metadata } from "next";
import Contact7 from "@/components/blocks/contact-7";
import VaultBackdrop from "@/components/VaultBackdrop";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private Events",
  description: `Private dining and large party reservations at ${site.fullName}.`,
};

export default function PrivateDiningPage() {
  return (
    <VaultBackdrop className="min-h-dvh w-full">
      <div className="pt-[88px] md:pt-[104px]">
        <Contact7 />
      </div>
    </VaultBackdrop>
  );
}

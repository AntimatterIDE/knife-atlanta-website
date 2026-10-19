import type { Metadata } from "next";
import Contact5 from "@/components/blocks/contact-5";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Hours, dress code, and reservations for ${site.fullName}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-surface pt-[96px] md:pt-[112px]">
      <Contact5 />
    </div>
  );
}

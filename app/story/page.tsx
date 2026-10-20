import type { Metadata } from "next";
import About14 from "@/components/blocks/about-14";
import FadeUp from "@/components/FadeUp";
import LogoMark from "@/components/LogoMark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `The house behind ${site.fullName}.`,
};

export default function StoryPage() {
  return (
    <div className="bg-surface pt-[72px] md:pt-[88px]">
      <About14 />

      <section className="section-y section-x bg-surface-2">
        <FadeUp className="container-lux mx-auto grid max-w-4xl gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-eyebrow text-ink">The house</p>
            <h2 className="mt-6 font-display text-display-m text-ink">
              Atmosphere as much as flavor
            </h2>
          </div>
          <div className="space-y-6 text-ink-muted">
            <p>
              Step into{" "}
              <LogoMark
                decorative
                heightClass="mx-1 inline-block h-[0.95em] w-auto align-[-0.12em]"
              />
              , where the essence of modern Mediterranean cuisine harmonizes
              with an atmosphere that exudes chic sophistication.
            </p>
            <p>{site.philosophy}</p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}

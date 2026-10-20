import Image from "next/image";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Height of the mark; width follows aspect automatically */
  heightClass?: string;
  /** Invert for light-on-dark surfaces (default: black mark) */
  invert?: boolean;
  /** Soft drop shadow for marks on photography */
  glow?: boolean;
  /** Decorative — hide from assistive tech when nearby text already names the brand */
  decorative?: boolean;
  priority?: boolean;
};

export default function LogoMark({
  className,
  heightClass = "h-8 md:h-10",
  invert = false,
  glow = false,
  decorative = false,
  priority = false,
}: LogoMarkProps) {
  return (
    <Image
      src={images.logoNav}
      alt={decorative ? "" : site.name}
      width={304}
      height={80}
      priority={priority}
      aria-hidden={decorative || undefined}
      className={cn(
        "w-auto object-contain object-left",
        heightClass,
        invert && "brightness-0 invert",
        !invert && "brightness-0",
        glow && "drop-shadow-[0_1px_12px_rgba(0,0,0,0.55)]",
        className
      )}
    />
  );
}

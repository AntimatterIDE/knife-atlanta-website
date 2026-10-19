import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "ghost" | "light";
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  className = "",
  variant = "gold",
  type = "button",
  onClick,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center px-8 py-3.5 text-caption tracking-[0.2em] transition-all duration-400",
    variant === "gold" &&
      "!text-[#070605] bg-[#d4b06a] hover:bg-[#f3ece3]",
    variant === "ghost" &&
      "border border-knife-cream/40 !text-knife-cream hover:border-knife-cream hover:bg-knife-cream/10",
    variant === "light" &&
      "!text-[#070605] bg-[#f3ece3] hover:bg-[#d4b06a]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}

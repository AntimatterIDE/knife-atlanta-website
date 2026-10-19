import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "ghost";
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
    "inline-flex items-center justify-center px-7 py-3 text-caption tracking-[0.16em] transition-colors duration-300",
    variant === "gold" &&
      "bg-knife-gold text-knife-black hover:bg-knife-cream",
    variant === "ghost" &&
      "border border-knife-gold/60 text-knife-cream hover:border-knife-gold hover:text-knife-gold",
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

"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outline";
}

export default function GoldButton({
  children,
  variant = "filled",
  className,
  ...props
}: GoldButtonProps) {
  if (variant === "filled") {
    return (
      <button
        className={cn(
          "px-6 py-3 rounded-full bg-gradient-to-r from-gold to-gold-dark text-black font-semibold text-sm tracking-wide hover:shadow-gold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-full border border-gold/50 text-gold font-semibold text-sm tracking-wide hover:bg-gold/10 hover:border-gold transition-all duration-300 flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

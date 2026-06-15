import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

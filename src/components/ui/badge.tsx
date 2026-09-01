import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: ReactNode;
  tone?: "neutral" | "gold" | "green" | "red" | "burgundy" | "dark";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-[rgba(109,113,120,0.1)] text-[var(--muted)] border-[rgba(109,113,120,0.2)]",
    gold: "bg-[rgba(168,137,82,0.12)] text-[#7a5d2d] border-[rgba(168,137,82,0.3)]",
    green: "bg-[rgba(79,155,114,0.12)] text-[#2f6e4b] border-[rgba(79,155,114,0.3)]",
    red: "bg-[rgba(184,74,74,0.12)] text-[#8f2f2f] border-[rgba(184,74,74,0.3)]",
    burgundy: "bg-[rgba(100,31,43,0.1)] text-[var(--burgundy)] border-[rgba(100,31,43,0.25)]",
    dark: "bg-[rgba(11,18,32,0.08)] text-[var(--ink)] border-[rgba(11,18,32,0.16)]"
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

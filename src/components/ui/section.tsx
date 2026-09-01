import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 md:px-10 lg:px-16 py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-[1240px]">{children}</div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  intro,
  align = "left",
  dark = false,
  className
}: {
  kicker?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker ? (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="eyebrow-line" aria-hidden="true" />
          <span className={cn("text-kicker", dark && "text-[var(--gold-soft)]")}>{kicker}</span>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl md:text-5xl font-medium leading-[1.05] tracking-tight",
          dark ? "text-white" : "text-[var(--ink)]"
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-base md:text-lg max-w-2xl leading-relaxed",
            dark ? "text-white/70" : "text-[var(--muted)]",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-kicker",
        light && "text-[var(--gold-soft)]"
      )}
    >
      <span className="eyebrow-line" aria-hidden="true" />
      {children}
    </span>
  );
}

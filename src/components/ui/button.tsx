"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "glass" | "outline";

export function Btn({
  children,
  className,
  variant = "solid",
  type = "button"
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit";
}) {
  const classes =
    variant === "solid" ? "btn-solid" : variant === "glass" ? "btn-glass" : "btn-outline";
  return (
    <button type={type} className={cn(classes, className)}>
      {children}
    </button>
  );
}

export function btnClasses(variant: Variant = "solid", className?: string) {
  const classes =
    variant === "solid" ? "btn-solid" : variant === "glass" ? "btn-glass" : "btn-outline";
  return cn(classes, className);
}

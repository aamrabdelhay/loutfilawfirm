import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/routing";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dirForLocale(locale: string): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleValue<T>(locale: string, obj: T, field: string): string {
  const v = (obj as Record<string, unknown>)[field + locale.charAt(0).toUpperCase() + locale.slice(1)];
  return typeof v === "string" ? v : (obj as Record<string, unknown>)[field + "En"] as string ?? "";
}

export function formatDate(value: string | null | undefined, locale: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : locale === "fr" ? "fr-FR" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(d);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isPhone(value: string) {
  const cleaned = value.replace(/[\s()+-]/g, "");
  // Egyptian numbers: 0 followed by 10 digits, or +20 followed by 10 digits.
  // Also accept general 8-15 digit international numbers so we don't reject
  // legitimate international callers.
  return /^\d{8,15}$/.test(cleaned);
}

export function safeUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const u = new URL(value);
    if (u.protocol === "http:" || u.protocol === "https:") {
      return u.href;
    }
  } catch {
    return null;
  }
  return null;
}

export function parsePhones(value: string) {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

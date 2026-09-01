"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LANGS = [
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" }
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md px-1 py-1",
        compact && "px-0.5 py-0.5"
      )}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: l.code as "ar" | "en" | "fr" })}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wider transition-colors",
            compact && "px-2 py-0.5",
            locale === l.code
              ? "bg-white text-[var(--ink)]"
              : "text-white/70 hover:text-white"
          )}
          aria-current={locale === l.code ? "true" : undefined}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

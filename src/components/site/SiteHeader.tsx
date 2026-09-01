"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu, X, LockKeyhole } from "lucide-react";

const NAV = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/practice-areas", key: "practice" },
  { href: "/news", key: "news" },
  { href: "/achievements", key: "achievements" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" }
] as const;

export function SiteHeader({ content = {} }: { content?: Record<string, string> }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const label = (key: string) => (content && content[`nav.${key}`]) || t(key as "home" | "about" | "practice" | "news" | "achievements" | "media" | "careers" | "contact" | "menu" | "close" | "openMenu");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "no-print fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-[rgba(11,18,32,0.78)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 lg:px-16 h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex flex-col leading-none" aria-label={t("home")}>
            <span className="font-serif text-white text-[1.05rem] tracking-[0.08em]">
              DR. HOSSAM LOUTFI
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[var(--gold-soft)]">
              Law Firm
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm transition-colors",
                  isActive(item.href)
                    ? "text-[var(--gold-soft)]"
                    : "text-white/75 hover:text-white"
                )}
              >
                {label(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <a
              href="/admin/login"
              aria-label={t("adminOpen") ?? "Admin"}
              title={t("adminOpen") ?? "Admin"}
              className="hidden lg:inline-flex items-center justify-center h-9 w-9 rounded-full border border-[rgba(255,255,255,0.14)] text-white/50 hover:text-white/90 hover:border-[rgba(255,255,255,0.3)] transition-colors"
            >
              <LockKeyhole size={15} />
            </a>
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-[rgba(255,255,255,0.18)] text-white"
              onClick={() => setOpen(true)}
              aria-label={label("openMenu")}
              aria-expanded={open}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          className="no-print fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={label("menu")}
        >
          <div
            className="absolute inset-0 bg-[rgba(11,18,32,0.72)] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 w-[88%] max-w-sm bg-[var(--navy-soft)] text-white border-s border-[rgba(255,255,255,0.1)] p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-[var(--gold-soft)]">
                {label("menu")}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-full border border-white/20 text-white"
                aria-label={label("close")}
              >
                <X size={18} className="mx-auto" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-serif text-2xl py-2 border-b border-white/10",
                    isActive(item.href) ? "text-[var(--gold-soft)]" : "text-white"
                  )}
                >
                  {label(item.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-8 flex flex-col gap-4">
              <LanguageSwitcher />
              <a
                href="/admin/login"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white/90"
              >
                <LockKeyhole size={13} /> Admin
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Inbox, Newspaper, Award, Video, Scale, MapPin, Settings,
  Menu, X, ExternalLink, FileText, Image as ImageIcon, Languages
} from "lucide-react";

const NAV = [
  { href: "/admin", key: "dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", key: "applications", icon: Inbox },
  { href: "/admin/news", key: "news", icon: Newspaper },
  { href: "/admin/achievements", key: "achievements", icon: Award },
  { href: "/admin/media", key: "media", icon: Video },
  { href: "/admin/practice", key: "practice", icon: Scale },
  { href: "/admin/offices", key: "offices", icon: MapPin },
  { href: "/admin/gallery", key: "gallery", icon: ImageIcon },
  { href: "/admin/content", key: "content", icon: FileText },
  { href: "/admin/settings", key: "settings", icon: Settings }
] as const;

const TEXT = {
  en: { administration: "Administration", dashboard: "Dashboard", applications: "Applications", news: "News", achievements: "Achievements", media: "Media", practice: "Practice Areas", offices: "Offices", gallery: "Gallery", content: "Site Content", settings: "Settings", site: "Site", logout: "Logout", language: "Language" },
  ar: { administration: "إدارة الموقع", dashboard: "لوحة التحكم", applications: "الطلبات", news: "الأخبار", achievements: "الإنجازات", media: "المرئيات", practice: "مجالات الممارسة", offices: "المكاتب", gallery: "معرض الصور", content: "محتوى الموقع", settings: "الإعدادات", site: "الموقع", logout: "تسجيل الخروج", language: "اللغة" },
  fr: { administration: "Administration", dashboard: "Tableau de bord", applications: "Candidatures", news: "Actualités", achievements: "Distinctions", media: "Médias", practice: "Domaines de pratique", offices: "Bureaux", gallery: "Galerie", content: "Contenu du site", settings: "Paramètres", site: "Site", logout: "Déconnexion", language: "Langue" }
} as const;

type AdminLocale = keyof typeof TEXT;

export function AdminShell({ user, children }: { user: { name: string; email: string }; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<AdminLocale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("hl-admin-locale") as AdminLocale | null;
    if (saved && saved in TEXT) setLocale(saved);
  }, []);

  const changeLocale = (next: AdminLocale) => {
    setLocale(next);
    window.localStorage.setItem("hl-admin-locale", next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };

  const tr = TEXT[locale];
  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-[var(--radius-small)] px-3 py-2.5 text-sm transition-colors", active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5")}><Icon size={17} />{tr[item.key]}</Link>;
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-[var(--warm-white)]" dir={locale === "ar" ? "rtl" : "ltr"}>
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[var(--navy)] text-white p-5 sticky top-0 h-screen">
        <div className="px-2 pb-6 border-b border-white/10"><div className="font-serif text-lg">HL Law Firm</div><div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-soft)] mt-1">{tr.administration}</div></div>
        <div className="mt-5">{nav}</div>
        <div className="mt-auto pt-5 border-t border-white/10 space-y-3">
          <div className="px-3 text-sm text-white/70">{user.name}</div><div className="px-3 text-xs text-white/40">{user.email}</div>
          <div className="px-3 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-white/10 p-1 text-[10px]" aria-label={tr.language}><Languages size={12} className="mx-1 text-white/40" />
              {(["ar", "en", "fr"] as const).map((l) => <button key={l} onClick={() => changeLocale(l)} className={cn("px-1.5 py-1 rounded-full uppercase", locale === l ? "bg-white/15 text-white" : "text-white/45 hover:text-white")}>{l}</button>)}
            </div>
          </div>
          <div className="flex gap-3 px-3 items-center"><Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white"><ExternalLink size={13} /> {tr.site}</Link><LogoutButton label={tr.logout} /></div>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 md:hidden bg-[var(--navy)] text-white h-16 flex items-center justify-between px-5"><div><div className="font-serif text-base leading-none">HL</div><div className="text-[9px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">{tr.administration}</div></div><div className="flex items-center gap-2"><div className="flex gap-0.5 rounded-full border border-white/10 p-1">{(["ar", "en", "fr"] as const).map((l) => <button key={l} onClick={() => changeLocale(l)} className={cn("px-1.5 py-1 rounded-full text-[9px] uppercase", locale === l ? "bg-white/15 text-white" : "text-white/45")}>{l}</button>)}</div><button className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={18} /> : <Menu size={18} />}</button></div></header>
        {open ? <div className="md:hidden bg-[var(--navy)] text-white px-5 py-4 border-b border-white/10">{nav}<div className="mt-5 flex justify-between items-center border-t border-white/10 pt-4 text-xs text-white/50"><Link href="/" className="hover:text-white">{tr.site}</Link><LogoutButton label={tr.logout} /></div></div> : null}
        <main className="p-5 md:p-8 lg:p-10 max-w-[1320px] mx-auto">{children}</main>
      </div>
    </div>
  );
}

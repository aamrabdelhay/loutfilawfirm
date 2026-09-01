"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Inbox,
  Newspaper,
  Award,
  Video,
  Scale,
  MapPin,
  Settings,
  Menu,
  X,
  ExternalLink,
  FileText,
  Image as ImageIcon
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/applications", label: "Applications", icon: Inbox },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/achievements", label: "Achievements", icon: Award },
  { href: "/admin/media", label: "Media", icon: Video },
  { href: "/admin/practice", label: "Practice Areas", icon: Scale },
  { href: "/admin/offices", label: "Offices", icon: MapPin },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/content", label: "Site Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({
  user,
  children
}: {
  user: { name: string; email: string };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-[var(--radius-small)] px-3 py-2.5 text-sm transition-colors",
              active ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <Icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-[var(--warm-white)]">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[var(--navy)] text-white p-5 sticky top-0 h-screen">
        <div className="px-2 pb-6 border-b border-white/10">
          <div className="font-serif text-lg">HL Law Firm</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold-soft)] mt-1">
            Administration
          </div>
        </div>
        <div className="mt-5">{nav}</div>
        <div className="mt-auto pt-5 border-t border-white/10 space-y-3">
          <div className="px-3 text-sm text-white/70">{user.name}</div>
          <div className="px-3 text-xs text-white/40">{user.email}</div>
          <div className="flex gap-2 px-3 items-center">
            <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white">
              <ExternalLink size={13} /> Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile top */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 md:hidden bg-[var(--navy)] text-white h-16 flex items-center justify-between px-5">
          <div>
            <div className="font-serif text-base leading-none">HL</div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--gold-soft)]">Admin</div>
          </div>
          <button
            className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>
        {open ? (
          <div className="md:hidden bg-[var(--navy)] text-white px-5 py-4 border-b border-white/10">
            {nav}
            <div className="mt-5 flex justify-between items-center border-t border-white/10 pt-4 text-xs text-white/50">
              <span>{user.name}</span>
              <LogoutButton />
            </div>
          </div>
        ) : null}

        <main className="p-5 md:p-8 lg:p-10 max-w-[1320px] mx-auto">{children}</main>
      </div>
    </div>
  );
}

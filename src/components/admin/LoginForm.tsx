"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { LockKeyhole } from "lucide-react";

const TEXT = {
  en: { title: "Administration", subtitle: "Reserved access", password: "Password", placeholder: "Enter your password", signIn: "Sign in", error: "The password is incorrect.", language: "Language" },
  ar: { title: "إدارة الموقع", subtitle: "دخول مخصص للإدارة", password: "كلمة المرور", placeholder: "أدخل كلمة المرور", signIn: "تسجيل الدخول", error: "كلمة المرور غير صحيحة.", language: "اللغة" },
  fr: { title: "Administration", subtitle: "Accès réservé", password: "Mot de passe", placeholder: "Saisissez votre mot de passe", signIn: "Se connecter", error: "Le mot de passe est incorrect.", language: "Langue" }
} as const;

type Locale = keyof typeof TEXT;

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [locale, setLocale] = useState<Locale>("en");
  const t = TEXT[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem("hl-admin-locale") as Locale | null;
    if (saved && saved in TEXT) setLocale(saved);
  }, []);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("hl-admin-locale", nextLocale);
    document.documentElement.lang = nextLocale;
    document.documentElement.dir = nextLocale === "ar" ? "rtl" : "ltr";
  };

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    setError("");
    startTransition(async () => {
      const res = await loginAction(form);
      if (!res.ok) { setError(t.error); return; }
      router.push(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    });
  };

  return <div className="w-full max-w-md" dir={locale === "ar" ? "rtl" : "ltr"}>
    <div className="flex justify-center mb-5"><div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1" aria-label={t.language}>{(["ar", "en", "fr"] as const).map((l) => <button key={l} type="button" onClick={() => changeLocale(l)} className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider ${locale === l ? "bg-white/15 text-white" : "text-white/45 hover:text-white"}`}>{l}</button>)}</div></div>
    <div className="text-center mb-8"><div className="inline-flex h-14 w-14 rounded-2xl bg-white/8 border border-white/15 text-[var(--gold-soft)] items-center justify-center"><LockKeyhole size={24} /></div><h1 className="mt-5 font-serif text-3xl text-white">{t.title}</h1><p className="mt-2 text-sm text-white/55">{t.subtitle}</p></div>
    <form onSubmit={submit} className="glass-panel p-8 space-y-5">
      {error ? <p role="alert" className="rounded-[var(--radius-small)] bg-[rgba(184,74,74,0.12)] text-[#b84a4a] px-4 py-3 text-sm">{error}</p> : null}
      <div><label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">{t.password}</label><input id="password" name="password" type="password" required autoComplete="current-password" autoFocus className="w-full rounded-[var(--radius-small)] border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none" placeholder={t.placeholder} /></div>
      <button type="submit" className="btn-solid w-full" disabled={pending}>{pending ? "…" : t.signIn}</button>
    </form>
  </div>;
}

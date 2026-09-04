"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { LockKeyhole } from "lucide-react";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    setError("");
    startTransition(async () => {
      const res = await loginAction(form);
      if (!res.ok) {
        setError("Password is incorrect.");
        return;
      }
      router.push(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    });
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 rounded-2xl bg-white/8 border border-white/15 text-[var(--gold-soft)] items-center justify-center">
          <LockKeyhole size={24} />
        </div>
        <h1 className="mt-5 font-serif text-3xl text-white">Administration</h1>
        <p className="mt-2 text-sm text-white/55">Reserved access</p>
      </div>

      <form onSubmit={submit} className="glass-panel p-8 space-y-5">
        {error ? (
          <p role="alert" className="rounded-[var(--radius-small)] bg-[rgba(184,74,74,0.12)] text-[#b84a4a] px-4 py-3 text-sm">
            {error}
          </p>
        ) : null}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            autoFocus
            className="w-full rounded-[var(--radius-small)] border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--gold)] focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn-solid w-full" disabled={pending}>
          {pending ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton({ label = "Logout" }: { label?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const logout = () => {
    if (typeof window !== "undefined" && window.localStorage.getItem("hl-admin-dirty") === "1") {
      const leave = window.confirm("لديك تعديلات غير محفوظة. إذا سجلت الخروج الآن ستظل محفوظة على هذا الجهاز لتذكيرك بها عند العودة. هل تريد تسجيل الخروج؟");
      if (!leave) return;
    }
    startTransition(async () => {
      await logoutAction();
      router.push("/");
      router.refresh();
    });
  };

  return <button type="button" className="inline-flex items-center gap-1.5 text-xs text-white/65 hover:text-white disabled:opacity-50" disabled={pending} onClick={logout}><LogOut size={13} /> {pending ? "…" : label}</button>;
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton({ label = "Logout" }: { label?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white disabled:opacity-50"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logoutAction();
          router.push("/");
          router.refresh();
        })
      }
    >
      <LogOut size={13} /> {pending ? "…" : label}
    </button>
  );
}

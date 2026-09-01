"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  setApplicationStatusAction,
  deleteApplicationAction
} from "@/app/actions/admin";
import type { ApplicationStatus } from "@/lib/db/types";
import { Select } from "@/components/ui/field";
import { Trash2 } from "lucide-react";

export function ApplicationDetailActions({
  id,
  initialStatus
}: {
  id: string;
  initialStatus: ApplicationStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<ApplicationStatus>(initialStatus || "NEW");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
        className="w-auto min-w-[180px] min-h-[44px]"
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="REJECTED">Rejected</option>
      </Select>
      <button
        className="btn-solid min-h-[44px] text-sm"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await setApplicationStatusAction(id, status);
            router.refresh();
          })
        }
      >
        Update status
      </button>
      <button
        className="btn-outline min-h-[44px] text-sm text-[var(--error)] border-[rgba(184,74,74,0.3)]"
        disabled={pending}
        onClick={() => {
          if (!confirm("Are you sure you want to delete this application?")) return;
          startTransition(async () => {
            await deleteApplicationAction(id);
            router.push("/admin/applications");
          });
        }}
      >
        <Trash2 size={15} /> Delete
      </button>
    </div>
  );
}

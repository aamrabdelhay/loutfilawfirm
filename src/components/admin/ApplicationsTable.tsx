"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  setApplicationStatusAction,
  deleteApplicationAction
} from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { Application, ApplicationStatus } from "@/lib/db/types";
import { Send, Check, X, Eye } from "lucide-react";

const STATUSES: ApplicationStatus[] = ["NEW", "CONTACTED", "ACCEPTED", "REJECTED"];

export function ApplicationsTable({ applications }: { applications: Application[] }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const setStatus = (id: string, status: ApplicationStatus) => {
    setBusy(id);
    startTransition(async () => {
      await setApplicationStatusAction(id, status);
      setBusy(null);
    });
  };

  const remove = (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    setBusy(id);
    startTransition(async () => {
      await deleteApplicationAction(id);
      setBusy(null);
    });
  };

  return (
    <div className="admin-surface overflow-hidden">
      <div className="table-scroll">
        <table className="table-firm w-full">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id} className={busy === a.id || pending ? "opacity-60" : ""}>
                <td>
                  <div className="font-medium">{a.fullName}</div>
                  <div className="text-xs text-[var(--muted)]">{a.email} · {a.phone}</div>
                </td>
                <td>
                  <span className="text-xs uppercase tracking-wider">{a.type}</span>
                </td>
                <td>
                  <select
                    value={a.status}
                    onChange={(e) => setStatus(a.id, e.target.value as ApplicationStatus)}
                    className="rounded-[var(--radius-small)] border border-[rgba(22,26,32,0.16)] bg-white px-2 py-1.5 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="text-xs text-[var(--muted)]">{formatDate(a.createdAt, "en")}</td>
                <td>
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/applications/${a.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]"
                      aria-label="View"
                    >
                      <Eye size={14} />
                    </Link>
                    <button
                      onClick={() => remove(a.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,74,74,0.25)] text-[var(--error)] hover:bg-[rgba(184,74,74,0.08)]"
                      aria-label="Delete"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!applications.length ? (
        <div className="p-10 text-center text-[var(--muted)]">No applications found.</div>
      ) : null}
      <div className="flex items-center gap-2 px-6 py-4 text-xs text-[var(--muted)]">
        <Send size={12} />
        Select a status to update. Applications are never exposed on the public site.
      </div>
    </div>
  );
}

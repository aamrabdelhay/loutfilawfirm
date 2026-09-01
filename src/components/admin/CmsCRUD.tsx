"use client";

import { useState, useTransition } from "react";
import {
  saveEntity,
  deleteEntity,
  setEntityFlag,
  type EntityTable
} from "@/app/actions/adminContent";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Plus, X, Eye, EyeOff, Star, ArrowUp, ArrowDown } from "lucide-react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "number" | "checkbox" | "url" | "date";
  options?: Array<{ value: string; label: string }>;
  full?: boolean;
};

export function CmsCRUD({
  table,
  title,
  columns,
  fields,
  rows
}: {
  table: EntityTable;
  title: string;
  columns: string[];
  fields: FieldDef[];
  rows: Array<Record<string, unknown> & { id: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const empty = (): Record<string, unknown> => {
    const v: Record<string, unknown> = {};
    fields.forEach((f) => (v[f.name] = f.type === "checkbox" ? false : f.type === "number" ? 0 : ""));
    return v;
  };

  const startNew = () => {
    setEditing(empty());
    setOpen(true);
    setError("");
  };

  const startEdit = (row: Record<string, unknown>) => {
    setEditing({ ...row });
    setOpen(true);
    setError("");
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!editing) return;
    const payload = { ...editing };
    if (editing.id) payload.id = editing.id;
    setError("");
    startTransition(async () => {
      const res = await saveEntity(table, payload);
      if (!res.ok) {
        setError(res.error || "server");
      } else {
        setOpen(false);
        setEditing(null);
      }
    });
  };

  const remove = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    startTransition(async () => {
      await deleteEntity(table, id);
    });
  };

  const toggleFlag = (row: Record<string, unknown>, flag: "published" | "featured") => {
    const id = row.id as string;
    const cur = Boolean(row[flag]);
    startTransition(async () => {
      await setEntityFlag(table, id, flag, !cur);
    });
  };

  const move = (row: Record<string, unknown>, delta: number, rowIndex: number) => {
    // Reorder is handled by editing the order number in the form for simplicity.
    void row;
    void delta;
    void rowIndex;
  };

  const fieldValue = (row: Record<string, unknown>, name: string) => {
    const v = row[name];
    if (name === "published" || name === "featured") return v ? "Yes" : "No";
    if (typeof v === "number") return String(v);
    if (v && typeof v === "object") return JSON.stringify(v);
    return String(v ?? "");
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{title}</h1>
        </div>
        <button onClick={startNew} className="btn-solid min-h-[44px] text-sm">
          <Plus size={16} /> New
        </button>
      </div>

      <div className="admin-surface overflow-hidden">
        <div className="table-scroll">
          <table className="table-firm w-full">
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id as string} className={pending ? "opacity-60" : ""}>
                  {columns.map((c) => (
                    <td key={c} className="max-w-[260px]">
                      <span className="line-clamp-2 text-sm">{fieldValue(row, c)}</span>
                    </td>
                  ))}
                  <td>
                    <div className="flex justify-end gap-1">
                      {(row.published !== undefined && table !== "SiteSettings") ? (
                        <button
                          onClick={() => toggleFlag(row, "published")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]"
                          aria-label="Toggle publish"
                        >
                          {row.published ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                      ) : null}
                      {(row.featured !== undefined && table !== "SiteSettings") ? (
                        <button
                          onClick={() => toggleFlag(row, "featured")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]"
                          aria-label="Toggle featured"
                        >
                          <Star size={14} className={row.featured ? "fill-[var(--gold)] text-[var(--gold)]" : ""} />
                        </button>
                      ) : null}
                      <button
                        onClick={() => {
                          startEdit(row);
                          void move(row, 0, i);
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      {table !== "SiteSettings" ? (
                        <button
                          onClick={() => remove(row.id as string)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,74,74,0.25)] text-[var(--error)] hover:bg-[rgba(184,74,74,0.08)]"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!rows.length ? (
          <div className="p-10 text-center text-[var(--muted)]">No items found.</div>
        ) : null}
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs text-[var(--muted)]">
        <ArrowUp size={12} /> <ArrowDown size={12} /> Use the order field in the editor for ordering.
      </div>

      {open && editing ? (
        <div className="fixed inset-0 z-[70] bg-[rgba(11,18,32,0.55)] backdrop-blur-sm flex items-start justify-center overflow-auto p-4 md:p-8" role="dialog" aria-modal="true">
          <div className="w-full max-w-3xl bg-[var(--warm-white)] rounded-[var(--radius-large)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[rgba(22,26,32,0.1)] p-6">
              <h2 className="font-serif text-2xl">{editing.id ? "Edit" : "New"} — {title}</h2>
              <button onClick={() => setOpen(false)} className="h-10 w-10 rounded-full border border-[rgba(22,26,32,0.16)]" aria-label="Close">
                <X size={16} className="mx-auto" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 grid gap-4 md:grid-cols-2">
              {fields.map((f) => {
                const value = editing[f.name];
                const idName = f.name;
                if (f.type === "checkbox") {
                  return (
                    <label key={idName} className="flex items-center gap-2 md:col-span-2 text-sm">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => setEditing({ ...editing, [idName]: e.target.checked })}
                      />
                      {f.label}
                    </label>
                  );
                }
                return (
                  <div key={idName} className={cn(f.full ? "md:col-span-2" : "")}>
                    <label htmlFor={`crud-${idName}`} className="block text-sm font-medium mb-2">{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={`crud-${idName}`}
                        value={String(value ?? "")}
                        onChange={(e) => setEditing({ ...editing, [idName]: e.target.value })}
                        className="field min-h-[120px]"
                      />
                    ) : f.type === "select" ? (
                      <select
                        id={`crud-${idName}`}
                        value={String(value ?? "")}
                        onChange={(e) => setEditing({ ...editing, [idName]: e.target.value })}
                        className="field"
                      >
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : f.type === "number" ? (
                      <input
                        id={`crud-${idName}`}
                        type="number"
                        value={Number(value ?? 0)}
                        onChange={(e) => setEditing({ ...editing, [idName]: Number(e.target.value) })}
                        className="field"
                      />
                    ) : (
                      <input
                        id={`crud-${idName}`}
                        type={f.type === "date" ? "date" : f.type === "url" ? "url" : "text"}
                        value={String(value ?? "")}
                        onChange={(e) => setEditing({ ...editing, [idName]: e.target.value })}
                        className="field"
                      />
                    )}
                  </div>
                );
              })}
              {error ? <p role="alert" className="md:col-span-2 text-sm text-[var(--error)]">{error}</p> : null}
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="btn-outline min-h-[44px] text-sm">Cancel</button>
                <button type="submit" className="btn-solid min-h-[44px] text-sm" disabled={pending}>
                  {pending ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

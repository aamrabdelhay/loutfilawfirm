"use client";

import { useEffect, useState, useTransition } from "react";
import { saveEntity, deleteEntity, setEntityFlag, type EntityTable } from "@/app/actions/adminContent";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Plus, X, Eye, EyeOff, Star, ArrowUp, ArrowDown, Image as ImageIcon, AlertTriangle } from "lucide-react";

export type FieldDef = { name: string; label: string; type?: "text" | "textarea" | "select" | "number" | "checkbox" | "url" | "image" | "date"; options?: Array<{ value: string; label: string }>; full?: boolean };

const DRAFT_PREFIX = "hl-admin-draft:";
const DIRTY_KEY = "hl-admin-dirty";

export function CmsCRUD({ table, title, columns, fields, rows }: { table: EntityTable; title: string; columns: string[]; fields: FieldDef[]; rows: Array<Record<string, unknown> & { id: string }> }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [draftNotice, setDraftNotice] = useState(false);

  const empty = () => { const v: Record<string, unknown> = {}; fields.forEach((f) => (v[f.name] = f.type === "checkbox" ? false : f.type === "number" ? 0 : "")); return v; };
  const draftKey = `${DRAFT_PREFIX}${table}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (raw) setDraftNotice(true);
    } catch { /* localStorage may be unavailable */ }
  }, [draftKey]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (window.localStorage.getItem(DIRTY_KEY) === "1") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const markDirty = (next: Record<string, unknown>) => {
    setEditing(next);
    try {
      window.localStorage.setItem(draftKey, JSON.stringify(next));
      window.localStorage.setItem(DIRTY_KEY, "1");
      window.localStorage.setItem("hl-admin-dirty-table", table);
    } catch { /* ignore storage failures */ }
  };

  const clearDraft = () => {
    try {
      window.localStorage.removeItem(draftKey);
      window.localStorage.removeItem(DIRTY_KEY);
      window.localStorage.removeItem("hl-admin-dirty-table");
    } catch { /* ignore storage failures */ }
    setDraftNotice(false);
  };

  const startNew = () => {
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (raw) {
        const saved = JSON.parse(raw) as Record<string, unknown>;
        setEditing(saved);
        setOpen(true);
        setError("");
        setDraftNotice(false);
        return;
      }
    } catch { /* ignore invalid draft */ }
    setEditing(empty()); setOpen(true); setError("");
  };

  const startEdit = (row: Record<string, unknown>) => {
    setEditing({ ...row });
    setOpen(true);
    setError("");
  };

  const closeWithoutSaving = () => {
    const hasDraft = Boolean(window.localStorage.getItem(draftKey));
    if (hasDraft && !window.confirm("لديك تعديلات غير محفوظة. هل تريد إغلاق المحرر مع الاحتفاظ بها للعودة إليها لاحقاً؟")) return;
    setOpen(false);
    setDraftNotice(hasDraft);
  };

  const discardDraft = () => {
    if (!window.confirm("هل تريد حذف التعديلات غير المحفوظة؟ لن يمكن استعادتها.")) return;
    clearDraft();
    setEditing(null);
    setOpen(false);
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!editing) return;
    const payload = { ...editing };
    if (editing.id) payload.id = editing.id;
    setError("");
    startTransition(async () => {
      const res = await saveEntity(table, payload);
      if (!res.ok) setError(res.error || "server");
      else {
        clearDraft();
        setOpen(false);
        setEditing(null);
      }
    });
  };

  const remove = (id: string) => { if (!window.confirm("Are you sure you want to delete this item?")) return; startTransition(async () => { await deleteEntity(table, id); }); };
  const toggleFlag = (row: Record<string, unknown>, flag: "published" | "featured") => { const id = row.id as string; const cur = Boolean(row[flag]); startTransition(async () => { await setEntityFlag(table, id, flag, !cur); }); };
  const fieldValue = (row: Record<string, unknown>, name: string) => { const v = row[name]; if (name === "published" || name === "featured") return v ? "Yes" : "No"; if (typeof v === "number") return String(v); if (v && typeof v === "object") return JSON.stringify(v); return String(v ?? ""); };

  return <div>
    {draftNotice ? <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[var(--radius-small)] border border-[rgba(168,137,82,.35)] bg-[rgba(168,137,82,.08)] px-4 py-3 text-sm text-[var(--ink)]"><div className="flex items-center gap-2"><AlertTriangle size={16} className="shrink-0 text-[var(--gold)]" /><span>لديك تعديلات غير محفوظة من جلسة سابقة.</span></div><div className="flex gap-2"><button type="button" onClick={startNew} className="btn-solid min-h-[38px] text-xs">متابعة التعديل</button><button type="button" onClick={discardDraft} className="btn-outline min-h-[38px] text-xs">حذف التعديلات</button></div></div> : null}
    <div className="flex items-center justify-between gap-4 mb-6"><h1 className="font-serif text-3xl md:text-4xl">{title}</h1><button onClick={startNew} className="btn-solid min-h-[44px] text-sm"><Plus size={16} /> New</button></div>
    <div className="admin-surface overflow-hidden"><div className="table-scroll"><table className="table-firm w-full"><thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}<th className="text-end">Actions</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} className={pending ? "opacity-60" : ""}>{columns.map((c) => <td key={c} className="max-w-[260px]"><span className="line-clamp-2 text-sm">{fieldValue(row, c)}</span></td>)}<td><div className="flex justify-end gap-1">{row.published !== undefined && table !== "SiteSettings" ? <button onClick={() => toggleFlag(row, "published")} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]" aria-label="Toggle publish">{row.published ? <Eye size={14} /> : <EyeOff size={14} />}</button> : null}{row.featured !== undefined && table !== "SiteSettings" ? <button onClick={() => toggleFlag(row, "featured")} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]" aria-label="Toggle featured"><Star size={14} className={row.featured ? "fill-[var(--gold)] text-[var(--gold)]" : ""} /></button> : null}<button onClick={() => startEdit(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(22,26,32,0.12)] text-[var(--muted)] hover:text-[var(--ink)]" aria-label="Edit"><Pencil size={14} /></button>{table !== "SiteSettings" ? <button onClick={() => remove(row.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(184,74,74,0.25)] text-[var(--error)] hover:bg-[rgba(184,74,74,0.08)]" aria-label="Delete"><Trash2 size={14} /></button> : null}</div></td></tr>)}</tbody></table></div>{!rows.length ? <div className="p-10 text-center text-[var(--muted)]">No items found.</div> : null}</div>
    <div className="mt-4 flex items-center gap-3 text-xs text-[var(--muted)]"><ArrowUp size={12} /><ArrowDown size={12} /> Use the order field in the editor for ordering.</div>
    {open && editing ? <div className="fixed inset-0 z-[70] bg-[rgba(11,18,32,0.55)] backdrop-blur-sm flex items-start justify-center overflow-auto p-4 md:p-8" role="dialog" aria-modal="true"><div className="w-full max-w-3xl bg-[var(--warm-white)] rounded-[var(--radius-large)] shadow-2xl"><div className="flex items-center justify-between border-b border-[rgba(22,26,32,0.1)] p-6"><h2 className="font-serif text-2xl">{editing.id ? "Edit" : "New"} — {title}</h2><button onClick={closeWithoutSaving} className="h-10 w-10 rounded-full border border-[rgba(22,26,32,0.16)]" aria-label="Close"><X size={16} className="mx-auto" /></button></div><form onSubmit={submit} className="p-6 grid gap-4 md:grid-cols-2">{fields.map((f) => { const value = editing[f.name]; const idName = f.name; if (f.type === "checkbox") return <label key={idName} className="flex items-center gap-2 md:col-span-2 text-sm"><input type="checkbox" checked={Boolean(value)} onChange={(e) => markDirty({ ...editing, [idName]: e.target.checked })} />{f.label}</label>; if (f.type === "image") return <div key={idName} className={cn(f.full ? "md:col-span-2" : "")}><label htmlFor={`crud-${idName}`} className="block text-sm font-medium mb-2">{f.label}</label><div className="flex items-center gap-2"><ImageIcon size={16} className="text-[var(--muted)]" /><input id={`crud-${idName}`} type="url" value={String(value ?? "")} onChange={(e) => markDirty({ ...editing, [idName]: e.target.value })} className="field flex-1" placeholder="https://… or /images/…" /></div>{String(value ?? "").trim() ? <div className="mt-3 overflow-hidden rounded-[var(--radius-small)] border border-[rgba(22,26,32,0.12)] bg-white"><img src={String(value)} alt="Selected preview" className="h-48 w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /><div className="px-3 py-2 text-xs text-[var(--muted)]">Image preview</div></div> : <div className="mt-3 flex h-28 items-center justify-center rounded-[var(--radius-small)] border border-dashed border-[rgba(22,26,32,0.16)] text-xs text-[var(--muted)]">Image preview will appear here</div>}</div>; return <div key={idName} className={cn(f.full ? "md:col-span-2" : "")}><label htmlFor={`crud-${idName}`} className="block text-sm font-medium mb-2">{f.label}</label>{f.type === "textarea" ? <textarea id={`crud-${idName}`} value={String(value ?? "")} onChange={(e) => markDirty({ ...editing, [idName]: e.target.value })} className="field min-h-[120px]" /> : f.type === "select" ? <select id={`crud-${idName}`} value={String(value ?? "")} onChange={(e) => markDirty({ ...editing, [idName]: e.target.value })} className="field">{f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select> : f.type === "number" ? <input id={`crud-${idName}`} type="number" value={Number(value ?? 0)} onChange={(e) => markDirty({ ...editing, [idName]: Number(e.target.value) })} className="field" /> : <input id={`crud-${idName}`} type={f.type === "date" ? "date" : f.type === "url" ? "url" : "text"} value={String(value ?? "")} onChange={(e) => markDirty({ ...editing, [idName]: e.target.value })} className="field" />}</div>; })}<div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-3 pt-2"><button type="button" onClick={discardDraft} className="btn-outline min-h-[44px] text-sm">Discard changes</button><div className="flex justify-end gap-3"><button type="button" onClick={closeWithoutSaving} className="btn-outline min-h-[44px] text-sm">Cancel</button><button type="submit" className="btn-solid min-h-[44px] text-sm" disabled={pending}>{pending ? "Saving…" : "Save"}</button></div></div></form></div></div> : null}
  </div>;
}

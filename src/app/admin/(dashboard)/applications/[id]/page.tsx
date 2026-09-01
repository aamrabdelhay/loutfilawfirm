import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplication } from "@/lib/db/repo";
import { ApplicationDetailActions } from "@/components/admin/ApplicationDetailActions";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function ApplicationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = getApplication(id);
  if (!app) notFound();

  return (
    <div>
      <Link href="/admin/applications" className="text-sm text-[var(--burgundy)] hover:underline">
        ← Applications
      </Link>
      <div className="mt-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">{app.fullName}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone="burgundy">{app.type}</Badge>
            <Badge tone={app.status === "ACCEPTED" ? "green" : app.status === "REJECTED" ? "red" : app.status === "CONTACTED" ? "gold" : "neutral"}>
              {app.status}
            </Badge>
          </div>
        </div>
        <ApplicationDetailActions id={app.id} initialStatus={app.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="admin-surface p-6 space-y-5">
          <h2 className="font-serif text-2xl">Contact</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Email</div>
              <a href={`mailto:${app.email}`} className="break-all text-[var(--burgundy)] hover:underline">{app.email}</a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Phone</div>
              <a href={`tel:${app.phone}`} className="text-[var(--burgundy)] hover:underline">{app.phone}</a>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">University</div>
              <div>{app.university}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Academic year</div>
              <div>{app.academicYear || "—"}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">LinkedIn</div>
              <div>{app.linkedin || "—"}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Received</div>
              <div>{formatDate(app.createdAt, "en")}</div>
            </div>
          </div>
          {app.motivation ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)]">Motivation</div>
              <p className="mt-2 text-sm whitespace-pre-wrap">{app.motivation}</p>
            </div>
          ) : null}
        </div>

        <div className="admin-surface overflow-hidden">
          <div className="p-6 border-b border-[rgba(22,26,32,0.08)]">
            <h2 className="font-serif text-2xl">Experience history</h2>
          </div>
          <div className="divide-y divide-[rgba(22,26,32,0.06)]">
            {app.experiences.length ? (
              app.experiences.map((e, i) => (
                <div key={e.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg">{e.organization}</span>
                    <span className="text-xs text-[var(--muted)]">{e.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--muted)]">{e.description}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[var(--muted)]">No experience entries.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

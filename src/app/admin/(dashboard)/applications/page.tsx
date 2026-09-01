import Link from "next/link";
import { listApplications, ApplicationQuery } from "@/lib/db/repo";
import { ApplicationsTable } from "@/components/admin/ApplicationsTable";
import { Download } from "lucide-react";

export default async function AdminApplicationsPage({
  searchParams
}: {
  searchParams: Promise<{ type?: string; status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const query: ApplicationQuery = {
    type: sp.type === "TRAINING" || sp.type === "JOB" ? sp.type : undefined,
    status:
      sp.status === "NEW" || sp.status === "CONTACTED" || sp.status === "ACCEPTED" || sp.status === "REJECTED"
        ? sp.status
        : undefined,
    search: sp.q || undefined,
    limit: 200
  };
  const applications = listApplications(query);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Applications</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Manage training and job applications.</p>
        </div>
        <a
          href={`/admin/applications/export?${new URLSearchParams({
            type: query.type || "",
            status: query.status || "",
            q: query.search || ""
          }).toString()}`}
          className="btn-outline min-h-[44px] text-sm"
        >
          <Download size={15} /> Export CSV
        </a>
      </div>

      <form className="mt-6 admin-surface p-4 grid gap-3 md:grid-cols-4">
        <input
          name="q"
          defaultValue={query.search}
          placeholder="Search name, email, phone…"
          className="field md:col-span-2 min-h-[44px]"
        />
        <select name="type" defaultValue={query.type || ""} className="field min-h-[44px]">
          <option value="">All types</option>
          <option value="TRAINING">Training</option>
          <option value="JOB">Job</option>
        </select>
        <select name="status" defaultValue={query.status || ""} className="field min-h-[44px]">
          <option value="">All statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <div className="md:col-span-4 flex items-center justify-end">
          <button type="submit" className="btn-solid min-h-[44px] text-sm">Filter</button>
        </div>
      </form>

      <div className="mt-6">
        <ApplicationsTable applications={applications} />
      </div>
      <div className="mt-6">
        <Link href="/admin" className="text-sm text-[var(--burgundy)] hover:underline">← Back to dashboard</Link>
      </div>
    </div>
  );
}

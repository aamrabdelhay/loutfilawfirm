import Link from "next/link";
import { listApplications, countNews, listNews, listAchievements, listMedia, listPracticeAreas, listOffices, listGalleryImages, getSettings } from "@/lib/db/repo";
import { formatDate } from "@/lib/utils";
import { Inbox, Newspaper, Award, Video, Scale, MapPin, Image as ImageIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const apps = listApplications({ limit: 100 });
  const training = apps.filter((a) => a.type === "TRAINING");
  const jobs = apps.filter((a) => a.type === "JOB");
  const recent = [...apps].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
  const settings = getSettings();

  const cards = [
    { label: "New applications", value: apps.filter((a) => a.status === "NEW").length, icon: Inbox },
    { label: "Training applications", value: training.length, icon: Scale },
    { label: "Job applications", value: jobs.length, icon: Inbox },
    { label: "Published news", value: countNews({ onlyPublished: true }), icon: Newspaper },
    { label: "Achievements", value: listAchievements(true).length, icon: Award },
    { label: "Media", value: listMedia(true).length, icon: Video },
    { label: "Practice areas", value: listPracticeAreas(true).length, icon: Scale },
    { label: "Offices", value: listOffices(true).length, icon: MapPin },
    { label: "Gallery images", value: listGalleryImages(true).length, icon: ImageIcon }
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Firm administration · {settings.contactEmail}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="admin-surface p-5">
              <div className="inline-flex h-9 w-9 rounded-full bg-[rgba(168,137,82,0.12)] text-[var(--gold)] items-center justify-center">
                <Icon size={16} />
              </div>
              <div className="mt-4 font-serif text-3xl">{c.value}</div>
              <div className="mt-1 text-xs text-[var(--muted)]">{c.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 admin-surface">
        <div className="p-6 border-b border-[rgba(22,26,32,0.08)] flex items-center justify-between">
          <h2 className="font-serif text-xl">Recent applications</h2>
          <Link href="/admin/applications" className="text-sm text-[var(--burgundy)] hover:underline">
            View all
          </Link>
        </div>
        {recent.length ? (
          <div className="table-scroll">
            <table className="table-firm w-full">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <div className="font-medium">{a.fullName}</div>
                      <div className="text-xs text-[var(--muted)]">{a.email}</div>
                    </td>
                    <td>{a.type}</td>
                    <td>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                        a.status === "ACCEPTED" ? "bg-[rgba(79,155,114,0.12)] text-[#2f6e4b]" :
                        a.status === "REJECTED" ? "bg-[rgba(184,74,74,0.12)] text-[#8f2f2f]" :
                        a.status === "CONTACTED" ? "bg-[rgba(168,137,82,0.12)] text-[#7a5d2d]" :
                        "bg-[rgba(11,18,32,0.08)] text-[var(--ink)]"
                      }`}>{a.status}</span>
                    </td>
                    <td className="text-xs text-[var(--muted)]">{formatDate(a.createdAt, "en")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center text-[var(--muted)]">No applications yet.</div>
        )}
      </div>
    </div>
  );
}

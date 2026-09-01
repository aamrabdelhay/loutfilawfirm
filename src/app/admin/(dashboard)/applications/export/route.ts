import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { listApplications, type ApplicationQuery } from "@/lib/db/repo";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const url = new URL(request.url);
  const query: ApplicationQuery = {
    type:
      url.searchParams.get("type") === "TRAINING" ||
      url.searchParams.get("type") === "JOB"
        ? (url.searchParams.get("type") as ApplicationQuery["type"])
        : undefined,
    status: ["NEW", "CONTACTED", "ACCEPTED", "REJECTED"].includes(
      url.searchParams.get("status") || ""
    )
      ? (url.searchParams.get("status") as ApplicationQuery["status"])
      : undefined,
    search: url.searchParams.get("q") || undefined,
    limit: 5000
  };

  const rows = listApplications(query);
  const header = [
    "id",
    "type",
    "fullName",
    "university",
    "academicYear",
    "phone",
    "email",
    "linkedin",
    "motivation",
    "status",
    "createdAt",
    "experience"
  ];
  const lines = [
    header.join(","),
    ...rows.map((a) =>
      [
        a.id,
        a.type,
        a.fullName,
        a.university,
        a.academicYear || "",
        a.phone,
        a.email,
        a.linkedin || "",
        a.motivation || "",
        a.status,
        a.createdAt,
        a.experiences
          .map((e) => `${e.organization} | ${e.duration} | ${e.description}`)
          .join("; ")
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
  ].join("\n");

  return new Response("\uFEFF" + lines, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="applications-${Date.now()}.csv"`
    }
  });
}

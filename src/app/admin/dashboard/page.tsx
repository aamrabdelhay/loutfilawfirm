import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboardRedirect() {
  await requireUser().catch(() => null);
  redirect("/admin");
}

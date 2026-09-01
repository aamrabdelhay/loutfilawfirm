import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  robots: { index: false, follow: false }
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser().catch(() => null);
  if (!user) redirect("/admin/login");

  return (
    <AdminShell user={{ name: user.name, email: user.email }}>
      {children}
    </AdminShell>
  );
}

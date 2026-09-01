import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { next } = await searchParams;
  const user = await getCurrentUser();
  if (user) redirect("/admin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--navy)] px-6 py-12">
      <LoginForm next={next} />
    </div>
  );
}

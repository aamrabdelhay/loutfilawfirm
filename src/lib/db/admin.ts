import "server-only";
import { getDb } from "./client";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  passwordHash: string;
};

export function getAdminUser(): AdminUser | null {
  const row = getDb()
    .prepare('SELECT id, email, name, role, "passwordHash" FROM "User" WHERE role = ? ORDER BY "createdAt" ASC LIMIT 1')
    .get("ADMIN") as
    | { id: string; email: string; name: string; role: string; passwordHash: string }
    | undefined;

  return row ?? null;
}

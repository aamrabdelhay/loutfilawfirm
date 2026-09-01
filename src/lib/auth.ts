import "server-only";
import { cookies } from "next/headers";
import { getSessionUser } from "@/lib/db/repo";
import type { User } from "@/lib/db/types";

export async function requireUser(): Promise<User> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hl_session")?.value;
  const user = getSessionUser(token);
  if (!user) {
    throw new Error("UNAUTHORIZED");
  }
  return user;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hl_session")?.value;
  return getSessionUser(token);
}

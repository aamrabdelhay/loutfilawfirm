"use server";

import { cookies } from "next/headers";
import {
  createSession,
  deleteSession,
  getUserByEmail,
  verifyPassword
} from "@/lib/db/repo";

export interface LoginResult {
  ok: boolean;
  error?: "invalid" | "server";
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const password = String(formData.get("password") || "");
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@loutfilawfirm.net").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "hl";

  const user = getUserByEmail(adminEmail);
  const validPassword = user
    ? verifyPassword(password, user.passwordHash) || password === adminPassword
    : false;

  if (!user || !validPassword) {
    return { ok: false, error: "invalid" };
  }

  try {
    const session = createSession(user.id);
    const cookieStore = await cookies();
    cookieStore.set("hl_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    });
  } catch {
    return { ok: false, error: "server" };
  }

  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("hl_session")?.value;
  deleteSession(token);
  cookieStore.delete("hl_session");
}

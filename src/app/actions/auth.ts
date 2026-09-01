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
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const user = getUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
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

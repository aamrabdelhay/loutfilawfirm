"use server";

import { revalidatePath } from "next/cache";
import { setApplicationStatus, deleteApplication } from "@/lib/db/repo";
import type { ApplicationStatus } from "@/lib/db/types";
import { getCurrentUser } from "@/lib/auth";

export async function setApplicationStatusAction(
  id: string,
  status: ApplicationStatus
) {
  const user = await getCurrentUser();
  if (!user) return;
  setApplicationStatus(id, status);
  revalidatePath("/admin/applications");
}

export async function deleteApplicationAction(id: string) {
  const user = await getCurrentUser();
  if (!user) return;
  deleteApplication(id);
  revalidatePath("/admin/applications");
}

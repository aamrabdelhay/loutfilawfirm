import "server-only";
import { getSettings, listOffices } from "@/lib/db/repo";
import type { OfficeLocation, SiteSettings } from "@/lib/db/types";

export interface SiteData {
  settings: SiteSettings;
  offices: OfficeLocation[];
}

export async function getSiteData(): Promise<SiteData> {
  const [settings, offices] = await Promise.all([
    Promise.resolve(getSettings()),
    Promise.resolve(listOffices(true))
  ]);
  return { settings, offices };
}

export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

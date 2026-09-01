import "server-only";
import { getContentMap } from "@/lib/db/repo";

export type ContentMap = Record<string, string>;

export function getSiteContent(locale: string): ContentMap {
  return getContentMap((["en", "ar", "fr"] as const).includes(locale as "en" | "ar" | "fr") ? (locale as "en" | "ar" | "fr") : "en");
}

export function cv(map: ContentMap, key: string, fallback: string) {
  return map[key] && map[key].trim().length > 0 ? map[key] : fallback;
}

import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";
import { locales } from "@/i18n/routing";
import { listNews, getSettings } from "@/lib/db/repo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const news = listNews({ onlyPublished: true, limit: 200 });
  const staticRoutes = [
    "",
    "/about",
    "/practice-areas",
    "/news",
    "/achievements",
    "/media",
    "/careers",
    "/contact",
    "/gallery"
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${base}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7
      });
    }
    const suffix = locale[0].toUpperCase() + locale.slice(1);
    for (const n of news) {
      const slug = (n as unknown as Record<string, string>)[`slug${suffix}`] || n.slugEn;
      entries.push({
        url: `${base}/${locale}/news/${slug}`,
        lastModified: new Date(n.updatedAt),
        changeFrequency: "monthly",
        priority: 0.6
      });
    }
  }

  return entries;
}

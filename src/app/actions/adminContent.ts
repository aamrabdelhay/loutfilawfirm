"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import type { AchievementType } from "@/lib/db/types";
import {
  upsertNews,
  deleteNews,
  setNewsPublished,
  setNewsFeatured,
  upsertAchievement,
  deleteAchievement,
  setAchievementPublished,
  upsertMedia,
  deleteMedia,
  setMediaPublished,
  upsertPractice,
  deletePractice,
  reorderPractice,
  upsertOffice,
  deleteOffice,
  reorderOffice,
  upsertGallery,
  deleteGallery,
  reorderGallery,
  upsertContent,
  deleteContentEntry,
  updateSettings,
  extractYouTubeId
} from "@/lib/db/repo";

export type EntityTable =
  | "News"
  | "Achievement"
  | "Media"
  | "PracticeArea"
  | "OfficeLocation"
  | "GalleryImage"
  | "ContentEntry"
  | "SiteSettings";

const str = z.string().trim().optional();
const bool = z.coerce.boolean().optional();
const num = z.coerce.number().int().optional();

const schemas: Record<EntityTable, z.ZodTypeAny> = {
  News: z.object({
    id: str,
    slugEn: str,
    slugAr: str,
    slugFr: str,
    titleEn: str,
    titleAr: str,
    titleFr: str,
    excerptEn: str,
    excerptAr: str,
    excerptFr: str,
    contentEn: str,
    contentAr: str,
    contentFr: str,
    image: str,
    author: str,
    publishedAt: str,
    published: bool,
    featured: bool,
    seoTitleEn: str,
    seoTitleAr: str,
    seoTitleFr: str,
    seoDescEn: str,
    seoDescAr: str,
    seoDescFr: str
  }),
  Achievement: z.object({
    id: str,
    titleEn: str,
    titleAr: str,
    titleFr: str,
    descriptionEn: str,
    descriptionAr: str,
    descriptionFr: str,
    type: str,
    image: str,
    url: str,
    date: str,
    featured: bool,
    published: bool
  }),
  Media: z.object({
    id: str,
    titleEn: str,
    titleAr: str,
    titleFr: str,
    url: str,
    mediaType: str,
    thumbnail: str,
    published: bool
  }),
  PracticeArea: z.object({
    id: str,
    nameEn: str,
    nameAr: str,
    nameFr: str,
    descriptionEn: str,
    descriptionAr: str,
    descriptionFr: str,
    icon: str,
    image: str,
    order: num,
    published: bool,
    confirmed: bool
  }),
  OfficeLocation: z.object({
    id: str,
    nameEn: str,
    nameAr: str,
    nameFr: str,
    addressEn: str,
    addressAr: str,
    addressFr: str,
    mapUrl: str,
    phones: str,
    email: str,
    order: num,
    published: bool
  }),
  GalleryImage: z.object({
    id: str,
    altEn: str,
    altAr: str,
    altFr: str,
    image: str,
    order: num,
    published: bool,
    isPlaceholder: bool
  }),
  ContentEntry: z.object({
    id: str,
    key: str,
    group: str,
    label: str,
    valueEn: str,
    valueAr: str,
    valueFr: str,
    order: num
  }),
  SiteSettings: z.object({
    id: str,
    firmNameEn: str,
    firmNameAr: str,
    firmNameFr: str,
    taglineEn: str,
    taglineAr: str,
    taglineFr: str,
    contactEmail: str,
    mainPhones: str,
    faxPhones: str,
    mobilePhone: str,
    socialLinks: str,
    footerEn: str,
    footerAr: str,
    footerFr: str,
    defaultSeoTitleEn: str,
    defaultSeoTitleAr: str,
    defaultSeoTitleFr: str,
    defaultSeoDescEn: str,
    defaultSeoDescAr: str,
    defaultSeoDescFr: str,
    heroIntroEn: str,
    heroIntroAr: str,
    heroIntroFr: str,
    homeLeadTitleEn: str,
    homeLeadTitleAr: str,
    homeLeadTitleFr: str,
    homeLeadBodyEn: str,
    homeLeadBodyAr: str,
    homeLeadBodyFr: str,
    homeSectionTitleEn: str,
    homeSectionTitleAr: str,
    homeSectionTitleFr: str,
    homeSectionBodyEn: str,
    homeSectionBodyAr: str,
    homeSectionBodyFr: str,
    aboutIntroEn: str,
    aboutIntroAr: str,
    aboutIntroFr: str,
    aboutPhilosophyEn: str,
    aboutPhilosophyAr: str,
    aboutPhilosophyFr: str,
    aboutApproachEn: str,
    aboutApproachAr: str,
    aboutApproachFr: str,
    aboutPresenceTitleEn: str,
    aboutPresenceTitleAr: str,
    aboutPresenceTitleFr: str,
    aboutAreasTitleEn: str,
    aboutAreasTitleAr: str,
    aboutAreasTitleFr: str,
    aboutProfileEn: str,
    aboutProfileAr: str,
    aboutProfileFr: str,
    heroImage: str,
    aboutImage: str,
    sectionImage: str
  })
};

export async function saveEntity(
  table: EntityTable,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "auth" };

  const parsed = schemas[table].safeParse(payload);
  if (!parsed.success) return { ok: false, error: "invalid" };
  // zod output is validated; we coerce to any internally to keep the mapping readable.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = parsed.data as Record<string, any>;

  try {
    if (table === "News") {
      upsertNews({
        id: data.id || undefined,
        slugEn: data.slugEn || "",
        slugAr: data.slugAr || "",
        slugFr: data.slugFr || "",
        titleEn: data.titleEn || "",
        titleAr: data.titleAr || "",
        titleFr: data.titleFr || "",
        excerptEn: data.excerptEn || "",
        excerptAr: data.excerptAr || "",
        excerptFr: data.excerptFr || "",
        contentEn: data.contentEn || "",
        contentAr: data.contentAr || "",
        contentFr: data.contentFr || "",
        image: data.image || null,
        author: data.author || null,
        publishedAt: data.publishedAt || null,
        published: Boolean(data.published),
        featured: Boolean(data.featured),
        seoTitleEn: data.seoTitleEn || null,
        seoTitleAr: data.seoTitleAr || null,
        seoTitleFr: data.seoTitleFr || null,
        seoDescEn: data.seoDescEn || null,
        seoDescAr: data.seoDescAr || null,
        seoDescFr: data.seoDescFr || null
      });
      revalidatePath("/admin/news");
    } else if (table === "Achievement") {
      upsertAchievement({
        id: data.id || undefined,
        titleEn: data.titleEn || "",
        titleAr: data.titleAr || "",
        titleFr: data.titleFr || "",
        descriptionEn: data.descriptionEn || "",
        descriptionAr: data.descriptionAr || "",
        descriptionFr: data.descriptionFr || "",
        type: String(data.type || "MILESTONE") as AchievementType,
        image: data.image || null,
        url: data.url || null,
        date: data.date || null,
        featured: Boolean(data.featured),
        published: Boolean(data.published)
      });
      revalidatePath("/admin/achievements");
    } else if (table === "Media") {
      const url = data.url || "";
      upsertMedia({
        id: data.id || undefined,
        titleEn: data.titleEn || "",
        titleAr: data.titleAr || "",
        titleFr: data.titleFr || "",
        url,
        mediaType: String(data.mediaType || "VIDEO"),
        youtubeId: extractYouTubeId(url),
        thumbnail: data.thumbnail || null,
        published: Boolean(data.published)
      });
      revalidatePath("/admin/media");
    } else if (table === "PracticeArea") {
      upsertPractice({
        id: data.id || undefined,
        nameEn: data.nameEn || "",
        nameAr: data.nameAr || "",
        nameFr: data.nameFr || "",
        descriptionEn: data.descriptionEn || "",
        descriptionAr: data.descriptionAr || "",
        descriptionFr: data.descriptionFr || "",
        icon: data.icon || null,
        image: data.image || null,
        order: Number(data.order || 0),
        published: Boolean(data.published),
        confirmed: Boolean(data.confirmed)
      });
      revalidatePath("/admin/practice");
    } else if (table === "OfficeLocation") {
      upsertOffice({
        id: data.id || undefined,
        nameEn: data.nameEn || "",
        nameAr: data.nameAr || "",
        nameFr: data.nameFr || "",
        addressEn: data.addressEn || "",
        addressAr: data.addressAr || "",
        addressFr: data.addressFr || "",
        mapUrl: data.mapUrl || null,
        phones: data.phones || null,
        email: data.email || null,
        order: Number(data.order || 0),
        published: Boolean(data.published)
      });
      revalidatePath("/admin/offices");
    } else if (table === "GalleryImage") {
      upsertGallery({
        id: data.id || undefined,
        altEn: data.altEn || "",
        altAr: data.altAr || "",
        altFr: data.altFr || "",
        image: data.image || "",
        order: Number(data.order || 0),
        published: Boolean(data.published),
        isPlaceholder: Boolean(data.isPlaceholder ?? true)
      });
      revalidatePath("/admin/gallery");
    } else if (table === "ContentEntry") {
      upsertContent({
        id: data.id || undefined,
        key: data.key || "",
        group: data.group || "Content",
        label: data.label || "",
        valueEn: data.valueEn || "",
        valueAr: data.valueAr || "",
        valueFr: data.valueFr || "",
        order: Number(data.order || 0)
      });
      revalidatePath("/admin/content");
      revalidatePath("/");
    } else if (table === "SiteSettings") {
      updateSettings({
        firmNameEn: data.firmNameEn || "",
        firmNameAr: data.firmNameAr || "",
        firmNameFr: data.firmNameFr || "",
        taglineEn: data.taglineEn || "",
        taglineAr: data.taglineAr || "",
        taglineFr: data.taglineFr || "",
        contactEmail: data.contactEmail || "",
        mainPhones: data.mainPhones || "",
        faxPhones: data.faxPhones || "",
        mobilePhone: data.mobilePhone || "",
        socialLinks: data.socialLinks || "{}",
        footerEn: data.footerEn || "",
        footerAr: data.footerAr || "",
        footerFr: data.footerFr || "",
        defaultSeoTitleEn: data.defaultSeoTitleEn || "",
        defaultSeoTitleAr: data.defaultSeoTitleAr || "",
        defaultSeoTitleFr: data.defaultSeoTitleFr || "",
        defaultSeoDescEn: data.defaultSeoDescEn || "",
        defaultSeoDescAr: data.defaultSeoDescAr || "",
        defaultSeoDescFr: data.defaultSeoDescFr || "",
        heroIntroEn: data.heroIntroEn || "",
        heroIntroAr: data.heroIntroAr || "",
        heroIntroFr: data.heroIntroFr || "",
        homeLeadTitleEn: data.homeLeadTitleEn || "",
        homeLeadTitleAr: data.homeLeadTitleAr || "",
        homeLeadTitleFr: data.homeLeadTitleFr || "",
        homeLeadBodyEn: data.homeLeadBodyEn || "",
        homeLeadBodyAr: data.homeLeadBodyAr || "",
        homeLeadBodyFr: data.homeLeadBodyFr || "",
        homeSectionTitleEn: data.homeSectionTitleEn || "",
        homeSectionTitleAr: data.homeSectionTitleAr || "",
        homeSectionTitleFr: data.homeSectionTitleFr || "",
        homeSectionBodyEn: data.homeSectionBodyEn || "",
        homeSectionBodyAr: data.homeSectionBodyAr || "",
        homeSectionBodyFr: data.homeSectionBodyFr || "",
        aboutIntroEn: data.aboutIntroEn || "",
        aboutIntroAr: data.aboutIntroAr || "",
        aboutIntroFr: data.aboutIntroFr || "",
        aboutPhilosophyEn: data.aboutPhilosophyEn || "",
        aboutPhilosophyAr: data.aboutPhilosophyAr || "",
        aboutPhilosophyFr: data.aboutPhilosophyFr || "",
        aboutApproachEn: data.aboutApproachEn || "",
        aboutApproachAr: data.aboutApproachAr || "",
        aboutApproachFr: data.aboutApproachFr || "",
        aboutPresenceTitleEn: data.aboutPresenceTitleEn || "",
        aboutPresenceTitleAr: data.aboutPresenceTitleAr || "",
        aboutPresenceTitleFr: data.aboutPresenceTitleFr || "",
        aboutAreasTitleEn: data.aboutAreasTitleEn || "",
        aboutAreasTitleAr: data.aboutAreasTitleAr || "",
        aboutAreasTitleFr: data.aboutAreasTitleFr || "",
        aboutProfileEn: data.aboutProfileEn || "",
        aboutProfileAr: data.aboutProfileAr || "",
        aboutProfileFr: data.aboutProfileFr || "",
        heroImage: data.heroImage || "",
        aboutImage: data.aboutImage || "",
        sectionImage: data.sectionImage || ""
      });
      revalidatePath("/admin/settings");
      revalidatePath("/");
    }
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "server" };
  }
}

export async function deleteEntity(table: EntityTable, id: string) {
  const user = await getCurrentUser();
  if (!user) return;
  if (table === "News") deleteNews(id);
  else if (table === "Achievement") deleteAchievement(id);
  else if (table === "Media") deleteMedia(id);
  else if (table === "PracticeArea") deletePractice(id);
  else if (table === "OfficeLocation") deleteOffice(id);
  else if (table === "GalleryImage") deleteGallery(id);
  else if (table === "ContentEntry") {
    deleteContentEntry(id);
    revalidatePath("/");
  }
  if (table !== "SiteSettings") revalidatePath("/admin");
}

export async function setEntityFlag(
  table: EntityTable,
  id: string,
  field: "published" | "featured",
  value: boolean
) {
  const user = await getCurrentUser();
  if (!user) return;
  if (table === "News") {
    if (field === "published") setNewsPublished(id, value);
    else setNewsFeatured(id, value);
  } else if (table === "Achievement") {
    if (field === "published") setAchievementPublished(id, value);
  } else if (table === "Media") {
    if (field === "published") setMediaPublished(id, value);
  }
  revalidatePath("/admin");
  revalidatePath(`/admin/${table.toLowerCase()}`);
}

export async function reorderEntity(table: EntityTable, id: string, order: number) {
  const user = await getCurrentUser();
  if (!user) return;
  if (table === "PracticeArea") reorderPractice(id, order);
  else if (table === "OfficeLocation") reorderOffice(id, order);
  else if (table === "GalleryImage") reorderGallery(id, order);
  revalidatePath(`/admin/${table.toLowerCase()}`);
}

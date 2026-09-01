import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { getDb, nowIso, type DB, type JsonValue } from "./client";
import type {
  Achievement,
  AchievementType,
  Application,
  ApplicationStatus,
  ApplicationType,
  ContentEntry,
  Experience,
  GalleryImage,
  MediaItem,
  News,
  OfficeLocation,
  PracticeArea,
  Session,
  SiteSettings,
  User
} from "./types";

/* ----------------------------- helpers ----------------------------- */

type Row = Record<string, unknown>;

function toBool(value: unknown): boolean {
  return value === 1 || value === true || value === "1" || value === "true";
}

function mapNews(row: Row): News {
  return {
    id: String(row.id),
    slugEn: String(row.slugEn),
    slugAr: String(row.slugAr),
    slugFr: String(row.slugFr),
    titleEn: String(row.titleEn),
    titleAr: String(row.titleAr),
    titleFr: String(row.titleFr),
    excerptEn: String(row.excerptEn),
    excerptAr: String(row.excerptAr),
    excerptFr: String(row.excerptFr),
    contentEn: String(row.contentEn),
    contentAr: String(row.contentAr),
    contentFr: String(row.contentFr),
    image: row.image ? String(row.image) : null,
    author: row.author ? String(row.author) : null,
    publishedAt: row.publishedAt ? String(row.publishedAt) : null,
    published: toBool(row.published),
    featured: toBool(row.featured),
    seoTitleEn: row.seoTitleEn ? String(row.seoTitleEn) : null,
    seoTitleAr: row.seoTitleAr ? String(row.seoTitleAr) : null,
    seoTitleFr: row.seoTitleFr ? String(row.seoTitleFr) : null,
    seoDescEn: row.seoDescEn ? String(row.seoDescEn) : null,
    seoDescAr: row.seoDescAr ? String(row.seoDescAr) : null,
    seoDescFr: row.seoDescFr ? String(row.seoDescFr) : null,
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapAchievement(row: Row): Achievement {
  return {
    id: String(row.id),
    titleEn: String(row.titleEn),
    titleAr: String(row.titleAr),
    titleFr: String(row.titleFr),
    descriptionEn: String(row.descriptionEn),
    descriptionAr: String(row.descriptionAr),
    descriptionFr: String(row.descriptionFr),
    type: String(row.type) as AchievementType,
    image: row.image ? String(row.image) : null,
    url: row.url ? String(row.url) : null,
    date: row.date ? String(row.date) : null,
    featured: toBool(row.featured),
    published: toBool(row.published),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapPractice(row: Row): PracticeArea {
  return {
    id: String(row.id),
    nameEn: String(row.nameEn),
    nameAr: String(row.nameAr),
    nameFr: String(row.nameFr),
    descriptionEn: String(row.descriptionEn),
    descriptionAr: String(row.descriptionAr),
    descriptionFr: String(row.descriptionFr),
    icon: row.icon ? String(row.icon) : null,
    image: row.image ? String(row.image) : null,
    order: Number(row.order),
    published: toBool(row.published),
    confirmed: toBool(row.confirmed ?? false),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapMedia(row: Row): MediaItem {
  return {
    id: String(row.id),
    titleEn: String(row.titleEn),
    titleAr: String(row.titleAr),
    titleFr: String(row.titleFr),
    url: String(row.url),
    mediaType: String(row.mediaType),
    youtubeId: row.youtubeId ? String(row.youtubeId) : null,
    thumbnail: row.thumbnail ? String(row.thumbnail) : null,
    published: toBool(row.published),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapOffice(row: Row): OfficeLocation {
  return {
    id: String(row.id),
    nameEn: String(row.nameEn),
    nameAr: String(row.nameAr),
    nameFr: String(row.nameFr),
    addressEn: String(row.addressEn),
    addressAr: String(row.addressAr),
    addressFr: String(row.addressFr),
    mapUrl: row.mapUrl ? String(row.mapUrl) : null,
    phones: row.phones ? String(row.phones) : null,
    email: row.email ? String(row.email) : null,
    order: Number(row.order),
    published: toBool(row.published),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapSettings(row: Row): SiteSettings {
  return {
    id: String(row.id),
    firmNameEn: String(row.firmNameEn ?? ""),
    firmNameAr: String(row.firmNameAr ?? ""),
    firmNameFr: String(row.firmNameFr ?? ""),
    taglineEn: String(row.taglineEn ?? ""),
    taglineAr: String(row.taglineAr ?? ""),
    taglineFr: String(row.taglineFr ?? ""),
    contactEmail: String(row.contactEmail ?? ""),
    mainPhones: String(row.mainPhones ?? ""),
    faxPhones: String(row.faxPhones ?? ""),
    mobilePhone: String(row.mobilePhone ?? ""),
    socialLinks: String(row.socialLinks ?? "{}"),
    footerEn: String(row.footerEn ?? ""),
    footerAr: String(row.footerAr ?? ""),
    footerFr: String(row.footerFr ?? ""),
    defaultSeoTitleEn: String(row.defaultSeoTitleEn ?? ""),
    defaultSeoTitleAr: String(row.defaultSeoTitleAr ?? ""),
    defaultSeoTitleFr: String(row.defaultSeoTitleFr ?? ""),
    defaultSeoDescEn: String(row.defaultSeoDescEn ?? ""),
    defaultSeoDescAr: String(row.defaultSeoDescAr ?? ""),
    defaultSeoDescFr: String(row.defaultSeoDescFr ?? ""),
    heroIntroEn: String(row.heroIntroEn ?? ""),
    heroIntroAr: String(row.heroIntroAr ?? ""),
    heroIntroFr: String(row.heroIntroFr ?? ""),
    homeLeadTitleEn: String(row.homeLeadTitleEn ?? ""),
    homeLeadTitleAr: String(row.homeLeadTitleAr ?? ""),
    homeLeadTitleFr: String(row.homeLeadTitleFr ?? ""),
    homeLeadBodyEn: String(row.homeLeadBodyEn ?? ""),
    homeLeadBodyAr: String(row.homeLeadBodyAr ?? ""),
    homeLeadBodyFr: String(row.homeLeadBodyFr ?? ""),
    homeSectionTitleEn: String(row.homeSectionTitleEn ?? ""),
    homeSectionTitleAr: String(row.homeSectionTitleAr ?? ""),
    homeSectionTitleFr: String(row.homeSectionTitleFr ?? ""),
    homeSectionBodyEn: String(row.homeSectionBodyEn ?? ""),
    homeSectionBodyAr: String(row.homeSectionBodyAr ?? ""),
    homeSectionBodyFr: String(row.homeSectionBodyFr ?? ""),
    aboutIntroEn: String(row.aboutIntroEn ?? ""),
    aboutIntroAr: String(row.aboutIntroAr ?? ""),
    aboutIntroFr: String(row.aboutIntroFr ?? ""),
    aboutPhilosophyEn: String(row.aboutPhilosophyEn ?? ""),
    aboutPhilosophyAr: String(row.aboutPhilosophyAr ?? ""),
    aboutPhilosophyFr: String(row.aboutPhilosophyFr ?? ""),
    aboutApproachEn: String(row.aboutApproachEn ?? ""),
    aboutApproachAr: String(row.aboutApproachAr ?? ""),
    aboutApproachFr: String(row.aboutApproachFr ?? ""),
    aboutPresenceTitleEn: String(row.aboutPresenceTitleEn ?? ""),
    aboutPresenceTitleAr: String(row.aboutPresenceTitleAr ?? ""),
    aboutPresenceTitleFr: String(row.aboutPresenceTitleFr ?? ""),
    aboutAreasTitleEn: String(row.aboutAreasTitleEn ?? ""),
    aboutAreasTitleAr: String(row.aboutAreasTitleAr ?? ""),
    aboutAreasTitleFr: String(row.aboutAreasTitleFr ?? ""),
    aboutProfileEn: String(row.aboutProfileEn ?? ""),
    aboutProfileAr: String(row.aboutProfileAr ?? ""),
    aboutProfileFr: String(row.aboutProfileFr ?? ""),
    heroImage: String(row.heroImage ?? ""),
    aboutImage: String(row.aboutImage ?? ""),
    sectionImage: String(row.sectionImage ?? ""),
    updatedAt: String(row.updatedAt)
  };
}

function mapUser(row: Row): User {
  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    role: String(row.role),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

function mapExperience(row: Row): Experience {
  return {
    id: String(row.id),
    applicationId: String(row.applicationId),
    organization: String(row.organization),
    duration: String(row.duration),
    description: String(row.description),
    order: Number(row.order)
  };
}

function mapApplication(row: Row): Application {
  return {
    id: String(row.id),
    type: String(row.type) as ApplicationType,
    fullName: String(row.fullName),
    university: String(row.university),
    academicYear: row.academicYear ? String(row.academicYear) : null,
    phone: String(row.phone),
    email: String(row.email),
    linkedin: row.linkedin ? String(row.linkedin) : null,
    motivation: row.motivation ? String(row.motivation) : null,
    status: String(row.status) as ApplicationStatus,
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt),
    experiences: []
  };
}

type SqlValue = string | number | bigint | null | Uint8Array;

function allRows(db: DB, sql: string, params: SqlValue[] = []): Row[] {
  return db.prepare(sql).all(...params) as unknown as Row[];
}

function firstRow(db: DB, sql: string, params: SqlValue[] = []): Row | null {
  const row = db.prepare(sql).get(...params) as unknown as Row | undefined;
  return row ?? null;
}

function sqlValue(v: JsonValue): string | number | null {
  if (v === undefined || v === null) return null;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "number") return v;
  if (Array.isArray(v) || typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function insertRow(table: string, data: Record<string, JsonValue>) {
  const db = getDb();
  const keys = Object.keys(data);
  const values = keys.map((k) => sqlValue(data[k]));
  const cols = keys.map((k) => `"${k}"`).join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  db.prepare(`INSERT INTO "${table}" (${cols}) VALUES (${placeholders})`).run(...values);
}

function updateRow(table: string, id: string, data: Record<string, JsonValue>) {
  const db = getDb();
  const keys = Object.keys(data);
  const set = keys.map((k) => `"${k}" = ?`).join(", ");
  const values = keys.map((k) => sqlValue(data[k]));
  db.prepare(`UPDATE "${table}" SET ${set} WHERE id = ?`).run(...values, id);
}

/* ----------------------------- settings ----------------------------- */

const SETTING_ID = "site";

export function ensureSettings(): SiteSettings {
  const db = getDb();
  let row = firstRow(db, 'SELECT * FROM "SiteSettings" WHERE id = ?', [SETTING_ID]);
  if (!row) {
    const ts = nowIso();
    insertRow("SiteSettings", {
      id: SETTING_ID,
      firmNameEn: "DR. HOSSAM LOUTFI",
      firmNameAr: "د. حسام لطفي",
      firmNameFr: "DR. HOSSAM LOUTFI",
      taglineEn: "",
      taglineAr: "",
      taglineFr: "",
      contactEmail: "hloutfi@loutfilawfirm.net",
      mainPhones: [
        "37606575",
        "37606584",
        "37606672",
        "33386364",
        "33354738"
      ].join(", "),
      faxPhones: ["23930289", "23929992", "33361135"].join(", "),
      mobilePhone: "0122411292",
      socialLinks: "{}",
      footerEn: "",
      footerAr: "",
      footerFr: "",
      defaultSeoTitleEn: "DR. HOSSAM LOUTFI LAW FIRM",
      defaultSeoTitleAr: "مكتب د. حسام لطفي للمحاماة",
      defaultSeoTitleFr: "CABINET D'AVOCAT DR. HOSSAM LOUTFI",
      defaultSeoDescEn: "",
      defaultSeoDescAr: "",
      defaultSeoDescFr: "",
      updatedAt: ts
    });
    row = firstRow(db, 'SELECT * FROM "SiteSettings" WHERE id = ?', [SETTING_ID]);
  }
  return mapSettings(row!);
}

export function getSettings(): SiteSettings {
  const db = getDb();
  const row = firstRow(db, 'SELECT * FROM "SiteSettings" WHERE id = ?', [SETTING_ID]);
  return row ? mapSettings(row) : ensureSettings();
}

export type SettingsInput = Partial<Omit<SiteSettings, "id">>;

export function updateSettings(data: SettingsInput): SiteSettings {
  const db = getDb();
  ensureSettings();
  const allowed = [
    "firmNameEn",
    "firmNameAr",
    "firmNameFr",
    "taglineEn",
    "taglineAr",
    "taglineFr",
    "contactEmail",
    "mainPhones",
    "faxPhones",
    "mobilePhone",
    "socialLinks",
    "footerEn",
    "footerAr",
    "footerFr",
    "defaultSeoTitleEn",
    "defaultSeoTitleAr",
    "defaultSeoTitleFr",
    "defaultSeoDescEn",
    "defaultSeoDescAr",
    "defaultSeoDescFr",
    "heroIntroEn",
    "heroIntroAr",
    "heroIntroFr",
    "homeLeadTitleEn",
    "homeLeadTitleAr",
    "homeLeadTitleFr",
    "homeLeadBodyEn",
    "homeLeadBodyAr",
    "homeLeadBodyFr",
    "homeSectionTitleEn",
    "homeSectionTitleAr",
    "homeSectionTitleFr",
    "homeSectionBodyEn",
    "homeSectionBodyAr",
    "homeSectionBodyFr",
    "aboutIntroEn",
    "aboutIntroAr",
    "aboutIntroFr",
    "aboutPhilosophyEn",
    "aboutPhilosophyAr",
    "aboutPhilosophyFr",
    "aboutApproachEn",
    "aboutApproachAr",
    "aboutApproachFr",
    "aboutPresenceTitleEn",
    "aboutPresenceTitleAr",
    "aboutPresenceTitleFr",
    "aboutAreasTitleEn",
    "aboutAreasTitleAr",
    "aboutAreasTitleFr",
    "aboutProfileEn",
    "aboutProfileAr",
    "aboutProfileFr",
    "heroImage",
    "aboutImage",
    "sectionImage"
  ];
  const patch: Record<string, JsonValue> = { updatedAt: nowIso() };
  for (const key of allowed) {
    const val = (data as Record<string, unknown>)[key];
    if (val !== undefined) patch[key] = val as JsonValue;
  }
  updateRow("SiteSettings", SETTING_ID, patch);
  return getSettings();
}

/* ----------------------------- offices ----------------------------- */

export function listOffices(onlyPublished = false): OfficeLocation[] {
  const db = getDb();
  const where = onlyPublished ? "WHERE published = 1" : "";
  return allRows(
    db,
    `SELECT * FROM "OfficeLocation" ${where} ORDER BY "order" ASC, "createdAt" ASC`
  ).map(mapOffice);
}

export function getOffice(id: string): OfficeLocation | null {
  const db = getDb();
  const row = firstRow(db, 'SELECT * FROM "OfficeLocation" WHERE id = ?', [id]);
  return row ? mapOffice(row) : null;
}

export function upsertOffice(input: Omit<OfficeLocation, "id" | "createdAt" | "updatedAt"> & { id?: string }) {
  const db = getDb();
  const ts = nowIso();
  if (input.id) {
    updateRow("OfficeLocation", input.id, {
      nameEn: input.nameEn,
      nameAr: input.nameAr,
      nameFr: input.nameFr,
      addressEn: input.addressEn,
      addressAr: input.addressAr,
      addressFr: input.addressFr,
      mapUrl: input.mapUrl,
      phones: input.phones,
      email: input.email,
      order: input.order,
      published: input.published ? 1 : 0,
      updatedAt: ts
    });
    return getOffice(input.id)!;
  }
  const id = randomUUID();
  insertRow("OfficeLocation", {
    id,
    nameEn: input.nameEn,
    nameAr: input.nameAr,
    nameFr: input.nameFr,
    addressEn: input.addressEn,
    addressAr: input.addressAr,
    addressFr: input.addressFr,
    mapUrl: input.mapUrl,
    phones: input.phones,
    email: input.email,
    order: input.order,
    published: input.published ? 1 : 0,
    createdAt: ts,
    updatedAt: ts
  });
  return getOffice(id)!;
}

export function deleteOffice(id: string) {
  getDb().prepare('DELETE FROM "OfficeLocation" WHERE id = ?').run(id);
}

export function reorderOffice(id: string, order: number) {
  updateRow("OfficeLocation", id, { order, updatedAt: nowIso() });
}

/* ----------------------------- practice areas ----------------------------- */

export function listPracticeAreas(onlyPublished = false): PracticeArea[] {
  const db = getDb();
  const where = onlyPublished ? "WHERE published = 1" : "";
  return allRows(
    db,
    `SELECT * FROM "PracticeArea" ${where} ORDER BY "order" ASC, "createdAt" ASC`
  ).map(mapPractice);
}

export function upsertPractice(
  input: Omit<PracticeArea, "id" | "createdAt" | "updatedAt"> & { id?: string }
) {
  const db = getDb();
  const ts = nowIso();
  if (input.id) {
    updateRow("PracticeArea", input.id, {
      nameEn: input.nameEn,
      nameAr: input.nameAr,
      nameFr: input.nameFr,
      descriptionEn: input.descriptionEn,
      descriptionAr: input.descriptionAr,
      descriptionFr: input.descriptionFr,
      icon: input.icon,
      image: input.image,
      order: input.order,
      published: input.published ? 1 : 0,
      confirmed: input.confirmed ? 1 : 0,
      updatedAt: ts
    });
    const row = firstRow(db, 'SELECT * FROM "PracticeArea" WHERE id = ?', [input.id]);
    return mapPractice(row!);
  }
  const id = randomUUID();
  insertRow("PracticeArea", {
    id,
    nameEn: input.nameEn,
    nameAr: input.nameAr,
    nameFr: input.nameFr,
    descriptionEn: input.descriptionEn,
    descriptionAr: input.descriptionAr,
    descriptionFr: input.descriptionFr,
    icon: input.icon,
    image: input.image,
    order: input.order,
    published: input.published ? 1 : 0,
    confirmed: input.confirmed ? 1 : 0,
    createdAt: ts,
    updatedAt: ts
  });
  const row = firstRow(db, 'SELECT * FROM "PracticeArea" WHERE id = ?', [id]);
  return mapPractice(row!);
}

export function deletePractice(id: string) {
  getDb().prepare('DELETE FROM "PracticeArea" WHERE id = ?').run(id);
}

export function reorderPractice(id: string, order: number) {
  updateRow("PracticeArea", id, { order, updatedAt: nowIso() });
}

/* ----------------------------- news ----------------------------- */

export interface NewsQuery {
  onlyPublished?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export function listNews(query: NewsQuery = {}): News[] {
  const db = getDb();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (query.onlyPublished) {
    clauses.push('published = 1 AND "publishedAt" IS NOT NULL');
  }
  if (typeof query.featured === "boolean") {
    clauses.push(`featured = ${query.featured ? 1 : 0}`);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const limit = query.limit ?? 50;
  const offset = query.offset ?? 0;
  const rows = allRows(
    db,
    `SELECT * FROM "News" ${where} ORDER BY "publishedAt" DESC, "createdAt" DESC LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  return rows.map(mapNews);
}

export function countNews(query: NewsQuery = {}): number {
  const db = getDb();
  const clauses: string[] = [];
  if (query.onlyPublished) clauses.push('published = 1 AND "publishedAt" IS NOT NULL');
  if (typeof query.featured === "boolean") clauses.push(`featured = ${query.featured ? 1 : 0}`);
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const row = firstRow(db, `SELECT COUNT(*) AS c FROM "News" ${where}`);
  return Number(row?.c ?? 0);
}

export function getNewsById(id: string): News | null {
  const row = firstRow(getDb(), 'SELECT * FROM "News" WHERE id = ?', [id]);
  return row ? mapNews(row) : null;
}

export function getNewsBySlug(locale: "en" | "ar" | "fr", slug: string): News | null {
  const col = `slug${locale.charAt(0).toUpperCase()}${locale.slice(1)}`;
  const row = firstRow(getDb(), `SELECT * FROM "News" WHERE "${col}" = ?`, [slug]);
  return row ? mapNews(row) : null;
}

export function getFeaturedNews(): News | null {
  return listNews({ onlyPublished: true, featured: true, limit: 1 })[0] ?? null;
}

export function upsertNews(
  input: Omit<News, "id" | "createdAt" | "updatedAt" | "published"> & {
    id?: string;
    published?: boolean;
  }
) {
  const db = getDb();
  const ts = nowIso();
  const publishedAt = input.published ? input.publishedAt ?? ts : null;
  if (input.id) {
    updateRow("News", input.id, {
      slugEn: input.slugEn,
      slugAr: input.slugAr,
      slugFr: input.slugFr,
      titleEn: input.titleEn,
      titleAr: input.titleAr,
      titleFr: input.titleFr,
      excerptEn: input.excerptEn,
      excerptAr: input.excerptAr,
      excerptFr: input.excerptFr,
      contentEn: input.contentEn,
      contentAr: input.contentAr,
      contentFr: input.contentFr,
      image: input.image,
      author: input.author,
      publishedAt,
      published: input.published ? 1 : 0,
      featured: input.featured ? 1 : 0,
      seoTitleEn: input.seoTitleEn,
      seoTitleAr: input.seoTitleAr,
      seoTitleFr: input.seoTitleFr,
      seoDescEn: input.seoDescEn,
      seoDescAr: input.seoDescAr,
      seoDescFr: input.seoDescFr,
      updatedAt: ts
    });
    return getNewsById(input.id)!;
  }
  const id = randomUUID();
  insertRow("News", {
    id,
    slugEn: input.slugEn,
    slugAr: input.slugAr,
    slugFr: input.slugFr,
    titleEn: input.titleEn,
    titleAr: input.titleAr,
    titleFr: input.titleFr,
    excerptEn: input.excerptEn,
    excerptAr: input.excerptAr,
    excerptFr: input.excerptFr,
    contentEn: input.contentEn,
    contentAr: input.contentAr,
    contentFr: input.contentFr,
    image: input.image,
    author: input.author,
    publishedAt,
    published: input.published ? 1 : 0,
    featured: input.featured ? 1 : 0,
    seoTitleEn: input.seoTitleEn,
    seoTitleAr: input.seoTitleAr,
    seoTitleFr: input.seoTitleFr,
    seoDescEn: input.seoDescEn,
    seoDescAr: input.seoDescAr,
    seoDescFr: input.seoDescFr,
    createdAt: ts,
    updatedAt: ts
  });
  return getNewsById(id)!;
}

export function setNewsPublished(id: string, published: boolean) {
  const ts = nowIso();
  const publishedAt = published ? ts : null;
  updateRow("News", id, { published: published ? 1 : 0, publishedAt, updatedAt: ts });
}

export function setNewsFeatured(id: string, featured: boolean) {
  updateRow("News", id, { featured: featured ? 1 : 0, updatedAt: nowIso() });
}

export function deleteNews(id: string) {
  getDb().prepare('DELETE FROM "News" WHERE id = ?').run(id);
}

/* ----------------------------- achievements ----------------------------- */

export function listAchievements(onlyPublished = false): Achievement[] {
  const db = getDb();
  const where = onlyPublished ? "WHERE published = 1" : "";
  return allRows(
    db,
    `SELECT * FROM "Achievement" ${where} ORDER BY "featured" DESC, "date" DESC, "createdAt" DESC`
  ).map(mapAchievement);
}

export function upsertAchievement(
  input: Omit<Achievement, "id" | "createdAt" | "updatedAt" | "published"> & {
    id?: string;
    published?: boolean;
  }
) {
  const db = getDb();
  const ts = nowIso();
  if (input.id) {
    updateRow("Achievement", input.id, {
      titleEn: input.titleEn,
      titleAr: input.titleAr,
      titleFr: input.titleFr,
      descriptionEn: input.descriptionEn,
      descriptionAr: input.descriptionAr,
      descriptionFr: input.descriptionFr,
      type: input.type,
      image: input.image,
      url: input.url,
      date: input.date,
      featured: input.featured ? 1 : 0,
      published: input.published ? 1 : 0,
      updatedAt: ts
    });
    const row = firstRow(db, 'SELECT * FROM "Achievement" WHERE id = ?', [input.id]);
    return mapAchievement(row!);
  }
  const id = randomUUID();
  insertRow("Achievement", {
    id,
    titleEn: input.titleEn,
    titleAr: input.titleAr,
    titleFr: input.titleFr,
    descriptionEn: input.descriptionEn,
    descriptionAr: input.descriptionAr,
    descriptionFr: input.descriptionFr,
    type: input.type,
    image: input.image,
    url: input.url,
    date: input.date,
    featured: input.featured ? 1 : 0,
    published: input.published ? 1 : 0,
    createdAt: ts,
    updatedAt: ts
  });
  const row = firstRow(db, 'SELECT * FROM "Achievement" WHERE id = ?', [id]);
  return mapAchievement(row!);
}

export function setAchievementPublished(id: string, published: boolean) {
  updateRow("Achievement", id, { published: published ? 1 : 0, updatedAt: nowIso() });
}

export function deleteAchievement(id: string) {
  getDb().prepare('DELETE FROM "Achievement" WHERE id = ?').run(id);
}

/* ----------------------------- media ----------------------------- */

export function listMedia(onlyPublished = false): MediaItem[] {
  const db = getDb();
  const where = onlyPublished ? "WHERE published = 1" : "";
  return allRows(db, `SELECT * FROM "Media" ${where} ORDER BY "createdAt" DESC`).map(mapMedia);
}

export function upsertMedia(
  input: Omit<MediaItem, "id" | "createdAt" | "updatedAt" | "published"> & {
    id?: string;
    published?: boolean;
  }
) {
  const db = getDb();
  const ts = nowIso();
  if (input.id) {
    updateRow("Media", input.id, {
      titleEn: input.titleEn,
      titleAr: input.titleAr,
      titleFr: input.titleFr,
      url: input.url,
      mediaType: input.mediaType,
      youtubeId: input.youtubeId,
      thumbnail: input.thumbnail,
      published: input.published ? 1 : 0,
      updatedAt: ts
    });
    const row = firstRow(db, 'SELECT * FROM "Media" WHERE id = ?', [input.id]);
    return mapMedia(row!);
  }
  const id = randomUUID();
  insertRow("Media", {
    id,
    titleEn: input.titleEn,
    titleAr: input.titleAr,
    titleFr: input.titleFr,
    url: input.url,
    mediaType: input.mediaType,
    youtubeId: input.youtubeId,
    thumbnail: input.thumbnail,
    published: input.published ? 1 : 0,
    createdAt: ts,
    updatedAt: ts
  });
  const row = firstRow(db, 'SELECT * FROM "Media" WHERE id = ?', [id]);
  return mapMedia(row!);
}

export function setMediaPublished(id: string, published: boolean) {
  updateRow("Media", id, { published: published ? 1 : 0, updatedAt: nowIso() });
}

export function deleteMedia(id: string) {
  getDb().prepare('DELETE FROM "Media" WHERE id = ?').run(id);
}

/* ----------------------------- gallery ----------------------------- */

function mapGallery(row: Row): GalleryImage {
  return {
    id: String(row.id),
    altEn: String(row.altEn),
    altAr: String(row.altAr),
    altFr: String(row.altFr),
    image: String(row.image),
    order: Number(row.order),
    published: toBool(row.published),
    isPlaceholder: toBool(row.isPlaceholder ?? true),
    createdAt: String(row.createdAt),
    updatedAt: String(row.updatedAt)
  };
}

export function listGalleryImages(onlyPublished = false): GalleryImage[] {
  const db = getDb();
  const where = onlyPublished ? "WHERE published = 1" : "";
  return allRows(
    db,
    `SELECT * FROM "GalleryImage" ${where} ORDER BY "order" ASC, "createdAt" ASC`
  ).map(mapGallery);
}

export function upsertGallery(
  input: Omit<GalleryImage, "id" | "createdAt" | "updatedAt"> & { id?: string }
) {
  const db = getDb();
  const ts = nowIso();
  if (input.id) {
    updateRow("GalleryImage", input.id, {
      altEn: input.altEn,
      altAr: input.altAr,
      altFr: input.altFr,
      image: input.image,
      order: input.order,
      published: input.published ? 1 : 0,
      isPlaceholder: input.isPlaceholder ? 1 : 0,
      updatedAt: ts
    });
    const row = firstRow(db, 'SELECT * FROM "GalleryImage" WHERE id = ?', [input.id]);
    return mapGallery(row!);
  }
  const id = randomUUID();
  insertRow("GalleryImage", {
    id,
    altEn: input.altEn,
    altAr: input.altAr,
    altFr: input.altFr,
    image: input.image,
    order: input.order,
    published: input.published ? 1 : 0,
    isPlaceholder: input.isPlaceholder ? 1 : 0,
    createdAt: ts,
    updatedAt: ts
  });
  const row = firstRow(db, 'SELECT * FROM "GalleryImage" WHERE id = ?', [id]);
  return mapGallery(row!);
}

export function deleteGallery(id: string) {
  getDb().prepare('DELETE FROM "GalleryImage" WHERE id = ?').run(id);
}

export function reorderGallery(id: string, order: number) {
  updateRow("GalleryImage", id, { order, updatedAt: nowIso() });
}

/* ----------------------------- applications ----------------------------- */

export interface ApplicationQuery {
  type?: ApplicationType;
  status?: ApplicationStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

export function listApplications(query: ApplicationQuery = {}): Application[] {
  const db = getDb();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (query.type) {
    clauses.push("type = ?");
    params.push(query.type);
  }
  if (query.status) {
    clauses.push("status = ?");
    params.push(query.status);
  }
  if (query.search) {
    clauses.push('(fullName LIKE ? OR email LIKE ? OR phone LIKE ? OR university LIKE ?)');
    const term = `%${query.search}%`;
    params.push(term, term, term, term);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const limit = query.limit ?? 100;
  const offset = query.offset ?? 0;
  const rows = allRows(
    db,
    `SELECT * FROM "Application" ${where} ORDER BY "createdAt" DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );
  return rows.map((row) => {
    const app = mapApplication(row);
    const expRows = allRows(
      db,
      'SELECT * FROM "Experience" WHERE "applicationId" = ? ORDER BY "order" ASC, rowid ASC',
      [app.id]
    );
    app.experiences = expRows.map(mapExperience);
    return app;
  });
}

export function countApplications(query: ApplicationQuery = {}): number {
  const db = getDb();
  const clauses: string[] = [];
  const params: Array<string | number> = [];
  if (query.type) {
    clauses.push("type = ?");
    params.push(query.type);
  }
  if (query.status) {
    clauses.push("status = ?");
    params.push(query.status);
  }
  if (query.search) {
    clauses.push('(fullName LIKE ? OR email LIKE ? OR phone LIKE ? OR university LIKE ?)');
    const term = `%${query.search}%`;
    params.push(term, term, term, term);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const row = firstRow(db, `SELECT COUNT(*) AS c FROM "Application" ${where}`, params);
  return Number(row?.c ?? 0);
}

export function getApplication(id: string): Application | null {
  const db = getDb();
  const row = firstRow(db, 'SELECT * FROM "Application" WHERE id = ?', [id]);
  if (!row) return null;
  const app = mapApplication(row);
  const expRows = allRows(
    db,
    'SELECT * FROM "Experience" WHERE "applicationId" = ? ORDER BY "order" ASC, rowid ASC',
    [app.id]
  );
  app.experiences = expRows.map(mapExperience);
  return app;
}

export type NewApplication = {
  type: ApplicationType;
  fullName: string;
  university: string;
  academicYear?: string | null;
  phone: string;
  email: string;
  linkedin?: string | null;
  motivation?: string | null;
  experiences: Array<{ organization: string; duration: string; description: string }>;
};

export function createApplication(input: NewApplication): Application {
  const db = getDb();
  const ts = nowIso();
  const id = randomUUID();
  insertRow("Application", {
    id,
    type: input.type,
    fullName: input.fullName,
    university: input.university,
    academicYear: input.academicYear ?? null,
    phone: input.phone,
    email: input.email,
    linkedin: input.linkedin ?? null,
    motivation: input.motivation ?? null,
    status: "NEW",
    createdAt: ts,
    updatedAt: ts
  });
  input.experiences.forEach((exp, idx) => {
    insertRow("Experience", {
      id: randomUUID(),
      applicationId: id,
      organization: exp.organization,
      duration: exp.duration,
      description: exp.description,
      order: idx
    });
  });
  return getApplication(id)!;
}

export function setApplicationStatus(id: string, status: ApplicationStatus) {
  updateRow("Application", id, { status, updatedAt: nowIso() });
}

export function deleteApplication(id: string) {
  getDb().prepare('DELETE FROM "Application" WHERE id = ?').run(id);
}

/* ----------------------------- content entries ----------------------------- */

function mapContent(row: Row): ContentEntry {
  return {
    id: String(row.id),
    key: String(row.key),
    group: String(row.group),
    label: String(row.label),
    valueEn: String(row.valueEn ?? ""),
    valueAr: String(row.valueAr ?? ""),
    valueFr: String(row.valueFr ?? ""),
    order: Number(row.order),
    updatedAt: String(row.updatedAt)
  };
}

export function listContentEntries(group?: string): ContentEntry[] {
  const db = getDb();
  const where = group ? "WHERE \"group\" = ?" : "";
  const rows = allRows(
    db,
    `SELECT * FROM "ContentEntry" ${where} ORDER BY "order" ASC, "key" ASC`,
    group ? [group] : []
  );
  return rows.map(mapContent);
}

export function getContentEntry(key: string): ContentEntry | null {
  const row = firstRow(getDb(), 'SELECT * FROM "ContentEntry" WHERE "key" = ?', [key]);
  return row ? mapContent(row) : null;
}

export function upsertContent(input: {
  id?: string;
  key: string;
  group: string;
  label: string;
  valueEn: string;
  valueAr: string;
  valueFr: string;
  order?: number;
}) {
  const db = getDb();
  const ts = nowIso();
  const existing = input.id ? getContentEntry(input.id) : null;
  if (existing) {
    updateRow("ContentEntry", existing.id, {
      key: input.key,
      group: input.group,
      label: input.label,
      valueEn: input.valueEn,
      valueAr: input.valueAr,
      valueFr: input.valueFr,
      order: input.order ?? existing.order,
      updatedAt: ts
    });
    return getContentEntry(input.key)!;
  }
  const byKey = getContentEntry(input.key);
  if (byKey) {
    updateRow("ContentEntry", byKey.id, {
      group: input.group,
      label: input.label,
      valueEn: input.valueEn,
      valueAr: input.valueAr,
      valueFr: input.valueFr,
      order: input.order ?? byKey.order,
      updatedAt: ts
    });
    return getContentEntry(input.key)!;
  }
  const id = randomUUID();
  insertRow("ContentEntry", {
    id,
    key: input.key,
    group: input.group,
    label: input.label,
    valueEn: input.valueEn,
    valueAr: input.valueAr,
    valueFr: input.valueFr,
    order: input.order ?? 0,
    updatedAt: ts
  });
  return getContentEntry(input.key)!;
}

export function deleteContentEntry(id: string) {
  getDb().prepare('DELETE FROM "ContentEntry" WHERE id = ?').run(id);
}

export function getContentMap(locale: "en" | "ar" | "fr"): Record<string, string> {
  const field = `value${locale[0].toUpperCase()}${locale.slice(1)}` as
    | "valueEn"
    | "valueAr"
    | "valueFr";
  const map: Record<string, string> = {};
  for (const entry of listContentEntries()) {
    const value = entry[field];
    if (value) map[entry.key] = value;
  }
  return map;
}

/* ----------------------------- auth ----------------------------- */

export function getUserByEmail(email: string): (User & { passwordHash: string }) | null {
  const row = firstRow(getDb(), 'SELECT * FROM "User" WHERE email = ?', [email.toLowerCase()]);
  return row
    ? { ...mapUser(row), passwordHash: String(row.passwordHash) }
    : null;
}

export function createUser(email: string, password: string, name = "Administrator", role = "ADMIN") {
  const db = getDb();
  const ts = nowIso();
  const id = randomUUID();
  const passwordHash = bcrypt.hashSync(password, 12);
  insertRow("User", {
    id,
    email: email.toLowerCase(),
    passwordHash,
    name,
    role,
    createdAt: ts,
    updatedAt: ts
  });
  return getUserByEmail(email);
}

function mapSession(row: Row): Session {
  return {
    id: String(row.id),
    token: String(row.token),
    userId: String(row.userId),
    expiresAt: String(row.expiresAt),
    createdAt: String(row.createdAt)
  };
}

export function createSession(userId: string): Session {
  const db = getDb();
  const token = randomUUID() + randomUUID();
  const id = randomUUID();
  const ts = nowIso();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();
  insertRow("Session", { id, token, userId, expiresAt, createdAt: ts });
  // Cleanup expired sessions.
  db.prepare('DELETE FROM "Session" WHERE "expiresAt" < ?').run(ts);
  const row = firstRow(db, 'SELECT * FROM "Session" WHERE token = ?', [token]);
  return mapSession(row!);
}

export function getSessionUser(token?: string | null): User | null {
  const db = getDb();
  if (!token) return null;
  const row = firstRow(db, 'SELECT * FROM "Session" WHERE token = ? AND "expiresAt" > ?', [token, nowIso()]);
  if (!row) return null;
  const session = mapSession(row);
  const userRow = firstRow(db, 'SELECT * FROM "User" WHERE id = ?', [session.userId]);
  return userRow ? mapUser(userRow) : null;
}

export function deleteSession(token?: string | null) {
  if (!token) return;
  getDb().prepare('DELETE FROM "Session" WHERE token = ?').run(token);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

/* ----------------------------- youtube ----------------------------- */

export function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.split("/").filter(Boolean)[0];
        return id || null;
      }
      const v = u.searchParams.get("v");
      if (v) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "shorts" && parts[1]) return parts[1];
      if (parts[0] === "embed" && parts[1]) return parts[1];
    }
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function splitPhones(value: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

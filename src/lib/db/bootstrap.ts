import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import type { DB } from "./client";
import {
  OFFICES,
  GALLERY_IMAGES,
  CONTENT_ENTRIES,
  NEWS_ENTRIES,
  ACHIEVEMENT_ENTRIES,
  MEDIA_ENTRIES,
  PLACEHOLDER_PRACTICE
} from "./seedData";

const SETTING_ID = "site";

function nowIso() {
  return new Date().toISOString();
}

function hasRows(db: DB, table: string): boolean {
  const row = db
    .prepare(`SELECT COUNT(*) AS c FROM "${table}"`)
    .get() as { c: number } | undefined;
  return (row?.c ?? 0) > 0;
}

function insertSiteSettings(db: DB) {
  const ts = nowIso();
  db.prepare(
    `INSERT OR IGNORE INTO "SiteSettings" (
      "id", "firmNameEn", "firmNameAr", "firmNameFr",
      "taglineEn", "taglineAr", "taglineFr",
      "contactEmail", "mainPhones", "faxPhones", "mobilePhone", "socialLinks",
      "footerEn", "footerAr", "footerFr",
      "defaultSeoTitleEn", "defaultSeoTitleAr", "defaultSeoTitleFr",
      "defaultSeoDescEn", "defaultSeoDescAr", "defaultSeoDescFr",
      "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  ).run(
    SETTING_ID,
    "DR. HOSSAM LOUTFI",
    "د. حسام لطفي",
    "DR. HOSSAM LOUTFI",
    "",
    "",
    "",
    "hloutfi@loutfilawfirm.net",
    ["37606575", "37606584", "37606672", "33386364", "33354738"].join(", "),
    ["23930289", "23929992", "33361135"].join(", "),
    "0122411292",
    "{}",
    "",
    "",
    "",
    "DR. HOSSAM LOUTFI LAW FIRM",
    "مكتب د. حسام لطفي للمحاماة",
    "CABINET D'AVOCAT DR. HOSSAM LOUTFI",
    "",
    "",
    "",
    ts
  );
}

function insertOffices(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "OfficeLocation" (
      "id", "nameEn", "nameAr", "nameFr",
      "addressEn", "addressAr", "addressFr",
      "mapUrl", "phones", "email", "order", "published",
      "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  OFFICES.forEach((o, i) => {
    stmt.run(
      randomUUID(),
      o.name,
      o.nameAr,
      o.nameFr,
      o.address,
      o.addressAr,
      o.addressFr,
      o.mapUrl,
      null,
      null,
      o.order,
      1,
      ts,
      ts
    );
  });
}

function insertGalleryImages(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "GalleryImage" (
      "id", "altEn", "altAr", "altFr", "image",
      "order", "published", "isPlaceholder", "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  GALLERY_IMAGES.forEach((g, i) => {
    stmt.run(
      randomUUID(),
      g.en,
      g.ar,
      g.fr,
      g.image,
      i + 1,
      1,
      1,
      ts,
      ts
    );
  });
}

function insertContentEntries(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "ContentEntry" (
      "id", "key", "group", "label",
      "valueEn", "valueAr", "valueFr", "order", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  CONTENT_ENTRIES.forEach((c, i) => {
    stmt.run(
      randomUUID(),
      c.key,
      c.group,
      c.label,
      c.en,
      c.ar,
      c.fr,
      i + 1,
      ts
    );
  });
}

function insertNews(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "News" (
      "id", "slugEn", "slugAr", "slugFr",
      "titleEn", "titleAr", "titleFr",
      "excerptEn", "excerptAr", "excerptFr",
      "contentEn", "contentAr", "contentFr",
      "image", "author", "publishedAt",
      "published", "featured",
      "seoTitleEn", "seoTitleAr", "seoTitleFr", "seoDescEn", "seoDescAr", "seoDescFr",
      "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  NEWS_ENTRIES.forEach((n) => {
    stmt.run(
      randomUUID(),
      n.slugEn,
      n.slugAr,
      n.slugFr,
      n.titleEn,
      n.titleAr,
      n.titleFr,
      n.excerptEn,
      n.excerptAr,
      n.excerptFr,
      n.contentEn,
      n.contentAr,
      n.contentFr,
      n.image,
      "Dr. Hossam Loutfi Law Firm",
      ts,
      n.published ? 1 : 0,
      n.featured ? 1 : 0,
      null,
      null,
      null,
      null,
      null,
      null,
      ts,
      ts
    );
  });
}

function insertAchievements(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "Achievement" (
      "id", "titleEn", "titleAr", "titleFr",
      "descriptionEn", "descriptionAr", "descriptionFr",
      "type", "image", "url", "date",
      "featured", "published", "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  ACHIEVEMENT_ENTRIES.forEach((a) => {
    stmt.run(
      randomUUID(),
      a.titleEn,
      a.titleAr,
      a.titleFr,
      a.descriptionEn,
      a.descriptionAr,
      a.descriptionFr,
      a.type,
      a.image,
      null,
      null,
      a.featured ? 1 : 0,
      a.published ? 1 : 0,
      ts,
      ts
    );
  });
}

function insertMedia(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "Media" (
      "id", "titleEn", "titleAr", "titleFr",
      "url", "mediaType", "youtubeId", "thumbnail",
      "published", "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  MEDIA_ENTRIES.forEach((m) => {
    stmt.run(
      randomUUID(),
      m.titleEn,
      m.titleAr,
      m.titleFr,
      m.url,
      m.mediaType,
      null,
      m.thumbnail,
      m.published ? 1 : 0,
      ts,
      ts
    );
  });
}

function insertPracticeAreas(db: DB) {
  const stmt = db.prepare(
    `INSERT OR IGNORE INTO "PracticeArea" (
      "id", "nameEn", "nameAr", "nameFr",
      "descriptionEn", "descriptionAr", "descriptionFr",
      "icon", "image", "order",
      "published", "confirmed", "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
  );
  const ts = nowIso();
  PLACEHOLDER_PRACTICE.forEach((p, i) => {
    stmt.run(
      randomUUID(),
      p.en,
      p.ar,
      p.fr,
      p.descEn,
      p.descAr,
      p.descFr,
      null,
      null,
      i + 1,
      1,
      0,
      ts,
      ts
    );
  });
}

function insertAdminUser(db: DB) {
  const email = process.env.ADMIN_EMAIL || "admin@loutfilawfirm.net";
  const existing = db
    .prepare('SELECT COUNT(*) AS c FROM "User" WHERE email = ?')
    .get(email.toLowerCase()) as { c: number } | undefined;
  if ((existing?.c ?? 0) > 0) return;

  const ts = nowIso();
  const password =
    process.env.ADMIN_PASSWORD || "change-me-in-production";
  const name = process.env.ADMIN_NAME || "Administrator";
  db.prepare(
    `INSERT OR IGNORE INTO "User" (
      "id", "email", "passwordHash", "name", "role", "createdAt", "updatedAt"
    ) VALUES (?,?,?,?,?,?,?)`
  ).run(
    randomUUID(),
    email.toLowerCase(),
    bcrypt.hashSync(password, 12),
    name,
    "ADMIN",
    ts,
    ts
  );
}

/**
 * Seeder used at runtime on Vercel (and any other readonly-filesystem backend)
 * after the schema exists. It only runs when the database has no data, so it is
 * idempotent and never overwrites admin edits on a warm serverless instance.
 */
export function bootstrapPlaceholders(db: DB) {
  insertSiteSettings(db);
  if (!hasRows(db, "OfficeLocation")) insertOffices(db);
  if (!hasRows(db, "GalleryImage")) insertGalleryImages(db);
  if (!hasRows(db, "ContentEntry")) insertContentEntries(db);
  if (!hasRows(db, "News")) insertNews(db);
  if (!hasRows(db, "Achievement")) insertAchievements(db);
  if (!hasRows(db, "Media")) insertMedia(db);
  if (!hasRows(db, "PracticeArea")) insertPracticeAreas(db);
  insertAdminUser(db);
}

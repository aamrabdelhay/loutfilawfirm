import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { SCHEMA_SQL } from "./schema";

function resolveDbPath() {
  const url = process.env.DATABASE_URL || "file:./prisma/dev.db";
  const bare = url.replace(/^file:/, "");
  if (bare === ":memory:") return ":memory:";
  const base = path.resolve(/* turbopackIgnore: true */ process.cwd(), bare);
  return base;
}

function ensureDir(file: string) {
  const dir = path.dirname(file);
  if (dir !== "." && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export type DB = DatabaseSync;

// Keep a single connection across Next.js hot reloads / module reloads.
const globalForDb = globalThis as unknown as { __hlDb?: DatabaseSync };

export function getDb(): DB {
  if (!globalForDb.__hlDb) {
    const file = resolveDbPath();
    if (file !== ":memory:") ensureDir(file);
    const db = new DatabaseSync(file);
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec(SCHEMA_SQL);
    // Idempotent migrations for existing dev databases.
    try {
      db.exec('ALTER TABLE "GalleryImage" ADD COLUMN "isPlaceholder" INTEGER NOT NULL DEFAULT 1');
    } catch {
      // Column already exists.
    }
    const settingsColumns = [
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
      "aboutProfileFr"
    ];
    const imageColumns = ["heroImage", "aboutImage", "sectionImage"];
    for (const col of [...settingsColumns, ...imageColumns]) {
      try {
        db.exec(
          `ALTER TABLE "SiteSettings" ADD COLUMN "${col}" TEXT NOT NULL DEFAULT ''`
        );
      } catch {
        // Column already exists.
      }
    }
    globalForDb.__hlDb = db;
  }
  return globalForDb.__hlDb;
}

export function closeDb() {
  if (globalForDb.__hlDb) {
    try {
      globalForDb.__hlDb.close();
    } catch {
      // ignore
    }
    globalForDb.__hlDb = undefined;
  }
}

export type JsonValue = string | number | boolean | null | Record<string, unknown> | unknown[];

export function rowTo<T>(row: unknown): T | null {
  return (row as T | undefined) ?? null;
}

export function nowIso() {
  return new Date().toISOString();
}

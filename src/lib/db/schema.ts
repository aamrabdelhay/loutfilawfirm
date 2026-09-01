/**
 * Database schema for the local runtime.
 *
 * The project ships a Prisma schema (prisma/schema.prisma) for production
 * PostgreSQL deployments. In this sandbox and for local-first development we
 * use the built-in Node SQLite driver so the site runs without an external
 * database service. The table/column names mirror the Prisma schema exactly,
 * so moving to Prisma + PostgreSQL later is a swap of the data layer, not a
 * redesign of the application.
 */

export const SCHEMA_SQL = /* sql */ `
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'ADMIN',
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Application" (
  "id" TEXT PRIMARY KEY,
  "type" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "university" TEXT NOT NULL,
  "academicYear" TEXT,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "linkedin" TEXT,
  "motivation" TEXT,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Experience" (
  "id" TEXT PRIMARY KEY,
  "applicationId" TEXT NOT NULL,
  "organization" TEXT NOT NULL,
  "duration" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS "idx_experience_application" ON "Experience"("applicationId");

CREATE TABLE IF NOT EXISTS "News" (
  "id" TEXT PRIMARY KEY,
  "slugEn" TEXT NOT NULL UNIQUE,
  "slugAr" TEXT NOT NULL UNIQUE,
  "slugFr" TEXT NOT NULL UNIQUE,
  "titleEn" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL,
  "excerptEn" TEXT NOT NULL,
  "excerptAr" TEXT NOT NULL,
  "excerptFr" TEXT NOT NULL,
  "contentEn" TEXT NOT NULL,
  "contentAr" TEXT NOT NULL,
  "contentFr" TEXT NOT NULL,
  "image" TEXT,
  "author" TEXT,
  "publishedAt" TEXT,
  "published" INTEGER NOT NULL DEFAULT 0,
  "featured" INTEGER NOT NULL DEFAULT 0,
  "seoTitleEn" TEXT,
  "seoTitleAr" TEXT,
  "seoTitleFr" TEXT,
  "seoDescEn" TEXT,
  "seoDescAr" TEXT,
  "seoDescFr" TEXT,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_news_published" ON "News"("published", "publishedAt");

CREATE TABLE IF NOT EXISTS "Achievement" (
  "id" TEXT PRIMARY KEY,
  "titleEn" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "descriptionAr" TEXT NOT NULL,
  "descriptionFr" TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'MILESTONE',
  "image" TEXT,
  "url" TEXT,
  "date" TEXT,
  "featured" INTEGER NOT NULL DEFAULT 0,
  "published" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "PracticeArea" (
  "id" TEXT PRIMARY KEY,
  "nameEn" TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  "nameFr" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "descriptionAr" TEXT NOT NULL,
  "descriptionFr" TEXT NOT NULL,
  "icon" TEXT,
  "image" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "published" INTEGER NOT NULL DEFAULT 0,
  "confirmed" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Media" (
  "id" TEXT PRIMARY KEY,
  "titleEn" TEXT NOT NULL,
  "titleAr" TEXT NOT NULL,
  "titleFr" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "mediaType" TEXT NOT NULL DEFAULT 'VIDEO',
  "youtubeId" TEXT,
  "thumbnail" TEXT,
  "published" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "OfficeLocation" (
  "id" TEXT PRIMARY KEY,
  "nameEn" TEXT NOT NULL,
  "nameAr" TEXT NOT NULL,
  "nameFr" TEXT NOT NULL,
  "addressEn" TEXT NOT NULL,
  "addressAr" TEXT NOT NULL,
  "addressFr" TEXT NOT NULL,
  "mapUrl" TEXT,
  "phones" TEXT,
  "email" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "published" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT PRIMARY KEY,
  "firmNameEn" TEXT NOT NULL DEFAULT 'DR. HOSSAM LOUTFI',
  "firmNameAr" TEXT NOT NULL DEFAULT 'د. حسام لطفي',
  "firmNameFr" TEXT NOT NULL DEFAULT 'DR. HOSSAM LOUTFI',
  "taglineEn" TEXT NOT NULL DEFAULT '',
  "taglineAr" TEXT NOT NULL DEFAULT '',
  "taglineFr" TEXT NOT NULL DEFAULT '',
  "contactEmail" TEXT NOT NULL DEFAULT 'hloutfi@loutfilawfirm.net',
  "mainPhones" TEXT NOT NULL DEFAULT '',
  "faxPhones" TEXT NOT NULL DEFAULT '',
  "mobilePhone" TEXT NOT NULL DEFAULT '',
  "socialLinks" TEXT NOT NULL DEFAULT '{}',
  "footerEn" TEXT NOT NULL DEFAULT '',
  "footerAr" TEXT NOT NULL DEFAULT '',
  "footerFr" TEXT NOT NULL DEFAULT '',
  "defaultSeoTitleEn" TEXT NOT NULL DEFAULT 'DR. HOSSAM LOUTFI LAW FIRM',
  "defaultSeoTitleAr" TEXT NOT NULL DEFAULT 'مكتب د. حسام لطفي للمحاماة',
  "defaultSeoTitleFr" TEXT NOT NULL DEFAULT 'CABINET D''AVOCAT DR. HOSSAM LOUTFI',
  "defaultSeoDescEn" TEXT NOT NULL DEFAULT '',
  "defaultSeoDescAr" TEXT NOT NULL DEFAULT '',
  "defaultSeoDescFr" TEXT NOT NULL DEFAULT '',
  "heroIntroEn" TEXT NOT NULL DEFAULT '',
  "heroIntroAr" TEXT NOT NULL DEFAULT '',
  "heroIntroFr" TEXT NOT NULL DEFAULT '',
  "homeLeadTitleEn" TEXT NOT NULL DEFAULT '',
  "homeLeadTitleAr" TEXT NOT NULL DEFAULT '',
  "homeLeadTitleFr" TEXT NOT NULL DEFAULT '',
  "homeLeadBodyEn" TEXT NOT NULL DEFAULT '',
  "homeLeadBodyAr" TEXT NOT NULL DEFAULT '',
  "homeLeadBodyFr" TEXT NOT NULL DEFAULT '',
  "homeSectionTitleEn" TEXT NOT NULL DEFAULT '',
  "homeSectionTitleAr" TEXT NOT NULL DEFAULT '',
  "homeSectionTitleFr" TEXT NOT NULL DEFAULT '',
  "homeSectionBodyEn" TEXT NOT NULL DEFAULT '',
  "homeSectionBodyAr" TEXT NOT NULL DEFAULT '',
  "homeSectionBodyFr" TEXT NOT NULL DEFAULT '',
  "aboutIntroEn" TEXT NOT NULL DEFAULT '',
  "aboutIntroAr" TEXT NOT NULL DEFAULT '',
  "aboutIntroFr" TEXT NOT NULL DEFAULT '',
  "aboutPhilosophyEn" TEXT NOT NULL DEFAULT '',
  "aboutPhilosophyAr" TEXT NOT NULL DEFAULT '',
  "aboutPhilosophyFr" TEXT NOT NULL DEFAULT '',
  "aboutApproachEn" TEXT NOT NULL DEFAULT '',
  "aboutApproachAr" TEXT NOT NULL DEFAULT '',
  "aboutApproachFr" TEXT NOT NULL DEFAULT '',
  "aboutPresenceTitleEn" TEXT NOT NULL DEFAULT '',
  "aboutPresenceTitleAr" TEXT NOT NULL DEFAULT '',
  "aboutPresenceTitleFr" TEXT NOT NULL DEFAULT '',
  "aboutAreasTitleEn" TEXT NOT NULL DEFAULT '',
  "aboutAreasTitleAr" TEXT NOT NULL DEFAULT '',
  "aboutAreasTitleFr" TEXT NOT NULL DEFAULT '',
  "aboutProfileEn" TEXT NOT NULL DEFAULT '',
  "aboutProfileAr" TEXT NOT NULL DEFAULT '',
  "aboutProfileFr" TEXT NOT NULL DEFAULT '',
  "heroImage" TEXT NOT NULL DEFAULT '',
  "aboutImage" TEXT NOT NULL DEFAULT '',
  "sectionImage" TEXT NOT NULL DEFAULT '',
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "GalleryImage" (
  "id" TEXT PRIMARY KEY,
  "altEn" TEXT NOT NULL,
  "altAr" TEXT NOT NULL,
  "altFr" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "published" INTEGER NOT NULL DEFAULT 1,
  "isPlaceholder" INTEGER NOT NULL DEFAULT 1,
  "createdAt" TEXT NOT NULL,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "ContentEntry" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT NOT NULL UNIQUE,
  "group" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "valueEn" TEXT NOT NULL DEFAULT '',
  "valueAr" TEXT NOT NULL DEFAULT '',
  "valueFr" TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Session" (
  "id" TEXT PRIMARY KEY,
  "token" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "expiresAt" TEXT NOT NULL,
  "createdAt" TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS "idx_session_user" ON "Session"("userId");
`;

import {
  createUser,
  ensureSettings,
  getUserByEmail,
  listContentEntries,
  listGalleryImages,
  listMedia,
  listNews,
  listAchievements,
  listOffices,
  listPracticeAreas,
  upsertContent,
  upsertGallery,
  upsertOffice,
  upsertPractice,
  upsertNews,
  upsertAchievement,
  upsertMedia
} from "../src/lib/db/repo";
import {
  OFFICES,
  GALLERY_IMAGES,
  CONTENT_ENTRIES,
  NEWS_ENTRIES,
  ACHIEVEMENT_ENTRIES,
  MEDIA_ENTRIES,
  PLACEHOLDER_PRACTICE
} from "../src/lib/db/seedData";
function main() {
  ensureSettings();

  const adminEmail =
    process.env.ADMIN_EMAIL || "admin@loutfilawfirm.net";
  const adminPassword =
    process.env.ADMIN_PASSWORD || "change-me-in-production";
  const adminName = process.env.ADMIN_NAME || "Administrator";

  if (!getUserByEmail(adminEmail)) {
    createUser(adminEmail, adminPassword, adminName, "ADMIN");
    console.log(`Created admin user ${adminEmail}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists`);
  }

  if (listOffices().length === 0) {
    for (const o of OFFICES) {
      upsertOffice({
        nameEn: o.name,
        nameAr: o.nameAr,
        nameFr: o.nameFr,
        addressEn: o.address,
        addressAr: o.addressAr,
        addressFr: o.addressFr,
        mapUrl: o.mapUrl,
        phones: null,
        email: null,
        order: o.order,
        published: true
      });
    }
    console.log("Seeded office locations");
  }

  if (listGalleryImages().length === 0) {
    GALLERY_IMAGES.forEach((g, i) => {
      upsertGallery({
        altEn: g.en,
        altAr: g.ar,
        altFr: g.fr,
        image: g.image,
        order: i + 1,
        published: true,
        isPlaceholder: true
      });
    });
    console.log("Seeded gallery images");
  }

  if (listContentEntries().length === 0) {
    CONTENT_ENTRIES.forEach((c, i) => {
      upsertContent({
        key: c.key,
        group: c.group,
        label: c.label,
        valueEn: c.en,
        valueAr: c.ar,
        valueFr: c.fr,
        order: i + 1
      });
    });
    console.log("Seeded editable site content entries");
  }

  if (listNews().length === 0) {
    NEWS_ENTRIES.forEach((n) => {
      upsertNews({
        slugEn: n.slugEn,
        slugAr: n.slugAr,
        slugFr: n.slugFr,
        titleEn: n.titleEn,
        titleAr: n.titleAr,
        titleFr: n.titleFr,
        excerptEn: n.excerptEn,
        excerptAr: n.excerptAr,
        excerptFr: n.excerptFr,
        contentEn: n.contentEn,
        contentAr: n.contentAr,
        contentFr: n.contentFr,
        image: n.image,
        author: "Dr. Hossam Loutfi Law Firm",
        publishedAt: new Date().toISOString(),
        published: n.published,
        featured: n.featured,
        seoTitleEn: null,
        seoTitleAr: null,
        seoTitleFr: null,
        seoDescEn: null,
        seoDescAr: null,
        seoDescFr: null
      });
    });
    console.log("Seeded placeholder news (clearly marked drafts)");
  }

  if (listAchievements().length === 0) {
    ACHIEVEMENT_ENTRIES.forEach((a) => {
      upsertAchievement({
        titleEn: a.titleEn,
        titleAr: a.titleAr,
        titleFr: a.titleFr,
        descriptionEn: a.descriptionEn,
        descriptionAr: a.descriptionAr,
        descriptionFr: a.descriptionFr,
        type: a.type,
        image: a.image,
        url: null,
        date: null,
        featured: a.featured,
        published: a.published
      });
    });
    console.log("Seeded placeholder achievements (clearly marked drafts)");
  }

  if (listMedia().length === 0) {
    MEDIA_ENTRIES.forEach((m) => {
      upsertMedia({
        titleEn: m.titleEn,
        titleAr: m.titleAr,
        titleFr: m.titleFr,
        url: m.url,
        mediaType: m.mediaType,
        youtubeId: null,
        thumbnail: m.thumbnail,
        published: m.published
      });
    });
    console.log("Seeded placeholder media (clearly marked drafts)");
  }

  if (listPracticeAreas().length === 0) {
    PLACEHOLDER_PRACTICE.forEach((p, i) => {
      upsertPractice({
        nameEn: p.en,
        nameAr: p.ar,
        nameFr: p.fr,
        descriptionEn: p.descEn,
        descriptionAr: p.descAr,
        descriptionFr: p.descFr,
        icon: null,
        image: null,
        order: i + 1,
        published: true,
        confirmed: false
      });
    });
    console.log("Seeded placeholder practice areas (published, awaiting confirmation)");
  }

  console.log("Seed completed.");
  console.log("Offices:", listOffices().length);
  console.log("Practice areas:", listPracticeAreas().length);
}

main();

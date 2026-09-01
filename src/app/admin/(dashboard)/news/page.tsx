import { listNews } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "titleEn", label: "Title (EN)", full: true },
  { name: "titleAr", label: "Title (AR)", full: true },
  { name: "titleFr", label: "Title (FR)", full: true },
  { name: "slugEn", label: "Slug (EN)" },
  { name: "slugAr", label: "Slug (AR)" },
  { name: "slugFr", label: "Slug (FR)" },
  { name: "excerptEn", label: "Excerpt (EN)", type: "textarea", full: true },
  { name: "excerptAr", label: "Excerpt (AR)", type: "textarea", full: true },
  { name: "excerptFr", label: "Excerpt (FR)", type: "textarea", full: true },
  { name: "contentEn", label: "Content (EN)", type: "textarea", full: true },
  { name: "contentAr", label: "Content (AR)", type: "textarea", full: true },
  { name: "contentFr", label: "Content (FR)", type: "textarea", full: true },
  { name: "image", label: "Image URL", type: "url", full: true },
  { name: "author", label: "Author" },
  { name: "publishedAt", label: "Publication date", type: "date" },
  { name: "published", label: "Published", type: "checkbox" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "seoTitleEn", label: "SEO title (EN)", full: true },
  { name: "seoTitleAr", label: "SEO title (AR)", full: true },
  { name: "seoTitleFr", label: "SEO title (FR)", full: true },
  { name: "seoDescEn", label: "SEO description (EN)", type: "textarea", full: true },
  { name: "seoDescAr", label: "SEO description (AR)", type: "textarea", full: true },
  { name: "seoDescFr", label: "SEO description (FR)", type: "textarea", full: true }
];

export default function AdminNewsPage() {
  const rows = listNews().map((n) => ({
    ...n,
    titleEn: n.titleEn,
    published: n.published,
    featured: n.featured,
    publishedAt: n.publishedAt ? n.publishedAt.slice(0, 10) : ""
  }));

  return (
    <CmsCRUD
      table="News"
      title="News"
      columns={["titleEn", "published", "featured"]}
      fields={fields}
      rows={rows}
    />
  );
}

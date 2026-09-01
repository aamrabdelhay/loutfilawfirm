import { listAchievements } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "titleEn", label: "Title (EN)", full: true },
  { name: "titleAr", label: "Title (AR)", full: true },
  { name: "titleFr", label: "Title (FR)", full: true },
  { name: "descriptionEn", label: "Description (EN)", type: "textarea", full: true },
  { name: "descriptionAr", label: "Description (AR)", type: "textarea", full: true },
  { name: "descriptionFr", label: "Description (FR)", type: "textarea", full: true },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "AWARD", label: "Award" },
      { value: "CONFERENCE", label: "Conference" },
      { value: "PUBLICATION", label: "Publication" },
      { value: "ARTICLE", label: "Article" },
      { value: "MEDIA", label: "Media" },
      { value: "INTERVIEW", label: "Interview" },
      { value: "LECTURE", label: "Lecture" },
      { value: "MILESTONE", label: "Milestone" }
    ]
  },
  { name: "image", label: "Image URL", type: "url", full: true },
  { name: "url", label: "External URL", type: "url", full: true },
  { name: "date", label: "Date", type: "date" },
  { name: "featured", label: "Featured", type: "checkbox" },
  { name: "published", label: "Published", type: "checkbox" }
];

export default function AdminAchievementsPage() {
  const rows = listAchievements().map((a) => ({
    ...a,
    titleEn: a.titleEn,
    published: a.published,
    featured: a.featured,
    date: a.date ? a.date.slice(0, 10) : ""
  }));

  return (
    <CmsCRUD
      table="Achievement"
      title="Achievements"
      columns={["titleEn", "type", "published", "featured"]}
      fields={fields}
      rows={rows}
    />
  );
}

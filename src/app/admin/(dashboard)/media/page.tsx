import { listMedia } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "titleEn", label: "Title (EN)", full: true },
  { name: "titleAr", label: "Title (AR)", full: true },
  { name: "titleFr", label: "Title (FR)", full: true },
  { name: "url", label: "YouTube / article URL", type: "url", full: true },
  {
    name: "mediaType",
    label: "Media type",
    type: "select",
    options: [
      { value: "VIDEO", label: "Video" },
      { value: "ARTICLE", label: "Article" },
      { value: "OTHER", label: "Other" }
    ]
  },
  { name: "thumbnail", label: "Fallback thumbnail URL", type: "url", full: true },
  { name: "published", label: "Published", type: "checkbox" }
];

export default function AdminMediaPage() {
  const rows = listMedia().map((m) => ({
    ...m,
    titleEn: m.titleEn,
    published: m.published
  }));

  return (
    <CmsCRUD
      table="Media"
      title="Media"
      columns={["titleEn", "mediaType", "published"]}
      fields={fields}
      rows={rows}
    />
  );
}

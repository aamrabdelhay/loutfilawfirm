import { listGalleryImages } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "altEn", label: "Alt (EN)", full: true },
  { name: "altAr", label: "Alt (AR)", full: true },
  { name: "altFr", label: "Alt (FR)", full: true },
  { name: "image", label: "Image path / URL", type: "url", full: true },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
  { name: "isPlaceholder", label: "Visual placeholder (not real office photo)", type: "checkbox" }
];

export default function AdminGalleryPage() {
  const rows = listGalleryImages().map((g) => ({
    ...g,
    altEn: g.altEn,
    published: g.published,
    order: g.order
  }));

  return (
    <CmsCRUD
      table="GalleryImage"
      title="Office Gallery"
      columns={["altEn", "image", "order", "published"]}
      fields={fields}
      rows={rows}
    />
  );
}

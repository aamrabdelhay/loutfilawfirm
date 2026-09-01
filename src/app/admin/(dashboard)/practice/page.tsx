import { listPracticeAreas } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "nameEn", label: "Name (EN)", full: true },
  { name: "nameAr", label: "Name (AR)", full: true },
  { name: "nameFr", label: "Name (FR)", full: true },
  { name: "descriptionEn", label: "Description (EN)", type: "textarea", full: true },
  { name: "descriptionAr", label: "Description (AR)", type: "textarea", full: true },
  { name: "descriptionFr", label: "Description (FR)", type: "textarea", full: true },
  { name: "icon", label: "Icon name", full: true },
  { name: "image", label: "Image URL", type: "url", full: true },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" },
  { name: "confirmed", label: "Confirmed by firm", type: "checkbox" }
];

export default function AdminPracticePage() {
  const rows = listPracticeAreas().map((a) => ({
    ...a,
    nameEn: a.nameEn,
    published: a.published,
    confirmed: a.confirmed,
    order: a.order
  }));

  return (
    <CmsCRUD
      table="PracticeArea"
      title="Practice Areas"
      columns={["nameEn", "order", "published", "confirmed"]}
      fields={fields}
      rows={rows}
    />
  );
}

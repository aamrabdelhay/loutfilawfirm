import { listOffices } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "nameEn", label: "Name (EN)", full: true },
  { name: "nameAr", label: "Name (AR)", full: true },
  { name: "nameFr", label: "Name (FR)", full: true },
  { name: "addressEn", label: "Address (EN)", type: "textarea", full: true },
  { name: "addressAr", label: "Address (AR)", type: "textarea", full: true },
  { name: "addressFr", label: "Address (FR)", type: "textarea", full: true },
  { name: "mapUrl", label: "Map URL", type: "url", full: true },
  { name: "phones", label: "Phones (comma separated)", full: true },
  { name: "email", label: "Email", full: true },
  { name: "order", label: "Order", type: "number" },
  { name: "published", label: "Published", type: "checkbox" }
];

export default function AdminOfficesPage() {
  const rows = listOffices().map((o) => ({
    ...o,
    nameEn: o.nameEn,
    published: o.published,
    order: o.order
  }));

  return (
    <CmsCRUD
      table="OfficeLocation"
      title="Office Locations"
      columns={["nameEn", "addressEn", "order", "published"]}
      fields={fields}
      rows={rows}
    />
  );
}

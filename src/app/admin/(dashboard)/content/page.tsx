import { listContentEntries } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "group", label: "Group", type: "select", options: [
    { value: "Navigation", label: "Navigation" },
    { value: "Homepage", label: "Homepage" },
    { value: "About", label: "About page" },
    { value: "Practice page", label: "Practice page" },
    { value: "News page", label: "News page" },
    { value: "Achievements page", label: "Achievements page" },
    { value: "Media page", label: "Media page" },
    { value: "Careers page", label: "Careers page" },
    { value: "Contact page", label: "Contact page" },
    { value: "Footer", label: "Footer" },
    { value: "General", label: "General" }
  ] },
  { name: "key", label: "Key", full: true },
  { name: "label", label: "Admin label", full: true },
  { name: "valueEn", label: "Text (English)", type: "textarea", full: true },
  { name: "valueAr", label: "Text (Arabic)", type: "textarea", full: true },
  { name: "valueFr", label: "Text (French)", type: "textarea", full: true },
  { name: "order", label: "Order", type: "number" }
];

export default function AdminContentPage() {
  const rows = listContentEntries().map((c, i) => ({
    ...c,
    order: c.order || i + 1
  }));

  return (
    <CmsCRUD
      table="ContentEntry"
      title="Site Content"
      columns={["group", "key", "label"]}
      fields={fields}
      rows={rows}
    />
  );
}

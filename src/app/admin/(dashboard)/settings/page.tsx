import { getSettings } from "@/lib/db/repo";
import { CmsCRUD, type FieldDef } from "@/components/admin/CmsCRUD";

const fields: FieldDef[] = [
  { name: "firmNameEn", label: "Firm name (EN)", full: true },
  { name: "firmNameAr", label: "Firm name (AR)", full: true },
  { name: "firmNameFr", label: "Firm name (FR)", full: true },
  { name: "taglineEn", label: "Tagline (EN)", full: true },
  { name: "taglineAr", label: "Tagline (AR)", full: true },
  { name: "taglineFr", label: "Tagline (FR)", full: true },
  { name: "contactEmail", label: "Contact email", full: true },
  { name: "mainPhones", label: "Main telephones (comma separated)", full: true },
  { name: "faxPhones", label: "Fax (comma separated)", full: true },
  { name: "mobilePhone", label: "Office mobile", full: true },
  { name: "defaultSeoTitleEn", label: "Default SEO title (EN)", full: true },
  { name: "defaultSeoTitleAr", label: "Default SEO title (AR)", full: true },
  { name: "defaultSeoTitleFr", label: "Default SEO title (FR)", full: true },
  { name: "defaultSeoDescEn", label: "Default SEO description (EN)", type: "textarea", full: true },
  { name: "defaultSeoDescAr", label: "Default SEO description (AR)", type: "textarea", full: true },
  { name: "defaultSeoDescFr", label: "Default SEO description (FR)", type: "textarea", full: true },
  { name: "footerEn", label: "Footer (EN)", type: "textarea", full: true },
  { name: "footerAr", label: "Footer (AR)", type: "textarea", full: true },
  { name: "footerFr", label: "Footer (FR)", type: "textarea", full: true },
  { name: "socialLinks", label: "Social links (JSON)", type: "textarea", full: true },
  { name: "heroImage", label: "Homepage hero image URL", type: "url", full: true },
  { name: "aboutImage", label: "About image URL", type: "url", full: true },
  { name: "sectionImage", label: "Homepage section image URL", type: "url", full: true },
  { name: "heroIntroEn", label: "Hero statement (EN)", type: "textarea", full: true },
  { name: "heroIntroAr", label: "Hero statement (AR)", type: "textarea", full: true },
  { name: "heroIntroFr", label: "Hero statement (FR)", type: "textarea", full: true },
  { name: "homeLeadTitleEn", label: "Home editorial title (EN)", full: true },
  { name: "homeLeadTitleAr", label: "Home editorial title (AR)", full: true },
  { name: "homeLeadTitleFr", label: "Home editorial title (FR)", full: true },
  { name: "homeLeadBodyEn", label: "Home editorial body (EN)", type: "textarea", full: true },
  { name: "homeLeadBodyAr", label: "Home editorial body (AR)", type: "textarea", full: true },
  { name: "homeLeadBodyFr", label: "Home editorial body (FR)", type: "textarea", full: true },
  { name: "homeSectionTitleEn", label: "Home firm section title (EN)", full: true },
  { name: "homeSectionTitleAr", label: "Home firm section title (AR)", full: true },
  { name: "homeSectionTitleFr", label: "Home firm section title (FR)", full: true },
  { name: "homeSectionBodyEn", label: "Home firm section body (EN)", type: "textarea", full: true },
  { name: "homeSectionBodyAr", label: "Home firm section body (AR)", type: "textarea", full: true },
  { name: "homeSectionBodyFr", label: "Home firm section body (FR)", type: "textarea", full: true },
  { name: "aboutIntroEn", label: "About — introduction (EN)", type: "textarea", full: true },
  { name: "aboutIntroAr", label: "About — introduction (AR)", type: "textarea", full: true },
  { name: "aboutIntroFr", label: "About — introduction (FR)", type: "textarea", full: true },
  { name: "aboutPhilosophyEn", label: "About — philosophy (EN)", type: "textarea", full: true },
  { name: "aboutPhilosophyAr", label: "About — philosophy (AR)", type: "textarea", full: true },
  { name: "aboutPhilosophyFr", label: "About — philosophy (FR)", type: "textarea", full: true },
  { name: "aboutApproachEn", label: "About — approach (EN)", type: "textarea", full: true },
  { name: "aboutApproachAr", label: "About — approach (AR)", type: "textarea", full: true },
  { name: "aboutApproachFr", label: "About — approach (FR)", type: "textarea", full: true },
  { name: "aboutPresenceTitleEn", label: "About — presence title (EN)", full: true },
  { name: "aboutPresenceTitleAr", label: "About — presence title (AR)", full: true },
  { name: "aboutPresenceTitleFr", label: "About — presence title (FR)", full: true },
  { name: "aboutAreasTitleEn", label: "About — areas title (EN)", full: true },
  { name: "aboutAreasTitleAr", label: "About — areas title (AR)", full: true },
  { name: "aboutAreasTitleFr", label: "About — areas title (FR)", full: true },
  { name: "aboutProfileEn", label: "About — profile (EN)", type: "textarea", full: true },
  { name: "aboutProfileAr", label: "About — profile (AR)", type: "textarea", full: true },
  { name: "aboutProfileFr", label: "About — profile (FR)", type: "textarea", full: true }
];

export default function AdminSettingsPage() {
  const s = getSettings();
  const row = { ...s, id: "site" };
  return (
    <CmsCRUD
      table="SiteSettings"
      title="Site Settings"
      columns={["contactEmail", "mainPhones", "mobilePhone"]}
      fields={fields}
      rows={[row]}
    />
  );
}

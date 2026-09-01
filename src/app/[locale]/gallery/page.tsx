import type { Metadata } from "next";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { OfficeGallery } from "@/components/public/OfficeGallery";
import { listGalleryImages } from "@/lib/db/repo";
import { getSiteContent, cv } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Office Gallery",
    description: "A selection of architectural imagery from the practice."
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getSiteContent(locale);
  const images = listGalleryImages(true);
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const items = images.map((img) => ({
    src: img.image,
    alt:
      (img as unknown as Record<string, unknown>)[`alt${suffix}`] as string || img.altEn,
    placeholder: img.isPlaceholder
  }));

  return (
    <div>
      <PageHeader
        kicker={cv(content, "nav.about", "The Firm")}
        title="Office Gallery"
        intro="Preliminary visual placeholders. Actual photography supplied by the firm will replace these through the administration."
      />
      <Section className="bg-[var(--navy)]">
        <OfficeGallery items={items} />
      </Section>
    </div>
  );
}

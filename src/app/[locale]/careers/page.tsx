import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { getSiteContent, cv } from "@/lib/content";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/careers` }
  };
}

export default async function CareersPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("careers");
  const content = getSiteContent(locale);

  return (
    <div>
      <PageHeader
        kicker={cv(content, "careers.eyebrow", t("eyebrow"))}
        title={cv(content, "careers.title", t("title"))}
        intro={cv(content, "careers.intro", t("intro"))}
      />
      <Section>
        <div className="mx-auto max-w-[980px]">
          <ApplicationForm content={content} />
        </div>
      </Section>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { listPracticeAreas } from "@/lib/db/repo";
import { getSiteContent, cv } from "@/lib/content";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "practice" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/practice` }
  };
}

export default async function PracticePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("practice");
  const tc = await getTranslations("common");
  const content = getSiteContent(locale);
  const areas = listPracticeAreas(true);
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;

  return (
    <div>
      <PageHeader
        kicker={cv(content, "practice.eyebrow", t("eyebrow"))}
        title={cv(content, "practice.title", t("title"))}
        intro={cv(content, "practice.intro", t("intro"))}
      />

      <Section>
        {areas.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {areas.map((a, i) => (
              <article key={a.id} className="glass-card overflow-hidden">
                <div className="relative aspect-[3/1] overflow-hidden">
                  {a.image ? (
                    <Image src={a.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,var(--navy-soft),var(--burgundy))]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.35)] to-transparent" />
                  <div className="absolute top-4 start-4 flex gap-2">
                    {!a.confirmed ? <Badge tone="gold">{t("needsConfirmation")}</Badge> : null}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-3xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="mt-3 font-serif text-3xl leading-tight">
                    {a[`name${suffix}` as keyof typeof a] as string}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {a[`description${suffix}` as keyof typeof a] as string}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(22,26,32,0.2)] rounded-[var(--radius-large)] p-14 text-center text-[var(--muted)]">
            {t("empty")}
          </div>
        )}
        <div className="mt-12 rounded-[var(--radius-medium)] bg-[var(--navy)] text-white p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl">{cv(content, "practice.contactCta", t("contactCta"))}</h2>
            <p className="mt-2 text-white/65 text-sm">{cv(content, "practice.intro", t("intro"))}</p>
          </div>
          <Link href="/contact" className="btn-glass">{tc("contact")}</Link>
        </div>
      </Section>
    </div>
  );
}

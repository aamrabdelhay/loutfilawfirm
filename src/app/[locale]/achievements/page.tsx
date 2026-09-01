import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { listAchievements } from "@/lib/db/repo";
import { formatDate, safeUrl } from "@/lib/utils";
import { getSiteContent, cv } from "@/lib/content";
import { ExternalLink } from "lucide-react";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "achievements" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/achievements` }
  };
}

export default async function AchievementsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("achievements");
  const content = getSiteContent(locale);
  const items = listAchievements(true);
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;

  return (
    <div>
      <PageHeader
        kicker={cv(content, "achievements.eyebrow", t("eyebrow"))}
        title={cv(content, "achievements.title", t("title"))}
        intro={cv(content, "achievements.intro", t("intro"))}
      />
      <Section>
        {items.length ? (
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((a) => {
              const title = (a as unknown as Record<string, unknown>)[`title${suffix}`] as string || a.titleEn;
              const desc = (a as unknown as Record<string, unknown>)[`description${suffix}`] as string || a.descriptionEn;
              const url = safeUrl(a.url);
              const card = (
                <article className="glass-card overflow-hidden group">
                  {a.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={a.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="h-2 bg-[linear-gradient(90deg,var(--burgundy),var(--gold))]" />
                  )}
                  <div className="p-7">
                    <div className="flex items-center justify-between gap-3">
                      <Badge tone="burgundy">{t(`types.${a.type}`)}</Badge>
                      {a.date ? (
                        <span className="text-xs uppercase tracking-wider text-[var(--muted)]">
                          {formatDate(a.date, locale)}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-5 font-serif text-2xl leading-snug">{title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
                    {url ? (
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--burgundy)]">
                        {t("view")} <ExternalLink size={14} />
                      </span>
                    ) : null}
                  </div>
                </article>
              );
              return url ? (
                <a
                  key={a.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              ) : (
                <div key={a.id}>{card}</div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(22,26,32,0.2)] rounded-[var(--radius-large)] p-14 text-center text-[var(--muted)]">
            {t("empty")}
          </div>
        )}
        <div className="mt-12">
          <Link href="/media" className="btn-outline">
            {cv(content, "nav.media", "Media")}
          </Link>
        </div>
      </Section>
    </div>
  );
}

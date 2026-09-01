import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { listMedia } from "@/lib/db/repo";
import { safeUrl } from "@/lib/utils";
import { getSiteContent, cv } from "@/lib/content";
import { Play, ExternalLink } from "lucide-react";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "media" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/media` }
  };
}

export default async function MediaPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("media");
  const tn = await getTranslations("nav");
  const content = getSiteContent(locale);
  const items = listMedia(true);
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;

  return (
    <div>
      <PageHeader
        kicker={cv(content, "media.eyebrow", t("eyebrow"))}
        title={cv(content, "media.title", t("title"))}
        intro={cv(content, "media.intro", t("intro"))}
      />
      <Section>
        {items.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((m) => {
              const url = safeUrl(m.url);
              const title = (m as unknown as Record<string, unknown>)[`title${suffix}`] as string || m.titleEn;
              const img = m.youtubeId
                ? `https://i.ytimg.com/vi/${m.youtubeId}/hqdefault.jpg`
                : m.thumbnail;
              const isVideo = m.mediaType === "VIDEO" || Boolean(m.youtubeId);
              const card = (
                <article className="glass-card overflow-hidden group">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {img ? (
                      <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-[var(--navy-soft)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.45)] to-transparent" />
                    {isVideo ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="h-12 w-12 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white">
                          <Play size={18} fill="currentColor" />
                        </span>
                      </div>
                    ) : null}
                    <div className="absolute top-4 start-4">
                      <Badge tone="dark">{isVideo ? "Video" : "Article"}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-serif text-xl leading-snug">{title}</h2>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--burgundy)]">
                      {isVideo ? t("watch") : t("read")} <ExternalLink size={14} />
                    </span>
                  </div>
                </article>
              );
              return url ? (
                <a key={m.id} href={url} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={m.id}>{card}</div>
              );
            })}
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(22,26,32,0.2)] rounded-[var(--radius-large)] p-14 text-center text-[var(--muted)]">
            {t("empty")}
          </div>
        )}
        <div className="mt-12">
          <Link href="/achievements" className="btn-outline">
            {cv(content, "nav.achievements", tn("achievements"))}
          </Link>
        </div>
      </Section>
    </div>
  );
}

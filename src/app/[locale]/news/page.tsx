import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { listNews, getFeaturedNews } from "@/lib/db/repo";
import { formatDate } from "@/lib/utils";
import { getSiteContent, cv } from "@/lib/content";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/news` }
  };
}

export default async function NewsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("news");
  const tc = await getTranslations("common");
  const content = getSiteContent(locale);
  const featured = getFeaturedNews();
  const news = listNews({ onlyPublished: true, limit: 20 });
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;

  return (
    <div>
      <PageHeader
        kicker={cv(content, "news.eyebrow", t("eyebrow"))}
        title={cv(content, "news.title", t("title"))}
        intro={cv(content, "news.intro", t("intro"))}
      />

      <Section>
        {news.length ? (
          <div className="space-y-20">
            {featured ? (
              <Link
                href={`/news/${featured[`slug${suffix}` as keyof typeof featured] as string}`}
                className="block group glass-card overflow-hidden md:grid md:grid-cols-[1.2fr_0.8fr]"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px] overflow-hidden">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[var(--navy-soft)]" />
                  )}
                  <div className="absolute top-5 start-5"><Badge tone="gold">{t("featured")}</Badge></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-wider text-[var(--gold)]">
                    {formatDate(featured.publishedAt, locale)}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">
                    {featured[`title${suffix}` as keyof typeof featured] as string}
                  </h2>
                  <p className="mt-5 text-[var(--muted)] leading-relaxed line-clamp-3">
                    {featured[`excerpt${suffix}` as keyof typeof featured] as string}
                  </p>
                  <span className="mt-6 text-sm font-medium text-[var(--burgundy)]">{t("readMore")} →</span>
                </div>
              </Link>
            ) : null}

            <div>
              <h2 className="mb-8 font-serif text-3xl">{t("latest")}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((n) => (
                  <Link
                    key={n.id}
                    href={`/news/${n[`slug${suffix}` as keyof typeof n] as string}`}
                    className="group glass-card overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {n.image ? (
                        <Image src={n.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-[var(--navy-soft)]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.35)] to-transparent" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs uppercase tracking-wider text-[var(--gold)]">
                        {formatDate(n.publishedAt, locale)}
                      </p>
                      <h3 className="mt-3 font-serif text-xl leading-snug line-clamp-2">
                        {n[`title${suffix}` as keyof typeof n] as string}
                      </h3>
                      <p className="mt-3 text-sm text-[var(--muted)] line-clamp-2">
                        {n[`excerpt${suffix}` as keyof typeof n] as string}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(22,26,32,0.2)] rounded-[var(--radius-large)] p-14 text-center text-[var(--muted)]">
            {t("empty")}
          </div>
        )}
        <div className="mt-12">
          <Link href="/" className="btn-outline">{tc("backHome")}</Link>
        </div>
      </Section>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import Image from "next/image";
import { getNewsBySlug } from "@/lib/db/repo";
import { formatDate } from "@/lib/utils";

type Params = { locale: string; slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  const article = getNewsBySlug(locale as "en" | "ar" | "fr", slug);
  if (!article || !article.published) return { title: t("notFound") };
  const cap = locale[0].toUpperCase() + locale.slice(1);
  const title = (article as unknown as Record<string, unknown>)[`seoTitle${cap}`] || (article as unknown as Record<string, unknown>)[`title${cap}`] || article.titleEn;
  const desc = (article as unknown as Record<string, unknown>)[`seoDesc${cap}`] || (article as unknown as Record<string, unknown>)[`excerpt${cap}`] || article.excerptEn;
  return {
    title: String(title),
    description: String(desc),
    openGraph: {
      title: String(title),
      description: String(desc),
      type: "article",
      images: article.image ? [article.image] : undefined
    },
    alternates: { canonical: `/${locale}/news/${slug}` }
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  const t = await getTranslations("news");
  const tc = await getTranslations("common");
  const article = getNewsBySlug(locale as "en" | "ar" | "fr", slug);
  if (!article || !article.published) notFound();

  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const title = (article as unknown as Record<string, unknown>)[`title${suffix}`] as string || article.titleEn;
  const excerpt = (article as unknown as Record<string, unknown>)[`excerpt${suffix}`] as string || article.excerptEn;
  const content = (article as unknown as Record<string, unknown>)[`content${suffix}`] as string || article.contentEn;
  const paragraphs = content.split(/\n{2,}|\n/).filter(Boolean);

  return (
    <div>
      <section className="relative bg-[var(--navy)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,137,82,0.4),transparent_55%)]" />
        </div>
        <div className="relative max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 pt-36 pb-20">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
            ← {t("back")}
          </Link>
          <div className="mt-8 max-w-3xl">
            <p className="text-xs uppercase tracking-wider text-[var(--gold-soft)]">
              {formatDate(article.publishedAt, locale)}
              {article.author ? ` · ${article.author}` : ""}
            </p>
            <h1 className="mt-5 font-serif text-4xl md:text-6xl leading-[1.02]">{title}</h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">{excerpt}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-[820px]">
          {article.image ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-large)] mb-10 border border-[rgba(22,26,32,0.1)]">
              <Image src={article.image} alt="" fill sizes="100vw" className="object-cover" />
            </div>
          ) : null}
          <div className="prose-firm">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-12 border-t border-[rgba(22,26,32,0.1)] pt-6 flex items-center justify-between">
            <Link href="/news" className="btn-outline">{t("back")}</Link>
            <Link href="/" className="btn-outline">{tc("backHome")}</Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

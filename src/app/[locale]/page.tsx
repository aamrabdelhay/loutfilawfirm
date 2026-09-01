import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { listNews, listPracticeAreas, listAchievements, listOffices, getSettings } from "@/lib/db/repo";
import { formatDate } from "@/lib/utils";
import { getSiteContent, cv } from "@/lib/content";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const settings = getSettings();
  const seoTitle =
    locale === "ar"
      ? settings.defaultSeoTitleAr
      : locale === "fr"
        ? settings.defaultSeoTitleFr
        : settings.defaultSeoTitleEn;
  const seoDesc =
    locale === "ar"
      ? settings.defaultSeoDescAr
      : locale === "fr"
        ? settings.defaultSeoDescFr
        : settings.defaultSeoDescEn;
  return {
    title: seoTitle || t("siteName"),
    description: seoDesc || undefined,
    alternates: { canonical: `/${locale}` }
  };
}

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const th = await getTranslations("hero");
  const tcommon = await getTranslations("common");
  const tp = await getTranslations("practice");
  const tn = await getTranslations("news");
  const ta = await getTranslations("achievements");
  const tnav = await getTranslations("nav");

  const content = getSiteContent(locale);
  const settings = getSettings();
  const cap = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const heroIntro = cv(
    content,
    "hero.intro",
    (settings as unknown as Record<string, unknown>)[`heroIntro${cap}`] as string || th("intro")
  );
  const leadTitle = cv(
    content,
    "home.leadTitle",
    (settings as unknown as Record<string, unknown>)[`homeLeadTitle${cap}`] as string || t("leadTitle")
  );
  const leadBody = cv(
    content,
    "home.leadBody",
    (settings as unknown as Record<string, unknown>)[`homeLeadBody${cap}`] as string || t("leadBody")
  );
  const sectionTitle = cv(
    content,
    "home.sectionTitle",
    (settings as unknown as Record<string, unknown>)[`homeSectionTitle${cap}`] as string || t("sectionTitle")
  );
  const sectionBody = cv(
    content,
    "home.sectionBody",
    (settings as unknown as Record<string, unknown>)[`homeSectionBody${cap}`] as string || t("sectionBody")
  );

  const practice = listPracticeAreas(true);
  const news = listNews({ onlyPublished: true, limit: 3 });
  const achievements = listAchievements(true).slice(0, 3);
  const offices = listOffices(true);

  const titleSegments =
    locale === "ar"
      ? { first: "د. حسام لطفي", second: "للمحاماة" }
      : locale === "fr"
        ? { first: "Dr. Hossam Loutfi", second: "Cabinet d'avocat" }
        : { first: "Dr. Hossam Loutfi", second: "Law Firm" };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end bg-[var(--navy)] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={settings.heroImage || "/images/hero.jpg"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[rgba(11,18,32,0.35)] to-[rgba(11,18,32,0.3)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,18,32,0.5)] to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 pb-16 md:pb-24 pt-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-3 text-kicker text-[var(--gold-soft)]">
              <span className="eyebrow-line" />
              {cv(content, "hero.eyebrow", th("eyebrow"))}
            </span>
            <h1 className="mt-6 font-serif text-white leading-[0.98]">
              <span className="block text-[clamp(2.7rem,7vw,5.6rem)]">{titleSegments.first}</span>
              <span className="block text-[clamp(2.4rem,6vw,4.8rem)] text-[var(--gold-soft)]">
                {titleSegments.second}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base md:text-lg leading-relaxed text-white/75">
              {heroIntro}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-solid">
                {cv(content, "hero.primaryCta", th("primaryCta"))}
              </Link>
              <Link href="/about" className="btn-glass">
                {cv(content, "hero.secondaryCta", th("secondaryCta"))}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial intro */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow light>{tnav("about")}</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl">{leadTitle}</h2>
          </div>
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-[var(--muted)]">{leadBody}</p>
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div>
                <div className="number-stat">{practice.length || "—"}</div>
                <div className="mt-1 text-sm uppercase tracking-wider text-[var(--muted)]">
                  {t("statLegal")}
                </div>
              </div>
              <div>
                <div className="number-stat">{offices.length || "—"}</div>
                <div className="mt-1 text-sm uppercase tracking-wider text-[var(--muted)]">
                  {t("statOffices")}
                </div>
              </div>
              <div>
                <div className="number-stat">N/A</div>
                <div className="mt-1 text-sm uppercase tracking-wider text-[var(--muted)]">
                  {t("statIntegrity")}
                </div>
              </div>
              <div>
                <div className="number-stat">N/A</div>
                <div className="mt-1 text-sm uppercase tracking-wider text-[var(--muted)]">
                  {t("statAbout")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* About / architecture */}
      <section className="relative bg-[var(--navy)] text-white">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-large)] border border-white/10">
            <Image
              src={settings.sectionImage || "/images/architecture.jpg"}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.5)] to-transparent" />
          </div>
          <div>
            <Eyebrow light>{tnav("about")}</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl md:text-5xl text-white leading-[1.05]">
              {sectionTitle}
            </h2>
            <p className="mt-6 text-white/70 leading-relaxed">{sectionBody}</p>
            <Link href="/about" className="btn-glass mt-8">
              {tcommon("learnMore")}
            </Link>
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <Section>
        <SectionHeader
          kicker={cv(content, "nav.practice", tnav("practice"))}
          title={cv(content, "home.practiceTitle", t("practiceTitle"))}
        />
        {practice.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {practice.map((p) => (
              <div key={p.id} className="glass-card p-7">
                <div className="flex items-center justify-between pb-3">
                  <div className="h-1 w-10 bg-[var(--gold)] rounded-full" />
                  {!p.confirmed ? <Badge tone="gold">{tp("needsConfirmation")}</Badge> : null}
                </div>
                <h3 className="mt-5 font-serif text-2xl">{p[`name${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof p] as string}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                  {(
                    p[`description${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof p] as string
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[rgba(22,26,32,0.2)] rounded-[var(--radius-medium)] p-10 text-center text-[var(--muted)]">
            {tp("empty")}
          </div>
        )}
        <div className="mt-8">
          <Link href="/practice-areas" className="btn-outline">
            {tcommon("viewAll")}
          </Link>
        </div>
      </Section>

      {/* News */}
      {news.length ? (
        <section className="bg-white border-y border-[rgba(22,26,32,0.08)]">
          <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-20">
            <SectionHeader
              kicker={cv(content, "nav.news", tnav("news"))}
              title={cv(content, "home.newsTitle", t("newsTitle"))}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {news.map((n) => (
                <Link
                  key={n.id}
                  href={`/news/${n[`slug${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof n] as string}`}
                  className="group glass-card overflow-hidden"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {n.image ? (
                      <Image
                        src={n.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[var(--navy-soft)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,18,32,0.45)] to-transparent" />
                    {n.featured ? (
                      <div className="absolute top-4 start-4">
                        <Badge tone="gold">{tn("featured")}</Badge>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wider text-[var(--gold)]">
                      {formatDate(n.publishedAt, locale)}
                    </p>
                    <h3 className="mt-3 font-serif text-xl leading-snug line-clamp-2">
                      {n[`title${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof n] as string}
                    </h3>
                    <p className="mt-3 text-sm text-[var(--muted)] line-clamp-2">
                      {n[`excerpt${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof n] as string}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/news" className="btn-outline">
                {t("newsCta")}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Achievements */}
      {achievements.length ? (
        <Section>
          <SectionHeader
            kicker={cv(content, "nav.achievements", tnav("achievements"))}
            title={cv(content, "home.achievementsTitle", t("achievementsTitle"))}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {achievements.map((a) => (
              <div key={a.id} className="border border-[rgba(22,26,32,0.1)] rounded-[var(--radius-medium)] p-7">
                <Badge tone="burgundy">
                  {ta(`types.${a.type}`)}
                </Badge>
                <h3 className="mt-5 font-serif text-2xl leading-snug">
                  {a[`title${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof a] as string}
                </h3>
                <p className="mt-3 text-sm text-[var(--muted)] line-clamp-3">
                  {a[`description${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof a] as string}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/achievements" className="btn-outline">
              {t("achievementsCta")}
            </Link>
          </div>
        </Section>
      ) : null}

      {/* CTA */}
      <section className="relative bg-[var(--burgundy)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={settings.sectionImage || "/images/architecture-2.jpg"} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-20 md:py-28 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">{cv(content, "home.visitTitle", t("visitTitle"))}</h2>
          <p className="mt-5 max-w-xl mx-auto text-white/75">{heroIntro}</p>
          <Link href="/contact" className="btn-glass mt-8">
            {cv(content, "home.visitCta", t("visitCta"))}
          </Link>
        </div>
      </section>
    </div>
  );
}

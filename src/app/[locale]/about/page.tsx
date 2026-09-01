import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section, Eyebrow } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getSettings, listOffices, listPracticeAreas } from "@/lib/db/repo";
import { getSiteContent, cv } from "@/lib/content";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("introTitle"),
    alternates: { canonical: `/${locale}/about` }
  };
}

export default async function AboutPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("about");
  const content = getSiteContent(locale);
  const settings = getSettings();
  const cap = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const offices = listOffices(true);
  const areas = listPracticeAreas(true).filter((a) => a.confirmed);

  const getValue = (base: string) =>
    (settings as unknown as Record<string, unknown>)[`${base}${cap}`] as string | undefined || "";
  const intro = getValue("aboutIntro");
  const philosophy = getValue("aboutPhilosophy");
  const approach = getValue("aboutApproach");
  const presenceTitle = getValue("aboutPresenceTitle");
  const areasTitle = getValue("aboutAreasTitle");
  const profile = getValue("aboutProfile");

  return (
    <div>
      <PageHeader
        kicker={cv(content, "about.eyebrow", t("eyebrow"))}
        title={cv(content, "about.title", t("title"))}
        intro={intro || cv(content, "about.introTitle", t("introTitle"))}
      />

      <Section>
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
          <div>
            <Eyebrow>{cv(content, "about.philosophyTitle", t("philosophyTitle"))}</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl">{cv(content, "about.philosophyTitle", t("philosophyTitle"))}</h2>
            <div className="prose-firm mt-6">
              {philosophy ? (
                <p>{philosophy}</p>
              ) : (
                <>
                  <p>
                    {locale === "ar"
                      ? "تلتزم الممارسة القانونية في المكتب بالصرامة والوضوح والسرية. يُدرس كل ملف بعناية، ويُبنى الرأي القانوني على وقائع الموضوع قبل أي شيء آخر."
                      : locale === "fr"
                        ? "La pratique du cabinet repose sur la rigueur, la clarté et la confidentialité. Chaque dossier est étudié avec soin, et l'avis juridique se fonde d'abord sur les faits."
                        : "The practice of the firm is grounded in rigour, clarity and confidentiality. Every matter is studied carefully, and the legal view is grounded first in the facts of the case."}
                  </p>
                  <p>
                    {locale === "ar"
                      ? "يُدار العمل بلغات متعددة ليطابق احتياجات كل عميل، مع الحفاظ على طابع مؤسسي رصين وهادئ."
                      : locale === "fr"
                        ? "Le travail est conduit dans plusieurs langues pour répondre aux besoins de chaque client, dans un cadre institutionnel serein et maîtrisé."
                        : "Work is conducted across languages to meet each client's needs, within a calm and considered institutional framework."}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[var(--radius-large)] overflow-hidden border border-[rgba(22,26,32,0.1)]">
            <Image src={settings.aboutImage || "/images/architecture.jpg"} alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <section className="bg-white border-y border-[rgba(22,26,32,0.08)]">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-20">
          <Eyebrow>{cv(content, "about.approachTitle", t("approachTitle"))}</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl">{cv(content, "about.approachTitle", t("approachTitle"))}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)] max-w-3xl">
            {approach ||
              (locale === "ar"
                ? "يتبنى المكتب منهجاً استشارياً: الاستماع الدقيق، والبحث المعمق، والعرض الواضح للخيارات. وتُقدَّم المشورة بصدق وموضوعية، مع احترام تام لكافة متطلبات السرية المهنية."
                : locale === "fr"
                  ? "Le cabinet adopte une démarche consultative : écoute attentive, recherche approfondie et présentation claire des options. Le conseil est donné avec sincérité et objectivité, dans le strict respect du secret professionnel."
                  : "The firm takes an advisory approach: attentive listening, in-depth research and a clear presentation of options. Advice is given with candour and objectivity, in full respect of professional secrecy.")}
          </p>
        </div>
      </section>

      <Section>
        <Eyebrow>{cv(content, "about.presenceTitle", t("presenceTitle"))}</Eyebrow>
        <h2 className="mt-5 font-serif text-4xl">{presenceTitle || cv(content, "about.presenceTitle", t("presenceTitle"))}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offices.map((o, i) => (
            <div key={o.id} className="glass-card p-7">
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{o[`name${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof o] as string}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {o[`address${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof o] as string}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[var(--navy)] text-white">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-16 py-20">
          <Eyebrow light>{cv(content, "about.areasTitle", t("areasTitle"))}</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl text-white">{areasTitle || cv(content, "about.areasTitle", t("areasTitle"))}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {areas.length ? (
              areas.map((a) => (
                <Link
                  key={a.id}
                  href="/practice-areas"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:text-white transition-colors"
                >
                  {a[`name${locale[0].toUpperCase()}${locale.slice(1)}` as keyof typeof a] as string}
                </Link>
              ))
            ) : (
              <span className="text-white/50">—</span>
            )}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>{cv(content, "about.profileTitle", t("profileTitle"))}</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl">{cv(content, "about.profileTitle", t("profileTitle"))}</h2>
            <div className="prose-firm mt-6">
              <p>{profile || cv(content, "about.profileIntro", t("profileIntro"))}</p>
            </div>
            <Link href="/contact" className="btn-solid mt-8">
              {cv(content, "about.contactCta", t("contactCta"))}
            </Link>
          </div>
          <div className="glass-card p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[var(--navy)] text-white flex items-center justify-center font-serif text-2xl">
                HL
              </div>
              <div>
                <div className="font-serif text-xl">Dr. Hossam Loutfi</div>
                <Badge tone="gold">The Firm</Badge>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[var(--muted)]">{profile || cv(content, "about.profileIntro", t("profileIntro"))}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

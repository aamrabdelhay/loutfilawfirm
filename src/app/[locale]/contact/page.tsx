import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/public/PageHeader";
import { Section, Eyebrow } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { getSiteData } from "@/lib/site";
import { getSiteContent, cv } from "@/lib/content";
import { MapPin, Phone, MessageCircle, Mail, Maximize } from "lucide-react";

type Params = { locale: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: { canonical: `/${locale}/contact` }
  };
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");
  const content = getSiteContent(locale);
  const { settings, offices } = await getSiteData();
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const mainPhones = settings.mainPhones.split(",").map((v) => v.trim()).filter(Boolean);
  const faxPhones = settings.faxPhones.split(",").map((v) => v.trim()).filter(Boolean);

  return (
    <div>
      <PageHeader
        kicker={cv(content, "contact.eyebrow", t("eyebrow"))}
        title={cv(content, "contact.title", t("title"))}
        intro={cv(content, "contact.intro", t("intro"))}
      />

      <Section>
        <Eyebrow>{cv(content, "contact.officesTitle", t("officesTitle"))}</Eyebrow>
        <h2 className="mt-5 font-serif text-4xl">{cv(content, "contact.officesTitle", t("officesTitle"))}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {offices.map((o, i) => {
            const name = (o as unknown as Record<string, unknown>)[`name${suffix}`] as string || o.nameEn;
            const address = (o as unknown as Record<string, unknown>)[`address${suffix}`] as string || o.addressEn;
            return (
              <div key={o.id} className="glass-card p-7">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                  <MapPin size={18} className="text-[var(--gold)]" />
                </div>
                <h3 className="mt-4 font-serif text-2xl">{name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{address}</p>
                {o.mapUrl ? (
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--burgundy)] hover:underline">
                    <Maximize size={14} /> {cv(content, "contact.mapLink", t("mapLink"))}
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          <div className="rounded-[var(--radius-medium)] border border-[rgba(22,26,32,0.12)] bg-white p-7">
            <div className="inline-flex h-11 w-11 rounded-full bg-[rgba(100,31,43,0.1)] text-[var(--burgundy)] items-center justify-center">
              <Phone size={18} />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{cv(content, "contact.mainLines", t("mainLines"))}</h3>
            <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
              {mainPhones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block hover:text-[var(--burgundy)]">{p}</a>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-medium)] border border-[rgba(22,26,32,0.12)] bg-white p-7">
            <div className="inline-flex h-11 w-11 rounded-full bg-[rgba(168,137,82,0.12)] text-[var(--gold)] items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{cv(content, "contact.fax", t("fax"))}</h3>
            <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
              {faxPhones.map((p) => (
                <a key={p} href={`tel:${p}`} className="block hover:text-[var(--burgundy)]">{p}</a>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-medium)] border border-[rgba(22,26,32,0.12)] bg-white p-7">
            <div className="inline-flex h-11 w-11 rounded-full bg-[rgba(79,155,114,0.12)] text-[var(--success)] items-center justify-center">
              <Phone size={18} />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{cv(content, "contact.mobile", t("mobile"))}</h3>
            <a href={`tel:${settings.mobilePhone}`} className="mt-4 block text-sm text-[var(--muted)] hover:text-[var(--burgundy)]">
              {settings.mobilePhone}
            </a>
          </div>

          <div className="rounded-[var(--radius-medium)] border border-[rgba(22,26,32,0.12)] bg-white p-7">
            <div className="inline-flex h-11 w-11 rounded-full bg-[rgba(11,18,32,0.08)] text-[var(--ink)] items-center justify-center">
              <Mail size={18} />
            </div>
            <h3 className="mt-5 font-serif text-2xl">{cv(content, "contact.email", t("email"))}</h3>
            <a href={`mailto:${settings.contactEmail}`} className="mt-4 block text-sm break-all text-[var(--muted)] hover:text-[var(--burgundy)]">
              {settings.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-16 rounded-[var(--radius-large)] bg-[var(--navy)] text-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl">{cv(content, "contact.intro", t("intro"))}</h2>
          </div>
          <Link href="/" className="btn-glass">{tc("backHome")}</Link>
        </div>
      </Section>
    </div>
  );
}

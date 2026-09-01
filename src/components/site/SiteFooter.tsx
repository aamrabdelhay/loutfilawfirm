import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteData } from "@/lib/site";
import { cv } from "@/lib/content";

const NAV = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/practice-areas", key: "practice" as const },
  { href: "/news", key: "news" as const },
  { href: "/achievements", key: "achievements" as const },
  { href: "/careers", key: "careers" as const },
  { href: "/contact", key: "contact" as const }
];

export async function SiteFooter({
  content = {}
}: {
  content?: Record<string, string>;
}) {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("contact");
  const { settings, offices } = await getSiteData();
  const suffix = `${locale[0].toUpperCase()}${locale.slice(1)}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="font-serif text-xl tracking-[0.08em]">
              DR. HOSSAM LOUTFI
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.34em] text-[var(--gold-soft)]">
              Law Firm
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              {(settings as unknown as Record<string, unknown>)[`footer${suffix}`] as string ||
                `${cv(content, "footer.brand", t("brand"))} — ${cv(content, "footer.rights", t("rights"))}`}
            </p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-[var(--gold-soft)] mb-5">
              {cv(content, "footer.offices", t("offices"))}
            </h2>
            <ul className="space-y-4 text-sm text-white/70">
              {offices.map((o) => (
                <li key={o.id}>
                  <div className="text-white">
                    {(o as unknown as Record<string, unknown>)[`name${suffix}`] as string || o.nameEn}
                  </div>
                  <div className="mt-1">
                    {(o as unknown as Record<string, unknown>)[`address${suffix}`] as string || o.addressEn}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-[var(--gold-soft)] mb-5">
              {cv(content, "footer.contact", t("contact"))}
            </h2>
            <div className="space-y-4 text-sm text-white/70">
              <a href={`mailto:${settings.contactEmail}`} className="block hover:text-white">
                {settings.contactEmail}
              </a>
              <div className="space-y-1">
                {settings.mainPhones.split(",").map((p) => (
                  <a key={p} href={`tel:${p.trim()}`} className="block hover:text-white">
                    {p.trim()}
                  </a>
                ))}
              </div>
              <div className="text-white/50">
                {tc("fax")}{" "}
                {settings.faxPhones.split(",").map((p) => p.trim()).join(" · ")}
              </div>
              <div className="text-white/50">
                {tc("mobile")} {settings.mobilePhone}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-[0.22em] text-[var(--gold-soft)] mb-5">
              {cv(content, "footer.navigation", t("navigation"))}
            </h2>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/70">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-white">
                  {cv(content, `nav.${n.key}`, tn(n.key))}
                </Link>
              ))}
            </nav>
            <h2 className="text-sm uppercase tracking-[0.22em] text-[var(--gold-soft)] mt-8 mb-4">
              {cv(content, "footer.languages", t("languages"))}
            </h2>
            <div className="flex gap-2 text-sm">
              {(["ar", "en", "fr"] as const).map((l) => (
                <Link key={l} href={"/"} locale={l} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 uppercase text-xs text-white/70 hover:text-white">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <span>{new Date().getFullYear()} © DR. HOSSAM LOUTFI LAW FIRM — {year}</span>
          <a href="/admin/login" className="inline-flex items-center gap-2 hover:text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
            {t("admin")}
          </a>
        </div>
      </div>
    </footer>
  );
}

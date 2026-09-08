import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { fontVariables, fontLinks } from "@/lib/fonts";
import "./globals.css";
import "./contrast.css";
import "./admin.css";
import { getSettings } from "@/lib/db/repo";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "DR. HOSSAM LOUTFI LAW FIRM",
    template: "%s | Dr. Hossam Loutfi Law Firm"
  },
  description:
    "A senior Egyptian legal practice. Dr. Hossam Loutfi Law Firm advises on a broad range of legal matters with discretion, rigour and care.",
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#0B1220",
  width: "device-width",
  initialScale: 1
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Ensure the settings row exists early so server components can render.
  try {
    getSettings();
  } catch {
    // The db will be initialized later; avoid crashing the shell.
  }

  const headerList = await headers();
  const xLocale = headerList.get("x-locale");
  const locale = xLocale === "ar" || xLocale === "fr" ? xLocale : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {fontLinks.map((l) => (
          <link key={l.href} rel={l.rel} href={l.href} />
        ))}
      </head>
      <body style={{ textAlign: "start" }}>{children}</body>
    </html>
  );
}

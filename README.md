# Dr. Hossam Loutfi Law Firm

Premium multilingual website for **Dr. Hossam Loutfi Law Firm** — Arabic, English and French (RTL-aware), with a production-grade CMS and admin dashboard.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS 4**
- **next-intl** (AR / EN / FR, full RTL, persistent language switcher)
- **SQLite** via Node's built-in `node:sqlite` for local-first development and this sandbox
- **Prisma schema** (`prisma/schema.prisma`) included for a production **PostgreSQL** deployment
- **bcryptjs** + HttpOnly session cookies for real admin authentication
- Server-side Zod validation, honeypot, in-process rate limiting

## Running locally

```bash
npm install
npm run db:seed
npm run dev
```

Admin login: `http://localhost:3000/admin/login`

The admin login uses **password only**. Set `ADMIN_PASSWORD` in the environment for the production password. The requested fallback password is `hl` when the environment variable is not configured.

## Public site structure

- `/` → localized home (`/en`, `/ar`, `/fr`)
- `/about`
- `/practice-areas` (legacy `/practice` redirects here)
- `/news` + `/news/[slug]`
- `/achievements`
- `/media`
- `/careers` (Training + Job applications with validation dots, experience builder, consent)
- `/gallery`
- `/contact`
- `/robots.txt`, `/sitemap.xml`

## Admin

Protected under `/admin` (redirects to `/admin/login` when unauthenticated; `noindex`).

- Dashboard (application / content counts, recent applications)
- Applications (filter, search, status, delete, CSV export; applicant data is never public)
- News (full multilingual CMS, publish / feature / SEO)
- Achievements
- Media (YouTube IDs auto-detected; thumbnail auto-generated)
- Practice Areas (multilingual, order, publish, "confirmed by firm")
- Office Locations
- Gallery (CMS-managed images)
- Site Content (every public page text in AR/EN/FR: navigation, hero, homepage sections, About, practice/news/achievements/media/careers/contact pages, careers form text/privacy/consent, footer — no developer needed for ordinary content changes)
- Site Settings (contact, phone groups, SEO defaults, footer, hero statement, homepage editorial content, and About content)

A discreet lock icon in the public header links to `/admin/login`; it provides no security. Real protection is enforced server-side.

## Data layer

The app uses a typed repository (`src/lib/db/repo.ts`) backed by `node:sqlite`. The schema mirrors `prisma/schema.prisma`, so moving to PostgreSQL on Vercel means switching the data source to Prisma + a Postgres URL and replacing the repository implementation with Prisma queries (the table/column names are identical).

## Content policy

No achievements, awards, clients, rankings, opening hours or biographical facts are invented as real facts. Every editable area is seeded with **clearly labelled draft placeholders** ("Draft placeholder — awaiting confirmation") so the firm can log into the admin panel and replace them with real content. The three practice-area placeholders are flagged "awaiting confirmation". News, achievements and media placeholders are published so the layout is visible, but all of them are obvious placeholders and are fully editable/deletable in the admin.

## Production notes

- Set `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`, and admin credentials as real environment variables.
- Fonts are loaded from Google Fonts in the browser only; the build never depends on `fonts.googleapis.com`.
- Add a shared rate limiter (e.g. Redis/Upstash) and real SMTP notifications for a fully hardening production deployment.

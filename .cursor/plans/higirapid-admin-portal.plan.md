---
name: higirapid-admin-portal
overview: Add a scalable admin portal to HigiRapid on Vercel with a hosted SQL database, object storage for media, single-admin credentials, and gradual migration from JSON/hardcoded content.
todos:
  - id: foundation
    content: Neon + Drizzle schema/migrations; middleware excludes /admin; Auth.js Credentials (ADMIN_EMAIL + ADMIN_PASSWORD_HASH); admin shell layout
    status: completed
  - id: site-settings
    content: site_settings + API; edit WhatsApp/contact CTAs; unify public components on getSiteSettings(); revalidatePath per locale
    status: completed
  - id: services-crud
    content: DB-backed services with en/es/ca fields; admin CRUD; Services section reads DB with JSON fallback
    status: completed
  - id: gallery-crud
    content: Vercel Blob uploads; gallery_items table; admin CRUD; Gallery section reads DB
    status: completed
  - id: homepage-remaining
    content: Hero image + key homepage copy from DB or homepage_blocks; migrate FAQ/testimonials/areas/process as typed rows or blocks
    status: completed
  - id: hardening
    content: Rate limit login route; audit env docs; optional footer Admin link to /admin/login
    status: completed
isProject: true
---

# HigiRapid admin portal (Vercel + single admin)

## Locked decisions


| Decision | Choice                | Rationale                                                                                                                                                                                         |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hosting  | **Vercel**            | Serverless functions; no local SQLite file as primary store; use **Neon Postgres** (or Turso/libSQL) + serverless driver.                                                                         |
| Auth v1  | **Single admin only** | `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (bcrypt), no `admin_users` table until a later phase. Use **Auth.js (NextAuth v5)** Credentials provider + JWT or database session store on Neon if needed. |


## Current codebase (baseline)

- Next.js 15 App Router, `next-intl` with `localePrefix: "always"` (`[src/middleware.ts](src/middleware.ts)` excludes `api` only today).
- Copy in `[src/i18n/messages/*.json](src/i18n/messages/en.json)`; gallery data hardcoded in `[src/components/sections/Gallery.tsx](src/components/sections/Gallery.tsx)`; hero image constant in `[src/components/sections/Hero.tsx](src/components/sections/Hero.tsx)`.
- WhatsApp: `NEXT_PUBLIC_WHATSAPP_NUMBER` and duplicated `wa.me` logic in Hero vs `[src/lib/whatsapp.ts](src/lib/whatsapp.ts)`.

## Target architecture

1. **Routes**: `app/admin/(auth)/login`, `app/admin/(dashboard)/`** **outside** `[src/app/[locale]](src/app/[locale])` so URLs are `/admin/...`.
2. **Middleware**: Extend matcher to exclude `admin` (mirror `api` exclusion) so next-intl does not prefix admin paths.
3. **Database**: **Neon** + **Drizzle** (migrations in repo). Tables at minimum:
  - `site_settings` (singleton row): `whatsapp_e164`, optional `contact_email`, CTA-related fields as needed.
  - `service_offerings` + per-locale text (join table or JSON column validated with Zod).
  - `gallery_items` (category, image URL, alt, object position, price_from, sort_order, optional per-locale caption).
  - `homepage_blocks` or dedicated tables for hero + sections (choose one pattern; blocks scale better for new page types).
4. **Media**: **Vercel Blob** for uploads; persist URL in DB; configure `images.remotePatterns` for `next/image`.
5. **Public reads**: Server-only `getSiteContent` / `getSiteSettings` with **fallback** to existing JSON/constants until each slice is migrated.
6. **Freshness**: `revalidatePath`/`revalidateTag` after successful admin mutations for affected locales.

## Auth v1 (single admin)

- Env: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` (generate bcrypt hash offline; never commit plaintext password).
- Optional: `AUTH_SECRET` (Auth.js), `DATABASE_URL` (Neon).
- Login rate limiting on `POST` login or credential callback (e.g. `@upstash/ratelimit` + Vercel KV, or simple in-memory dev-only with TODO for production store).
- No self-signup, no user management UI in v1.

## Env vars (Vercel)

- `DATABASE_URL` (Neon pooled connection string)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`
- `AUTH_SECRET`
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob)
- Existing: `CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` — migrate WhatsApp to DB when site_settings ships; keep env fallback during migration

## Implementation phases (todos above)

1. **Foundation** — DB, Drizzle, middleware, Auth.js, empty admin dashboard.
2. **Site settings** — editable WhatsApp/contact; unify Footer, Hero, FloatingCta via shared helper + server-provided or fetched settings.
3. **Services CRUD** — replaces static service cards data; 3 locales in admin forms.
4. **Gallery CRUD** — Blob uploads + DB; replace `PLACEHOLDER_ITEMS`.
5. **Homepage / remaining** — hero asset + copy; FAQ, testimonials, process, areas via blocks or tables.
6. **Hardening** — rate limits, env documentation, discreet footer link to `/admin/login` if product wants it.

## Out of scope for v1

- Multiple admin users, roles, invite flows.
- Redis unless added later for rate limiting at scale.

## Open questions

- None blocking; optional later: second admin user → add `admin_users` and migrate off env-only credentials.


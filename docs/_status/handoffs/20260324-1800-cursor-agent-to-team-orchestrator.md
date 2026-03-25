# Handoff: HigiRapid admin portal implementation

## Context

Implemented the attached plan for a scalable admin area on Vercel: Neon Postgres, Drizzle, Auth.js (single admin), CMS tables, optional Vercel Blob uploads, and public-site integration with fallbacks.

## Decisions

- **Middleware**: `next-intl` for non-admin routes; `/admin` uses `NextAuth(authConfig).auth` (edge-safe, no bcrypt in middleware bundle).
- **Auth**: Split `src/auth.config.ts` (JWT/session callbacks, empty providers) + `src/lib/auth-credentials-provider.ts` (bcrypt) merged in `src/auth.ts` for route handlers.
- **Public reads**: `getSiteSettings`, `getServiceCards`, `getGalleryItems`, `getContentOverrideMap` wrapped in React `cache()`; DB optional — falls back to env + JSON when `DATABASE_URL` is missing.
- **Mutations**: Server actions return `Promise<void>` where used as `<form action>` (Next 15 typing).

## Deliverables

- Schema + migration: [`drizzle/0000_init.sql`](drizzle/0000_init.sql), [`src/db/schema.ts`](src/db/schema.ts), [`drizzle.config.ts`](drizzle.config.ts)
- DB client: [`src/db/index.ts`](src/db/index.ts), seed [`src/db/seed.ts`](src/db/seed.ts)
- Auth: [`src/auth.ts`](src/auth.ts), [`src/auth.config.ts`](src/auth.config.ts), [`src/lib/auth-credentials-provider.ts`](src/lib/auth-credentials-provider.ts), [`src/app/api/auth/[...nextauth]/route.ts`](src/app/api/auth/[...nextauth]/route.ts)
- Middleware: [`src/middleware.ts`](src/middleware.ts)
- Admin UI: [`src/app/admin/`](src/app/admin/) (login, dashboard, settings, services, gallery, content)
- Actions: [`src/app/admin/actions.ts`](src/app/admin/actions.ts)
- Upload: [`src/app/api/admin/upload/route.ts`](src/app/api/admin/upload/route.ts)
- Public wiring: [`src/lib/site-data.ts`](src/lib/site-data.ts), [`src/lib/revalidate-public.ts`](src/lib/revalidate-public.ts), [`src/hooks/useMergedT.ts`](src/hooks/useMergedT.ts), [`src/components/providers/ContentOverridesProvider.tsx`](src/components/providers/ContentOverridesProvider.tsx), updates to layout, page, Hero, Services, Gallery, Process, FAQ, Testimonials, ServiceAreas, Header, Footer, FloatingCta
- Config: [`next.config.ts`](next.config.ts) Blob `remotePatterns`, [`.env.example`](.env.example)
- NPM scripts: `db:generate`, `db:migrate`, `db:push`, `db:seed` in [`package.json`](package.json)

## Open questions

- **Vercel**: Add `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and optionally `BLOB_READ_WRITE_TOKEN`; run `npm run db:migrate` against Neon (or `db:push` for dev), then `npm run db:seed`.
- **Build hook**: Optionally run migrations in CI/Vercel before deploy (project-specific).

## Suggested next steps

1. Orchestrator / owner: confirm Neon + Blob stores and add env vars in Vercel.
2. QA: smoke-test login, settings save, service/gallery CRUD, content overrides, and mobile WhatsApp CTAs per locale.
3. Future: multi-admin users table; IP-based rate limit (e.g. Upstash) if login abuse appears.

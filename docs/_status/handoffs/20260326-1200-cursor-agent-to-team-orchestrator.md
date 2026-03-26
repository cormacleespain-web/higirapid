## Context

Implemented the approved HigiRapid content/admin expansion plan to add new marketing destinations, multilingual copy updates, blog capabilities, HR-Club lead capture, and admin workflows for ongoing content operations.

## Decisions

- Added DB models for blog posts and HR-Club leads to support editor-managed publishing and lead operations.
- Added admin `Leads` section and HR-Club recipient email setting to satisfy lead handling/routing requirements.
- Added fallback SEO blog content in `en`, `es`, `ca` so blog pages remain populated before DB seeding.
- Kept existing section architecture and extended with reusable homepage sections (`HR-Club` teaser, `Why choose us`) to minimize regression risk.

## Deliverables

- `src/db/schema.ts`
- `src/lib/site-data.ts`
- `src/lib/admin-queries.ts`
- `src/app/admin/actions.ts`
- `src/app/admin/AdminSidebar.tsx`
- `src/app/admin/(dashboard)/page.tsx`
- `src/app/admin/(dashboard)/settings/page.tsx`
- `src/app/admin/(dashboard)/settings/SiteSettingsForm.tsx`
- `src/app/admin/(dashboard)/blog/page.tsx`
- `src/app/admin/(dashboard)/blog/new/page.tsx`
- `src/app/admin/(dashboard)/blog/[id]/page.tsx`
- `src/app/admin/(dashboard)/blog/BlogPostForm.tsx`
- `src/app/admin/(dashboard)/leads/page.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/hr-club/page.tsx`
- `src/app/[locale]/blog/page.tsx`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/app/[locale]/facade-cleaning/page.tsx`
- `src/app/api/hr-club-leads/route.ts`
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/HRClubTeaser.tsx`
- `src/components/sections/WhyChooseUs.tsx`
- `src/components/forms/HRClubLeadForm.tsx`
- `src/lib/service-icons.ts`
- `src/lib/content-admin-keys.ts`
- `src/lib/blog-fallback.ts`
- `src/i18n/messages/en.json`
- `src/i18n/messages/es.json`
- `src/i18n/messages/ca.json`
- `src/db/seed.ts`
- `docs/qa/checklists/higirapid-content-admin-release-checklist.md`

## Open Questions

- Should lead notifications send via Resend in production immediately, or only store leads in DB until email credentials are configured?
- Should blog posts be DB-only in production once seeded, or should fallback posts remain active as disaster recovery content?

## Suggested Next Steps

- Run `npm run db:push` (or migrations workflow) to apply new tables/columns.
- Seed/update baseline content with `npm run db:seed`, then review admin blog and leads UX.
- Execute `docs/qa/checklists/higirapid-content-admin-release-checklist.md` before release sign-off.

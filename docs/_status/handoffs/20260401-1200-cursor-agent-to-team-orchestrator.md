# Handoff: Cursor agent → team-orchestrator

## Context

Implemented the approved plan: services carousel on the homepage, locale-prefixed **Our Services** page, extended admin/service schema (image, crop focus, from price, per-locale image alt), shared lead form with service-specific email subjects, and `service_slug` on `hr_club_leads`.

## Decisions

- **Reuse `/api/hr-club-leads`** with optional `serviceSlug` / `serviceTitle` instead of a second endpoint — same validation, Resend subject switches to `Service inquiry: {title} — {name}` when a service is set; DB column `service_slug` stores the slug for admin reporting.
- **Contact on services page**: `mailto:` when `contactEmail` is set in site settings; otherwise WhatsApp via existing `getContactHref` (same pattern as footer when email missing).
- **Modal vs sheet**: single overlay pattern — bottom-aligned panel on small viewports, centered `max-w-lg` from `sm` up — avoids new Radix/shadcn dependencies while meeting “sheet on mobile / dialog on desktop” intent.
- **Homepage data source**: `getPublishedServicesList` returns DB published services when present, else the same static fallback list/order as before (`service-public-config.ts` + locale JSON).

## Deliverables

| Area | Paths |
|------|--------|
| Schema + migration | `src/db/schema.ts`, `drizzle/0002_services-media-lead-slug.sql`, `drizzle/meta/_journal.json` |
| Seed | `src/db/seed.ts` (media + fixed `commercial-carpet` → `commercialCarpet` i18n key) |
| Admin | `src/app/admin/actions.ts` (`saveServiceAction` return type + validation), `src/app/admin/(dashboard)/services/ServiceForm.tsx`, `src/components/admin/AdminImageField.tsx` (`services` variant), `src/app/admin/(dashboard)/leads/page.tsx` |
| Public data | `src/lib/site-data.ts`, `src/lib/service-public-config.ts`, `src/lib/revalidate-public.ts` |
| UI | `src/components/sections/Services.tsx`, `src/components/sections/ServicesCarousel.tsx`, `src/components/services/ServicesPageContent.tsx`, `src/components/services/ServiceBookingOverlay.tsx`, `src/app/[locale]/services/page.tsx` |
| Forms / API | `src/components/forms/LeadInquiryForm.tsx`, `src/components/forms/HRClubLeadForm.tsx`, `src/app/api/hr-club-leads/route.ts` |
| Nav / i18n | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `nav.allServices`, `services.*` carousel keys, `servicesPage.*`, `hrClubForm.formHeading` in `en` / `es` / `ca` |
| SEO | `src/app/sitemap.ts` includes `/services` per locale |
| Dependency | `embla-carousel-react` in `package.json` |

## Open questions

- **Run migration in each environment**: `npm run db:migrate` (or apply `0002` via your pipeline) before relying on new columns; existing rows get `NULL` for new fields until edited in admin.
- **Optional**: DeepL “suggest translations” for `image_alt` per locale (not implemented).
- **Optional**: Dedicated `lead_kind` column if you need to filter HR-Club vs service in SQL without inferring from `service_slug`.

## Suggested next steps

1. **QA** (manual): run migration on staging; verify carousel order matches admin drag order; submit HR-Club form (regression) and service booking; confirm lead email subject and admin lead row show `service_slug`.
2. **Accessibility**: keyboard-test carousel prev/next; focus order in booking overlay; `prefers-reduced-motion` for arrow nudge (currently subtle spring — consider disabling if product requires strict reduced-motion).
3. **Orchestrator**: decide whether `nav` should keep both “Services” (`#services`) and “Our services” (`/services`) or consolidate labels for clarity.

## QA checklist (quick)

- [ ] `/{locale}/services` renders all published services in `sort_order` with full description and optional from price.
- [ ] Homepage carousel: 3-line clamp, Learn more → correct hash on services page, View all → `/services`.
- [ ] Book now opens overlay; submit creates lead with `service_slug` and correct email subject when Resend is configured.
- [ ] Contact uses mailto when email in site settings, else WhatsApp.
- [ ] Admin: saving service without alt when image URL set shows validation error; Blob upload works.

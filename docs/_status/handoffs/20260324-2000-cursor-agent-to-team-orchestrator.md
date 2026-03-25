# Handoff: Cursor agent → team-orchestrator

## Context

Implemented the “Admin controls: user-friendly refinement” plan: clearer copy editing with visible defaults, simpler images, grouped services fields, gallery thumbnails, delete confirmations, and dashboard guidance—without changing single-admin auth, Blob upload API, or DB schema.

## Decisions

- **Per-section save for page copy:** Each `CONTENT_GROUPS` tab saves only that section’s keys so editors get clear feedback and smaller submits (same `saveContentEntriesAction`, subset of entries).
- **`editorTier` on groups:** Essential vs full sections are data-driven in [`src/lib/content-admin-keys.ts`](src/lib/content-admin-keys.ts); adjust tiers there without code changes elsewhere.
- **Site settings as client form:** [`SiteSettingsForm.tsx`](src/app/admin/(dashboard)/settings/SiteSettingsForm.tsx) uses `onSubmit` + `saveSiteSettingsAction` so hero URL state stays in sync with `AdminImageField` hidden input.

## Deliverables

- [`src/lib/content-defaults.ts`](src/lib/content-defaults.ts) — defaults from `en`/`es`/`ca` JSON for all content keys.
- [`src/lib/content-admin-keys.ts`](src/lib/content-admin-keys.ts) — `id`, `editorTier` per group.
- [`src/app/admin/(dashboard)/content/ContentEditor.tsx`](src/app/admin/(dashboard)/content/ContentEditor.tsx) — tabs, defaults, optional field keys, essential/full toggle.
- [`src/components/admin/AdminImageField.tsx`](src/components/admin/AdminImageField.tsx), [`AdminConfirmDeleteForm.tsx`](src/components/admin/AdminConfirmDeleteForm.tsx), [`ServiceIconChoice.tsx`](src/components/admin/ServiceIconChoice.tsx).
- Updated admin pages: settings, gallery list + item form, services list + form, dashboard, content page.
- [`docs/_status/decisions.md`](docs/_status/decisions.md) — one decision row.

## Open questions

- **Locale layout:** Plan left open whether page copy should use EN|ES|CA tabs instead of three columns on small screens; current UI keeps a 3-column grid from `md` up.
- **Essential tier set:** Defaults are Hero, Services section, Gallery section, Contact = essential; FAQ/Testimonials/Process/Areas = full. Product can change via `editorTier` only.

## Suggested next steps

- Orchestrator: optional QA pass with a non-technical editor script (edit hero, one copy section, one gallery item, confirm live site).
- Optional follow-up: toast library for consistent global feedback; media library picker (admin-planner “optional later”).

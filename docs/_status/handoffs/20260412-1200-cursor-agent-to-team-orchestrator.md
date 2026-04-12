# Handoff: CMS public freshness (2026-04-12)

## Context

Editors save on production (`higirapid.es`, footer admin). Public routes under `[locale]` were still able to serve cached HTML/RSC from the Full Route Cache despite `revalidatePath` on save. Implemented Phase B (`dynamic = "force-dynamic"` on the public locale layout), optional Bearer `POST /api/revalidate`, and optional deploy-hook sidebar control with calm copy.

## Decisions

- **Force-dynamic on `[locale]/layout.tsx`**: Ensures each visitor request renders from Neon-backed data without relying on invalidation alone.
- **`CMS_REVALIDATE_SECRET`**: Secures `/api/revalidate` for off-production or automation callers; not needed for day-to-day admin on production.
- **Sidebar wording**: “Refresh what visitors see” (cache bust) and “Apply updates to the live site” only when `VERCEL_DEPLOY_HOOK_URL` is set; no “rebuild” language.

## Deliverables

- [`src/app/[locale]/layout.tsx`](../../../../src/app/[locale]/layout.tsx) — `export const dynamic = "force-dynamic"`.
- [`src/app/api/revalidate/route.ts`](../../../../src/app/api/revalidate/route.ts) — Bearer-authenticated POST.
- [`src/app/admin/actions.ts`](../../../../src/app/admin/actions.ts) — `refreshPublicContentAction`, `applyLiveSiteUpdatesAction`.
- [`src/app/admin/AdminSidebar.tsx`](../../../../src/app/admin/AdminSidebar.tsx) — refresh + optional hook UI.
- [`src/app/admin/(dashboard)/layout.tsx`](../../../../src/app/admin/(dashboard)/layout.tsx) — passes `deployHookEnabled`.
- [`.env.example`](../../../../.env.example) — `CMS_REVALIDATE_SECRET`, `VERCEL_DEPLOY_HOOK_URL`.
- [`docs/_status/decisions.md`](../decisions.md) — decision row logged.

## Open questions

- **Performance**: Monitor TTFB and Neon query volume after deploy; if needed, revisit tag-based caching (Phase C) instead of full dynamic.
- **Deploy hook**: Only add `VERCEL_DEPLOY_HOOK_URL` in Vercel if editors need the break-glass control; it triggers a new deployment (minutes).

## Suggested next steps

- **Deployment Expert**: Set `CMS_REVALIDATE_SECRET` in Production if CI/preview should call `/api/revalidate`; set `VERCEL_DEPLOY_HOOK_URL` only if product wants the second sidebar button.
- **QA Lead**: Run the matrix below after deploy.

### QA matrix

1. **Incognito / new session**: After saving in admin on `higirapid.es`, open the public homepage in a fresh window — content should match DB (force-dynamic path).
2. **Sidebar “Refresh what visitors see”**: Should toast success; public pages should reflect latest DB if any edge case remained.
3. **Optional hook**: If env is set, “Apply updates to the live site” should toast success and a new deployment should appear in Vercel (may take minutes).
4. **`POST /api/revalidate`**: With secret set, `curl -X POST -H "Authorization: Bearer $CMS_REVALIDATE_SECRET" https://higirapid.es/api/revalidate` → `{"ok":true}`.

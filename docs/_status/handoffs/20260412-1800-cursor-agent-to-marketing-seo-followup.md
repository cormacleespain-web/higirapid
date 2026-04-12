# Handoff: SEO technical implementation → Marketing / ops

## Context

Technical SEO adoption (audit + roadmap) was implemented in code: www canonical URLs, metadata, hreflang, sitemap priorities, structured data, and expanded blog starter copy. Marketing steps require dashboard access and cannot be completed by the codebase alone.

## Decisions

- Google Search Console and Google Business Profile are **owner: Marketing** with URLs using the real locale prefix (`https://www.higirapid.es/es/...`, not legacy roadmap examples without `/es`).
- Existing Neon databases already seeded with blog posts **do not** automatically pick up longer bodies from `src/lib/blog-long-form-bodies.ts`; new installs and re-seeds do. To refresh live article text, edit posts in **Admin → Blog** or re-import content.

## Deliverables

- Code paths: `src/lib/seo/*`, `src/components/seo/*`, updated `[locale]` pages, `next.config.ts`, `src/i18n/config.ts` (`defaultLocale: es`), `src/lib/blog-long-form-bodies.ts`, `docs/_status/decisions.md` (this round).

## Open questions

- **Who** confirms production `NEXT_PUBLIC_BASE_URL` in Vercel is exactly `https://www.higirapid.es` (no trailing slash)?
- **When** should product decide on new IA (`/precios`, `/el-masnou`, per-service URLs) vs expanding CMS-only `/services`?

## Suggested next steps (Marketing)

1. **Google Search Console**: Add property for `https://www.higirapid.es`, verify ownership, submit `https://www.higirapid.es/sitemap.xml`.
2. **URL Inspection**: Request indexing for `https://www.higirapid.es/es`, `https://www.higirapid.es/es/services`, `https://www.higirapid.es/es/blog`, and one blog article URL.
3. **Google Business Profile**: Create/verify listing; align NAP with `CleaningService` JSON-LD on the homepage (El Masnou / service area).
4. **Citations**: After GBP, submit consistent NAP to Bing Places, Páginas Amarillas, Yelp ES (roadmap A23).

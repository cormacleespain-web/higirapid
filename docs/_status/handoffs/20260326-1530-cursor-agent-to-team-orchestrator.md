## Context

Implemented the approved SEO infrastructure plan to add production-ready `sitemap.xml` and `robots.txt` for the public HigiRapid site, using locale-prefixed routing and a canonical domain strategy for Google Search.

## Decisions

- Canonical host set to `https://higirapid.es` for sitemap, robots, and locale alternate URL defaults.
- Sitemap includes only indexable public locale routes and published blog detail routes; admin/API/query variants are excluded.
- Robots policy allows crawl on public paths while disallowing `/admin/` and `/api/`; query URLs are not globally blocked.

## Deliverables

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/app/[locale]/layout.tsx`
- `docs/_status/decisions.md`

## Open Questions

- Should we add explicit page-level canonical tags for blog category query variants to reinforce canonicalization (`/blog?category=...` -> `/blog`)?

## Suggested Next Steps

- Team orchestrator can coordinate Search Console submission on `https://higirapid.es/sitemap.xml` and verify indexing outcomes after deployment.

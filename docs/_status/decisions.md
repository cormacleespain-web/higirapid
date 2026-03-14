# Decisions

Significant product/technical decisions with date, agent, and rationale.

| Date       | Agent            | Decision | Rationale |
|------------|------------------|----------|-----------|
| 2026-03-14 | team-orchestrator | Use only `next/font/google` for Google Fonts; no `<link>` or external stylesheet to fonts.googleapis.com | Single source of truth and better performance: next/font self-hosts at build time, avoids extra network requests and layout shift; duplicate loading would be redundant and harder to maintain. Documented in `docs/fonts.md` and `src/lib/fonts.ts`. |
| 2026-03-14 | team-orchestrator | Centralize all font loading in `src/lib/fonts.ts`; layout applies CSS variables; Tailwind consumes them | One place to add or change fonts; consistent pattern for Google (next/font/google) and local (next/font/local) fonts; avoids scattered font config. |
| 2026-03-14 | frontend-engineer | Hero full-bleed background: Next Image with fill + object-cover in absolute inset-0 container; image source `https://picsum.photos/1920/1080?random=hero` | Single high-resolution asset for cover quality; no new deps; final hero asset can be swapped via constant or public/ path later. |
| 2026-03-14 | frontend-engineer | Hero overlay: `bg-black/60` (60% opacity) for dark overlay on background image | Ensures WCAG 2.1 AA contrast for white/light text on overlay; 50% was borderline, 60% gives safe contrast. |
| 2026-03-14 | frontend-engineer | Hero text: headline `text-content-inverse`, subhead `text-white/90`; buttons unchanged (primary and WhatsApp already high contrast) | Reuses design token for inverse text; slight tint on subhead for hierarchy; primary and WhatsApp variants already meet contrast on dark. |
| 2026-03-14 | frontend-engineer | Hero focus: `focus-visible:ring-offset-black/80` on Hero CTAs so focus ring is visible on dark overlay | Default ring-offset is light; on dark overlay a dark ring-offset keeps the focus ring clearly visible for keyboard users. |
| 2026-03-14 | frontend-engineer | Hero layout: centered single column; right-side inline image removed; content wrapper flex + items-center + justify-center + text-center | Design requirement for full-bleed bg and centered copy; hero image is now the section background so inline image removed. |
| 2026-03-14 | frontend-artist | Testimonials section background: `.bg-testimonials` utility with gradient (primary → subtle secondary hint) + spotted pattern for depth and theme fit; no animation; tokens only | Plan: layered depth (gradient + pattern) supports trust/calm and abstract freshness; reuses design tokens and existing spotted pattern; static so no reduced-motion concerns. |

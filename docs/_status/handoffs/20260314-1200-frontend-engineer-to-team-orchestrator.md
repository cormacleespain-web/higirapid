# Handoff: Frontend Engineer → Team Orchestrator

## Context

Hero section was updated per requirements: full-bleed background image with dark overlay, accessible light-on-dark copy and CTAs, and centered layout. Implementation is in `src/components/sections/Hero.tsx`; no copy changes, only layout and styling.

## Decisions

- **Background**: Next Image with `fill` + `object-cover` inside an `absolute inset-0` container; image URL set to `https://picsum.photos/1920/1080?random=hero` for cover quality.
- **Overlay**: `bg-black/60` (60% opacity) so text meets WCAG 2.1 AA on the dark overlay.
- **Copy colours**: Headline uses `text-content-inverse` (white); subhead uses `text-white/90` for hierarchy. Buttons unchanged (primary and WhatsApp already high contrast).
- **Focus**: Hero CTAs use `focus-visible:ring-offset-black/80` so the focus ring is visible on the dark background.
- **Layout**: Single column, centered via flex + `items-center` + `justify-center` + `text-center`; right-side inline image removed (hero image is now the section background).

## Deliverables

- `src/components/sections/Hero.tsx` — full-bleed background image, overlay, centered content, accessible text/button styling.
- `docs/_status/decisions.md` — five new decision rows (image source, overlay, text colours, focus, layout).

## Open Questions

- **Final hero asset**: Hero currently uses picsum placeholder. If design provides a final hero image, swap `HERO_IMAGE` in `Hero.tsx` to a path under `public/` or update the constant; no code change required beyond the URL/path.
- **Accessibility review**: Suggest Accessibility Lead or QA run a quick pass (contrast, focus order, screen reader) on the Hero to confirm WCAG 2.1 AA.

## Suggested Next Steps

1. QA Lead or Accessibility Lead: optional review of Hero contrast and focus behaviour.
2. Design/Product: provide final hero asset when ready; Frontend Engineer can swap the constant in one place.

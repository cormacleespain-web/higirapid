---
title: Handoff — Design Lead to Team Orchestrator (Mobile Menu Review)
author-agent: design-lead
date: 2026-03-14
---

# Handoff: Design Lead → Team Orchestrator

## Context

Design Lead reviewed the HigiRapid Header **mobile menu** (visible below `lg`) for UX, interaction design, and consistency with the product experience. Implementation: `src/components/layout/Header.tsx`. Review covered information hierarchy, visual hierarchy and spacing, token/typography consistency, behaviour (open/close, scroll lock), and UX gaps (backdrop, close-on-outside-tap, animation, focus).

## Decisions

- **Content order**: Confirmed as correct — nav links → Language section (label + LanguageSwitcher) → Get a Quote CTA. No change.
- **Backdrop and dismiss**: Recommend adding a full-viewport semi-transparent backdrop behind the menu; tap on backdrop closes the menu. Aligns with interaction spec (“tap-outside to close”) and common pattern.
- **Transition**: Recommend open/close transition (opacity, optional slide) using motion.duration.normal (250ms); respect `prefers-reduced-motion`.
- **Focus and Escape**: Recommend focus trap when menu is open, focus move to first focusable on open, return focus to hamburger on close, and Escape key to close (with focus return). Aligns with existing accessibility-lead decisions and interaction spec.
- **Overlay position**: Recommend aligning overlay `top` with header height at all breakpoints (e.g. `top-16` + `md:top-[4.5rem]` or CSS variable) so there is no gap on `md`.

## Deliverables

- `ai-product-team/docs/design/mobile-menu-ux-review.md` — Full UX review with findings, recommendations, and implementation checklist for Frontend.
- `ai-product-team/docs/design/interaction-spec-higirapid-website.md` — Updated with detailed mobile menu behaviour (backdrop, transition, focus, overlay position) and link to the review.

## Open Questions

- None for Design Lead. Prioritisation of recommended changes (backdrop, transition, focus trap, overlay top) is for Orchestrator / Product.

## Suggested Next Steps

1. **Team Orchestrator**: Prioritise which mobile menu improvements to implement (all recommended, or subset) and assign to Frontend Engineer (and optionally Accessibility Lead for focus-trap/aria-hidden verification).
2. **Frontend Engineer**: Implement per the checklist in `docs/design/mobile-menu-ux-review.md` (backdrop, Escape, focus trap/return, overlay top, transition). Implementation details are in the review doc.
3. **Accessibility Lead** (optional): Confirm focus trap and aria-hidden behaviour once implemented, per existing decisions.

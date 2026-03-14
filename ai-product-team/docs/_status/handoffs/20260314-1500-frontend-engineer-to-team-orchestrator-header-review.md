---
title: Handoff — Frontend Engineer to Team Orchestrator (Header responsiveness review)
author-agent: frontend-engineer
date: 2026-03-14
status: draft
---

# Handoff: Header component responsiveness review complete

## Context

Team Orchestrator requested a full review of the header component for responsiveness across all devices and languages (en, es, ca). The header includes sticky bar, logo, main nav, LanguageSwitcher, CTA button, and mobile menu. Spanish and Catalan nav labels (e.g. "Preguntas frecuentes", "Com treballem") are longer than English and were causing overflow risk on medium viewports (768px–1024px) when the desktop nav was shown at `md` (768px).

## Decisions

- **Desktop nav and CTA breakpoint raised from `md` (768px) to `lg` (1024px).** Below 1024px the header now shows logo, LanguageSwitcher, and hamburger; the full horizontal nav and in-bar CTA appear only from 1024px. Rationale: layout-only fix that avoids overflow for long labels (es/ca) without shortening copy; 768px–1023px users get the mobile menu (hamburger) with full nav and CTA inside.
- **Nav link spacing made responsive:** `gap-4` at `lg`, `gap-6` at `xl` (was `gap-4 lg:gap-6`). At 1024px the slightly smaller gap gives more room for long labels; at 1280px+ the larger gap is retained for visual balance.
- **No copy shortening.** Layout and breakpoint changes were sufficient; no changes to i18n messages or shorter nav labels at breakpoints. If UX/copy recommends shorter labels for any locale, that can be a follow-up from UX Tech Writer.

## Deliverables

- **Updated:** `src/components/layout/Header.tsx`
  - Desktop `<nav>`: `hidden md:flex` → `hidden lg:flex`; nav gap: `gap-4 lg:gap-6` → `gap-4 xl:gap-6`.
  - CTA in bar: `hidden md:inline-block` → `hidden lg:inline-block`.
  - Hamburger and mobile menu panel: `md:hidden` → `lg:hidden`.
- **Unchanged:** `LanguageSwitcher.tsx` — no layout changes required; `min-w-[7rem]` is sufficient for locale names.

## Open Questions

- None blocking. Optional: if product/UX wants the in-bar CTA visible between 768px and 1023px (without desktop nav), a small follow-up could show only the CTA in the bar at `md` while keeping nav in the mobile menu; current implementation keeps the bar minimal (logo + LanguageSwitcher + hamburger) below `lg` for consistency and to avoid crowding.

## Suggested Next Steps

- **Team Orchestrator:** Mark header responsiveness review complete; optionally assign QA Lead to verify header across viewports (e.g. 768px, 900px, 1024px) and locales (en, es, ca).
- **UX Tech Writer (optional):** If shorter nav labels for medium viewports are ever desired (e.g. "FAQ" vs "Preguntas frecuentes" at a given breakpoint), provide recommended copy; frontend can then add breakpoint-specific keys or use CSS/JS to switch labels if needed.

---
title: Decision Log
author-agent: team-orchestrator
date: 2025-03-13
status: draft
---

# Decision Log

Append-only. Each agent may add entries when making significant decisions. Format: date | agent | decision | rationale | impact.

## Entries

| Date | Agent | Decision | Rationale | Impact |
|------|--------|----------|-----------|--------|
| 2025-03-13 | team-orchestrator | Initialise AI Product Team structure | Plan implementation | All agents and docs created |
| 2025-03-13 | team-orchestrator | Add role-specific guidelines, guardrails, and best-practice refs to all 13 skills | Coordinate so each role has .md files to do their job well; link from SKILL.md | Each role has 1–2 guideline/guardrail docs; external refs where useful (WCAG, NN/g, OWASP, etc.) |
| 2026-03-14 | product-owner | HigiRapid website: single landing page, ES/CA/EN, no CMS, placeholder copy | PRD scope and client preference | All content in i18n message files; contact form via API or Formspree |
| 2026-03-14 | frontend-engineer | next-intl with localePrefix 'always'; SSG for [locale] | Consistent URLs and hreflang; no locale-less default path | All routes under /es/, /ca/, /en/ |
| 2026-03-14 | design-systems-lead | Brand tokens from guidelines; DM Sans as font fallback until Garet webfont available | Brand consistency; no hard-coded values; readable fallback | Tailwind theme; --font-garet variable; swap to local Garet when files provided |
| 2026-03-14 | ux-tech-writer | Header nav: use "FAQ" for nav.faq in ES and CA (not full "Preguntas frecuentes" / "Preguntes freqüents") | Long labels cause overflow on narrow viewports; FAQ is widely understood; section title keeps full phrase | i18n es.json, ca.json; header fits on tablet/small desktop without truncation |
| 2026-03-14 | ux-tech-writer | Header aria-labels (main nav, open/close menu, mobile menu) translated via common.mainNav, common.openMenu, common.closeMenu, common.mobileMenu | Screen readers must hear correct language; hamburger must announce open vs close state | i18n common.* in en/es/ca; Header.tsx uses tCommon() for all header aria-labels |
| 2026-03-14 | frontend-engineer | Header: desktop nav and in-bar CTA at lg (1024px); mobile menu below lg | Avoid overflow for long es/ca nav labels on 768–1023px; layout-only fix | Nav and CTA in bar from 1024px; hamburger + drawer &lt; 1024px; no copy changes |
| 2026-03-14 | accessibility-lead | Header mobile menu: focus trap and Escape-to-close required for WCAG 2.1 AA (2.1.1, 2.1.2, 2.4.3) | Overlay menus must confine focus and allow Escape to close with focus return to trigger | Header.tsx: add focus trap in #mobile-menu, Escape handler, return focus to hamburger |
| 2026-03-14 | accessibility-lead | Header mobile menu: main content must be aria-hidden when overlay open | Screen reader users must not hear background content while menu is open (2.4.3, 4.1.2) | Layout/Header: expose menu-open state (e.g. context) and set aria-hidden on main content wrapper when true |
| 2026-03-14 | design-lead | Mobile menu content order confirmed: nav → Language section → Get a Quote CTA | Matches product intent (browse, then locale, then primary action); no change needed | None |
| 2026-03-14 | design-lead | Mobile menu: add dismissible backdrop and close-on-backdrop-tap | Aligns with interaction spec (tap-outside to close) and standard overlay UX | Frontend: add fixed full-viewport backdrop; onClick closes menu; z-order below panel |
| 2026-03-14 | design-lead | Mobile menu: add open/close transition (opacity, optional slide); respect reduced-motion | Improves perceived quality; tokens: motion.duration.normal, easing.enter/exit | Frontend: 250ms transition; prefer-reduced-motion: no or minimal animation |
| 2026-03-14 | design-lead | Mobile menu: overlay top aligned with header height at all breakpoints | Avoids gap between header and panel on md when header is h-18 | Frontend: e.g. top-16 md:top-[4.5rem] or CSS var --header-height |
| 2026-03-14 | qa-lead | Header/mobile menu: single validation checklist for functional, responsive, a11y, cross-locale with executable expected results | One artefact for manual and E2E; aligns with audit and design handoffs | docs/qa/checklists/header-mobile-menu-validation.md |
| 2026-03-14 | qa-lead | Header/mobile menu: conditional pass — code review confirms implementation meets audit and design; full sign-off after checklist execution | Cannot run app; code-level verification done; runtime validation required for release | Orchestrator assigns checklist execution; QA supports scope (viewports, locales) |
| 2026-03-14 | frontend-engineer | Gallery: replace simple carousel with filterable grid + category tabs + "Ver ampliado" lightbox | Match reference (Trabajos Realizados) and improve content discovery; single section keeps id="gallery" and nav target | Gallery.tsx: categories (all, car, upholstery, carpet, rug, hygiene), grid of cards, native dialog lightbox; i18n gallery.* extended |

---
title: Validation Checklist — Header & Mobile Menu
author-agent: qa-lead
date: 2026-03-14
status: draft
---

# Validation Checklist: Header & Mobile Menu

**Purpose**: Validate implementation of the HigiRapid header and mobile menu against design, accessibility, and product requirements. Aligns with accessibility audit (`header-mobile-menu-audit.md`) and design UX review (`mobile-menu-ux-review.md`).

**Scope**: `src/components/layout/Header.tsx`; viewports &lt; lg (1024px) for mobile menu; locales en, es, ca.

**Pass criteria**: All checks below pass for at least one viewport &lt; lg and one locale; critical/blocking items must pass for all three locales.

---

## 1. Functional

| # | Check | Expected result | Pass |
|---|--------|------------------|------|
| F1 | Open menu: tap/click hamburger | Menu panel appears below header; body scroll locked; overlay covers viewport below header. | |
| F2 | Close menu: tap/click hamburger again | Menu closes; focus returns to hamburger button; body scroll restored. | |
| F3 | Close menu: tap/click backdrop (dark overlay) | Menu closes; focus returns to hamburger; backdrop click does not activate content behind. | |
| F4 | Close menu: press Escape | Menu closes; focus returns to hamburger; no focus on main content. | |
| F5 | Close menu: tap a nav link (e.g. Services) | Menu closes; page scrolls to section; focus moves to that section/link. | |
| F6 | Close menu: tap CTA "Get a quote" / equivalent | Menu closes; WhatsApp (or external) opens in new tab; focus returns to hamburger when returning to page. | |
| F7 | Language switcher in mobile menu | On viewport &lt; lg, LanguageSwitcher is inside the mobile menu (not in header bar); has visible "Language" (or locale-equivalent) label; switching locale works and closes or keeps menu per implementation. | |
| F8 | Language switcher on desktop | On viewport ≥ lg, LanguageSwitcher is in header bar only; no duplicate in menu (menu not shown). | |

---

## 2. Responsive (viewport &lt; lg)

| # | Check | Expected result | Pass |
|---|--------|------------------|------|
| R1 | Menu visibility | At viewport &lt; 1024px (lg), hamburger visible; desktop nav and in-bar CTA hidden. | |
| R2 | Overlay extent | Mobile menu overlay is full-viewport height below header: `top-16` (64px) on default, `md:top-[4.5rem]` (72px) at md+; no gap between header bottom and overlay top. | |
| R3 | Panel extent | Menu panel matches overlay: fixed, inset-x-0, top-16 md:top-[4.5rem], bottom-0; scrollable if content overflows. | |
| R4 | No horizontal scroll | At 320px width, no horizontal scroll; header and menu content within viewport. | |

---

## 3. Accessibility

| # | Check | Expected result | Pass |
|---|--------|------------------|------|
| A1 | Keyboard open/close | Hamburger focusable; Enter/Space toggles menu; Escape closes and returns focus to hamburger. | |
| A2 | Focus trap | When menu is open, Tab and Shift+Tab cycle only within the mobile menu (nav links, Language switcher, CTA); focus does not move to main page content until menu is closed. | |
| A3 | Focus return on close | After closing via Escape, backdrop click, nav link click, or CTA click, focus returns to hamburger (or to target of nav link if design specifies). Implementation: all close paths call `closeMenu()` which focuses hamburger. | |
| A4 | aria-hidden on #main | When menu is open, `#main` has `aria-hidden="true"`; when closed, attribute removed. Screen reader does not announce main content while menu is open. | |
| A5 | Hamburger touch target | Hamburger has minimum 44×44px (e.g. min-h-[44px] min-w-[44px]); visible tap area. | |
| A6 | Hamburger semantics | Hamburger has `aria-expanded={menuOpen}`, `aria-controls="mobile-menu"`, and dynamic `aria-label` (open vs close per locale). | |
| A7 | Menu region semantics | Panel has `id="mobile-menu"`, `role="region"`, `aria-label` (e.g. "Mobile menu"), `aria-hidden={!menuOpen}`. | |
| A8 | Focus visible | All focusable elements in menu show visible focus ring (e.g. focus-visible:ring-*). | |

---

## 4. Cross-locale (en, es, ca)

| # | Check | Expected result | Pass |
|---|--------|------------------|------|
| L1 | Nav labels | Nav links show correct translation (Services, Process, Gallery, etc.) for current locale. | |
| L2 | Menu label | "Language" section label uses correct translation (e.g. footer.language or common). | |
| L3 | CTA label | "Get a quote" (or equivalent) in menu and header uses correct translation (e.g. hero.ctaQuote). | |
| L4 | Hamburger aria-label | Open/close menu announced in current locale (common.openMenu / common.closeMenu). | |
| L5 | No raw keys | No untranslated keys visible in header or menu (en, es, ca). | |

---

## 5. Optional / Nice-to-have

| # | Check | Expected result | Pass |
|---|--------|------------------|------|
| O1 | Open/close transition | Menu/backdrop use short opacity (or slide) transition (~250ms); respect `prefers-reduced-motion: reduce`. | |
| O2 | Live region | Optional: polite live region announces "Menu opened" / "Menu closed" when state changes. | |

---

## Execution notes

- **Who**: QA or manual tester; E2E can cover F1–F6, R1–R4, A1–A3, A5–A8 with viewport and locale matrix.
- **Viewports**: 375px and 768px (below lg); optionally 320px for R4.
- **Locales**: Test at least /en/, /es/, /ca/ for L1–L5.
- **Tools**: Keyboard-only pass for A1–A4; screen reader (e.g. VoiceOver, NVDA) for A4 and semantics; touch or pointer for F1–F3, A5.

## References

- Implementation: `src/components/layout/Header.tsx`
- Accessibility audit: `ai-product-team/docs/design/accessibility/audits/header-mobile-menu-audit.md`
- Design UX review: `ai-product-team/docs/design/mobile-menu-ux-review.md`
- Handoffs: accessibility-lead and design-lead to team-orchestrator in `ai-product-team/docs/_status/handoffs/`

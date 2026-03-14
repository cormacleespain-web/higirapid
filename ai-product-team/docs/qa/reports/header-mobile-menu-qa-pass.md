---
title: QA Report — Header & Mobile Menu
author-agent: qa-lead
date: 2026-03-14
status: draft
---

# QA Report: Header & Mobile Menu

**Date**: 2026-03-14  
**Scope**: Header and mobile menu implementation (`src/components/layout/Header.tsx`), behaviour and accessibility as specified in accessibility audit and design UX review.

## Summary

- **Status**: Conditional pass (code-level verification complete; manual/E2E execution recommended)
- **Issues found**: 0 critical; 0 major from code review. One minor note: open/close transition not present (optional per design).
- **Recommendation**: Sign off for header/mobile menu scope subject to executing the validation checklist (manual or E2E) for at least one viewport &lt; lg and one locale; full checklist recommended for all three locales before release.

## Code-level verification (completed)

Verified against `Header.tsx` and `src/app/[locale]/layout.tsx`:

| Requirement | Implementation | Result |
|-------------|----------------|--------|
| Mobile menu full-viewport below header | `fixed inset-x-0 top-16 md:top-[4.5rem] bottom-0` on overlay and panel | ✓ |
| Body scroll lock when menu open | `document.body.style.overflow = "hidden"` in useEffect when `menuOpen` | ✓ |
| Backdrop click closes menu | Backdrop div `onClick={closeMenu}`; z-[25] below panel z-30 | ✓ |
| Escape closes and returns focus to hamburger | keydown listener for Escape calls `closeMenu()`; closeMenu focuses `hamburgerRef.current` | ✓ |
| Focus trap (Tab cycles in overlay) | Tab/Shift+Tab handler; last→first, first→last within `mobileMenuRef` | ✓ |
| Focus on open: first focusable in menu | useEffect when menuOpen focuses first focusable in `mobileMenuRef` | ✓ |
| aria-hidden on #main when menu open | getElementById("main") setAttribute/removeAttribute in same useEffect as scroll lock | ✓ |
| Layout provides #main | layout.tsx has `<main id="main">` | ✓ |
| Hamburger min 44×44px | `min-h-[44px] min-w-[44px]` on button | ✓ |
| All close paths return focus to hamburger | closeMenu() used for backdrop, Escape, nav links, CTA; hamburger toggle keeps focus on button | ✓ |
| LanguageSwitcher in header on lg only | `hidden lg:block` on wrapper around LanguageSwitcher in header bar | ✓ |
| LanguageSwitcher in mobile menu with label | Language section in menu with `tFooter("language")` and LanguageSwitcher | ✓ |
| Hamburger semantics | aria-expanded, aria-controls="mobile-menu", dynamic aria-label (open/close) | ✓ |
| Menu region semantics | id="mobile-menu", role="region", aria-label, aria-hidden={!menuOpen} | ✓ |

## What to test (manual or E2E)

Use the **validation checklist** at `ai-product-team/docs/qa/checklists/header-mobile-menu-validation.md`:

1. **Functional (F1–F8)**: Open/close via hamburger, backdrop, Escape; nav and CTA close menu; language switcher placement and behaviour on mobile vs desktop.
2. **Responsive (R1–R4)**: Menu only &lt; lg; overlay top aligns with header (no gap at md); no horizontal scroll at 320px.
3. **Accessibility (A1–A8)**: Keyboard open/close and focus trap; aria-hidden on main; touch target; semantics. Run with keyboard only and optionally with screen reader.
4. **Cross-locale (L1–L5)**: Nav, menu label, CTA, hamburger aria-label, and no raw keys in en, es, ca.

## Findings

| ID | Description | Severity | Location | Owner |
|----|-------------|----------|----------|--------|
| — | No defects identified from code review. | — | — | — |

**Optional / not blocking**:

- **O1 (transition)**: Open/close transition (opacity/slide, 250ms, reduced-motion) is not implemented; design UX review listed it as recommended. Acceptable for current scope; can be added later.

## Coverage

- **Done**: Code review of Header.tsx and layout.tsx against audit and design recommendations; validation checklist created and linked.
- **Deferred to executor**: Live browser checks (keyboard, focus trap, screen reader, touch), multi-viewport and multi-locale runs. Checklist is executable by a human or E2E.

## Open items

- Execute validation checklist for at least one viewport &lt; lg and one locale (en, es, or ca) to confirm runtime behaviour.
- For full release readiness, run checklist for all three locales and viewports 375px and 768px.

## Sign-off

- **QA Lead**: Header and mobile menu implementation **meets** the requirements from the accessibility audit and design UX review at code level. **Conditional pass**: recommend Team Orchestrator treat as complete once the validation checklist is executed (manual or E2E) for the agreed scope; no blockers identified.

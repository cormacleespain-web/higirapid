---
title: Accessibility Standards — HigiRapid Website
author-agent: accessibility-lead
date: 2026-03-14
status: draft
---

# Accessibility Standards

## Target

- **WCAG level**: 2.1 Level AA
- **Scope**: HigiRapid marketing website (single landing page and all components)
- **Platforms**: Web (Chrome, Safari, Firefox, Edge; mobile Safari, Chrome Android)

## Principles

- **Perceivable**: All content and UI are presentable to users in ways they can perceive (text alternatives, contrast, resize text).
- **Operable**: All functionality available via keyboard; no traps; sufficient time; no seizure-inducing content.
- **Understandable**: Language declared; forms labeled and error-handled; behaviour predictable.
- **Robust**: Valid markup; name, role, value for custom components; works with AT.

## Requirements by Area

### Perceivable

- **1.1.1 Non-text content**: All images (including before/after) have appropriate alt text. Decorative images use alt="". Logo: alt="HigiRapid" or equivalent.
- **1.3.1 Info and relationships**: Headings in order (one h1, then h2 per section). Lists use list markup. Form labels associated (label for/id or aria-label).
- **1.4.1 Use of colour**: Colour is not the only means of conveying information. Errors indicated by text/icon as well as colour.
- **1.4.3 Contrast (minimum)**: Text and images of text have contrast ratio at least 4.5:1 (normal text) or 3:1 (large text). Non-text UI components and graphics: 3:1 against adjacent colours.
  - **Brand palette check**: Primary (#0A5EBF) on white ≈ 4.5:1 — use for text only if verified; for large text and buttons with white text, primary background is acceptable. Accent (#ADD84F) on white: verify ratio; if &lt; 4.5:1, do not use for body text. Secondary (#50D9B2) on white: verify; use for accents, not small text. See contrast validation below.
- **1.4.4 Resize text**: Content reflows and remains readable when text is resized up to 200% (no horizontal scroll; no clipping).
- **1.4.10 Reflow**: No horizontal scroll at 320px width; content reflows at 400% zoom.
- **1.4.13 Content on hover/focus**: If additional content appears on hover/focus, it is dismissible, hoverable, and persistent (or avoid for MVP).

### Operable

- **2.1.1 Keyboard**: All functionality available via keyboard. No keyboard trap except optionally in gallery (Escape to exit).
- **2.1.2 No keyboard trap**: User can navigate away from any component with keyboard.
- **2.4.1 Bypass blocks**: Skip link to main content (e.g. “Skip to main content”) at top of page; visible on focus.
- **2.4.3 Focus order**: Logical tab order (header → main → sections → footer). Floating CTA in logical position (e.g. after main content or fixed but in tab order).
- **2.4.7 Focus visible**: Visible focus indicator on all focusable elements. Minimum 2px outline; contrast against background. Use design token for focus ring (e.g. 2px solid primary, offset 2px).
- **2.5.5 Target size**: Touch targets at least 44×44px (buttons, links, form controls, language switcher, floating CTA).
- **2.3.1 Three flashes**: No content that flashes more than three times per second.

### Understandable

- **3.1.1 Language of page**: `<html lang="...">` set to current locale (es, ca, en).
- **3.1.2 Language of parts**: If a passage is in a different language, use lang attribute on that element.
- **3.2.1 On focus**: Receiving focus does not change context (no submit on focus).
- **3.2.2 On input**: Changing a form control does not automatically submit; user initiates submit.
- **3.3.1 Error identification**: Form validation errors clearly identified and described in text.
- **3.3.2 Labels or instructions**: All form fields have visible labels (or aria-label) and instructions where needed.
- **3.3.3 Error suggestion**: Validation errors include suggestion for correction (e.g. “Enter a valid email”).

### Robust

- **4.1.1 Parsing**: Valid HTML (no duplicate ids; elements nested correctly).
- **4.1.2 Name, role, value**: Custom UI components (accordion, gallery, form) have correct role and accessible name; state (expanded, current item) exposed to AT.
- **4.1.3 Status messages**: Success and error messages after form submit announced to screen readers (role="status" or role="alert").

## Colour contrast validation (brand palette)

| Foreground | Background | Use case | Target ratio |
|------------|------------|----------|--------------|
| #0A5EBF (primary) | #FFFFFF | Text, links | ≥ 4.5:1 (verify; if fail, use only for large text or backgrounds) |
| #FFFFFF | #0A5EBF | Button text | ≥ 4.5:1 (verify) |
| #ADD84F (accent) | #FFFFFF | Text | Verify; if &lt; 4.5:1 use for backgrounds only or darken |
| #1A1A1A / #0F172A | #FFFFFF | Body text | ≥ 4.5:1 |
| #64748B | #FFFFFF | Secondary text | ≥ 4.5:1 |
| #DC2626 (error) | #FFFFFF | Error text | ≥ 4.5:1 |

**Action**: Frontend/Design Systems will verify exact ratios (e.g. WebAIM contrast checker). If primary or accent fail for small text, use only for backgrounds with white text or for large text; do not use for body copy on white.

## Focus management

- **Default**: Tab order follows DOM order. Header (skip link, logo, nav, language switcher) → main → sections → footer. Floating CTA: include in tab order after main content (or at end) so it does not interrupt reading.
- **Focus ring**: All focusable elements get a visible ring (2px solid, offset 2px). Use :focus-visible to show ring only for keyboard focus, not mouse click, if desired.
- **After form submit**: Move focus to success message (or first error) so screen reader users hear feedback.
- **Accordion**: Focus stays on trigger button when opening/closing. Do not move focus into expanded content unless pattern requires it.
- **Gallery**: If focus trapped in carousel, Escape returns focus to trigger or closes trap. Announce current slide (e.g. “Slide 1 of 4”).

## Language switcher and hreflang

- **lang attribute**: Root `<html lang="es">` (or ca, en) per current locale. Set in layout.
- **hreflang**: Link tags in head for alternate language versions of the page (es, ca, en) so search engines and users can discover language variants.
- **Language switcher**: Current locale indicated (aria-current="true" or visually). Links to other locales have correct href and optional hreflang on link.

## Reduced motion

- **prefers-reduced-motion: reduce**: Respect media query. Disable or reduce: auto-playing carousels, scroll-triggered animations, floating CTA pulse, accordion animation (instant open/close OK). Keep essential feedback (e.g. focus ring).

## Testing baseline

- **Automated**: axe-core or Lighthouse a11y audit on built page; fix Critical and Serious. Run on desktop and mobile viewport.
- **Manual keyboard**: Tab through entire page; activate all buttons/links; use Enter/Space on accordion and buttons; test form submit and validation.
- **Screen reader**: Test with one SR (e.g. NVDA or VoiceOver) on one browser: headings, form labels, errors, success message, language switcher, gallery.
- **Zoom**: Test at 200% and 400% zoom; no horizontal scroll, content reflows.

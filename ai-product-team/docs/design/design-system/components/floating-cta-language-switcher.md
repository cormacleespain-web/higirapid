---
title: Components — FloatingCta, LanguageSwitcher
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# FloatingCta

## Purpose

Sticky CTA on mobile (and optionally desktop): WhatsApp or “Get Quote”. Shown after scroll; fixed bottom-right or bottom bar. Does not cover main hero CTA.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | whatsapp \| quote | whatsapp | whatsapp = link to wa.me; quote = scroll to #contact |
| label | string | — | Accessible name (e.g. “Contact via WhatsApp”) |
| href | string | — | For whatsapp: full wa.me URL |
| visibleBelow | number | 768 | Show only below this viewport width (px) |

## States

- Default: Icon + optional short label. Fixed position; z-index above content, below modals.
- Hover/Focus: Same as Button (focus ring). Optional subtle pulse (respect prefers-reduced-motion).

## Tokens Used

- color.primary or color.accent (background), color.text.inverse
- space.4, radius.full, shadow.lg
- motion.duration.fast (pulse if used)

## Accessibility

- Focusable (in tab order). Accessible name via label or ariaLabel. Minimum 44×44px. Does not trap focus. Visible focus ring.

---

# LanguageSwitcher

## Purpose

Switch locale (ES, CA, EN). Renders current locale and links to other locales. In header (and optionally footer).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| currentLocale | es \| ca \| en | — | Current locale |
| locales | { code, label }[] | — | [{ code: 'es', label: 'Español' }, …] |

## Behaviour

- Renders list of links: for each locale except current, link to `/${locale}/` (same path). Current locale shown as text or disabled link (not clickable). Use next-intl Link with locale prop.

## Tokens Used

- font.size.sm, font.weight.medium
- color.text.primary, color.primary (for current or hover)
- space.2 (between items)

## Accessibility

- Links have aria-label or visible text (“Español”, “Català”, “English”). Current locale indicated with aria-current="true" or visually. Focus order: after logo, before main nav (or per header order).

---
title: Design Tokens — HigiRapid
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# Design Tokens: HigiRapid Website

Source: [BrandPackage/HigiRapid_Brand_Guidelines.pdf](/BrandPackage/HigiRapid_Brand_Guidelines.pdf). All UI must use these tokens; no hard-coded hex or spacing values in components.

## Colour

| Token | Value | Usage |
|-------|--------|-------|
| color.primary | #0A5EBF | Primary actions, links, key headings, nav active |
| color.accent | #ADD84F | Accent elements, highlights, secondary CTA |
| color.secondary | #50D9B2 | Secondary accent, supporting elements, badges |
| color.surface.primary | #FFFFFF | Page and card backgrounds |
| color.surface.subtle | #F5F5F5 or #F8FAFC | Section alternates, card hover |
| color.text.primary | #1A1A1A or #0F172A | Body and headings |
| color.text.secondary | #64748B or #475569 | Supporting text, captions |
| color.text.inverse | #FFFFFF | Text on primary/accent (ensure contrast) |
| color.border | #E2E8F0 | Dividers, input borders |
| color.error | #DC2626 | Form errors, destructive |
| color.success | #16A34A | Success messages, confirmations |

**Contrast**: Primary (#0A5EBF) and Accent (#ADD84F) on white must meet WCAG AA (4.5:1 for text, 3:1 for large text). See accessibility/standards.md. Secondary (#50D9B2) on white: verify contrast for text use.

## Typography

| Token | Value | Usage |
|-------|--------|-------|
| font.family.sans | Garet, system-ui, sans-serif | Body and UI (Garet from brand; fallback if unavailable) |
| font.size.xs | 0.75rem (12px) | Captions, labels |
| font.size.sm | 0.875rem (14px) | Secondary text, form labels |
| font.size.base | 1rem (16px) | Body |
| font.size.lg | 1.125rem (18px) | Lead paragraph |
| font.size.xl | 1.25rem (20px) | Section subheads |
| font.size.2xl | 1.5rem (24px) | Section titles |
| font.size.3xl | 2rem (32px) | Hero subhead |
| font.size.4xl | 2.25rem–2.5rem (36–40px) | Hero headline (mobile) |
| font.size.5xl | 3rem (48px) | Hero headline (desktop) |
| font.weight.book | 350 | Body (Garet Book) |
| font.weight.regular | 400 | Body, labels |
| font.weight.medium | 500 | Emphasis |
| font.weight.bold | 700 | Headings, CTA labels |
| line.height.tight | 1.25 | Headlines |
| line.height.normal | 1.5 | Body |
| line.height.relaxed | 1.625 | Lead text |

## Spacing

| Token | Value | Usage |
|-------|--------|-------|
| space.1 | 0.25rem (4px) | Inline gaps |
| space.2 | 0.5rem (8px) | Tight padding |
| space.3 | 0.75rem (12px) | Button padding (sm) |
| space.4 | 1rem (16px) | Default padding, gaps |
| space.5 | 1.25rem (20px) | Section internal |
| space.6 | 1.5rem (24px) | Card padding |
| space.8 | 2rem (32px) | Section padding (mobile) |
| space.10 | 2.5rem (40px) | Section padding |
| space.12 | 3rem (48px) | Section spacing |
| space.16 | 4rem (64px) | Large section spacing |
| space.20 | 5rem (80px) | Hero/section vertical rhythm |

## Border radius

| Token | Value | Usage |
|-------|--------|-------|
| radius.sm | 0.25rem (4px) | Inputs, small buttons |
| radius.md | 0.375rem (6px) | Buttons, cards |
| radius.lg | 0.5rem (8px) | Cards, modals |
| radius.full | 9999px | Pills, floating CTA |

## Shadow

| Token | Value | Usage |
|-------|--------|-------|
| shadow.sm | 0 1px 2px rgba(0,0,0,0.05) | Cards at rest |
| shadow.md | 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1) | Cards hover, dropdowns |
| shadow.lg | 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1) | Floating CTA, modals |

## Motion

| Token | Value | Usage |
|-------|--------|-------|
| motion.duration.fast | 150ms | Hover, focus ring |
| motion.duration.normal | 250ms | Accordion, gallery transition |
| motion.duration.slow | 400ms | Section reveal, page transition |
| motion.easing.default | cubic-bezier(0.4, 0, 0.2, 1) | General |
| motion.easing.enter | cubic-bezier(0, 0, 0.2, 1) | Enter |
| motion.easing.exit | cubic-bezier(0.4, 0, 1, 1) | Exit |

**Reduced motion**: Respect `prefers-reduced-motion: reduce`; use duration 0 or no animation where appropriate.

## Tailwind mapping (reference)

- **Colours**: `primary` → color.primary, `accent` → color.accent, `secondary` → color.secondary; `surface`, `text`, `border`, `error`, `success` as above.
- **Font**: `font-sans` → Garet + fallback; `text-xs` through `text-5xl`; `font-normal`, `font-medium`, `font-bold`.
- **Spacing**: `p-4` → space.4, `gap-6` → space.6, etc. Use Tailwind scale (1 = 4px) and align with token values.
- **Radius**: `rounded-md` → radius.md, `rounded-full` → radius.full.
- **Shadow**: `shadow-sm`, `shadow-md`, `shadow-lg` map to tokens above.
- **Transition**: `transition duration-150` → motion.duration.fast; `duration-300` → motion.duration.normal.

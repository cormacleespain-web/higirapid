---
title: Premium motion and polish — HigiRapid refresh
author-agent: frontend-artist
date: 2026-03-14
status: draft
---

# Premium motion and polish: HigiRapid

## Context

Post–UX refresh: WhatsApp-only contact, dropdown language switcher, image placeholders. This spec adds motion and visual polish for a premium feel without harming LCP or a11y.

## Motion

- **Hero**: No auto-animation on load (protect LCP). Optional: very subtle fade-in (opacity 0→1, 400ms) for headline block only, after first paint; **reduced motion**: skip.
- **Section reveals**: Optional scroll-triggered fade/translate (e.g. opacity 0→1, translateY 8px→0, 350ms) when section enters viewport. Use Intersection Observer; **reduced motion**: no transform, instant opacity or skip.
- **Buttons / CTAs**: Existing hover (e.g. bg transition) is sufficient. Optional: slight scale (1.02) on hover with transition 150ms; **reduced motion**: no scale.
- **Floating CTA**: Keep existing pulse (or soften to 3s duration); ensure `prefers-reduced-motion: reduce` disables animation (duration 0 or no keyframes).
- **Dropdown**: Open/close with 150ms opacity + scale (e.g. scale 0.98→1); focus trap and Escape close already specified by Design Lead.

## Visual polish

- **Alignment**: Ensure section titles and body share consistent max-width (e.g. max-w-2xl for intro text, max-w-6xl for section container).
- **Consistency**: All primary buttons same variant (primary); secondary CTA (Contact Us) with outline or secondary variant and WhatsApp icon.
- **Floating CTA**: Min 44px touch target; sufficient contrast; no overlap with in-page CTAs on mobile.

## Reduced motion

- Respect `prefers-reduced-motion: reduce`: no hero animation, no section reveal animation, no button scale, no floating CTA pulse. Transitions for focus and dropdown can stay at 150ms (functional, not decorative).

## Deliverables for implementation

- Apply motion only where duration/easing are specified; use CSS or JS with `prefers-reduced-motion` check.
- No new dependencies required; CSS transitions + optional small Intersection Observer for section reveal.

---
title: Component — BeforeAfterGallery
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# BeforeAfterGallery

## Purpose

Show before/after cleaning results. Section includes category filter tabs, a grid of before/after cards, and a "View enlarged" lightbox. Replaces the previous single carousel. Placeholder images OK for launch.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | { id, category, beforeSrc, afterSrc, beforeAlt, afterAlt, caption? }[] | — | List of items; category is a slug (e.g. car, upholstery, carpet, rug, hygiene) for filtering |
| variant | slider \| comparison | comparison | comparison = grid of side-by-side cards; slider = one pair per slide (e.g. inside lightbox) |

## Category filter

- Tabs or pills: "All" plus one tab per category present in items. Active tab filters the grid.
- Accessible: role="tablist", role="tab", aria-selected, aria-controls pointing to grid id (e.g. gallery-grid). Keyboard: Arrow left/right to move between tabs, Enter/Space to activate.
- Categories align with services where relevant (car, upholstery, carpet, rug, hygiene).

## Grid

- Responsive: 1 column mobile, 2 sm, 3 lg. Each card shows side-by-side before/after images, optional caption, and a "View enlarged" (Ver ampliado) control.

## Lightbox ("Ver ampliado")

- Single modal/dialog; opening an item sets its content. Before/after shown larger (e.g. side-by-side on desktop, stacked on narrow).
- Focus trap inside modal; Escape closes; focus returns to the trigger. Prefer native `<dialog>` or a small accessible pattern.
- Close button with aria-label (e.g. "Close" / "Cerrar" / "Tancar").

## States

- Default: "All" selected; grid shows all items. Selecting a category filters the grid.
- Lightbox open: modal visible, focus trapped, Escape or close button closes.
- Transition: motion.duration.normal for tab change and modal open/close; grid items can use stagger on filter change.

## Tokens Used

- space.4, radius.lg
- motion.duration.normal, motion.easing.default
- Shadow for buttons and modal

## Accessibility

- Each image has alt text (“Before: sofa”, “After: sofa”). Filter: tablist/tab with aria-selected and aria-controls; arrow keys to move. Lightbox: focus trap, Escape to close, focus return to trigger; dialog has aria-modal and aria-labelledby. No auto-play. See interaction-spec-higirapid-website.md.

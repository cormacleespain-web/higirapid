---
title: Components — ServiceCard, TestimonialCard
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# ServiceCard

## Purpose

One service offering (Upholstery, Carpet, Rug, Car Interior, In-house Hygiene). Icon or image optional; title and short description.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Service name |
| description | string | — | 1–2 sentences |
| icon | ReactNode \| string | — | Optional icon or image path |
| href | string | — | Optional link (future service detail page) |

## Layout

- Vertical stack: icon/image, title, description. Padding per Card (space.6). Optional CTA link at bottom if href.

## Tokens Used

- Card tokens; font.size.lg (title), font.size.base (description), font.weight.bold (title)
- color.text.primary, color.text.secondary
- space.4 (between elements)

## Accessibility

- If card is a link, entire card or a “Learn more” link must be focusable with clear accessible name. Prefer one focusable link per card.

---

# TestimonialCard

## Purpose

Customer quote with name and optional location/role.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| quote | string | — | Testimonial text |
| author | string | — | Name |
| roleOrLocation | string | — | Optional (e.g. “Barcelona”) |

## Layout

- Quote (blockquote or p), then author and role/location. Card wrapper; optional avatar placeholder.

## Tokens Used

- Card tokens; font.size.lg or base for quote, font.size.sm for author
- color.text.secondary for author line
- space.4

## Accessibility

- Use `<blockquote>` and cite for quote/author. Optional `aria-hidden` on decorative elements.

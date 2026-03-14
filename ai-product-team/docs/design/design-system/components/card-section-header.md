---
title: Components — Card, SectionHeader
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# Card

## Purpose

Container for ServiceCard, TestimonialCard, and other content blocks. Consistent elevation and spacing.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| padding | sm \| md \| lg | md | Inner padding (space.4, space.6, space.8) |
| hover | boolean | false | Subtle shadow lift on hover |
| as | section \| div | div | Semantic wrapper |

## States

- Default: background color.surface.primary, border or shadow.sm, radius.lg.
- Hover (if hover=true): shadow.md, transition motion.duration.fast.

## Tokens Used

- color.surface.primary, color.border
- space.4/6/8, radius.lg, shadow.sm, shadow.md

## Accessibility

- If interactive, use button or link; otherwise no special a11y. Prefer semantic wrapper (e.g. `<article>` for testimonial).

---

# SectionHeader

## Purpose

Section title and optional subtitle for Hero, Services, Process, Gallery, Testimonials, FAQ, Contact.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Section heading (h2) |
| subtitle | string | — | Optional supporting line |
| align | left \| center | center | Text alignment |
| size | sm \| md \| lg | md | Title size (font.size.2xl, 3xl, 4xl) |

## Tokens Used

- font.size.2xl/3xl/4xl, font.weight.bold
- color.text.primary, color.text.secondary
- line.height.tight, line.height.normal
- space.2 (between title and subtitle), space.6/8 (below block)

## Accessibility

- One h2 per section. Subtitle can be `<p>` or styled span. Do not skip heading levels (page has one h1 in Hero, then h2 per section).

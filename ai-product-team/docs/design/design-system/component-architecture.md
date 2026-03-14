---
title: Component Architecture — HigiRapid Website
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# Component Architecture

## Principles

- **Composition**: Sections compose UI primitives (Button, Card, SectionHeader) and layout (Header, Footer). No monolithic “page” components; each section is a component.
- **Tokens only**: All visual properties (colour, spacing, typography, radius, shadow, motion) reference design tokens. No hard-coded hex or px in component logic beyond token definitions.
- **Accessibility first**: Every interactive component has focus, keyboard, and ARIA behaviour per accessibility standards. Component specs reference a11y requirements.

## Hierarchy

- **Primitives**: Button, Input, Label, Link, Icon (optional). Used by cards and forms.
- **Composed**: Card, SectionHeader, ServiceCard, TestimonialCard, FAQAccordion (accordion item), ContactForm (field + submit), BeforeAfterSlider (or gallery item).
- **Layout / patterns**: Header, Footer, FloatingCta, LanguageSwitcher. Sections: Hero, Services, Process, Gallery, Testimonials, ServiceAreas, FAQ, Contact.

## Theming

- Single theme (light). Brand colours map to semantic tokens (primary, accent, secondary). No dark mode at launch. Tokens live in Tailwind config and/or CSS variables for future theming.

## Variants and props

- **Size**: `sm | md | lg` where applicable (Button, SectionHeader, inputs). Default `md`.
- **Variant**: `primary | secondary | outline | ghost` for Button; `primary` for CTA, `secondary` or `outline` for secondary actions.
- **State**: Default, hover, focus, active, disabled, loading, error. All interactive components document these; focus ring is mandatory (token: outline 2px offset 2px).

## Responsive

- Mobile-first. Breakpoints: default (mobile), `sm` (640px), `md` (768px), `lg` (1024px). Header nav collapses to hamburger below `md`; floating CTA visible below `md` (or per interaction spec). Section padding and typography scale up at `md`/`lg`.

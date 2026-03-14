---
title: Components — FAQAccordion, ContactForm
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# FAQAccordion

## Purpose

Expandable FAQ items. One or multiple panels open; interaction spec allows “one open at a time” or “multiple”.

## Props (per item)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | — | Unique id for panel (for aria-controls) |
| question | string | — | Question text (button content) |
| answer | string \| ReactNode | — | Answer content |
| expanded | boolean | false | Controlled open state |
| onToggle | () => void | — | When user toggles |

## States

- Collapsed: Only question visible; button has aria-expanded="false", aria-controls pointing to answer id.
- Expanded: Answer visible; aria-expanded="true". Smooth height transition (motion.duration.normal).

## Tokens Used

- font.size.lg (question), font.size.base (answer)
- color.text.primary, color.text.secondary, color.border
- space.4, radius.md
- motion.duration.normal, motion.easing.default

## Accessibility

- Trigger is `<button>`. Answer region has id and role="region" or aria-labelledby to question. Keyboard: Enter/Space toggles. Focus remains on button. Optional: Escape closes panel. See interaction-spec-higirapid-website.md.

---

# ContactForm

## Purpose

Form for quote/contact: name, email, service type, message. Submit to API or Formspree.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSubmit | (data) => void \| Promise | — | Submit handler |
| successMessage | string | — | Shown on success (i18n) |
| errorMessage | string | — | Shown on error (i18n) |

## Fields

- Name (text, required)
- Email (email, required)
- Service type (select: Upholstery, Carpet, Rug, Car interior, In-house hygiene, Other)
- Message (textarea, optional)

## States

- Default, Focus (per field), Invalid (inline error per field), Submitting (button loading), Success (message + optional form hide), Error (inline or toast with errorMessage).

## Tokens Used

- Input: color.border, color.error, font.size.base, space.3/4, radius.sm
- Button: primary variant
- color.error for error text

## Accessibility

- Every input has visible `<label>` and optional aria-required. Errors associated with aria-describedby. Success/error announced (live region role="status" or role="alert"). Submit button disabled during submit. See interaction-spec and accessibility/standards.md.

---
title: Component — Button
author-agent: design-systems-lead
date: 2026-03-14
status: draft
---

# Button

## Purpose

Primary and secondary actions (Get Quote, Contact, WhatsApp, Submit). Used in Hero, Contact section, and inline CTAs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | primary \| secondary \| outline \| ghost | primary | Visual style; primary = filled primary colour |
| size | sm \| md \| lg | md | Padding and font size |
| href | string | — | If set, render as `<a>`; otherwise `<button>` |
| type | button \| submit | button | For form submit |
| disabled | boolean | false | Disabled state |
| loading | boolean | false | Show loading indicator, disable click |
| fullWidth | boolean | false | Stretch to container (mobile) |
| children | ReactNode | — | Label (or translation key rendered as text) |
| ariaLabel | string | — | Required when label is icon-only |

## Variants

- **primary**: Background color.primary, text color.text.inverse. Use for main CTA (Get Quote, Submit).
- **secondary**: Background color.accent (or color.secondary), text dark for contrast. Use for secondary CTA (WhatsApp when not floating).
- **outline**: Border color.primary, text color.primary, transparent background. Use for tertiary actions.
- **ghost**: No border, background on hover. Use for nav links or low-emphasis actions.

## States

- **Default**: Token background and text.
- **Hover**: Slight darken or scale (motion.duration.fast); cursor pointer.
- **Focus**: Visible focus ring (2px outline, offset 2px, color.primary or focus-visible token). No ring on mouse-only click.
- **Active**: Optional slight scale down.
- **Disabled**: Reduced opacity, cursor not-allowed, no hover/focus effect.
- **Loading**: Spinner or skeleton; disabled interaction.

## Tokens Used

- color.primary, color.accent, color.text.inverse, color.border
- font.size.sm/md, font.weight.medium/bold
- space.3, space.4, space.6 (padding by size)
- radius.md, radius.lg
- motion.duration.fast, motion.easing.default
- shadow.sm (optional for primary)

## Accessibility

- Focusable; visible focus ring. Use `type="button"` or `type="submit"` on `<button>`; for links use `<a>` with href.
- Accessible name via children or ariaLabel (required for icon-only). Do not use title alone.
- Disabled buttons must not be focusable or must announce disabled state.

## Usage Notes

- Prefer semantic HTML: `<button>` for actions, `<a>` for navigation (e.g. WhatsApp link).
- Minimum touch target 44×44px (use size lg or padding to achieve on mobile).

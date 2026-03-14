---
title: Interaction Spec — HigiRapid Website
author-agent: design-lead
date: 2026-03-14
status: draft
---

# Interaction Design: HigiRapid Website

## Overview

This spec defines interaction behaviour for the main UI elements: language switcher, contact form, WhatsApp CTA, floating CTA, before/after gallery, FAQ accordion, and navigation. Design Systems and Frontend implement to these states and rules.

---

## Language Switcher

**Location**: Header (and optionally footer).

**States**:
| State | Trigger | UI behaviour | Notes |
|-------|---------|--------------|--------|
| Default | Page load | Current locale highlighted (e.g. “ES” bold or underlined). | `lang` on `<html>` matches. |
| Hover / focus | Pointer or keyboard focus | Visual feedback (underline, background). | Clear focus ring for a11y. |
| Selected | User clicks a locale | Navigate to same path in new locale (e.g. `/es/` → `/ca/`). Persist choice (cookie or path). | No full-page reload that loses scroll if possible; otherwise acceptable to reload. |

**Rules**: Three options always visible (ES | CA | EN). Current locale is not a link or is disabled. Keyboard: Tab to switcher, Enter/Space to open or activate; arrow keys to move between options if dropdown.

**Accessibility**: `aria-current="true"` or similar for current locale. Links have `hreflang` and clear labels (“Español”, “Català”, “English”).

---

## Contact Form

**Location**: Contact section.

**Fields**: Name (required), Email (required), Service type (dropdown: Upholstery, Carpet, Rug, Car interior, In-house hygiene, Other), Message (optional).

**States**:
| State | Trigger | UI behaviour | Notes |
|-------|---------|--------------|--------|
| Default | Section in view | All fields empty; submit button enabled. | Labels visible; placeholders optional. |
| Focus | User tabs or clicks into field | Focus ring; label remains visible. | No floating label that hides required indicator. |
| Invalid (client-side) | Blur or submit | Inline error per field (e.g. “Email is required”). | Submit not sent until valid. |
| Submitting | User clicks Submit | Button disabled or loading state; optional “Sending…”. | Prevent double submit. |
| Success | Server returns success | Message “Thank you, we’ll be in touch” or similar; form cleared or hidden. | Announced to screen readers. |
| Error | Server or network error | Inline or toast: “Something went wrong. Please try again or contact us via WhatsApp.” | Retry possible. |

**Rules**: Required fields marked (e.g. asterisk + “required” in label). Submit triggers client-side validation then API/Formspree. On success, focus moves to success message or first CTA.

**Accessibility**: All inputs have `<label>`; errors associated with `aria-describedby`; success/error announced (live region or role="alert").

---

## WhatsApp CTA (Button + Floating)

**Location**: Hero (secondary), Contact section, and floating (mobile).

**States**:
| State | Trigger | UI behaviour | Notes |
|-------|---------|--------------|--------|
| Default | Visible | Button shows “WhatsApp” or “Contact via WhatsApp” + icon. | Links to `https://wa.me/<number>?text=...`. |
| Hover / focus | Pointer or keyboard | Visual feedback; focus ring. | Target size ≥ 44×44px. |
| Click / Enter | User activates | Open WhatsApp (new tab or same tab per client). | Pre-filled message optional (e.g. “Hi, I’d like a quote for…”). |

**Rules**: External link; open in new tab with `rel="noopener noreferrer"`. Floating button: fixed bottom-right on mobile viewport; does not cover main hero CTA; optional gentle pulse for attention. Floating can be hidden on desktop or shown everywhere.

**Accessibility**: Button or link has accessible name (“Contact via WhatsApp”). If floating, ensure it’s in tab order and doesn’t trap focus.

---

## Floating / Sticky CTA (Mobile)

**Behaviour**: One persistent CTA (WhatsApp or “Get Quote”) visible on scroll. Shown below a breakpoint (e.g. &lt; 768px). Position: fixed bottom-right or bottom bar. On tap: scroll to Contact form or open WhatsApp.

**Rules**: Appears after user scrolls past hero (optional) so it doesn’t duplicate hero CTA. Dismiss or minimise not required for MVP. Must not cover critical interactive elements (e.g. form submit).

---

## Before/After Gallery

**States**:
| State | Trigger | UI behaviour | Notes |
|-------|---------|--------------|--------|
| Default | Section in view | First item visible; optional thumbnails or dots. | One “slide” or comparison visible. |
| Next / Previous | User clicks arrow or swipes | Transition to next/previous item. | Loop or stop at end. |
| Keyboard | Arrow keys when gallery focused | Same as next/previous. | Focus management: focus trapped in gallery until Escape or tab out. |

**Rules**: Accessible labels (“Before”, “After” per item; “Gallery item 1 of N”). Prefer no auto-play, or auto-play with pause control and reduced-motion respect.

**Accessibility**: Buttons for next/prev; `aria-live` for current item if content changes.

---

## FAQ Accordion

**States**:
| State | Trigger | UI behaviour | Notes |
|-------|---------|--------------|--------|
| Collapsed | Default | Only question visible; answer hidden. | One or all collapsed by default. |
| Expanded | User clicks question or focuses and activates | Answer shown; optional icon rotate. | Smooth expand/collapse. |
| Keyboard | Enter/Space on question | Toggle expanded. | Focus stays on trigger. |

**Rules**: Only one open at a time (accordion) or multiple open (expansion panels). Trigger must be button or link with `aria-expanded` and `aria-controls` pointing to answer region. Answer has `id` and `role="region"` or similar.

**Accessibility**: `aria-expanded` toggled; focus management if closing with Escape (optional).

---

## Header Navigation (Desktop / Mobile)

**Desktop**: Horizontal links to sections (anchor links). On click: smooth scroll to section. Active section can be highlighted on scroll (optional).

**Mobile**: Hamburger icon toggles menu; menu shows same links. Clicking a link scrolls to section and closes menu. Close button or tap-outside to close.

**Mobile menu behaviour (detailed)**:
- **Content order**: Nav links → Language section (label + LanguageSwitcher) → Get a Quote CTA. Body scroll locked when open.
- **Dismiss**: Close via hamburger, Escape key, or tap on backdrop. Tapping the menu panel (without activating a link/CTA) does not close.
- **Backdrop**: Full-viewport fixed layer behind the menu panel; semi-transparent (e.g. `bg-black/40`); clickable to close; `aria-hidden="true"`.
- **Transition**: Open/close use opacity (and optional slide) with motion.duration.normal (250ms); respect `prefers-reduced-motion`.
- **Focus**: On open, move focus to first focusable in menu. Trap focus within panel (Tab cycles inside). On close (any path), return focus to hamburger. Escape closes and returns focus to hamburger.
- **Overlay position**: Panel `top` must match header height at all breakpoints (e.g. no gap on `md` if header is taller).

**Rules**: Nav links use anchor hrefs (`#services`, `#contact`, etc.). No separate “pages”; single page. Keyboard: Tab through links; Enter activates and scrolls. See [mobile-menu-ux-review.md](./mobile-menu-ux-review.md) for full review and implementation checklist.

---

## General

- **Reduced motion**: Respect `prefers-reduced-motion: reduce` for scroll-triggered animations and auto-play; reduce or remove motion.
- **Focus**: All interactive elements focusable; visible focus ring (design token). No focus trap except inside modal (none at launch), mobile menu (when open), or gallery (optional).
- **Errors**: Form errors and success messages are visible and announced to screen readers.

---
title: Header — Microcopy and Responsive Copy Guidance
author-agent: ux-tech-writer
date: 2026-03-14
status: draft
---

# Header — Microcopy and Responsive Copy

## Scope

Sticky header: logo (left), main nav (center), language switcher + “Get a Quote” CTA (right). Mobile: hamburger with slide-down menu. Locales: EN, ES, CA.

## 1. Recommended nav and CTA copy per locale

### Primary (default) — use in desktop and mobile menu

| i18n key | EN | ES | CA | Max chars |
|----------|----|----|-----|-----------|
| `nav.services` | Services | Servicios | Serveis | 9 |
| `nav.process` | How it works | Cómo trabajamos | Com treballem | 15 |
| `nav.gallery` | Gallery | Galería | Galeria | 7 |
| `nav.testimonials` | Testimonials | Opiniones | Ressenyes | 12 |
| `nav.faq` | FAQ | **FAQ** | **FAQ** | 3 |
| `nav.contact` | Contact | Contacto | Contacte | 9 |
| `hero.ctaQuote` (header CTA) | Get a Quote | Pedir presupuesto | Demana pressupost | 17 |

**Decision — FAQ in nav (ES/CA):** Use **FAQ** for `nav.faq` in Spanish and Catalan instead of “Preguntas frecuentes” / “Preguntes freqüents”. Rationale: FAQ is widely understood, avoids 19–20 character labels in the bar, and keeps the header from wrapping on tablet/narrow desktop. Section title on the page remains the full phrase (`faq.title`).

### Short variants (optional, for narrow viewports)

If the design or frontend confirms overflow at the `md` breakpoint (e.g. 768px–1024px), use these **only for the inline nav** (not the mobile drawer, where space is sufficient):

| i18n key | EN | ES | CA | Use when |
|----------|----|----|-----|----------|
| `nav.processShort` | Process | Proceso | Procés | Nav bar at `md` only |
| `nav.faqShort` | FAQ | FAQ | FAQ | — (same as primary; no extra key needed once ES/CA use FAQ) |

- **Implementation**: Add `nav.processShort` to i18n; in the header component, at a breakpoint (e.g. `md`), render `t('processShort')` for the process link instead of `t('process')`. Mobile menu and section titles keep the full “How it works” / “Cómo trabajamos” / “Com treballem”.
- If the bar does not overflow with the primary set above, **do not** introduce short variants.

## 2. Responsive header copy — guidance for implementation

- **Max character counts (per nav item)**: Aim for **≤ 12 characters** per nav label in the inline bar to reduce wrapping on ~768px–1024px. Current risk items were ES/CA “Preguntas frecuentes” / “Preguntes freqüents” (resolved by using “FAQ”).
- **CTA**: “Pedir presupuesto” / “Demana pressupost” (17 chars) is acceptable; if the bar still overflows, use short CTA only as fallback: “Presupuesto” / “Pressupost” / “Quote” (document in i18n as `hero.ctaQuoteShort` if needed).
- **Breakpoints**: Document in the component or design system where short labels apply (e.g. “From `md` to `lg`, use `nav.processShort` for the process link if space is constrained”). Prefer **one set of strings** that fits all breakpoints (current recommendation: primary set with FAQ in all locales) so we avoid breakpoint-specific copy unless necessary.
- **No truncation**: Do not truncate nav or CTA with ellipsis; use shorter wording or short variants so full text is visible and accessible.

## 3. Accessible microcopy (aria-labels) — translated

These strings must be in i18n and used in the header so screen readers hear the correct language.

| i18n key | EN | ES | CA | Used for |
|----------|----|----|-----|----------|
| `common.mainNav` | Main navigation | Navegación principal | Navegació principal | `<nav aria-label="…">` |
| `common.openMenu` | Open menu | Abrir menú | Obrir menú | Hamburger button when closed |
| `common.closeMenu` | Close menu | Cerrar menú | Tancar menú | Hamburger button when open |
| `common.mobileMenu` | Mobile menu | Menú móvil | Menú mòbil | Slide-down region `aria-label` |

- **Logo link**: `aria-label="HigiRapid home"` is acceptable as-is (brand + “home” is conventional). Optional: add `common.home` (“Home” / “Inicio” / “Inici”) if you want the logo to announce in the UI language.
- **Language switcher**: Already uses visible locale name (English, Español, Català); ensure the trigger has an accessible name (e.g. “Language” / “Idioma” / “Llengua”) if the visible text is not sufficient for context.

## 4. Summary for implementers

1. **Copy**: Set `nav.faq` to **FAQ** in ES and CA in `src/i18n/messages/es.json` and `ca.json`. Leave EN as FAQ.
2. **Optional short process**: Add `nav.processShort` (Process / Proceso / Procés) and use only in the inline nav at `md` if overflow is observed.
3. **Aria-labels**: Add `common.mainNav`, `common.openMenu`, `common.closeMenu`, `common.mobileMenu` to all three message files and use them in `Header.tsx` (nav `aria-label`, hamburger `aria-label` toggled by state, mobile panel `aria-label`).
4. **No truncation**: Use the recommended wording so all labels fit without ellipsis.

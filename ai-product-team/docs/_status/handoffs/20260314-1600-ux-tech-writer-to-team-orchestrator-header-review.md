---
title: Handoff — UX Tech Writer to Team Orchestrator (Header review)
author-agent: ux-tech-writer
date: 2026-03-14
---

# Handoff: Header component — copy and responsiveness review

## Context

Full review of the header component for responsiveness across devices and languages (EN, ES, CA). Task: assess nav labels and header CTA for length and clarity; identify overflow risk on narrow viewports; recommend shorter alternatives where needed; document responsive copy guidance and accessible microcopy (aria-labels) for implementation.

## Decisions

- **FAQ in nav (ES/CA):** Use **FAQ** for `nav.faq` in Spanish and Catalan instead of “Preguntas frecuentes” / “Preguntes freqüents”. Rationale: avoids 19–20 character labels in the bar, prevents wrapping on tablet/narrow desktop; FAQ is widely understood. Section title on the page (`faq.title`) stays the full phrase.
- **Process label:** Keep “How it works” / “Cómo trabajamos” / “Com treballem” as primary. Optional short variant (“Process” / “Proceso” / “Procés”) only if design or frontend confirms overflow at `md`; documented in header-microcopy.md.
- **CTA:** Keep full “Get a Quote” / “Pedir presupuesto” / “Demana pressupost”. If layout still overflows after FAQ change, use short fallback (“Quote” / “Presupuesto” / “Pressupost”) only then.
- **Aria-labels:** All header-related aria-labels (main nav, open/close menu, mobile menu) must be translated via i18n so screen readers get the correct language. Add `common.mainNav`, `common.openMenu`, `common.closeMenu`, `common.mobileMenu` and use in `Header.tsx`; hamburger button label must toggle between open/close by state.

## Deliverables

- [docs/design/copy/header-microcopy.md](../../design/copy/header-microcopy.md) — Header microcopy spec: (a) recommended nav and CTA copy per locale, (b) optional short variants and when to use them, (c) responsive copy guidance (max character counts, no truncation, breakpoints), (d) accessible microcopy table (aria-labels with i18n keys and EN/ES/CA values).

## Recommended copy changes (for implementation)

### 1. i18n — nav FAQ (ES, CA)

| File | Key | Current value | New value |
|------|-----|----------------|-----------|
| `src/i18n/messages/es.json` | `nav.faq` | Preguntas frecuentes | **FAQ** |
| `src/i18n/messages/ca.json` | `nav.faq` | Preguntes freqüents | **FAQ** |

(EN already uses FAQ.)

### 2. i18n — common (aria-labels), all locales

| Key | EN | ES | CA |
|-----|----|----|-----|
| `common.mainNav` | Main navigation | Navegación principal | Navegació principal |
| `common.openMenu` | Open menu | Abrir menú | Obrir menú |
| `common.closeMenu` | Close menu | Cerrar menú | Tancar menú |
| `common.mobileMenu` | Mobile menu | Menú móvil | Menú mòbil |

### 3. Optional (only if overflow at md)

- Add `nav.processShort`: EN “Process”, ES “Proceso”, CA “Procés”.
- In `Header.tsx`, at `md` breakpoint only, use `processShort` for the process link in the inline nav (not in mobile menu).

### 4. Header.tsx — use translated aria-labels

- Replace hardcoded `aria-label="Main"` on `<nav>` with `aria-label={tCommon('mainNav')}` (or equivalent using `useTranslations('common')`).
- Replace hardcoded `aria-label="Open menu"` on the hamburger button with `aria-label={tCommon(menuOpen ? 'closeMenu' : 'openMenu')}`.
- Replace hardcoded `aria-label="Mobile menu"` on the slide-down region with `aria-label={tCommon('mobileMenu')}`.

## Open Questions

- **Orchestrator / Frontend:** Confirm whether optional `nav.processShort` and breakpoint-specific nav copy are needed after applying the FAQ change; visual check at 768px–1024px will determine.
- **Orchestrator:** If short CTA is ever needed, confirm `hero.ctaQuoteShort` (Quote / Presupuesto / Pressupost) with product/design before adding.

## Suggested Next Steps

1. **Frontend Engineer:** Apply nav.faq change in ES and CA message files; add `common.mainNav`, `common.openMenu`, `common.closeMenu`, `common.mobileMenu` to en.json, es.json, ca.json; update Header.tsx to use these for aria-labels and to toggle hamburger label (open/close) by menu state.
2. **Design / Frontend:** After deployment, check header at 768px, 896px, 1024px in all three locales; if nav still wraps or feels cramped, consider enabling `nav.processShort` at `md` per header-microcopy.md.
3. **Orchestrator:** Close header review once changes are implemented and optional short variants are decided.

---
title: Handoff — Team Orchestrator (Header review consolidation)
author-agent: team-orchestrator
date: 2026-03-14
---

# Header component review — consolidation

## Context

Full review of the header component across all languages (EN, ES, CA) and devices. UX Tech Writer and Frontend Engineer were dispatched in parallel; orchestrator consolidated findings and applied the recommended copy and aria-label changes.

## Decisions

1. **Nav FAQ (ES/CA):** Use **FAQ** for `nav.faq` in Spanish and Catalan. Section title (`faq.title`) keeps the full phrase. Reduces overflow risk and keeps one clear wording.
2. **Breakpoint:** Desktop nav and in-bar CTA show from **lg (1024px)**; below that, hamburger and mobile menu only. Avoids overflow for long labels on 768–1023px without shortening copy.
3. **Aria-labels:** All header aria-labels are translated via `common.mainNav`, `common.openMenu`, `common.closeMenu`, `common.mobileMenu`. Hamburger button label toggles open/close by menu state.

## Deliverables

| Item | Location |
|------|----------|
| Header microcopy spec | `docs/design/copy/header-microcopy.md` |
| UX Tech Writer handoff | `docs/_status/handoffs/20260314-1600-ux-tech-writer-to-team-orchestrator-header-review.md` |
| Frontend Engineer handoff | `docs/_status/handoffs/20260314-1500-frontend-engineer-to-team-orchestrator-header-review.md` |
| i18n changes | `src/i18n/messages/{en,es,ca}.json`: nav.faq (ES/CA) = FAQ; common.mainNav, openMenu, closeMenu, mobileMenu added |
| Header component | `src/components/layout/Header.tsx`: lg breakpoint for nav/CTA; translated aria-labels; hamburger label by state |

## Open questions

- **Optional short process:** If overflow is still observed at 768–1024px after deployment, consider `nav.processShort` (Process / Proceso / Procés) per header-microcopy.md. No implementation until confirmed.
- **Short CTA:** If ever needed, confirm with product/design before adding `hero.ctaQuoteShort`.

## Suggested next steps

1. QA: Spot-check header at 768px, 896px, 1024px in EN, ES, CA.
2. Close header review; continue with remaining HigiRapid next steps (QA checklist, env vars, optional JSON-LD).

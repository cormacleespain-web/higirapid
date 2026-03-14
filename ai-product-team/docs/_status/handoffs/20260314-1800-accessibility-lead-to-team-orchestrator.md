---
title: Handoff — Accessibility Lead to Team Orchestrator (Mobile Menu Audit)
author-agent: accessibility-lead
date: 2026-03-14
status: draft
---

# Handoff: Accessibility Lead → Team Orchestrator

## Context

Accessibility review of the Header mobile menu (HigiRapid marketing site) for WCAG 2.1 Level AA. The mobile menu is implemented in `src/components/layout/Header.tsx`: full-viewport overlay below `lg`, body scroll lock, hamburger with `aria-expanded`/`aria-controls`/dynamic `aria-label`, and `aria-hidden={!menuOpen}` on the menu region. The review covered focus management, keyboard (Escape, Tab), screen reader behaviour, touch targets, and colour contrast.

## Decisions

- **Focus trap required**: For overlay menus, WCAG 2.1.2 and 2.4.3 require that focus be confined to the overlay while open and returned to the trigger on close. The current implementation does not trap focus or handle Escape; both are required for AA alignment.
- **Main content aria-hidden when menu open**: When the overlay is open, the main page content should be marked `aria-hidden="true"` so screen readers do not expose background content. This requires coordination with layout (e.g. context or shared state).
- **Hamburger touch target**: Standards require ≥ 44×44px; the current hamburger button is likely ~40px; adding `min-h-[44px] min-w-[44px]` brings it into compliance.
- **No change to contrast**: Menu content (text-content-primary on bg-surface-primary) already meets 1.4.3; no design change needed.

## Deliverables

- `ai-product-team/docs/design/accessibility/audits/header-mobile-menu-audit.md` — Full audit with findings table, code-level remediation, and retest steps.

## Open Questions

- **Main content aria-hidden**: Implementing A03 (aria-hidden on main when menu open) may require a shared menu-open state (e.g. React context) between Header and the layout that wraps main content. Who implements: Frontend Engineer with design from Design Systems if needed; Orchestrator can assign.
- **Focus trap implementation**: Prefer a small, maintained solution (e.g. focus-trap-react or a minimal custom trap in Header). Decision can be left to Frontend Engineer; audit specifies behaviour (trap inside `#mobile-menu`, Escape closes and returns focus to hamburger).

## Suggested Next Steps

1. **Team Orchestrator**: Assign remediation of audit findings to Frontend Engineer (A01, A02, A04 in `Header.tsx`; A03 may need layout + Header changes). Prioritise: A02 (Escape to close + return focus), then A01 (focus trap), then A03 (aria-hidden on main), then A04 (hamburger touch target). A05 (live region) is optional.
2. **Frontend Engineer**:  
   - In `Header.tsx`: add Escape key handler when `menuOpen` is true; on Escape call `setMenuOpen(false)` and `hamburgerButtonRef.current?.focus()`.  
   - In `Header.tsx`: add focus trap when `menuOpen` is true so Tab/Shift+Tab cycle only within the `#mobile-menu` container (hamburger remains outside the trap).  
   - In `Header.tsx`: add `min-h-[44px] min-w-[44px]` to the hamburger button.  
   - For A03: add mechanism (e.g. context) so that when menu is open the main content wrapper gets `aria-hidden="true"` (layout or a client wrapper that reads menu state).
3. **QA Lead**: After implementation, run keyboard and screen reader retest per audit “Retest” section (focus trap, Escape, focus return, aria-hidden, touch target).

## Findings by Severity

| Severity | Count | IDs | Summary |
|----------|--------|-----|--------|
| **Major** | 3 | A01, A02, A03 | No focus trap; no Escape to close; main content not aria-hidden when menu open |
| **Minor** | 2 | A04, A05 | Hamburger touch target &lt; 44px; optional live region for open/close announcement |

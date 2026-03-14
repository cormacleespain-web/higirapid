---
title: Accessibility Audit — Header Mobile Menu
author-agent: accessibility-lead
date: 2026-03-14
status: draft
---

# Accessibility Audit: Header Mobile Menu

**Date**: 2026-03-14  
**Scope**: Header component (`src/components/layout/Header.tsx`), mobile menu (viewport &lt; lg)  
**Standard**: WCAG 2.1 Level AA

## Summary

- **Issues found**: 3 Major, 2 Minor
- **Compliance**: Partial — keyboard and focus management gaps prevent full AA alignment for the overlay pattern.

## What Was Reviewed

- Focus management: focus trap when menu open, return focus on close
- Keyboard: Escape to close, Tab order
- Screen reader: menu open/close semantics, aria-hidden, live region
- Touch targets: hamburger button and menu link/control sizes
- Color contrast: menu content (text-content-primary on bg-surface-primary)

## Findings

| ID | Location | Issue | WCAG | Severity | Remediation |
|----|----------|--------|------|----------|-------------|
| A01 | Header.tsx, mobile menu overlay | No focus trap when menu is open. Tab moves focus to content behind the overlay. | 2.1.2 (No keyboard trap), 2.4.3 (Focus order) | **Major** | Implement focus trap: when `menuOpen` is true, contain focus within the mobile menu region (first focusable → last focusable → cycle). Use a ref on the menu container and `focusableElements = container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');` on keydown Tab/Shift+Tab to wrap or prevent default. Alternatively use a small hook or library (e.g. focus-trap-react) that handles Tab/Shift+Tab and Escape. |
| A02 | Header.tsx, mobile menu | Escape key does not close the menu. | 2.1.1 (Keyboard) | **Major** | Add `useEffect` that when `menuOpen` is true attaches a keydown listener for `Escape`; on key === 'Escape' call `setMenuOpen(false)` and then move focus back to the hamburger button (store button ref, call `hamburgerRef.current?.focus()`). Clean up listener when `menuOpen` is false. |
| A03 | Header.tsx, mobile menu | When menu is open, main page content is not hidden from screen readers (no aria-hidden on main). Focused user may hear both overlay and background content. | 2.4.3, 4.1.2 (Name, role, value) | **Major** | When `menuOpen` is true, set `aria-hidden="true"` on the application main content (e.g. the element that wraps the main landmark or the root layout main). In Next.js app layout, this can be done via a context or by rendering a wrapper in Header that targets the main content node; alternatively set `aria-hidden` on a wrapper that wraps everything except header + mobile menu. Prefer wrapping main content in layout and passing an aria-hidden prop based on menu state from Header (e.g. React context or layout reading menu state). |
| A04 | Header.tsx, hamburger button | Touch target may be under 44×44px (p-2 + 24px icon ≈ 40px). | 2.5.5 (Target size) | **Minor** | Ensure hamburger button has at least 44×44px: e.g. add `min-h-[44px] min-w-[44px]` to the button className, or use `p-3` and ensure icon+padding totals ≥ 44px. |
| A05 | Header.tsx, mobile menu links / LanguageSwitcher | Optional: no live region announcement when menu opens/closes. | 4.1.3 (Status messages) | **Minor** | Optional improvement: add a live region (e.g. `aria-live="polite"` and `aria-atomic="true"`) that announces “Menu opened” / “Menu closed” when state changes. Not required if focus is moved to first focusable in menu on open and focus returns to hamburger on close. |

## What Already Meets WCAG

- **Hamburger**: `aria-expanded`, `aria-controls="mobile-menu"`, dynamic `aria-label` (open/close via tCommon) — 4.1.2.
- **Mobile menu region**: `id="mobile-menu"`, `role="region"`, `aria-label={tCommon("mobileMenu")}`, `aria-hidden={!menuOpen}` — correct semantics when closed.
- **Body scroll lock**: Prevents background scroll when menu open (reduces confusion).
- **Focus visible**: Links and buttons in the menu use `focus-visible:ring-*` — 2.4.7.
- **Color contrast**: Menu uses `text-content-primary` (#0F172A) on `bg-surface-primary` (#FFFFFF); ratio well above 4.5:1 — 1.4.3. Secondary text (`text-content-secondary` #64748B on white) meets AA.
- **LanguageSwitcher**: Listbox pattern with `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, options; “Language” label present in menu — 4.1.2.
- **Nav links**: Close menu on click (`onClick={() => setMenuOpen(false)}`); CTA and nav links are keyboard activatable.

## Code-Level Fixes (Concrete)

1. **Focus trap (A01)**  
   - **Where**: `Header.tsx`.  
   - **How**: On `menuOpen === true`, trap focus inside the mobile menu div (e.g. ref `mobileMenuRef`). On Tab from last focusable, move focus to first; on Shift+Tab from first, move to last. Run in a `useEffect` that adds keydown listener when menu open; cleanup on close. Ensure the hamburger is not inside the trap (it’s in the header bar); trap only the overlay div `#mobile-menu` and its descendants.

2. **Escape to close + return focus (A02)**  
   - **Where**: `Header.tsx`.  
   - **How**: Add a ref for the hamburger button (e.g. `hamburgerButtonRef`). In the same or separate `useEffect`, when `menuOpen` is true add keydown listener for `key === 'Escape'`: call `setMenuOpen(false)`, then `hamburgerButtonRef.current?.focus()`. Remove listener when menu is false.

3. **aria-hidden on main content (A03)**  
   - **Where**: Layout or Header.  
   - **How**: Option A — In `app/[locale]/layout.tsx`, wrap the main content (e.g. everything except the header) in a div and pass a prop/callback so Header can communicate “menu open.” For example: context `MenuOpenContext` provided from layout, consumed by Header (set open) and by the main wrapper (read open and set `aria-hidden={menuOpen}`). Option B — If layout does not have access to menu state, use a small global or portal that sets `aria-hidden` on the main element by id when menu is open (Header sets state; a client component in layout reads it and sets aria-hidden on main). Prefer Option A (context) for clarity.

4. **Touch target hamburger (A04)**  
   - **Where**: `Header.tsx`, hamburger `<button>`.  
   - **How**: Add `min-h-[44px] min-w-[44px]` to the button’s `className` (e.g. next to `p-2`).

5. **Live region (A05, optional)**  
   - **Where**: `Header.tsx`, inside or next to the mobile menu region.  
   - **How**: Add a visually hidden element with `aria-live="polite"` and `aria-atomic="true"`. When `menuOpen` becomes true, set text to “Menu opened” (tCommon); when false, set to “Menu closed”. Use a short delay before clearing “Menu closed” so SR can announce it.

## Retest

After fixes: (1) Keyboard-only: open menu with Enter/Space, Tab through all items (focus must not leave overlay), Escape closes and focus on hamburger. (2) Screen reader: open menu, confirm main content is not announced; close with Escape, confirm focus and “closed” context. (3) Touch: verify hamburger and menu links meet ≥ 44×44px.

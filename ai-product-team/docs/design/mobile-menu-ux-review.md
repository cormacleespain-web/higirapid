---
title: Mobile Menu UX Review — Header
author-agent: design-lead
date: 2026-03-14
status: draft
---

# Mobile Menu UX Review: Header

Review of the HigiRapid Header mobile menu (visible below `lg`, implemented in `src/components/layout/Header.tsx`) for information hierarchy, visual hierarchy, consistency with product experience, behaviour, and UX gaps.

---

## Summary

The mobile menu correctly implements nav → language → CTA order, scroll lock, and accessible controls. **Recommendations**: add a dismissible backdrop with close-on-tap, open/close transition, focus trap and return-focus, and align overlay top with header height. No change to content order.

---

## 1. Information hierarchy and order

| Finding | Status |
|--------|--------|
| Order is nav links → Language section → Get a Quote CTA | ✓ Correct; matches intent (browse first, then locale, then primary action). |
| Nav links close menu on click (and scroll to section) | ✓ Good; reduces friction. |
| CTA and language switcher inside menu (not in header bar on mobile) | ✓ Appropriate; keeps header bar to logo + hamburger only. |

**Decision**: Keep current order. No change.

---

## 2. Visual hierarchy and spacing

| Finding | Status |
|--------|--------|
| Nav links: `py-3`, `px-3`, `gap-1` between items | ✓ Adequate tap targets; spacing aligns with tokens (space.4 / space.3). |
| Language section: `mt-4 pt-4 border-t border-border`; label `text-sm font-medium text-content-secondary mb-2 px-1` | ✓ Clear separation; divider and secondary label support hierarchy. |
| CTA: `mt-6 block`, `Button variant="primary" fullWidth` | ✓ CTA is visually dominant; spacing (space.6) separates from language. |
| Section label uses `tFooter("language")` | ✓ Consistent with footer language label. |

**Recommendation**: Optional — use design token for nav link vertical spacing (e.g. `space-4` / `gap-4` between nav items) if the design system defines a "list item spacing" token for consistency with other lists (e.g. FAQ, footer). Not blocking.

---

## 3. Consistency with site (tokens, typography)

| Finding | Status |
|--------|--------|
| Menu panel: `bg-surface-primary`, `border-border`, `text-content-primary` / `text-content-secondary` | ✓ Matches design tokens (tokens.md). |
| Nav links: `font-medium`, `hover:text-primary`, `focus-visible:ring-primary` | ✓ Aligns with tokens and rest of site. |
| Button: `variant="primary"` with `fullWidth` | ✓ Matches button spec and CTA hierarchy. |
| LanguageSwitcher in menu uses `variant="default"` | ✓ Correct for light background. |

**Minor**: Header bar uses `border-white/20` (brand-specific); menu uses `border-border`. Acceptable — header is on primary, menu is on surface.

---

## 4. Behaviour (open/close, scroll lock)

| Finding | Status |
|--------|--------|
| Body scroll lock when `menuOpen` | ✓ Implemented via `document.body.style.overflow = "hidden"` in `useEffect`; cleanup on unmount. |
| Hamburger toggles open/close; `aria-expanded`, `aria-controls`, `aria-label` (open/close) | ✓ Accessible and clear. |
| Nav link click and CTA click call `setMenuOpen(false)` | ✓ Menu closes on in-menu action. |
| Overlay position: `fixed inset-x-0 top-16 bottom-0` | ⚠ Header uses `h-16 md:h-18`; `top-16` is 64px. On `md` (768px+), header is 72px — overlay top does not align with header bottom (8px gap). |

**Recommendations**:

- **Align overlay with header bottom**: Use a value that matches the header height at all breakpoints (e.g. `top-16` for base and a matching top when header is `h-18` on `md`). Suggested implementation: use the same height classes as the header for the overlay’s `top` (e.g. `top-[4rem] md:top-[4.5rem]` if `h-18` is 4.5rem, or a CSS variable `--header-height` set by the header and `top: var(--header-height)` on the overlay). Frontend to confirm exact header heights and apply.
- **Escape to close**: Add `keydown` listener for `Escape` when menu is open: call `setMenuOpen(false)` and return focus to the hamburger button. Matches interaction spec (“Close button or tap-outside to close”) and accessibility expectations.

---

## 5. UX gaps (backdrop, close on overlay tap, animation)

| Gap | Recommendation | Implementation detail |
|-----|----------------|----------------------|
| **No backdrop** | Add a dismissible backdrop between header and content so the menu is clearly a layer over the page. | Render a full-viewport fixed layer (e.g. `fixed inset-0`) **above** page content and **below** the menu panel (z-order: header 40, backdrop 35, menu panel 30, or keep panel above backdrop). Backdrop: `bg-black/40` or token (e.g. `bg-content-primary/40`), `aria-hidden="true"`. Click/tap on backdrop → `setMenuOpen(false)`. |
| **Close on “outside” tap** | User can dismiss by tapping outside the menu. | Use the same backdrop; ensure only the backdrop (not the panel) receives the close-on-click. Do not close when clicking inside the panel (nav, language, CTA). |
| **No open/close transition** | Menu appears/disappears instantly (`block`/`hidden`). | Add a short transition for open/close. **Option A**: Panel — opacity + optional slide (e.g. `translateY(-8px)` → `0`). **Option B**: Backdrop — opacity 0 → 1. Use `motion.duration.normal` (250ms) and `motion.easing.enter` / `motion.easing.exit` (tokens.md). Respect `prefers-reduced-motion: reduce` (no or minimal animation). Implementation: use conditional classes or a state (e.g. `opacity-0` → `opacity-100`, `transition-all duration-250`); when closing, run transition then set `menuOpen` false, or use a single “visible” state that drives both opacity and pointer-events so the menu is not focusable when “closed”. |
| **Focus trap** | When menu is open, focus should stay inside the menu until closed (Escape or backdrop tap). | On open: move focus to first focusable element in the menu (e.g. first nav link or a dedicated “Close” button if added). Trap focus within the menu panel (e.g. focus first/last on Tab from last/first). On close: return focus to the hamburger button. This satisfies WCAG 2.4.3 and avoids focus dropping to content behind. |
| **Focus return** | After closing via Escape or backdrop, focus should go back to the trigger. | On any close path (hamburger, Escape, backdrop, or link/CTA), set focus to the hamburger button (use a ref). |

---

## 6. Implementation checklist (for Frontend)

- [ ] **Backdrop**: Full-viewport fixed layer below menu panel; `bg-black/40` (or design token); z-index below panel, above main content; `aria-hidden="true"`; onClick → `setMenuOpen(false)`.
- [ ] **Overlay top**: Match overlay `top` to header height (e.g. `top-16` + `md:top-[4.5rem]` or CSS variable) so no gap on `md`.
- [ ] **Escape**: On `keydown` Escape when menu open → `setMenuOpen(false)`; focus hamburger (ref).
- [ ] **Focus on open**: When `menuOpen` becomes true, focus first focusable in panel (first nav link or close button).
- [ ] **Focus trap**: Keep Tab within menu panel (last → first, first → last); when closed, focus hamburger.
- [ ] **Focus return**: On close (any path), focus hamburger via ref.
- [ ] **Transition**: Backdrop and panel opacity (and optional panel translate); 250ms; respect `prefers-reduced-motion`.
- [ ] **No close on panel click**: Backdrop click only closes; clicks inside panel do not close (except via nav/CTA which already close).

---

## References

- Implementation: `src/components/layout/Header.tsx`
- Interaction spec: [interaction-spec-higirapid-website.md](./interaction-spec-higirapid-website.md) (§ Header Navigation)
- Tokens: [design-system/tokens.md](./design-system/tokens.md)
- Accessibility: [accessibility/standards.md](./accessibility/standards.md)

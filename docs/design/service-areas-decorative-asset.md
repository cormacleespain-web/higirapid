# Service Areas — Decorative Location Asset

**Section**: `#areas` (ServiceAreas)  
**Source**: `BrandPackage/Web Icons/Location.svg`

## Intent

- Add the Location pin SVG as a **decorative** background element in the Service Areas section to reinforce the “we serve this area” message without competing with content.
- **Placement (desktop)**: Right-aligned (`right-0`), vertically centered in section (`top-1/2 -translate-y-1/2`), container 999×336px.
- **Transform**: 45° rotation to the right (clockwise).
- **Opacity**: 15%.
- **Responsive**: Hidden on mobile (`hidden md:block`); visible from `md` (768px) and up.

## UX / Design decisions

| Decision | Rationale |
|----------|-----------|
| Decorative only | Asset is `aria-hidden` and `pointer-events-none` so it does not affect semantics or interaction. |
| `currentColor` + `text-content-primary` | Icon inherits theme text color so it works on light/dark and stays subtle at 15% opacity. |
| `relative` section + `overflow-hidden` | Keeps the rotated asset clipped to the section and prevents layout spill. |
| Content `z-10` | Ensures headings and copy stay above the decorative layer. |

## Implementation

- **Component**: `src/components/sections/ServiceAreas.tsx`
- **Asset**: Inlined as `LocationIcon` (no extra request); original SVG preserved in `BrandPackage/Web Icons/Location.svg`.

## Design-lead check

- [x] Confirm 45° rotation and 15% opacity achieve the intended “subtle background” effect.
- [x] Confirm positioning (top/left and 999×336) works across viewports or if breakpoint-specific values are needed.
- [x] Confirm no conflict with accessibility (decorative treatment and `aria-hidden` are correct).

**Design-lead verdict (2025-03-14): Approved.**

1. **Rotation and opacity:** 45° (clockwise) and 15% opacity are implemented as specified and achieve the intended subtle background effect; the icon reads as atmosphere without competing with content.
2. **Positioning:** Fixed values (top 194px, left 0, 999×336px) with `overflow-hidden` are acceptable. Optional follow-up: if the section layout or height changes at breakpoints, consider breakpoint-specific `top` or size so the asset's visual weight stays consistent; not required for current layout.
3. **Decorative treatment:** Correct from a UX/accessibility perspective. Wrapper uses `aria-hidden` and `pointer-events-none`; SVG uses `currentColor` and is non-interactive. No semantics or focus; appropriate for a purely decorative asset.

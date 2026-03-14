# Token Guardrails — Design Systems Lead

Guardrails for design tokens so they stay consistent, scalable, and usable by Engineering.

## Naming

- **Semantic over literal**: Prefer `color.text.primary`, `color.surface.elevated` over `color.gray.800`. Names should reflect usage, not implementation.
- **Hierarchy**: Use a clear hierarchy (e.g. category.subcategory.variant). Avoid one-off token names that don’t fit the system.
- **Consistency**: Same structure for colour, typography, spacing, motion (e.g. `motion.duration.fast`, `motion.easing.enter`).

## Scope

- **Tokens for all visual decisions**: Colour, type, spacing, radius, shadow, motion. Do not leave "magic numbers" in component specs; reference tokens.
- **No hard-coded values in specs**: Component specs reference token names; Engineering implements with token values. Single source of truth in `docs/design/design-system/tokens.md`.

## Guardrails

- Do not introduce tokens that overlap in purpose (e.g. two "primary" colours for different things without clear semantic names).
- Do not skip motion tokens if the product uses animation; define duration and easing so Frontend Artist and Engineer can use them.
- Do not change token names without a migration note; Engineering may have implemented against existing names. Document renames in decisions.md.

## Cross-Platform

- If the product targets multiple platforms (web, native), document which tokens map to which platform (e.g. CSS custom properties vs iOS/Android). Design Systems Lead owns the mapping.

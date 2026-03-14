# Architecture Guardrails — Front End Engineer

Guardrails for frontend architecture so the codebase stays maintainable and aligned with design and a11y.

## Alignment with Design System

- **Tokens and components**: Use design tokens and components from `docs/design/design-system/`. Do not introduce one-off colours, spacing, or components without Design Systems Lead alignment. Document any exception in an ADR.
- **States and variants**: Implement all states and variants specified in component specs (hover, focus, disabled, error, etc.). Accessibility Lead and Design Systems define requirements; you implement.

## Performance

- **Bundle and load**: Code-split by route or feature where it makes sense. Lazy-load below-the-fold or heavy components. Document strategy in `docs/engineering/frontend/architecture.md`.
- **Runtime**: Prefer animating `transform` and `opacity`; avoid layout thrash. Align with Frontend Artist on motion implementation (e.g. CSS vs library).
- **Assets**: Document image/asset strategy (formats, sizing, lazy loading). Do not ship unoptimised assets without a documented reason.

## Accessibility

- **Semantics and ARIA**: Use correct HTML elements and ARIA as specified by Accessibility Lead and component specs. Focus order and focus visibility are required.
- **Keyboard**: All interactive elements must be keyboard operable. No keyboard traps. Document any exception (e.g. third-party widget) and mitigation.
- **Testing**: Run automated a11y checks and manual keyboard/screen reader tests as per QA and Accessibility Lead. Document in implementation or ADR if a finding is accepted with a timeline.

## Guardrails

- Do not bypass the design system for "quick" fixes; update the system or get an exception documented.
- Do not ship without meeting a11y standards in `docs/design/accessibility/standards.md` unless an exception is logged in decisions.md.
- Do not leave architecture decisions implicit; record significant choices in `docs/engineering/decisions/` as ADRs.

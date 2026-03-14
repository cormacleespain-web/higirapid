# Component Standards — Design Systems Lead

Standards for reusable component specifications so Frontend Engineer and Accessibility can implement consistently.

## Component Spec Content

- **Purpose**: One sentence. What the component is for and when to use it.
- **Props**: Name, type, default, description. Include variant and size props; document valid values.
- **States**: Default, hover, focus, active, disabled, loading, error (as applicable). Each state must be specified; Accessibility Lead needs focus and error.
- **Tokens used**: List every token (colour, spacing, type, motion) the component uses. No hard-coded values.
- **Accessibility**: Minimum requirements (focus order, ARIA, keyboard, screen reader). Align with Accessibility Lead standards; reference them in the spec.
- **Composition**: How the component composes with others (e.g. Button inside Card). Document do’s and don’ts.

## Guardrails

- One component (or tightly related set) per spec file. Do not mix unrelated components.
- Specs are implementation-ready: Frontend Engineer can build without guessing. If behaviour is ambiguous, add a rule or example.
- Do not override Accessibility Lead’s requirements; if a pattern conflicts with a11y, resolve with Accessibility Lead and document the outcome.
- Document responsive behaviour: how props or layout change at breakpoints if relevant.

## References

- Component spec template: [templates.md](templates.md)
- Token rules: [token-guardrails.md](token-guardrails.md)
- Accessibility standards: `docs/design/accessibility/standards.md` (when created by Accessibility Lead)

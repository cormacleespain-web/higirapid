# UX Principles — Design Lead

Principles for UX strategy, interaction design, and experience architecture. Use when creating or reviewing UX docs in `docs/design/`.

## Experience Principles

- **User outcome over feature list**: Design for the outcome the user needs (e.g. "complete a task confidently") not just a list of UI elements.
- **Consistency**: Align with the design system (Design Systems Lead). Use consistent patterns for similar tasks across the product.
- **Progressive disclosure**: Show what’s needed when it’s needed; avoid overwhelming the user. Reveal complexity gradually.
- **Feedback and state**: Every user action should have clear feedback (visual, copy, or both). States (loading, success, error, empty) must be designed.
- **Error prevention and recovery**: Prefer preventing errors; when they occur, explain what happened and the next step. Never leave the user stuck.

## Interaction Design

- **Affordances**: Controls should look like what they do (e.g. clickable looks clickable). Use design system components so behaviour is predictable.
- **Accessibility from the start**: Work with Accessibility Lead; design for keyboard, focus, and screen readers. Do not bolt a11y on later.
- **Responsive and adaptive**: Consider different viewports and contexts. Document breakpoints and behaviour in specs.

## Guardrails

- Do not specify visual design system details (tokens, component APIs); that is Design Systems Lead. Specify behaviour, structure, and content.
- Do not skip empty, loading, or error states in specs; Frontend and QA need them.
- Do not hand off to Design Systems or Engineering without clear acceptance criteria for the experience (testable with Design Lead or QA).

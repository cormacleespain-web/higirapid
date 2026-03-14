# WCAG Quick Reference — Accessibility Lead

Quick reference for WCAG 2.1 Level A and AA. Use when defining standards, auditing, or writing test plans. Full spec: https://www.w3.org/WAI/WCAG21/quickref/

## Four Principles (POUR)

- **Perceivable**: Information and UI must be presentable in ways users can perceive (text alternatives, captions, adaptable, distinguishable).
- **Operable**: UI must be operable (keyboard, enough time, seizures avoided, navigable, input modalities).
- **Understandable**: Content and operation must be understandable (readable, predictable, input assistance).
- **Robust**: Content must be robust enough for assistive technologies (parsed, compatible).

## Level A (Minimum)

- 1.1.1 Non-text content (alt text, etc.)
- 1.3.1 Info and relationships (structure, headings, lists)
- 1.4.1 Use of colour (not only colour)
- 2.1.1 Keyboard (all functionality)
- 2.1.2 No keyboard trap
- 2.4.1 Bypass blocks (skip link)
- 2.4.2 Page titled
- 2.4.3 Focus order
- 2.4.4 Link purpose (in context)
- 3.1.1 Language of page
- 4.1.1 Parsing
- 4.1.2 Name, role, value (ARIA, semantics)

## Level AA (Target for most products)

- 1.4.3 Contrast (minimum 4.5:1 text, 3:1 large text)
- 1.4.4 Resize text (up to 200%)
- 1.4.5 Images of text (prefer real text)
- 2.4.5 Multiple ways (navigation)
- 2.4.6 Headings and labels
- 2.4.7 Focus visible
- 3.2.3 Consistent navigation
- 3.2.4 Consistent identification
- 3.3.3 Error suggestion; 3.3.4 Error prevention (legal, financial)
- 4.1.3 Status messages (e.g. live regions)

## Guardrails

- Every deliverable (standards, audit, test plan) must reference the WCAG criterion (e.g. "2.4.7 Focus visible") so Engineering and QA can verify.
- Do not lower the target level (e.g. to A only) without documenting the rationale and impact in decisions.md.
- When a criterion is not met, state the failure and the remediation; do not leave findings vague.

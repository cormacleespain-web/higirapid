# Accessibility Testing Guide — Accessibility Lead

How to test for accessibility and document results. Use when creating test plans, audits, or compliance docs.

## Test Types

- **Automated**: Axe, WAVE, or similar. Run on key pages and components. Document tool, version, and scope. Automated tests catch only part of requirements; manual testing is still required.
- **Keyboard**: All interactive elements reachable and operable by keyboard only. Tab order logical; no traps; focus visible. Document browser/OS.
- **Screen reader**: Test with at least one screen reader (e.g. NVDA, VoiceOver, JAWS). Document reader and version. Check labels, headings, live regions, and form errors.
- **Zoom and resize**: Content readable and functional at 200% zoom (or per WCAG). No horizontal scroll for text; no content clipped.
- **Colour and contrast**: Check contrast ratios (4.5:1 text, 3:1 large text at AA). Ensure information is not conveyed by colour alone.

## Documenting Findings

- **Location**: Page, component, or flow. Include a short description (e.g. "Checkout form, Submit button").
- **Issue**: What’s wrong in user terms and which WCAG criterion it fails (e.g. "Focus not visible on button — 2.4.7").
- **Severity**: Critical (blocks core task), Major (significant barrier), Minor (improvement). Define severity in your standards doc.
- **Remediation**: Concrete fix (e.g. "Add focus-visible ring using token focus.ring").
- **Retest**: Note when to retest after fix.

## References

- WCAG criteria: [wcag-quick-ref.md](wcag-quick-ref.md)
- W3C WAI Testing: https://www.w3.org/WAI/test-evaluate/
- Axe (Deque): https://www.deque.com/axe/
- WAVE: https://wave.webaim.org/

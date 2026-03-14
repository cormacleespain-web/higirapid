# Motion Principles — Front End Artist

Principles for motion design so animation supports clarity and quality without harming accessibility or performance.

## Purpose

- **Every motion has a purpose**: Reinforce state change, guide attention, or provide feedback. Avoid decorative motion that doesn’t support understanding.
- **Restraint**: One well-tuned transition beats many competing effects. Prefer subtle over flashy for UI.
- **Interruptible**: Users should be able to act before an animation finishes. Avoid blocking interactions on animation complete unless necessary (e.g. modal exit).

## Technical

- **Properties**: Prefer `transform` and `opacity` for performance (compositor). Avoid animating layout-triggering properties when possible.
- **Duration**: Short for micro-interactions (c. 100–200 ms); slightly longer for transitions (c. 200–400 ms). Use design system motion tokens when defined.
- **Easing**: Use consistent easing (e.g. ease-out for enter, ease-in for exit). Document in animation guidelines and align with Design Systems Lead if tokens exist.

## Accessibility

- **Reduced motion**: Always respect `prefers-reduced-motion: reduce`. Provide a reduced or instant alternative. Document in every motion spec. See [reduced-motion-guide.md](reduced-motion-guide.md).
- **No motion for critical info**: Do not convey critical information only through motion; support with copy or visual state so screen reader and static users get the same info.

## Guardrails

- Do not animate the same property with multiple systems (e.g. CSS and JS) on the same element without a clear ownership rule (see coexistence patterns if using Motion + GSAP).
- Do not exceed motion token durations without Design Systems Lead approval; consistency across the product is part of the design system.
- Do not ship motion without a reduced-motion path; it’s a requirement, not optional.

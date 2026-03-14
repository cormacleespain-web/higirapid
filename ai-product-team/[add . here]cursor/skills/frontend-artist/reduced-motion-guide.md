# Reduced Motion Guide — Front End Artist

How to respect `prefers-reduced-motion: reduce` in all motion specs and implementation. Required for accessibility and compliance.

## User Preference

- **Media query**: `prefers-reduced-motion: reduce` when the user has requested reduced motion (OS or browser setting).
- **Default**: Assume "no preference" for full motion; when preference is "reduce", provide an alternative.

## What to Reduce

- **Decorative motion**: Parallax, floating, particle effects, decorative transitions — remove or disable when reduced.
- **Functional transitions**: Page transitions, accordions, modals — simplify to opacity fade or instant (no or minimal movement). Keep the interaction; reduce or remove the motion.
- **Feedback and state**: Button press, focus ring, loading — keep minimal feedback (e.g. opacity or instant). Avoid long or distracting motion.
- **Informational animation**: Progress, status change — can keep but reduce distance/duration so the info is still clear without being distracting.

## Specifying in Motion Specs

- Every motion spec must include a **Reduced motion** section: "When `prefers-reduced-motion: reduce`: [instant / opacity only / no animation / specific alternative]."
- Be concrete: "Instant transition, no transform" not "Respect reduced motion."

## Implementation

- **CSS**: Use `@media (prefers-reduced-motion: reduce)` to override duration to 0 or use instant transitions.
- **JS (e.g. Motion/GSAP)**: Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and skip or simplify animations. Document in implementation guidelines.
- **Design system**: If motion tokens exist, define a reduced-motion set (e.g. duration: 0 or 1ms) and use it when the preference is set.

## References

- WCAG 2.2.3 Animation from Interactions (Level AAA): https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

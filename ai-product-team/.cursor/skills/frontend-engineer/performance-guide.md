# Performance Guide — Front End Engineer

Guidelines and references for frontend performance. Use when writing architecture docs or implementation guidelines.

## Principles

- **Measure first**: Define performance budgets or targets (e.g. LCP, FID/INP, CLS). Document in architecture or test strategy. Optimise based on data where possible.
- **Progressive enhancement**: Core content and functionality should work without JS where feasible; enhance with JS. Document any hard JS dependency and rationale.
- **Perceived performance**: Loading states, skeletons, and prioritisation of above-the-fold content improve perceived performance. Align with Design Lead and Frontend Artist.

## Implementation

- **Bundle**: Code-split by route or feature. Tree-shake unused code. Document bundle strategy and any heavy dependencies.
- **Rendering**: Avoid unnecessary re-renders (React: memo, useMemo, useCallback where justified). Use virtualisation for long lists. Document patterns in implementation guidelines.
- **Network**: Use caching (HTTP cache, service worker if applicable). Minimise payloads (compress, modern formats). Document caching strategy.
- **Assets**: Lazy-load images; use responsive images and modern formats (e.g. WebP/AVIF). Document in architecture.

## References

- **Web Vitals**: https://web.dev/vitals/ — LCP, FID/INP, CLS. Use for targets and measurement.
- **web.dev Performance**: https://web.dev/performance/ — Audits, metrics, optimisation patterns.
- **React Performance**: Official React docs and React Compiler (if adopted). Use for render and bundle guidance.

Document any performance-related ADR in `docs/engineering/decisions/` and link from `docs/engineering/frontend/architecture.md`.

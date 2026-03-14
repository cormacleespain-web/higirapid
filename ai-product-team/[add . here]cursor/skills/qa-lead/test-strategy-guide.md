# Test Strategy Guide — QA Lead

Guidelines for defining test strategy so coverage is clear and aligned with product, design, and engineering.

## Scope

- **What to test**: Functional (features, flows), regression (existing behaviour), integration (APIs, services), accessibility (per Accessibility Lead), performance (per Frontend/Backend targets). Document scope in `docs/qa/test-strategy.md`.
- **Prioritisation**: Risk and value first. Critical paths and high-impact features get more coverage. Document prioritisation criteria (e.g. user impact, failure likelihood).
- **Out of scope**: Explicitly state what is not tested (e.g. third-party widgets, legacy paths with sunset date). Avoid ambiguity.

## Test Types

- **Unit**: Owned by Engineering; QA may define or review expectations. Document in test strategy if QA has input.
- **Integration**: APIs, service contracts, data flow. Coordinate with Backend and Frontend. Document tools and environment.
- **E2E**: Critical user journeys. Document scenarios, coverage, and maintenance (e.g. flakiness, run frequency).
- **Accessibility**: Per Accessibility Lead standards and testing guide. Document tools (e.g. Axe), manual checks, and sign-off criteria.
- **Performance**: Per Frontend/Backend targets (e.g. Web Vitals, API latency). Document how and when performance is tested.

## Sign-off and Release

- **Definition of done**: Tests pass; critical and major bugs resolved or accepted with timeline. Document in test strategy and release readiness template.
- **Release readiness**: Use release readiness review template. QA Lead recommends go/no-go; orchestrator or product makes final call. Document criteria in [release-criteria.md](release-criteria.md).

## Guardrails

- Do not sign off without accessibility criteria met (or documented exception). Align with Accessibility Lead.
- Do not skip test strategy for new features; at minimum, document scope and types for the feature.
- Do not leave "testing TBD"; assign owner (QA or Engineering) and document in strategy.

## References

- Test strategy and report templates: [templates.md](templates.md)
- Release readiness: [release-criteria.md](release-criteria.md)
- Accessibility testing: `.cursor/skills/accessibility-lead/testing-guide.md`

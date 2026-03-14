# Release Criteria — QA Lead

Criteria for release readiness and go/no-go. Use when producing release readiness reviews and when coordinating with Project Manager and Orchestrator.

## Must Have (Go)

- **Critical bugs**: Zero unresolved critical bugs that block core user flows or cause data loss/security issues. Any exception must be documented with mitigation and owner.
- **Regression**: Core flows and critical paths pass. No known regressions in areas covered by test strategy without a documented fix plan.
- **Accessibility**: Meets target level (e.g. WCAG 2.1 AA) per Accessibility Lead audit or documented exceptions with timeline. Sign-off from Accessibility Lead or documented acceptance.
- **Performance**: Meets defined targets (e.g. LCP, API latency) or documented deviation and plan. Align with Frontend/Backend.
- **Sign-off**: QA Lead has completed validation per test strategy and recommends "go" with no unresolved blockers.

## Should Have (Conditional Go)

- **Major bugs**: Resolved or accepted with clear workaround and fix timeline. Document in release readiness review.
- **Documentation**: Release notes, known issues, and any user-facing doc updates complete or tracked. UX Tech Writer and Product Owner input as needed.
- **Rollback plan**: Document how to roll back (e.g. feature flags, revert). Project Manager or Engineering may own; QA verifies it exists.

## No-Go

- **Critical or blocking**: Unresolved critical bugs, failed accessibility with no exception, or missing rollback for high-risk change. QA Lead recommends "no-go" and lists blockers.
- **Incomplete validation**: Test strategy not executed for the release scope. Do not sign off without completing the agreed validation.

## Documenting the Verdict

- Use the release readiness template in [templates.md](templates.md).
- State: **Go / No-go / Conditional go**.
- List criteria met and not met; for conditional go, list conditions and owners.
- QA Lead signs off with recommendation; final release decision is made by Orchestrator or product. Document in handoff and in `docs/_status/decisions.md` if the decision is conditional or no-go.

## References

- Test strategy: [test-strategy-guide.md](test-strategy-guide.md)
- Release readiness workflow: `workflows/release-readiness.md`

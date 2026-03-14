# Delivery Guidelines — Project Manager

Guidelines for roadmaps, sprints, milestones, and delivery tracking. Use when creating or updating docs in `docs/roadmap/`.

## Roadmap

- **Horizon**: Define clear time horizons (e.g. 30 / 60 / 90 days). Avoid vague "future" buckets.
- **Outcomes over features**: Prefer outcome-based milestones ("Users can complete checkout in under 2 minutes") where possible; link to features that enable them.
- **Dependencies**: Explicitly list cross-team or external dependencies and owners. Flag any dependency that can block the plan.
- **Risks**: Document risks with likelihood and impact; state mitigation or acceptance. Do not hide risks in notes.

## Sprint Planning

- **One clear goal**: Each sprint has a single, testable goal. Avoid "Do several things" as a goal.
- **Capacity**: Note capacity constraints (leave, reduced capacity, onboarding). Do not overcommit.
- **Success criteria**: Define 2–5 measurable or observable success criteria. QA and Product Owner should be able to verify them.
- **Backlog slice**: Take only what fits the sprint goal. Defer the rest; do not squeeze in "nice to have" without reprioritising.

## Milestones

- **Definition of done**: Each milestone has a concrete DoD (e.g. "PRD approved, design spec signed off, API deployed to staging").
- **Ownership**: Assign owner role (not person) per deliverable so handoffs are clear.
- **Dates**: Use target dates; if at risk, say so and update. Do not leave stale dates.

## Delivery Tracking

- **Status**: Use consistent status (e.g. On track / At risk / Blocked). One status per initiative or sprint.
- **Next actions**: Always list the next 1–3 concrete actions and who owns them.
- **Blockers**: Name the blocker and who can unblock. Escalate in handoff to orchestrator if unresolved.

## Guardrails

- Do not commit to dates without checking with Product Owner (scope) and QA (readiness).
- Do not update `docs/_status/progress.md`; the orchestrator owns it. Report status in your handoff and in `docs/roadmap/`.
- Do not invent scope; consume backlog and brief. If scope is unclear, say so in the handoff.

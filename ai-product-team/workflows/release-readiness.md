---
title: Release Readiness Workflow
description: QA validation and release readiness review before release
---

# Release Readiness Workflow

Workflow for validating release readiness. The Team Orchestrator uses this when the request is to "prepare for release", "release readiness", "validate for release", or "go/no-go".

## Triggering Conditions

- User or system request to "prepare for release", "release readiness", "validate release", or "go/no-go"
- Project brief indicates feature or product is nearing release and needs QA sign-off

## Phases and Agent Sequence

### Phase 1 — QA validation (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 1 | qa-lead | PRD, design specs, implementation, API docs, a11y audits, test strategy | QA report, validation checklists, release readiness review in `docs/qa/` | team-orchestrator, project-manager |

**Decision gate**: QA Lead has completed validation and produced release readiness summary (go/no-go, criteria met, risks).

---

### Phase 2 — Timeline and risk (optional, parallel)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 2 | project-manager | Sprint/roadmap, QA report | Delivery status update, timeline and risk summary in `docs/roadmap/` | team-orchestrator |

**Decision gate**: Timeline and risks aligned with QA verdict. No surprise blockers.

---

### Phase 3 — Orchestrator sign-off

- Team Orchestrator reads QA report and (if present) project-manager update.
- Confirms release readiness: go, no-go, or conditional (with conditions).
- Updates `docs/_status/progress.md` with release status and next steps.
- Logs final release decision in `docs/_status/decisions.md` if appropriate.

## Required Inputs/Outputs

- **QA Lead**: Reads `docs/_status/project-brief.md`, PRD, design/engineering/ai/qa docs. Writes QA report and release readiness review to `docs/qa/`. Handoff to orchestrator and project-manager.
- **Project Manager**: Reads QA report and roadmap. Writes delivery status update. Handoff to orchestrator.
- **Team Orchestrator**: Does not implement; decides and documents release outcome.

## Rollback Points

- **No-go**: Address blockers (by role); re-run QA validation when ready.
- **Conditional go**: Document conditions; track until met; optional re-run of Phase 1 for sign-off on conditions.

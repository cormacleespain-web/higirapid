---
title: Sprint Planning Workflow
description: Plan a sprint: goal, backlog slice, milestones, and delivery tracking
---

# Sprint Planning Workflow

Workflow for planning a sprint. The Team Orchestrator uses this when the request is to "plan a sprint", "define milestones", or "update the roadmap".

## Triggering Conditions

- User or system request to "plan a sprint", "set milestones", "update roadmap", or "plan delivery"
- Project brief indicates a need for timeline or capacity planning

## Phases and Agent Sequence

### Phase 1 — Scope and prioritisation (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 1 | product-owner | project-brief, current goal | Prioritised backlog in `docs/product/backlog.md`, scope and rationale | project-manager |

**Decision gate**: Backlog and scope agreed. Project Manager has clear input for timeline.

---

### Phase 2 — Sprint and milestone plan (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 2 | project-manager | Backlog, scope, existing roadmap | Sprint plan in `docs/roadmap/sprints/`, milestone plan, delivery tracking in `docs/roadmap/` | team-orchestrator, product-owner |

**Decision gate**: Sprint goal and backlog slice defined. Dates and capacity documented. Risks and dependencies recorded.

---

### Optional — Alignment check

| Step | Agent | Role |
|------|--------|------|
| — | team-orchestrator | Review sprint plan against project-brief; confirm alignment with product goal; update progress.md if needed. |
| — | qa-lead | Optional: confirm test strategy and QA capacity for the sprint scope. |

## Required Inputs/Outputs

- **Product Owner**: Reads `docs/_status/project-brief.md`, existing `docs/product/backlog.md` and vision. Writes/updates backlog and handoff to project-manager.
- **Project Manager**: Reads handoff and backlog. Writes sprint plan, milestone plan, and/or delivery status to `docs/roadmap/`. Writes handoff to orchestrator.
- All agents: handoffs in `docs/_status/handoffs/`; significant decisions in `docs/_status/decisions.md`.

## Rollback Points

- **After Phase 1**: Reprioritise backlog; re-run Phase 1.
- **After Phase 2**: Adjust scope or dates; re-run Phase 2 with updated constraints.

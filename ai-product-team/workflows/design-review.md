---
title: Design Review Workflow
description: Cross-discipline design review with Design Lead, Design Systems, Accessibility, and Frontend
---

# Design Review Workflow

Workflow for a structured design review. The Team Orchestrator uses this when the request is to "review designs", "design review", or "validate design across disciplines".

## Triggering Conditions

- User or system request to "review design", "design review", "validate UX/design", or equivalent
- Project brief indicates design artifacts are ready for cross-discipline feedback

## Phases and Agent Sequence

### Phase 1 — Review inputs (orchestrator)

- Ensure design artifacts exist in `docs/design/` (UX strategy, IA, journeys, interaction specs, design system, a11y standards).
- Identify scope: full product, feature, or component set.
- Dispatch reviewers in parallel where possible.

### Phase 2 — Parallel review (parallel)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 2a | design-lead | UX strategy, journeys, interaction specs | Review notes: consistency, gaps, alignment with product | team-orchestrator |
| 2b | design-systems-lead | Component specs, tokens, design system docs | Review notes: consistency, scalability, usage | team-orchestrator |
| 2c | accessibility-lead | UX specs, design system, a11y standards | Review notes: a11y gaps, compliance, recommendations | team-orchestrator |
| 2d | frontend-engineer | All design docs | Review notes: implementability, performance, constraints | team-orchestrator |
| 2e | frontend-artist | Design docs, motion intent | Review notes: motion, polish, feasibility | team-orchestrator (optional) |

**Decision gate**: All reviews complete. Orchestrator has consolidated view.

---

### Phase 3 — Consolidation and decisions (orchestrator)

- Consolidate review findings.
- Log decisions and follow-up actions in `docs/_status/decisions.md`.
- Update `docs/_status/progress.md` with outcome and next steps (e.g. rework, approve, iterate).
- Optionally assign follow-up tasks to specific agents.

## Required Inputs/Outputs

- Each reviewer reads `docs/_status/project-brief.md` and the relevant design docs from `docs/design/`.
- Each reviewer writes review notes (in handoff or short doc in `docs/design/` or `docs/qa/`). Format: findings, severity, recommendation, owner.
- Significant decisions and follow-ups go to `docs/_status/decisions.md`.

## Rollback Points

- **After Phase 2**: Rework design; re-run review or run a focused re-review on changed areas.
- **After Phase 3**: Follow-up tasks executed by respective agents; orchestrator tracks until resolved.

---
title: Feature Development Workflow
description: End-to-end feature delivery from product definition through design, engineering, and QA
---

# Feature Development Workflow

End-to-end workflow for building a feature. The Team Orchestrator uses this to sequence and parallelise agent dispatch.

## Triggering Conditions

- User or system request to "build a feature", "ship [capability]", or equivalent
- Product goal in `docs/_status/project-brief.md` that implies a new feature or significant change

## Phases and Agent Sequence

### Phase 1 — Product definition (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 1 | product-owner | project-brief, goal | PRD in `docs/product/prds/`, backlog update | design-lead, backend-engineer, ai-engineer (if AI feature) |

**Decision gate**: PRD approved or explicitly accepted by orchestrator. Open questions resolved or documented.

---

### Phase 2 — Design and backend in parallel

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 2a | design-lead | PRD, vision | UX strategy, IA, journeys, interaction spec in `docs/design/` | design-systems-lead, accessibility-lead |
| 2b | backend-engineer | PRD | Backend architecture, API spec, schema in `docs/engineering/backend/` | frontend-engineer, qa-lead |
| 2c | ai-engineer | PRD (if AI feature) | AI architecture, integration in `docs/ai/` | ai-design-lead, frontend-engineer |

**Decision gate**: Design and backend outputs reviewed. No blocking conflicts. AI Design Lead can run in parallel with Phase 3 if needed.

---

### Phase 3 — Design system and accessibility (parallel)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 3a | design-systems-lead | UX spec, interaction spec | Tokens, component specs in `docs/design/design-system/` | frontend-engineer |
| 3b | accessibility-lead | UX spec, design system intent | Standards, audit or requirements in `docs/design/accessibility/` | frontend-engineer, design-systems-lead |

**Decision gate**: Component and a11y specs sufficient for implementation. Frontend Engineer can proceed.

---

### Phase 4 — Frontend implementation (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 4 | frontend-engineer | Component spec, a11y requirements, API spec, AI integration (if any) | Implementation, architecture doc, ADRs in `docs/engineering/frontend/` | frontend-artist |

**Decision gate**: Feature implementable and testable. No blocking bugs.

---

### Phase 5 — Visual and motion polish (sequential)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 5 | frontend-artist | Implemented UI, design system, motion guidelines | Motion specs, polish recommendations in `docs/engineering/frontend/motion/` | qa-lead |

**Decision gate**: Polish applied or explicitly deferred. Ready for QA.

---

### Phase 6 — QA and documentation (parallel)

| Step | Agent | Inputs | Outputs | Handoff to |
|------|--------|--------|---------|------------|
| 6a | qa-lead | PRD, design specs, implementation, API, a11y | Test strategy update, QA report, validation in `docs/qa/` | team-orchestrator, project-manager |
| 6b | ux-tech-writer | PRD, UX, components, AI UX | Copy guidelines, microcopy, docs in `docs/design/copy/`, `docs/engineering/` | team-orchestrator |

**Decision gate**: QA sign-off and doc updates complete. Orchestrator confirms release readiness.

---

### Throughout

| Agent | Role |
|--------|------|
| project-manager | Track timeline, update roadmap/sprint, report risks. Consumes handoffs from orchestrator and product-owner. |
| team-orchestrator | Maintain project-brief and progress; dispatch agents; resolve conflicts; confirm delivery. |

## Required Inputs/Outputs per Stage

- Each agent must read `docs/_status/project-brief.md` and the handoff(s) from the previous phase.
- Each agent must write deliverables to the paths above and a handoff to `docs/_status/handoffs/` for the next consumer(s).
- Significant decisions must be appended to `docs/_status/decisions.md`.

## Rollback Points

- **After Phase 1**: Change scope or PRD; re-run from Phase 1.
- **After Phase 2 or 3**: Design or backend rework; re-run from affected phase; downstream phases may need refresh.
- **After Phase 4 or 5**: Implementation or polish rework; re-run from Phase 4 or 5.
- **After Phase 6**: Address QA or doc gaps; re-run QA or writer only, or re-run from Phase 4 if implementation changes.

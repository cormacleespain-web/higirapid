# Orchestrator Workflow Sequences

Reference for the Team Orchestrator. Full workflow definitions live in the repo at `workflows/*.md`. This file summarizes phases and parallelism.

## Feature Development (feature-development.md)

1. **Phase 1 (sequential)**  
   Product Owner: define PRD from goal. Output: PRD in `docs/product/prds/`, handoff to Design + Backend + AI.

2. **Phase 2 (parallel)**  
   Design Lead, Backend Engineer, AI Engineer (if needed): each reads PRD. Outputs: UX spec, backend design, AI design. Handoffs as per workflow.

3. **Phase 3 (parallel)**  
   Design Systems Lead, Accessibility Lead: read UX spec. Outputs: component/token specs, a11y requirements. Handoffs to Frontend Engineer.

4. **Phase 4 (sequential)**  
   Frontend Engineer: implement feature using component spec + a11y requirements. Output: implementation, architecture updates. Handoff to Frontend Artist.

5. **Phase 5 (sequential)**  
   Frontend Artist: motion and visual polish. Output: polished UI, motion specs. Handoff to QA.

6. **Phase 6 (parallel)**  
   QA Lead: validate; UX Tech Writer: docs/microcopy. Outputs: QA report, copy/docs.

7. **Throughout**  
   Project Manager: track timeline, milestones, risks. Updates roadmap/sprint docs.

## Sprint Planning (sprint-planning.md)

- Project Manager drives. Product Owner provides prioritised backlog and scope.
- Outputs: sprint goal, backlog slice, milestone plan, capacity/risks. Stored in `docs/roadmap/sprints/`, `docs/_status/`.

## Design Review (design-review.md)

- Design Lead, Design Systems Lead, Accessibility Lead, Frontend Engineer (and optionally Frontend Artist) review design artifacts.
- Outputs: review notes, decisions, follow-up tasks. Decisions logged in `docs/_status/decisions.md`.

## Release Readiness (release-readiness.md)

- QA Lead runs validation and sign-off. Project Manager confirms timeline and dependencies.
- Outputs: release checklist, QA sign-off, go/no-go summary. Stored in `docs/qa/`, `docs/_status/`.

# Conflict Resolution Guide — Team Orchestrator

When agent outputs conflict or create tension (e.g. design vs engineering, scope vs timeline), follow this guide.

## Principles

1. **Document first**: Capture both positions and the trade-off in `docs/_status/decisions.md` before resolving.
2. **User and product goal win**: Resolve in favour of the option that best serves the product goal in `project-brief.md` and user outcomes.
3. **Re-dispatch with constraints**: When re-dispatching, state the resolution and the constraint so the agent works within it.

## Common Conflict Types

### Design vs Engineering (feasibility, scope, timeline)

- **Design wants X; Engineering says X is costly or slow.**  
  Options: (a) Accept reduced scope or phased approach and document; (b) Extend timeline and document; (c) Find a compromise (simplified design) and document. Log in `decisions.md` with rationale (e.g. "Phased: Phase 1 ships without Y to meet date; Y in Phase 2.").

### Product vs Design (priority, UX)

- **Product Owner prioritises A; Design Lead argues B is critical for experience.**  
  Re-open the prioritisation criteria. If the product goal explicitly favours one (e.g. "ship fast"), document that and have Design work within it. If unclear, ask for a single recommendation with rationale and log the decision.

### Backend vs Frontend (contract, errors)

- **API contract or error handling differs from what Frontend assumed.**  
  One source of truth: Backend owns the contract. Document the final API/contract in `docs/engineering/backend/` and have Frontend align. Log any change in `decisions.md`.

### Accessibility vs Design / Engineering (effort, scope)

- **A11y requirements add effort or change design.**  
  Accessibility Lead’s standards are non-negotiable for compliance; implementation approach can be negotiated. Document the chosen approach (e.g. "Use component X which meets a11y") and any deferred items with a timeline.

### QA vs Delivery (release readiness)

- **QA says not ready; Product or PM wants to ship.**  
  Orchestrator does not override QA on quality. Options: (a) Fix blockers and re-validate; (b) Document a "ship with known issues" decision and mitigation (e.g. hotfix plan, feature flag). Log in `decisions.md` and update progress.

## Resolution Steps

1. **Identify**: Note which agents’ outputs conflict and what the conflict is.
2. **State trade-off**: Write one paragraph: "Option A … Option B … Trade-off: …"
3. **Decide**: Choose resolution using principles above; if unclear, choose the option that preserves user outcome and product goal.
4. **Log**: Append to `docs/_status/decisions.md` (date, agent: "orchestrator", decision, rationale, impact).
5. **Re-dispatch if needed**: If an agent must change their output, dispatch with a revision prompt: "Previous output conflicted with [X]. Resolution: [Y]. Please update [deliverable] so that [constraint]."

## References

- Team coordination and handoff format: [coordination-protocols.md](coordination-protocols.md)
- Output quality rules: `.cursor/rules/output-quality.mdc`

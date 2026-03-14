# PRD Guardrails — Product Owner

Guardrails for PRDs and feature definitions so they are actionable for Design, Engineering, and QA.

## Must Have in Every PRD

- **Problem**: One clear problem statement and who has it (user segment or job-to-be-done).
- **User needs**: 3–7 needs, not a wish list. Each need should be testable or observable.
- **Scope (in/out)**: Explicit "in scope" and "out of scope" so Design and Engineering know boundaries.
- **Success criteria**: Measurable or observable. Avoid "improve X" without a way to verify.
- **Acceptance criteria**: Testable. QA and Engineering use these; write so they can say "done" or "not done."

## Guardrails

- **No solution in the problem**: Describe the problem and needs first; solution (features) can follow. If the brief already specifies a solution, still document the problem it solves.
- **No hidden scope**: If something is out of scope, say it. "We are not doing X in this release" prevents scope creep.
- **Dependencies stated**: List systems, teams, or other features this work depends on. Flag unknowns.
- **Open questions**: List open questions explicitly. Assign "owner" (role or "orchestrator") so they get resolved.
- **One PRD per feature or epic**: Do not mix unrelated features in one PRD. Use epic PRD only when the epic has a single goal and shared acceptance criteria.

## Quality Check Before Handoff

- Design Lead can derive user flows and UX goals from this PRD.
- Backend/Engineering can identify APIs and scope of build.
- QA Lead can derive test scenarios from acceptance criteria.
- If any of these is unclear, add or refine sections before handing off.

## References

- PRD and vision templates: [templates.md](templates.md)
- Output quality (actionable, rationale, open questions): `.cursor/rules/output-quality.mdc`

# Quality Checklist — Team Orchestrator

Use this checklist when reviewing agent outputs before marking a phase complete or proceeding to the next dispatch.

## Before Accepting an Agent Handoff

- [ ] Handoff file exists in `docs/_status/handoffs/` with correct naming
- [ ] Handoff has all required sections: Context, Decisions, Deliverables, Open Questions, Suggested Next Steps
- [ ] Deliverables listed are real paths under `docs/` and files exist (or were created)
- [ ] No conflicting edits to the same doc by another agent without resolution
- [ ] Significant decisions appended to `docs/_status/decisions.md` where applicable

## Output Quality (per output-quality.mdc)

- [ ] Outputs are actionable, not abstract (concrete next steps, not vague advice)
- [ ] Decisions include rationale and impact
- [ ] Open questions are explicitly listed, not implied
- [ ] Dependencies on other agents are stated

## Documentation Standards (per documentation-standards.mdc)

- [ ] New/updated docs under `docs/` have frontmatter: title, author-agent, date, status
- [ ] Markdown is well-structured (headers, lists, links)
- [ ] Cross-references use relative paths within `docs/`

## Conflict Check

- [ ] If design and engineering disagree on scope or approach, a resolution is documented in `decisions.md` or a revision prompt is prepared
- [ ] If two agents edited the same area, versions are reconciled and ownership is clear

## Ready for Next Phase

- [ ] All required deliverables for this phase are present and meet the workflow definition
- [ ] Next agent(s) have clear input paths (handoff + doc paths)
- [ ] Blockers or open questions are captured in progress.md so they are not lost

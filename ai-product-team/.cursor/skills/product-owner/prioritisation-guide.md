# Prioritisation Guide — Product Owner

Use when ordering the backlog or deciding what to include in a release or sprint. Ensures value, risk, and dependency are explicit.

## Principles

- **Value first**: Prioritise by user and business value. State the value in one sentence per item.
- **Risk and dependency**: Higher risk or blocking dependencies should be ordered earlier so they are de-risked or unblocked sooner.
- **Reversibility**: Prefer reversible decisions (e.g. feature flags, phased rollout) so the team can learn and adjust.
- **Say no**: Explicitly document "out of scope" and "not now" so design and engineering do not assume inclusion.

## Frameworks (choose one per initiative and document it)

- **RICE**: Reach, Impact, Confidence, Effort. Score and rank. Good for comparing unrelated items.
- **MoSCoW**: Must / Should / Could / Won't. Good for release or sprint scope when capacity is fixed.
- **Value vs Effort**: 2×2 matrix (high/low value, high/low effort). Tackle high-value, low-effort first; deprioritise low-value, high-effort.
- **Opportunity scoring**: User need strength vs satisfaction. Prioritise high need + low satisfaction.

## Backlog Rationale

- Every prioritised list must include a short rationale: why this order? Reference the framework and 1–2 key drivers (e.g. "RICE; highest impact and we have high confidence" or "Must-have for launch; unblocks Design and Backend").
- When the orchestrator or Project Manager asks for scope, provide the slice with rationale so they can plan timeline and risks.

## Guardrails

- Do not prioritise by "who asked" alone; tie to user value or product goal.
- Do not leave acceptance criteria vague; QA and Engineering need testable criteria.
- Do not add items to the backlog without a brief and at least provisional priority; otherwise the backlog becomes a dump.

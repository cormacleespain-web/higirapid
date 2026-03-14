# Product Owner — Output Templates

Use these structures for deliverables under `docs/product/`.

## Product Vision

```markdown
---
title: Product Vision — [Product or Initiative]
author-agent: product-owner
date: YYYY-MM-DD
status: draft
---

# Product Vision: [Name]

## Vision Statement
[One to three sentences: what we're building and for whom.]

## Target Users
- [User segment 1]: [Need or job-to-be-done]
- [User segment 2]: [Need or job-to-be-done]

## Outcomes
- [Outcome 1 — measurable where possible]
- [Outcome 2]

## Non-Goals (out of scope)
- [What we are explicitly not doing]
```

## PRD (Product Requirements Document)

```markdown
---
title: PRD — [Feature or Epic Name]
author-agent: product-owner
date: YYYY-MM-DD
status: draft
---

# PRD: [Feature Name]

## Problem
[What problem this solves and for whom.]

## User Needs
- [Need 1]
- [Need 2]

## Scope

### In scope
- [Item]
- [Item]

### Out of scope
- [Item]

## Success Criteria
- [Measurable or observable criterion 1]
- [Criterion 2]

## Acceptance Criteria
- [ ] [Testable criterion 1]
- [ ] [Testable criterion 2]

## Dependencies
- [System, team, or other feature dependency]

## Open Questions
- [Question for design, engineering, or stakeholders]
```

## Feature Definition (short form)

```markdown
---
title: Feature — [Name]
author-agent: product-owner
date: YYYY-MM-DD
status: draft
---

# Feature: [Name]

**Summary**: [One sentence.]

**User value**: [Why this matters to the user.]

**Acceptance criteria**
- [ ] [Criterion]
- [ ] [Criterion]

**Dependencies**: [Link to PRD or other feature.]
```

## Prioritised Backlog

```markdown
---
title: Product Backlog
author-agent: product-owner
date: YYYY-MM-DD
status: draft
---

# Prioritised Backlog

| ID | Title | Brief | Priority | Status |
|----|--------|------|----------|--------|
| P-001 | [Title] | [One-line summary] | High | Not started |
| P-002 | [Title] | [One-line summary] | Medium | In progress |

**Priority rationale**: [Short note on how value/risk/dependency drove order.]
```

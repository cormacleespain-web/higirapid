# Project Manager — Output Templates

Use these structures for deliverables under `docs/roadmap/`.

## Roadmap

```markdown
---
title: Product Roadmap
author-agent: project-manager
date: YYYY-MM-DD
status: draft
---

# Product Roadmap

## Horizon
- **Next 30 days**: [theme or focus]
- **30–90 days**: [theme or focus]
- **90+ days**: [theme or focus]

## Milestones
| Milestone | Target | Outcomes | Dependencies |
|-----------|--------|----------|---------------|
| [Name]    | [Date] | [What ships] | [Blockers or prerequisites] |

## Risks & Assumptions
- [Risk or assumption with mitigation or owner]
```

## Sprint Plan

```markdown
---
title: Sprint [N] — [Goal]
author-agent: project-manager
date: YYYY-MM-DD
status: draft
---

# Sprint [N]: [One-line goal]

**Dates**: [Start] – [End]

## Goal
[One or two sentences: what we commit to achieve.]

## Backlog (prioritised)
1. [Item] — [Owner role if known]
2. [Item]
3. [Item]

## Capacity / Constraints
- [Note on capacity, leave, or constraints]

## Success Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Risks / Blockers
- [Any at-risk or blocked item]
```

## Milestone Plan

```markdown
---
title: Milestone — [Name]
author-agent: project-manager
date: YYYY-MM-DD
status: draft
---

# Milestone: [Name]

**Target date**: [Date]

## Definition of Done
- [ ] [Deliverable or condition]
- [ ] [Deliverable or condition]

## Deliverables
| Deliverable | Owner (role) | Status |
|-------------|--------------|--------|
| [e.g. PRD for Feature X] | product-owner | draft |

## Dependencies
- [Upstream dependency or prerequisite]
```

## Delivery Tracking (status summary)

```markdown
---
title: Delivery Status
author-agent: project-manager
date: YYYY-MM-DD
status: draft
---

# Delivery Status

**As of**: [Date]

## Summary
[One paragraph: overall status — on track / at risk / blocked — and key dates.]

## Current Sprint / Milestone
- **Sprint/Milestone**: [Name]
- **Status**: [On track | At risk | Blocked]
- **Next key date**: [Date and event]

## Key Dates
| Date | Event |
|------|--------|
| [Date] | [Release, milestone, or checkpoint] |

## Blockers / Risks
- [Blocker or risk with owner or mitigation]
```

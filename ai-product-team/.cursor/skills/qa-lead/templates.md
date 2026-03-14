# QA Lead — Output Templates

Use these structures for deliverables under `docs/qa/`.

## Test Strategy

```markdown
---
title: Test Strategy — [Product or Release]
author-agent: qa-lead
date: YYYY-MM-DD
status: draft
---

# Test Strategy

## Scope
[What is in scope for QA: features, flows, platforms.]

## Test Types
| Type | Purpose | Owner | Tool/Approach |
|------|---------|--------|----------------|
| Unit | [Purpose] | Engineering | [Tool] |
| Integration | [Purpose] | [Role] | [Tool] |
| E2E | [Purpose] | QA / Engineering | [Tool] |
| Accessibility | [Purpose] | QA / A11y Lead | [Tool] |
| Performance | [Purpose] | [Role] | [Tool] |

## Prioritisation
- [How we prioritise test cases: risk, coverage, critical path]

## Sign-off Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]

## Risks & Assumptions
- [Risk or assumption]
```

## Validation Checklist

```markdown
---
title: Validation Checklist — [Phase or Deliverable]
author-agent: qa-lead
date: YYYY-MM-DD
status: draft
---

# Validation Checklist: [Name]

## Purpose
[What this checklist validates.]

## Checks
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

## Pass Criteria
[What "done" means for this checklist.]

## Notes
[Any dependencies or references to other docs.]
```

## QA Report

```markdown
---
title: QA Report — [Feature or Release]
author-agent: qa-lead
date: YYYY-MM-DD
status: draft
---

# QA Report: [Scope]

**Date**: [Date]
**Scope**: [What was tested]

## Summary
- **Status**: Pass / Fail / Conditional
- **Issues found**: [Count by severity]
- **Recommendation**: [Ship / Do not ship / Ship with known issues]

## Findings
| ID | Description | Severity | Location | Owner |
|----|-------------|----------|----------|--------|
| Q01 | [Finding] | Critical / Major / Minor | [Where] | [Role] |

## Coverage
[What was tested; what was not.]

## Open Items
- [Item and owner]
```

## Release Readiness Review

```markdown
---
title: Release Readiness — [Release]
author-agent: qa-lead
date: YYYY-MM-DD
status: draft
---

# Release Readiness Review

**Release**: [Name or version]
**Date**: [Date]

## Criteria
| Criterion | Status | Notes |
|-----------|--------|--------|
| [e.g. All Critical bugs resolved] | Met / Not met | [Note] |
| [e.g. A11y sign-off] | Met / Not met | [Note] |

## Verdict
**Go / No-go / Conditional**: [Verdict]

**Rationale**: [Short explanation.]

## Risks
- [Risk and mitigation]

## Sign-off
- QA Lead: [Ready / Not ready]
- [Other roles if applicable]
```

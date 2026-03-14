# Accessibility Lead — Output Templates

Use these structures for deliverables under `docs/design/accessibility/`.

## Accessibility Standards

```markdown
---
title: Accessibility Standards
author-agent: accessibility-lead
date: YYYY-MM-DD
status: draft
---

# Accessibility Standards

## Target
- **WCAG level**: 2.1 Level AA (or AAA where specified)
- **Scope**: [Product, platform, or feature set]

## Principles
- [Principle 1]
- [Principle 2]

## Requirements by Area
### Perceivable
- [Requirement with reference to WCAG criterion where applicable]

### Operable
- [Requirement]

### Understandable
- [Requirement]

### Robust
- [Requirement]

## Testing Baseline
- [Tools, browsers, AT combinations]
- [Manual test checklist reference]
```

## Accessibility Audit Report

```markdown
---
title: Accessibility Audit — [Scope]
author-agent: accessibility-lead
date: YYYY-MM-DD
status: draft
---

# Accessibility Audit: [Scope]

**Date**: [Date]
**Scope**: [Pages, flows, or components]

## Summary
- **Issues found**: [Count by severity]
- **Compliance**: [Pass / Partial / Fail] against [WCAG level]

## Findings
| ID | Location | Issue | WCAG | Severity | Remediation |
|----|----------|--------|------|----------|-------------|
| A01 | [Component/URL] | [Description] | [Criterion] | Critical / Major / Minor | [Action] |

## Recommendations
- [Priority 1]
- [Priority 2]
```

## Compliance Documentation

```markdown
---
title: Accessibility Compliance — [Release or Product]
author-agent: accessibility-lead
date: YYYY-MM-DD
status: draft
---

# Accessibility Compliance

**Scope**: [Product or release]
**Standard**: WCAG 2.1 Level AA

## Conformance Statement
[Short statement: we conform / partially conform / do not yet conform, and scope.]

## Known Issues
| Issue | Severity | Plan |
|-------|----------|------|
| [Issue] | [Level] | [Remediation or timeline] |

## Exceptions
- [Any justified exception with rationale]
```

## Accessibility Testing Plan

```markdown
---
title: Accessibility Testing Plan — [Scope]
author-agent: accessibility-lead
date: YYYY-MM-DD
status: draft
---

# Accessibility Testing Plan

## Scope
[What is in scope for a11y testing.]

## Test Types
- **Automated**: [Tool(s), scope, frequency]
- **Manual keyboard**: [Checklist or reference]
- **Screen reader**: [AT and browser combinations]
- **Zoom / resize**: [Requirements]

## Test Matrix
| Area | Automated | Keyboard | SR | Zoom |
|------|-----------|----------|-----|------|
| [Area] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No] |

## Sign-off Criteria
- [ ] All Critical/Major issues resolved or accepted with timeline
- [ ] Manual checks completed for [scope]
```

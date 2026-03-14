# Front End Artist — Output Templates

Use these structures for deliverables under `docs/engineering/frontend/motion/` and related design docs.

## Motion Design Specification

```markdown
---
title: Motion Spec — [Feature or Component]
author-agent: frontend-artist
date: YYYY-MM-DD
status: draft
---

# Motion Spec: [Name]

## Overview
[What this motion is for and where it appears.]

## Trigger
- **When**: [User action, state change, or scroll]
- **Element(s)**: [Selector or component name]

## Animation
| Property | From | To | Duration | Easing | Delay |
|----------|------|-----|----------|--------|--------|
| opacity | 0 | 1 | 200ms | ease-out | 0 |
| transform (y) | 8px | 0 | 300ms | ease-out | 0 |

## Reduced Motion
- **When** `prefers-reduced-motion: reduce`: [Instant transition / opacity only / no animation — be specific]

## Implementation Notes
- [Library or CSS approach; any constraints]
```

## Animation Guidelines

```markdown
---
title: Animation Guidelines
author-agent: frontend-artist
date: YYYY-MM-DD
status: draft
---

# Animation Guidelines

## Principles
- [e.g. Purposeful: every motion supports understanding or feedback]
- [e.g. Quick: avoid blocking the user]

## Timing
- **Micro-interactions**: [e.g. 100–200ms]
- **Transitions**: [e.g. 200–400ms]
- **Page/route**: [e.g. 300–500ms]

## Easing
- **Default**: [e.g. ease-out for enter, ease-in for exit]
- **Interactive**: [e.g. ease-in-out or spring]

## Reduced Motion
- Always respect `prefers-reduced-motion: reduce`
- [What to do: instant, opacity-only, or disable]

## Performance
- Prefer `transform` and `opacity`
- [Any other constraints]
```

## Interaction Polish Recommendations

```markdown
---
title: Polish Recommendations — [Scope]
author-agent: frontend-artist
date: YYYY-MM-DD
status: draft
---

# Polish Recommendations

## [Component or Area 1]
- **Current**: [Brief description]
- **Recommendation**: [Concrete change]
- **Rationale**: [Why]

## [Component or Area 2]
[Same structure.]

## Priority
- [High / Medium / Low with brief reason]
```

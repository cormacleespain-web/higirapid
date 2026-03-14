# Front End Engineer — Output Templates

Use these structures for deliverables under `docs/engineering/frontend/` and `docs/engineering/decisions/`.

## Frontend Architecture

```markdown
---
title: Frontend Architecture
author-agent: frontend-engineer
date: YYYY-MM-DD
status: draft
---

# Frontend Architecture

## Overview
[Tech stack, high-level structure, and key principles.]

## Application Structure
- [Folder/module layout]
- [Entry points, routing, and lazy loading]

## State Management
- [Global vs local state; libraries and patterns]
- [Data flow and side effects]

## Component Model
- [How components are composed; design system integration]
- [State and props conventions]

## Performance
- [Bundle strategy, code splitting, caching]
- [Runtime performance considerations]

## Accessibility
- [How a11y is implemented: focus, ARIA, keyboard, testing]
```

## UI Implementation Guidelines

```markdown
---
title: UI Implementation Guidelines
author-agent: frontend-engineer
date: YYYY-MM-DD
status: draft
---

# UI Implementation Guidelines

## Design System Usage
- [How to consume tokens and components]
- [Do not inline styles that override tokens]

## Component Implementation
- [Pattern for new components: file structure, props, state]
- [Testing expectations]

## Accessibility
- [Required attributes and patterns]
- [Testing with keyboard and AT]

## Performance
- [Lazy loading, memoisation, or other rules]
```

## Architecture Decision Record (ADR)

```markdown
---
title: ADR — [Decision Title]
author-agent: frontend-engineer
date: YYYY-MM-DD
status: draft
---

# ADR: [Title]

## Status
[Proposed | Accepted | Deprecated]

## Context
[What situation or problem led to this decision.]

## Decision
[What we decided to do.]

## Consequences
- **Positive**: [Benefit]
- **Negative**: [Trade-off or cost]
- **Neutral**: [Other effects]
```

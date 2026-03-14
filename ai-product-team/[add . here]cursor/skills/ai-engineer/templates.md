# AI Engineer — Output Templates

Use these structures for deliverables under `docs/ai/` and `docs/ai/integrations/`.

## AI Architecture

```markdown
---
title: AI Architecture
author-agent: ai-engineer
date: YYYY-MM-DD
status: draft
---

# AI Architecture

## Overview
[How AI is used in the product; high-level components.]

## Components
| Component | Purpose | Inputs | Outputs |
|-----------|---------|--------|---------|
| [e.g. Intent classifier] | [Purpose] | [Inputs] | [Outputs] |

## Model(s)
- **Primary**: [Model and use case]
- **Fallback**: [When and why]

## Data & Context
- [What data the AI receives; where it comes from]
- [Context window or state management]

## Integration Points
- [Frontend/backend calls; APIs or SDKs]
- [Auth and rate limiting]

## Safety & Reliability
- [Guardrails, validation, fallbacks]
- [Error handling and user-facing behaviour]
```

## Model Selection

```markdown
---
title: Model Selection — [Use Case]
author-agent: ai-engineer
date: YYYY-MM-DD
status: draft
---

# Model Selection: [Use Case]

## Requirements
- [Latency, cost, quality, safety]

## Options Considered
| Model | Pros | Cons | Verdict |
|-------|------|------|---------|
| [Model A] | [Pros] | [Cons] | [Selected / Rejected] |

## Decision
[Selected model and rationale.]

## Evaluation
- [How we measure quality or correctness]
- [Benchmarks or criteria]
```

## AI Integration Strategy

```markdown
---
title: AI Integration — [Feature or Service]
author-agent: ai-engineer
date: YYYY-MM-DD
status: draft
---

# AI Integration: [Name]

## Flow
1. [Step]
2. [Step]
3. [Step]

## API / Interface
- **Endpoint or SDK**: [Description]
- **Request**: [Shape]
- **Response**: [Shape]
- **Errors**: [Codes and handling]

## Context & State
- [What is passed per request]
- [Session or user context]

## Fallbacks
- [When AI fails or is unavailable: what the user sees and what the system does]
```

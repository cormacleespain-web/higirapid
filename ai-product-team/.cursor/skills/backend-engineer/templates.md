# Back End Engineer — Output Templates

Use these structures for deliverables under `docs/engineering/backend/`.

## Backend Architecture

```markdown
---
title: Backend Architecture
author-agent: backend-engineer
date: YYYY-MM-DD
status: draft
---

# Backend Architecture

## Overview
[High-level description of services and responsibilities.]

## Services
| Service | Purpose | Key interfaces |
|---------|---------|----------------|
| [Name] | [Purpose] | [API or events] |

## Data Flow
[How data moves between services, queues, or DBs.]

## Data Store
- [Primary store and purpose]
- [Caching or secondary stores]

## Security & Auth
- [Auth mechanism]
- [Secrets, encryption, or compliance notes]

## Deployment
- [Where and how services run; key constraints]
```

## API Specification (overview; detail can be OpenAPI)

```markdown
---
title: API — [Service or Product]
author-agent: backend-engineer
date: YYYY-MM-DD
status: draft
---

# API Specification

## Base
- **Base URL**: [URL or placeholder]
- **Auth**: [Bearer, API key, etc.]
- **Versioning**: [Strategy]

## Endpoints
| Method | Path | Description | Request | Response |
|--------|------|-------------|---------|----------|
| GET | /resource | [Description] | — | 200: [Shape] |
| POST | /resource | [Description] | [Body] | 201: [Shape] |

## Errors
| Code | Meaning |
|------|--------|
| 400 | [Description] |
| 401 | [Description] |
| 404 | [Description] |
| 5xx | [Description] |

## Examples
[Optional: request/response examples or link to OpenAPI.]
```

## Database Schema (summary)

```markdown
---
title: Schema — [Domain or Service]
author-agent: backend-engineer
date: YYYY-MM-DD
status: draft
---

# Database Schema

## Tables
| Table | Purpose |
|-------|---------|
| [name] | [Purpose] |

## [Table Name]
- **Columns**: [Column, type, constraints]
- **Relations**: [FK to other tables]
- **Indexes**: [Key indexes]

## Migrations
- [How migrations are managed; any naming or ordering convention]
```

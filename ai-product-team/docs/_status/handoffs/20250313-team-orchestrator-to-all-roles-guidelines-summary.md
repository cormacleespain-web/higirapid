---
title: Handoff — Team Orchestrator to All Roles (Guidelines Summary)
author-agent: team-orchestrator
date: 2025-03-13
status: approved
---

# Handoff: Team Orchestrator → All Roles (Guidelines Summary)

**Date**: 2025-03-13  
**Feature**: Role-specific guidelines, guardrails, and best-practice references

## Context

Coordinated with all team members so each role has the necessary .md files to perform their role best: guidelines, guardrails, and (where useful) online best-practice references. All new files live in each role’s skill directory under `.cursor/skills/<role>/` and are linked from that role’s SKILL.md.

## Deliverables

| Role | New files | Purpose |
|------|-----------|---------|
| team-orchestrator | quality-checklist.md, conflict-resolution-guide.md | Review agent outputs; resolve conflicts |
| project-manager | delivery-guidelines.md, best-practices-refs.md | Roadmap/sprint/milestone standards; Scrum, roadmapping refs |
| product-owner | prioritisation-guide.md, prd-guardrails.md | Backlog prioritisation; PRD quality and scope |
| design-lead | ux-principles.md, best-practices-refs.md | UX strategy principles; NN/g, IA, patterns refs |
| design-systems-lead | token-guardrails.md, component-standards.md | Token naming/scope; component spec standards |
| accessibility-lead | wcag-quick-ref.md, testing-guide.md | WCAG 2.1 quick ref; a11y testing methods |
| ux-tech-writer | voice-tone-guide.md, doc-standards.md | Voice/tone; doc structure and standards |
| frontend-engineer | architecture-guardrails.md, performance-guide.md | Design system/a11y alignment; performance refs |
| frontend-artist | motion-principles.md, reduced-motion-guide.md | Motion purpose and a11y; reduced-motion (required) |
| backend-engineer | api-design-guide.md, security-guardrails.md | API design; OWASP/security guardrails |
| ai-engineer | safety-guardrails.md, integration-patterns.md | AI safety/fallbacks; integration patterns |
| ai-design-lead | human-ai-principles.md, transparency-guide.md | Human-AI principles; transparency in product |
| qa-lead | test-strategy-guide.md, release-criteria.md | Test strategy scope; release go/no-go criteria |

## Key Decisions

- One or two focused docs per role (guidelines + guardrails or refs) to keep each role’s skill dir manageable and easy to use.
- External references linked where authoritative (e.g. WCAG, NN/g, OWASP, web.dev, Scrum Guide); in-repo rules and templates referenced by path.
- Every SKILL.md updated to link to the new docs under a "Guidelines & References" or "Guidelines & Guardrails" section so agents know to read them.

## Open Questions

- None. All roles have been given their guideline/guardrail docs.

## Suggested Next Steps

- When dispatching a role agent, the task prompt can remind them to read their skill’s guideline/guardrail docs if the task touches quality, standards, or best practices.
- For future roles or new responsibilities, add new .md files to the relevant skill dir and link from SKILL.md using the same pattern.

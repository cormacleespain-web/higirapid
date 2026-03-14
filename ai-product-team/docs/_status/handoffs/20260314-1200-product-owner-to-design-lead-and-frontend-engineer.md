---
title: Handoff — Product Owner to Design Lead and Frontend Engineer
author-agent: product-owner
date: 2026-03-14
---

# Handoff: PRD complete → Design & Architecture

## Context

Phase 1 of the HigiRapid website build is complete. The PRD defines the marketing website scope, user personas, CTA strategy, i18n (ES/CA/EN), and acceptance criteria. Design Lead and Frontend Engineer can proceed in parallel for Phase 2.

## Decisions

- Single landing page in scope for launch; individual service pages out of scope but architecture should not block adding them later.
- CTAs: primary (Get Quote / Contact) plus floating WhatsApp on mobile; form includes service-type dropdown.
- Placeholder copy: EN primary; ES and CA placeholders for full locale coverage.
- No CMS; content in i18n message files.

## Deliverables

- [docs/product/prds/higirapid-website.md](../product/prds/higirapid-website.md) — PRD with personas, scope, acceptance criteria, CTA strategy, i18n and content requirements.

## Open Questions

- WhatsApp number, Garet font availability, contact form destination, default locale (es vs ca), service imagery — see PRD Open Questions.

## Suggested Next Steps

- **Design Lead**: Produce UX strategy (mobile-first, scroll flow, CTA placement), IA and section hierarchy, interaction spec (language switch, contact form, WhatsApp, gallery), user journeys. Output to `docs/design/`.
- **Frontend Engineer**: Produce Next.js project architecture (folder structure, routing, i18n), component tree, performance strategy, ADR for next-intl. Output to `docs/engineering/frontend/`.

# Documentation Standards — UX & Technical Copywriter

Standards for developer docs, internal docs, and knowledge base so they are findable, clear, and maintainable.

## Structure

- **Title and purpose**: Every doc has a clear title and a short "what this is" and "who it’s for" at the top.
- **Headings**: Use ATX headers (# ## ###). Structure for scanning; avoid long walls of text.
- **Frontmatter**: All docs under `docs/` follow `.cursor/rules/documentation-standards.mdc` (title, author-agent, date, status).
- **Cross-references**: Use relative links within `docs/`. Keep links up to date when moving or renaming files.

## Developer Documentation

- **Setup and run**: Prerequisites, install, run. Enough for a new developer to get the app running.
- **Architecture**: High-level structure; link to ADRs and design system. Do not duplicate what lives in code or in other docs.
- **APIs and contracts**: When documenting APIs for developers, use the same structure as Backend Engineer (endpoints, request/response, errors). Link to source of truth in `docs/engineering/backend/` when it exists.
- **Contribution**: How to contribute (branching, PRs, where to ask). Keep it short.

## Internal / Knowledge Base

- **One topic per doc** where possible. Use a clear filename and title.
- **Last updated**: Rely on frontmatter `date`; no separate "last updated" line unless the tooling requires it.
- **Ownership**: `author-agent` indicates which role owns or last updated the doc. For handoffs and process docs, reference the workflow or coordination protocols.

## Guardrails

- Do not duplicate content that belongs in code (e.g. inline comments) or in another role’s doc (e.g. API spec stays with Backend). Link instead.
- Do not leave outdated screenshots or steps; update or remove. If something is deprecated, say so and point to the current approach.
- Align with UX copy guidelines for any user-facing strings that appear in docs (e.g. feature names, error messages in examples).

# Handoff: Admin Planner Codex skill

## Context

User requested a new generic Codex skill `admin-planner` to plan admin areas (auth, CMS-style editing, products/services, contact CTAs, scaling). Skill lives globally under `~/.codex/skills/admin-planner`, not inside the HigiRapid app tree.

## Decisions

- **Location**: `~/.codex/skills/admin-planner` for reuse across projects (per user choice).
- **Auth guidance**: Document both env-based single admin (hashed password, session) and database users/roles, with explicit migration path.
- **Security**: Prefer `ADMIN_PASSWORD_HASH` over plaintext; rate-limit login; never commit secrets.

## Deliverables

- `~/.codex/skills/admin-planner/SKILL.md` — workflow, auth decision, deliverables checklist, links to references.
- `~/.codex/skills/admin-planner/agents/openai.yaml` — UI metadata (`display_name`, `short_description`, `default_prompt` with `$admin-planner`).
- `~/.codex/skills/admin-planner/references/admin-ia.md` — admin navigation and screens.
- `~/.codex/skills/admin-planner/references/content-models.md` — entities, APIs, drafts.
- `~/.codex/skills/admin-planner/references/field-constraints.md` — copy and image defaults.
- `~/.codex/skills/admin-planner/references/scaling-patterns.md` — new pages and entity types.
- `docs/_status/decisions.md` — one-line decision log entry (2026-03-24).

## Open Questions

- None for the skill itself. **Product**: whether HigiRapid will implement admin using Mode A or B auth and which storage (DB + object store) — resolved when implementing the app.

## Suggested next steps

1. Ensure Codex/Cursor skill path includes `~/.codex/skills` so `admin-planner` is discoverable.
2. When implementing HigiRapid admin, invoke `$admin-planner` (or attach skill) and map outputs to Next.js (or current stack) routes and data layer.
3. Re-run `quick_validate.py` after future edits; use a venv with `pyyaml` if system Python blocks installs (PEP 668).

# Security Guardrails — Back End Engineer

Guardrails for backend security so APIs and data stay safe and compliant.

## Authentication & Authorization

- **Auth**: Document how clients authenticate (e.g. Bearer token, API key). Use standard mechanisms (OAuth2, JWT) where applicable. Do not invent custom auth without documenting and reviewing.
- **Authorization**: Every endpoint must enforce authorization (who can do what). Document permission model. Do not rely on "frontend only" checks; backend must enforce.
- **Secrets**: No secrets in code or in `docs/`. Use env or secret manager. Document where secrets are configured (e.g. "API keys in env VAR_X").

## Data & Input

- **Validation**: Validate and sanitise all inputs. Reject invalid input with 400/422 and clear error. Do not trust client data.
- **Injection**: Use parameterised queries and safe APIs to prevent SQL/NoSQL injection and command injection. Document ORM or data layer choices.
- **Sensitive data**: Do not log or return PII, tokens, or secrets. Mask in logs. Document what is considered sensitive.

## API Surface

- **HTTPS**: All APIs over HTTPS in non-local environments. Document in deployment/architecture.
- **Rate limiting**: Document rate limits and behaviour (e.g. 429 response). Protect against abuse.
- **CORS and headers**: Document CORS policy and security headers (e.g. CSP, HSTS) where relevant. Align with Frontend and infra.

## Guardrails

- Do not expose internal errors, stack traces, or system details to clients. Return stable error codes and messages.
- Do not store passwords in plain text; use approved hashing (e.g. bcrypt, Argon2). Document approach.
- Do not skip authorization checks on "internal" or "admin" endpoints; treat them as high value targets.

## References

- **OWASP API Security Top 10**: https://owasp.org/API-Security/ — Use for checklist and mitigation.
- **OWASP Cheat Sheet Series**: https://cheatsheetseries.owasp.org/ — Authentication, injection, etc.

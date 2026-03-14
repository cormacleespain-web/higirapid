# API Design Guide — Back End Engineer

Guidelines for API design so Frontend, AI Engineer, and QA can consume APIs consistently and safely.

## Principles

- **Consistency**: Same patterns for errors, pagination, and auth across endpoints. Document in `docs/engineering/backend/api/` and stick to them.
- **Stability**: Avoid breaking changes. Version the API if you must (e.g. path or header). Document deprecations and sunset dates.
- **Clarity**: Clear resource names, HTTP methods, and status codes. Request/response shapes documented (OpenAPI or equivalent). No undocumented fields.

## REST Conventions (if using REST)

- **Resources**: Nouns in URL path (e.g. `/users`, `/orders`). Use IDs for a single resource (e.g. `/users/:id`).
- **Methods**: GET (read), POST (create), PUT/PATCH (update), DELETE (delete). Use correctly; do not overload GET with side effects.
- **Status codes**: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 5xx Server Error. Use consistently; document in API spec.
- **Errors**: Consistent error body (e.g. `code`, `message`, optional `details`). Machine-readable where clients need to branch (e.g. validation errors per field).

## Guardrails

- Do not expose internal errors or stack traces to clients. Log internally; return a generic 500 message or a stable error code.
- Do not change response shape without versioning or a documented migration. Frontend and AI Engineer depend on contracts.
- Do not skip auth and rate limiting in the spec; document how clients authenticate and any limits.

## References

- **REST API Tutorial**: https://restfulapi.net/ — Conventions and best practices.
- **OpenAPI (Swagger)**: https://swagger.io/specification/ — Use for machine-readable API specs when possible.
- **Google API Design Guide**: https://cloud.google.com/apis/design — Broader API design patterns; use for consistency and versioning ideas.

# AI Integration Patterns — AI Engineer

Patterns for integrating AI into the product so Frontend, Backend, and AI Design Lead can align on behaviour and UX.

## Patterns

- **Synchronous request/response**: User action → call model → show result. Document latency expectations and loading/error states. Use for discrete tasks (e.g. classification, short generation).
- **Streaming**: Stream tokens or chunks for long output (e.g. chat, long text). Document how the UI consumes the stream and how to cancel. Align with AI Design Lead on progressive disclosure and errors mid-stream.
- **Background / async**: Trigger AI job; notify or poll for result. Document how the user is informed (e.g. notification, status page). Use for heavy or batch work.
- **Hybrid**: Combine patterns (e.g. sync for quick path, async fallback). Document when each path is used and how the UI differs.

## API Contract

- **Request**: Document input shape, limits (e.g. max tokens, payload size), and optional parameters (temperature, etc.). Align with Backend if AI is behind a backend API.
- **Response**: Document success shape (e.g. text, structured JSON) and error codes. Include confidence or scores when exposed to the product.
- **Errors**: Document error codes (e.g. rate limit, timeout, content filter) and recommended user-facing message. AI Design Lead uses this for error copy.

## Guardrails

- Document every AI touchpoint (where the product calls a model) in architecture or integration docs. No "hidden" AI.
- Align with AI Design Lead on loading, partial results, and error states before implementation. UX must be specified.
- When the product uses third-party model APIs, document provider, version, and data handling (what is sent, where it is processed, retention).

## References

- AI architecture and integration templates: [templates.md](templates.md)
- Safety and fallbacks: [safety-guardrails.md](safety-guardrails.md)

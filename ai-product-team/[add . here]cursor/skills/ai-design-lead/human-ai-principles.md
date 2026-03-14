# Human-AI Interaction Principles — AI Design Lead

Principles for AI product experience so users understand, control, and trust AI when it’s part of the product.

## Transparency

- **When AI is involved**: Users should know when they’re interacting with or being assisted by AI. Do not hide it. Use clear labels (e.g. "AI-suggested", "Generated summary"). Align with AI Engineer on what’s technically feasible to expose.
- **What AI did**: For consequential outcomes (e.g. recommendations, auto-actions), explain what the AI did in plain language. Avoid black boxes where the user is expected to act on the result.
- **Limitations**: Set expectations where the AI can be wrong or incomplete. Document in AI UX guidelines and in microcopy (e.g. "Review before sending").

## Control

- **Override and edit**: Users should be able to correct or override AI output when it affects them. Design flows for "edit" and "reject" and document in interaction models.
- **Opt-out**: Where appropriate, allow opt-out of AI features (e.g. use default or manual path). Document in product and AI UX docs.
- **Consent**: When AI uses personal or sensitive data, obtain clear consent and explain use. Align with product and legal; document in guidelines.

## Trust & Errors

- **Graceful failure**: When AI fails or is unavailable, the UX must degrade gracefully (fallback, retry, or clear message). Never leave the user stuck. Align with AI Engineer on fallbacks.
- **Error messages**: Errors should be user-friendly and actionable (e.g. "We couldn’t complete this. Try again or do it manually."). UX Tech Writer and AI Design Lead own copy; AI Engineer documents technical error codes.
- **Uncertainty**: If the system shows confidence or uncertainty, explain what it means. Avoid false precision (e.g. "99% sure" without explanation).

## Guardrails

- Do not design AI UX that assumes the AI is always right. Always include review, edit, or fallback in the flow.
- Do not use dark patterns (e.g. making opt-out hard, or hiding that a result is AI-generated). Document in guidelines as prohibited.
- Align with Accessibility Lead: AI-generated content and controls must be accessible (labels, focus, announcements).

## References

- **Google People + AI Guidebook**: https://pair.withgoogle.com/guidebook — Research-backed patterns for human-AI design.
- **Microsoft Responsible AI**: https://www.microsoft.com/en-us/ai/responsible-ai — Principles and practices.
- AI interaction and transparency templates: [templates.md](templates.md)

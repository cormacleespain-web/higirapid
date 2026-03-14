# AI Safety Guardrails — AI Engineer

Guardrails for AI architecture and integration so systems are safe, reliable, and transparent to the product and users.

## Reliability

- **Fallbacks**: Every AI-dependent path must have a defined fallback when the model is unavailable, times out, or returns low confidence. Document in architecture and integration docs. Users must never be stuck.
- **Timeouts and retries**: Document timeout and retry policy. Avoid unbounded waits. Surface loading and failure states to the UI (align with AI Design Lead).
- **Validation**: Validate model outputs before using them (e.g. schema check, sanity bounds). Do not trust raw model output for critical decisions without validation.

## Safety & Content

- **Input/output filtering**: Document any input sanitisation and output filtering (e.g. harmful content, PII). Align with product and legal requirements.
- **User data**: Do not send sensitive user data to external models without explicit consent and documented data handling. Document what is sent and retained.
- **Bias and fairness**: Document known limitations and bias considerations for the model(s) in use. Flag for product and AI Design Lead when UX or copy might need to set expectations.

## Transparency

- **When AI is used**: Document where and how AI is used so AI Design Lead can define UX (e.g. "AI-suggested", "Powered by …"). Do not hide AI involvement where it affects trust or consent.
- **Confidence and uncertainty**: If the system exposes confidence or uncertainty, document how it is computed and what it means. Align with AI Design Lead on how to show it in the UI.

## Guardrails

- Do not ship an AI feature without a defined fallback and error UX. Document in integration strategy.
- Do not expose raw model internals or prompt structure to clients unless required for transparency; document what is exposed and why.
- Do not skip validation of model outputs when they drive user-facing or business-critical decisions.

## References

- **Google AI Principles / Responsible AI**: https://ai.google/responsibility/responsible-ai-practices/
- **NIST AI RMF**: https://www.nist.gov/itl/ai-risk-management-framework — Risk-based approach to AI system governance.
- **Model cards**: Document model provenance, intended use, limitations. Use when selecting or changing models.

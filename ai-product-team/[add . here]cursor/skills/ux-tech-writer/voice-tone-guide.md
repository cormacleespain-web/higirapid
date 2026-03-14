# Voice & Tone Guide — UX & Technical Copywriter

Guidelines for product voice and tone so copy stays consistent across UI, errors, and documentation.

## Voice (who we sound like)

- **Define once**: Document the product voice in `docs/design/copy/guidelines.md` (e.g. "Professional but approachable; concise; we avoid jargon when a plain word works").
- **Consistency**: Same voice in microcopy, error messages, empty states, and docs. Avoid switching between formal and casual unless the product explicitly has modes (e.g. help vs marketing).
- **Inclusive**: Use inclusive language (they/them when gender unknown; avoid assumptions about ability, culture, or identity). Align with Accessibility Lead on a11y copy (e.g. link purpose, alt text).

## Tone (how we say it by context)

- **UI and success**: Brief, positive, clear. Confirm the outcome (e.g. "Saved" or "Changes saved").
- **Errors**: Empathetic and actionable. Say what went wrong and what the user can do next. Avoid blame ("Something went wrong" not "You entered invalid data" unless the fix is to correct input).
- **Empty states**: Explain why it’s empty and suggest an action. Avoid dead ends.
- **Documentation**: Clear and scannable. Use headings, lists, and short paragraphs. Assume the reader is in a hurry; put the answer first.
- **Internal/knowledge base**: Same clarity as external docs. Include "who this is for" and "when to use this."

## Guardrails

- Do not use humour or slang in error messages or critical UI unless the product voice explicitly allows it.
- Do not leave placeholder copy (e.g. "Lorem" or "Button text") in deliverables; use real or clearly marked draft copy.
- Do not contradict the design system or Accessibility Lead (e.g. link text must be meaningful out of context).

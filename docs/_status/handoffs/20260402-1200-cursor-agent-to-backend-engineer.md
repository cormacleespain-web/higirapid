# Handoff: Resend templates for lead emails

## Context

HR-Club and service booking enquiries both post to `POST /api/hr-club-leads`. Notifications now use Resend **published templates** instead of a plain-text body so marketing can own layout and branding in the Resend dashboard.

## Decisions

- **Template selection**: If both `serviceSlug` and `serviceTitle` are non-empty (service booking from `LeadInquiryForm`), use template id **`higirapid-enquiry-template`**. Otherwise use **`hr-club-enquiry`**.
- **Overrides**: Env `RESEND_TEMPLATE_SERVICE` and `RESEND_TEMPLATE_HR_CLUB` optionally replace those aliases (documented in `.env.example`).
- **API payload**: `from`, `subject`, and `reply_to` are still sent and override template defaults. Body uses only `template: { id, variables }` (no `html` / `text`).
- **Variable keys**: Match live Resend templates (`SUBMITTER_*`, `ENQUIRY_TYPE`, `SOURCE_URL`, `SUBMITTED_AT`); avoid Resend-reserved bare names (`EMAIL`, `FIRST_NAME`, `LAST_NAME`, `UNSUBSCRIBE_URL`).

## Deliverables

- [`src/app/api/hr-club-leads/route.ts`](../../src/app/api/hr-club-leads/route.ts) — `buildTemplateVariables`, template branching, logging includes `template=…`.
- [`.env.example`](../../../.env.example) — commented `RESEND_TEMPLATE_*` overrides.
- [`docs/_status/decisions.md`](../decisions.md) — decision row dated 2026-04-02.

## Template variable contract

Reference in Resend as `{{{KEY}}}` (triple braces per Resend). The API always sends all of these (strings; empty where N/A):

| Key | Meaning |
|-----|---------|
| `SUBMITTER_NAME` | Submitter name |
| `SUBMITTER_EMAIL` | Submitter email |
| `PHONE` | Phone or empty |
| `ENQUIRY_TYPE` | Inquiry type (`higirapid-enquiry-template`; empty or unused in HR-only flows is still sent) |
| `MESSAGE` | Message body |
| `LOCALE` | Locale code |
| `SOURCE_URL` | Absolute page URL when `NEXT_PUBLIC_BASE_URL` is set, else path |
| `SERVICE_SLUG` | Service slug or empty (HR Club) |
| `SERVICE_TITLE` | Service title or empty (HR Club) |
| `SUBMITTED_AT` | ISO 8601 timestamp at send time |

**Service template** (`higirapid-enquiry-template`): uses Name, Email, Phone, Type, Locale, Source, service slug/title, Message, Received. **HR template** (`hr-club-enquiry`): same subset without Type/service lines in the design; extra keys in the payload are ignored if not referenced.

## Open questions

- None for code. **Editors**: confirm both templates in Resend use the keys above (or rename variables in the dashboard to match).

## Suggested next steps

1. In Resend, publish **`hr-club-enquiry`** and **`higirapid-enquiry-template`** and wire `{{{…}}}` to the contract table.
2. Send a test from `/hr-club` and from a service booking flow; fix any 422 from Resend by aligning variable names.
3. Set `RESEND_TEMPLATE_*` in Vercel env only if aliases change.

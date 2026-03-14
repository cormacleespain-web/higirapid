---
title: ADR — next-intl Configuration for i18n
author-agent: frontend-engineer
date: 2026-03-14
status: accepted
---

# ADR: next-intl Configuration for HigiRapid Website

## Status

Accepted.

## Context

HigiRapid requires three locales (Spanish, Catalan, English) with full UI and content in each. Next.js App Router needs a routing and message strategy that supports SSG, SEO (hreflang, lang attribute), and a simple language switcher. We need a library that works with the `[locale]` dynamic segment and does not require a separate i18n server.

## Decision

- Use **next-intl** with the App Router and the `[locale]` dynamic segment.
- **Routing**: All locale-specific routes live under `app/[locale]/`. Root path `/` redirects to default locale (e.g. `/es/`). No path without locale prefix for the main site.
- **Locales**: `['es', 'ca', 'en']`. Default locale: `es` (configurable).
- **Messages**: JSON files per locale in `src/i18n/messages/` (e.g. `es.json`, `ca.json`, `en.json`). Loaded in `i18n/request.ts` via `getRequestConfig` and passed to `NextIntlClientProvider` in layout.
- **URLs**: Always prefixed (e.g. `/es/`, `/ca/`, `/en/`) for consistency and simpler hreflang. No `localePrefix: 'as-needed'` for default locale so that all three have explicit paths.
- **SEO**: `generateMetadata` in `[locale]/layout.tsx` or page uses current locale to set `title`, `description`, and alternate `hreflang` links. next-intl’s `getTranslations` or a shared metadata helper used for meta content from message files.

## Consequences

- **Positive**: Single, well-supported pattern for Next.js 15 App Router; SSG compatible; messages colocated and easy to edit; SEO-friendly URLs and meta.
- **Negative**: Every page is under `[locale]`; root redirect must be explicit (middleware or config). No “locale-less” URL for default.
- **Neutral**: Language switcher must link to `/ca/`, `/en/`, etc., and optionally set a cookie for next-intl locale persistence; implementation is standard.

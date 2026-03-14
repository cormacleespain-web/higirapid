---
title: Frontend Architecture — HigiRapid Website
author-agent: frontend-engineer
date: 2026-03-14
status: draft
---

# Frontend Architecture: HigiRapid Website

## Overview

- **Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next-intl for i18n. Static generation (SSG) for all pages. No backend beyond contact form (API route or Formspree).
- **Principles**: Mobile-first CSS; design tokens from Design System; components from Design Systems Lead specs; accessibility (WCAG 2.1 AA) and performance (LCP, CLS, INP) as requirements.

## Application Structure

```
src/
  app/
    [locale]/
      layout.tsx          # Locale layout: lang, font, providers
      page.tsx            # Single landing page (all sections)
    api/
      contact/
        route.ts          # POST handler for contact form (or use Formspree)
    not-found.tsx         # 404 (optional)
  components/
    layout/
      Header.tsx
      Footer.tsx
      FloatingCta.tsx
    sections/
      Hero.tsx
      Services.tsx
      Process.tsx
      Gallery.tsx
      Testimonials.tsx
      ServiceAreas.tsx
      FAQ.tsx
      Contact.tsx
    ui/                   # Design system primitives
      Button.tsx
      Card.tsx
      SectionHeader.tsx
      ...
  i18n/
    config.ts             # Locales, defaultLocale, pathnames
    request.ts            # getRequestConfig for next-intl
  lib/
    fonts.ts              # Garet or fallback font loading
  styles/
    globals.css           # Tailwind base + tokens
public/
  images/                 # Service photos, placeholders
  logos/                  # SVGs from BrandPackage
```

- **Entry**: `app/[locale]/layout.tsx` wraps children with `NextIntlClientProvider` and shared layout (Header, main, Footer). `app/[locale]/page.tsx` renders all sections in order.
- **Routing**: Only `[locale]` dynamic segment. Root `/` redirects to default locale (middleware or redirect in next.config). No `[locale]/services/[slug]` at launch.
- **Lazy loading**: Sections can be lazy-loaded (e.g. `next/dynamic` for Gallery, Testimonials) to reduce initial JS if needed; measure first.

## State Management

- **Server**: No global store. Page is server-rendered/SSG; locale comes from segment.
- **Client**: Minimal. Contact form: local state (fields, submitting, success/error). FAQ accordion: which item(s) open. Gallery: current index. Language preference can be persisted in cookie (next-intl default) or path-only.
- **No Redux/Zustand**: Not required for this scope.

## Component Model

- **Composition**: Page composes sections; sections use UI primitives (Button, Card, SectionHeader) and layout (Header, Footer). FloatingCta rendered in layout or page.
- **Design system**: Tokens (colours, spacing, typography) in Tailwind config; components consume via Tailwind classes. No inline hex for brand colours; use token names.
- **Props**: Sections receive no required props for MVP; they read copy from `useTranslations()` (next-intl). Optional props for images or list data if we pass from page.
- **Client vs server**: Header (language switcher, nav), Footer, FloatingCta, Contact form, FAQ accordion, Gallery are client components. Static sections can be server components and pass children to client where needed.

## Performance

- **SSG**: All `[locale]` pages statically generated at build. No `getServerSideProps` or dynamic fetch.
- **Images**: `next/image` for all images; placeholders and sizes to avoid CLS. Logo SVGs inline or as `<img>` with width/height.
- **Fonts**: Garet (or fallback) via `next/font/local` or Google Fonts; preload; `display: swap` to avoid FOIT.
- **JS**: Minimise client bundle; use dynamic import for heavy components (e.g. gallery slider) if needed. No large third-party libs beyond next-intl and Tailwind.
- **Targets**: LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms (measured on representative device).

## Accessibility

- **Semantic HTML**: Sections in `<section>` with headings; form with `<label>`, `<fieldset>` if needed.
- **Focus**: Visible focus ring on all interactive elements (Tailwind focus variant). No focus trap except optionally in gallery; skip link to main content in header.
- **ARIA**: Per Design Systems and Accessibility Lead specs (accordion, gallery, form errors, live regions).
- **Language**: `lang` on `<html>` set per locale; `hreflang` in head.

## i18n (next-intl)

- **Config**: Locales `['es', 'ca', 'en']`; default `'es'` (or per PRD). Messages in `messages/es.json`, `messages/ca.json`, `messages/en.json`. Routing: `[locale]` segment; no locale prefix in default locale if desired, or always prefix (e.g. `/es/`, `/ca/`, `/en/`).
- **Usage**: `useTranslations('namespace')` in components; `getTranslations` in server components. Namespaces optional (e.g. `common`, `home`, `contact`) or flat.
- **SEO**: `generateMetadata` in layout or page with locale; hreflang links in head (next-intl can provide or add manually).

See ADR: next-intl configuration.

## Data Flow

- **Copy**: All user-facing text from JSON message files; no hardcoded strings in components.
- **Form**: Contact form POST to `app/api/contact/route.ts` or Formspree. Env var for endpoint or API key. Response: success or error; front-end shows message.
- **No CMS**: Content changes require code/i18n file update.

## Out of Scope (Architecture)

- Auth or user accounts.
- Service detail pages (add later with same layout).
- Backend database or API beyond contact form.
- Analytics or tracking (can be added via script or Vercel Analytics).

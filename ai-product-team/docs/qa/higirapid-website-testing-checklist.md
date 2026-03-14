---
title: HigiRapid Website — QA Testing Checklist
author-agent: qa-lead
date: 2026-03-14
status: draft
---

# HigiRapid Website — Testing Checklist

## Scope

Single-page marketing site: `/[locale]/` for locales es, ca, en. Contact form POST to `/api/contact`. Mobile-first; WCAG 2.1 AA target.

## Cross-browser and viewport

| Environment | Pass |
|-------------|------|
| Chrome (latest) desktop | |
| Safari (latest) desktop | |
| Firefox (latest) desktop | |
| Edge (latest) desktop | |
| Safari iOS (latest) | |
| Chrome Android (latest) | |
| Samsung Internet (optional) | |

Viewports: 320px, 375px, 768px, 1024px, 1280px. No horizontal scroll at 320px.

## i18n

| Check | Pass |
|-------|------|
| All three locales load: /es/, /ca/, /en/ | |
| Root / redirects to default locale | |
| Language switcher changes locale and URL | |
| No missing translation keys (no raw keys in UI) | |
| html lang attribute matches current locale (after load) | |
| Form labels, buttons, FAQ, sections in correct language | |

## Responsive and layout

| Check | Pass |
|-------|------|
| Header: logo, nav, language switcher, CTA visible | |
| Mobile: hamburger opens/closes; links scroll and close menu | |
| Hero: headline and both CTAs visible above fold on mobile | |
| Sections: Services, Process, Gallery, Testimonials, Areas, FAQ, Contact all render | |
| Footer: links and language switcher | |
| Floating CTA: visible bottom-right on mobile; does not cover main CTA | |
| All sections have scroll-mt for anchor scroll offset | |

## CTAs and contact

| Check | Pass |
|-------|------|
| "Get quote" / "Pedir presupuesto" etc. scrolls to #contact or links to #contact | |
| WhatsApp button (hero and floating) opens wa.me with correct number | |
| Contact form: name and email required; submit sends POST to /api/contact | |
| Form success: message shown; form reset or success state | |
| Form error: message shown on network/server error | |

## Accessibility

| Check | Pass |
|-------|------|
| Skip link visible on focus; moves focus to main | |
| All interactive elements focusable; visible focus ring | |
| Heading order: one h1 (in Hero), then h2 per section | |
| Form labels associated; errors have aria-describedby or role=alert | |
| FAQ: button has aria-expanded and aria-controls | |
| Gallery: prev/next buttons have aria-label; current item announced | |
| Colour contrast: text meets 4.5:1 (or 3:1 for large) | |
| Zoom 200%: no horizontal scroll; content reflows | |

## SEO

| Check | Pass |
|-------|------|
| Meta title and description per locale (es, ca, en) | |
| hreflang links in head for alternates | |
| LocalBusiness JSON-LD (optional; add if required) | |

## Performance (Core Web Vitals)

| Check | Target | Pass |
|-------|--------|------|
| LCP | < 2.5s | |
| CLS | < 0.1 | |
| INP / FID | < 200ms | |

Run Lighthouse (mobile and desktop) and fix Critical/Serious issues.

## Sign-off

- [ ] All Critical and Major items resolved or documented as known issues.
- [ ] Tested on at least one mobile and one desktop browser.
- [ ] i18n completeness verified for es, ca, en.

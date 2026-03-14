---
title: HigiRapid Website — Copy and SEO Notes
author-agent: ux-tech-writer
date: 2026-03-14
status: draft
---

# HigiRapid Website — Copy and SEO

## Summary

Placeholder copy is provided in three languages (EN, ES, CA) in `src/i18n/messages/`. All UI strings, section content, form labels, and FAQ answers are keyed and translatable. Meta titles and descriptions are set per locale in `src/app/[locale]/layout.tsx` via `generateMetadata`.

## Brand voice

- **Tone**: Professional, reliable, approachable. No hype; clear benefits and next steps.
- **Audience**: Local (El Masnou, Barcelona, Maresme); residents and businesses; Spanish, Catalan, and English speakers.
- **CTAs**: Direct and action-oriented: "Get a quote", "Contact via WhatsApp", "Send".

## Microcopy coverage

- **Header (nav + CTA)**: See [header-microcopy.md](header-microcopy.md) for recommended nav/CTA copy per locale, optional short variants, responsive guidance, and translated aria-labels (main nav, open/close menu, mobile menu).
- **Navigation**: Services, Process, Gallery, Testimonials, FAQ, Contact (all three languages).
- **Hero**: Headline, subhead, primary and secondary CTA.
- **Services**: Title, subtitle, and per-service title + short description.
- **Process**: Title, subtitle, three steps (title + description).
- **Gallery**: Title, subtitle, prev/next, item counter.
- **Testimonials**: Title, subtitle, three testimonials (quote, author, location).
- **Service areas**: Title, subtitle, list of areas.
- **FAQ**: Title, four Q&A pairs.
- **Contact**: Title, subtitle, form labels (name, email, service, message), submit/sending/success/error, WhatsApp CTA, "or".
- **Footer**: Links, Contact, copyright (with year).
- **Common**: Skip to main content.

## SEO

- **Titles**: Unique per locale (es, ca, en) in `generateMetadata`.
- **Descriptions**: Unique per locale; include "El Masnou", "Barcelona", and key services.
- **Alternates**: `alternates.languages` set for es, ca, en so hreflang is output.
- **LocalBusiness**: Not yet added; can be added as JSON-LD in layout or page for local SEO.

## Open points

- Replace placeholder testimonials with real client quotes and names (with permission).
- Add real before/after images and optional captions when client supplies them.
- Confirm WhatsApp number and pre-filled message; set `NEXT_PUBLIC_WHATSAPP_NUMBER` in env.
- Optional: translate service dropdown options in the contact form (currently static).

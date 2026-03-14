---
title: Information Architecture — HigiRapid Website
author-agent: design-lead
date: 2026-03-14
status: draft
---

# Information Architecture: HigiRapid Website

## Overview

Single-page marketing site with one primary route: `/[locale]/`. Content is structured as vertical sections on one scrollable page. Navigation is in-page (anchor links) plus header (logo, nav links to sections, language switcher) and footer (links, contact, language). No separate service sub-pages at launch.

## Structure (Section Order)

1. **Header** (global)
   - Logo (links to top or home)
   - Nav: links to sections (Services, Process, Gallery, Testimonials, FAQ, Contact) — can be collapse-to-hamburger on mobile
   - Language switcher (ES | CA | EN)

2. **Hero**
   - Headline + supporting line
   - Primary CTA: Get Quote / Request Quote
   - Secondary CTA: Contact via WhatsApp

3. **Services**
   - Section heading
   - Cards or list: Upholstery, Carpet, Rug, Car Interior, In-house Hygiene (short description each)
   - Optional CTA after block

4. **Process (How it works)**
   - Section heading
   - 3–5 steps (e.g. Book → We come → Clean → Enjoy)
   - Short copy per step

5. **Before/After (Gallery)**
   - Section heading
   - Visual comparison or carousel (placeholder images OK)
   - Optional caption per item

6. **Testimonials / Trust**
   - Section heading
   - 2–4 testimonial cards (quote, name, optional role/location)
   - Optional trust badges (e.g. “X+ happy customers”, eco-friendly)

7. **Service areas**
   - Section heading
   - List or short copy: El Masnou, Barcelona, and surrounding areas (e.g. list of towns)

8. **FAQ**
   - Section heading
   - Accordion or list of Q&A (common questions in all three languages)

9. **Contact**
   - Section heading
   - Contact form (name, email, service type, message)
   - WhatsApp CTA button
   - Optional phone number
   - Success/error state for form

10. **Footer**
    - Links (e.g. Services, FAQ, Contact; can repeat nav)
    - Language switcher
    - Optional social links
    - Legal (Privacy, Cookies) if required
    - Copyright / HigiRapid

## Navigation

- **Primary**: In-page anchor links in header (and optionally footer) to Services, Process, Gallery, Testimonials, FAQ, Contact. On mobile: hamburger menu that reveals same links.
- **Secondary**: Footer repeat of key links; language switcher in header and footer.
- **Contextual**: Buttons and links within sections (e.g. “Get Quote” scrolls to Contact or opens form).

## Key Screens

| Screen | Purpose | Key content |
|--------|---------|-------------|
| Landing (all viewports) | Inform and convert | All 10 sections in order; header and footer consistent. |
| Mobile landing | Same content; sticky CTA; collapsed nav | Floating WhatsApp or “Contact”; hamburger for nav. |

## URL Model

- `/[locale]/` — only page at launch (e.g. `/es/`, `/ca/`, `/en/`).
- Root `/` redirects to default locale (e.g. `/es/` or `/ca/`).
- Future: `/[locale]/services/[slug]` for service detail pages if added.

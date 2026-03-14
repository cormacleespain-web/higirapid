---
title: PRD — HigiRapid Website
author-agent: product-owner
date: 2026-03-14
status: draft
---

# PRD: HigiRapid Website

## Problem

HigiRapid (El Masnou, Barcelona) needs a professional web presence to attract local customers searching for upholstery, carpet, rug, car interior, and in-house hygiene cleaning. Without a site, they lack visibility, credibility, and a clear path for prospects to request quotes or contact via WhatsApp. The site must work in Spanish, Catalan, and English and feel trustworthy and conversion-focused on mobile first.

## User Needs

- **Local residents (B2C)**: Find a reliable cleaning service, understand what’s offered, see proof of quality (e.g. before/after, testimonials), and contact or get a quote quickly (including WhatsApp).
- **Car owners**: Discover car interior cleaning, see it’s professional and safe, and book or enquire with minimal friction.
- **Businesses / hotels (B2B)**: See that HigiRapid serves commercial clients, understand service areas and professionalism, and have a clear contact path.
- **All users**: Use the site in their preferred language (ES, CA, EN) and trust the brand (clean design, clear info, social proof).

## User Personas (Summary)

| Persona | Goal | Key need |
|--------|------|-----------|
| Homeowner (El Masnou / Barcelona) | Clean sofa/carpet/rug | Service clarity, price indication, easy quote/contact |
| Car owner | Interior deep clean | Car-specific service, trust, WhatsApp/contact |
| Business / hotel | Upholstery or hygiene | B2B credibility, areas served, contact |
| Multilingual resident | Use site in own language | ES / CA / EN without losing context |

## Scope

### In scope

- Single primary landing page (`/[locale]/`) with:
  - Hero with primary CTA (Get Quote / WhatsApp).
  - Services overview: Upholstery, Carpet, Rug, Car Interior, In-house Hygiene (with short descriptions and optional icons/imagery).
  - Process section: “How it works” (e.g. steps: book → clean → enjoy).
  - Before/After gallery (placeholder images acceptable initially).
  - Testimonials / trust signals (placeholder content acceptable).
  - Service areas: El Masnou, Barcelona, and surrounding areas (list or short copy).
  - FAQ (common questions in all three languages).
  - Contact section: form (name, email, service interest, message) plus WhatsApp CTA and phone.
  - Footer: key links, language switcher, optional social.
- Mobile-first, responsive layout; sticky/floating WhatsApp (or primary CTA) on mobile.
- Three locales: Spanish (`es`), Catalan (`ca`), English (`en`) with full page content and UI strings in all three (placeholder copy for EN primary, switchable placeholders for ES/CA).
- Brand alignment: colours (#0A5EBF, #ADD84F, #50D9B2), Garet (or approved alternative) typography, logo from BrandPackage.
- SEO: meta titles/descriptions per locale, LocalBusiness structured data, sitemap, hreflang.
- Performance: SSG where possible, fast LCP/CLS/INP targets (LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms).
- Accessibility: WCAG 2.1 AA (contrast, focus, keyboard, language declaration).

### Out of scope (for initial launch)

- CMS or client-editable content; content is developer-maintained (i18n message files).
- Individual service detail pages (e.g. `/[locale]/services/upholstery`) — can be added later.
- Blog or news.
- Online booking/payment.
- Backend beyond contact form submission (API route or third-party e.g. Formspree).

## Success Criteria

- Site is live and usable in ES, CA, EN with correct language switching and no broken strings.
- Mobile-first layout is readable and CTAs (Contact, Get Quote, WhatsApp) are prominent and clickable.
- Core Web Vitals (LCP, CLS, INP) meet targets on representative devices.
- Contact form and WhatsApp CTA are functional (form submits; WhatsApp opens with correct number when provided).
- Local SEO basics in place: unique meta per locale, LocalBusiness schema, hreflang, sitemap.

## Acceptance Criteria

- [ ] Landing page renders all sections (Hero, Services, Process, Before/After, Testimonials, Service areas, FAQ, Contact, Footer) in all three locales.
- [ ] Language switcher changes locale and persists selection (e.g. cookie or path); `lang` attribute and hreflang are correct.
- [ ] Primary CTA and floating CTA (e.g. WhatsApp) are above the fold or sticky on mobile and link to correct destination.
- [ ] Contact form collects name, email, service interest, message and submits (API route or Formspree); validation and basic error/success states.
- [ ] Brand colours and typography (Garet or approved fallback) applied consistently; logo from BrandPackage used in header/footer.
- [ ] Responsive at 320px, 768px, 1024px+ without horizontal scroll or broken layout.
- [ ] WCAG 2.1 AA: colour contrast, focus indicators, keyboard navigation, semantic structure and labels.
- [ ] Meta title and description per locale; LocalBusiness JSON-LD; sitemap and hreflang tags present.
- [ ] Placeholder copy in EN; placeholder ES and CA content switchable and structurally complete.

## CTA / Conversion Strategy

- **Primary CTAs**: “Get Quote”, “Contact”, “Request Quote” in hero and at end of main content.
- **Secondary CTA**: WhatsApp button (floating on mobile, visible on desktop) — link to client’s WhatsApp number (TBD).
- **Placement**: At least one CTA above the fold; repeat after Services and after Testimonials/FAQ; sticky or fixed WhatsApp on small viewports.
- **Form**: Single contact form; optional “Service type” dropdown (Upholstery, Carpet, Rug, Car interior, In-house hygiene, Other) to qualify leads.

## i18n Requirements

- Locales: `es` (Spanish), `ca` (Catalan), `en` (English). Default locale: `es` (or per client preference).
- URL structure: `/[locale]/` (e.g. `/es/`, `/ca/`, `/en/`).
- All UI labels, headings, body copy, form labels, errors, and buttons in message files (e.g. `en.json`, `es.json`, `ca.json`).
- Placeholder content: English as primary placeholder; Spanish and Catalan placeholders provided so all three locales are complete and switchable.
- SEO: `hreflang` for all three locales; `lang` attribute on `html` per page.

## Content Requirements

- Placeholder copy in English for: hero headline and subhead, service descriptions, process steps, testimonial quotes, FAQ answers, service areas text, contact section copy, footer.
- Placeholder copy in Spanish and Catalan for the same sections (can be translated placeholders or “Lorem” style; structure must support real copy later).
- Microcopy: button labels (Get Quote, Send, Contact via WhatsApp, etc.), form labels, errors, success messages — in all three languages.
- Client to supply: WhatsApp number, contact email for form, optional phone number, optional real testimonials and photos later.

## Dependencies

- BrandPackage assets (logos, colours, typography) — available in repo.
- Next.js 15, next-intl, Tailwind — to be set up in Phase 4.
- Contact form: env or config for form endpoint (e.g. Formspree key or API route).

## Open Questions

- WhatsApp Business number for CTA links (client).
- Garet web font: are .woff2 files available, or use approved fallback (e.g. DM Sans)?
- Contact form destination: email address or Formspree (or other) and env var name.
- Service photography: client photos vs. stock/placeholder for launch.
- Google Business profile: available for review embedding later?
- Default locale: `es` or `ca` for `/` redirect?

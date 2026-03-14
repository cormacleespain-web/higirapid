---
title: UX Strategy — HigiRapid Website
author-agent: design-lead
date: 2026-03-14
status: draft
---

# UX Strategy: HigiRapid Website

## Experience Principles

- **Mobile-first, conversion-led**: Every layout and interaction is designed for small screens first; CTAs (Get Quote, WhatsApp) are always visible or one tap away. Desktop enhances with more breathing room and secondary CTAs.
- **Trust before ask**: Build credibility through clear services, process, before/after, and testimonials before asking for contact. Reduce perceived risk so clicking “Get Quote” or WhatsApp feels low-friction.
- **Language as default, not afterthought**: ES/CA/EN are equal citizens. Language switcher is easy to find (header); locale persists; no dead ends when switching.
- **Scannable and fast**: Sections have clear headings; copy is concise; users can grasp “what we do” and “how to contact” in under 30 seconds. Page performance supports this (fast load, no layout shift).
- **Professional and calm**: Visual tone matches brand (clean, reliable). No aggressive pop-ups or dark patterns; CTAs are clear but not overwhelming.

## Experience Goals

- Visitor understands HigiRapid’s services (upholstery, carpet, rug, car interior, in-house hygiene) and coverage (El Masnou, Barcelona area) within one scroll.
- Visitor can request a quote or contact via form or WhatsApp from any viewport with minimal steps.
- Visitor trusts the brand via structure (process, FAQ), social proof (testimonials), and visual quality (before/after, brand consistency).
- Multilingual visitor can switch language without losing context and sees correct locale in URL and content.

## Key UX Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Single long-form landing (no separate service pages at launch) | Faster to ship; all info on one page reduces navigation; PRD scope. | One scroll flow; anchor links possible for “Services” etc.; service detail pages can be added later. |
| Sticky/floating WhatsApp (or primary CTA) on mobile | Maximise conversion on small screens where users expect tap-to-contact. | Always visible; must not obscure content; respect safe areas. |
| Hero CTA = Get Quote + WhatsApp (both) | Two paths for different user preferences (form vs. instant chat). | Hero may have 2 buttons; hierarchy: primary = Get Quote, secondary = WhatsApp. |
| Language switcher in header | Standard pattern; high visibility for local (ES/CA) and expat (EN) users. | Header component; current locale indicated; no full-page redirect that loses scroll. |
| Process section as numbered steps | Reduces anxiety (“what happens when I book?”); aligns with inspiration sites. | 3–5 steps; icon or number; short copy per step. |
| FAQ before Contact | Answer objections before form; reduces bounce and support load. | FAQ section immediately above or integrated with Contact. |
| Before/After as gallery/slider | Proof of quality without long copy; high impact. | Placeholder images OK; interaction: compare or carousel; accessible (keyboard, labels). |

## CTA Placement (Heatmap Intent)

- **Above the fold**: One primary CTA (Get Quote or Contact) + one secondary (WhatsApp). Headline + one-line value prop.
- **After Services**: Repeat primary CTA (“Get a quote for your sofa/carpet/car”).
- **After Testimonials**: Soft CTA (“Ready to book?”) with button.
- **Contact section**: Form + WhatsApp + phone; form is primary for “quote”, WhatsApp for “quick question”.
- **Mobile**: Sticky bar or floating WhatsApp button (bottom-right); does not cover main CTA in hero.

## Out of Scope (UX)

- Online booking or payment flows.
- User accounts or saved quotes.
- Blog or dynamic content.
- A/B testing or personalisation (can be added later).
